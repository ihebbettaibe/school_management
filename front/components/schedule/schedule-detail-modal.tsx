"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, User, FileText, BookOpen } from "lucide-react"

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

interface ScheduleDetailModalProps {
  item: ScheduleItem
  userType: "parent" | "teacher"
  onClose: () => void
}

export function ScheduleDetailModal({ item, userType, onClose }: ScheduleDetailModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border border-gray-200">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-gray-800">
            <div className="w-4 h-4 rounded bg-gray-300"></div>
            <span>{item.subject}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{item.day}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>{item.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-400" />
              <span>{item.teacher}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{item.classroom}</span>
            </div>
          </div>

          {/* Assignments and Exams */}
          {(item.assignments || item.exams) && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Tasks & Assessments</h4>
              <div className="space-y-2">
                {item.assignments && item.assignments > 0 && (
                  <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Assignments</span>
                    </div>
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700 border-none">{item.assignments}</Badge>
                  </div>
                )}
                {item.exams && item.exams > 0 && (
                  <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Exams</span>
                    </div>
                    <Badge variant="outline" className="border-gray-400 text-gray-700">{item.exams}</Badge>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action buttons based on user type */}
          <div className="flex space-x-2">
            {userType === "teacher" && (
              <>
                <Button variant="outline" size="sm" className="flex-1 bg-white border-gray-300 text-gray-700">Add Assignment</Button>
                <Button variant="outline" size="sm" className="flex-1 bg-white border-gray-300 text-gray-700">Mark Attendance</Button>
              </>
            )}
            {userType === "parent" && item.assignments && item.assignments > 0 && (
              <Button variant="outline" size="sm" className="flex-1 bg-white border-gray-300 text-gray-700">View Assignments</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
