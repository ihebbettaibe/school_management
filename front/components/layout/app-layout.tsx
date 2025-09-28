"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

import { Navigation } from "./navigation"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  LogOut,
  Home,
  ChevronRight,
} from "lucide-react"

interface AppLayoutProps {
  children: ReactNode
}

const generateBreadcrumbs = (pathname: string, t: any) => {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs: { label: string; href: string; isLast: boolean }[] = []

  if (segments.length > 0) {
    breadcrumbs.push({ label: "Accueil", href: "/", isLast: false })

    let currentPath = ""
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`

      let label: string
      switch (segment) {
        case "parent":
          label = "Parent"
          break
        case "teacher":
          label = "Enseignant"
          break
        case "admin":
          label = "Administrateur"
          break
        case "dashboard":
          label = t.navigation.dashboard
          break
        case "schedule":
          label = t.navigation.schedule
          break
        case "assignments":
          label = t.navigation.assignments
          break
        case "attendance":
          label = t.navigation.attendance
          break
        case "notifications":
          label = t.navigation.notifications
          break
        case "analytics":
          label = t.navigation.analytics
          break
        case "profile":
          label = t.navigation.profile
          break
        case "settings":
          label = t.navigation.settings
          break
        case "feed":
          label = t.navigation.schoolFeed
          break
        case "recommendations":
          label = t.navigation.suggestions
          break
        default:
          label = segment.charAt(0).toUpperCase() + segment.slice(1)
      }

      breadcrumbs.push({
        label,
        href: currentPath,
        isLast: index === segments.length - 1,
      })
    })
  }

  return breadcrumbs
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { t, isRTL } = useLanguage()

  const breadcrumbs = generateBreadcrumbs(pathname, t)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen fun-gradient-bg">
        <div className="relative">
          <div className="rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary shadow-lg animate-spin"></div>
        </div>
        <p className="mt-6 text-playful text-primary font-bold">
          Chargement de votre application scolaire...
        </p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className={cn("min-h-screen fun-gradient-bg bubble-pattern relative", isRTL ? "rtl" : "ltr")}>
      <div className="flex flex-col md:flex-row relative z-10">
        {/* Sidebar */}
        <aside className="md:w-72 backdrop-blur-md bg-white/95 border-r-4 border-primary/20 shadow-2xl relative">
          <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-tr-2xl"></div>

          <div className="md:p-8 md:border-b-2 md:border-primary/10 flex justify-between items-center relative">
            <Link href="/" className="hidden md:flex items-center group relative">
              <img src="/logo.svg" alt="Logo" className="w-20 h-20" />
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hover:bg-red-50 hover:text-red-600 rounded-xl border-2 border-transparent hover:border-red-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="ml-2 font-semibold">Au revoir!</span>
              </Button>
            </div>
          </div>

          <Navigation userType={user.userType} />
        </aside>

        {/* Main content */}
        <main className="flex-1 pb-20 md:pb-0 p-8 md:p-12 relative">
          {breadcrumbs.length > 1 && (
            <nav className="mb-8 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary/10 shadow-lg">
              <div className="flex items-center space-x-2 text-sm font-medium">
                <Home className="w-4 h-4 text-primary/60" />
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.href} className="flex items-center space-x-2">
                    {index > 0 && (
                      <ChevronRight
                        className={cn("w-4 h-4 text-primary/40", isRTL && "rotate-180")}
                      />
                    )}
                    {crumb.isLast ? (
                      <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-lg">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="text-primary/70 hover:text-primary hover:bg-primary/5 px-2 py-1 rounded-lg"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          )}

          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  )
}
