import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/stats-card"
import { PageHeader } from "@/components/page-header"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const cards = Array.from({ length: 8 }).map(() => ({
  title: "إجمالي المبيعات ( كاش )",
  value: 85000,
  unit: "ج.م.",
  subtitle: "إجمالي المحصل النقدي",
  data: [10, 26, 38, 22, 14, 20, 18, 28, 32],
}))

export function ControlPanelPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="لوحة التحكم"
        description="مرحباً بك في GemFlow، إليك ملخص العمليات."
        actions={
          <>
            <Select defaultValue="today">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">اليوم</SelectItem>
                <SelectItem value="week">هذا الأسبوع</SelectItem>
                <SelectItem value="month">هذا الشهر</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              استخراج البيانات
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((c, i) => (
          <StatsCard key={i} {...c} />
        ))}
      </div>
    </div>
  )
}

export default ControlPanelPage
