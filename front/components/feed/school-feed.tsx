"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Edit,
  Trash2,
  Heart,
  MessageCircle,
  Send,
  Filter,
  ChevronDown,
  ChevronUp,
  Star,
  Sparkles,
  Zap,
} from "lucide-react"

interface FeedPost {
  id: string
  title: string
  content: string
  author: string
  authorRole: "admin" | "teacher"
  createdAt: string
  scheduledFor?: string
  targetAudience: {
    type: "all" | "grade" | "class"
    value?: string
  }
  category: "announcement" | "event" | "schedule_change" | "emergency"
  image?: string
  location?: string
  eventDate?: string
}

interface SchoolFeedProps {
  userType: "parent" | "teacher" | "admin"
}

// Mock feed data
const mockFeedPosts: FeedPost[] = [
  {
    id: "1",
    title: "Parent-Teacher Conference Schedule",
    content:
      "Dear parents, we are pleased to announce that parent-teacher conferences will be held next week. Please check your email for your scheduled appointment time. If you need to reschedule, please contact the school office.",
    author: "Principal Johnson",
    authorRole: "admin",
    createdAt: "2024-01-12T10:00:00Z",
    targetAudience: { type: "all" },
    category: "announcement",
  },
  {
    id: "2",
    title: "Science Fair - Grade 5",
    content:
      "Attention Grade 5 students and parents! The annual Science Fair is coming up on January 25th. Students should start preparing their projects. Guidelines and project ideas are available on the school website.",
    author: "Dr. Emily Chen",
    authorRole: "teacher",
    createdAt: "2024-01-11T14:30:00Z",
    targetAudience: { type: "grade", value: "Grade 5" },
    category: "event",
    eventDate: "2024-01-25",
    location: "School Gymnasium",
  },
  {
    id: "3",
    title: "Schedule Change - Math Class",
    content:
      "Due to a school assembly, all Grade 4 math classes scheduled for tomorrow (January 13th) will be moved to the afternoon. New time: 2:00 PM - 3:00 PM.",
    author: "Ms. Sarah Wilson",
    authorRole: "teacher",
    createdAt: "2024-01-12T08:15:00Z",
    targetAudience: { type: "grade", value: "Grade 4" },
    category: "schedule_change",
  },
  {
    id: "4",
    title: "Winter Break Reading Challenge",
    content:
      "Join our Winter Break Reading Challenge! Students who read at least 5 books during the break will receive a special certificate and a small prize. Reading logs are available at the library.",
    author: "Ms. Lisa Martinez",
    authorRole: "teacher",
    createdAt: "2024-01-10T16:45:00Z",
    targetAudience: { type: "all" },
    category: "announcement",
    image: "/children-reading-books-winter.png",
  },
  {
    id: "5",
    title: "School Closure - Weather Alert",
    content:
      "Due to severe weather conditions, the school will be closed tomorrow, January 13th. All after-school activities are also cancelled. Please stay safe and warm!",
    author: "Principal Johnson",
    authorRole: "admin",
    createdAt: "2024-01-12T18:00:00Z",
    targetAudience: { type: "all" },
    category: "emergency",
  },
]

export function SchoolFeed({ userType }: SchoolFeedProps) {
  const [posts] = useState<FeedPost[]>(mockFeedPosts)
  const [filterGrade, setFilterGrade] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [likes, setLikes] = useState<Record<string, number>>({
    "1": 12,
    "2": 8,
    "3": 5,
    "4": 15,
    "5": 23,
  })
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({})
  const [comments, setComments] = useState<
    Record<string, Array<{ id: string; author: string; content: string; date: string }>>
  >({
    "1": [
      {
        id: "c1",
        author: "Sarah Johnson",
        content: "Thank you for the update! Looking forward to the conference.",
        date: "2024-01-12T11:00:00Z",
      },
      { id: "c2", author: "Mike Chen", content: "What time should we arrive?", date: "2024-01-12T11:30:00Z" },
    ],
    "2": [
      {
        id: "c3",
        author: "Lisa Martinez",
        content: "My daughter is so excited about this!",
        date: "2024-01-11T15:00:00Z",
      },
    ],
  })
  const [newComments, setNewComments] = useState<Record<string, string>>({})
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({})

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "announcement":
        return "bg-blue-100 text-blue-800"
      case "event":
        return "bg-green-100 text-green-800"
      case "schedule_change":
        return "bg-orange-100 text-orange-800"
      case "emergency":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "announcement":
        return "Announcement"
      case "event":
        return "Event"
      case "schedule_change":
        return "Schedule Change"
      case "emergency":
        return "Emergency"
      default:
        return "Post"
    }
  }

  const getTargetAudienceLabel = (targetAudience: FeedPost["targetAudience"]) => {
    switch (targetAudience.type) {
      case "all":
        return "All School"
      case "grade":
        return targetAudience.value
      case "class":
        return targetAudience.value
      default:
        return "All School"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredPosts = posts.filter((post) => {
    const gradeMatch =
      filterGrade === "all" ||
      (post.targetAudience.type === "grade" && post.targetAudience.value === filterGrade) ||
      post.targetAudience.type === "all"

    const categoryMatch = filterCategory === "all" || post.category === filterCategory

    return gradeMatch && categoryMatch
  })

  const handleLike = (postId: string) => {
    setUserLikes((prev) => ({ ...prev, [postId]: !prev[postId] }))
    setLikes((prev) => ({
      ...prev,
      [postId]: prev[postId] + (userLikes[postId] ? -1 : 1),
    }))
  }

  const handleComment = (postId: string) => {
    const content = newComments[postId]?.trim()
    if (!content) return

    const newComment = {
      id: `c${Date.now()}`,
      author: "Current User", // This would come from auth context
      content,
      date: new Date().toISOString(),
    }

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }))

    setNewComments((prev) => ({ ...prev, [postId]: "" }))
  }

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  const FeedPostCard = ({ post }: { post: FeedPost }) => (
    <Card className="card-super-fun hover:animate-jiggle relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-3xl"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-3xl"></div>
      <div className="absolute top-4 right-4 text-lg animate-sparkle opacity-60">
        {post.category === "announcement"
          ? "📢"
          : post.category === "event"
            ? "🎉"
            : post.category === "emergency"
              ? "🚨"
              : "📅"}
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-14 w-14 ring-4 ring-primary/20 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <AvatarImage src={`/abstract-geometric-shapes.png?key=ynj27&height=56&width=56&query=${post.author}`} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold text-lg">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Star className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-sparkle" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:animate-wiggle">
                  {post.author}
                </h3>
                <Badge
                  variant="outline"
                  className="font-bold border-2 border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  {post.authorRole === "admin" ? "Admin" : "Teacher"}
                </Badge>
                {post.scheduledFor && (
                  <Badge
                    variant="secondary"
                    className="font-bold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 animate-pulse-fun border-2 border-purple-200"
                  >
                    Scheduled
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground mt-1">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 animate-pulse-fun" />
                  <span className="font-medium">{formatDate(post.createdAt)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{getTargetAudienceLabel(post.targetAudience)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge
              className={`${getCategoryColor(post.category)} font-bold text-lg px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white/50`}
            >
              {getCategoryLabel(post.category)}
              {/* Keep only one emoji per post: category icon */}
              <span className="ml-2">
                {post.category === "announcement"
                  ? "📢"
                  : post.category === "event"
                    ? "🎉"
                    : post.category === "emergency"
                      ? "🚨"
                      : "📅"}
              </span>
            </Badge>
            {userType === "admin" && (
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 hover:scale-110 rounded-xl"
                >
                  <Edit className="h-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 hover:bg-red-100 hover:text-red-600 transition-all duration-300 hover:scale-110 rounded-xl"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h2 className="text-2xl font-black mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:animate-jiggle">
            {post.title}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground font-medium">{post.content}</p>
        </div>

        {post.image && (
          <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
            <img
              src={post.image || "/placeholder.svg"}
              alt="Post image"
              className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}

        {(post.eventDate || post.location) && (
          <>
            <Separator className="bg-gradient-to-r from-transparent via-primary/30 to-transparent h-1 rounded-full" />
            <div className="flex items-center space-x-6 text-lg bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-primary/20 shadow-lg">
              {post.eventDate && (
                <div className="flex items-center space-x-3 animate-slide-in-up">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-600">Event Date</p>
                    <p className="font-black text-blue-800">{new Date(post.eventDate).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              {post.location && (
                <div className="flex items-center space-x-3 animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-purple-600">Location</p>
                    <p className="font-black text-purple-800">{post.location}</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <Separator className="bg-gradient-to-r from-transparent via-primary/30 to-transparent h-1 rounded-full" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLike(post.id)}
              className={`flex items-center space-x-3 transition-all duration-300 hover:scale-110 px-6 py-3 rounded-2xl font-bold text-lg ${
                userLikes[post.id]
                  ? "text-red-500 bg-red-50 hover:bg-red-100 shadow-lg"
                  : "text-muted-foreground hover:text-red-500 hover:bg-red-50 hover:shadow-lg"
              }`}
            >
              <Heart
                className={`h-6 w-6 transition-all duration-300 ${userLikes[post.id] ? "fill-current animate-bounce-gentle" : ""}`}
              />
              <span>{likes[post.id] || 0}</span>
              {/* Remove extra emoji from like button */}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleComments(post.id)}
              className="flex items-center space-x-3 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-110 px-6 py-3 rounded-2xl font-bold text-lg hover:shadow-lg"
            >
              <MessageCircle className="h-6 w-6" />
              <span>{comments[post.id]?.length || 0}</span>
              {/* Remove extra emoji from comment button */}
              {expandedComments[post.id] ? (
                <ChevronUp className="h-4 w-4 animate-bounce-gentle" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {expandedComments[post.id] && (
          <div className="space-y-6 pt-4 animate-slide-in-up">
            <Separator className="bg-gradient-to-r from-transparent via-primary/30 to-transparent h-1 rounded-full" />
            {comments[post.id]?.map((comment, index) => (
              <div
                key={comment.id}
                className="flex space-x-4 animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Avatar className="h-12 w-12 ring-2 ring-primary/20 shadow-lg">
                  <AvatarFallback className="text-sm bg-gradient-to-br from-gray-100 to-blue-100 font-bold">
                    {comment.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-black text-lg text-gray-800">{comment.author}</span>
                      <span className="text-sm text-muted-foreground font-medium">{formatDate(comment.date)}</span>
                      {/* Remove extra emoji from comment bubble */}
                    </div>
                    <p className="text-lg text-gray-700 font-medium">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex space-x-4 animate-slide-in-up">
              <Avatar className="h-12 w-12 ring-4 ring-primary/30 shadow-lg">
                <AvatarFallback className="text-sm bg-gradient-to-br from-primary to-accent text-white font-bold">
                  CU
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex space-x-3">
                <Input
                  placeholder="Write a comment..."
                  value={newComments[post.id] || ""}
                  onChange={(e) => setNewComments((prev) => ({ ...prev, [post.id]: e.target.value }))}
                  className="flex-1 h-12 text-lg border-2 border-primary/20 rounded-2xl focus:border-primary focus:ring-primary/20 transition-all duration-300"
                  onKeyPress={(e) => e.key === "Enter" && handleComment(post.id)}
                />
                <Button
                  size="sm"
                  onClick={() => handleComment(post.id)}
                  disabled={!newComments[post.id]?.trim()}
                  className="h-12 px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl rounded-2xl font-bold"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8 relative">
      <div className="absolute top-10 right-10 text-2xl animate-sparkle opacity-20">🌟</div>
      <div className="absolute bottom-20 left-20 text-xl animate-float-soft opacity-20">⭐</div>
      <div className="absolute top-1/2 right-1/4 text-lg animate-pulse-fun opacity-20">✨</div>

      <Card className="card-super-fun relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-b-full"></div>
        <div className="p-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg animate-pulse-fun">
                <Filter className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Filter Posts:
              </span>
              <Zap className="w-6 h-6 text-yellow-500 animate-sparkle" />
            </div>
            <Select value={filterGrade} onValueChange={setFilterGrade}>
              <SelectTrigger className="w-48 h-12 border-2 border-primary/20 hover:border-primary transition-all duration-300 rounded-2xl font-bold">
                <SelectValue placeholder="All Grades 🎓" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades 🎓</SelectItem>
                <SelectItem value="Grade 1">Grade 1 👶</SelectItem>
                <SelectItem value="Grade 2">Grade 2 🧒</SelectItem>
                <SelectItem value="Grade 3">Grade 3 👦</SelectItem>
                <SelectItem value="Grade 4">Grade 4 👧</SelectItem>
                <SelectItem value="Grade 5">Grade 5 🧑</SelectItem>
                <SelectItem value="Grade 6">Grade 6 👨</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48 h-12 border-2 border-primary/20 hover:border-primary transition-all duration-300 rounded-2xl font-bold">
                <SelectValue placeholder="All Categories 📂" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories 📂</SelectItem>
                <SelectItem value="announcement">Announcements 📢</SelectItem>
                <SelectItem value="event">Events 🎉</SelectItem>
                <SelectItem value="schedule_change">Schedule Changes 📅</SelectItem>
                <SelectItem value="emergency">Emergency 🚨</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {filteredPosts.map((post, index) => (
        <div key={post.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
          <FeedPostCard post={post} />
        </div>
      ))}

      {filteredPosts.length === 0 && (
        <Card className="card-super-fun text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-10 animate-pulse-fun">
            😔
          </div>
          <CardContent className="p-12 relative z-10">
            <div className="text-4xl mb-4 animate-bounce-gentle">🔍</div>
            <p className="text-xl font-bold text-muted-foreground">No posts match your current filters.</p>
            <p className="text-lg text-muted-foreground mt-2">Try adjusting your filters to see more posts! ✨</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
