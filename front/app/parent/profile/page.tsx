import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { ParentProfile } from "@/components/profile/parent-profile"

export default function ParentProfilePage() {
  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <AppLayout>
        <div className="p-4 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your profile and children's information</p>
          </div>

          <ParentProfile />
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
