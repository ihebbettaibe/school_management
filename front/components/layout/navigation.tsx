"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Calendar,
  MessageSquare,
  Bell,
  User,
  Home,
  Settings,
  FileText,
  UserCheck,
  BarChart3,
  Lightbulb,
  CreditCard,
  Star,
  Zap,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { NotificationBadge } from "@/components/notifications/notification-badge"
import { useLanguage } from "@/contexts/language-context"

interface NavigationProps {
  userType: "parent" | "teacher" | "admin"
}

export function Navigation({ userType }: NavigationProps) {
  const pathname = usePathname()
  const { t, isRTL } = useLanguage()

  // Mock notification count - in real app, this would come from a context or API
  const notificationCount = 3

  const getNavItems = () => {
    switch (userType) {
      case "parent":
        return [
          {
            href: "/parent/schedule",
            label: t.navigation.schedule,
            icon: Calendar,
            color: "from-blue-500 to-blue-600",
            emoji: "📅",
            description: "Voir l'emploi du temps de vos enfants",
          },
          {
            href: "/parent/assignments",
            label: t.navigation.assignments,
            icon: FileText,
            color: "from-green-500 to-green-600",
            emoji: "📝",
            description: "Suivre les devoirs et projets",
          },
          {
            href: "/parent/attendance",
            label: t.navigation.attendance,
            icon: UserCheck,
            color: "from-purple-500 to-purple-600",
            emoji: "✅",
            description: "Vérifier la présence de vos enfants",
          },
          {
            href: "/parent/notifications",
            label: t.navigation.notifications,
            icon: Bell,
            badge: notificationCount,
            color: "from-red-500 to-red-600",
            emoji: "🔔",
            description: "Messages et alertes importantes",
          },
          {
            href: "/parent/analytics",
            label: t.navigation.analytics,
            icon: BarChart3,
            color: "from-teal-500 to-teal-600",
            emoji: "📊",
            description: "Progrès et statistiques académiques",
          },
          {
            href: "/parent/payment",
            label: "Paiements",
            icon: CreditCard,
            color: "from-indigo-500 to-indigo-600",
            emoji: "💳",
            description: "Gérer les frais scolaires",
          },
          {
            href: "/parent/profile",
            label: t.navigation.profile,
            icon: User,
            color: "from-pink-500 to-pink-600",
            emoji: "👤",
            description: "Paramètres du profil familial",
          },
        ]
      case "teacher":
        return [
          {
            href: "/teacher/dashboard",
            label: t.navigation.dashboard,
            icon: Home,
            color: "from-blue-500 to-blue-600",
            emoji: "🏠",
            description: "Vue d'ensemble de vos classes",
          },
          {
            href: "/teacher/schedule",
            label: t.navigation.schedule,
            icon: Calendar,
            color: "from-green-500 to-green-600",
            emoji: "📅",
            description: "Emploi du temps et examens",
          },
          {
            href: "/teacher/assignments",
            label: t.navigation.assignments,
            icon: FileText,
            color: "from-purple-500 to-purple-600",
            emoji: "📝",
            description: "Créer et gérer les devoirs",
          },
          {
            href: "/teacher/students",
            label: t.navigation.attendance,
            icon: UserCheck,
            color: "from-orange-500 to-orange-600",
            emoji: "👥",
            description: "Gestion des élèves et présence",
          },
          {
            href: "/teacher/feed",
            label: t.navigation.schoolFeed,
            icon: MessageSquare,
            color: "from-teal-500 to-teal-600",
            emoji: "💬",
            description: "Communications avec les parents",
          },
          {
            href: "/teacher/notifications",
            label: t.navigation.notifications,
            icon: Bell,
            badge: notificationCount,
            color: "from-red-500 to-red-600",
            emoji: "🔔",
            description: "Alertes et messages importants",
          },
          {
            href: "/teacher/analytics",
            label: t.navigation.analytics,
            icon: BarChart3,
            color: "from-yellow-500 to-yellow-600",
            emoji: "📊",
            description: "Performances des élèves",
          },
          {
            href: "/teacher/recommendations",
            label: t.navigation.suggestions,
            icon: Lightbulb,
            color: "from-indigo-500 to-indigo-600",
            emoji: "💡",
            description: "Suggestions pédagogiques",
          },
          {
            href: "/teacher/profile",
            label: t.navigation.profile,
            icon: User,
            color: "from-pink-500 to-pink-600",
            emoji: "👤",
            description: "Profil enseignant et classes",
          },
        ]
      case "admin":
        return [
          {
            href: "/admin/dashboard",
            label: t.navigation.dashboard,
            icon: Home,
            color: "from-blue-500 to-blue-600",
            emoji: "🏠",
            description: "Vue d'ensemble de l'école",
          },
          {
            href: "/admin/schedules",
            label: t.navigation.schedule,
            icon: Calendar,
            color: "from-green-500 to-green-600",
            emoji: "📅",
            description: "Gestion des emplois du temps",
          },
          {
            href: "/admin/attendance",
            label: t.navigation.attendance,
            icon: UserCheck,
            color: "from-purple-500 to-purple-600",
            emoji: "✅",
            description: "Suivi global de la présence",
          },
          {
            href: "/admin/feed",
            label: t.navigation.schoolFeed,
            icon: MessageSquare,
            color: "from-orange-500 to-orange-600",
            emoji: "💬",
            description: "Communications de l'école",
          },
          {
            href: "/admin/notifications",
            label: t.navigation.notifications,
            icon: Bell,
            badge: notificationCount,
            color: "from-red-500 to-red-600",
            emoji: "🔔",
            description: "Alertes système et utilisateurs",
          },
          {
            href: "/admin/analytics",
            label: t.navigation.analytics,
            icon: BarChart3,
            color: "from-teal-500 to-teal-600",
            emoji: "📊",
            description: "Statistiques de l'école",
          },
          {
            href: "/admin/recommendations",
            label: t.navigation.suggestions,
            icon: Lightbulb,
            color: "from-yellow-500 to-yellow-600",
            emoji: "💡",
            description: "Suggestions d'amélioration",
          },
          {
            href: "/admin/settings",
            label: t.navigation.settings,
            icon: Settings,
            color: "from-gray-500 to-gray-600",
            emoji: "⚙️",
            description: "Configuration de l'école",
          },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t-4 border-primary/20 shadow-2xl md:relative md:border-t-0 md:bg-transparent md:shadow-none z-50">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full md:hidden"></div>

      <div className="flex justify-around md:flex-col md:space-y-2 md:p-6 py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-4 text-xs transition-all duration-300 md:flex-row md:justify-start md:space-x-4 rtl:md:space-x-reverse md:text-base md:p-4 md:rounded-2xl relative group hover:scale-110 font-bold",
                isActive
                  ? `text-white bg-gradient-to-r ${item.color} shadow-xl md:shadow-2xl animate-pulse-fun border-2 border-white/20`
                  : `text-muted-foreground hover:text-white hover:bg-gradient-to-r ${item.color} hover:shadow-lg border-2 border-transparent hover:border-white/20`,
              )}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              title={item.description} // Added tooltip descriptions
            >
              <div className="relative">
                <div
                  className={cn(
                    "relative p-2 rounded-xl transition-all duration-300",
                    isActive ? "bg-white/20 animate-jiggle" : "group-hover:bg-white/10 group-hover:animate-wiggle",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-6 w-6 md:h-5 md:w-5 transition-all duration-300",
                      isActive ? "animate-sparkle" : "group-hover:rotate-12 group-hover:scale-110",
                    )}
                  />
                  <span className="absolute -top-1 -right-1 text-xs opacity-80 animate-bounce-gentle">
                    {item.emoji}
                  </span>
                </div>

                {item.badge && item.badge > 0 && (
                  <NotificationBadge
                    count={item.badge}
                    className={`absolute -top-2 ${isRTL ? "-left-2" : "-right-2"} animate-bounce-gentle shadow-lg border-2 border-white`}
                  />
                )}

                {isActive && (
                  <>
                    <Star className="absolute -top-2 -left-2 w-3 h-3 text-yellow-300 animate-sparkle" />
                    <Zap className="absolute -bottom-1 -right-1 w-3 h-3 text-blue-300 animate-pulse-fun" />
                  </>
                )}
              </div>

              <div className="flex items-center space-x-2 md:flex-1">
                <span
                  className={cn(
                    "mt-2 md:mt-0 font-bold transition-all duration-300",
                    isActive ? "animate-pulse-fun" : "group-hover:animate-jiggle",
                  )}
                >
                  {item.label}
                </span>

                <ChevronRight
                  className={cn(
                    "hidden md:block w-4 h-4 transition-all duration-300 ml-auto",
                    isActive ? "text-white/80" : "text-muted-foreground/50 group-hover:text-white/60",
                    isRTL && "rotate-180",
                  )}
                />
              </div>

              <div
                className={cn(
                  "absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none",
                  "group-hover:bg-gradient-to-r group-hover:from-white/5 group-hover:to-transparent",
                  isActive && "bg-gradient-to-r from-white/10 to-transparent",
                )}
              ></div>
            </Link>
          )
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary md:hidden"></div>
    </nav>
  )
}
