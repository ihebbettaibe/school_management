"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Calendar, Users, AlertTriangle, Sparkles, Star } from "lucide-react"

interface CreateAssignmentModalProps {
  onClose: () => void
}

export function CreateAssignmentModal({ onClose }: CreateAssignmentModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    dueDate: "",
    priority: "medium",
    class: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock function - in real app, this would create the assignment
    console.log("Creating assignment:", formData)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="card-super-fun border-0 shadow-2xl sm:max-w-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-3xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-3xl"></div>
        <div className="absolute top-4 right-4 text-xl animate-sparkle">📝</div>
        <div className="absolute bottom-4 left-4 text-lg animate-float-soft">✨</div>

        <DialogHeader className="text-center pb-6 relative">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-xl animate-pulse-fun">
              <FileText className="w-8 h-8 text-white animate-bounce-gentle" />
            </div>
          </div>
          <DialogTitle className="heading-super-fun text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
            Create New Assignment 🎯
          </DialogTitle>
          <p className="text-playful text-muted-foreground mt-2">
            Let's create something amazing for your students! 🌟
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-lg font-bold text-foreground flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary animate-pulse-fun" />
                <span>Assignment Title</span>
                <span className="text-lg">📚</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter assignment title"
                required
                className="h-14 text-lg border-2 border-primary/20 rounded-2xl focus:border-primary focus:ring-primary/20 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="subject" className="text-lg font-bold text-foreground flex items-center space-x-2">
                <Star className="w-5 h-5 text-primary animate-pulse-fun" />
                <span>Subject</span>
                <span className="text-lg">📖</span>
              </Label>
              <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                <SelectTrigger className="h-14 text-lg border-2 border-primary/20 rounded-2xl focus:border-primary focus:ring-primary/20 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-2 border-primary/20">
                  <SelectItem value="mathematics" className="text-lg py-3 rounded-xl hover:bg-blue-50">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🔢</span>
                      <span>Mathematics</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="english" className="text-lg py-3 rounded-xl hover:bg-green-50">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">📝</span>
                      <span>English</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="science" className="text-lg py-3 rounded-xl hover:bg-purple-50">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🔬</span>
                      <span>Science</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="history" className="text-lg py-3 rounded-xl hover:bg-orange-50">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🏛️</span>
                      <span>History</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="art" className="text-lg py-3 rounded-xl hover:bg-pink-50">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🎨</span>
                      <span>Art</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="class" className="text-lg font-bold text-foreground flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary animate-pulse-fun" />
                <span>Class</span>
                <span className="text-lg">👥</span>
              </Label>
              <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)}>
                <SelectTrigger className="h-14 text-lg border-2 border-primary/20 rounded-2xl focus:border-primary focus:ring-primary/20 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-2 border-primary/20">
                  <SelectItem value="grade5a" className="text-lg py-3 rounded-xl hover:bg-blue-50">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🎓</span>
                      <span>Grade 5 - Section A</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="grade5b" className="text-lg py-3 rounded-xl hover:bg-green-50">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🎓</span>
                      <span>Grade 5 - Section B</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="grade4a" className="text-lg py-3 rounded-xl hover:bg-purple-50">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🎓</span>
                      <span>Grade 4 - Section A</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="grade4b" className="text-lg py-3 rounded-xl hover:bg-orange-50">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🎓</span>
                      <span>Grade 4 - Section B</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="priority" className="text-lg font-bold text-foreground flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-primary animate-pulse-fun" />
                <span>Priority</span>
                <span className="text-lg">⚡</span>
              </Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger className="h-14 text-lg border-2 border-primary/20 rounded-2xl focus:border-primary focus:ring-primary/20 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-2 border-primary/20">
                  <SelectItem value="low" className="text-lg py-3 rounded-xl hover:bg-blue-50">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🟢</span>
                      <span>Low</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium" className="text-lg py-3 rounded-xl hover:bg-yellow-50">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🟡</span>
                      <span>Medium</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="high" className="text-lg py-3 rounded-xl hover:bg-red-50">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🔴</span>
                      <span>High</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="dueDate" className="text-lg font-bold text-foreground flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary animate-pulse-fun" />
              <span>Due Date</span>
              <span className="text-lg">📅</span>
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
              required
              className="h-14 text-lg border-2 border-primary/20 rounded-2xl focus:border-primary focus:ring-primary/20 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-lg font-bold text-foreground flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary animate-pulse-fun" />
              <span>Description</span>
              <span className="text-lg">📋</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter assignment description and instructions"
              rows={4}
              required
              className="text-lg border-2 border-primary/20 rounded-2xl focus:border-primary focus:ring-primary/20 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50 resize-none"
            />
          </div>

          <div className="flex space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-14 text-lg font-bold border-2 border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 bg-transparent"
            >
              <span className="mr-2">❌</span>
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-14 text-lg font-black bg-gradient-to-r from-primary via-accent to-secondary hover:from-primary/90 hover:via-accent/90 hover:to-secondary/90 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center justify-center space-x-3">
                <Sparkles className="w-6 h-6 animate-sparkle" />
                <span>Create Assignment</span>
                <span className="text-xl animate-bounce-gentle">🚀</span>
              </div>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
