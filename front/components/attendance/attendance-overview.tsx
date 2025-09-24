"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Users, TrendingDown, TrendingUp, Calendar } from "lucide-react"

interface ClassAttendance {
  className: string
  totalStudents: number
  presentToday: number
  absentToday: number
  lateToday: number
  attendanceRate: number
}

type AttendanceOverviewProps = {}

// Mock class attendance data
const mockClassAttendance: ClassAttendance[] = [
  {
    className: "Grade 5 - Section A",
    totalStudents: 28,
    presentToday: 26,
    absentToday: 1,
    lateToday: 1,
    attendanceRate: 93,
  },
  {
    className: "Grade 5 - Section B",
    totalStudents: 30,
    presentToday: 28,
    absentToday: 2,
    lateToday: 0,
    attendanceRate: 93,
  },
  {
    className: "Grade 4 - Section A",
    totalStudents: 25,
    presentToday: 24,
    absentToday: 1,
    lateToday: 0,
    attendanceRate: 96,
  },
  {
    className: "Grade 4 - Section B",
    totalStudents: 27,
    presentToday: 25,
    absentToday: 1,
    lateToday: 1,
    attendanceRate: 93,
  },
]

// Mock chart data
const chartData = [
  { name: "Mon", present: 95, absent: 5 },
  { name: "Tue", present: 92, absent: 8 },
  { name: "Wed", present: 96, absent: 4 },
  { name: "Thu", present: 94, absent: 6 },
  { name: "Fri", present: 93, absent: 7 },
]

export function AttendanceOverview({}: AttendanceOverviewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("today")

  const getTotalStats = () => {
    const totalStudents = mockClassAttendance.reduce((sum, cls) => sum + cls.totalStudents, 0)
    const totalPresent = mockClassAttendance.reduce((sum, cls) => sum + cls.presentToday, 0)
    const totalAbsent = mockClassAttendance.reduce((sum, cls) => sum + cls.absentToday, 0)
    const totalLate = mockClassAttendance.reduce((sum, cls) => sum + cls.lateToday, 0)
    const overallRate = Math.round((totalPresent / totalStudents) * 100)

    return { totalStudents, totalPresent, totalAbsent, totalLate, overallRate }
  }

  const stats = getTotalStats()

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Tableau de Bord des Présences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="text-sm font-medium">Période</label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="week">Cette Semaine</SelectItem>
                <SelectItem value="month">Ce Mois</SelectItem>
                <SelectItem value="term">Ce Trimestre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{stats.overallRate}%</div>
            <div className="text-sm text-muted-foreground">Taux Global</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-success mb-2">{stats.totalPresent}</div>
            <div className="text-sm text-muted-foreground">Présents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-error mb-2">{stats.totalAbsent}</div>
            <div className="text-sm text-muted-foreground">Absents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-muted-foreground mb-2">{stats.totalStudents}</div>
            <div className="text-sm text-muted-foreground">Total Étudiants</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tendance Hebdomadaire des Présences</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              present: { label: "Présent %", color: "#22c55e" },
              absent: { label: "Absent %", color: "#ef4444" },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="present"
                  fill="#22c55e"
                  name="Présent %"
                  radius={[4, 4, 0, 0]}
                  stroke="white"
                  strokeWidth={1}
                />
                <Bar
                  dataKey="absent"
                  fill="#ef4444"
                  name="Absent %"
                  radius={[4, 4, 0, 0]}
                  stroke="white"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Class-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Class-wise Attendance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockClassAttendance.map((classData, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{classData.className}</div>
                    <div className="text-sm text-muted-foreground">{classData.totalStudents} students</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Present: {classData.presentToday}</div>
                    <div className="text-sm text-muted-foreground">
                      Absent: {classData.absentToday} | Late: {classData.lateToday}
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={
                      classData.attendanceRate >= 95
                        ? "bg-green-100 text-green-800 border-green-200"
                        : classData.attendanceRate >= 90
                          ? "bg-orange-100 text-orange-800 border-orange-200"
                          : "bg-red-100 text-red-800 border-red-200"
                    }
                  >
                    <div className="flex items-center space-x-1">
                      {classData.attendanceRate >= 95 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>{classData.attendanceRate}%</span>
                    </div>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
