import { AppLayout } from "@/components/layout/app-layout"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export default function TeacherAnalyticsPage() {
  return (
    <AppLayout>
      <div className="p-16 space-y-16 max-w-6xl mx-auto">
        <div>
          <h1 className="text-6xl font-extrabold text-primary font-sans mb-4">Analytics</h1>
          <p className="text-4xl text-muted-foreground font-bold mt-2">View class performance and student progress</p>
        </div>

        <AnalyticsDashboard userType="teacher" />
      </div>
    </AppLayout>
  )
}
