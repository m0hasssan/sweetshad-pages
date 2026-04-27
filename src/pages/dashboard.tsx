import { useAuth } from "@/contexts/auth-context"

export function DashboardHome() {
  const { user } = useAuth()
  const name =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "بك"

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center">
      <span
        className="text-8xl md:text-9xl"
        role="img"
        aria-label="waving hand"
        style={{ animation: "wave 2s ease-in-out infinite", transformOrigin: "70% 70%", display: "inline-block" }}
      >
        👋
      </span>
      <h1 className="mt-6 text-4xl md:text-6xl font-bold">
        مرحباً {name}
      </h1>
      <p className="mt-4 text-lg md:text-2xl text-muted-foreground">
        قم بتصفح القائمة الجانبية لعرض الأقسام المتاحة لك
      </p>
      <style>{`
        @keyframes wave {
          0%, 60%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
        }
      `}</style>
    </div>
  )
}

export default DashboardHome
