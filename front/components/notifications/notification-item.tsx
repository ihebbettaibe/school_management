"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  BookOpen,
  UserX,
  Users,
  Megaphone,
  Settings,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
} from "lucide-react"

interface Notification {
  id: string
  type: "assignment" | "exam" | "attendance" | "meeting" | "announcement" | "system"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  priority: "low" | "medium" | "high"
  relatedTo?: {
    type: "child" | "class" | "subject"
    name: string
  }
  actionRequired?: boolean
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  userType: "parent" | "teacher" | "admin"
}

export function NotificationItem({ notification, onMarkAsRead, userType }: NotificationItemProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <FileText className="h-5 w-5" />
      case "exam":
        return <BookOpen className="h-5 w-5" />
      case "attendance":
        return <UserX className="h-5 w-5" />
      case "meeting":
        return <Users className="h-5 w-5" />
      case "announcement":
        return <Megaphone className="h-5 w-5" />
      case "system":
        return <Settings className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "text-blue-600 bg-blue-100"
      case "exam":
        return "text-purple-600 bg-purple-100"
      case "attendance":
        return "text-red-600 bg-red-100"
      case "meeting":
        return "text-green-600 bg-green-100"
      case "announcement":
        return "text-orange-600 bg-orange-100"
      case "system":
        return "text-gray-600 bg-gray-100"
      default:
        return "text-gray-600 bg-gray-100"
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

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const handleAction = () => {
    // Mock function - in real app, this would handle specific actions
    console.log("Handling action for notification:", notification.id)
    onMarkAsRead(notification.id)
  }

  return (
    <Card className={`transition-all hover:shadow-md ${!notification.isRead ? "border-primary/50 bg-primary/5" : ""}`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
            {getNotificationIcon(notification.type)}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3
                  className={`text-xl font-semibold tracking-tight font-sans ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {notification.title}
                </h3>
                <p className="text-base text-foreground font-normal font-sans leading-relaxed">{notification.message}</p>
              </div>

              {/* Badges and Actions */}
              <div className="flex items-center space-x-2 ml-4">
                {notification.priority === "high" && (
                  <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    <span className="font-bold">Haute</span>
                  </Badge>
                )}

                {notification.actionRequired && !notification.isRead && (
                  <Badge variant="destructive" className="text-sm font-bold">
                    Action requise
                  </Badge>
                )}

                {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full"></div>}
              </div>
            </div>

            {/* Related Info */}
            {notification.relatedTo && (
              <div className="text-sm text-muted-foreground font-medium">Lié à: {notification.relatedTo.name}</div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground">{formatTimestamp(notification.timestamp)}</span>

              <div className="flex items-center space-x-2">
                {notification.actionRequired && !notification.isRead && (
                  <Button size="sm" onClick={handleAction} className="font-bold">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Agir
                  </Button>
                )}

                {!notification.isRead && (
                  <Button variant="ghost" size="sm" onClick={() => onMarkAsRead(notification.id)}>
                    <Eye className="h-3 w-3 mr-1" />
                    Marquer comme lu
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
