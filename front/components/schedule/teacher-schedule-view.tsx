"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScheduleBlock } from "./schedule-block"
import { ScheduleDetailModal } from "./schedule-detail-modal"
import { Calendar, Plus, Check, X, AlertTriangle } from "lucide-react"

interface ScheduleItem {
  id: string
  subject: string
  teacher: string
  classroom: string
  time: string
  day: string
  color: string
  assignments?: number
  exams?: number
  class?: string
}

interface ExamScheduleItem {
  id: string
  subject: string
  class: string
  time: string
  day: string
  teacher: string
}

// Mock schedule data
const mockScheduleData: ScheduleItem[] = [
  {
    id: "1",
    subject: "Mathematics",
    teacher: "Ms. Sarah Wilson",
    classroom: "Room 101",
    time: "09:00",
    day: "Monday",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    assignments: 2,
    class: "Grade 5-A",
  },
  {
    id: "2",
    subject: "Mathematics",
    teacher: "Ms. Sarah Wilson",
    classroom: "Room 101",
    time: "10:00",
    day: "Monday",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    class: "Grade 5-B",
  },
  {
    id: "3",
    subject: "Mathematics",
    teacher: "Ms. Sarah Wilson",
    classroom: "Room 101",
    time: "11:00",
    day: "Monday",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    class: "Grade 4-A",
  },
  {
    id: "4",
    subject: "Mathematics",
    teacher: "Ms. Sarah Wilson",
    classroom: "Room 101",
    time: "09:00",
    day: "Tuesday",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    class: "Grade 5-A",
  },
  {
    id: "5",
    subject: "Mathematics",
    teacher: "Ms. Sarah Wilson",
    classroom: "Room 101",
    time: "10:00",
    day: "Tuesday",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    assignments: 1,
    class: "Grade 5-B",
  },
  {
    id: "6",
    subject: "Mathematics",
    teacher: "Ms. Sarah Wilson",
    classroom: "Room 101",
    time: "11:00",
    day: "Tuesday",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    class: "Grade 4-A",
  },
]

// Mock existing exams
const mockExistingExams: ExamScheduleItem[] = [
  {
    id: "exam1",
    subject: "English",
    class: "Grade 5-A",
    time: "14:00",
    day: "Wednesday",
    teacher: "Mr. John Davis",
  },
]

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"]
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const availableClasses = ["All Classes", "Grade 5-A", "Grade 5-B", "Grade 4-A"]

export function TeacherScheduleView() {
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null)
  const [selectedClass, setSelectedClass] = useState("All Classes")
  const [isAddingExam, setIsAddingExam] = useState(false)
  const [examCursor, setExamCursor] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null)
  const [showExamConfirmation, setShowExamConfirmation] = useState(false)
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false)
  const [conflictingExam, setConflictingExam] = useState<ExamScheduleItem | null>(null)
  const [hoveredSlot, setHoveredSlot] = useState<{ day: string; time: string } | null>(null)

  const getScheduleItem = (day: string, time: string) => {
    const items = mockScheduleData.filter((item) => item.day === day && item.time === time)
    if (selectedClass === "All Classes") {
      return items[0] // Show first item if multiple classes
    }
    return items.find((item) => item.class === selectedClass)
  }

  const getFilteredScheduleData = () => {
    if (selectedClass === "All Classes") {
      return mockScheduleData
    }
    return mockScheduleData.filter((item) => item.class === selectedClass)
  }

  const handleAddExamClick = () => {
    setIsAddingExam(true)
    setExamCursor(true)
    document.body.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="%2322c55e" stroke="white" strokeWidth="2"/><text x="20" y="28" textAnchor="middle" fontSize="20" fill="white">✓</text></svg>') 20 20, auto`
  }

  const handleSlotClick = (day: string, time: string) => {
    if (!examCursor) return

    setSelectedSlot({ day, time })

    // Check for conflicts
    const existingExam = mockExistingExams.find((exam) => exam.day === day && exam.time === time)
    if (existingExam) {
      setConflictingExam(existingExam)
      setShowRescheduleDialog(true)
    } else {
      setShowExamConfirmation(true)
    }
  }

  const handleConfirmExam = () => {
    console.log("Adding exam for", selectedSlot)
    setShowExamConfirmation(false)
    setIsAddingExam(false)
    setExamCursor(false)
    setSelectedSlot(null)
    setHoveredSlot(null)
    document.body.style.cursor = "auto"
  }

  const handleCancelExam = () => {
    setShowExamConfirmation(false)
    setShowRescheduleDialog(false)
    setIsAddingExam(false)
    setExamCursor(false)
    setSelectedSlot(null)
    setConflictingExam(null)
    setHoveredSlot(null)
    document.body.style.cursor = "auto"
  }

  const handleReschedule = () => {
    console.log("Rescheduling exam", conflictingExam)
    setShowRescheduleDialog(false)
    setShowExamConfirmation(true)
  }

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-4 text-3xl font-extrabold text-primary">
              <Calendar className="w-8 h-8" />
              <span className="text-3xl font-extrabold font-sans">Emploi du temps hebdomadaire</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sélectionner une classe" />
                </SelectTrigger>
                <SelectContent>
                  {availableClasses.map((className) => (
                    <SelectItem key={className} value={className}>
                      {className === "All Classes" ? "Toutes les classes" : className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleAddExamClick}
                disabled={isAddingExam}
                className={`transition-all duration-200 ${
                  isAddingExam
                    ? "bg-green-500 hover:bg-green-500 text-white shadow-lg animate-pulse"
                    : "bg-green-600 hover:bg-green-700 text-white hover:shadow-md"
                }`}
              >
                {isAddingExam ? (
                  <>
                    <Check className="w-4 h-4 mr-2 animate-bounce" />
                    Cliquez sur un créneau...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un examen
                  </>
                )}
              </Button>
              {isAddingExam && (
                <Button
                  onClick={handleCancelExam}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                >
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
              )}
            </div>
          </div>
          {isAddingExam && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Mode ajout d'examen activé - Cliquez sur un créneau libre pour programmer un examen
                </span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-6 gap-4">
            {/* Header row */}
            <div className="font-extrabold text-center p-4 text-xl text-primary bg-gray-50 border-b border-primary/20 tracking-wide rounded-t-lg">Heure</div>
            {days.map((day) => (
              <div key={day} className="font-extrabold text-center p-4 text-xl text-primary bg-gray-50 border-b border-primary/20 tracking-wide rounded-t-lg">
                {day === "Monday"
                  ? "Lun"
                  : day === "Tuesday"
                    ? "Mar"
                    : day === "Wednesday"
                      ? "Mer"
                      : day === "Thursday"
                        ? "Jeu"
                        : "Ven"}
              </div>
            ))}

            {/* Schedule grid */}
            {timeSlots.map((time) => (
              <>
                <div
                  key={`time-${time}`}
                  className="text-xl text-primary text-center p-4 border-r border-primary/10 bg-white font-bold"
                >
                  {time}
                </div>
                {days.map((day) => {
                  const item = getScheduleItem(day, time)
                  const hasExistingExam = mockExistingExams.some((exam) => exam.day === day && exam.time === time)
                  const isHovered = hoveredSlot?.day === day && hoveredSlot?.time === time

                  return (
                    <div
                      key={`${day}-${time}`}
                      className="p-2"
                      onClick={() => examCursor && handleSlotClick(day, time)}
                      onMouseEnter={() => examCursor && setHoveredSlot({ day, time })}
                      onMouseLeave={() => examCursor && setHoveredSlot(null)}
                    >
                      {item ? (
                        <ScheduleBlock
                          item={item}
                          onClick={() => !examCursor && setSelectedItem(item)}
                          className={`transition-all duration-200 ${
                            examCursor
                              ? "cursor-pointer hover:ring-2 hover:ring-green-400 hover:shadow-md transform hover:scale-105"
                              : ""
                          } ${isHovered && examCursor ? "ring-2 ring-green-400 shadow-lg scale-105" : ""}`}
                        />
                      ) : (
                        <div
                          className={`h-16 border border-dashed border-border rounded-lg transition-all duration-200 ${
                            examCursor && !hasExistingExam
                              ? "cursor-pointer hover:bg-green-50 hover:border-green-300 hover:shadow-md transform hover:scale-105"
                              : ""
                          } ${
                            hasExistingExam
                              ? examCursor
                                ? "bg-red-50 border-red-200 cursor-pointer hover:bg-red-100 hover:border-red-300"
                                : "bg-red-50 border-red-200"
                              : ""
                          } ${isHovered && examCursor && !hasExistingExam ? "bg-green-100 border-green-400 shadow-lg scale-105" : ""} ${
                            isHovered && examCursor && hasExistingExam
                              ? "bg-red-100 border-red-400 shadow-lg scale-105"
                              : ""
                          }`}
                        >
                          {hasExistingExam && (
                            <div className="h-full flex items-center justify-center text-xs text-red-600 font-medium">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Examen programmé
                            </div>
                          )}
                          {examCursor && !hasExistingExam && isHovered && (
                            <div className="h-full flex items-center justify-center text-xs text-green-600 font-medium">
                              <Plus className="w-3 h-3 mr-1" />
                              Ajouter examen
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedItem && !examCursor && (
        <ScheduleDetailModal item={selectedItem} userType="teacher" onClose={() => setSelectedItem(null)} />
      )}

      <Dialog open={showExamConfirmation} onOpenChange={setShowExamConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              Confirmer l'ajout d'examen
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                Voulez-vous programmer un examen pour{" "}
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                  {selectedSlot?.day === "Monday"
                    ? "Lundi"
                    : selectedSlot?.day === "Tuesday"
                      ? "Mardi"
                      : selectedSlot?.day === "Wednesday"
                        ? "Mercredi"
                        : selectedSlot?.day === "Thursday"
                          ? "Jeudi"
                          : "Vendredi"}{" "}
                  à {selectedSlot?.time}
                </Badge>
                ?
              </p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={handleConfirmExam} className="flex-1 bg-green-600 hover:bg-green-700">
                <Check className="w-4 h-4 mr-2" />
                Confirmer
              </Button>
              <Button variant="outline" onClick={handleCancelExam} className="flex-1 bg-transparent">
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
              </div>
              Conflit d'examen détecté
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800 mb-2">
                Un examen de{" "}
                <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                  {conflictingExam?.subject}
                </Badge>{" "}
                par{" "}
                <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                  {conflictingExam?.teacher}
                </Badge>{" "}
                est déjà programmé à ce créneau.
              </p>
              <p className="text-sm text-orange-800">Voulez-vous reprogrammer cet examen et ajouter le vôtre?</p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={handleReschedule} className="flex-1 bg-orange-600 hover:bg-orange-700">
                Reprogrammer et continuer
              </Button>
              <Button variant="outline" onClick={handleCancelExam} className="flex-1 bg-transparent">
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
