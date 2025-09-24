"use client"

import { Badge } from "@/components/ui/badge"
import { BookOpen, FileText } from "lucide-react"

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
  class?: string
}

interface ScheduleBlockProps {
  item: ScheduleItem
  onClick: () => void
  className?: string
}



export function ScheduleBlock({ item, onClick, className = "" }: ScheduleBlockProps) {
  return (
    <div
      className={`${item.color} p-2 rounded-md cursor-pointer h-14 relative border border-gray-200 ${className}`}
      onClick={onClick}
      style={{ transition: 'none' }}
    >
      <div className="text-xs font-semibold truncate text-gray-800">{item.subject}</div>
      <div className="text-xs text-gray-500 truncate">{item.classroom}</div>
      {item.class && <div className="text-xs text-gray-400 truncate">{item.class}</div>}

      {/* Assignment and exam badges */}
      <div className="absolute top-1 right-1 flex space-x-1">
        {item.assignments && item.assignments > 0 && (
          <Badge variant="secondary" className="h-4 w-4 p-0 flex items-center justify-center text-xs bg-gray-200 text-gray-700 border-none">
            <FileText className="h-2 w-2" />
          </Badge>
        )}
        {item.exams && item.exams > 0 && (
          <Badge variant="outline" className="h-4 w-4 p-0 flex items-center justify-center text-xs border-gray-400 text-gray-700">
            <BookOpen className="h-2 w-2" />
          </Badge>
        )}
      </div>
    </div>
  )
}
