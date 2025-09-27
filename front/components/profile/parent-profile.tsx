"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, User, Settings, Users, MessageSquare, Star, Heart, Sparkles, Award } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

// Mock data - in real app, this would come from API/database
const mockChildren = [
  {
    id: "1",
    name: "Emma Johnson",
    age: 10,
    gender: "Female",
    year: "Grade 5",
    class: "5A",
    picture: "/young-girl-student.png",
  },
  {
    id: "2",
    name: "Liam Johnson",
    age: 8,
    gender: "Male",
    year: "Grade 3",
    class: "3B",
    picture: "/young-boy-student.png",
  },
]

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

export function ParentProfile() {
  const { user } = useAuth()
  const { t } = useLanguage()

  const [parentData, setParentData] = useState({
    id: user?.id || "1",
    name: user?.name || "Parent User",
    email: user?.email || "parent@example.com",
    phone: user?.phone || "+1 (555) 123-4567",
    picture: "/parent-profile-photo.png",
  })

  const [children, setChildren] = useState(mockChildren)
  const [meetingRequests] = useState(mockMeetingRequests)
  const [isEditingParent, setIsEditingParent] = useState(false)
  const [isAddingChild, setIsAddingChild] = useState(false)
  type Child = {
    id: string
    name: string
    age: number
    gender: string
    year: string
    class: string
    picture: string
  }
  const [editingChild, setEditingChild] = useState<Child | null>(null)

  type NotificationSettingKey = "grades" | "announcements" | "emergencies" | "meetings";
  const [notificationSettings, setNotificationSettings] = useState<Record<NotificationSettingKey, boolean>>({
    grades: true,
    announcements: true,
    emergencies: true,
    meetings: true,
  })

  const [newChild, setNewChild] = useState({
    name: "",
    age: "",
    gender: "",
    year: "",
    class: "",
  })

  const handleAddChild = () => {
    if (newChild.name && newChild.age && newChild.gender && newChild.year && newChild.class) {
      const child = {
        id: Date.now().toString(),
        ...newChild,
        age: Number.parseInt(newChild.age),
        picture: `/placeholder.svg?height=80&width=80&query=${newChild.gender.toLowerCase()} student`,
      }
      setChildren([...children, child])
      setNewChild({ name: "", age: "", gender: "", year: "", class: "" })
      setIsAddingChild(false)
    }
  }

  const handleDeleteChild = (childId: string) => {
    setChildren(children.filter((child) => child.id !== childId))
  }

  const handleMeetingResponse = (requestId: string, response: "accept" | "decline") => {
    // In real app, this would update the database
    console.log(`Meeting request ${requestId} ${response}ed`)
  }

  return (
    <div className="relative">
      <Tabs defaultValue="profile" className="space-y-8 relative z-10">
  <div className="absolute w-full h-[68px] bg-gradient-to-r from-blue-200 to-purple-200 border-4 border-primary rounded-lg shadow-2xl" style={{top: '-15px', zIndex: 0}}></div>
  <TabsList className="grid w-full grid-cols-4 items-center bg-transparent relative" style={{zIndex: 1}}>
          {[
            { value: "profile", icon: User, label: t.profile.parentInfo },
            { value: "children", icon: Users, label: t.profile.children },
            { value: "meetings", icon: MessageSquare, label: t.profile.meetings },
            { value: "settings", icon: Settings, label: "Paramètres" },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-3 py-3 px-6 items-start data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white rounded-xl font-bold text-lg font-sans transition-all duration-300 hover:scale-105 relative group shadow mt-[-8px] min-h-[48px]"
              >
                <div className="relative">
                  <Icon className="w-6 h-6 text-primary group-data-[state=active]:text-white transition-colors duration-200" />
                </div>
                <span className="hidden md:inline text-lg font-semibold font-sans">{tab.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value="profile">
          <Card className="card-super-fun relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
              <CardTitle className="heading-super-fun flex items-center space-x-3">
                <User className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold text-primary font-sans">{t.profile.parentInfo}</span>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingParent(!isEditingParent)}
                className={`btn-fun ${isEditingParent ? "bg-red-100 hover:bg-red-200 text-red-700" : ""}`}
              >
                <Edit2 className="w-5 h-5 mr-2 animate-wiggle" />
                {isEditingParent ? t.common.cancel : t.common.edit}
              </Button>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 ring-4 ring-primary/20 shadow-lg transition-all duration-300">
                    <AvatarImage src={parentData.picture || "/placeholder.svg"} alt={parentData.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold">
                      {parentData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Star className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-sparkle" />
                </div>
                {isEditingParent && (
                  <Button variant="outline" size="sm" className="btn-secondary-fun bg-transparent">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {t.profile.changePhoto}
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: "name", label: t.profile.fullName, value: parentData.name, type: "text" },
                  { id: "email", label: t.profile.email, value: parentData.email, type: "email" },
                  { id: "phone", label: t.profile.phone, value: parentData.phone, type: "tel" },
                  ...(isEditingParent
                    ? [{ id: "password", label: t.profile.newPassword, value: "", type: "password" }]
                    : []),
                ].map((field) => (
                  <div key={field.id} className="space-y-3">
                    <Label htmlFor={field.id} className="text-lg font-bold text-primary font-sans">
                      {field.label}
                    </Label>
                    <Input
                      id={field.id}
                      type={field.type}
                      value={field.value}
                      disabled={!isEditingParent}
                      onChange={(e) => {
                        if (field.id !== "password") {
                          setParentData({ ...parentData, [field.id]: e.target.value })
                        }
                      }}
                      placeholder={field.type === "password" ? "Leave blank to keep current password" : ""}
                      className="h-12 text-lg border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>

              {isEditingParent && (
                <div className="flex space-x-4 pt-4">
                  <Button onClick={() => setIsEditingParent(false)} className="btn-primary-fun">
                    <Heart className="w-5 h-5 mr-2" />
                    {t.profile.saveChanges}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditingParent(false)} className="btn-fun">
                    {t.common.cancel}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="children">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="heading-super-fun flex items-center space-x-3">
                <Users className="w-8 h-8 text-accent animate-pulse-fun" />
                <span>Profils des enfants</span>
                
              </h3>
              <Dialog open={isAddingChild} onOpenChange={setIsAddingChild}>
                <DialogTrigger asChild>
                  <Button className="btn-primary-fun">
                    <Plus className="w-5 h-5 mr-2 animate-wiggle" />
                    {t.profile.addChild}
                    <span className="ml-2 text-lg">✨</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="card-super-fun border-0 shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="heading-super-fun flex items-center space-x-3">
                      <Plus className="w-6 h-6 text-primary animate-sparkle" />
                      <span>{t.children.addNewChild}</span>
                      <span className="text-xl">👶</span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="childName">{t.children.childName}</Label>
                      <Input
                        id="childName"
                        value={newChild.name}
                        onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                        placeholder="Entrez le nom complet de l'enfant"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="childAge">{t.children.age}</Label>
                        <Input
                          id="childAge"
                          type="number"
                          value={newChild.age}
                          onChange={(e) => setNewChild({ ...newChild, age: e.target.value })}
                          placeholder="Âge"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="childGender">{t.children.gender}</Label>
                        <Select
                          value={newChild.gender}
                          onValueChange={(value) => setNewChild({ ...newChild, gender: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le genre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">{t.children.male}</SelectItem>
                            <SelectItem value="Female">{t.children.female}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="childYear">{t.children.year}</Label>
                        <Select
                          value={newChild.year}
                          onValueChange={(value) => setNewChild({ ...newChild, year: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner l'année" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Grade 1">Grade 1</SelectItem>
                            <SelectItem value="Grade 2">Grade 2</SelectItem>
                            <SelectItem value="Grade 3">Grade 3</SelectItem>
                            <SelectItem value="Grade 4">Grade 4</SelectItem>
                            <SelectItem value="Grade 5">Grade 5</SelectItem>
                            <SelectItem value="Grade 6">Grade 6</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="childClass">{t.children.class}</Label>
                        <Input
                          id="childClass"
                          value={newChild.class}
                          onChange={(e) => setNewChild({ ...newChild, class: e.target.value })}
                          placeholder="ex: 5A, 3B"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleAddChild}>{t.profile.addChild}</Button>
                      <Button variant="outline" onClick={() => setIsAddingChild(false)}>
                        {t.common.cancel}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {children.map((child) => (
                <Card key={child.id} className="card-super-fun relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-accent/20 to-transparent rounded-tr-3xl"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16 ring-4 ring-primary/20 shadow-lg group-hover:shadow-xl transition-all duration-300">
                            <AvatarImage src={child.picture || "/placeholder.svg"} alt={child.name} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg font-bold">
                              {child.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-primary font-sans">{child.name}</h4>
                          <p className="text-base font-semibold text-primary/80 bg-primary/10 px-3 py-1 rounded-full mt-1 font-sans">{child.year} - {child.class}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingChild(child)}
                          className="hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 hover:scale-110 rounded-xl"
                        >
                          <Edit2 className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteChild(child.id)}
                          className="hover:bg-red-100 hover:text-red-600 transition-all duration-300 hover:scale-110 rounded-xl"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: t.children.age, value: `${child.age} ans` },
                        {
                          label: t.children.gender,
                          value: child.gender === "Male" ? "Masculin" : "Féminin",
                        },
                      ].map((info) => (
                        <div
                          key={info.label}
                          className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl"
                        >
                          <span className="text-primary/70 font-semibold font-sans">{info.label}:</span>
                          <span className="text-lg font-semibold text-primary font-sans">{info.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
  </TabsContent>

        <TabsContent value="meetings">
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
                {meetingRequests.map((request) => (
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
                      <div className="flex space-x-4">
                        <Button
                          size="sm"
                          onClick={() => handleMeetingResponse(request.id, "accept")}
                          className="btn-primary-fun"
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          {t.common.approve}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleMeetingResponse(request.id, "decline")}
                          className="btn-fun bg-white text-primary border border-primary hover:bg-gray-100"
                        >
                          {t.common.reject}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="card-super-fun relative overflow-hidden">
            <div className="absolute top-4 right-4 text-xl animate-sparkle"></div>
            <CardHeader>
              <CardTitle className="heading-super-fun flex items-center space-x-3">
                <Settings className="w-8 h-8 text-primary animate-pulse-fun" />
                <span>Paramètres de notification</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                {[
                  {
                    key: "grades",
                    label: "Mises à jour des notes",
                    desc: "Recevez des notifications sur les résultats d'examens et les changements de notes",
                    emoji: "📊",
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
                      <div className="text-2xl animate-pulse-fun">{setting.emoji}</div>
                      <div>
                        <Label htmlFor={setting.key} className="text-lg font-bold text-primary font-sans">
                          {setting.label}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {setting.desc}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings[setting.key as NotificationSettingKey]}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, [setting.key as NotificationSettingKey]: checked })
                      }
                      disabled={setting.key === "emergencies"}
                      className="data-[state=checked]:bg-primary scale-125"
                    />
                  </div>
                ))}

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl animate-pulse-fun">💬</div>
                      <div>
                        <Label htmlFor="meetings" className="text-lg font-bold text-primary font-sans">
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

              <Button className="btn-primary-fun w-full">
                <Heart className="w-5 h-5 mr-2" />
                {t.profile.saveChanges}
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}