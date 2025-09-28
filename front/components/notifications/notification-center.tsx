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

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  // For admin, show a flat list only
  if (userType === "admin") {
    return (
      <div className="space-y-2">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={markAsRead}
            userType={userType}
          />
        ))}
      </div>
    )
  }

  // ...existing code for other user types...
}
