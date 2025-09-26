import { AppLayout } from "@/components/layout/app-layout"
import { AttendanceHistory } from "@/components/attendance/attendance-history"
import { ChildSelector } from "@/components/schedule/child-selector"

// Mock data for parent's children
const mockChildren = [
  { id: "1", name: "Emma Johnson", grade: "Grade 5", section: "A" },
  { id: "2", name: "Liam Johnson", grade: "Grade 3", section: "B" },
]

export default function ParentAttendancePage() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6 bg-background min-h-[80vh]">
        <div className="flex flex-col space-y-2 md:flex-row md:items-end md:justify-between md:space-y-0 border-b pb-4">
          <div>
            <h1 className="text-6xl font-extrabold text-primary tracking-tight font-sans mb-2">Attendance History</h1>
            <p className="text-2xl text-muted-foreground font-semibold font-sans">Review your child's attendance record</p>
          </div>
          <ChildSelector children={mockChildren} />
        </div>

        <AttendanceHistory userType="parent" />
      </div>
    </AppLayout>
  )
}
