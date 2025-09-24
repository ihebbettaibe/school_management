import { AppLayout } from "@/components/layout/app-layout"
import { AttendanceOverview } from "@/components/attendance/attendance-overview"

export default function AdminAttendancePage() {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance Overview</h1>
          <p className="text-muted-foreground">Monitor attendance across all classes and grades</p>
        </div>

        <AttendanceOverview />
      </div>
    </AppLayout>
  )
}
