"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, FileText, CheckCircle, AlertCircle, User, BookOpen, Download } from "lucide-react"

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

interface AssignmentDetailModalProps {
  assignment: Assignment
  userType: "parent" | "teacher"
  onClose: () => void
}

export function AssignmentDetailModal({ assignment, userType, onClose }: AssignmentDetailModalProps) {
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

  const handleMarkComplete = () => {
    // Mock function - in real app, this would update the assignment status
    console.log("Marking assignment as complete:", assignment.id)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{assignment.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Priority Badges */}
          <div className="flex space-x-2">
            <Badge variant="outline" className={getStatusColor(assignment.status)}>
              <div className="flex items-center space-x-1">
                {getStatusIcon(assignment.status)}
                <span className="capitalize">{assignment.status}</span>
              </div>
            </Badge>
            <Badge variant="outline" className={getPriorityColor(assignment.priority)}>
              <span className="capitalize">{assignment.priority} Priority</span>
            </Badge>
          </div>

          {/* Assignment Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Subject:</span>
              <span>{assignment.subject}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Teacher:</span>
              <span>{assignment.teacher}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Due Date:</span>
              <span>{new Date(assignment.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Days Left:</span>
              <span>
                {Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                days
              </span>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{assignment.description}</p>
          </div>

          {/* Attachments */}
          {assignment.attachments && assignment.attachments.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Attachments</h4>
                <div className="space-y-2">
                  {assignment.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm">{attachment}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {userType === "parent" && assignment.status === "pending" && (
              <Button onClick={handleMarkComplete} className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Complete
              </Button>
            )}
            {userType === "teacher" && (
              <>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Edit Assignment
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  View Submissions
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
