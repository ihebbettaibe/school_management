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
    name: `${user?.firstName || "Teacher"} ${user?.lastName || "User"}`,
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
    <Tabs defaultValue="profile" className="space-y-8">
      <TabsList className="grid w-full grid-cols-3 bg-transparent mb-6 px-2 sm:px-6">
        <div className="flex items-center justify-center gap-2 sm:gap-6 w-full col-span-3">
          <TabsTrigger value="profile" className="flex items-center gap-2 py-3 px-6 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 rounded-xl font-bold text-lg font-sans transition-all duration-300 hover:scale-105 relative group shadow mt-[-8px] min-h-[48px]">
            <User className="w-5 h-5 text-blue-400" />
            <span className="hidden md:inline text-lg font-semibold font-sans">{t.profile.teacherInfo}</span>
          </TabsTrigger>
          <TabsTrigger value="classes" className="flex items-center gap-2 py-3 px-6 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 rounded-xl font-bold text-lg font-sans transition-all duration-300 hover:scale-105 relative group shadow mt-[-8px] min-h-[48px]">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="hidden md:inline text-lg font-semibold font-sans">{t.profile.classes}</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 py-3 px-6 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 rounded-xl font-bold text-lg font-sans transition-all duration-300 hover:scale-105 relative group shadow mt-[-8px] min-h-[48px]">
            <Settings className="w-5 h-5 text-blue-400" />
            <span className="hidden md:inline text-lg font-semibold font-sans">Paramètres</span>
          </TabsTrigger>
        </div>
      </TabsList>

      <TabsContent value="profile">
        <Card className="relative overflow-hidden bg-white shadow border border-gray-200">
          <CardHeader className="flex flex-col sm:flex-row items-center justify-between pb-4 gap-2">
            <CardTitle className="flex items-center space-x-2">
              <User className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-blue-700 font-sans">{t.profile.teacherInfo}</span>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className={`rounded ${isEditingProfile ? "bg-red-100 hover:bg-red-200 text-red-700" : "bg-blue-100 hover:bg-blue-200 text-blue-700"}`}
            >
              <Edit2 className="w-5 h-5 mr-2" />
              {isEditingProfile ? t.common.cancel : t.common.edit}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
              <Avatar className="w-20 h-20 ring-2 ring-blue-200 shadow transition-all duration-300">
                <AvatarImage src={teacherData.picture || "/logo.svg"} alt={teacherData.name} />
                <AvatarFallback className="bg-blue-200 text-blue-700 text-xl font-bold">
                  {teacherData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditingProfile && (
                <Button variant="outline" size="sm" className="bg-gray-100 text-gray-700 rounded">
                  {t.profile.changePhoto}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold text-blue-700 font-sans">{t.profile.fullName}</Label>
                <Input
                  id="name"
                  value={teacherData.name}
                  disabled={!isEditingProfile}
                  onChange={(e) => setTeacherData({ ...teacherData, name: e.target.value })}
                  className="h-10 text-base border border-blue-200 rounded focus:border-blue-400 focus:ring-blue-100 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold text-blue-700 font-sans">{t.profile.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={teacherData.email}
                  disabled={!isEditingProfile}
                  onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })}
                  className="h-10 text-base border border-blue-200 rounded focus:border-blue-400 focus:ring-blue-100 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-semibold text-blue-700 font-sans">{t.profile.phone}</Label>
                <Input
                  id="phone"
                  value={teacherData.phone}
                  disabled={!isEditingProfile}
                  onChange={(e) => setTeacherData({ ...teacherData, phone: e.target.value })}
                  className="h-10 text-base border border-blue-200 rounded focus:border-blue-400 focus:ring-blue-100 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="text-base font-semibold text-blue-700 font-sans">Teaching Experience</Label>
                <Input
                  id="experience"
                  value={teacherData.experience}
                  disabled={!isEditingProfile}
                  onChange={(e) => setTeacherData({ ...teacherData, experience: e.target.value })}
                  className="h-10 text-base border border-blue-200 rounded focus:border-blue-400 focus:ring-blue-100 transition-all duration-200"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="qualification" className="text-base font-semibold text-blue-700 font-sans">Qualification</Label>
                <Input
                  id="qualification"
                  value={teacherData.qualification}
                  disabled={!isEditingProfile}
                  onChange={(e) => setTeacherData({ ...teacherData, qualification: e.target.value })}
                  className="h-10 text-base border border-blue-200 rounded focus:border-blue-400 focus:ring-blue-100 transition-all duration-200"
                />
              </div>

              {isEditingProfile && (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="password" className="text-base font-semibold text-blue-700 font-sans">{t.profile.newPassword}</Label>
                  <Input id="password" type="password" placeholder="Leave blank to keep current password" className="h-10 text-base border border-blue-200 rounded focus:border-blue-400 focus:ring-blue-100 transition-all duration-200" />
                </div>
              )}
            </div>

            {isEditingProfile && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold text-blue-700 font-sans">Select Classes You Teach</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availableClasses.map((className) => (
                      <div key={className} className="flex items-center space-x-2">
                        <Checkbox
                          id={`class-${className}`}
                          checked={selectedClasses.includes(className)}
                          onCheckedChange={() => handleClassToggle(className)}
                        />
                        <Label htmlFor={`class-${className}`} className="text-sm text-blue-700">
                          {className}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold text-blue-700 font-sans">Select Subjects You Teach</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableSubjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={`subject-${subject}`}
                          checked={selectedSubjects.includes(subject)}
                          onCheckedChange={() => handleSubjectToggle(subject)}
                        />
                        <Label htmlFor={`subject-${subject}`} className="text-sm text-blue-700">
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
                  <Label className="text-base font-semibold text-blue-700 font-sans">Subjects</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {teacherData.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold text-blue-700 font-sans">Classes</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {teacherData.classes.map((cls, index) => (
                      <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isEditingProfile && (
              <div className="flex space-x-2">
                <Button onClick={handleSaveProfile} className="bg-blue-400 text-white rounded">{t.profile.saveChanges}</Button>
                <Button variant="outline" onClick={() => setIsEditingProfile(false)} className="bg-gray-100 text-gray-700 rounded">{t.common.cancel}</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="classes">
        <Card className="relative overflow-hidden bg-white border border-gray-200 shadow">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-blue-700">Class Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherData.classes.map((className) => {
                const classStudents = mockStudents.filter((student) => student.class === className)
                return (
                  <div key={className} className="border border-blue-100 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-blue-700">{className}</h3>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">{classStudents.length} students</Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {classStudents.map((student) => (
                        <div key={student.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs text-blue-700 bg-blue-100">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-blue-700">{student.name}</p>
                            <p className="text-xs text-gray-500 truncate">{student.parentName}</p>
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
                <div key={request.id} className="border border-border rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{request.studentName}</h4>
                      <p className="text-sm text-muted-foreground">Parent: {request.parentName}</p>
                    </div>
                    <Badge variant={request.status === "pending" ? "secondary" : "default"}>{request.status}</Badge>
                  </div>
                  <div className="space-y-2 text-sm mb-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Requested Date:</span>
                      <span>{new Date(request.requestedDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reason:</span>
                      <p className="mt-1">{request.reason}</p>
                    </div>
                  </div>
                  {request.status === "pending" && (
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="bg-green-50 hover:bg-green-100 text-green-600 font-bold rounded border border-green-100">✅ Accepter</Button>
                      <Button size="sm" className="bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded border border-red-100">❌ Décliner</Button>
                      <Button size="sm" className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded border border-blue-100">💬 Message</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card className="relative overflow-hidden bg-white border border-gray-200 shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-7 h-7 text-blue-400" />
              <span className="text-lg font-bold text-blue-700">Paramètres de notification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {[ // ...existing code...
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
                  className="flex items-center justify-between p-4 bg-blue-50 rounded border border-blue-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{setting.emoji}</div>
                    <div>
                      <Label htmlFor={setting.key} className="text-base font-semibold text-blue-700 font-sans">
                        {setting.label}
                      </Label>
                      <p className="text-xs text-gray-500 mt-1">{setting.desc}</p>
                    </div>
                  </div>
                  <Switch
                    id={setting.key}
                    checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, [setting.key]: checked })
                    }
                    disabled={setting.key === "emergencies"}
                    className="data-[state=checked]:bg-blue-400 scale-110"
                  />
                </div>
              ))}
            </div>

            <Button className="bg-blue-400 text-white w-full rounded">
              {t.profile.saveChanges}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
