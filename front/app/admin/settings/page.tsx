import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { AdminSettings } from "@/components/admin/admin-settings"

export default function AdminSettingsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AppLayout>
        <div className="p-4 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Settings</h1>
            <p className="text-muted-foreground">Manage school profile, users, and system settings</p>
          </div>

          <AdminSettings />
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
