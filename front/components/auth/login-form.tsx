"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth, type UserType } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Heart, Sparkles, User, Mail, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<UserType>("parent")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const { t } = useLanguage()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Veuillez remplir tous les champs")
      return
    }

    const success = await login(email, password, userType)
    if (!success) {
      setError(t.auth.invalidCredentials)
    }
  }

  return (
    <Card className="card-super-fun relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-3xl"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-3xl"></div>
      <div className="absolute top-4 right-4 text-xl animate-sparkle">🎓</div>
      <div className="absolute bottom-4 left-4 text-lg animate-float-soft">✨</div>

      <CardHeader className="text-center pb-6 relative">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-xl animate-pulse-fun">
            <Heart className="w-8 h-8 text-white animate-bounce-gentle" />
          </div>
        </div>
        <CardTitle className="heading-super-fun text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
          {t.auth.welcomeBack} 👋
        </CardTitle>
        <p className="text-playful text-muted-foreground mt-2">Prêt à apprendre et grandir ensemble! 🌟</p>
      </CardHeader>

      <CardContent className="relative z-10">
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="userType" className="text-lg font-bold text-foreground flex items-center space-x-2">
              <User className="w-5 h-5 text-primary animate-pulse-fun" />
              <span>{t.auth.selectRole}</span>
              <span className="text-lg">👤</span>
            </Label>
            <Select value={userType} onValueChange={(value: UserType) => setUserType(value)}>
              <SelectTrigger className="h-14 text-lg border-2 border-primary/20 rounded-2xl focus:border-primary focus:ring-primary/20 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-2 border-primary/20">
                <SelectItem value="parent" className="text-lg py-3 rounded-xl hover:bg-blue-50">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">👨‍👩‍👧‍👦</span>
                    <span>{t.auth.parent}</span>
                  </div>
                </SelectItem>
                <SelectItem value="teacher" className="text-lg py-3 rounded-xl hover:bg-green-50">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">👩‍🏫</span>
                    <span>{t.auth.teacher}</span>
                  </div>
                </SelectItem>
                <SelectItem value="admin" className="text-lg py-3 rounded-xl hover:bg-purple-50">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">👑</span>
                    <span>{t.auth.admin}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-lg font-bold text-foreground flex items-center space-x-2">
              <Mail className="w-5 h-5 text-primary animate-pulse-fun" />
              <span>{t.auth.emailAddress}</span>
              <span className="text-lg">📧</span>
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre adresse e-mail"
                required
                className="h-14 text-lg pl-12 border-2 border-primary/20 rounded-2xl focus:border-primary focus:ring-primary/20 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50"
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60" />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="password" className="text-lg font-bold text-foreground flex items-center space-x-2">
              <Lock className="w-5 h-5 text-primary animate-pulse-fun" />
              <span>{t.auth.password}</span>
              <span className="text-lg">🔐</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                required
                className="h-14 text-lg pl-12 border-2 border-primary/20 rounded-2xl focus:border-primary focus:ring-primary/20 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50"
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60" />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl animate-slide-in-up">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-500 animate-wiggle" />
                <p className="text-lg font-bold text-red-700">{error}</p>
                <span className="text-xl animate-bounce-gentle">😔</span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-16 text-xl font-black bg-gradient-to-r from-primary via-accent to-secondary hover:from-primary/90 hover:via-accent/90 hover:to-secondary/90 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center space-x-3">
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t.common.loading}</span>
                  <span className="text-xl animate-pulse-fun">⏳</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 animate-sparkle" />
                  <span>{t.auth.signInButton}</span>
                  <span className="text-xl animate-bounce-gentle">🚀</span>
                </>
              )}
            </div>
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            {t.auth.dontHaveAccount}{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              {t.auth.signUpButton}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
