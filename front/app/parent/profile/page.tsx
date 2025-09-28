"use client";
import { AppLayout } from "@/components/layout/app-layout";
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

// Mock translation object
const t = {
  profile: {
    parentInfo: "Informations Parent",
    fullName: "Nom Complet",
    email: "Email",
    phone: "Téléphone", 
    newPassword: "Nouveau Mot de Passe",
    changePhoto: "Changer Photo",
    saveChanges: "Sauvegarder",
    addChild: "Ajouter Enfant"
  },
  children: {
    addNewChild: "Ajouter Nouvel Enfant",
    childName: "Nom de l'enfant",
    age: "Âge",
    gender: "Genre",
    year: "Année",
    class: "Classe",
    male: "Masculin",
    female: "Féminin"
  },
  common: {
    cancel: "Annuler",
    edit: "Modifier"
  }
}

// Mock user object
const user = {
  id: "1",
  firstName: "Parent",
  lastName: "User", 
  email: "parent@example.com",
  phone: "+1 (555) 123-4567"
}

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

export default function ParentProfile() {
  const [parentData, setParentData] = useState({
    id: user?.id || "1",
    name: `${user?.firstName || "Parent"} ${user?.lastName || "User"}`,
    email: user?.email || "parent@example.com",
    phone: user?.phone || "+1 (555) 123-4567",
    picture: "/parent-profile-photo.png",
  })

  const [children, setChildren] = useState(mockChildren)
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
        picture: `/logo.svg?height=80&width=80&query=${newChild.gender.toLowerCase()} student`,
      }
      setChildren([...children, child])
      setNewChild({ name: "", age: "", gender: "", year: "", class: "" })
      setIsAddingChild(false)
    }
  }

  const handleDeleteChild = (childId: string) => {
    setChildren(children.filter((child) => child.id !== childId))
  }

  return (
    <AppLayout>
  <div className="relative bg-gray-50 min-h-screen pb-8">
        <Tabs defaultValue="profile" className="space-y-8 relative z-10">
          <div className="absolute w-full h-[56px] bg-blue-100 border-2 border-blue-200 rounded-lg shadow" style={{top: '-10px', zIndex: 0}}></div>
          <TabsList className="grid w-full grid-cols-3 items-center bg-transparent relative mb-6 px-2 sm:px-6" style={{zIndex: 1}}>
            <div className="flex items-center justify-center gap-2 sm:gap-6 w-full col-span-3">
              {[ 
                { value: "profile", icon: User, label: t.profile.parentInfo },
                { value: "children", icon: Users, label: "Profils des enfants" },
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
            </div>
          </TabsList>

          <TabsContent value="profile">
            <Card className="relative overflow-hidden bg-white shadow border border-gray-200">
              <CardHeader className="flex flex-col sm:flex-row items-center justify-between pb-4 gap-2">
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-8 h-8 text-blue-400" />
                  <span className="text-xl font-bold text-blue-700 font-sans">{t.profile.parentInfo}</span>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingParent(!isEditingParent)}
                  className={`rounded ${isEditingParent ? "bg-red-100 hover:bg-red-200 text-red-700" : "bg-blue-100 hover:bg-blue-200 text-blue-700"}`}
                >
                  <Edit2 className="w-5 h-5 mr-2" />
                  {isEditingParent ? t.common.cancel : t.common.edit}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
                  <div className="relative">
                    <Avatar className="w-20 h-20 ring-2 ring-blue-200 shadow transition-all duration-300">
                      <AvatarImage src={parentData.picture || "/logo.svg"} alt={parentData.name} />
                      <AvatarFallback className="bg-blue-200 text-blue-700 text-xl font-bold">
                        {parentData.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Star className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400" />
                  </div>
                  {isEditingParent && (
                    <Button variant="outline" size="sm" className="bg-gray-100 text-gray-700 rounded">
                      <Sparkles className="w-4 h-4 mr-2" />
                      {t.profile.changePhoto}
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "name", label: t.profile.fullName, value: parentData.name, type: "text" },
                    { id: "email", label: t.profile.email, value: parentData.email, type: "email" },
                    { id: "phone", label: t.profile.phone, value: parentData.phone, type: "tel" },
                    ...(isEditingParent
                      ? [{ id: "password", label: t.profile.newPassword, value: "", type: "password" }]
                      : []),
                  ].map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id} className="text-base font-semibold text-blue-700 font-sans">
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
                        className="h-10 text-base border border-blue-200 rounded focus:border-blue-400 focus:ring-blue-100 transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>

                {isEditingParent && (
                  <div className="flex space-x-2 pt-2">
                    <Button onClick={() => setIsEditingParent(false)} className="bg-blue-400 text-white rounded">
                      <Heart className="w-5 h-5 mr-2" />
                      {t.profile.saveChanges}
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditingParent(false)} className="bg-gray-100 text-gray-700 rounded">
                      {t.common.cancel}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="children">
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
                <h3 className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-blue-400" />
                  <span className="text-lg font-bold text-blue-700">Profils des enfants</span>
                </h3>
                <Dialog open={isAddingChild} onOpenChange={setIsAddingChild}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-400 text-white rounded">
                      <Plus className="w-5 h-5 mr-2" />
                      {t.profile.addChild}
                      <span className="ml-2 text-lg">✨</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-0 shadow-xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <Plus className="w-6 h-6 text-blue-400" />
                        <span className="text-blue-700 font-bold">{t.children.addNewChild}</span>
                        <span className="text-xl">👶</span>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {children.map((child) => (
                  <Card key={child.id} className="relative overflow-hidden group mb-6 bg-white border border-gray-200 shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Avatar className="w-16 h-16 ring-2 ring-blue-200 shadow group-hover:shadow-lg transition-all duration-200">
                              <AvatarImage src={child.picture || "/logo.svg"} alt={child.name} />
                              <AvatarFallback className="bg-blue-200 text-blue-700 text-lg font-bold">
                                {child.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-blue-700 font-sans mb-1">{child.name}</h4>
                            <p className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded mt-1 font-sans">{child.year} - {child.class}</p>
                          </div>
                        </div>
                        <div className="flex space-x-4">
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
                        <div className="space-y-3">
                        {[
                          { label: t.children.age, value: `${child.age} ans` },
                          {
                            label: t.children.gender,
                            value: child.gender === "Male" ? "Masculin" : "Féminin",
                          },
                        ].map((info) => (
                          <div
                            key={info.label}
                            className="flex justify-between items-center p-3 bg-blue-50 rounded"
                          >
                            <span className="text-blue-700 font-semibold font-sans">{info.label}:</span>
                            <span className="text-base font-semibold text-blue-700 font-sans">{info.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="relative overflow-hidden bg-white border border-gray-200 shadow">
              <div className="absolute top-4 right-4 text-xl"></div>
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
                      className="flex items-center justify-between p-4 bg-blue-50 rounded border border-blue-100"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-2xl">{setting.emoji}</div>
                        <div>
                          <Label htmlFor={setting.key} className="text-base font-semibold text-blue-700 font-sans">
                            {setting.label}
                          </Label>
                          <p className="text-xs text-gray-500 mt-1">
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
                        className="data-[state=checked]:bg-blue-400 scale-110"
                      />
                    </div>
                  ))}
                </div>

                <Button className="bg-blue-400 text-white w-full rounded">
                  <Heart className="w-5 h-5 mr-2" />
                  {t.profile.saveChanges}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}