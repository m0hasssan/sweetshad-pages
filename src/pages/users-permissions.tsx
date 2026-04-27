import * as React from "react"
import { MoreHorizontal, Pencil, Trash2, Plus, Shield, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DataTable, type DataTableColumn } from "@/components/data-table"
import { PageHeader } from "@/components/page-header"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { usePermissions, type AppPermission } from "@/hooks/use-permissions"

interface UserRow {
  id: string
  email: string
  full_name: string | null
  is_admin: boolean
  permissions: AppPermission[]
}

const ALL_PERMISSIONS: { value: AppPermission; label: string }[] = [
  { value: "view_dashboard", label: "عرض لوحة التحكم" },
  { value: "export_data", label: "استخراج البيانات" },
]

export function UsersPermissionsPage() {
  const { isAdmin, loading: permLoading } = usePermissions()
  const [users, setUsers] = React.useState<UserRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [editing, setEditing] = React.useState<UserRow | null>(null)
  const [deleting, setDeleting] = React.useState<UserRow | null>(null)
  const [draftPerms, setDraftPerms] = React.useState<AppPermission[]>([])
  const [draftAdmin, setDraftAdmin] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const loadUsers = React.useCallback(async () => {
    setLoading(true)
    const [profilesRes, rolesRes, permsRes] = await Promise.all([
      supabase.from("profiles").select("id, email, full_name").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role"),
      supabase.from("user_permissions").select("user_id, permission"),
    ])

    if (profilesRes.error) {
      toast.error("فشل تحميل المستخدمين")
      setLoading(false)
      return
    }

    const adminSet = new Set(
      (rolesRes.data ?? []).filter((r) => r.role === "admin").map((r) => r.user_id),
    )
    const permsByUser = new Map<string, AppPermission[]>()
    for (const row of permsRes.data ?? []) {
      const arr = permsByUser.get(row.user_id) ?? []
      arr.push(row.permission as AppPermission)
      permsByUser.set(row.user_id, arr)
    }

    const rows: UserRow[] = (profilesRes.data ?? []).map((p) => ({
      id: p.id,
      email: p.email,
      full_name: p.full_name,
      is_admin: adminSet.has(p.id),
      permissions: permsByUser.get(p.id) ?? [],
    }))

    setUsers(rows)
    setLoading(false)
  }, [])

  React.useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const openEdit = (row: UserRow) => {
    setEditing(row)
    setDraftAdmin(row.is_admin)
    setDraftPerms(row.permissions)
  }

  const togglePerm = (p: AppPermission) => {
    setDraftPerms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    )
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    try {
      // Sync admin role
      if (draftAdmin && !editing.is_admin) {
        const { error } = await supabase
          .from("user_roles")
          .insert({ user_id: editing.id, role: "admin" })
        if (error) throw error
      } else if (!draftAdmin && editing.is_admin) {
        const { error } = await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", editing.id)
          .eq("role", "admin")
        if (error) throw error
      }

      // Sync permissions
      const toAdd = draftPerms.filter((p) => !editing.permissions.includes(p))
      const toRemove = editing.permissions.filter((p) => !draftPerms.includes(p))

      if (toAdd.length) {
        const { error } = await supabase
          .from("user_permissions")
          .insert(toAdd.map((p) => ({ user_id: editing.id, permission: p })))
        if (error) throw error
      }
      if (toRemove.length) {
        const { error } = await supabase
          .from("user_permissions")
          .delete()
          .eq("user_id", editing.id)
          .in("permission", toRemove)
        if (error) throw error
      }

      toast.success("تم حفظ التغييرات")
      setEditing(null)
      await loadUsers()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "حدث خطأ"
      toast.error(msg)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    const { error } = await supabase.from("profiles").delete().eq("id", deleting.id)
    if (error) {
      toast.error("لا تملك صلاحية الحذف")
      return
    }
    toast.success(`تم حذف: ${deleting.full_name ?? deleting.email}`)
    setDeleting(null)
    await loadUsers()
  }

  const columns: DataTableColumn<UserRow>[] = [
    {
      key: "name",
      header: "اسم المستخدم",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.full_name ?? "—"}</span>
          {row.is_admin && (
            <Badge variant="default" className="gap-1">
              <ShieldCheck className="h-3 w-3" />
              مسؤول
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "permissions",
      header: "عدد الصلاحيات",
      sortable: false,
      cell: (row) => (
        <Badge variant="secondary" className="font-mono">
          {row.is_admin ? ALL_PERMISSIONS.length : row.permissions.length}/{ALL_PERMISSIONS.length}
        </Badge>
      ),
    },
    {
      key: "email",
      header: "البريد الإلكتروني",
      sortable: true,
      cell: (row) => (
        <span className="text-muted-foreground" dir="ltr">
          {row.email}
        </span>
      ),
    },
    {
      key: "actions",
      header: <span className="sr-only">إجراءات</span>,
      headerClassName: "w-12",
      className: "w-12",
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">القائمة</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuItem onSelect={() => openEdit(row)} disabled={!isAdmin}>
              <Pencil />
              <span>تعديل الصلاحيات</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setDeleting(row)}
              disabled={!isAdmin}
            >
              <Trash2 />
              <span>حذف</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="المستخدمين والصلاحيات"
        description="إدارة جميع مستخدمي النظام وصلاحياتهم"
        actions={
          <Button disabled>
            <Plus className="h-4 w-4" />
            <span>إضافة مستخدم</span>
          </Button>
        }
      />

      {!permLoading && !isAdmin && (
        <div className="rounded-md border border-dashed bg-muted/30 p-3 text-sm text-muted-foreground">
          أنت تعرض البيانات بصلاحيات محدودة. التعديل والحذف متاح للمسؤولين فقط.
        </div>
      )}

      <DataTable
        data={users}
        columns={columns}
        rowKey={(r) => r.id}
        searchKeys={["full_name", "email"]}
        searchPlaceholder="ابحث بالاسم أو البريد الإلكتروني ..."
        pageSize={20}
        onRefresh={() => {
          loadUsers()
          toast.success("تم تحديث البيانات")
        }}
        emptyMessage={loading ? "جارٍ التحميل..." : "لا توجد بيانات"}
      />

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل الصلاحيات</DialogTitle>
            <DialogDescription>
              {editing?.full_name ?? editing?.email}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <div>
                  <Label htmlFor="admin-toggle" className="cursor-pointer">
                    صلاحيات المسؤول
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    وصول كامل لكل الصلاحيات
                  </p>
                </div>
              </div>
              <Checkbox
                id="admin-toggle"
                checked={draftAdmin}
                onCheckedChange={(v) => setDraftAdmin(!!v)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">الصلاحيات الفردية</Label>
              <div className="space-y-2 rounded-md border p-3">
                {ALL_PERMISSIONS.map((p) => (
                  <div key={p.value} className="flex items-center gap-2">
                    <Checkbox
                      id={`perm-${p.value}`}
                      checked={draftAdmin || draftPerms.includes(p.value)}
                      disabled={draftAdmin}
                      onCheckedChange={() => togglePerm(p.value)}
                    />
                    <Label
                      htmlFor={`perm-${p.value}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {p.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              إلغاء
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "جارٍ الحفظ..." : "حفظ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف المستخدم</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف بيانات «{deleting?.full_name ?? deleting?.email}» نهائياً ولا يمكن التراجع.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default UsersPermissionsPage
