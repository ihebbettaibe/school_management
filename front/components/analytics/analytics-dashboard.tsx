"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Trophy, TrendingUp, Users, BookOpen, Award, Star, Filter } from "lucide-react"
import { useState } from "react"

interface AnalyticsDashboardProps {
  userType: "parent" | "teacher" | "admin"
}

// Mock data - in real app, this would come from API/database
const mockClassLeaderboard = [
  { rank: 1, class: "Grade 5-A", averageGrade: 92.5, totalStudents: 28, improvement: "+2.3%" },
  { rank: 2, class: "Grade 5-B", averageGrade: 89.8, totalStudents: 25, improvement: "+1.8%" },
  { rank: 3, class: "Grade 4-A", averageGrade: 87.2, totalStudents: 30, improvement: "+0.5%" },
  { rank: 4, class: "Grade 4-B", averageGrade: 85.6, totalStudents: 27, improvement: "-0.2%" },
  { rank: 5, class: "Grade 3-A", averageGrade: 84.1, totalStudents: 26, improvement: "+1.2%" },
  { rank: 6, class: "Grade 3-B", averageGrade: 82.9, totalStudents: 24, improvement: "+0.8%" },
]

const mockStudentPerformance = [
  { rank: 1, name: "Emma Johnson", class: "Grade 5-A", averageGrade: 96.5, subjects: 6 },
  { rank: 2, name: "Liam Smith", class: "Grade 5-B", averageGrade: 94.8, subjects: 6 },
  { rank: 3, name: "Sophia Davis", class: "Grade 4-A", averageGrade: 93.2, subjects: 5 },
  { rank: 4, name: "Noah Wilson", class: "Grade 5-A", averageGrade: 92.1, subjects: 6 },
  { rank: 5, name: "Olivia Brown", class: "Grade 4-B", averageGrade: 91.7, subjects: 5 },
]

const mockSubjectPerformance = [
  { subject: "Mathematics", averageGrade: 88.5, totalStudents: 156, topClass: "Grade 5-A" },
  { subject: "English", averageGrade: 86.2, totalStudents: 156, topClass: "Grade 4-A" },
  { subject: "Science", averageGrade: 84.8, totalStudents: 156, topClass: "Grade 5-B" },
  { subject: "History", averageGrade: 82.1, totalStudents: 156, topClass: "Grade 5-A" },
  { subject: "Art", averageGrade: 91.3, totalStudents: 156, topClass: "Grade 3-A" },
]

const gradeDistributionData = [
  { grade: "A+", count: 45, percentage: 18 },
  { grade: "A", count: 78, percentage: 31 },
  { grade: "B+", count: 65, percentage: 26 },
  { grade: "B", count: 42, percentage: 17 },
  { grade: "C+", count: 15, percentage: 6 },
  { grade: "C", count: 5, percentage: 2 },
]

const performanceTrendData = [
  { month: "Sep", grade3: 82, grade4: 85, grade5: 88 },
  { month: "Oct", grade3: 84, grade4: 87, grade5: 90 },
  { month: "Nov", grade3: 83, grade4: 86, grade5: 89 },
  { month: "Dec", grade3: 85, grade4: 88, grade5: 91 },
  { month: "Jan", grade3: 84, grade4: 87, grade5: 92 },
]

const subjectComparisonData = [
  { subject: "Math", currentTerm: 88.5, lastTerm: 86.2 },
  { subject: "English", currentTerm: 86.2, lastTerm: 84.8 },
  { subject: "Science", currentTerm: 84.8, lastTerm: 83.1 },
  { subject: "History", currentTerm: 82.1, lastTerm: 81.5 },
  { subject: "Art", currentTerm: 91.3, lastTerm: 89.7 },
]

const CHART_COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
}

export function AnalyticsDashboard({ userType }: AnalyticsDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("current-term")
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Award className="w-5 h-5 text-gray-400" />
      case 3:
        return <Star className="w-5 h-5 text-amber-600" />
      default:
        return (
          <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center text-xs font-bold">{rank}</div>
        )
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case 2:
        return "bg-gray-100 text-gray-800 border-gray-200"
      case 3:
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-8">
      {/* Simplified Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filtres d'Analyse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Période</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-term">Trimestre Actuel</SelectItem>
                  <SelectItem value="last-term">Dernier Trimestre</SelectItem>
                  <SelectItem value="year-to-date">Année en Cours</SelectItem>
                  <SelectItem value="last-year">Année Précédente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(userType === "admin" || userType === "teacher") && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Niveau</label>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les Niveaux</SelectItem>
                    <SelectItem value="grade-3">CE2</SelectItem>
                    <SelectItem value="grade-4">CM1</SelectItem>
                    <SelectItem value="grade-5">CM2</SelectItem>
                    <SelectItem value="grade-6">6ème</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Matière</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les Matières</SelectItem>
                  <SelectItem value="mathematics">Mathématiques</SelectItem>
                  <SelectItem value="english">Anglais</SelectItem>
                  <SelectItem value="science">Sciences</SelectItem>
                  <SelectItem value="history">Histoire</SelectItem>
                  <SelectItem value="art">Arts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>


      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Grade Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Répartition des Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Étudiants", color: CHART_COLORS.primary },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ grade, percentage }) => `${grade} (${percentage}%)`}
                    outerRadius={100}
                    fill={CHART_COLORS.primary}
                    dataKey="count"
                    stroke="white"
                    strokeWidth={2}
                  >
                    {gradeDistributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0
                            ? CHART_COLORS.success
                            : index === 1
                              ? CHART_COLORS.primary
                              : index === 2
                                ? CHART_COLORS.secondary
                                : index === 3
                                  ? CHART_COLORS.warning
                                  : index === 4
                                    ? CHART_COLORS.accent
                                    : CHART_COLORS.error
                        }
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            Comparaison des Matières
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              currentTerm: { label: "Trimestre Actuel", color: CHART_COLORS.primary },
              lastTerm: { label: "Dernier Trimestre", color: CHART_COLORS.secondary },
            }}
            className="h-96"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="subject"
                  tick={{ fontSize: 14, fill: "#b0b8c9", fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                  axisLine={{ stroke: "#e0e7ef" }}
                />
                <YAxis
                  domain={[75, 95]}
                  tick={{ fontSize: 14, fill: "#b0b8c9", fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                  axisLine={{ stroke: "#e0e7ef" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="currentTerm"
                  fill={CHART_COLORS.primary}
                  radius={[4, 4, 0, 0]}
                  stroke="white"
                  strokeWidth={1}
                />
                <Bar
                  dataKey="lastTerm"
                  fill={CHART_COLORS.secondary}
                  radius={[4, 4, 0, 0]}
                  stroke="white"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Performance Trend Chart - moved down */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold tracking-tight text-secondary font-sans">
            <TrendingUp className="w-5 h-5 text-secondary" />
            Tendances de Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              grade3: { label: "CE2", color: CHART_COLORS.primary },
              grade4: { label: "CM1", color: CHART_COLORS.secondary },
              grade5: { label: "CM2", color: CHART_COLORS.accent },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ef" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 14, fill: "#b0b8c9", fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                  axisLine={{ stroke: "#e0e7ef" }}
                />
                <YAxis
                  domain={[75, 95]}
                  tick={{ fontSize: 14, fill: "#b0b8c9", fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                  axisLine={{ stroke: "#e0e7ef" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="grade3"
                  stroke={CHART_COLORS.primary}
                  strokeWidth={4}
                  dot={{ fill: CHART_COLORS.primary, strokeWidth: 2, r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="grade4"
                  stroke={CHART_COLORS.secondary}
                  strokeWidth={4}
                  dot={{ fill: CHART_COLORS.secondary, strokeWidth: 2, r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="grade5"
                  stroke={CHART_COLORS.accent}
                  strokeWidth={4}
                  dot={{ fill: CHART_COLORS.accent, strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            Comparaison des Matières
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              currentTerm: { label: "Trimestre Actuel", color: CHART_COLORS.primary },
              lastTerm: { label: "Dernier Trimestre", color: CHART_COLORS.secondary },
            }}
            className="h-96"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="subject"
                  tick={{ fontSize: 14, fill: "#b0b8c9", fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                  axisLine={{ stroke: "#e0e7ef" }}
                />
                <YAxis
                  domain={[75, 95]}
                  tick={{ fontSize: 14, fill: "#b0b8c9", fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                  axisLine={{ stroke: "#e0e7ef" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="currentTerm"
                  fill={CHART_COLORS.primary}
                  radius={[4, 4, 0, 0]}
                  stroke="white"
                  strokeWidth={1}
                />
                <Bar
                  dataKey="lastTerm"
                  fill={CHART_COLORS.secondary}
                  radius={[4, 4, 0, 0]}
                  stroke="white"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Classement des Classes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockClassLeaderboard.map((classData) => (
              <div
                key={classData.class}
                className="flex items-center justify-between p-6 border border-border rounded-xl bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {getRankIcon(classData.rank)}
                  <div>
                    <h4 className="font-semibold text-lg text-secondary">{classData.class}</h4>
                    <p className="text-muted-foreground">{classData.totalStudents} étudiants</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{classData.averageGrade}%</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="text-sm text-success font-medium">{classData.improvement}</span>
                    </div>
                  </div>
                  <Badge className={getRankBadgeColor(classData.rank)} variant="outline">
                    #{classData.rank}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Students */}
        {(userType === "teacher" || userType === "admin") && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                Meilleurs Étudiants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockStudentPerformance.map((student) => (
                  <div key={student.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getRankIcon(student.rank)}
                      <div>
                        <h5 className="font-medium text-secondary">{student.name}</h5>
                        <p className="text-xs text-muted-foreground">{student.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{student.averageGrade}%</p>
                      <p className="text-xs text-muted-foreground">{student.subjects} matières</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              Performance par Matière
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSubjectPerformance.map((subject) => (
                <div key={subject.subject} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <h5 className="font-medium text-secondary">{subject.subject}</h5>
                    <p className="text-xs text-muted-foreground">
                      Classe en tête: {subject.topClass} • {subject.totalStudents} étudiants
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{subject.averageGrade}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aperçus de Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-success/10 border border-success/20 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-success/20 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <span className="font-semibold text-success">Tendance Positive</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Les performances globales de l'école se sont améliorées de 2,1% par rapport au dernier trimestre
                  </p>
            </div>

            <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-primary">Forte Participation</span>
                  </div>
                  <p className="text-sm text-muted-foreground">98,5% des étudiants ont participé aux évaluations récentes</p>
            </div>

            <div className="p-6 bg-warning/10 border border-warning/20 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-warning/20 rounded-lg">
                      <BookOpen className="w-5 h-5 text-warning" />
                    </div>
                    <span className="font-semibold text-warning">Focus Matière</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Les mathématiques montrent la plus forte amélioration dans tous les niveaux
                  </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
