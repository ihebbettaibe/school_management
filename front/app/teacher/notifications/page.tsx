import { AppLayout } from "@/components/layout/app-layout"
import { NotificationCenter } from "@/components/notifications/notification-center"

export default function TeacherNotificationsPage() {
  return (
    <AppLayout>
      <div className="p-16 space-y-16 max-w-6xl mx-auto">
        <div>
          <h1 className="text-6xl font-extrabold text-primary font-sans mb-4">Notifications</h1>
          <p className="text-2xl text-muted-foreground font-semibold">Manage your teaching notifications and alerts</p>
        </div>

        <NotificationCenter userType="teacher" />
      </div>
    </AppLayout>
  )
}
