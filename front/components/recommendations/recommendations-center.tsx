"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, MessageSquare, CheckCircle, XCircle, Clock, Lightbulb, ThumbsUp, ThumbsDown } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface RecommendationsCenterProps {
  userType: "parent" | "teacher" | "admin"
}

const mockRecommendations = [
  {
    id: "1",
    description:
      "Pourriez-vous prolonger les heures de bibliothèque jusqu'à 18h pour aider les parents qui travaillent?",
    category: "Installations",
    submittedBy: "Sarah Johnson",
    userType: "parent",
    submittedDate: "2024-01-10",
    status: "under-review",
    votes: 23,
    upvotes: 18,
    downvotes: 5,
    adminResponse: "",
  },
  {
    id: "2",
    description:
      "Nous avons besoin de plus d'activités pratiques de sciences et technologie pour les élèves du primaire.",
    category: "Programme",
    submittedBy: "Mme Rodriguez",
    userType: "teacher",
    submittedDate: "2024-01-08",
    status: "approved",
    votes: 18,
    upvotes: 15,
    downvotes: 3,
    adminResponse: "Excellente suggestion! Nous prévoyons d'introduire un laboratoire STEM le semestre prochain.",
  },
  {
    id: "3",
    description:
      "L'équipement de la cour de récréation doit être mis à jour pour une meilleure sécurité et engagement.",
    category: "Installations",
    submittedBy: "Michael Chen",
    userType: "parent",
    submittedDate: "2024-01-05",
    status: "rejected",
    votes: 31,
    upvotes: 20,
    downvotes: 11,
    adminResponse:
      "Les contraintes budgétaires empêchent cette mise à niveau cette année. Nous reconsidérerons lors du prochain cycle budgétaire.",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    case "under-review":
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-blue-100 text-blue-800 border-blue-200"
  }
}

export function RecommendationsCenter({ userType }: RecommendationsCenterProps) {
  const [recommendations, setRecommendations] = useState(mockRecommendations)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newRecommendation, setNewRecommendation] = useState({
    description: "",
    category: "",
  })

  const handleSubmitRecommendation = () => {
    if (newRecommendation.description && newRecommendation.category) {
      const recommendation = {
        id: Date.now().toString(),
        ...newRecommendation,
        submittedBy: userType === "parent" ? "Parent actuel" : "Enseignant actuel",
        userType,
        submittedDate: new Date().toISOString().split("T")[0],
        status: "pending",
        votes: 0,
        upvotes: 0,
        downvotes: 0,
        adminResponse: "",
      }
      setRecommendations([recommendation, ...recommendations])
      setNewRecommendation({ description: "", category: "" })
      setIsSubmitting(false)
    }
  }

  const handleStatusUpdate = (id: string, status: string, response?: string) => {
    setRecommendations((prev) =>
      prev.map((rec) =>
        rec.id === id
          ? {
              ...rec,
              status,
              adminResponse: response || rec.adminResponse,
            }
          : rec,
      ),
    )
  }

  const handleVote = (id: string, voteType: "up" | "down") => {
    setRecommendations((prev) =>
      prev.map((rec) =>
        rec.id === id
          ? {
              ...rec,
              upvotes: voteType === "up" ? rec.upvotes + 1 : rec.upvotes,
              downvotes: voteType === "down" ? rec.downvotes + 1 : rec.downvotes,
              votes: rec.votes + 1,
            }
          : rec,
      ),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "under-review":
        return <Clock className="w-4 h-4 text-orange-600" />
      default:
        return <MessageSquare className="w-4 h-4 text-blue-600" />
    }
  }

  const filteredRecommendations = (status?: string) => {
    if (!status) return recommendations
    return recommendations.filter((rec) => rec.status === status)
  }

  return (
    <div className="space-y-6">
      {/* Submit New Recommendation */}
      {userType !== "admin" && (
        <Card className="border-primary/30 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between bg-primary/10 rounded-t-xl">
            <CardTitle className="flex items-center space-x-3 text-xl font-bold text-primary font-sans">
              <Lightbulb className="w-7 h-7 text-primary" />
              <span>Soumettre une recommandation</span>
            </CardTitle>
            <Dialog open={isSubmitting} onOpenChange={setIsSubmitting}>
              <DialogTrigger asChild>
                <Button size="lg" className="text-base font-semibold">
                  <Plus className="w-5 h-5 mr-2" />
                  Nouvelle suggestion
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold text-primary">Soumettre une nouvelle recommandation</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-base font-semibold">Catégorie</Label>
                    <Select
                      value={newRecommendation.category}
                      onValueChange={(value) => setNewRecommendation({ ...newRecommendation, category: value })}
                    >
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Programme">Programme et enseignement</SelectItem>
                        <SelectItem value="Installations">Installations et infrastructure</SelectItem>
                        <SelectItem value="Technologie">Technologie et outils numériques</SelectItem>
                        <SelectItem value="Communication">Communication et engagement</SelectItem>
                        <SelectItem value="Événements">Événements et activités</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base font-semibold">Description</Label>
                    <Textarea
                      id="description"
                      value={newRecommendation.description}
                      onChange={(e) => setNewRecommendation({ ...newRecommendation, description: e.target.value })}
                      placeholder="Décrivez votre suggestion en détail..."
                      rows={5}
                      className="text-base"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button size="lg" className="font-semibold" onClick={handleSubmitRecommendation}>Soumettre la recommandation</Button>
                    <Button size="lg" variant="outline" className="font-semibold" onClick={() => setIsSubmitting(false)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <p className="text-base text-primary font-medium">
              Vous avez une idée pour améliorer notre école ? Partagez vos suggestions et aidez-nous à créer un meilleur environnement d'apprentissage pour tous.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recommendations List */}
      {userType === "admin" ? (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="flex flex-wrap gap-4 justify-start items-center py-2">
            <TabsTrigger value="all" className="truncate text-xs sm:text-sm md:text-base px-4 py-2">Toutes ({recommendations.length})</TabsTrigger>
            <TabsTrigger value="pending" className="truncate text-xs sm:text-sm md:text-base px-4 py-2">En attente ({filteredRecommendations("pending").length})</TabsTrigger>
            <TabsTrigger value="under-review" className="truncate text-xs sm:text-sm md:text-base px-4 py-2">En révision ({filteredRecommendations("under-review").length})</TabsTrigger>
            <TabsTrigger value="approved" className="truncate text-xs sm:text-sm md:text-base px-4 py-2">Approuvées ({filteredRecommendations("approved").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <RecommendationsList
              recommendations={recommendations}
              userType={userType}
              onStatusUpdate={handleStatusUpdate}
              onVote={handleVote}
            />
          </TabsContent>
          <TabsContent value="pending">
            <RecommendationsList
              recommendations={filteredRecommendations("pending")}
              userType={userType}
              onStatusUpdate={handleStatusUpdate}
              onVote={handleVote}
            />
          </TabsContent>
          <TabsContent value="under-review">
            <RecommendationsList
              recommendations={filteredRecommendations("under-review")}
              userType={userType}
              onStatusUpdate={handleStatusUpdate}
              onVote={handleVote}
            />
          </TabsContent>
          <TabsContent value="approved">
            <RecommendationsList
              recommendations={filteredRecommendations("approved")}
              userType={userType}
              onStatusUpdate={handleStatusUpdate}
              onVote={handleVote}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <RecommendationsList recommendations={recommendations} userType={userType} onVote={handleVote} />
      )}
    </div>
  )
}

function RecommendationsList({
  recommendations,
  userType,
  onStatusUpdate,
  onVote,
}: {
  recommendations: any[]
  userType: string
  onStatusUpdate?: (id: string, status: string, response?: string) => void
  onVote?: (id: string, voteType: "up" | "down") => void
}) {
  const [adminResponse, setAdminResponse] = useState("")
  const [selectedRecommendation, setSelectedRecommendation] = useState("")

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
      {recommendations.map((recommendation) => (
        <Card key={recommendation.id} className="rounded-xl shadow-sm">
          <CardContent className="p-4 sm:p-8 md:p-10 lg:p-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start mb-6">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold text-primary font-sans">{recommendation.category}</h3>
                  <Badge variant="outline" className="text-xs sm:text-base md:text-lg px-2 sm:px-4 py-1 border-primary/40">{recommendation.category}</Badge>
                </div>
                <p className="text-sm sm:text-lg md:text-xl text-foreground mb-4 font-sans">{recommendation.description}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-base md:text-lg text-muted-foreground font-sans">
                  <span>
                    Par <span className="font-semibold text-primary">{recommendation.submittedBy}</span> ({recommendation.userType === "parent" ? "parent" : "enseignant"})
                  </span>
                  <span>•</span>
                  <span>{new Date(recommendation.submittedDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{recommendation.votes} votes</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                {getStatusIcon(recommendation.status)}
                <Badge className={getStatusColor(recommendation.status) + " text-xs sm:text-base md:text-lg px-2 sm:px-4 py-1 font-semibold border-2 border-primary/20"}>
                  {recommendation.status === "approved"
                    ? "Approuvé"
                    : recommendation.status === "rejeté"
                      ? "Rejeté"
                      : recommendation.status === "under-review"
                        ? "En révision"
                        : "En attente"}
                </Badge>
              </div>
            </div>

            {userType !== "admin" && (
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onVote?.(recommendation.id, "up")}
                  className="flex items-center space-x-2 text-xs sm:text-lg md:text-xl font-semibold border-primary/40"
                >
                  <ThumbsUp className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-green-600" />
                  <span>{recommendation.upvotes}</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onVote?.(recommendation.id, "down")}
                  className="flex items-center space-x-2 text-xs sm:text-lg md:text-xl font-semibold border-primary/40"
                >
                  <ThumbsDown className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-red-600" />
                  <span>{recommendation.downvotes}</span>
                </Button>
              </div>
            )}

            {recommendation.adminResponse && (
              <div className="mt-6 p-2 sm:p-4 md:p-6 bg-primary/10 border-l-4 border-primary rounded-lg">
                <p className="text-xs sm:text-base md:text-lg font-semibold text-primary mb-2">Réponse de l'administration:</p>
                <p className="text-xs sm:text-base md:text-lg text-foreground">{recommendation.adminResponse}</p>
              </div>
            )}

            {userType === "admin" && recommendation.status === "pending" && (
              <div className="mt-6 flex flex-wrap gap-4">
                <Button size="sm" onClick={() => onStatusUpdate?.(recommendation.id, "under-review")}>Approuver</Button>
                <Button size="sm" onClick={() => onStatusUpdate?.(recommendation.id, "under-review")}>En révision</Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusUpdate?.(recommendation.id, "rejected", "Non réalisable pour le moment")}
                >
                  Rejeter
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function getStatusIcon(status: string) {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case "rejected":
      return <XCircle className="w-4 h-4 text-red-600" />
    case "under-review":
      return <Clock className="w-4 h-4 text-orange-600" />
    default:
      return <MessageSquare className="w-4 h-4 text-blue-600" />
  }
}
