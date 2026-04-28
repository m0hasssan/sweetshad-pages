import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export interface GoldKaratPrice {
  sell: number
  buy: number
}

export interface GoldPricesData {
  gold: Record<string, GoldKaratPrice | number>
  currency: string
  fetched_at: string
}

export function useGoldPrices(refreshIntervalMs: number = 3 * 60 * 1000) {
  const [data, setData] = useState<GoldPricesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPrices = async () => {
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke(
        "gold-prices",
        { method: "GET" },
      )
      if (fnError) throw fnError
      if (!result?.success) throw new Error(result?.error || "فشل جلب الأسعار")
      setData(result.data as GoldPricesData)
      setError(null)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices()
    const id = setInterval(fetchPrices, refreshIntervalMs)
    return () => clearInterval(id)
  }, [refreshIntervalMs])

  return { data, loading, error, refresh: fetchPrices }
}

/** يحول تاريخ ISO إلى نص "تم التحديث منذ X دقيقة" بالعربية */
export function formatTimeAgoAr(iso?: string): string {
  if (!iso) return ""
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.max(0, Math.floor(diffMs / 60000))
  if (minutes < 1) return "تم التحديث الآن"
  if (minutes === 1) return "تم التحديث منذ دقيقة"
  if (minutes === 2) return "تم التحديث منذ دقيقتين"
  if (minutes < 11) return `تم التحديث منذ ${minutes} دقائق`
  return `تم التحديث منذ ${minutes} دقيقة`
}
