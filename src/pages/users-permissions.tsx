import * as React from "react"
import { MoreHorizontal, Pencil, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable, type DataTableColumn } from "@/components/data-table"
import { PageHeader } from "@/components/page-header"
import { toast } from "sonner"

interface UserRow {
  id: string
  name: string
  email: string
  permissionsGranted: number
  permissionsTotal: number
}

// Mock data — سيتم استبداله لاحقاً ببيانات حقيقية
const MOCK_USERS: UserRow[] = Array.from({ length: 23 }).map((_, i) => ({
  id: `u-${i + 1}`,
  name: `مستخدم رقم ${i + 1}`,
  email: `user${i + 1}@example.com`,
  permissionsGranted: Math.floor(Math.random() * 21),
  permissionsTotal: 20,
}))

export function UsersPermissionsPage() {
  const [users, setUsers] = React.useState<UserRow[]>(MOCK_USERS)

  const handleEdit = (row: UserRow) => {
    toast.info(`تعديل: ${row.name}`)
  }

  const handleDelete = (row: UserRow) => {
    setUsers((prev) => prev.filter((u) => u.id !== row.id))
    toast.success(`تم حذف: ${row.name}`)
  }

  const columns: DataTableColumn<UserRow>[] = [
    {
      key: "name",
      header: "اسم المستخدم",
      sortable: true,
      cell: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      key: "permissionsGranted",
      header: "عدد الصلاحيات",
      sortable: true,
      cell: (row) => (
        <Badge variant="secondary" className="font-mono">
          {row.permissionsGranted}/{row.permissionsTotal}
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
          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuItem onSelect={() => handleEdit(row)}>
              <Pencil />
              <span>تعديل</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={() => handleDelete(row)}>
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
          <Button>
            <Plus className="h-4 w-4" />
            <span>إضافة مستخدم</span>
          </Button>
        }
      />

      <DataTable
        data={users}
        columns={columns}
        rowKey={(r) => r.id}
        searchKeys={["name", "email"]}
        searchPlaceholder="ابحث بالاسم أو البريد الإلكتروني ..."
        pageSize={20}
        onRefresh={() => toast.success("تم تحديث البيانات")}
        onFilter={() => toast.info("الفلترة قريباً")}
      />
    </div>
  )
}

export default UsersPermissionsPage
