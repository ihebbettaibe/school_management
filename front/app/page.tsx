"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSwitcherInline } from "@/components/ui/language-switcher"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useLanguage } from "@/contexts/language-context"
import { BookOpen, Calendar, Bell, Users, Star, Heart, Smile, Zap, Award, Menu, X, CheckCircle, MessageSquare, BarChart3, Clock, Shield, Smartphone } from "lucide-react"

export default function HomePage() {
  const { t, isRTL } = useLanguage()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "error">("idle")
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) return
    
    setIsSubscribing(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false)
      setSubscriptionStatus("success")
      setEmail("")
      setTimeout(() => setSubscriptionStatus("idle"), 3000)
    }, 1000)
  }

  // Debug image loading
  useEffect(() => {
    const testImage = new Image()
    testImage.onload = () => {
      console.log('Image preload successful')
    }
    testImage.onerror = () => {
      console.error('Image preload failed')
    }
    testImage.src = '/school-building-with-happy-families-and-children.png'
  }, [])

  const features = [
    {
      icon: BookOpen,
      title: "Devoirs & Projets",
      description: "Suivez facilement les devoirs, projets et échéances avec des rappels automatiques",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: CheckCircle,
      title: "Présences & Absences",
      description: "Surveillez les présences et recevez des alertes instantanées en cas d'absence",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: MessageSquare,
      title: "Communication Directe",
      description: "Messagerie sécurisée entre parents, enseignants et administration",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: BarChart3,
      title: "Tableaux de Bord",
      description: "Analyses détaillées et rapports pour suivre les progrès académiques",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Bell,
      title: "Notifications Intelligentes",
      description: "Restez informés avec des alertes personnalisées et pertinentes",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Shield,
      title: "Sécurité & Confidentialité",
      description: "Protection maximale des données avec conformité RGPD intégrée",
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ]

  const userTypes = [
    {
      type: "parent",
      title: "Parents",
      subtitle: "Accompagnez votre enfant",
      description: "Restez connecté avec le parcours éducatif de votre enfant et participez activement à sa réussite scolaire",
      icon: Heart,
      color: "bg-gradient-to-br from-pink-500 to-rose-600",
      href: "/auth/login?type=parent",
      features: [
        "Suivi des devoirs et notes en temps réel",
        "Communication directe avec les enseignants",
        "Alertes de présence et d'événements",
        "Calendrier familial intégré"
      ]
    },
    {
      type: "teacher",
      title: "Enseignants",
      subtitle: "Gérez votre classe efficacement",
      description: "Simplifiez la gestion de votre classe et renforcez le lien avec les familles grâce à des outils dédiés",
      icon: Users,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
      href: "/auth/login?type=teacher",
      features: [
        "Gestion simplifiée des présences",
        "Création et suivi des devoirs",
        "Communication groupée avec les parents",
        "Rapports automatisés de progression"
      ]
    },
    {
      type: "admin",
      title: "Administrateurs",
      subtitle: "Pilotez votre établissement",
      description: "Supervisez la communication et optimisez les opérations scolaires avec une vue d'ensemble complète",
      icon: Star,
      color: "bg-gradient-to-br from-purple-500 to-violet-600",
      href: "/auth/login?type=admin",
      features: [
        "Tableau de bord global de l'établissement",
        "Gestion des utilisateurs et permissions",
        "Analyses et rapports détaillés",
        "Configuration des modules scolaires"
      ]
    },
  ]

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 transition-all"
      >
        Aller au contenu principal
      </a>

      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
  <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse hover:opacity-80 transition-opacity"
              aria-label="Accueil"
            >
              <div className="relative flex items-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 -mt-4 -mb-4 bg-white rounded-lg flex items-center justify-center border border-gray-200 overflow-visible">
                  <NextImage 
                    src="/logo.svg" 
                    alt="School Logo" 
                    width={120}
                    height={120}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">{t.common.signIn}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/signup">{t.common.signUp}</Link>
              </Button>
              <ThemeToggle />
              {/*
              <Button variant="ghost" size="sm" asChild>
                <Link href="/recommendations">Recommandations</Link>
              </Button>
              */}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 px-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-slide-up">
              <div className="flex flex-col space-y-3">
                <Button variant="ghost" size="sm" className="justify-start" asChild>
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    {t.common.signIn}
                  </Link>
                </Button>
                <Button size="sm" className="justify-start" asChild>
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    {t.common.signUp}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section className="section-spacing gradient-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
          <div className="container mx-auto text-center relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="heading-fun">{t.homepage.tagline}</h1>
                <p className="text-playful max-w-xl">{t.homepage.description}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                  <Button size="lg" className="btn-primary-fun hover:scale-105 transition-transform duration-200" asChild>
                    <Link href="/auth/signup">
                      <Smile className="w-5 h-5 mr-2" />
                      {t.common.getStarted}
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="hover:bg-muted transition-all duration-300 bg-transparent border-2" asChild>
                    <Link href="#features">
                      <Zap className="w-5 h-5 mr-2" />
                      En savoir plus
                    </Link>
                  </Button>
                </div>
                
                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">10K+</div>
                    <div className="text-sm text-muted-foreground">Familles connectées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">500+</div>
                    <div className="text-sm text-muted-foreground">Écoles partenaires</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </div>
              
              <div className="animate-float-soft">
                <div className="relative">
                  {/* Background image */}
                  <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                    <NextImage
                      src="/school-building-with-happy-families-and-children.png"
                      alt="École et familles heureuses - DiLo Connect"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      priority
                      onError={() => setImageError(true)}
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>

                  {/* Fallback when image fails to load */}
                  {imageError && (
                    <div className="absolute inset-0 w-full h-64 md:h-80 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-2xl flex items-center justify-center">
                      <div className="text-center space-y-6 p-8">
                        <div className="relative">
                          <div className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg border border-gray-200">
                            <NextImage 
                              src="/White_and_Purple_Modern_School_Logo-removebg-preview.png" 
                              alt="School Logo" 
                              width={80}
                              height={80}
                              className="object-contain"
                              priority
                            />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                            <Heart className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          {/* <h3 className="text-xl font-bold text-foreground">DiLo Connect</h3> */}
                          <p className="text-muted-foreground max-w-xs mx-auto">
                            Connectons les écoles, les familles et les enseignants pour une éducation collaborative
                          </p>
                        </div>
                        <div className="flex justify-center space-x-2">
                          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                          <div className="w-3 h-3 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>      {/* Features Section */}
      <section id="features" className="section-spacing" aria-labelledby="features-heading">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="heading-fun">Tout ce dont vous avez besoin en un seul endroit</h2>
            <p className="text-playful text-muted-foreground max-w-3xl mx-auto">
              Découvrez comment DiLo Connect révolutionne la communication scolaire avec des outils intuitifs et puissants conçus pour chaque membre de votre communauté éducative.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isHovered = hoveredCard === index
              return (
                <Card
                  key={index}
                  className={`card-playful cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${isHovered ? "animate-wiggle" : ""} group`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  tabIndex={0}
                  role="listitem"
                  aria-labelledby={`feature-title-${index}`}
                  aria-describedby={`feature-description-${index}`}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                      aria-hidden="true"
                    >
                      <Icon className={`w-10 h-10 ${feature.color}`} />
                    </div>
                    <CardTitle id={`feature-title-${index}`} className="text-2xl font-bold text-foreground mb-3">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription id={`feature-description-${index}`} className="text-muted-foreground text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Gain de temps</h3>
              <p className="text-muted-foreground">Automatisez vos tâches répétitives et concentrez-vous sur l'essentiel</p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-green-600 rounded-full flex items-center justify-center mx-auto">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Accessible partout</h3>
              <p className="text-muted-foreground">Interface responsive qui s'adapte à tous vos appareils</p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Communauté connectée</h3>
              <p className="text-muted-foreground">Renforcez les liens entre tous les acteurs de l'éducation</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="section-spacing bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-fun">Choisissez votre expérience personnalisée</h2>
            <p className="text-playful text-muted-foreground max-w-3xl mx-auto">
              Que vous soyez parent, enseignant ou administrateur, DiLo Connect s'adapte à vos besoins spécifiques avec des interfaces et fonctionnalités dédiées.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {userTypes.map((userType, index) => {
              const Icon = userType.icon
              const isParent = userType.type === "parent"
              return (
                <Card key={index} className="card-playful text-left group hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className={`h-2 ${userType.color}`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">{userType.title}</h3>
                        <p className="text-lg text-primary font-semibold">{userType.subtitle}</p>
                      </div>
                      <div className={`w-16 h-16 ${userType.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <p className="text-muted-foreground text-base leading-relaxed">{userType.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Features List */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Fonctionnalités clés</h4>
                      {userType.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-6">
                      {isParent ? (
                        <Button className="btn-fun w-full" disabled>
                          Découvrir mon espace
                          <Zap className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button className="btn-fun w-full hover:scale-105 transition-transform duration-200 group-hover:shadow-lg" asChild>
                          <Link href={userType.href}>
                            Découvrir mon espace
                            <Zap className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Pas sûr de votre choix ?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Découvrez toutes les fonctionnalités avec notre démonstration interactive ou contactez notre équipe pour une présentation personnalisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="hover:bg-background">
                <BookOpen className="w-5 h-5 mr-2" />
                Voir la démo
              </Button>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <MessageSquare className="w-5 h-5 mr-2" />
                Demander une présentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-spacing">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-fun">Ce que disent nos utilisateurs</h2>
            <p className="text-playful text-muted-foreground max-w-2xl mx-auto">
              Découvrez pourquoi des milliers de familles et d'écoles font confiance à DiLo Connect
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Marie Dubois",
                role: "Parent d'élève",
                avatar: "👩‍💼",
                comment: "DiLo Connect a révolutionné ma façon de suivre la scolarité de ma fille. Je suis toujours informée et je peux facilement communiquer avec ses enseignants.",
                rating: 5
              },
              {
                name: "Jean Martin",
                role: "Enseignant",
                avatar: "👨‍🏫",
                comment: "Un outil fantastique pour gérer ma classe et maintenir un lien constant avec les parents. L'interface est intuitive et les fonctionnalités sont exactement ce dont j'avais besoin.",
                rating: 5
              },
              {
                name: "Sophie Laurent",
                role: "Directrice d'école",
                avatar: "👩‍💼",
                comment: "Depuis que nous utilisons DiLo Connect, la communication avec les familles est devenue fluide et efficace. C'est un véritable gain de temps pour toute l'équipe.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="card-playful text-center group hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div className="flex justify-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-6">Ils nous font confiance</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">Certifié ISO 27001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-accent" />
                <span className="text-sm font-medium">4.9/5 sur TrustPilot</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">10,000+ utilisateurs actifs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-fun">Questions fréquentes</h2>
            <p className="text-playful text-muted-foreground max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions les plus courantes
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Comment puis-je commencer à utiliser DiLo Connect ?",
                answer: "C'est très simple ! Il suffit de créer un compte en choisissant votre profil (parent, enseignant ou administrateur), puis de suivre les étapes de configuration. Votre école peut vous fournir un code d'invitation pour rejoindre leur communauté."
              },
              {
                question: "DiLo Connect est-il sécurisé pour les données de mon enfant ?",
                answer: "Absolument ! Nous prenons la sécurité très au sérieux. Toutes les données sont chiffrées, nous respectons le RGPD, et nous ne partageons jamais vos informations avec des tiers. Votre confidentialité est notre priorité."
              },
              {
                question: "Puis-je utiliser DiLo Connect sur mon téléphone ?",
                answer: "Oui ! DiLo Connect est entièrement responsive et fonctionne parfaitement sur tous les appareils : smartphone, tablette, ordinateur. Vous pouvez rester connecté où que vous soyez."
              },
              {
                question: "Combien coûte DiLo Connect ?",
                answer: "DiLo Connect propose plusieurs formules adaptées aux besoins de chaque école. Contactez-nous pour découvrir l'offre qui correspond le mieux à votre établissement. Nous proposons également une période d'essai gratuite."
              },
              {
                question: "Comment puis-je contacter le support technique ?",
                answer: "Notre équipe support est disponible du lundi au vendredi de 8h à 18h. Vous pouvez nous contacter via le chat en direct, par email à support@diloconnect.com, ou par téléphone au 01 23 45 67 89."
              }
            ].map((faq, index) => (
              <Card key={index} className="card-playful">
                <CardHeader 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setOpenFAQ(openFAQ === index ? null : index)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={openFAQ === index}
                  aria-controls={`faq-content-${index}`}
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="flex justify-between items-center">
                    <CardTitle id={`faq-question-${index}`} className="text-left text-lg">{faq.question}</CardTitle>
                    <div className={`transform transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''}`} aria-hidden="true">
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </CardHeader>
                {openFAQ === index && (
                  <CardContent id={`faq-content-${index}`} className="animate-fade-in" role="region" aria-labelledby={`faq-question-${index}`}>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-spacing gradient-bg" aria-labelledby="newsletter-heading">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 id="newsletter-heading" className="heading-fun mb-4">Restez informé</h2>
            <p className="text-playful text-muted-foreground mb-8">
              Inscrivez-vous à notre newsletter pour recevoir les dernières actualités et conseils sur l'éducation numérique
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">Adresse email</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  aria-describedby="newsletter-description"
                />
              </div>
              <Button 
                type="submit"
                className="btn-fun whitespace-nowrap min-w-[120px]"
                disabled={isSubscribing || !email}
                aria-describedby="newsletter-status"
              >
                {isSubscribing ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    S'abonner
                    <Bell className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
            
            {subscriptionStatus === "success" && (
              <div className="mt-4 p-3 bg-accent/10 text-accent rounded-lg animate-fade-in" role="alert">
                Merci ! Vous êtes maintenant abonné à notre newsletter.
              </div>
            )}
            
            <p id="newsletter-description" className="text-xs text-muted-foreground mt-4">
              En vous inscrivant, vous acceptez de recevoir nos emails. Vous pouvez vous désabonner à tout moment.
            </p>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-4">
              <h3 className="text-xl font-bold text-foreground">{t.homepage.title}</h3>
            </div>
            <p className="text-muted-foreground mb-6">Rendre la communication scolaire facile et amusante pour tous!</p>
            
            <nav aria-label="Liens du pied de page" className="mb-6">
              <ul className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                    Nous contacter
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                    Centre d'aide
                  </Link>
                </li>
              </ul>
            </nav>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground order-2 sm:order-1">{t.homepage.footer.replace('DiLo Connect', '').trim() || 'Tous droits réservés.'}</p>
                <div className="order-1 sm:order-2">
                  <LanguageSwitcherInline />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
