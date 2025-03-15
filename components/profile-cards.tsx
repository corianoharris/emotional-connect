"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, X, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data - women profiles with stock images that match their race attributes
const mockProfiles = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 28,
    location: "New York, NY",
    bio: "Passionate about art, travel, and good coffee. Looking for someone who appreciates the little things in life.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 87,
    interests: ["Art", "Travel", "Coffee", "Hiking"],
    topEmotions: ["Joy", "Curiosity", "Interest"],
    race: "white",
    height: 168, // cm
    bodyType: "slim",
  },
  {
    id: 2,
    name: "Emily Davis",
    age: 31,
    location: "Los Angeles, CA",
    bio: "Yoga instructor and plant mom. Seeking genuine connections with like-minded souls.",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 92,
    interests: ["Yoga", "Plants", "Meditation", "Cooking"],
    topEmotions: ["Serenity", "Joy", "Compassion"],
    race: "black",
    height: 175, // cm
    bodyType: "athletic",
  },
  {
    id: 3,
    name: "Jessica Chen",
    age: 26,
    location: "Chicago, IL",
    bio: "Software developer by day, musician by night. Let's talk about tech, music, or anything in between!",
    image: "https://images.unsplash.com/photo-1513097633097-329a3a64e0d4?q=80&w=1935&auto=format&fit=crop",
    emotionScore: 84,
    interests: ["Coding", "Music", "Reading", "Photography"],
    topEmotions: ["Interest", "Excitement", "Curiosity"],
    race: "asian",
    height: 162, // cm
    bodyType: "slim",
  },
  {
    id: 4,
    name: "Olivia Martinez",
    age: 29,
    location: "Miami, FL",
    bio: "Beach lover and foodie. Always up for trying new restaurants and adventures.",
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1889&auto=format&fit=crop",
    emotionScore: 89,
    interests: ["Beach", "Food", "Travel", "Dancing"],
    topEmotions: ["Joy", "Excitement", "Interest"],
    race: "hispanic",
    height: 170, // cm
    bodyType: "curvy",
  },
  {
    id: 5,
    name: "Zoe Wilson",
    age: 27,
    location: "Seattle, WA",
    bio: "Environmental scientist passionate about sustainability. Looking for someone to explore nature with.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop",
    emotionScore: 91,
    interests: ["Nature", "Hiking", "Sustainability", "Photography"],
    topEmotions: ["Serenity", "Interest", "Joy"],
    race: "white",
    height: 180, // cm
    bodyType: "athletic",
  },
  {
    id: 6,
    name: "Mia Thompson",
    age: 24,
    location: "Boston, MA",
    bio: "Graduate student in psychology. Love exploring new cafes, reading novels, and deep conversations.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1740&auto=format&fit=crop",
    emotionScore: 88,
    interests: ["Psychology", "Books", "Coffee", "Art"],
    topEmotions: ["Curiosity", "Contentment", "Interest"],
    race: "white",
    height: 165, // cm
    bodyType: "average",
  },
  {
    id: 7,
    name: "Aisha Patel",
    age: 30,
    location: "San Francisco, CA",
    bio: "Tech entrepreneur with a passion for social impact. Looking for someone who shares my values and ambition.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
    emotionScore: 86,
    interests: ["Technology", "Social Impact", "Travel", "Fitness"],
    topEmotions: ["Determination", "Joy", "Interest"],
    race: "asian",
    height: 163, // cm
    bodyType: "slim",
  },
  {
    id: 8,
    name: "Gabriela Rodriguez",
    age: 28,
    location: "Austin, TX",
    bio: "Music producer and festival enthusiast. Let's share playlists and go to concerts together!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
    emotionScore: 90,
    interests: ["Music", "Festivals", "DJing", "Travel"],
    topEmotions: ["Excitement", "Joy", "Passion"],
    race: "hispanic",
    height: 172, // cm
    bodyType: "athletic",
  },
  {
    id: 9,
    name: "Taylor Wright",
    age: 32,
    location: "Portland, OR",
    bio: "Chef and food blogger. I believe food is the universal language of love. Let me cook for you!",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop",
    emotionScore: 85,
    interests: ["Cooking", "Food", "Wine", "Gardening"],
    topEmotions: ["Joy", "Contentment", "Passion"],
    race: "white",
    height: 178, // cm
    bodyType: "average",
  },
  {
    id: 10,
    name: "Naomi Jackson",
    age: 27,
    location: "Atlanta, GA",
    bio: "Fitness coach and wellness advocate. Looking for someone who values health and personal growth.",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 93,
    interests: ["Fitness", "Wellness", "Nutrition", "Meditation"],
    topEmotions: ["Energy", "Determination", "Serenity"],
    race: "black",
    height: 176, // cm
    bodyType: "athletic",
  },
  {
    id: 11,
    name: "Lily Chen",
    age: 25,
    location: "Seattle, WA",
    bio: "Graphic designer with a love for vintage aesthetics. Always on the hunt for the perfect latte and vinyl records.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 87,
    interests: ["Design", "Art", "Coffee", "Music"],
    topEmotions: ["Creativity", "Curiosity", "Joy"],
    race: "asian",
    height: 160, // cm
    bodyType: "slim",
  },
  {
    id: 12,
    name: "Sofia Morales",
    age: 29,
    location: "Denver, CO",
    bio: "Mountain lover and adventure seeker. Let's go hiking, skiing, or just enjoy a sunset together.",
    image: "https://images.unsplash.com/photo-1496440737103-cd596325d314?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 89,
    interests: ["Hiking", "Skiing", "Photography", "Travel"],
    topEmotions: ["Adventure", "Joy", "Serenity"],
    race: "hispanic",
    height: 169, // cm
    bodyType: "athletic",
  },
  {
    id: 13,
    name: "Rachel Kim",
    age: 26,
    location: "Philadelphia, PA",
    bio: "Fashion designer and art enthusiast. Looking for someone who appreciates creativity and style.",
    image: "https://images.unsplash.com/photo-1513097633097-329a3a64e0d4?q=80&w=1935&auto=format&fit=crop",
    emotionScore: 88,
    interests: ["Fashion", "Art", "Design", "Travel"],
    topEmotions: ["Creativity", "Passion", "Joy"],
    race: "asian",
    height: 165, // cm
    bodyType: "slim",
  },
  {
    id: 14,
    name: "Jasmine Williams",
    age: 30,
    location: "Houston, TX",
    bio: "Corporate lawyer by day, salsa dancer by night. Looking for someone who can keep up on and off the dance floor.",
    image: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 91,
    interests: ["Dancing", "Law", "Travel", "Food"],
    topEmotions: ["Confidence", "Joy", "Passion"],
    race: "black",
    height: 173, // cm
    bodyType: "curvy",
  },
  {
    id: 15,
    name: "Samantha Lopez",
    age: 28,
    location: "San Diego, CA",
    bio: "Marine biologist with a passion for ocean conservation. Let's explore tide pools and talk about saving the planet.",
    image: "https://images.unsplash.com/photo-1508184964240-ee96bb9677a7?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 87,
    interests: ["Ocean", "Conservation", "Diving", "Science"],
    topEmotions: ["Curiosity", "Passion", "Serenity"],
    race: "hispanic",
    height: 167, // cm
    bodyType: "athletic",
  },
  {
    id: 16,
    name: "Emma Thompson",
    age: 31,
    location: "Nashville, TN",
    bio: "Country music songwriter and dog lover. Looking for someone to share cozy evenings and creative inspiration.",
    image: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=1880&auto=format&fit=crop",
    emotionScore: 89,
    interests: ["Music", "Songwriting", "Dogs", "Nature"],
    topEmotions: ["Creativity", "Joy", "Contentment"],
    race: "white",
    height: 170, // cm
    bodyType: "average",
  },
  {
    id: 17,
    name: "Leila Washington",
    age: 29,
    location: "Detroit, MI",
    bio: "Automotive engineer and vintage car enthusiast. Let's go for a drive and talk about our dreams.",
    image: "https://images.unsplash.com/photo-1543935637-1e3784e7a0b3?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 86,
    interests: ["Cars", "Engineering", "Vintage", "Travel"],
    topEmotions: ["Passion", "Curiosity", "Determination"],
    race: "black",
    height: 175, // cm
    bodyType: "athletic",
  },
  {
    id: 18,
    name: "Maya Patel",
    age: 27,
    location: "Chicago, IL",
    bio: "Pastry chef with a sweet tooth and a love for baking. Let me make you my special chocolate soufflé.",
    image: "https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?q=80&w=1740&auto=format&fit=crop",
    emotionScore: 92,
    interests: ["Baking", "Food", "Travel", "Art"],
    topEmotions: ["Joy", "Creativity", "Contentment"],
    race: "asian",
    height: 162, // cm
    bodyType: "curvy",
  },
  {
    id: 19,
    name: "Victoria Garcia",
    age: 32,
    location: "Phoenix, AZ",
    bio: "Elementary school teacher who loves making a difference. Looking for someone kind, patient, and fun-loving.",
    image: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 90,
    interests: ["Education", "Children", "Reading", "Travel"],
    topEmotions: ["Compassion", "Joy", "Patience"],
    race: "hispanic",
    height: 168, // cm
    bodyType: "average",
  },
  {
    id: 20,
    name: "Olivia Bennett",
    age: 26,
    location: "Portland, OR",
    bio: "Plus-size model and body positivity advocate. Looking for someone who celebrates authenticity and self-love.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 94,
    interests: ["Fashion", "Modeling", "Activism", "Self-care"],
    topEmotions: ["Confidence", "Joy", "Compassion"],
    race: "white",
    height: 180, // cm
    bodyType: "plus-size",
  },
  // Adding profiles for mixed race
  {
    id: 21,
    name: "Alisha Rodriguez",
    age: 27,
    location: "San Francisco, CA",
    bio: "Biracial artist exploring cultural identity through my work. Love hiking, photography, and trying new cuisines.",
    image: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 88,
    interests: ["Art", "Culture", "Hiking", "Food"],
    topEmotions: ["Creativity", "Curiosity", "Joy"],
    race: "mixed",
    height: 170, // cm
    bodyType: "slim",
  },
  {
    id: 22,
    name: "Zara Johnson",
    age: 29,
    location: "Washington, DC",
    bio: "Political analyst with mixed heritage. Passionate about social justice, travel, and discovering new music.",
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 91,
    interests: ["Politics", "Travel", "Music", "Reading"],
    topEmotions: ["Passion", "Determination", "Empathy"],
    race: "mixed",
    height: 173, // cm
    bodyType: "athletic",
  },
  // Adding profiles for other race category
  {
    id: 23,
    name: "Layla Noor",
    age: 28,
    location: "Minneapolis, MN",
    bio: "Middle Eastern writer and poet exploring themes of identity and belonging. Love coffee shops and bookstores.",
    image: "https://images.unsplash.com/photo-1604004555489-723a93d6ce74?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 89,
    interests: ["Writing", "Poetry", "Literature", "Coffee"],
    topEmotions: ["Contemplation", "Creativity", "Serenity"],
    race: "other",
    height: 165, // cm
    bodyType: "average",
  },
  {
    id: 24,
    name: "Amara Okafor",
    age: 30,
    location: "New Orleans, LA",
    bio: "First-generation Nigerian American working in international development. Passionate about cultural exchange and dance.",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1887&auto=format&fit=crop",
    emotionScore: 90,
    interests: ["Culture", "Dance", "Travel", "Languages"],
    topEmotions: ["Joy", "Enthusiasm", "Compassion"],
    race: "other",
    height: 175, // cm
    bodyType: "athletic",
  },
]

interface ProfileCardsProps {
  filters?: {
    race: string
    height: number[]
    bodyType: string
  }
}

export default function ProfileCards({
  filters = { race: "any", height: [150, 200], bodyType: "any" },
}: ProfileCardsProps) {
  const router = useRouter()
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [matchedProfiles, setMatchedProfiles] = useState<number[]>([])
  const [removedProfiles, setRemovedProfiles] = useState<number[]>([])
  const [showMatchAnimation, setShowMatchAnimation] = useState(false)

  // Initialize from localStorage on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMatched = localStorage.getItem("matchedProfiles")
      const storedRemoved = localStorage.getItem("removedProfiles")

      if (storedMatched) {
        try {
          setMatchedProfiles(JSON.parse(storedMatched))
        } catch (e) {
          console.error("Failed to parse matched profiles from localStorage")
        }
      }

      if (storedRemoved) {
        try {
          setRemovedProfiles(JSON.parse(storedRemoved))
        } catch (e) {
          console.error("Failed to parse removed profiles from localStorage")
        }
      }
    }
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("matchedProfiles", JSON.stringify(matchedProfiles))
      localStorage.setItem("removedProfiles", JSON.stringify(removedProfiles))
    }
  }, [matchedProfiles, removedProfiles])

  // Reset current profile index when filters change
  useEffect(() => {
    setCurrentProfileIndex(0)
  }, [filters])

  // Filter profiles based on selected filters
  const filteredProfiles = mockProfiles.filter((profile) => {
    // Filter by race if selected
    if (filters.race && filters.race !== "any" && profile.race !== filters.race) {
      return false
    }

    // Filter by height range
    if (profile.height < filters.height[0] || profile.height > filters.height[1]) {
      return false
    }

    // Filter by body type if selected
    if (filters.bodyType && filters.bodyType !== "any" && profile.bodyType !== filters.bodyType) {
      return false
    }

    return true
  })

  // Get current profile from filtered list
  const currentProfile = filteredProfiles[currentProfileIndex]

  // Check if we've reached the end of profiles
  const isLastProfile = currentProfileIndex === filteredProfiles.length - 1

  // Handle like/match
  const handleLike = () => {
    if (!currentProfile) return

    const profileId = currentProfile.id

    // Add to matched profiles
    setMatchedProfiles((prev) => [...prev, profileId])

    // Show match animation
    setShowMatchAnimation(true)

    // Hide animation after 1.5 seconds
    setTimeout(() => {
      setShowMatchAnimation(false)

      // Move to next profile if available
      if (!isLastProfile) {
        setCurrentProfileIndex((prev) => prev + 1)
      }
    }, 1500)

    // Update match count in localStorage for the badge
    const currentCount = Number.parseInt(localStorage.getItem("matchCount") || "0")
    localStorage.setItem("matchCount", (currentCount + 1).toString())

    // Dispatch a custom event to notify other components about the match count change
    window.dispatchEvent(new CustomEvent("matchCountUpdated"))
  }

  // Handle skip/remove
  const handleSkip = () => {
    if (!currentProfile) return

    const profileId = currentProfile.id

    // Add to removed profiles
    setRemovedProfiles((prev) => [...prev, profileId])

    // Move to next profile if available
    if (!isLastProfile) {
      setCurrentProfileIndex((prev) => prev + 1)
    }
  }

  // Handle message
  const handleMessage = () => {
    if (!currentProfile) return
    router.push(`/chat/${currentProfile.id}`)
  }

  // If no profiles match the filters
  if (filteredProfiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center p-4">
        <h2 className="text-2xl font-bold mb-4">No matches found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your filters to see more profiles.</p>
      </div>
    )
  }

  // If no current profile (e.g., during initial load)
  if (!currentProfile) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p>Loading profiles...</p>
      </div>
    )
  }

  // If we've gone through all profiles
  if (isLastProfile && (matchedProfiles.includes(currentProfile.id) || removedProfiles.includes(currentProfile.id))) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center p-4">
        <h2 className="text-2xl font-bold mb-4">You've viewed all profiles</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Check back later for new matches or explore your existing connections.
        </p>
        <Button onClick={() => router.push("/dashboard/matches")} className="bg-purple-600 hover:bg-purple-700">
          View Your Matches ({matchedProfiles.length})
        </Button>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Match animation overlay */}
      {showMatchAnimation && (
        <div className="absolute inset-0 bg-black/70 z-20 flex items-center justify-center rounded-xl animate-fade-in">
          <div className="text-center">
            <Heart className="w-20 h-20 text-red-500 mx-auto animate-pulse" fill="#ef4444" />
            <h2 className="text-white text-2xl font-bold mt-4">It's a Match!</h2>
            <p className="text-white/80 mt-2">You and {currentProfile.name} liked each other</p>
          </div>
        </div>
      )}

      <Card className="overflow-hidden">
        <div className="relative">
          <img
            src={currentProfile.image || "/placeholder.svg"}
            alt={currentProfile.name}
            className="w-full h-[400px] object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <h2 className="text-2xl font-bold">
              {currentProfile.name}, {currentProfile.age}
            </h2>
            <p className="text-sm opacity-90">{currentProfile.location}</p>

            <div className="flex items-center mt-2">
              <div className="bg-purple-500/90 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <span className="font-medium">{currentProfile.emotionScore}%</span>
                <span className="ml-1">Match</span>
              </div>
              <div className="ml-2 text-xs">Top emotions: {currentProfile.topEmotions.join(", ")}</div>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{currentProfile.bio}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {currentProfile.interests.map((interest) => (
              <span
                key={interest}
                className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Race:</span>
              <p className="capitalize">{currentProfile.race}</p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Height:</span>
              <p>{currentProfile.height} cm</p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Body Type:</span>
              <p className="capitalize">{currentProfile.bodyType}</p>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-gray-300"
              onClick={handleSkip}
            >
              <X className="h-6 w-6 text-gray-500" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-purple-500"
              onClick={handleMessage}
            >
              <MessageCircle className="h-6 w-6 text-purple-500" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-red-500"
              onClick={handleLike}
            >
              <Heart
                className="h-6 w-6 text-red-500"
                fill={matchedProfiles.includes(currentProfile.id) ? "#ef4444" : "none"}
              />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

