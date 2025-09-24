"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssignmentDetailModal } from "./assignment-detail-modal"
import { Calendar, Clock, FileText, CheckCircle, AlertCircle } from "lucide-react"

interface Assignment {
  id: string
  title: string
  subject: string
  teacher: string
  description: string
  dueDate: string
  status: "pending" | "completed" | "overdue"
  priority: "low" | "medium" | "high"
  attachments?: string[]
}

interface AssignmentListProps {
  userType: "parent" | "teacher"
}

// Mock assignment data
const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Math Worksheet - Fractions",
    subject: "Mathematics",
    teacher: "Ms. Sarah Wilson",
    description: "Complete exercises 1-15 on page 42. Show all work and simplify fractions.",
    dueDate: "2024-01-15",
    status: "pending",
    priority: "high",
    attachments: ["worksheet.pdf"],
  },
  {
    id: "2",
    title: "Science Project - Solar System",
    subject: "Science",
    teacher: "Dr. Emily Chen",
    description: "Create a model of the solar system using any materials. Include a written report about each planet.",
    dueDate: "2024-01-20",
    status: "pending",
    priority: "medium",
  },
  {
    id: "3",
    title: "English Essay - My Summer Vacation",
    subject: "English",
    teacher: "Mr. John Davis",
    description: "Write a 500-word essay about your summer vacation. Include descriptive language and proper grammar.",
    dueDate: "2024-01-10",
    status: "completed",
    priority: "low",
  },
  {
    id: "4",
    title: "History Timeline",
    subject: "History",
    teacher: "Mr. Robert Brown",
    description: "Create a timeline of major events in World War II.",
    dueDate: "2024-01-08",
    status: "overdue",
    priority: "high",
  },
]

export function AssignmentList({ userType }: AssignmentListProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filterAssignments = (status?: string) => {
    if (!status) return mockAssignments
    return mockAssignments.filter((assignment) => assignment.status === status)
  }

  const AssignmentCard = ({ assignment }: { assignment: Assignment }) => (
    <Card
      className="cursor-pointer border border-gray-200"
      onClick={() => setSelectedAssignment(assignment)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold font-sans tracking-tight">{assignment.title}</CardTitle>
          <div className="flex space-x-2">
            <Badge variant="outline" className={getPriorityColor(assignment.priority)}>
              <span className="capitalize font-sans text-xs">{assignment.priority}</span>
            </Badge>
            <Badge variant="outline" className={getStatusColor(assignment.status)}>
              <div className="flex items-center space-x-1 font-sans text-xs">
                {getStatusIcon(assignment.status)}
                <span className="capitalize">{assignment.status}</span>
              </div>
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground font-sans">
          <span>{assignment.subject}</span>
          <span>•</span>
          <span>{assignment.teacher}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 font-sans">{assignment.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm font-sans">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
          </div>
          {assignment.attachments && assignment.attachments.length > 0 && (
            <div className="flex items-center space-x-1 text-sm text-muted-foreground font-sans">
              <FileText className="h-4 w-4" />
              <span>{assignment.attachments.length}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({mockAssignments.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filterAssignments("pending").length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({filterAssignments("completed").length})</TabsTrigger>
          <TabsTrigger value="overdue">Overdue ({filterAssignments("overdue").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {mockAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterAssignments("pending").map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {filterAssignments("completed").map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          {filterAssignments("overdue").map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabsContent>
      </Tabs>

      {selectedAssignment && (
        <AssignmentDetailModal
          assignment={selectedAssignment}
          userType={userType}
          onClose={() => setSelectedAssignment(null)}
        />
      )}
    </>
  )
}
