import { AppLayout } from "@/components/layout/app-layout"
import { RecommendationsCenter } from "@/components/recommendations/recommendations-center"

export default function TeacherRecommendationsPage() {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recommendations</h1>
          <p className="text-muted-foreground">Submit suggestions for school improvements</p>
        </div>

        <RecommendationsCenter userType="teacher" />
      </div>
    </AppLayout>
  )
}
