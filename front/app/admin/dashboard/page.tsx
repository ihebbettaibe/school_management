import { AppLayout } from "@/components/layout/app-layout"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export default function AdminDashboardPage() {
  return (
    <AppLayout>
      <div className="px-2 sm:px-4 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6 w-full max-w-7xl mx-auto">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">Overview of school operations and management</p>
        </div>

        <AdminDashboard />
      </div>
    </AppLayout>
  )
}
