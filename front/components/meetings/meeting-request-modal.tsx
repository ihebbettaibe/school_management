"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"

interface MeetingRequestModalProps {
  onClose: () => void
}

// Mock student data
const mockStudents = [
  { id: "1", name: "Emma Johnson", class: "Grade 5-A", parentName: "Sarah Johnson" },
  { id: "2", name: "Liam Smith", class: "Grade 5-A", parentName: "Michael Smith" },
  { id: "3", name: "Sophia Davis", class: "Grade 5-B", parentName: "Lisa Davis" },
  { id: "4", name: "Noah Wilson", class: "Grade 4-A", parentName: "Jennifer Wilson" },
]

export function MeetingRequestModal({ onClose }: MeetingRequestModalProps) {
  const [formData, setFormData] = useState({
    studentId: "",
    preferredDate: "",
    reason: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const student = mockStudents.find((s) => s.id === formData.studentId)
    if (student && formData.preferredDate && formData.reason) {
      // Mock function - in real app, this would send the request
      console.log("Meeting request sent:", {
        student: student.name,
        date: formData.preferredDate,
        reason: formData.reason,
      })
      onClose()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Meeting</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="student">Student</Label>
            <Select value={formData.studentId} onValueChange={(value) => handleInputChange("studentId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a student" />
              </SelectTrigger>
              <SelectContent>
                {mockStudents.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.preferredDate}
              onChange={(e) => handleInputChange("preferredDate", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => handleInputChange("reason", e.target.value)}
              placeholder="Purpose of meeting..."
              rows={2}
              required
            />
          </div>
          <div className="flex space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
