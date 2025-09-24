import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { TeacherProfile } from "@/components/profile/teacher-profile"

export default function TeacherProfilePage() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <AppLayout>
        <div className="p-4 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your profile and teaching information</p>
          </div>

          <TeacherProfile />
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
