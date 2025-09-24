import { AppLayout } from "@/components/layout/app-layout"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export default function AdminAnalyticsPage() {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">School Analytics</h1>
          <p className="text-muted-foreground">Comprehensive school performance overview</p>
        </div>

        <AnalyticsDashboard userType="admin" />
      </div>
    </AppLayout>
  )
}
