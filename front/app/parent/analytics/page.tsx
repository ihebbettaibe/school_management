import { AppLayout } from "@/components/layout/app-layout"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export default function ParentAnalyticsPage() {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">View academic performance and class rankings</p>
        </div>

        <AnalyticsDashboard userType="parent" />
      </div>
    </AppLayout>
  )
}
