import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { AttendanceManager } from "@/components/attendance/attendance-manager"
import { MeetingRequestButton } from "@/components/meetings/meeting-request-button"

export default function TeacherStudentsPage() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <AppLayout>
        <div className="px-4 py-6 space-y-8 max-w-6xl mx-auto w-full">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-6xl font-extrabold text-primary font-sans mb-2 md:mb-4">Student Attendance</h1>
              <p className="text-base md:text-2xl text-muted-foreground font-semibold">Mark and manage student attendance for your classes</p>
            </div>
            <div className="w-full md:w-auto flex justify-end md:justify-start">
              <MeetingRequestButton />
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <AttendanceManager userType="teacher" />
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
