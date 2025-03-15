"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Pagination from "@/components/pagination"
import { useToast } from "@/hooks/use-toast"

// Mock data - only women matches with correct race-matching images
const mockMatches = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 28,
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    lastMessage: "Would love to chat more about your travel experiences!",
    lastMessageTime: "2 hours ago",
    emotionScore: 87,
    connected: true,
    race: "white",
  },
  {
    id: 2,
    name: "Emily Davis",
    age: 31,
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1887&auto=format&fit=crop",
    lastMessage: "That yoga retreat sounds amazing!",
    lastMessageTime: "5 hours ago",
    emotionScore: 92,
    connected: true,
    race: "black",
  },
  {
    id: 3,
    name: "Jessica Chen",
    age: 26,
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1513097633097-329a3a64e0d4?q=80&w=1935&auto=format&fit=crop",
    lastMessage: "I'm also a big fan of indie music!",
    lastMessageTime: "Yesterday",
    emotionScore: 84,
    connected: false,
    race: "asian",
  },
  {
    id: 4,
    name: "Olivia Martinez",
    age: 29,
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=1889&auto=format&fit=crop",
    lastMessage: "That beach looks gorgeous! Where was it?",
    lastMessageTime: "2 days ago",
    emotionScore: 89,
    connected: false,
    race: "hispanic",
  },
  {
    id: 5,
    name: "Zoe Wilson",
    age: 27,
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop",
    lastMessage: "I'd love to hear more about your environmental work!",
    lastMessageTime: "3 days ago",
    emotionScore: 91,
    connected: false,
    race: "white",
  },
]

export default function MatchList() {
  const router = useRouter()
  const [matches, setMatches] = useState(mockMatches)
  const { toast } = useToast()

  const [currentPage, setCurrentPage] = useState(1)
  const matchesPerPage = 6
  const totalPages = Math.ceil(matches.length / matchesPerPage)

  const indexOfLastMatch = currentPage * matchesPerPage
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch)

  // Toggle connection with a match
  const handleConnect = (id: number) => {
    const match = matches.find((m) => m.id === id)
    const wasConnected = match?.connected

    setMatches((prev) => prev.map((match) => (match.id === id ? { ...match, connected: !match.connected } : match)))

    // Update match count in localStorage for the badge
    const currentCount = Number.parseInt(localStorage.getItem("connectedCount") || "0")
    const newCount = wasConnected ? currentCount - 1 : currentCount + 1
    localStorage.setItem("connectedCount", newCount.toString())

    // Dispatch a custom event to notify other components
    window.dispatchEvent(new CustomEvent("matchCountUpdated"))

    // Show toast notification
    toast({
      title: wasConnected ? "Connection removed" : "New connection!",
      description: wasConnected ? `You've disconnected from ${match?.name}` : `You've connected with ${match?.name}`,
      duration: 3000,
    })
  }

  // Remove/skip a match
  const handleRemoveMatch = (id: number) => {
    setMatches((prev) => prev.filter((match) => match.id !== id))

    toast({
      title: "Match removed",
      description: "You've removed this match.",
      duration: 3000,
    })
  }

  // Message a match
  const handleMessage = (id: number) => {
    router.push(`/chat/${id}`)
  }

  return (
    <div className="space-y-4">
      {matches.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No matches found</p>
        </div>
      ) : (
        <>
          {currentMatches.map((match) => (
            <Card key={match.id} className="overflow-hidden h-[160px] border rounded-xl">
              <CardContent className="p-0 flex h-full">
                <div className="w-[240px] relative">
                  <img
                    src={match.image || "/placeholder.svg"}
                    alt={match.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold">
                          {match.name}, {match.age}
                        </h3>
                        <p className="text-gray-500 mt-1">{match.location}</p>
                      </div>
                      <div className="bg-purple-500 bg-opacity-90 text-white px-3 py-1 rounded-full">
                        <span className="font-medium">{match.emotionScore}% Match</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{match.lastMessageTime}</p>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => handleRemoveMatch(match.id)}
                    >
                      <X className="h-5 w-5" />
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => handleMessage(match.id)}
                      >
                        <MessageCircle className="h-5 w-5" />
                      </Button>

                      <Button
                        variant={match.connected ? "default" : "outline"}
                        size="icon"
                        className={`h-10 w-10 ${match.connected ? "bg-red-500 hover:bg-red-600" : ""}`}
                        onClick={() => handleConnect(match.id)}
                      >
                        <Heart className="h-5 w-5" fill={match.connected ? "#ffffff" : "none"} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </>
      )}
    </div>
  )
}

