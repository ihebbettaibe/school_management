import { ProtectedRoute } from "@/components/auth/protected-route"
import { useLanguage } from "@/contexts/language-context"
import { AppLayout } from "@/components/layout/app-layout"
import { TeacherScheduleView } from "@/components/schedule/teacher-schedule-view"

export default function TeacherSchedulePage() {
  const { t } = useLanguage();
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <AppLayout>
        <div className="px-2 py-4 space-y-4 w-full max-w-6xl mx-auto">
          <div className="mb-2">
            <h1 className="text-lg md:text-2xl font-bold text-foreground">{t.navigation.schedule}</h1>
            <p className="text-sm md:text-base text-muted-foreground">{t.schedule.addTimeSlotHint}</p>
          </div>

          <div className="w-full overflow-x-auto">
            <TeacherScheduleView />
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
