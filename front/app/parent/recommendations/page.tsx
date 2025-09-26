import { AppLayout } from "@/components/layout/app-layout"
import { RecommendationsCenter } from "@/components/recommendations/recommendations-center"

export default function ParentRecommendationsPage() {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recommendations</h1>
          <p className="text-muted-foreground">Share your suggestions to improve our school</p>
        </div>

        <RecommendationsCenter userType="parent" />
      </div>
    </AppLayout>
  )
}
// MVP: This page is commented out for now. Will be used in future updates.
// export default function ParentRecommendationsPage() {
//   return (
//     <AppLayout>
//       <div className="p-4 space-y-6">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Recommendations</h1>
//           <p className="text-muted-foreground">Share your suggestions to improve our school</p>
//         </div>
//
//         <RecommendationsCenter userType="parent" />
//       </div>
//     </AppLayout>
//   )
// }
