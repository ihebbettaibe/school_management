import { AppLayout } from "@/components/layout/app-layout"
import { SchoolFeed } from "@/components/feed/school-feed"
import { CreatePostButton } from "@/components/feed/create-post-button"

export default function AdminFeedPage() {
  return (
    <AppLayout>
      <div className="px-2 py-2 space-y-3 w-full max-w-2xl mx-auto">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground">Fil d'Actualités</h1>
            <p className="text-xs text-muted-foreground">Annonces et événements de l'école</p>
          </div>
          <CreatePostButton />
        </div>

        <SchoolFeed userType="admin" simple />
      </div>
    </AppLayout>
  )
}
