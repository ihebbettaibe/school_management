import { AppLayout } from "@/components/layout/app-layout"
import { AttendanceOverview } from "@/components/attendance/attendance-overview"

export default function AdminAttendancePage() {
  return (
    <AppLayout>
      <div className="px-2 sm:px-4 md:px-8 py-4 space-y-4 sm:space-y-6 w-full max-w-6xl mx-auto">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Attendance Overview</h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">Monitor attendance across all classes and grades</p>
        </div>

        <AttendanceOverview />
      </div>
    </AppLayout>
  )
}
