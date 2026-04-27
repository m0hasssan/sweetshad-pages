import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export function PlaygroundPage() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Playground</h1>
        <p className="text-muted-foreground mt-1">
          صفحة تجريبية فيها مكونات shadcn مختلفة عشان تشوف التصميم.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>كل أنواع الأزرار</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>شارات بألوان مختلفة</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </CardContent>
        </Card>

        {/* Counter */}
        <Card>
          <CardHeader>
            <CardTitle>Counter تفاعلي</CardTitle>
            <CardDescription>اختبر الـ state</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tabular-nums">{count}</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setCount((c) => c - 1)}>
              -
            </Button>
            <Button onClick={() => setCount((c) => c + 1)}>+</Button>
            <Button variant="ghost" onClick={() => setCount(0)}>
              Reset
            </Button>
          </CardFooter>
        </Card>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>نموذج</CardTitle>
            <CardDescription>اكتب اسمك وشوف نتيجته</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">الاسم</Label>
              <Input
                id="name"
                placeholder="اكتب اسمك..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {name && (
              <p className="text-sm text-muted-foreground">
                أهلاً، <span className="text-foreground font-medium">{name}</span> 👋
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Color palette */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>ألوان الـ Theme</CardTitle>
          <CardDescription>اضغط <kbd>d</kbd> للتبديل بين الفاتح والغامق</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { name: "primary", bg: "bg-primary", fg: "text-primary-foreground" },
            { name: "secondary", bg: "bg-secondary", fg: "text-secondary-foreground" },
            { name: "muted", bg: "bg-muted", fg: "text-muted-foreground" },
            { name: "accent", bg: "bg-accent", fg: "text-accent-foreground" },
            { name: "card", bg: "bg-card border", fg: "text-card-foreground" },
            { name: "destructive", bg: "bg-destructive", fg: "text-white" },
            { name: "background", bg: "bg-background border", fg: "text-foreground" },
            { name: "foreground", bg: "bg-foreground", fg: "text-background" },
          ].map((c) => (
            <div
              key={c.name}
              className={`${c.bg} ${c.fg} flex h-16 items-center justify-center rounded-md text-xs font-medium`}
            >
              {c.name}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default PlaygroundPage
