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
import { Sparkles, User, Mail, Lock, Phone, School, AlertCircle, Star } from "lucide-react"
import Link from "next/link"

export function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    userType: "" as UserType | "",
    schoolCode: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { signup, isLoading } = useAuth()
  const { t } = useLanguage()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom de famille est requis"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'e-mail est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Veuillez entrer un e-mail valide"
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.auth.passwordsDoNotMatch
    }

    if (!formData.userType) {
      newErrors.userType = "Veuillez sélectionner votre rôle"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis"
    }

    if (!formData.schoolCode.trim()) {
      newErrors.schoolCode = "Le code de l'école est requis"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const success = await signup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      userType: formData.userType as UserType,
      schoolCode: formData.schoolCode,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    })

    if (!success) {
      setErrors({ general: "Échec de la création du compte. Veuillez réessayer." })
    }
  }

  return (
    <Card className="relative overflow-hidden shadow-2xl border-2 border-primary/10 bg-white/90">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-3xl"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-3xl"></div>

      <CardHeader className="text-center pb-6 relative">
        <div className="flex justify-center mb-4">
          <img src="/logo.svg" alt="Logo" className="w-20 h-20" />
        </div>
        <CardTitle className="text-4xl font-extrabold text-primary font-sans mb-2">
          {t.auth.createAccount}
        </CardTitle>
        <p className="text-lg text-muted-foreground mt-2 font-semibold">Rejoignez notre incroyable communauté scolaire</p>
      </CardHeader>

      <CardContent className="relative z-10">
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="firstName" className="text-lg font-bold text-foreground flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Prénom</span>
            </Label>
            <div className="relative">
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Entrez votre prénom"
                className={`h-14 text-lg pl-12 border-2 rounded-2xl transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50 ${
                  errors.firstName
                    ? "border-red-300 focus:border-red-500"
                    : "border-primary/20 focus:border-primary focus:ring-primary/20"
                }`}
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60" />
            </div>
            {errors.firstName && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-bold">{errors.firstName}</p>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="lastName" className="text-lg font-bold text-foreground flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Nom de famille</span>
            </Label>
            <div className="relative">
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Entrez votre nom de famille"
                className={`h-14 text-lg pl-12 border-2 rounded-2xl transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50 ${
                  errors.lastName
                    ? "border-red-300 focus:border-red-500"
                    : "border-primary/20 focus:border-primary focus:ring-primary/20"
                }`}
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60" />
            </div>
            {errors.lastName && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-bold">{errors.lastName}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-lg font-bold text-foreground flex items-center space-x-2">
              <Mail className="w-5 h-5 text-primary" />
              <span>{t.auth.emailAddress}</span>
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Entrez votre adresse e-mail"
                className={`h-14 text-lg pl-12 border-2 rounded-2xl transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-primary/20 focus:border-primary focus:ring-primary/20"
                }`}
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60" />
            </div>
            {errors.email && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-bold">{errors.email}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="phone" className="text-lg font-bold text-foreground flex items-center space-x-2">
              <Phone className="w-5 h-5 text-primary" />
              <span>{t.auth.phoneNumber}</span>
            </Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Entrez votre numéro de téléphone"
                className={`h-14 text-lg pl-12 border-2 rounded-2xl transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50 ${
                  errors.phone
                    ? "border-red-300 focus:border-red-500"
                    : "border-primary/20 focus:border-primary focus:ring-primary/20"
                }`}
              />
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60" />
            </div>
            {errors.phone && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-bold">{errors.phone}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="userType" className="text-lg font-bold text-foreground flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>{t.auth.selectRole}</span>
            </Label>
            <Select value={formData.userType} onValueChange={(value: UserType) => handleInputChange("userType", value)}>
              <SelectTrigger
                className={`h-14 text-lg border-2 rounded-2xl bg-gradient-to-r from-white to-blue-50 ${
                  errors.userType ? "border-red-300" : "border-primary/20 focus:border-primary"
                }`}
              >
                <SelectValue placeholder="Sélectionnez votre rôle" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-2 border-primary/20">
                <SelectItem value="parent" className="text-lg py-3 rounded-xl hover:bg-blue-50">
                  <span>{t.auth.parent}</span>
                </SelectItem>
                <SelectItem value="teacher" className="text-lg py-3 rounded-xl hover:bg-green-50">
                  <span>{t.auth.teacher}</span>
                </SelectItem>
                <SelectItem value="admin" className="text-lg py-3 rounded-xl hover:bg-purple-50">
                  <span>{t.auth.admin}</span>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.userType && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-bold">{errors.userType}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="schoolCode" className="text-lg font-bold text-foreground flex items-center space-x-2">
              <School className="w-5 h-5 text-primary" />
              <span>{t.auth.schoolCode}</span>
            </Label>
            <div className="relative">
              <Input
                id="schoolCode"
                value={formData.schoolCode}
                onChange={(e) => handleInputChange("schoolCode", e.target.value)}
                placeholder="Entrez le code de votre école"
                className={`h-14 text-lg pl-12 border-2 rounded-2xl transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50 ${
                  errors.schoolCode
                    ? "border-red-300 focus:border-red-500"
                    : "border-primary/20 focus:border-primary focus:ring-primary/20"
                }`}
              />
              <School className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60" />
            </div>
            {errors.schoolCode && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-bold">{errors.schoolCode}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="password" className="text-lg font-bold text-foreground flex items-center space-x-2">
              <Lock className="w-5 h-5 text-primary" />
              <span>{t.auth.password}</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Créez un mot de passe"
                className={`h-14 text-lg pl-12 border-2 rounded-2xl transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50 ${
                  errors.password
                    ? "border-red-300 focus:border-red-500"
                    : "border-primary/20 focus:border-primary focus:ring-primary/20"
                }`}
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60" />
            </div>
            {errors.password && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-bold">{errors.password}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="confirmPassword"
              className="text-lg font-bold text-foreground flex items-center space-x-2"
            >
              <Lock className="w-5 h-5 text-primary" />
              <span>{t.auth.confirmPassword}</span>
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Confirmez votre mot de passe"
                className={`h-14 text-lg pl-12 border-2 rounded-2xl transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-white to-blue-50 ${
                  errors.confirmPassword
                    ? "border-red-300 focus:border-red-500"
                    : "border-primary/20 focus:border-primary focus:ring-primary/20"
                }`}
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60" />
            </div>
            {errors.confirmPassword && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-bold">{errors.confirmPassword}</p>
              </div>
            )}
          </div>

          {errors.general && (
            <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <p className="text-lg font-bold text-red-700">{errors.general}</p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-16 text-xl font-black bg-gradient-to-r from-primary via-accent to-secondary shadow-xl rounded-2xl relative overflow-hidden"
          >
            <div className="relative z-10 flex items-center justify-center space-x-3">
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t.common.loading}</span>
                </>
              ) : (
                <>
                  <span>{t.auth.signUpButton}</span>
                </>
              )}
            </div>
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            {t.auth.alreadyHaveAccount}{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              {t.auth.signInButton}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
