import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const buttonVariants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const
const buttonSizes = ["xs", "sm", "default", "lg"] as const
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

const colorTokens = [
  { name: "background", bg: "bg-background border", fg: "text-foreground" },
  { name: "foreground", bg: "bg-foreground", fg: "text-background" },
  { name: "card", bg: "bg-card border", fg: "text-card-foreground" },
  { name: "popover", bg: "bg-popover border", fg: "text-popover-foreground" },
  { name: "primary", bg: "bg-primary", fg: "text-primary-foreground" },
  { name: "secondary", bg: "bg-secondary", fg: "text-secondary-foreground" },
  { name: "muted", bg: "bg-muted", fg: "text-muted-foreground" },
  { name: "accent", bg: "bg-accent", fg: "text-accent-foreground" },
  { name: "destructive", bg: "bg-destructive/10", fg: "text-destructive" },
  { name: "border", bg: "bg-border", fg: "text-foreground" },
  { name: "input", bg: "bg-input", fg: "text-foreground" },
  { name: "ring", bg: "bg-ring", fg: "text-background" },
]

const chartTokens = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]

const radiusTokens = [
  { name: "sm", cls: "rounded-sm" },
  { name: "md", cls: "rounded-md" },
  { name: "lg", cls: "rounded-lg" },
  { name: "xl", cls: "rounded-xl" },
  { name: "2xl", cls: "rounded-2xl" },
  { name: "3xl", cls: "rounded-3xl" },
  { name: "full", cls: "rounded-full" },
]

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="border-border bg-card text-card-foreground rounded-xl border p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export function ThemePage() {
  const [name, setName] = useState("")

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Theme Preview</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          استعراض شامل لكل الـ components والـ design tokens المتاحة في المشروع.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {/* Button variants */}
        <Section title="Button — Variants" description="كل أنواع الأزرار">
          <div className="flex flex-wrap items-center gap-3">
            {buttonVariants.map((v) => (
              <Button key={v} variant={v}>
                {v}
              </Button>
            ))}
          </div>
        </Section>

        {/* Button sizes */}
        <Section title="Button — Sizes" description="المقاسات المختلفة">
          <div className="flex flex-wrap items-center gap-3">
            {buttonSizes.map((s) => (
              <Button key={s} size={s}>
                Size {s}
              </Button>
            ))}
          </div>
        </Section>

        {/* Icon button sizes */}
        <Section title="Button — Icon Sizes" description="أزرار أيقونة مربعة">
          <div className="flex flex-wrap items-center gap-3">
            {iconSizes.map((s) => (
              <Button key={s} size={s} aria-label={s}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </Button>
            ))}
          </div>
        </Section>

        {/* Button states */}
        <Section title="Button — States" description="الحالات المختلفة">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button aria-invalid="true">Invalid</Button>
            <Button aria-expanded="true">Expanded</Button>
          </div>
        </Section>

        {/* Input + Label */}
        <Section title="Input + Label" description="حقول الإدخال">
          <div className="grid max-w-md gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="name">الاسم</Label>
              <Input
                id="name"
                placeholder="اكتب اسمك..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {name && (
                <p className="text-muted-foreground text-xs">
                  أهلاً، <span className="text-foreground font-medium">{name}</span> 👋
                </p>
              )}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="disabled">Disabled</Label>
              <Input id="disabled" placeholder="معطّل" disabled />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="invalid">Invalid</Label>
              <Input id="invalid" placeholder="قيمة خاطئة" aria-invalid="true" />
            </div>
          </div>
        </Section>

        {/* Color tokens */}
        <Section title="Color Tokens" description="ألوان الـ theme الأساسية">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {colorTokens.map((c) => (
              <div
                key={c.name}
                className={`${c.bg} ${c.fg} flex h-20 items-center justify-center rounded-md text-xs font-medium`}
              >
                {c.name}
              </div>
            ))}
          </div>
        </Section>

        {/* Chart tokens */}
        <Section title="Chart Colors" description="ألوان الرسوم البيانية">
          <div className="grid grid-cols-5 gap-3">
            {chartTokens.map((name) => (
              <div
                key={name}
                className="flex h-20 items-center justify-center rounded-md text-xs font-medium text-white"
                style={{ background: `var(--${name})` }}
              >
                {name}
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography" description="مقاسات النصوص">
          <div className="space-y-2">
            <p className="text-4xl font-bold tracking-tight">Heading 4xl Bold</p>
            <p className="text-3xl font-semibold tracking-tight">Heading 3xl</p>
            <p className="text-2xl font-semibold">Heading 2xl</p>
            <p className="text-xl font-medium">Heading xl</p>
            <p className="text-lg">Large body text</p>
            <p className="text-base">Base body text</p>
            <p className="text-sm text-muted-foreground">Small muted text</p>
            <p className="text-xs text-muted-foreground">Extra small text</p>
          </div>
        </Section>

        {/* Radius */}
        <Section title="Border Radius" description="درجات تدوير الحواف">
          <div className="flex flex-wrap gap-3">
            {radiusTokens.map((r) => (
              <div
                key={r.name}
                className={`bg-muted text-muted-foreground ${r.cls} flex h-20 w-20 items-center justify-center text-xs font-medium`}
              >
                {r.name}
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}

export default ThemePage
