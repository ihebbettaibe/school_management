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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Toutes ({recommendations.length})</TabsTrigger>
            <TabsTrigger value="pending">En attente ({filteredRecommendations("pending").length})</TabsTrigger>
            <TabsTrigger value="under-review">
              En révision ({filteredRecommendations("under-review").length})
            </TabsTrigger>
            <TabsTrigger value="approved">Approuvées ({filteredRecommendations("approved").length})</TabsTrigger>
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
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <Card key={recommendation.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-primary font-sans">{recommendation.category}</h3>
                  <Badge variant="outline" className="text-base px-3 py-1 border-primary/40">{recommendation.category}</Badge>
                </div>
                <p className="text-lg text-foreground mb-3 font-sans">{recommendation.description}</p>
                <div className="flex items-center space-x-4 text-base text-muted-foreground font-sans">
                  <span>
                    Par <span className="font-semibold text-primary">{recommendation.submittedBy}</span> ({recommendation.userType === "parent" ? "parent" : "enseignant"})
                  </span>
                  <span>•</span>
                  <span>{new Date(recommendation.submittedDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{recommendation.votes} votes</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(recommendation.status)}
                <Badge className={getStatusColor(recommendation.status) + " text-base px-3 py-1 font-semibold border-2 border-primary/20"}>
                  {recommendation.status === "approved"
                    ? "Approuvé"
                    : recommendation.status === "rejected"
                      ? "Rejeté"
                      : recommendation.status === "under-review"
                        ? "En révision"
                        : "En attente"}
                </Badge>
              </div>
            </div>

            {userType !== "admin" && (
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => onVote?.(recommendation.id, "up")}
                    className="flex items-center space-x-2 text-lg font-semibold border-primary/40"
                  >
                    <ThumbsUp className="w-5 h-5 text-green-600" />
                    <span>{recommendation.upvotes}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => onVote?.(recommendation.id, "down")}
                    className="flex items-center space-x-2 text-lg font-semibold border-primary/40"
                  >
                    <ThumbsDown className="w-5 h-5 text-red-600" />
                    <span>{recommendation.downvotes}</span>
                  </Button>
                </div>
              </div>
            )}

            {recommendation.adminResponse && (
              <div className="mt-4 p-4 bg-primary/10 border-l-4 border-primary rounded-lg">
                <p className="text-base font-semibold text-primary mb-1">Réponse de l'administration:</p>
                <p className="text-base text-foreground">{recommendation.adminResponse}</p>
              </div>
            )}

            {userType === "admin" && recommendation.status === "pending" && (
              <div className="mt-4 flex space-x-2">
                <Button size="sm" onClick={() => onStatusUpdate?.(recommendation.id, "under-review")}>
                  Approuver
                </Button>
                <Button size="sm" onClick={() => onStatusUpdate?.(recommendation.id, "under-review")}>
                  En révision
                </Button>
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
