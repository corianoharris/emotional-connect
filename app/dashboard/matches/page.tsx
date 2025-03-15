"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MatchList from "@/components/match-list"
import ConnectedMatches from "@/components/connected-matches"
import NewMatches from "@/components/new-matches"
import MatchCheckInPopup from "@/components/match-check-in-popup"

// Mock data for a random match to check in about
const randomMatch = {
  id: 1,
  name: "Sarah Johnson",
  age: 28,
  location: "New York, NY",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
  interests: ["Art", "Travel", "Coffee", "Hiking"],
  bio: "Passionate about art, travel, and good coffee. Looking for someone who appreciates the little things in life.",
}

export default function MatchesPage() {
  const [showCheckIn, setShowCheckIn] = useState(false)

  // Randomly show the check-in popup after a delay
  useEffect(() => {
    // Only show the popup 30% of the time to avoid annoying the user
    const shouldShow = Math.random() < 0.3

    if (shouldShow) {
      const timer = setTimeout(() => {
        setShowCheckIn(true)
      }, 5000) // Show after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Your Matches</h1>
        <p className="text-gray-500 dark:text-gray-400">Connect with women who share your emotional wavelength</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Matches</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Matches</CardTitle>
              <CardDescription>Women who match your emotional profile</CardDescription>
            </CardHeader>
            <CardContent>
              <MatchList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connected">
          <Card>
            <CardHeader>
              <CardTitle>Connected Matches</CardTitle>
              <CardDescription>Women you've connected with</CardDescription>
            </CardHeader>
            <CardContent>
              <ConnectedMatches />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>New Matches</CardTitle>
              <CardDescription>Your newest potential connections</CardDescription>
            </CardHeader>
            <CardContent>
              <NewMatches />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Random check-in popup */}
      {showCheckIn && <MatchCheckInPopup match={randomMatch} onClose={() => setShowCheckIn(false)} />}
    </div>
  )
}

