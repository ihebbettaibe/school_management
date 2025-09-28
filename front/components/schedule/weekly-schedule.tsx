"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScheduleBlock } from "./schedule-block"
import { ScheduleDetailModal } from "./schedule-detail-modal"

interface ScheduleItem {
  id: string
  subject: string
  teacher: string
  classroom: string
  time: string
  day: string
  color: string
  assignments?: number
  exams?: number
}

interface WeeklyScheduleProps {
  userType: "parent" | "teacher"
}

// Mock schedule data (restored color palette for distinction)
const mockScheduleData: ScheduleItem[] = [
  {
    id: "1",
    subject: "Mathematics",
    teacher: "Ms. Sarah Wilson",
    classroom: "Room 101",
    time: "09:00",
    day: "Monday",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    assignments: 2,
  },
  {
    id: "2",
    subject: "English",
    teacher: "Mr. John Davis",
    classroom: "Room 205",
    time: "10:00",
    day: "Monday",
    color: "bg-green-100 text-green-800 border-green-200",
    exams: 1,
  },
  {
    id: "3",
    subject: "Science",
    teacher: "Dr. Emily Chen",
    classroom: "Lab 1",
    time: "11:00",
    day: "Monday",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: "4",
    subject: "Mathematics",
    teacher: "Ms. Sarah Wilson",
    classroom: "Room 101",
    time: "09:00",
    day: "Tuesday",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "5",
    subject: "History",
    teacher: "Mr. Robert Brown",
    classroom: "Room 302",
    time: "10:00",
    day: "Tuesday",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    assignments: 1,
  },
  {
    id: "6",
    subject: "Art",
    teacher: "Ms. Lisa Garcia",
    classroom: "Art Studio",
    time: "11:00",
    day: "Tuesday",
    color: "bg-pink-100 text-pink-800 border-pink-200",
  },
]

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"]
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

export function WeeklySchedule({ userType }: WeeklyScheduleProps) {
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null)

  const getScheduleItem = (day: string, time: string) => {
    return mockScheduleData.find((item) => item.day === day && item.time === time)
  }

  return (
    <>
      <Card className="shadow-none border border-gray-200 max-w-7xl mx-auto">
        <CardContent className="p-12">
          <div className="grid grid-cols-6 gap-4">
            {/* Header row */}
            <div className="font-extrabold text-center p-6 text-xl text-gray-700 bg-gray-50 border-b border-gray-200 tracking-wide">Time</div>
            {days.map((day) => (
              <div key={day} className="font-extrabold text-center p-6 text-xl text-gray-700 bg-gray-50 border-b border-gray-200 tracking-wide">
                {day.slice(0, 3)}
              </div>
            ))}

            {/* Schedule grid */}
            {timeSlots.map((time) => (
              <React.Fragment key={time}>
                <div
                  key={`time-${time}`}
                  className="text-xl text-gray-700 text-center p-6 border-r border-gray-200 bg-white font-bold"
                >
                  {time}
                </div>
                {days.map((day) => {
                  const item = getScheduleItem(day, time)
                  return (
                    <div key={`${day}-${time}`} className="p-2">
                      {item ? (
                        <ScheduleBlock item={item} onClick={() => setSelectedItem(item)} className="h-28 text-xl" />
                      ) : (
                        <div className="h-28 border border-dashed border-gray-200 rounded-md bg-gray-50"></div>
                      )}
                    </div>
                  )
                })}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedItem && (
        <ScheduleDetailModal item={selectedItem} userType={userType} onClose={() => setSelectedItem(null)} />
      )}
    </>
  )
}
