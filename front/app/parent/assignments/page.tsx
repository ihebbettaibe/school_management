import { AppLayout } from "@/components/layout/app-layout"
import { AssignmentList } from "@/components/assignments/assignment-list"
import { ChildSelector } from "@/components/schedule/child-selector"

// Mock data for parent's children
const mockChildren = [
  { id: "1", name: "Emma Johnson", grade: "Grade 5", section: "A" },
  { id: "2", name: "Liam Johnson", grade: "Grade 3", section: "B" },
]

export default function ParentAssignmentsPage() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6 bg-background min-h-[80vh]">
        <div className="flex flex-col space-y-2 md:flex-row md:items-end md:justify-between md:space-y-0 border-b pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight font-sans">Assignments</h1>
            <p className="text-sm text-muted-foreground font-sans">Review your child's assignments and homework</p>
          </div>
          <ChildSelector children={mockChildren} />
        </div>

        <AssignmentList userType="parent" />
      </div>
    </AppLayout>
  )
}
