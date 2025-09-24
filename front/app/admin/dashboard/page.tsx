import { AppLayout } from "@/components/layout/app-layout"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export default function AdminDashboardPage() {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of school operations and management</p>
        </div>

        <AdminDashboard />
      </div>
    </AppLayout>
  )
}
