"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, X } from "lucide-react"
import Pagination from "@/components/pagination"
import { useToast } from "@/hooks/use-toast"

// Mock data for new matches
const mockNewMatches = [
  {
    id: 3,
    name: "Jessica Chen",
    age: 26,
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1513097633097-329a3a64e0d4?q=80&w=1935&auto=format&fit=crop",
    matchTime: "2 hours ago",
    emotionScore: 84,
  },
  {
    id: 5,
    name: "Zoe Wilson",
    age: 27,
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop",
    matchTime: "Yesterday",
    emotionScore: 91,
  },
  {
    id: 9,
    name: "Taylor Wright",
    age: 32,
    location: "Portland, OR",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop",
    matchTime: "3 hours ago",
    emotionScore: 85,
  },
  {
    id: 10,
    name: "Naomi Jackson",
    age: 27,
    location: "Atlanta, GA",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1887&auto=format&fit=crop",
    matchTime: "5 hours ago",
    emotionScore: 93,
  },
  {
    id: 11,
    name: "Lily Chen",
    age: 25,
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop",
    matchTime: "Yesterday",
    emotionScore: 87,
  },
]

export default function NewMatches() {
  const router = useRouter()
  const [matches, setMatches] = useState(mockNewMatches)
  const { toast } = useToast()

  const [currentPage, setCurrentPage] = useState(1)
  const matchesPerPage = 6
  const totalPages = Math.ceil(matches.length / matchesPerPage)

  const indexOfLastMatch = currentPage * matchesPerPage
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch)

  const handleConnect = (id: number) => {
    // In a real app, this would update the connection status in the database
    setMatches(matches.filter((match) => match.id !== id))

    // Update connected count in localStorage
    const currentCount = Number.parseInt(localStorage.getItem("connectedCount") || "0")
    localStorage.setItem("connectedCount", (currentCount + 1).toString())

    // Dispatch event to update UI
    window.dispatchEvent(new CustomEvent("matchCountUpdated"))

    // Show toast notification
    toast({
      title: "New connection!",
      description: `You've connected with ${matches.find((m) => m.id === id)?.name}`,
      duration: 3000,
    })
  }

  const handleDismiss = (id: number) => {
    setMatches(matches.filter((match) => match.id !== id))

    toast({
      title: "Match dismissed",
      description: "You've dismissed this match.",
      duration: 3000,
    })
  }

  const handleMessage = (id: number) => {
    router.push(`/chat/${id}`)
  }

  return (
    <div className="space-y-4">
      {matches.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No new matches at the moment</p>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 p-4 rounded-lg mb-6">
            <p className="text-lg font-medium text-center">New matches! Say hello and start a conversation</p>
          </div>

          {currentMatches.map((match) => (
            <Card
              key={match.id}
              className="overflow-hidden border-2 border-purple-200 dark:border-purple-800/30 animate-pulse-subtle h-[160px]"
            >
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
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {match.name}, {match.age}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{match.location}</p>
                      </div>
                      <div className="bg-purple-500/90 text-white text-xs px-2 py-1 rounded-full">
                        <span className="font-medium">{match.emotionScore}%</span>
                        <span className="ml-1">Match</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{match.matchTime}</p>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => handleDismiss(match.id)}>
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
                        variant="default"
                        size="icon"
                        className="h-10 w-10 bg-red-500 hover:bg-red-600"
                        onClick={() => handleConnect(match.id)}
                      >
                        <Heart className="h-5 w-5" fill="#ffffff" />
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

