import { AppLayout } from "@/components/layout/app-layout"
import { useLanguage } from "@/contexts/language-context"
import { TeacherDashboard } from "@/components/dashboard/teacher-dashboard"

export default function TeacherDashboardPage() {
  const { t } = useLanguage();
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.navigation.dashboard}</h1>
          <p className="text-muted-foreground">{t.homepage.tagline}</p>
        </div>
        <TeacherDashboard />
      </div>
    </AppLayout>
  )
}
