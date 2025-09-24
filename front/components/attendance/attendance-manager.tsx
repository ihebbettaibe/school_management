"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Clock, Users, Calendar, Save } from "lucide-react"

interface Student {
  id: string
  name: string
  rollNumber: string
  status: "present" | "absent" | "late" | "not_marked"
}

interface AttendanceManagerProps {
  userType: "teacher"
}

// Mock student data
const mockStudents: Student[] = [
  { id: "1", name: "Emma Johnson", rollNumber: "001", status: "not_marked" },
  { id: "2", name: "Liam Smith", rollNumber: "002", status: "not_marked" },
  { id: "3", name: "Sophia Davis", rollNumber: "003", status: "not_marked" },
  { id: "4", name: "Noah Wilson", rollNumber: "004", status: "not_marked" },
  { id: "5", name: "Olivia Brown", rollNumber: "005", status: "not_marked" },
  { id: "6", name: "William Jones", rollNumber: "006", status: "not_marked" },
  { id: "7", name: "Ava Garcia", rollNumber: "007", status: "not_marked" },
  { id: "8", name: "James Miller", rollNumber: "008", status: "not_marked" },
]

export function AttendanceManager({ userType }: AttendanceManagerProps) {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [selectedClass, setSelectedClass] = useState("grade5a")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const updateStudentStatus = (studentId: string, status: "present" | "absent" | "late") => {
    setStudents((prev) => prev.map((student) => (student.id === studentId ? { ...student, status } : student)))
  }

  const markAllPresent = () => {
    setStudents((prev) => prev.map((student) => ({ ...student, status: "present" })))
  }

  const saveAttendance = () => {
    // Mock function - in real app, this would save to backend
    console.log("Saving attendance:", { class: selectedClass, date: selectedDate, students })
    alert("Attendance saved successfully!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 border-green-200"
      case "absent":
        return "bg-red-100 text-red-800 border-red-200"
      case "late":
        return "bg-orange-100 text-orange-800 border-orange-200"
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
      case "late":
        return <Clock className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getAttendanceStats = () => {
    const present = students.filter((s) => s.status === "present").length
    const absent = students.filter((s) => s.status === "absent").length
    const late = students.filter((s) => s.status === "late").length
    const notMarked = students.filter((s) => s.status === "not_marked").length

    return { present, absent, late, notMarked, total: students.length }
  }

  const stats = getAttendanceStats()

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Attendance for Today</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grade5a">Grade 5 - Section A</SelectItem>
                  <SelectItem value="grade5b">Grade 5 - Section B</SelectItem>
                  <SelectItem value="grade4a">Grade 4 - Section A</SelectItem>
                  <SelectItem value="grade4b">Grade 4 - Section B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md text-sm"
              />
            </div>

            <div className="flex items-end space-x-2">
              <Button variant="outline" onClick={markAllPresent} className="flex-1 bg-transparent">
                Mark All Present
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
            <div className="text-sm text-muted-foreground">Present</div>
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
            <div className="text-2xl font-bold text-orange-600">{stats.late}</div>
            <div className="text-sm text-muted-foreground">Late</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.notMarked}</div>
            <div className="text-sm text-muted-foreground">Not Marked</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Student Attendance</CardTitle>
          <Button onClick={saveAttendance} disabled={stats.notMarked > 0}>
            <Save className="h-4 w-4 mr-2" />
            Save Attendance
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                    {student.rollNumber}
                  </div>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">Roll No: {student.rollNumber}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getStatusColor(student.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(student.status)}
                      <span className="capitalize">{student.status.replace("_", " ")}</span>
                    </div>
                  </Badge>

                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant={student.status === "present" ? "default" : "outline"}
                      onClick={() => updateStudentStatus(student.id, "present")}
                    >
                      <CheckCircle className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === "late" ? "default" : "outline"}
                      onClick={() => updateStudentStatus(student.id, "late")}
                    >
                      <Clock className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === "absent" ? "destructive" : "outline"}
                      onClick={() => updateStudentStatus(student.id, "absent")}
                    >
                      <XCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
