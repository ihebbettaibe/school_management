import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { TeacherScheduleView } from "@/components/schedule/teacher-schedule-view"

export default function TeacherSchedulePage() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <AppLayout>
        <div className="p-4 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mon emploi du temps</h1>
            <p className="text-muted-foreground">Consultez votre emploi du temps hebdomadaire</p>
          </div>

          <TeacherScheduleView />
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
