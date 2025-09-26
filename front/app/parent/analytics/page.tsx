import { AppLayout } from "@/components/layout/app-layout"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export default function ParentAnalyticsPage() {
  return (
    <AppLayout>
      <div className="p-16 space-y-16 max-w-6xl mx-auto">
        <div>
          <h1 className="text-6xl font-extrabold text-primary font-sans mb-4">Analytics</h1>
          <p className="text-2xl text-muted-foreground font-semibold">View academic performance and class rankings</p>
        </div>

        <AnalyticsDashboard userType="parent" />
      </div>
    </AppLayout>
  )
}
