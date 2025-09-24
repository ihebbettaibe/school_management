"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, TrendingUp, CheckCircle, XCircle } from "lucide-react"

interface AttendanceRecord {
  id: string
  date: string
  status: "present" | "absent"
  subject?: string
  notes?: string
}

interface AttendanceHistoryProps {
  userType: "parent"
}

const mockAttendanceRecords: AttendanceRecord[] = [
  { id: "1", date: "2024-01-12", status: "present" },
  { id: "2", date: "2024-01-11", status: "present" },
  { id: "3", date: "2024-01-10", status: "present" },
  { id: "4", date: "2024-01-09", status: "present" },
  { id: "5", date: "2024-01-08", status: "absent", notes: "Congé maladie" },
  { id: "6", date: "2024-01-05", status: "present" },
  { id: "7", date: "2024-01-04", status: "present" },
  { id: "8", date: "2024-01-03", status: "present" },
  { id: "9", date: "2024-01-02", status: "present" },
  { id: "10", date: "2024-01-01", status: "present" },
]

export function AttendanceHistory({ userType }: AttendanceHistoryProps) {
  const [selectedMonth, setSelectedMonth] = useState("2024-01")
  const [records] = useState<AttendanceRecord[]>(mockAttendanceRecords)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 border-green-200"
      case "absent":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4" />
      case "absent":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getAttendanceStats = () => {
    const present = records.filter((r) => r.status === "present").length
    const absent = records.filter((r) => r.status === "absent").length
    const total = records.length
    const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0

    return { present, absent, total, attendanceRate }
  }

  const stats = getAttendanceStats()

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Résumé de présence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mois</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-01">Janvier 2024</SelectItem>
                  <SelectItem value="2023-12">Décembre 2023</SelectItem>
                  <SelectItem value="2023-11">Novembre 2023</SelectItem>
                  <SelectItem value="2023-10">Octobre 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.attendanceRate}%</div>
            <div className="text-sm text-muted-foreground">Taux de présence</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
            <div className="text-sm text-muted-foreground">Présent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
            <div className="text-sm text-muted-foreground">Absent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total des jours</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Records */}
      <Card>
        <CardHeader>
          <CardTitle>Historique de présence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {records.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{new Date(record.date).toLocaleDateString()}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(record.date).toLocaleDateString("fr-FR", { weekday: "long" })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {record.notes && (
                    <div className="text-sm text-muted-foreground max-w-48 truncate">{record.notes}</div>
                  )}
                  <Badge variant="outline" className={getStatusColor(record.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(record.status)}
                      <span className="capitalize">{record.status === "present" ? "Présent" : "Absent"}</span>
                    </div>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Aperçus de présence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Excellente présence!</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Votre enfant a maintenu un taux de présence de {stats.attendanceRate}% ce mois-ci.
              </p>
            </div>

            {stats.absent > 0 && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <XCircle className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800">Jours manqués</span>
                </div>
                <p className="text-sm text-orange-700 mt-1">
                  Votre enfant a été absent {stats.absent} jour{stats.absent > 1 ? "s" : ""} ce mois-ci.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
