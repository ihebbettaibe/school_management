import { AppLayout } from "@/components/layout/app-layout"
import { WeeklySchedule } from "@/components/schedule/weekly-schedule"
import { ChildSelector } from "@/components/schedule/child-selector"
import ParentProfile from "@/components/profile/parent-profile"
// Mock data for parent's children
const mockChildren = [
  { id: "1", name: "Emma Johnson", grade: "Grade 5", section: "A" },
  { id: "2", name: "Liam Johnson", grade: "Grade 3", section: "B" },
]

export default function ParentSchedulePage() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6 bg-background min-h-[80vh]">
        <div className="flex flex-col space-y-2 md:flex-row md:items-end md:justify-between md:space-y-0 border-b pb-4">
          <div>
            <h1 className="text-6xl font-extrabold text-primary tracking-tight font-sans mb-4">Schedule Overview</h1>
            <p className="text-lg text-blue-500 font-semibold">Review the weekly timetable for your children</p>
          </div>
          <ChildSelector children={mockChildren} />
        </div>

        <WeeklySchedule userType="parent" />
      </div>
    </AppLayout>
  )
}
