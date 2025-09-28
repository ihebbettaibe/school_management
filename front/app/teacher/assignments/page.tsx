import { ProtectedRoute } from "@/components/auth/protected-route"
import { useLanguage } from "@/contexts/language-context"
import { AppLayout } from "@/components/layout/app-layout"
import { AssignmentList } from "@/components/assignments/assignment-list"
import { CreateAssignmentButton } from "@/components/assignments/create-assignment-button"

export default function TeacherAssignmentsPage() {
  const { t } = useLanguage();
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <AppLayout>
        <div className="p-16 space-y-16 max-w-6xl mx-auto">
          <div className="flex flex-col space-y-10 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h1 className="text-6xl font-extrabold text-primary font-sans mb-4">{t.navigation.assignments}</h1>
              <p className="text-2xl text-muted-foreground font-semibold">{t.homepage.assignments.description}</p>
            </div>
            <CreateAssignmentButton />
          </div>
          <AssignmentList userType="teacher" />
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
