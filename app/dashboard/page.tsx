"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import EmotionChart from "@/components/emotion-chart"
import HumeDashboardIntegration from "@/components/hume-dashboard-integration"
import { CardDescription } from "@/components/ui/card"
import ProfileCards from "@/components/profile-cards"
import MatchCheckInPopup from "@/components/match-check-in-popup"

// Mock data for a random match to check in about
const randomMatch = {
  id: 2,
  name: "Emily Davis",
  age: 31,
  location: "Los Angeles, CA",
  image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1887&auto=format&fit=crop",
  interests: ["Yoga", "Plants", "Meditation", "Cooking"],
  bio: "Yoga instructor and plant mom. Seeking genuine connections with like-minded souls.",
}

// Mock data for demonstration
const mockEmotionData = {
  joy: 0.72,
  sadness: 0.12,
  anger: 0.05,
  fear: 0.08,
  surprise: 0.45,
  disgust: 0.03,
  contempt: 0.02,
  interest: 0.68,
  amusement: 0.58,
  pride: 0.42,
  embarrassment: 0.15,
  regret: 0.08,
  guilt: 0.04,
  shame: 0.03,
  relief: 0.38,
  contentment: 0.65,
}

const mockTimeSeriesData = [
  { time: "10:00", joy: 0.65, interest: 0.6, contentment: 0.55 },
  { time: "10:15", joy: 0.68, interest: 0.62, contentment: 0.58 },
  { time: "10:30", joy: 0.7, interest: 0.65, contentment: 0.6 },
  { time: "10:45", joy: 0.72, interest: 0.68, contentment: 0.62 },
  { time: "11:00", joy: 0.75, interest: 0.7, contentment: 0.65 },
  { time: "11:15", joy: 0.73, interest: 0.72, contentment: 0.68 },
  { time: "11:30", joy: 0.72, interest: 0.68, contentment: 0.65 },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("discover")
  const [mounted, setMounted] = useState(false)
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [filters, setFilters] = useState({
    race: "any",
    height: [150, 200], // cm
    bodyType: "any",
  })

  useEffect(() => {
    setMounted(true)

    // Randomly show the check-in popup after a delay
    // Only show the popup 20% of the time to avoid annoying the user
    const shouldShow = Math.random() < 0.2

    if (shouldShow) {
      const timer = setTimeout(() => {
        setShowCheckIn(true)
      }, 8000) // Show after 8 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  const handleRaceChange = (value: string) => {
    setFilters((prev) => ({ ...prev, race: value }))
  }

  const handleHeightChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, height: value }))
  }

  const handleBodyTypeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, bodyType: value }))
  }

  if (!mounted) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Welcome to EmotionConnect</h1>
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome to EmotionConnect</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Discover meaningful connections based on emotional compatibility
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="race-filter" className="mb-2 block">
                    Race/Ethnicity
                  </Label>
                  <Select value={filters.race} onValueChange={handleRaceChange}>
                    <SelectTrigger id="race-filter">
                      <SelectValue placeholder="Any race/ethnicity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any race/ethnicity</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="hispanic">Hispanic</SelectItem>
                      <SelectItem value="white">White</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">Height Range</Label>
                  <div className="pt-6 px-2">
                    <Slider
                      defaultValue={filters.height}
                      min={150}
                      max={200}
                      step={1}
                      onValueChange={handleHeightChange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>{filters.height[0]} cm</span>
                      <span>{filters.height[1]} cm</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="body-type-filter" className="mb-2 block">
                    Body Type
                  </Label>
                  <Select value={filters.bodyType} onValueChange={handleBodyTypeChange}>
                    <SelectTrigger id="body-type-filter">
                      <SelectValue placeholder="Any body type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any body type</SelectItem>
                      <SelectItem value="slim">Slim</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="athletic">Athletic</SelectItem>
                      <SelectItem value="curvy">Curvy</SelectItem>
                      <SelectItem value="plus-size">Plus Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Discover Women</CardTitle>
                  <CardDescription>Find women who match your emotional profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileCards filters={filters} />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Your Emotion Profile</CardTitle>
                  <CardDescription>Based on your interactions and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <EmotionChart emotionData={mockEmotionData} timeSeriesData={mockTimeSeriesData} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <HumeDashboardIntegration />
        </TabsContent>
      </Tabs>

      {/* Random check-in popup */}
      {showCheckIn && <MatchCheckInPopup match={randomMatch} onClose={() => setShowCheckIn(false)} />}
    </div>
  )
}

