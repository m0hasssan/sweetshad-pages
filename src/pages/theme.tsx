import { Button } from "@/components/ui/button"

const buttonVariants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const
const buttonSizes = ["xs", "sm", "default", "lg"] as const
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

const colorTokens = [
  { name: "background", bg: "bg-background border", fg: "text-foreground" },
  { name: "foreground", bg: "bg-foreground", fg: "text-background" },
  { name: "card", bg: "bg-card border", fg: "text-card-foreground" },
  { name: "popover", bg: "bg-popover border", fg: "text-popover-foreground" },
  { name: "primary", bg: "bg-primary", fg: "text-primary-foreground" },
  {
    name: "secondary",
    bg: "bg-secondary",
    fg: "text-secondary-foreground",
  },
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

// Inline icons (so we don't depend on extra packages).
function PlusIcon() {
  return (
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
  )
}

// Arrow that points to the start of the line in any direction (flips with RTL).
function StartArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="rtl:-scale-x-100"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  )
}

// Arrow that points to the end of the line in any direction (flips with RTL).
function EndArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="rtl:-scale-x-100"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

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
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          استعراض الـ Theme
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          صفحة تعرض كل الكومبوننتس والـ design tokens المتاحة في المشروع — RTL
          مفعّل عبر <code className="text-foreground">DirectionProvider</code>.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {/* Button — Variants */}
        <Section title="Button — Variants" description="كل أنواع الأزرار">
          <div className="flex flex-wrap items-center gap-3">
            {buttonVariants.map((v) => (
              <Button key={v} variant={v}>
                {v}
              </Button>
            ))}
          </div>
        </Section>

        {/* Button — Sizes */}
        <Section title="Button — Sizes" description="المقاسات المختلفة">
          <div className="flex flex-wrap items-center gap-3">
            {buttonSizes.map((s) => (
              <Button key={s} size={s}>
                مقاس {s}
              </Button>
            ))}
          </div>
        </Section>

        {/* Button — Icon Sizes */}
        <Section title="Button — Icon Sizes" description="أزرار أيقونة مربعة">
          <div className="flex flex-wrap items-center gap-3">
            {iconSizes.map((s) => (
              <Button key={s} size={s} variant="outline" aria-label={s}>
                <PlusIcon />
              </Button>
            ))}
          </div>
        </Section>

        {/* Button — With Icons (RTL) */}
        <Section
          title="Button — مع أيقونات"
          description="الأيقونات بتنعكس تلقائياً مع اتجاه RTL"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button>
              <span data-icon="inline-start">
                <StartArrow />
              </span>
              السابق
            </Button>
            <Button>
              التالي
              <span data-icon="inline-end">
                <EndArrow />
              </span>
            </Button>
            <Button variant="outline">
              <span data-icon="inline-start">
                <PlusIcon />
              </span>
              إضافة عنصر
            </Button>
            <Button variant="secondary">
              حفظ
              <span data-icon="inline-end">
                <PlusIcon />
              </span>
            </Button>
          </div>
        </Section>

        {/* Button — States */}
        <Section title="Button — States" description="الحالات المختلفة">
          <div className="flex flex-wrap items-center gap-3">
            <Button>عادي</Button>
            <Button disabled>معطّل</Button>
            <Button aria-invalid="true">غير صالح</Button>
            <Button aria-expanded="true">مفتوح</Button>
          </div>
        </Section>

        {/* Button Group */}
        <Section
          title="Button Group"
          description="مجموعة أزرار متجاورة باستخدام data-slot=button-group"
        >
          <div data-slot="button-group" className="flex">
            <Button variant="outline" className="rounded-e-none">
              يمين
            </Button>
            <Button
              variant="outline"
              className="rounded-none border-s-0 border-e-0"
            >
              وسط
            </Button>
            <Button variant="outline" className="rounded-s-none">
              يسار
            </Button>
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
            <p className="text-4xl font-bold tracking-tight">عنوان كبير 4xl</p>
            <p className="text-3xl font-semibold tracking-tight">عنوان 3xl</p>
            <p className="text-2xl font-semibold">عنوان 2xl</p>
            <p className="text-xl font-medium">عنوان xl</p>
            <p className="text-lg">نص كبير</p>
            <p className="text-base">نص أساسي</p>
            <p className="text-muted-foreground text-sm">نص صغير ثانوي</p>
            <p className="text-muted-foreground text-xs">نص صغير جداً</p>
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
