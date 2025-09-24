"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, GraduationCap, UserCheck, MessageSquare, AlertTriangle, CheckCircle, XCircle, Eye } from "lucide-react"

// Mock data - in real app, this would come from API/database
const schoolStats = {
  totalStudents: 847,
  totalTeachers: 42,
  totalParents: 623,
  attendanceRate: 94.2,
  activeAnnouncements: 8,
  pendingApprovals: 5,
}

const recentActivity = [
  {
    id: "1",
    type: "approval",
    message: "Nouvelle demande de compte enseignant",
    user: "Marie Dubois",
    time: "il y a 2 heures",
  },
  {
    id: "2",
    type: "announcement",
    message: "Annonce de fermeture d'école publiée",
    user: "Admin",
    time: "il y a 4 heures",
  },
  {
    id: "3",
    type: "teacher",
    message: "Nouveau compte enseignant créé",
    user: "Mme Rodriguez",
    time: "il y a 1 jour",
  },
]

const pendingTeacherApprovals = [
  {
    id: "1",
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    subjects: ["Mathématiques", "Sciences"],
    experience: "5 ans d'expérience",
    submittedDate: "2024-01-10",
    status: "pending",
    qualifications: "Master en Mathématiques, Certificat d'enseignement",
  },
  {
    id: "2",
    name: "Pierre Martin",
    email: "pierre.martin@email.com",
    subjects: ["Français", "Histoire"],
    experience: "8 ans d'expérience",
    submittedDate: "2024-01-09",
    status: "pending",
    qualifications: "Master en Littérature française, CAPES",
  },
  {
    id: "3",
    name: "Sophie Laurent",
    email: "sophie.laurent@email.com",
    subjects: ["Anglais", "Arts"],
    experience: "3 ans d'expérience",
    submittedDate: "2024-01-08",
    status: "pending",
    qualifications: "Master en Langues étrangères, Formation pédagogique",
  },
  {
    id: "4",
    name: "Thomas Bernard",
    email: "thomas.bernard@email.com",
    subjects: ["Éducation physique", "Sciences"],
    experience: "6 ans d'expérience",
    submittedDate: "2024-01-07",
    status: "pending",
    qualifications: "STAPS, Certificat de secourisme",
  },
  {
    id: "5",
    name: "Isabelle Moreau",
    email: "isabelle.moreau@email.com",
    subjects: ["Musique", "Arts"],
    experience: "4 ans d'expérience",
    submittedDate: "2024-01-06",
    status: "pending",
    qualifications: "Conservatoire, Diplôme d'enseignement artistique",
  },
]

export function AdminDashboard() {
  const [showApprovalsDialog, setShowApprovalsDialog] = useState(false)
  const [teacherApprovals, setTeacherApprovals] = useState(pendingTeacherApprovals)

  const handleApproveTeacher = (teacherId: string) => {
    setTeacherApprovals((prev) =>
      prev.map((teacher) => (teacher.id === teacherId ? { ...teacher, status: "approved" } : teacher)),
    )
  }

  const handleRejectTeacher = (teacherId: string) => {
    setTeacherApprovals((prev) =>
      prev.map((teacher) => (teacher.id === teacherId ? { ...teacher, status: "rejected" } : teacher)),
    )
  }

  const handleUnderReviewTeacher = (teacherId: string) => {
    setTeacherApprovals((prev) =>
      prev.map((teacher) => (teacher.id === teacherId ? { ...teacher, status: "under_review" } : teacher)),
    )
  }

  const pendingCount = teacherApprovals.filter((teacher) => teacher.status === "pending").length

  return (
    <div className="space-y-12 p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-8">
        {/* Stat Cards */}
        <Card className="hover:shadow-xl transition-shadow border-2 border-primary/20 rounded-2xl">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <div className="p-4 bg-primary/10 rounded-xl mb-4">
              <GraduationCap className="w-10 h-10 text-primary" />
            </div>
            <p className="text-lg font-semibold text-primary mb-1">Étudiants</p>
            <p className="text-5xl font-extrabold text-gray-900">{schoolStats.totalStudents}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-shadow border-2 border-secondary/20 rounded-2xl">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <div className="p-4 bg-secondary/10 rounded-xl mb-4">
              <Users className="w-10 h-10 text-secondary" />
            </div>
            <p className="text-lg font-semibold text-secondary mb-1">Enseignants</p>
            <p className="text-5xl font-extrabold text-gray-900">{schoolStats.totalTeachers}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-shadow border-2 border-accent/20 rounded-2xl">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <div className="p-4 bg-accent/10 rounded-xl mb-4">
              <Users className="w-10 h-10 text-accent" />
            </div>
            <p className="text-lg font-semibold text-accent mb-1">Parents</p>
            <p className="text-5xl font-extrabold text-gray-900">{schoolStats.totalParents}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-shadow border-2 border-chart-4/20 rounded-2xl">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <div className="p-4 bg-chart-4/10 rounded-xl mb-4">
              <UserCheck className="w-10 h-10 text-chart-4" />
            </div>
            <p className="text-lg font-semibold text-chart-4 mb-1">Présence</p>
            <p className="text-5xl font-extrabold text-gray-900">{schoolStats.attendanceRate}%</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-shadow border-2 border-chart-3/20 rounded-2xl">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <div className="p-4 bg-chart-3/10 rounded-xl mb-4">
              <MessageSquare className="w-10 h-10 text-chart-3" />
            </div>
            <p className="text-lg font-semibold text-chart-3 mb-1">Annonces</p>
            <p className="text-5xl font-extrabold text-gray-900">{schoolStats.activeAnnouncements}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-shadow border-2 border-destructive/20 rounded-2xl">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <div className="p-4 bg-destructive/10 rounded-xl mb-4">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>
            <p className="text-lg font-semibold text-destructive mb-1">En Attente</p>
            <p className="text-5xl font-extrabold text-gray-900">{pendingCount}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <Card className="shadow-lg border-2 border-primary/10 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="text-2xl font-bold text-primary">Demandes d'Enseignants en Attente</CardTitle>
            <Button variant="outline" size="lg" onClick={() => setShowApprovalsDialog(true)} className="btn-fun">
              <Eye className="w-5 h-5 mr-2" />
              Voir Tout
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {teacherApprovals.slice(0, 2).map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center justify-between p-6 border border-border rounded-2xl hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center space-x-6">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xl font-bold">
                      {teacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-xl text-primary">{teacher.name}</h4>
                    <p className="text-lg text-muted-foreground">{teacher.email}</p>
                    <p className="text-base text-muted-foreground">
                      {teacher.subjects.join(", ")} • {teacher.experience}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Soumis le: {new Date(teacher.submittedDate).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="px-3" onClick={() => handleApproveTeacher(teacher.id)}>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approuver
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="px-3 bg-transparent"
                    onClick={() => handleUnderReviewTeacher(teacher.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Examiner
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Activité Récente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 border border-border rounded-xl hover:bg-accent/5 transition-colors"
              >
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  {activity.type === "approval" && <AlertTriangle className="w-5 h-5" />}
                  {activity.type === "announcement" && <MessageSquare className="w-5 h-5" />}
                  {activity.type === "teacher" && <Users className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-muted-foreground font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showApprovalsDialog} onOpenChange={setShowApprovalsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Toutes les Demandes d'Enseignants</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {teacherApprovals.map((teacher) => (
              <Card key={teacher.id} className="border border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="text-lg">
                          {teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{teacher.name}</h3>
                        <p className="text-muted-foreground">{teacher.email}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {teacher.subjects.map((subject, index) => (
                            <Badge key={index} variant="secondary">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{teacher.experience}</p>
                        <p className="text-sm text-muted-foreground">{teacher.qualifications}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        teacher.status === "approved"
                          ? "default"
                          : teacher.status === "rejected"
                            ? "destructive"
                            : teacher.status === "under_review"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {teacher.status === "approved"
                        ? "Approuvé"
                        : teacher.status === "rejected"
                          ? "Rejeté"
                          : teacher.status === "under_review"
                            ? "En Examen"
                            : "En Attente"}
                    </Badge>
                  </div>

                  <div className="text-sm text-muted-foreground mb-4">
                    Soumis le: {new Date(teacher.submittedDate).toLocaleDateString("fr-FR")}
                  </div>

                  {teacher.status === "pending" && (
                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        onClick={() => handleApproveTeacher(teacher.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approuver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUnderReviewTeacher(teacher.id)}
                        className="bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        En Examen
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectTeacher(teacher.id)}
                        className="bg-transparent border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Rejeter
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
