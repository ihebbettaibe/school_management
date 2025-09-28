import { AppLayout } from "@/components/layout/app-layout"
import { NotificationCenter } from "@/components/notifications/notification-center"

export default function AdminNotificationsPage() {
  return (
    <AppLayout>
  <div className="px-2 py-4 sm:px-4 sm:py-8 md:p-16 space-y-6 max-w-6xl mx-auto w-full">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">System notifications and alerts</p>
        </div>

        <NotificationCenter userType="admin" />
      </div>
    </AppLayout>
  )
}
