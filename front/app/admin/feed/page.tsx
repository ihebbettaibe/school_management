import { AppLayout } from "@/components/layout/app-layout"
import { SchoolFeed } from "@/components/feed/school-feed"
import { CreatePostButton } from "@/components/feed/create-post-button"

export default function AdminFeedPage() {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Fil d'Actualités de l'École</h1>
            <p className="text-muted-foreground">Gérer les annonces et événements de l'école</p>
          </div>
          <CreatePostButton />
        </div>

        <SchoolFeed userType="admin" />
      </div>
    </AppLayout>
  )
}
