import { AppLayout } from "@/components/layout/app-layout"
import { NotificationCenter } from "@/components/notifications/notification-center"

export default function ParentNotificationsPage() {
  return (
    <AppLayout>
      <div className="p-16 space-y-16 max-w-6xl mx-auto">
        <div>
          <h1 className="text-6xl font-extrabold text-primary font-sans mb-4">Notifications</h1>
          <p className="text-2xl text-muted-foreground font-semibold">Stay updated with your child's school activities</p>
        </div>

        <NotificationCenter userType="parent" />
      </div>
    </AppLayout>
  )
}
