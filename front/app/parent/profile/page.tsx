import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { ParentProfile } from "@/components/profile/parent-profile"

export default function ParentProfilePage() {
  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <AppLayout>
        <div className="p-16 space-y-16 max-w-4xl mx-auto">
          <div>
            <h1 className="text-6xl font-extrabold text-primary font-sans mb-4">Profile</h1>
            <p className="text-2xl text-muted-foreground font-semibold">Manage your profile and children's information</p>
          </div>

          <ParentProfile />
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
