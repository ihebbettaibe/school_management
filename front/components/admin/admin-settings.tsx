"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Edit2, School, Bell, Calendar, Settings } from "lucide-react"

// Mock data - in real app, this would come from API/database
const mockSchoolData = {
  name: "École Élémentaire DiLo Connect",
  logo: "/generic-school-logo.png",
  adminName: "Dr. Patricia Williams",
  adminEmail: "admin@diloconnect.edu",
  phone: "+33 1 23 45 67 89",
  address: "123 Rue de l'Éducation, Ville d'Apprentissage, 75001 Paris",
}

export function AdminSettings() {
  const [schoolData, setSchoolData] = useState(mockSchoolData)
  const [isEditingSchool, setIsEditingSchool] = useState(false)

  const [notificationSettings, setNotificationSettings] = useState({
    systemUpdates: true,
    userManagement: true,
    securityAlerts: true,
    meetings: {
      enabled: true,
      emailNotifications: true,
      pushNotifications: false,
      meetingReminders: true,
      meetingRequests: true,
    },
  })

  return (
    <Tabs defaultValue="school" className="space-y-8">
      <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-blue-200 to-purple-200 border-4 border-primary rounded-lg p-5 min-h-[68px] shadow-2xl mb-8">
        <TabsTrigger value="school" className="flex items-center gap-3 py-3 px-6 items-center font-bold text-lg font-sans transition-all duration-300 hover:scale-105 relative group shadow min-h-[48px]">
          <School className="w-6 h-6" />
          <span className="text-lg font-semibold font-sans">Profil École</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-3 py-3 px-6 items-center font-bold text-lg font-sans transition-all duration-300 hover:scale-105 relative group shadow min-h-[48px]">
          <Settings className="w-6 h-6" />
          <span className="text-lg font-semibold font-sans">Paramètres</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="school">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="text-2xl font-bold text-primary font-sans">Informations de l'École</CardTitle>
            <Button variant="outline" size="lg" onClick={() => setIsEditingSchool(!isEditingSchool)} className="btn-fun">
              <Edit2 className="w-5 h-5 mr-2" />
              {isEditingSchool ? "Annuler" : "Modifier"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-center space-x-8">
              <Avatar className="w-28 h-28 ring-4 ring-primary/20 shadow-lg transition-all duration-300">
                <AvatarImage src={schoolData.logo || "/logo.svg"} alt="Logo École" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold">
                  <School className="w-10 h-10" />
                </AvatarFallback>
              </Avatar>
              {isEditingSchool && (
                <Button variant="outline" size="lg" className="btn-secondary-fun bg-transparent">
                  Changer le Logo
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="schoolName" className="text-lg font-bold text-primary font-sans">Nom de l'École</Label>
                <Input
                  id="schoolName"
                  value={schoolData.name}
                  disabled={!isEditingSchool}
                  onChange={(e) => setSchoolData({ ...schoolData, name: e.target.value })}
                  className="h-12 text-lg border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="adminName" className="text-lg font-bold text-primary font-sans">Nom de l'Administrateur</Label>
                <Input
                  id="adminName"
                  value={schoolData.adminName}
                  disabled={!isEditingSchool}
                  onChange={(e) => setSchoolData({ ...schoolData, adminName: e.target.value })}
                  className="h-12 text-lg border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="adminEmail" className="text-lg font-bold text-primary font-sans">Email Administrateur</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={schoolData.adminEmail}
                  disabled={!isEditingSchool}
                  onChange={(e) => setSchoolData({ ...schoolData, adminEmail: e.target.value })}
                  className="h-12 text-lg border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-lg font-bold text-primary font-sans">Numéro de Téléphone</Label>
                <Input
                  id="phone"
                  value={schoolData.phone}
                  disabled={!isEditingSchool}
                  onChange={(e) => setSchoolData({ ...schoolData, phone: e.target.value })}
                  className="h-12 text-lg border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="address" className="text-lg font-bold text-primary font-sans">Adresse de l'École</Label>
                <Input
                  id="address"
                  value={schoolData.address}
                  disabled={!isEditingSchool}
                  onChange={(e) => setSchoolData({ ...schoolData, address: e.target.value })}
                  className="h-12 text-lg border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              {isEditingSchool && (
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="password" className="text-lg font-bold text-primary font-sans">Nouveau Mot de Passe Administrateur</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Laisser vide pour conserver le mot de passe actuel"
                    className="h-12 text-lg border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
              )}
            </div>

            {isEditingSchool && (
              <div className="flex space-x-4 pt-4">
                <Button onClick={() => setIsEditingSchool(false)} className="btn-primary-fun">
                  Enregistrer les Modifications
                </Button>
                <Button variant="outline" onClick={() => setIsEditingSchool(false)} className="btn-fun">
                  Annuler
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <div className="space-y-8 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-primary font-sans">
                <Bell className="w-6 h-6" />
                Paramètres de Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-primary">Mises à jour système</h4>
                    <p className="text-lg text-muted-foreground font-medium">
                      Recevoir des notifications sur les mises à jour du système
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, systemUpdates: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-primary">Gestion des utilisateurs</h4>
                    <p className="text-lg text-muted-foreground font-medium">
                      Alertes pour les nouvelles inscriptions et modifications de comptes
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.userManagement}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, userManagement: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-primary">Alertes de sécurité</h4>
                    <p className="text-lg text-muted-foreground font-medium">
                      Notifications importantes concernant la sécurité du système
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, securityAlerts: checked }))
                    }
                  />
                </div>

                <div className="border-t pt-6 mt-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-primary">
                    <Calendar className="w-6 h-6" />
                    Réunions
                  </h3>

                  <div className="space-y-6 pl-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-primary">Notifications de réunions</h4>
                        <p className="text-lg text-muted-foreground font-medium">
                          Activer toutes les notifications liées aux réunions
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.meetings.enabled}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            meetings: { ...prev.meetings, enabled: checked },
                          }))
                        }
                      />
                    </div>

                    {notificationSettings.meetings.enabled && (
                      <>
                        <div className="flex items-center justify-between pl-6">
                          <div>
                            <h4 className="text-xl font-bold text-primary">Notifications par email</h4>
                            <p className="text-lg text-muted-foreground font-medium">
                              Recevoir des emails pour les réunions
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.meetings.emailNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                meetings: { ...prev.meetings, emailNotifications: checked },
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between pl-6">
                          <div>
                            <h4 className="text-xl font-bold text-primary">Notifications push</h4>
                            <p className="text-lg text-muted-foreground font-medium">
                              Recevoir des notifications push pour les réunions
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.meetings.pushNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                meetings: { ...prev.meetings, pushNotifications: checked },
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between pl-6">
                          <div>
                            <h4 className="text-xl font-bold text-primary">Rappels de réunions</h4>
                            <p className="text-lg text-muted-foreground font-medium">
                              Recevoir des rappels avant les réunions programmées
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.meetings.meetingReminders}
                            onCheckedChange={(checked) =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                meetings: { ...prev.meetings, meetingReminders: checked },
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between pl-6">
                          <div>
                            <h4 className="text-xl font-bold text-primary">Demandes de réunions</h4>
                            <p className="text-lg text-muted-foreground font-medium">
                              Notifications pour les nouvelles demandes de réunions
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.meetings.meetingRequests}
                            onCheckedChange={(checked) =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                meetings: { ...prev.meetings, meetingRequests: checked },
                              }))
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button className="btn-primary-fun text-lg px-8 py-3">Enregistrer les Paramètres</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
