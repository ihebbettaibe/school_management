"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationItem } from "./notification-item"
import { CheckCheck, Filter, MessageSquare } from "lucide-react"
import { Heart } from "lucide-react"
// Mock meeting requests (moved from parent-profile)
const mockMeetingRequests = [
  {
    id: "1",
    teacherName: "Ms. Rodriguez",
    subject: "Mathematics",
    childName: "Emma Johnson",
    requestedDate: "2024-01-15",
    reason: "Discuss Emma's progress in advanced math topics",
    status: "pending",
  },
  {
    id: "2",
    teacherName: "Mr. Thompson",
    subject: "English",
    childName: "Liam Johnson",
    requestedDate: "2024-01-18",
    reason: "Review reading comprehension improvement strategies",
    status: "accepted",
  },
]

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

interface NotificationCenterProps {
  userType: "parent" | "teacher" | "admin"
}

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "assignment",
    title: "New Assignment: Math Worksheet",
    message: "Ms. Sarah Wilson has assigned a new math worksheet for Emma. Due date: January 15th.",
    timestamp: "2024-01-12T10:30:00Z",
    isRead: false,
    priority: "medium",
    relatedTo: { type: "child", name: "Emma Johnson" },
    actionRequired: true,
  },
  {
    id: "2",
    type: "attendance",
    title: "Attendance Alert",
    message: "Liam Johnson was marked absent from school today. Please contact the school if this is incorrect.",
    timestamp: "2024-01-12T09:15:00Z",
    isRead: false,
    priority: "high",
    relatedTo: { type: "child", name: "Liam Johnson" },
    actionRequired: true,
  },
  {
    id: "3",
    type: "meeting",
    title: "Parent-Teacher Meeting Request",
    message: "Dr. Emily Chen would like to schedule a meeting to discuss Emma's science project progress.",
    timestamp: "2024-01-11T16:45:00Z",
    isRead: false,
    priority: "medium",
    relatedTo: { type: "child", name: "Emma Johnson" },
    actionRequired: true,
  },
  {
    id: "4",
    type: "exam",
    title: "Upcoming Exam: Science Test",
    message: "Science test scheduled for January 18th. Study guide has been shared with students.",
    timestamp: "2024-01-11T14:20:00Z",
    isRead: true,
    priority: "medium",
    relatedTo: { type: "child", name: "Emma Johnson" },
  },
  {
    id: "5",
    type: "announcement",
    title: "School Closure - Weather Alert",
    message: "School will be closed tomorrow due to severe weather conditions. All activities cancelled.",
    timestamp: "2024-01-11T18:00:00Z",
    isRead: true,
    priority: "high",
  },
  {
    id: "6",
    type: "assignment",
    title: "Assignment Reminder",
    message: "History timeline assignment is due tomorrow. Please ensure Emma has completed it.",
    timestamp: "2024-01-10T15:30:00Z",
    isRead: true,
    priority: "high",
    relatedTo: { type: "child", name: "Emma Johnson" },
    actionRequired: true,
  },
]

// Admin-specific notification data
const getAdminNotifications = (): Notification[] => [
  {
    id: "admin-1",
    type: "system",
    title: "Mise à jour système disponible",
    message: "Une nouvelle version du système est disponible. Planifiez la mise à jour pendant les heures creuses.",
    timestamp: "2024-01-12T10:30:00Z",
    isRead: false,
    priority: "medium",
    actionRequired: true,
  },
  {
    id: "admin-2",
    type: "system",
    title: "Nouvelle inscription enseignant",
    message: "Marie Dubois a soumis une demande d'inscription en tant qu'enseignante. Vérification requise.",
    timestamp: "2024-01-12T09:15:00Z",
    isRead: false,
    priority: "high",
    actionRequired: true,
  },
  {
    id: "admin-3",
    type: "meeting",
    title: "Demande de réunion - Conseil d'école",
    message: "Le président du conseil d'école souhaite programmer une réunion extraordinaire pour discuter du budget.",
    timestamp: "2024-01-11T16:45:00Z",
    isRead: false,
    priority: "medium",
    actionRequired: true,
  },
  {
    id: "admin-4",
    type: "system",
    title: "Alerte de sécurité",
    message: "Tentative de connexion suspecte détectée. Vérifiez les logs de sécurité.",
    timestamp: "2024-01-11T14:20:00Z",
    isRead: true,
    priority: "high",
  },
  {
    id: "admin-5",
    type: "announcement",
    title: "Maintenance programmée",
    message: "Maintenance du serveur prévue ce weekend. Informez les utilisateurs de l'indisponibilité temporaire.",
    timestamp: "2024-01-11T18:00:00Z",
    isRead: true,
    priority: "medium",
  },
]

export function NotificationCenter({ userType }: NotificationCenterProps) {
  // Dummy translation object for meeting actions
  const t = {
    common: {
      approve: "Accepter",
      reject: "Refuser",
    },
  }

  // Dummy meeting response handler
  const handleMeetingResponse = (requestId: string, response: "accept" | "decline") => {
    // In real app, this would update the database
    console.log(`Meeting request ${requestId} ${response}ed`)
  }
  const [notifications, setNotifications] = useState<Notification[]>(
    userType === "admin" ? getAdminNotifications() : mockNotifications,
  )

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const actionRequiredCount = notifications.filter((n) => n.actionRequired && !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const filterNotifications = (filter: string) => {
    switch (filter) {
      case "unread":
        return notifications.filter((n) => !n.isRead)
      case "action":
        return notifications.filter((n) => n.actionRequired && !n.isRead)
      case "high":
        return notifications.filter((n) => n.priority === "high")
      default:
        return notifications
    }
  }

  const getNotificationsByType = (type: string) => {
    return notifications.filter((n) => n.type === type)
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Non lues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{unreadCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Action requise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{actionRequiredCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{notifications.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filtrer les notifications</span>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Tout marquer comme lu
          </Button>
        )}
      </div>

      {/* Notification Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            Toutes
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">Non lues ({filterNotifications("unread").length})</TabsTrigger>
          <TabsTrigger value="action">Action ({actionRequiredCount})</TabsTrigger>
          <TabsTrigger value="assignments">Devoirs ({getNotificationsByType("assignment").length})</TabsTrigger>
          <TabsTrigger value="high">Priorité haute ({filterNotifications("high").length})</TabsTrigger>
          <TabsTrigger value="meetings">Réunions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              userType={userType}
            />
          ))}
        </TabsContent>

        <TabsContent value="unread" className="space-y-3">
          {filterNotifications("unread").map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              userType={userType}
            />
          ))}
        </TabsContent>

        <TabsContent value="action" className="space-y-3">
          {filterNotifications("action").map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              userType={userType}
            />
          ))}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-3">
          {getNotificationsByType("assignment").map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              userType={userType}
            />
          ))}
        </TabsContent>

        <TabsContent value="high" className="space-y-3">
          {filterNotifications("high").map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              userType={userType}
            />
          ))}
        </TabsContent>
        <TabsContent value="meetings" className="space-y-3">
          {/* Meeting requests UI moved from parent-profile.tsx */}
          <Card className="card-super-fun relative overflow-hidden">
            <div className="absolute top-4 right-4 text-2xl animate-bounce-gentle">💬</div>
            <CardHeader>
              <CardTitle className="heading-super-fun flex items-center space-x-3">
                <MessageSquare className="w-8 h-8 text-primary animate-pulse-fun" />
                <span>Demandes de réunion</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockMeetingRequests.map((request: {
                  id: string;
                  teacherName: string;
                  subject: string;
                  childName: string;
                  requestedDate: string;
                  reason: string;
                  status: string;
                }) => (
                  <div
                    key={request.id}
                    className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">👨‍🏫</div>
                        <div>
                          <h4 className="text-xl font-bold text-primary font-sans">{request.teacherName}</h4>
                          <p className="text-lg font-semibold text-primary/80 font-sans">{request.subject}</p>
                          <Badge
                            variant={request.status === "pending" ? "default" : "secondary"}
                            className="mt-2 text-sm font-bold px-3 py-1 rounded-full"
                          >
                            {request.status === "pending" ? "En attente" : "Acceptée"}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-primary/70 font-sans">Pour: {request.childName}</p>
                        <p className="text-sm font-semibold text-primary/70 font-sans">Date: {request.requestedDate}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-base font-medium text-primary/80 font-sans">{request.reason}</p>
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleMeetingResponse(request.id, "accept")}
                          className="bg-green-50 hover:bg-green-100 text-green-600 font-bold rounded border border-green-100"
                        >
                          ✅ {t.common.approve}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleMeetingResponse(request.id, "decline")}
                          className="bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded border border-red-100"
                        >
                          ❌ {t.common.reject}
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded border border-blue-100"
                        >
                          💬 Message
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
