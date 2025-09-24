import { AppLayout } from "@/components/layout/app-layout"
import { NotificationCenter } from "@/components/notifications/notification-center"

export default function AdminNotificationsPage() {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">System notifications and alerts</p>
        </div>

        <NotificationCenter userType="admin" />
      </div>
    </AppLayout>
  )
}
