import { AppLayout } from "@/components/layout/app-layout"
import { NotificationCenter } from "@/components/notifications/notification-center"

export default function ParentNotificationsPage() {
  // Meeting requests mock
  const meetingRequests = [
    {
      id: "1",
      teacherName: "Ms. Rodriguez",
      childName: "Emma Johnson",
      requestedDate: "2024-01-15",
      reason: "Discuss Emma's progress in advanced math topics",
    },
    {
      id: "2",
      teacherName: "Mr. Thompson",
      childName: "Liam Johnson",
      requestedDate: "2024-01-18",
      reason: "Review reading comprehension improvement strategies",
    },
  ]

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          color: "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200",
          icon: "⏳",
          text: "En attente de votre réponse"
        }
      case "accepted":
        return {
          color: "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200",
          icon: "✅",
          text: "Réunion confirmée"
        }
      case "rejected":
        return {
          color: "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200",
          icon: "❌",
          text: "Réunion refusée"
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: "⚪",
          text: "Statut inconnu"
        }
    }
  }

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "high":
        return { icon: "🔴", label: "Priorité élevée", color: "text-red-600" }
      case "medium":
        return { icon: "🟡", label: "Priorité moyenne", color: "text-yellow-600" }
      case "low":
        return { icon: "🟢", label: "Priorité faible", color: "text-green-600" }
      default:
        return { icon: "⚪", label: "Priorité normale", color: "text-gray-600" }
    }
  }

  const getSubjectIcon = (subject: string) => {
    switch (subject.toLowerCase()) {
      case "mathematics":
      case "math":
        return "🧮"
      case "english":
        return "📚"
      case "science":
        return "🔬"
      case "history":
        return "📜"
      case "art":
        return "🎨"
      default:
        return "📖"
    }
  }

  return (
    <AppLayout>
  <div className="px-2 py-4 sm:px-4 sm:py-8 md:p-16 space-y-8 sm:space-y-16 max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center space-y-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl opacity-30"></div>
          <div className="relative z-10 py-8">
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-sans mb-4">
              Notifications
            </h1>
            <p className="text-2xl text-muted-foreground font-semibold max-w-3xl mx-auto">
              Restez informé des activités scolaires de votre enfant
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
              <span className="text-lg font-semibold text-primary/70">Espace Parent</span>
            </div>
          </div>
        </div>

        {/* Meeting Requests Section (Simplified) */}
        <div className="space-y-6">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold flex items-center gap-1 sm:gap-2">
            <span>💬</span>
            <span>Demandes de réunion</span>
          </h2>
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meetingRequests.map((request) => (
              <div key={request.id} className="rounded-xl border bg-white p-3 sm:p-4 shadow flex flex-col gap-2 min-w-0">
                <div>
                  <div className="font-bold text-base sm:text-lg mb-1">{request.teacherName}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Enfant : <span className="font-semibold">{request.childName}</span></div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Date : <span className="font-semibold">{new Date(request.requestedDate).toLocaleDateString()}</span></div>
                  <div className="text-xs sm:text-sm text-gray-700 mt-1">Objet : {request.reason}</div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row pt-2 w-full">
                  <button className="w-full sm:w-auto sm:flex-1 bg-green-50 hover:bg-green-100 text-green-600 font-bold py-2 px-4 rounded transition border border-green-100">✅ Accepter</button>
                  <button className="w-full sm:w-auto sm:flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-4 rounded transition border border-red-100">❌ Décliner</button>
                  <button className="w-full sm:w-auto sm:flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-2 px-4 rounded transition border border-blue-100">💬 Message</button>
                </div>
              </div>
            ))}
          </div>
          {meetingRequests.length === 0 && (
            <div className="text-center py-10 text-gray-500">Aucune demande de réunion</div>
          )}
        </div>

        <NotificationCenter userType="parent" />
      </div>
    </AppLayout>
  )
}