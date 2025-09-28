import { AppLayout } from "@/components/layout/app-layout"
import { useLanguage } from "@/contexts/language-context"
import { RecommendationsCenter } from "@/components/recommendations/recommendations-center"

export default function TeacherRecommendationsPage() {
  const { t } = useLanguage();
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.navigation.suggestions}</h1>
          <p className="text-muted-foreground">{t.homepage.featuresTitle}</p>
        </div>

        // MVP: This page is commented out for now. Will be used in future updates.
        // <RecommendationsCenter userType="teacher" />
      </div>
    </AppLayout>
  )
}
