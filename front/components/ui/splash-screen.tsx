"use client"

import { useState, useEffect } from "react"
import { BookOpen, Heart, Users, Star, Sparkles } from "lucide-react"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500)
    const timer2 = setTimeout(() => setStage(2), 1500)
    const timer3 = setTimeout(() => setStage(3), 2500)
    const timer4 = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 500)
    }, 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent z-50 flex items-center justify-center animate-fadeOut">
        <div className="text-center text-white space-y-6 animate-slideUp">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent z-50 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-white/30 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-white/25 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute top-60 left-1/3 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
      </div>

      <div className="text-center text-white space-y-6 relative">
        {/* Logo Animation */}
        <div className="relative">
          <div 
            className={`w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all duration-1000 ${
              stage >= 0 ? 'animate-bounceIn scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          >
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          
          {/* Sparkles around logo */}
          {stage >= 1 && (
            <div className="absolute inset-0">
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />
              <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-yellow-200 animate-pulse delay-300" />
              <Sparkles className="absolute top-1/2 -right-4 w-5 h-5 text-yellow-100 animate-pulse delay-500" />
            </div>
          )}
        </div>

        {/* Main Title */}
        <div 
          className={`transition-all duration-1000 delay-500 ${
            stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            DiLo Connect
          </h1>
          <p className="text-xl text-white/80 font-medium">
            École • Famille • Ensemble
          </p>
        </div>

        {/* User Type Icons */}
        {stage >= 2 && (
          <div className="flex justify-center items-center space-x-8 mt-8">
            <div className="animate-slideInLeft">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
                <Heart className="w-8 h-8 text-red-300" />
              </div>
              <p className="text-sm mt-2 text-white/70">Parents</p>
            </div>
            
            <div className="animate-slideInUp delay-200">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
                <Users className="w-8 h-8 text-green-300" />
              </div>
              <p className="text-sm mt-2 text-white/70">Enseignants</p>
            </div>
            
            <div className="animate-slideInRight delay-400">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
                <Star className="w-8 h-8 text-yellow-300" />
              </div>
              <p className="text-sm mt-2 text-white/70">Admin</p>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        {stage >= 3 && (
          <div 
            className="animate-fadeIn delay-700 mt-8"
          >
            <p className="text-2xl font-semibold text-white/90">
              Bienvenue dans votre espace éducatif
            </p>
            <p className="text-lg text-white/70 mt-2">
              Connectons l'école et la famille...
            </p>
          </div>
        )}

        {/* Loading indicator */}
        {stage >= 3 && (
          <div className="flex justify-center mt-8">
            <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full animate-loading-bar"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}