import { Construction } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function DashboardHome() {
  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Construction className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-semibold">قيد الإنشاء</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            هذه الصفحة قيد التطوير حالياً. سنقوم بإضافة المحتوى قريباً بإذن الله.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardHome
