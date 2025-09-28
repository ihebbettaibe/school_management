
import { AppLayout } from "@/components/layout/app-layout";
import { WeeklySchedule } from "@/components/schedule/weekly-schedule";
import { ChildSelector } from "@/components/schedule/child-selector";

// Mock data for parent's children
const mockChildren = [
  { id: "1", name: "Emma Johnson", grade: "Grade 5", section: "A" },
  { id: "2", name: "Liam Johnson", grade: "Grade 3", section: "B" },
];

export default function ParentSchedulePage() {
  return (
    <AppLayout>
      <div className="px-2 py-4 sm:px-4 sm:py-8 md:p-16 space-y-8 sm:space-y-16 max-w-6xl mx-auto w-full">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent font-sans mb-4">
            Schedule Overview
          </h1>
          <p className="text-2xl text-muted-foreground font-semibold max-w-2xl mx-auto">
            Review the weekly timetable for your children
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 w-full border-b pb-4">
            <div className="flex flex-col gap-2">
              <span className="text-lg sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center gap-1 sm:gap-2 md:gap-4">
                <span className="text-lg sm:text-2xl md:text-4xl">👨‍👩‍👧‍👦</span>
                <span>Children</span>
              </span>
              <span className="text-base text-muted-foreground">Select a child to view their schedule</span>
            </div>
            <div className="min-w-[180px]">
              <ChildSelector children={mockChildren} />
            </div>
          </div>

          <div className="w-full">
            <WeeklySchedule userType="parent" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
