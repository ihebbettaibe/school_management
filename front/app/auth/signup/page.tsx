import { SignupForm } from "@/components/auth/signup-form"
import { BookOpen } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcherInline } from "@/components/ui/language-switcher"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url(/school-library-background.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-end mb-4">
          <LanguageSwitcherInline />
        </div>

        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">DiLo Connect</h1>
          </Link>
        </div>

        <SignupForm />
      </div>
    </div>
  )
}
