import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { TeacherScheduleView } from "@/components/schedule/teacher-schedule-view"

export default function TeacherSchedulePage() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <AppLayout>
        <div className="px-2 py-4 space-y-4 w-full max-w-6xl mx-auto">
          <div className="mb-2">
            <h1 className="text-lg md:text-2xl font-bold text-foreground">Mon emploi du temps</h1>
            <p className="text-sm md:text-base text-muted-foreground">Consultez votre emploi du temps hebdomadaire</p>
          </div>

          <div className="w-full overflow-x-auto">
            <TeacherScheduleView />
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
