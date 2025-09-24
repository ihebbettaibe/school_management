"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit2, User, BookOpen, MessageSquare, Settings } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

// Mock data - in real app, this would come from API/database
const mockStudents = [
  {
    id: "1",
    name: "Emma Johnson",
    class: "Grade 5-A",
    parentName: "Sarah Johnson",
    parentEmail: "sarah.johnson@email.com",
  },
  {
    id: "2",
    name: "Liam Johnson",
    class: "Grade 5-A",
    parentName: "Sarah Johnson",
    parentEmail: "sarah.johnson@email.com",
  },
  { id: "3", name: "Sophia Chen", class: "Grade 5-B", parentName: "Lisa Chen", parentEmail: "lisa.chen@email.com" },
  {
    id: "4",
    name: "Noah Williams",
    class: "Grade 4-A",
    parentName: "Michael Williams",
    parentEmail: "michael.williams@email.com",
  },
]

const mockMeetingRequests = [
  {
    id: "1",
    studentName: "Emma Johnson",
    parentName: "Sarah Johnson",
    requestedDate: "2024-01-15",
    reason: "Discuss Emma's progress in advanced math topics",
    status: "pending",
  },
  {
    id: "2",
    studentName: "Noah Williams",
    parentName: "Michael Williams",
    requestedDate: "2024-01-18",
    reason: "Review homework completion strategies",
    status: "scheduled",
  },
]

// Available classes and subjects
const availableClasses = [
  "Grade 1-A",
  "Grade 1-B",
  "Grade 2-A",
  "Grade 2-B",
  "Grade 3-A",
  "Grade 3-B",
  "Grade 4-A",
  "Grade 4-B",
  "Grade 5-A",
  "Grade 5-B",
  "Grade 6-A",
  "Grade 6-B",
]

const availableSubjects = [
  "Mathematics",
  "English",
  "Science",
  "History",
  "Geography",
  "Art",
  "Music",
  "Physical Education",
  "Computer Science",
]

export function TeacherProfile() {
  const { user } = useAuth()
  const { t } = useLanguage()

  const [teacherData, setTeacherData] = useState({
    id: user?.id || "1",
    name: user?.name || "Teacher User",
    email: user?.email || "teacher@example.com",
    phone: user?.phone || "+1 (555) 987-6543",
    picture: "/teacher-profile-photo.png",
    subjects: ["Mathematics", "Statistics"],
    classes: ["Grade 5-A", "Grade 5-B", "Grade 4-A"],
    experience: "8 years",
    qualification: "Master's in Mathematics Education",
  })

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [selectedClasses, setSelectedClasses] = useState<string[]>(teacherData.classes)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(teacherData.subjects)

  const [notificationSettings, setNotificationSettings] = useState({
    submissions: true,
    announcements: true,
    emergencies: true,
    meetings: true,
  })

  const handleClassToggle = (className: string) => {
    setSelectedClasses((prev) =>
      prev.includes(className) ? prev.filter((c) => c !== className) : [...prev, className],
    )
  }

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]))
  }

  const handleSaveProfile = () => {
    setTeacherData((prev) => ({
      ...prev,
      classes: selectedClasses,
      subjects: selectedSubjects,
    }))
    setIsEditingProfile(false)
  }

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          {t.profile.teacherInfo}
        </TabsTrigger>
        <TabsTrigger value="classes" className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          {t.profile.classes}
        </TabsTrigger>
        <TabsTrigger value="meetings" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          {t.profile.meetings}
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Paramètres
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t.profile.teacherInfo}</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(!isEditingProfile)}>
              <Edit2 className="w-4 h-4 mr-2" />
              {isEditingProfile ? t.common.cancel : t.common.edit}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={teacherData.picture || "/placeholder.svg"} alt={teacherData.name} />
                <AvatarFallback>
                  {teacherData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditingProfile && (
                <Button variant="outline" size="sm">
                  {t.profile.changePhoto}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.profile.fullName}</Label>
                <Input
                  id="name"
                  value={teacherData.name}
                  disabled={!isEditingProfile}
                  onChange={(e) => setTeacherData({ ...teacherData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.profile.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={teacherData.email}
                  disabled={!isEditingProfile}
                  onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t.profile.phone}</Label>
                <Input
                  id="phone"
                  value={teacherData.phone}
                  disabled={!isEditingProfile}
                  onChange={(e) => setTeacherData({ ...teacherData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Teaching Experience</Label>
                <Input
                  id="experience"
                  value={teacherData.experience}
                  disabled={!isEditingProfile}
                  onChange={(e) => setTeacherData({ ...teacherData, experience: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={teacherData.qualification}
                  disabled={!isEditingProfile}
                  onChange={(e) => setTeacherData({ ...teacherData, qualification: e.target.value })}
                />
              </div>

              {isEditingProfile && (
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="password">{t.profile.newPassword}</Label>
                  <Input id="password" type="password" placeholder="Leave blank to keep current password" />
                </div>
              )}
            </div>

            {isEditingProfile && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Select Classes You Teach</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availableClasses.map((className) => (
                      <div key={className} className="flex items-center space-x-2">
                        <Checkbox
                          id={`class-${className}`}
                          checked={selectedClasses.includes(className)}
                          onCheckedChange={() => handleClassToggle(className)}
                        />
                        <Label htmlFor={`class-${className}`} className="text-sm">
                          {className}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Select Subjects You Teach</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableSubjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={`subject-${subject}`}
                          checked={selectedSubjects.includes(subject)}
                          onCheckedChange={() => handleSubjectToggle(subject)}
                        />
                        <Label htmlFor={`subject-${subject}`} className="text-sm">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!isEditingProfile && (
              <div className="space-y-4">
                <div>
                  <Label>Subjects</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {teacherData.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Classes</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {teacherData.classes.map((cls, index) => (
                      <Badge key={index} variant="outline">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isEditingProfile && (
              <div className="flex space-x-2">
                <Button onClick={handleSaveProfile}>{t.profile.saveChanges}</Button>
                <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                  {t.common.cancel}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="classes">
        <Card>
          <CardHeader>
            <CardTitle>Class Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherData.classes.map((className) => {
                const classStudents = mockStudents.filter((student) => student.class === className)
                return (
                  <div key={className} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">{className}</h3>
                      <Badge variant="secondary">{classStudents.length} students</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {classStudents.map((student) => (
                        <div key={student.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{student.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{student.parentName}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="meetings">
        <Card>
          <CardHeader>
            <CardTitle>Parent Meeting Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMeetingRequests.map((request) => (
                <div key={request.id} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{request.studentName}</h4>
                      <p className="text-sm text-muted-foreground">Parent: {request.parentName}</p>
                    </div>
                    <Badge variant={request.status === "pending" ? "secondary" : "default"}>{request.status}</Badge>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Requested Date:</span>
                      <span>{new Date(request.requestedDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reason:</span>
                      <p className="mt-1">{request.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-primary" />
              <span>Paramètres de notification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              {[
                {
                  key: "submissions",
                  label: "Soumissions d'élèves",
                  desc: "Recevez des notifications sur les devoirs soumis et les mises à jour",
                  emoji: "📝",
                },
                {
                  key: "announcements",
                  label: "Annonces scolaires",
                  desc: "Recevez des notifications sur les événements et annonces de l'école",
                  emoji: "📢",
                },
                {
                  key: "emergencies",
                  label: "Alertes d'urgence",
                  desc: "Recevez des notifications sur les questions urgentes de l'école (toujours activé)",
                  emoji: "🚨",
                },
              ].map((setting) => (
                <div
                  key={setting.key}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{setting.emoji}</div>
                    <div>
                      <Label htmlFor={setting.key} className="text-lg font-bold text-foreground">
                        {setting.label}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">{setting.desc}</p>
                    </div>
                  </div>
                  <Switch
                    id={setting.key}
                    checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, [setting.key]: checked })
                    }
                    disabled={setting.key === "emergencies"}
                    className="data-[state=checked]:bg-primary scale-125"
                  />
                </div>
              ))}

              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>Réunions</span>
                </h3>
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">💬</div>
                    <div>
                      <Label htmlFor="meetings" className="text-lg font-bold text-foreground">
                        Demandes de réunion
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Recevez des notifications sur les demandes de réunion parent-enseignant
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="meetings"
                    checked={notificationSettings.meetings}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, meetings: checked })
                    }
                    className="data-[state=checked]:bg-primary scale-125"
                  />
                </div>
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl">
              <span className="mr-2">💾</span>
              {t.profile.saveChanges}
              <span className="ml-2">✨</span>
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
