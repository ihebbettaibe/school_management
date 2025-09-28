import { AppLayout } from "@/components/layout/app-layout"
import { NotificationCenter } from "@/components/notifications/notification-center"

export default function AdminNotificationsPage() {
  return (
    <AppLayout>
      <div className="p-4 max-w-3xl mx-auto w-full">
        <h1 className="text-xl font-bold mb-2">Notifications</h1>
        <NotificationCenter userType="admin" />
      </div>
    </AppLayout>
  )
}
