"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import type { Language } from "@/lib/i18n"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const languageNames = {
  en: "English",
  ar: "العربية",
  fr: "Français",
}

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <span className="text-sm">{languageNames[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languageNames).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as Language)}
            className={language === code ? "bg-accent" : ""}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function LanguageSwitcherInline() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-muted-foreground">{t.common.language}:</span>
      <div className="flex space-x-2">
        {Object.entries(languageNames).map(([code, name]) => (
          <Button
            key={code}
            variant={language === code ? "default" : "ghost"}
            size="sm"
            className="text-sm"
            onClick={() => setLanguage(code as Language)}
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  )
}
