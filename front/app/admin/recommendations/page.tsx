import { AppLayout } from "@/components/layout/app-layout"
import { RecommendationsCenter } from "@/components/recommendations/recommendations-center"

export default function AdminRecommendationsPage() {
  return (
    <AppLayout>
      <div className="px-2 py-4 sm:px-4 sm:py-8 md:p-8 lg:p-16 space-y-6 max-w-6xl mx-auto w-full">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Recommendations Management</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Review and manage suggestions from parents and teachers</p>
          </div>
        </div>
        <RecommendationsCenter userType="admin" />
      </div>
    </AppLayout>
  )
}
