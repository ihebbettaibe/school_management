import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { AttendanceManager } from "@/components/attendance/attendance-manager"
import { MeetingRequestButton } from "@/components/meetings/meeting-request-button"

export default function TeacherStudentsPage() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <AppLayout>
        <div className="p-16 space-y-16 max-w-6xl mx-auto">
          <div className="flex flex-col space-y-10 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h1 className="text-6xl font-extrabold text-primary font-sans mb-4">Student Attendance</h1>
              <p className="text-2xl text-muted-foreground font-semibold">Mark and manage student attendance for your classes</p>
            </div>
            <MeetingRequestButton />
          </div>

          <AttendanceManager userType="teacher" />
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
