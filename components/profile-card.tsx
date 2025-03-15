import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface Profile {
  id: number
  name: string
  age: number
  location: string
  bio: string
  image: string
}

interface ProfileCardProps {
  profile: Profile
  children?: React.ReactNode
}

export default function ProfileCard({ profile, children }: ProfileCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img src={profile.image || "/placeholder.svg"} alt={profile.name} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">
              {profile.name}, {profile.age}
            </h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{profile.location}</p>
          <p className="text-sm line-clamp-3">{profile.bio}</p>
          {children}
        </div>
      </CardContent>
    </Card>
  )
}

