import { AppLayout } from "@/components/layout/app-layout"
import { RecommendationsCenter } from "@/components/recommendations/recommendations-center"

export default function AdminRecommendationsPage() {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recommendations Management</h1>
          <p className="text-muted-foreground">Review and manage suggestions from parents and teachers</p>
        </div>

        <RecommendationsCenter userType="admin" />
      </div>
    </AppLayout>
  )
}
