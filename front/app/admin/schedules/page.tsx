"use client"
import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Calendar, Clock, BookOpen } from "lucide-react"

// Type definitions
interface TimeSlot {
  time: string;
  subject: string;
  teacher: string;
}

interface Schedule {
  Monday: TimeSlot[];
  Tuesday: TimeSlot[];
  Wednesday: TimeSlot[];
  Thursday: TimeSlot[];
  Friday: TimeSlot[];
  Saturday: TimeSlot[];
  Sunday: TimeSlot[];
}

interface ClassData {
  id: number;
  className: string;
  schedule: Schedule;
}

const daysOfWeek: (keyof Schedule)[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
]

const subjects = [
  "Mathematics", "English", "Science", "History", "Geography", "Art", 
  "Physical Education", "Music", "Computer Science", "Language Arts", 
  "Social Studies", "Biology", "Chemistry", "Physics", "Literature", "Break"
]

const initialClasses: ClassData[] = [
  { 
    id: 1,
    className: "Grade 1",
    schedule: {
      Monday: [{ time: "8:00 AM", subject: "Mathematics", teacher: "Mrs. Smith" }],
      Tuesday: [{ time: "9:00 AM", subject: "English", teacher: "Mr. Johnson" }],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }
  },
  { 
    id: 2,
    className: "Grade 2",
    schedule: {
      Monday: [{ time: "8:30 AM", subject: "Science", teacher: "Dr. Brown" }],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }
  },
]

export default function AdminSchedulesPage() {
  const [classes, setClasses] = useState<ClassData[]>(initialClasses)
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null)
  const [selectedDay, setSelectedDay] = useState<keyof Schedule>("Monday")
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newClassName, setNewClassName] = useState("")

  const addNewClass = () => {
    if (newClassName.trim()) {
      const newClass: ClassData = {
        id: Date.now(),
        className: newClassName,
        schedule: daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {} as Schedule)
      }
      setClasses([...classes, newClass])
      setNewClassName("")
      setIsAddingNew(false)
    }
  }

  const deleteClass = (classId: number) => {
    setClasses(classes.filter(cls => cls.id !== classId))
    if (selectedClass?.id === classId) {
      setSelectedClass(null)
    }
  }

  const addTimeSlot = (classId: number, day: keyof Schedule) => {
    const updatedClasses = classes.map(cls => 
      cls.id === classId 
        ? {
            ...cls,
            schedule: {
              ...cls.schedule,
              [day]: [...cls.schedule[day], { time: "", subject: "", teacher: "" }]
            }
          }
        : cls
    );
    setClasses(updatedClasses);
    // Refresh selectedClass to ensure UI updates
    const updatedClass = updatedClasses.find(cls => cls.id === classId) || null;
    setSelectedClass(updatedClass);
  }

  const updateTimeSlot = (classId: number, day: keyof Schedule, index: number, field: keyof TimeSlot, value: string) => {
    const updatedClasses = classes.map(cls => 
      cls.id === classId 
        ? {
            ...cls,
            schedule: {
              ...cls.schedule,
              [day]: cls.schedule[day].map((slot, i) => 
                i === index ? { ...slot, [field]: value } : slot
              )
            }
          }
        : cls
    );
    setClasses(updatedClasses);
    const updatedClass = updatedClasses.find(cls => cls.id === classId) || null;
    setSelectedClass(updatedClass);
  }

  const removeTimeSlot = (classId: number, day: keyof Schedule, index: number) => {
    const updatedClasses = classes.map(cls => 
      cls.id === classId 
        ? {
            ...cls,
            schedule: {
              ...cls.schedule,
              [day]: cls.schedule[day].filter((_, i) => i !== index)
            }
          }
        : cls
    );
    setClasses(updatedClasses);
    const updatedClass = updatedClasses.find(cls => cls.id === classId) || null;
    setSelectedClass(updatedClass);
  }

  const publishSchedule = (classId: number) => {
    // Here you would typically send the schedule to your backend
    const classData = classes.find(cls => cls.id === classId)
    if (classData) {
      alert(`Schedule published for ${classData.className}!`)
    }
  }

  return (
    <AppLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-primary flex items-center gap-3">
            <Calendar className="h-10 w-10" />
            Class Schedule Management
          </h1>
          <Button 
            onClick={() => setIsAddingNew(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Class
          </Button>
        </div>

        {isAddingNew && (
          <Card className="border-2 border-dashed border-blue-300 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Enter class name (e.g., Grade 3, Physics 101)"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addNewClass} className="bg-green-600 hover:bg-green-700">
                  Create Class
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => { setIsAddingNew(false); setNewClassName("") }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Class List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Classes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {classes.map(cls => (
                  <div key={cls.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <button
                      onClick={() => setSelectedClass(cls)}
                      className={`text-left flex-1 font-semibold ${
                        selectedClass?.id === cls.id ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <BookOpen className="inline h-4 w-4 mr-2" />
                      {cls.className}
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteClass(cls.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Schedule Editor */}
          <div className="lg:col-span-2">
            {selectedClass ? (
              <Card>
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">
                      {selectedClass.className} Schedule
                    </CardTitle>
                    <Button 
                      onClick={() => publishSchedule(selectedClass.id)}
                      className="bg-white text-blue-600 hover:bg-gray-100"
                    >
                      Publish Schedule
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Day Selector */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {daysOfWeek.map(day => (
                      <Button
                        key={day}
                        variant={selectedDay === day ? "default" : "outline"}
                        onClick={() => setSelectedDay(day)}
                        className={selectedDay === day ? "bg-blue-600" : ""}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>

                  {/* Schedule for Selected Day */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        {selectedDay} Schedule
                      </h3>
                      <Button
                        onClick={() => addTimeSlot(selectedClass.id, selectedDay)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Time Slot
                      </Button>
                    </div>

                    {selectedClass.schedule[selectedDay].length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No schedule set for {selectedDay}</p>
                        <p className="text-sm">Click "Add Time Slot" to get started</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedClass.schedule[selectedDay].map((slot, index) => (
                          <Card key={index} className="border-l-4 border-l-blue-500">
                            <CardContent className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                <div>
                                  <label className="block text-sm font-medium mb-1">Time</label>
                                  <Select
                                    value={slot.time}
                                    onValueChange={(value) => updateTimeSlot(selectedClass.id, selectedDay, index, 'time', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map(time => (
                                        <SelectItem key={time} value={time}>{time}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1">Subject</label>
                                  <Select
                                    value={slot.subject}
                                    onValueChange={(value) => updateTimeSlot(selectedClass.id, selectedDay, index, 'subject', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {subjects.map(subject => (
                                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1">Teacher</label>
                                  <Input
                                    placeholder="Teacher name"
                                    value={slot.teacher}
                                    onChange={(e) => updateTimeSlot(selectedClass.id, selectedDay, index, 'teacher', e.target.value)}
                                  />
                                </div>
                                <div className="flex justify-end">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeTimeSlot(selectedClass.id, selectedDay, index)}
                                    className="text-red-600 hover:text-red-800 hover:bg-red-100"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold mb-2">Select a Class</h3>
                  <p>Choose a class from the left to manage its schedule</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}