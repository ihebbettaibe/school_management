"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Users, ImageIcon } from "lucide-react"

interface CreatePostModalProps {
  onClose: () => void
}

export function CreatePostModal({ onClose }: CreatePostModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "announcement",
    audienceType: "all",
    selectedGrades: [] as string[],
    selectedClasses: [] as string[],
    eventDate: "",
    location: "",
    scheduledFor: "",
    isScheduled: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock function - in real app, this would create the post
    console.log("Creating post:", formData)
    onClose()
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGradeChange = (grade: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      selectedGrades: checked ? [...prev.selectedGrades, grade] : prev.selectedGrades.filter((g) => g !== grade),
    }))
  }

  const handleClassChange = (className: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      selectedClasses: checked
        ? [...prev.selectedClasses, className]
        : prev.selectedClasses.filter((c) => c !== className),
    }))
  }

  const availableGrades = ["CE2", "CM1", "CM2", "6ème", "5ème"]
  const availableClasses = [
    "CE2-A",
    "CE2-B",
    "CM1-A",
    "CM1-B",
    "CM2-A",
    "CM2-B",
    "6ème-A",
    "6ème-B",
    "5ème-A",
    "5ème-B",
  ]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer une Nouvelle Publication</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Titre de la Publication</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Entrez le titre de la publication"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="announcement">Annonce</SelectItem>
                <SelectItem value="event">Événement</SelectItem>
                <SelectItem value="schedule_change">Changement d'Horaire</SelectItem>
                <SelectItem value="emergency">Urgence</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenu</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="Rédigez le contenu de votre publication ici..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-4 p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium">Public Cible</Label>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="audienceType">Type de Public</Label>
                <Select
                  value={formData.audienceType}
                  onValueChange={(value) => handleInputChange("audienceType", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toute l'École</SelectItem>
                    <SelectItem value="specific">Spécifique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.audienceType === "specific" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Grade Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Niveaux</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto border border-border rounded-md p-3">
                      {availableGrades.map((grade) => (
                        <div key={grade} className="flex items-center space-x-2">
                          <Checkbox
                            id={`grade-${grade}`}
                            checked={formData.selectedGrades.includes(grade)}
                            onCheckedChange={(checked) => handleGradeChange(grade, checked as boolean)}
                          />
                          <Label htmlFor={`grade-${grade}`} className="text-sm font-normal cursor-pointer">
                            {grade}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {formData.selectedGrades.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {formData.selectedGrades.length} niveau(x) sélectionné(s)
                      </p>
                    )}
                  </div>

                  {/* Class Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Classes</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto border border-border rounded-md p-3">
                      {availableClasses.map((className) => (
                        <div key={className} className="flex items-center space-x-2">
                          <Checkbox
                            id={`class-${className}`}
                            checked={formData.selectedClasses.includes(className)}
                            onCheckedChange={(checked) => handleClassChange(className, checked as boolean)}
                          />
                          <Label htmlFor={`class-${className}`} className="text-sm font-normal cursor-pointer">
                            {className}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {formData.selectedClasses.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {formData.selectedClasses.length} classe(s) sélectionnée(s)
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Event Details (only for events) */}
          {formData.category === "event" && (
            <div className="space-y-4 p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-primary" />
                <Label className="text-sm font-medium">Détails de l'Événement</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Date de l'Événement</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange("eventDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Lieu</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Lieu de l'événement"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Scheduling */}
          <div className="space-y-4 p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <Label className="text-sm font-medium">Programmer la Publication</Label>
              </div>
              <Switch
                checked={formData.isScheduled}
                onCheckedChange={(checked) => handleInputChange("isScheduled", checked)}
              />
            </div>

            {formData.isScheduled && (
              <div className="space-y-2">
                <Label htmlFor="scheduledFor">Date et Heure de Publication</Label>
                <Input
                  id="scheduledFor"
                  type="datetime-local"
                  value={formData.scheduledFor}
                  onChange={(e) => handleInputChange("scheduledFor", e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Image Upload Placeholder */}
          <div className="space-y-2">
            <Label>Joindre une Image (Optionnel)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/30 transition-colors cursor-pointer">
              <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Cliquez pour télécharger une image</p>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Annuler
            </Button>
            <Button type="submit" className="flex-1">
              {formData.isScheduled ? "Programmer la Publication" : "Publier Maintenant"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
