import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/auth-context"

export type AppPermission = "view_dashboard" | "export_data"
export type AppRole = "admin" | "user"

interface UserAccess {
  roles: AppRole[]
  permissions: AppPermission[]
  loading: boolean
  isAdmin: boolean
  hasPermission: (p: AppPermission) => boolean
  refresh: () => Promise<void>
}

export function usePermissions(): UserAccess {
  const { user } = useAuth()
  const [roles, setRoles] = useState<AppRole[]>([])
  const [permissions, setPermissions] = useState<AppPermission[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    if (!user) {
      setRoles([])
      setPermissions([])
      setLoading(false)
      return
    }
    setLoading(true)
    const [{ data: roleRows }, { data: permRows }] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", user.id),
      supabase.from("user_permissions").select("permission").eq("user_id", user.id),
    ])
    setRoles((roleRows ?? []).map((r) => r.role as AppRole))
    setPermissions((permRows ?? []).map((p) => p.permission as AppPermission))
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  const isAdmin = roles.includes("admin")
  const hasPermission = (p: AppPermission) => isAdmin || permissions.includes(p)

  return { roles, permissions, loading, isAdmin, hasPermission, refresh: load }
}
