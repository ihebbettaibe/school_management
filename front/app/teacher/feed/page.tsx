import { AppLayout } from "@/components/layout/app-layout"
import { useLanguage } from "@/contexts/language-context"
import { SchoolFeed } from "@/components/feed/school-feed"

export default function TeacherFeedPage() {
  const { t } = useLanguage();
  return (
    <AppLayout>
      <div className="p-16 space-y-16 max-w-6xl mx-auto">
        <div>
          <h1 className="text-6xl font-extrabold text-primary font-sans mb-4">{t.navigation.schoolFeed}</h1>
          <p className="text-2xl text-muted-foreground font-semibold">{t.homepage.featuresTitle}</p>
        </div>
        {/* MVP: This page is commented out for now. Will be used in future updates. */}
        {/* <SchoolFeed userType="teacher" /> */}
      </div>
    </AppLayout>
  )
}
