import { AppLayout } from "@/components/layout/app-layout"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export default function TeacherAnalyticsPage() {
  return (
    <AppLayout>
  <div className="px-2 py-4 sm:px-4 sm:py-8 md:p-16 space-y-8 sm:space-y-16 max-w-6xl mx-auto w-full">
        <div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-primary font-sans mb-2 sm:mb-4">Analytics</h1>
          <p className="text-base sm:text-2xl md:text-4xl text-muted-foreground font-bold mt-1 sm:mt-2">View class performance and student progress</p>
        </div>

          <AnalyticsDashboard userType="teacher" />
      </div>
    </AppLayout>
  )
}
