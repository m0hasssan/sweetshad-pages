import { Outlet } from "react-router-dom"
import { Bell, Settings, Moon, Sun } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/components/theme-provider"

function getInitials(email: string | undefined) {
  if (!email) return "؟"
  return email.charAt(0).toUpperCase()
}

export function DashboardLayout() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  const toggleTheme = () => setTheme(isDark ? "light" : "dark")

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center justify-between gap-3 border-b bg-background px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs font-medium">
                  {getInitials(user?.email)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" disabled aria-label="الإشعارات">
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="تبديل الوضع"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" disabled aria-label="الإعدادات">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 bg-muted/20 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
