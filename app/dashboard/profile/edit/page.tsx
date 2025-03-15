"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, Save } from "lucide-react"

// Mock profile data (in a real app, this would come from an API or context)
const mockProfile = {
  name: "John Doe",
  age: "32",
  gender: "male",
  lookingFor: "women",
  location: "New York, NY",
  race: "white",
  height: "180",
  bodyType: "average",
  bio: "Software engineer who loves hiking, photography, and trying new restaurants. Looking for someone to share adventures with.",
  interests: "Hiking, Photography, Cooking, Travel, Reading",
  profileImage: null,
}

interface FormData {
  name: string
  age: string
  gender: string
  lookingFor: string
  location: string
  race: string
  height: string
  bodyType: string
  bio: string
  interests: string
  profileImage: File | null
}

export default function EditProfilePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    gender: "",
    lookingFor: "",
    location: "",
    race: "",
    height: "",
    bodyType: "",
    bio: "",
    interests: "",
    profileImage: null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Initialize form data from mock profile
  useEffect(() => {
    setFormData(mockProfile)
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData((prev) => ({ ...prev, profileImage: file }))

      // Create a preview of the selected image
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your backend
    console.log("Profile updated:", formData)
    router.push("/dashboard/profile")
  }

  const handleCancel = () => {
    router.push("/dashboard/profile")
  }

  if (!mounted) {
    return <div className="container mx-auto p-4 md:p-6">Loading...</div>
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">Update your personal information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min="18"
                  max="120"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lookingFor">Looking For</Label>
                <Select value={formData.lookingFor} onValueChange={(value) => handleSelectChange("lookingFor", value)}>
                  <SelectTrigger id="lookingFor">
                    <SelectValue placeholder="Select what you're looking for" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="everyone">Everyone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Physical Attributes Card */}
          <Card>
            <CardHeader>
              <CardTitle>Physical Attributes</CardTitle>
              <CardDescription>Your physical characteristics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="race">Race/Ethnicity</Label>
                <Select value={formData.race} onValueChange={(value) => handleSelectChange("race", value)}>
                  <SelectTrigger id="race">
                    <SelectValue placeholder="Select your race/ethnicity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asian">Asian</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="hispanic">Hispanic</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Enter your height in cm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyType">Body Type</Label>
                <Select value={formData.bodyType} onValueChange={(value) => handleSelectChange("bodyType", value)}>
                  <SelectTrigger id="bodyType">
                    <SelectValue placeholder="Select your body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slim">Slim</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="athletic">Athletic</SelectItem>
                    <SelectItem value="curvy">Curvy</SelectItem>
                    <SelectItem value="plus-size">Plus Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Picture</Label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    {imagePreview ? (
                      <div className="relative w-32 h-32 mb-4">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Profile preview"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                        <Upload className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    )}

                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Drag and drop your photo here, or click to browse
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">JPG, PNG or GIF, max 5MB</p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Select File
                    </Button>

                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About You Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>About You</CardTitle>
              <CardDescription>Tell others about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Textarea
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="What are your hobbies and interests? (Comma separated)"
                  rows={4}
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Separate your interests with commas (e.g., Hiking, Photography, Cooking)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={handleCancel}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

