"use client"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
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
  name: string;
  schedule: Schedule;
}

interface Grade {
  id: number;
  name: string;
  classes: ClassData[];
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


const initialGrades: Grade[] = [
  {
    id: 1,
    name: "Grade 1",
    classes: [
      { id: 101, name: "Class A", schedule: daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {} as Schedule) },
      { id: 102, name: "Class B", schedule: daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {} as Schedule) },
      { id: 103, name: "Class C", schedule: daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {} as Schedule) },
    ]
  },
  {
    id: 2,
    name: "Grade 2",
    classes: [
      { id: 201, name: "Class A", schedule: daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {} as Schedule) },
      { id: 202, name: "Class B", schedule: daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {} as Schedule) },
      { id: 203, name: "Class C", schedule: daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {} as Schedule) },
    ]
  },
]


export default function AdminSchedulesPage() {
  // Handler to add a new grade
  const addNewGrade = () => {
    if (newGradeName.trim()) {
      const newGrade: Grade = {
        id: Date.now(),
        name: newGradeName,
        classes: []
      };
      setGrades([...grades, newGrade]);
      setNewGradeName("");
    }
  };

  // Handler to add a new class to selected grade
  const addNewClass = () => {
    if (selectedGrade && newClassName.trim()) {
      const newClass: ClassData = {
        id: Date.now(),
        name: newClassName,
        schedule: daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {} as Schedule)
      };
      const updatedGrades = grades.map(grade =>
        grade.id === selectedGrade.id
          ? { ...grade, classes: [...grade.classes, newClass] }
          : grade
      );
      setGrades(updatedGrades);
      setNewClassName("");
      // Refresh selectedGrade
      setSelectedGrade(updatedGrades.find(g => g.id === selectedGrade.id) || null);
    }
  };

  // Handler to delete a class from selected grade
  const deleteClass = (classId: number) => {
    if (!selectedGrade) return;
    const updatedGrades = grades.map(grade =>
      grade.id === selectedGrade.id
        ? { ...grade, classes: grade.classes.filter(cls => cls.id !== classId) }
        : grade
    );
    setGrades(updatedGrades);
    if (selectedClass?.id === classId) {
      setSelectedClass(null);
    }
    setSelectedGrade(updatedGrades.find(g => g.id === selectedGrade.id) || null);
  };

  // Handler to publish schedule for a class
  const publishSchedule = (classId: number) => {
    if (!selectedGrade) return;
    const classData = selectedGrade.classes.find(cls => cls.id === classId);
    if (classData) {
      alert(`Schedule published for ${selectedGrade.name} ${classData.name}!`);
    }
  };

  // Handler to add a time slot to a class for a day
  const addTimeSlot = (classId: number, day: keyof Schedule) => {
    if (!selectedGrade) return;
    const updatedGrades = grades.map(grade =>
      grade.id === selectedGrade.id
        ? {
            ...grade,
            classes: grade.classes.map(cls =>
              cls.id === classId
                ? {
                    ...cls,
                    schedule: {
                      ...cls.schedule,
                      [day]: [...cls.schedule[day], { time: "", subject: "", teacher: "" }]
                    }
                  }
                : cls
            )
          }
        : grade
    );
    setGrades(updatedGrades);
    const updatedGrade = updatedGrades.find(g => g.id === selectedGrade.id) || null;
    setSelectedGrade(updatedGrade);
    const updatedClass = updatedGrade?.classes.find(cls => cls.id === classId) || null;
    setSelectedClass(updatedClass);
  };

  // Handler to update a time slot
  const updateTimeSlot = (classId: number, day: keyof Schedule, index: number, field: keyof TimeSlot, value: string) => {
    if (!selectedGrade) return;
    const updatedGrades = grades.map(grade =>
      grade.id === selectedGrade.id
        ? {
            ...grade,
            classes: grade.classes.map(cls =>
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
            )
          }
        : grade
    );
    setGrades(updatedGrades);
    const updatedGrade = updatedGrades.find(g => g.id === selectedGrade.id) || null;
    setSelectedGrade(updatedGrade);
    const updatedClass = updatedGrade?.classes.find(cls => cls.id === classId) || null;
    setSelectedClass(updatedClass);
  };

  // Handler to remove a time slot
  const removeTimeSlot = (classId: number, day: keyof Schedule, index: number) => {
    if (!selectedGrade) return;
    const updatedGrades = grades.map(grade =>
      grade.id === selectedGrade.id
        ? {
            ...grade,
            classes: grade.classes.map(cls =>
              cls.id === classId
                ? {
                    ...cls,
                    schedule: {
                      ...cls.schedule,
                      [day]: cls.schedule[day].filter((_, i) => i !== index)
                    }
                  }
                : cls
            )
          }
        : grade
    );
    setGrades(updatedGrades);
    const updatedGrade = updatedGrades.find(g => g.id === selectedGrade.id) || null;
    setSelectedGrade(updatedGrade);
    const updatedClass = updatedGrade?.classes.find(cls => cls.id === classId) || null;
    setSelectedClass(updatedClass);
  };
  const { t } = useLanguage()
  const [grades, setGrades] = useState<Grade[]>(initialGrades)
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null)
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null)
  const [selectedDay, setSelectedDay] = useState<keyof Schedule>("Monday")
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newClassName, setNewClassName] = useState("")
  const [newGradeName, setNewGradeName] = useState("")

  // ...existing logic (addNewClass, addNewGrade, deleteClass, addTimeSlot, updateTimeSlot, removeTimeSlot, publishSchedule)...

  return (
    <AppLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-primary flex items-center gap-3">
            <Calendar className="h-10 w-10" />
            {t.navigation.schedule}
          </h1>
          <div className="flex gap-2">
            <Input
              placeholder={t.schedule.addGradePlaceholder || "Add new grade"}
              value={newGradeName}
              onChange={e => setNewGradeName(e.target.value)}
              className="w-40"
            />
            <Button onClick={addNewGrade} className="bg-blue-600 hover:bg-blue-700">{t.schedule.addGrade || "Add Grade"}</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Grade & Class List */}
          <div className="lg:col-span-1 space-y-6">
            {grades.map(grade => (
              <Card key={grade.id}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 cursor-pointer" onClick={() => { setSelectedGrade(grade); setSelectedClass(null); }}>{grade.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedGrade?.id === grade.id && (
                    <>
                      {grade.classes.map(cls => (
                        <div key={cls.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <button
                            onClick={() => setSelectedClass(cls)}
                            className={`text-left flex-1 font-semibold ${selectedClass?.id === cls.id ? 'text-blue-600' : 'text-gray-700'}`}
                          >
                            <BookOpen className="inline h-4 w-4 mr-2" />
                            {cls.name}
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
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder={t.schedule.addClassPlaceholder || "Add new class"}
                          value={newClassName}
                          onChange={e => setNewClassName(e.target.value)}
                          className="w-32"
                        />
                        <Button onClick={addNewClass} className="bg-green-600 hover:bg-green-700">{t.schedule.addClass || "Add Class"}</Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Schedule Editor */}
          <div className="lg:col-span-2">
            {selectedClass ? (
              <Card>
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">
                      {selectedGrade?.name} {selectedClass.name} {t.navigation.schedule}
                    </CardTitle>
                    <Button 
                      onClick={() => publishSchedule(selectedClass.id)}
                      className="bg-white text-blue-600 hover:bg-gray-100"
                    >
                      {t.schedule.publish || "Publish Schedule"}
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
                        {t.schedule.days?.[day] || day}
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
                        {t.schedule.addTimeSlot || "Add Time Slot"}
                      </Button>
                    </div>

                    {selectedClass.schedule[selectedDay].length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>{t.schedule.noScheduleForDay?.replace("{day}", t.schedule.days?.[selectedDay] || selectedDay) || `No schedule set for ${selectedDay}`}</p>
                        <p className="text-sm">{t.schedule.addTimeSlotHint || "Click 'Add Time Slot' to get started"}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedClass.schedule[selectedDay].map((slot, index) => (
                          <Card key={index} className="border-l-4 border-l-blue-500">
                            <CardContent className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                <div>
                                  <label className="block text-sm font-medium mb-1">{t.schedule.time || "Time"}</label>
                                  <Select
                                    value={slot.time}
                                    onValueChange={(value) => updateTimeSlot(selectedClass.id, selectedDay, index, 'time', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder={t.schedule.selectTime || "Select time"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map(time => (
                                        <SelectItem key={time} value={time}>{time}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1">{t.schedule.subject || "Subject"}</label>
                                  <Select
                                    value={slot.subject}
                                    onValueChange={(value) => updateTimeSlot(selectedClass.id, selectedDay, index, 'subject', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder={t.schedule.selectSubject || "Select subject"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {subjects.map(subject => (
                                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1">{t.schedule.teacher || "Teacher"}</label>
                                  <Input
                                    placeholder={t.schedule.teacherNamePlaceholder || "Teacher name"}
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
                  <h3 className="text-xl font-semibold mb-2">{t.schedule.selectGradeClassTitle || "Select a Grade and Class"}</h3>
                  <p>{t.schedule.selectGradeClassHint || "Choose a grade and class from the left to manage its schedule"}</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
