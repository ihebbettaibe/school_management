import { AppLayout } from "@/components/layout/app-layout"
import { useLanguage } from "@/contexts/language-context"
import { NotificationCenter } from "@/components/notifications/notification-center"

export default function TeacherNotificationsPage() {
  // Meeting requests mock
  const meetingRequests = [
    {
      id: "1",
      teacherName: "Ms. Rodriguez",
      subject: "Mathematics",
      childName: "Emma Johnson",
      requestedDate: "2024-01-15",
      reason: "Discuss Emma's progress in advanced math topics",
      status: "pending",
      priority: "high"
    },
    {
      id: "2",
      teacherName: "Mr. Thompson",
      subject: "English",
      childName: "Liam Johnson",
      requestedDate: "2024-01-18",
      reason: "Review reading comprehension improvement strategies",
      status: "accepted",
      priority: "medium"
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200"
      case "accepted":
        return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case "high":
        return "🔴"
      case "medium":
        return "🟡"
      case "low":
        return "🟢"
      default:
        return "⚪"
    }
  }

  const { t } = useLanguage();
  return (
    <AppLayout>
      <div className="px-2 py-4 sm:px-4 sm:py-8 md:p-16 space-y-8 sm:space-y-16 max-w-6xl mx-auto w-full">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent font-sans mb-4">
            {t.navigation.notifications}
          </h1>
          <p className="text-2xl text-muted-foreground font-semibold max-w-2xl mx-auto">
            {t.homepage.notifications.description}
          </p>
        </div>

        {/* Meeting Requests Section */}
        <div className="space-y-8">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 w-full">
            <h2 className="text-lg sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center gap-1 sm:gap-2 md:gap-4">
              <span className="text-lg sm:text-2xl md:text-4xl">💬</span>
              <span>Demandes de réunion</span>
            </h2>
            <div className="bg-gradient-to-r from-primary/10 to-purple-100 px-2 py-1 rounded-full min-w-[90px] text-center">
              <span className="text-primary font-bold text-xs sm:text-sm">
                {meetingRequests.filter(r => r.status === "pending").length} en attente
              </span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meetingRequests.map((request) => (
              <div
                key={request.id}
                className="rounded-xl bg-white border border-gray-200 shadow-sm p-3 sm:p-4 mb-2 flex flex-col justify-between min-w-0"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center mb-2 w-full">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                    <span className="text-base sm:text-xl md:text-2xl">👨‍🏫</span>
                    <span className="font-bold text-sm sm:text-base md:text-lg text-gray-800">{request.teacherName}</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">{request.subject}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold border ${getStatusColor(request.status)} min-w-[90px] text-center`}>{request.status === "pending" ? "⏳ En attente" : "✅ Acceptée"}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-gray-600 mb-2">
                  <span>👤 {request.childName}</span>
                  <span>📅 {new Date(request.requestedDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="mb-2 text-gray-700 text-xs sm:text-base"><span className="mr-2">💭</span>{request.reason}</div>
                {request.status === "pending" && (
                  <div className="flex flex-col gap-2 sm:flex-row mt-2 w-full">
                    <button className="w-full sm:w-auto sm:flex-1 bg-green-100 text-green-700 font-bold py-2 px-4 rounded hover:bg-green-200 transition">✅ Approuver</button>
                    <button className="w-full sm:w-auto sm:flex-1 bg-red-100 text-red-700 font-bold py-2 px-4 rounded hover:bg-red-200 transition">❌ Refuser</button>
                  </div>
                )}
                {request.status === "accepted" && (
                  <div className="flex flex-col gap-2 sm:flex-row mt-2 w-full">
                    <button className="w-full sm:w-auto sm:flex-1 bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded hover:bg-blue-200 transition">📧 Contacter Parent</button>
                    <button className="w-full sm:w-auto sm:flex-1 bg-purple-100 text-purple-700 font-bold py-2 px-4 rounded hover:bg-purple-200 transition">🗓️ Planifier</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {meetingRequests.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <div className="text-8xl mb-6">📭</div>
              <h3 className="text-2xl font-bold text-primary/70">Aucune demande de réunion</h3>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Les nouvelles demandes de réunion des parents apparaîtront ici
              </p>
            </div>
          )}
        </div>

        <NotificationCenter userType="teacher" />
      </div>
    </AppLayout>
  )
}