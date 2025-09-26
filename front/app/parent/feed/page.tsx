import { AppLayout } from "@/components/layout/app-layout"
import { SchoolFeed } from "@/components/feed/school-feed"

export default function ParentFeedPage() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6 bg-background min-h-[80vh]">
        <div className="mb-2">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight font-sans">School Feed</h1>
          <p className="text-base text-foreground font-medium font-sans mt-1">Stay updated with school announcements and events</p>
        </div>

        <SchoolFeed userType="parent" />
      </div>
    </AppLayout>
  )
}
// MVP: This page is commented out for now. Will be used in future updates.
// export default function ParentFeedPage() {
//   return (
//     <AppLayout>
//       <div className="p-6 space-y-6 bg-background min-h-[80vh]">
//         <div className="mb-2">
//           <h1 className="text-2xl font-semibold text-foreground tracking-tight font-sans">School Feed</h1>
//           <p className="text-base text-foreground font-medium font-sans mt-1">Stay updated with school announcements and events</p>
//         </div>
//
//         <SchoolFeed userType="parent" />
//       </div>
//     </AppLayout>
//   )
// }
