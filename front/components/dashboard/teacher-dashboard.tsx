"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, FileText, AlertCircle, Plus, Zap } from "lucide-react"
import Link from "next/link"

// Mock data - in real app, this would come from API/database
const todaysClasses = [
  {
    id: "1",
    subject: "Mathematics",
    class: "Grade 5-A",
    time: "09:00 - 09:45",
    room: "Room 201",
    studentsCount: 28,
  },
  {
    id: "2",
    subject: "Mathematics",
    class: "Grade 5-B",
    time: "10:00 - 10:45",
    room: "Room 201",
    studentsCount: 25,
  },
  {
    id: "3",
    subject: "Mathematics",
    class: "Grade 4-A",
    time: "14:00 - 14:45",
    room: "Room 201",
    studentsCount: 30,
  },
]

const upcomingAssignments = [
  {
    id: "1",
    title: "Algebra Practice Problems",
    class: "Grade 5-A",
    dueDate: "2024-01-15",
    status: "active",
    submissionsCount: 18,
    totalStudents: 28,
  },
  {
    id: "2",
    title: "Geometry Quiz",
    class: "Grade 5-B",
    dueDate: "2024-01-16",
    status: "active",
    submissionsCount: 12,
    totalStudents: 25,
  },
  {
    id: "3",
    title: "Multiplication Tables Test",
    class: "Grade 4-A",
    dueDate: "2024-01-18",
    status: "draft",
    submissionsCount: 0,
    totalStudents: 30,
  },
]

const upcomingExams = [
  {
    id: "1",
    title: "Mid-term Mathematics Exam",
    class: "Grade 5-A",
    date: "2024-01-20",
    duration: "90 minutes",
    studentsCount: 28,
  },
  {
    id: "2",
    title: "Mid-term Mathematics Exam",
    class: "Grade 5-B",
    date: "2024-01-20",
    duration: "90 minutes",
    studentsCount: 25,
  },
]

const recentActivity = [
  {
    id: "1",
    type: "assignment",
    message: "New assignment submitted by Emma Johnson",
    time: "2 hours ago",
    class: "Grade 5-A",
  },
  {
    id: "2",
    type: "attendance",
    message: "Attendance marked for Grade 5-B",
    time: "3 hours ago",
    class: "Grade 5-B",
  },
  {
    id: "3",
    type: "meeting",
    message: "Meeting request sent to Sarah Johnson",
    time: "1 day ago",
    class: "Grade 5-A",
  },
]

export function TeacherDashboard() {
  return (
    <div className="space-y-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            icon: Calendar,
            label: "Today's Classes",
            value: todaysClasses.length,
            color: "from-blue-500 to-blue-600",
            emoji: "📅",
          },
          {
            icon: FileText,
            label: "Active Assignments",
            value: upcomingAssignments.filter((a) => a.status === "active").length,
            color: "from-green-500 to-green-600",
            emoji: "📝",
          },
          {
            icon: AlertCircle,
            label: "Upcoming Exams",
            value: upcomingExams.length,
            color: "from-orange-500 to-orange-600",
            emoji: "📊",
          },
          {
            icon: Users,
            label: "Total Students",
            value: todaysClasses.reduce((sum, cls) => sum + cls.studentsCount, 0),
            color: "from-purple-500 to-purple-600",
            emoji: "👥",
          },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="card-super-fun hover:animate-jiggle relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-2xl"></div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:animate-pulse-fun`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-4xl font-black text-foreground group-hover:animate-bounce-gentle">
                      {stat.value}
                    </p>
                  </div>
                  <div className="text-2xl animate-sparkle">{stat.emoji}</div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="card-super-fun relative overflow-hidden">
          <div className="absolute top-4 right-4 text-xl animate-float-soft"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="heading-super-fun flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-blue-500 animate-pulse-fun" />
              <span>Today's Classes</span>
            </CardTitle>
            <Button variant="outline" size="sm" className="btn-fun  bg-gradient-to-r from-blue-700 to-indigo-900
  50" asChild>
              <Link href="/teacher/schedule">View Schedule 📅</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {todaysClasses.map((cls, index) => (
              <div
                key={cls.id}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center group-hover:animate-jiggle">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-blue-800 group-hover:animate-wiggle">{cls.subject}</h4>
                    <p className="text-sm font-bold text-blue-600">
                      {cls.class} • {cls.room} 🏫
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-blue-700">{cls.time}</p>
                  <p className="text-sm font-bold text-blue-600">{cls.studentsCount} students 👥</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-super-fun relative overflow-hidden">
          <div className="absolute top-4 right-4 text-xl animate-sparkle">📝</div>
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="heading-super-fun flex items-center space-x-3">
              <FileText className="w-8 h-8 text-green-500 animate-pulse-fun" />
              <span>Assignments</span>
            </CardTitle>
            <Button className="btn-primary-fun" size="sm" asChild>
              <Link href="/teacher/assignments">
                <Plus className="w-5 h-5 mr-2" />
                Create New ✨
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {upcomingAssignments.map((assignment, index) => (
              <div
                key={assignment.id}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex-1">
                  <h4 className="text-lg font-black text-green-800 group-hover:animate-wiggle">{assignment.title}</h4>
                  <p className="text-sm font-bold text-green-600 mt-1">{assignment.class} 🎓</p>
                  <p className="text-sm font-bold text-green-600">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()} 📅
                  </p>
                </div>
                <div className="text-right space-y-2">
                  <Badge
                    variant={assignment.status === "active" ? "default" : "secondary"}
                    className={`font-bold ${assignment.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}`}
                  >
                    {assignment.status} {assignment.status === "active" ? "✅" : "📝"}
                  </Badge>
                  <p className="text-sm font-bold text-green-700">
                    {assignment.submissionsCount}/{assignment.totalStudents} submitted 📊
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="card-super-fun relative overflow-hidden">
          <div className="absolute top-4 right-4 text-xl animate-bounce-gentle">📊</div>
          <CardHeader className="pb-6">
            <CardTitle className="heading-super-fun flex items-center space-x-3">
              <AlertCircle className="w-8 h-8 text-orange-500 animate-pulse-fun" />
              <span>Upcoming Exams</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {upcomingExams.map((exam, index) => (
              <div
                key={exam.id}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center group-hover:animate-jiggle">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-orange-800 group-hover:animate-wiggle">{exam.title}</h4>
                    <p className="text-sm font-bold text-orange-600">{exam.class} 🎓</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-orange-700">{new Date(exam.date).toLocaleDateString()}</p>
                  <p className="text-sm font-bold text-orange-600">{exam.duration} ⏰</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-super-fun relative overflow-hidden">
          <div className="absolute top-4 right-4 text-xl animate-sparkle">⚡</div>
          <CardHeader className="pb-6">
            <CardTitle className="heading-super-fun flex items-center space-x-3">
              <Zap className="w-8 h-8 text-purple-500 animate-pulse-fun" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {recentActivity.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-6 bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:animate-jiggle ${
                    activity.type === "assignment"
                      ? "bg-gradient-to-br from-green-400 to-green-500"
                      : activity.type === "attendance"
                        ? "bg-gradient-to-br from-blue-400 to-blue-500"
                        : "bg-gradient-to-br from-purple-400 to-purple-500"
                  }`}
                >
                  {activity.type === "assignment" && <FileText className="w-6 h-6 text-white" />}
                  {activity.type === "attendance" && <Users className="w-6 h-6 text-white" />}
                  {activity.type === "meeting" && <Calendar className="w-6 h-6 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-purple-800 group-hover:text-purple-600 transition-colors">
                    {activity.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {activity.class}
                    </p>
                    <p className="text-xs text-purple-500 font-medium">{activity.time}</p>
                  </div>
                </div>
                <div className="text-lg animate-float-soft">
                  {activity.type === "assignment" ? "📝" : activity.type === "attendance" ? "✅" : "📅"}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
