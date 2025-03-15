"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Pagination from "@/components/pagination"

// Mock data for connected matches
const mockConnectedMatches = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 28,
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    lastActive: "Just now",
    connectionDate: "2 days ago",
    progress: "texted",
    emotionScore: 92,
  },
  {
    id: 2,
    name: "Emily Davis",
    age: 31,
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1887&auto=format&fit=crop",
    lastActive: "3 hours ago",
    connectionDate: "1 week ago",
    progress: "called",
    emotionScore: 78,
  },
  {
    id: 4,
    name: "Olivia Martinez",
    age: 29,
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=1889&auto=format&fit=crop",
    lastActive: "Yesterday",
    connectionDate: "3 days ago",
    progress: "none",
    emotionScore: 65,
  },
  {
    id: 6,
    name: "Mia Thompson",
    age: 24,
    location: "Boston, MA",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1740&auto=format&fit=crop",
    lastActive: "5 hours ago",
    connectionDate: "5 days ago",
    progress: "texted",
    emotionScore: 88,
  },
  {
    id: 7,
    name: "Aisha Patel",
    age: 30,
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
    lastActive: "1 day ago",
    connectionDate: "1 week ago",
    progress: "called",
    emotionScore: 95,
  },
  {
    id: 8,
    name: "Gabriela Rodriguez",
    age: 28,
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
    lastActive: "3 hours ago",
    connectionDate: "2 days ago",
    progress: "none",
    emotionScore: 72,
  },
]

export default function ConnectedMatches() {
  const router = useRouter()
  const [matches, setMatches] = useState(mockConnectedMatches)
  const { toast } = useToast()

  const [currentPage, setCurrentPage] = useState(1)
  const matchesPerPage = 6
  const totalPages = Math.ceil(matches.length / matchesPerPage)

  const indexOfLastMatch = currentPage * matchesPerPage
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch)

  const handleMessage = (id: number) => {
    router.push(`/chat/${id}`)
  }

  const handleRemove = (id: number) => {
    setMatches(matches.filter((match) => match.id !== id))

    toast({
      title: "Match removed",
      description: "You've successfully removed this match.",
      duration: 3000,
    })
  }

  return (
    <div className="space-y-4">
      {matches.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No connected matches yet</p>
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
                    <div className="flex items-center mt-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-sm text-gray-500">{match.lastActive}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">Connected {match.connectionDate}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => handleRemove(match.id)}>
                      <X className="h-5 w-5" />
                    </Button>

                    <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => handleMessage(match.id)}>
                      <MessageCircle className="h-5 w-5" />
                    </Button>
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

