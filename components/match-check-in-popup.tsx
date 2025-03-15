"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface MatchCheckInPopupProps {
  match: {
    id: number
    name: string
    age: number
    location: string
    image: string
    interests: string[]
    bio: string
  }
  onClose: () => void
}

export default function MatchCheckInPopup({ match, onClose }: MatchCheckInPopupProps) {
  const [progress, setProgress] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleSubmit = () => {
    setShowFeedback(true)

    // In a real app, you would send this data to your backend
    console.log(`Progress with ${match.name}: ${progress}`)

    // Close the popup after 5 seconds of showing feedback
    setTimeout(() => {
      onClose()
    }, 5000)
  }

  // Generate a personalized encouragement based on match info
  const getEncouragement = () => {
    if (!progress || progress === "none") {
      const randomInterest = match.interests[Math.floor(Math.random() * match.interests.length)]
      return `${match.name} seems really interesting! Why not start a conversation about ${randomInterest.toLowerCase()}? Based on her profile, she might appreciate that topic!`
    } else if (progress === "texted") {
      return `That's great! Your conversation with ${match.name} is off to a good start. Maybe suggest a video call to deepen your connection?`
    } else if (progress === "called") {
      return `Wonderful! Video calls are a great way to build connection. ${match.name} is from ${match.location} - maybe suggest meeting for coffee if you're nearby?`
    } else if (progress === "met") {
      return `Amazing! We're so excited for you and ${match.name}! How did your in-person meeting go? Remember to keep the momentum going!`
    }

    return `Keep the connection with ${match.name} growing!`
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>

        <CardHeader>
          <CardTitle className="text-xl text-center">
            {showFeedback ? "Thanks for sharing!" : "How's it going with your match?"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={match.image || "/placeholder.svg"}
              alt={match.name}
              className="w-16 h-16 rounded-full object-cover"
              crossOrigin="anonymous"
            />
            <div>
              <h3 className="font-medium">
                {match.name}, {match.age}
              </h3>
              <p className="text-sm text-gray-500">{match.location}</p>
            </div>
          </div>

          {!showFeedback ? (
            <RadioGroup value={progress || ""} onValueChange={setProgress}>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none">We haven't connected yet</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="texted" id="texted" />
                <Label htmlFor="texted">We've texted</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="called" id="called" />
                <Label htmlFor="called">We've had a video/phone call</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="met" id="met" />
                <Label htmlFor="met">We've met in person</Label>
              </div>
            </RadioGroup>
          ) : (
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm">{getEncouragement()}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end">
          {!showFeedback ? (
            <Button onClick={handleSubmit} disabled={!progress} className="bg-purple-600 hover:bg-purple-700">
              Submit
            </Button>
          ) : (
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

