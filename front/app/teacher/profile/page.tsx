import { ProtectedRoute } from "@/components/auth/protected-route"
import { useLanguage } from "@/contexts/language-context"
import { AppLayout } from "@/components/layout/app-layout"
import { TeacherProfile } from "@/components/profile/teacher-profile"

export default function TeacherProfilePage() {
  const { t } = useLanguage();
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <AppLayout>
        <div className="p-4 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t.navigation.profile}</h1>
            <p className="text-muted-foreground">{t.profile.teacherInfo}</p>
          </div>

          <TeacherProfile />
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
