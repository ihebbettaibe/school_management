"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export type UserType = "parent" | "teacher" | "admin"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  userType: UserType
  schoolCode?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, userType: UserType) => Promise<boolean>
  signup: (userData: Omit<User, "id"> & { password: string; confirmPassword: string }) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = () => {
      try {
        const storedUserType = localStorage.getItem("userType") as UserType | null
        const storedUserEmail = localStorage.getItem("userEmail")
          const storedUserFirstName = localStorage.getItem("userFirstName")
          const storedUserLastName = localStorage.getItem("userLastName")
        const storedUserPhone = localStorage.getItem("userPhone")

          if (storedUserType && storedUserEmail) {
            setUser({
              id: `user_${Date.now()}`,
              email: storedUserEmail,
              firstName: storedUserFirstName || "User",
              lastName: storedUserLastName || "",
              phone: storedUserPhone || undefined,
              userType: storedUserType,
            })
        }
      } catch (error) {
        console.error("Error checking auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, userType: UserType): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Mock authentication - in real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const firstName = email.split("@")[0]
      const lastName = ""
      const userData: User = {
        id: `user_${Date.now()}`,
        email,
        firstName,
        lastName,
        userType,
      }

      // Store in localStorage
      localStorage.setItem("userType", userType)
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userFirstName", firstName)
      localStorage.setItem("userLastName", lastName)

      setUser(userData)

      // Redirect based on user type
      switch (userType) {
        case "parent":
          router.push("/parent/schedule")
          break
        case "teacher":
          router.push("/teacher/dashboard")
          break
        case "admin":
          router.push("/admin/dashboard")
          break
      }

      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (
    userData: Omit<User, "id"> & { password: string; confirmPassword: string },
  ): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Mock signup process - in real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: `user_${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        userType: userData.userType,
        schoolCode: userData.schoolCode,
      }

      // Store in localStorage
      localStorage.setItem("userType", userData.userType)
      localStorage.setItem("userEmail", userData.email)
      localStorage.setItem("userFirstName", userData.firstName)
      localStorage.setItem("userLastName", userData.lastName)
      if (userData.phone) localStorage.setItem("userPhone", userData.phone)

      setUser(newUser)

      // Redirect based on user type
      switch (userData.userType) {
        case "parent":
          router.push("/parent/profile")
          break
        case "teacher":
          router.push("/teacher/profile")
          break
        case "admin":
          router.push("/admin/settings")
          break
      }

      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear localStorage
  localStorage.removeItem("userType")
  localStorage.removeItem("userEmail")
  localStorage.removeItem("userFirstName")
  localStorage.removeItem("userLastName")
  localStorage.removeItem("userPhone")

    setUser(null)
    router.push("/")
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
