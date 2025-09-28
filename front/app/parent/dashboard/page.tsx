"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, UserCheck, MessageSquare, Bell, TrendingUp, Star, Heart, Zap, Award } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

// Mock data for parent dashboard
const childrenData = [
  {
    id: "1",
    name: "Emma Johnson",
    grade: "Grade 5-A",
    attendance: 95,
    assignments: { pending: 2, completed: 8 },
    nextClass: "Mathematics at 09:00",
  },
  {
    id: "2",
    name: "Lucas Johnson",
    grade: "Grade 3-B",
    attendance: 92,
    assignments: { pending: 1, completed: 12 },
    nextClass: "English at 10:30",
  },
]

const recentUpdates = [
  {
    id: "1",
    type: "assignment",
    message: "New assignment posted for Mathematics",
    child: "Emma Johnson",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "announcement",
    message: "School closure announcement",
    child: "All children",
    time: "4 hours ago",
  },
  {
    id: "3",
    type: "grade",
    message: "Grade updated for Science quiz",
    child: "Lucas Johnson",
    time: "1 day ago",
  },
]

export default function ParentDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage();

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <AppLayout>
        <div className="space-y-10 relative">
          <div className="card-super-fun p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-2xl animate-sparkle">🌟</div>
            <div className="absolute bottom-4 left-4 text-xl animate-bounce-gentle">⭐</div>
            <div className="relative z-10">
              <h1 className="heading-super-fun text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-slide-in-up">
                {t.homepage.title}, {user?.firstName}! 👋
              </h1>
              <p
                className="text-super-playful text-muted-foreground animate-slide-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                {t.homepage.tagline}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {childrenData.map((child, index) => (
              <Card key={child.id} className="card-super-fun hover:animate-jiggle relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-3xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-accent/20 to-transparent rounded-tr-3xl"></div>

                <CardHeader className="pb-6 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center animate-pulse-fun">
                        <span className="text-2xl">👦</span>
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-black text-foreground group-hover:animate-wiggle">
                          {child.name}
                        </CardTitle>
                        <span className="text-lg font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {child.grade}
                        </span>
                      </div>
                    </div>
                    <Star className="w-6 h-6 text-yellow-400 animate-sparkle" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl border-2 border-green-200 hover:scale-105 transition-all duration-300">
                      <div className="text-4xl font-black text-green-600 animate-pulse-fun">{child.attendance}%</div>
                      <p className="text-sm font-bold text-green-700 mt-2">Attendance 📊</p>
                      <div className="text-lg mt-1">🎯</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl border-2 border-orange-200 hover:scale-105 transition-all duration-300">
                      <div className="text-4xl font-black text-orange-600 animate-pulse-fun">
                        {child.assignments.pending}
                      </div>
                      <p className="text-sm font-bold text-orange-700 mt-2">Pending Tasks 📝</p>
                      <div className="text-lg mt-1">⏰</div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 relative overflow-hidden">
                    <div className="absolute top-2 right-2 text-lg animate-float-soft">📚</div>
                    <p className="text-sm font-bold text-blue-700 mb-2">Next Class:</p>
                    <p className="text-lg font-black text-blue-800">{child.nextClass}</p>
                    <div className="absolute bottom-2 left-2 text-sm animate-bounce-gentle">🔔</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="card-super-fun relative overflow-hidden">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-b-full"></div>

            <CardHeader className="pb-6 text-center">
              <CardTitle className="heading-super-fun flex items-center justify-center space-x-3">
                <Zap className="w-8 h-8 text-yellow-500 animate-sparkle" />
                <span>Quick Actions</span>
                <Heart className="w-8 h-8 text-pink-500 animate-pulse-fun" />
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  {
                    href: "/parent/schedule",
                    icon: Calendar,
                    label: "Schedule",
                    emoji: "📅",
                    color: "from-blue-500 to-blue-600",
                  },
                  {
                    href: "/parent/assignments",
                    icon: FileText,
                    label: "Assignments",
                    emoji: "📝",
                    color: "from-green-500 to-green-600",
                  },
                  {
                    href: "/parent/attendance",
                    icon: UserCheck,
                    label: "Attendance",
                    emoji: "✅",
                    color: "from-purple-500 to-purple-600",
                  },
                  {
                    href: "/parent/feed",
                    icon: MessageSquare,
                    label: "School Feed",
                    emoji: "💬",
                    color: "from-orange-500 to-orange-600",
                  },
                  {
                    href: "/parent/notifications",
                    icon: Bell,
                    label: "Notifications",
                    emoji: "🔔",
                    color: "from-red-500 to-red-600",
                  },
                  {
                    href: "/parent/analytics",
                    icon: TrendingUp,
                    label: "Analytics",
                    emoji: "📊",
                    color: "from-teal-500 to-teal-600",
                  },
                ].map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Button
                      key={action.href}
                      asChild
                      className={`h-28 flex-col space-y-3 bg-gradient-to-br ${action.color} text-white hover:scale-110 transition-all duration-300 rounded-2xl border-0 shadow-lg hover:shadow-2xl group relative overflow-hidden`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Link href={action.href}>
                        <div className="absolute top-1 right-1 text-lg animate-bounce-gentle">{action.emoji}</div>
                        <Icon className="w-8 h-8 group-hover:animate-wiggle" />
                        <span className="text-sm font-bold group-hover:animate-jiggle">{action.label}</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="card-super-fun relative overflow-hidden">
            <div className="absolute top-4 right-4 text-xl animate-sparkle">📢</div>

            <CardHeader className="pb-6">
              <CardTitle className="heading-super-fun flex items-center space-x-3">
                <Award className="w-8 h-8 text-yellow-500 animate-pulse-fun" />
                <span>Recent Updates</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {recentUpdates.map((update, index) => (
                <div
                  key={update.id}
                  className="flex items-start space-x-6 p-6 bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:animate-jiggle ${
                      update.type === "assignment"
                        ? "bg-gradient-to-br from-green-400 to-green-500"
                        : update.type === "announcement"
                          ? "bg-gradient-to-br from-blue-400 to-blue-500"
                          : "bg-gradient-to-br from-purple-400 to-purple-500"
                    }`}
                  >
                    {update.type === "assignment" && <FileText className="w-7 h-7 text-white" />}
                    {update.type === "announcement" && <MessageSquare className="w-7 h-7 text-white" />}
                    {update.type === "grade" && <TrendingUp className="w-7 h-7 text-white" />}
                  </div>

                  <div className="flex-1">
                    <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {update.message}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {update.child}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">{update.time}</p>
                    </div>
                  </div>

                  <div className="absolute top-2 right-2 text-lg animate-float-soft opacity-60">
                    {update.type === "assignment" ? "📝" : update.type === "announcement" ? "📢" : "🎯"}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
