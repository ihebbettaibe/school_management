import { AppLayout } from "@/components/layout/app-layout"
import { TeacherDashboard } from "@/components/dashboard/teacher-dashboard"

export default function TeacherDashboardPage() {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your classes and activities</p>
        </div>

        <TeacherDashboard />
      </div>
    </AppLayout>
  )
}
