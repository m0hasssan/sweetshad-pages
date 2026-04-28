// Edge function: scrape gold prices from edahabapp.com
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

interface KaratPrice {
  sell: number
  buy: number
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const response = await fetch("https://edahabapp.com/", {
      headers: { "User-Agent": "Mozilla/5.0" },
    })
    const html = await response.text()

    const goldPrices: Record<string, KaratPrice | number> = {}

    // Extract each .price-item block
    const itemRegex = /<[^>]+class="[^"]*\bprice-item\b[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>(?=\s*<[^>]+class="[^"]*\bprice-item\b|\s*$)/g
    // Simpler: split by price-item occurrences
    const blocks = html.split(/class="[^"]*\bprice-item\b[^"]*"/i).slice(1)

    for (const raw of blocks) {
      // take a reasonable chunk after the class attribute
      const block = raw.slice(0, 2000)
      const textOnly = block.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()

      // Extract numbers inside number-font spans
      const numberMatches = [...block.matchAll(/class="[^"]*\bnumber-font\b[^"]*"[^>]*>([^<]+)</g)]
      const numbers = numberMatches.map((m) => parseFloat(m[1].replace(/[^\d.]/g, ""))).filter((n) => !isNaN(n))

      if (textOnly.includes("عيار")) {
        const karatMatch = textOnly.match(/عيار\s*(\d+)/)
        if (karatMatch && numbers.length >= 2) {
          goldPrices[karatMatch[1]] = { sell: numbers[0], buy: numbers[1] }
        }
      } else if (textOnly.includes("الجنيه الذهب") && numbers.length >= 1) {
        goldPrices["coin"] = numbers[0]
      } else if (textOnly.includes("الأوقية") && numbers.length >= 1) {
        goldPrices["ounce"] = numbers[0]
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          gold: goldPrices,
          currency: "EGP",
          fetched_at: new Date().toISOString(),
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  }
})
