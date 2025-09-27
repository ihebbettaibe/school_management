import { AppLayout } from "@/components/layout/app-layout"
import { NotificationCenter } from "@/components/notifications/notification-center"

export default function ParentNotificationsPage() {
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
    },
    {
      id: "2",
      teacherName: "Mr. Thompson",
      subject: "English",
      childName: "Liam Johnson",
      requestedDate: "2024-01-18",
      reason: "Review reading comprehension improvement strategies",
      status: "accepted",
    },
  ]

  return (
    <AppLayout>
      <div className="p-16 space-y-16 max-w-6xl mx-auto">
        <div>
          <h1 className="text-6xl font-extrabold text-primary font-sans mb-4">Notifications</h1>
          <p className="text-2xl text-muted-foreground font-semibold">Stay updated with your child's school activities</p>
        </div>

        {/* Meeting Requests Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
            <span>Demandes de réunion</span>
            <span className="text-2xl">💬</span>
          </h2>
          <div className="space-y-6">
            {meetingRequests.map((request) => (
              <div
                key={request.id}
                className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">👨‍🏫</div>
                    <div>
                      <h4 className="text-xl font-bold text-primary font-sans">{request.teacherName}</h4>
                      <p className="text-lg font-semibold text-primary/80 font-sans">{request.subject}</p>
                      <span className={`mt-2 text-sm font-bold px-3 py-1 rounded-full ${request.status === "pending" ? "bg-primary text-white" : "bg-secondary text-primary"}`}>
                        {request.status === "pending" ? "En attente" : "Acceptée"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary/70 font-sans">Pour: {request.childName}</p>
                    <p className="text-sm font-semibold text-primary/70 font-sans">Date: {request.requestedDate}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-base font-medium text-primary/80 font-sans">{request.reason}</p>
                </div>
                {request.status === "pending" && (
                  <div className="flex space-x-4">
                    <button className="btn-primary-fun px-4 py-2 rounded-xl font-bold text-white bg-primary hover:bg-primary/80 transition">Approve</button>
                    <button className="btn-fun px-4 py-2 rounded-xl font-bold text-primary border border-primary hover:bg-primary/10 transition">Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <NotificationCenter userType="parent" />
      </div>
    </AppLayout>
  )
}
