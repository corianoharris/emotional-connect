"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Loader2 } from "lucide-react"

interface HumeVoiceAnalyzerProps {
  onEmotionsDetected: (emotions: Record<string, number>) => void
  isActive?: boolean
}

export default function HumeVoiceAnalyzer({ onEmotionsDetected, isActive = true }: HumeVoiceAnalyzerProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Start recording
  const startRecording = async () => {
    try {
      audioChunksRef.current = []

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        analyzeAudio(audioBlob)
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)
      setError(null)

      // Start timer
      setRecordingTime(0)
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      setError("Could not access microphone. Please check permissions.")
      console.error("Error accessing microphone:", err)
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()

      // Stop all tracks in the stream
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      }

      setIsRecording(false)

      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  // Analyze audio with Hume API
  const analyzeAudio = async (audioBlob: Blob) => {
    try {
      setIsAnalyzing(true)

      const apiKey = process.env.NEXT_PUBLIC_HUME_API_KEY

      if (!apiKey) {
        setError("Hume API key not found")
        setIsAnalyzing(false)
        return
      }

      // Create a FormData object to send the audio file
      const formData = new FormData()
      formData.append("file", audioBlob, "voice.wav")
      formData.append("models", JSON.stringify(["prosody"]))

      // Send the audio to Hume API
      const response = await fetch("https://api.hume.ai/v0/batch/jobs", {
        method: "POST",
        headers: {
          "X-Hume-Api-Key": apiKey,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      const jobId = data.job_id

      // Poll for results
      await pollForResults(jobId, apiKey)
    } catch (err) {
      setError("Error analyzing with Hume API")
      console.error("Hume API error:", err)
      setIsAnalyzing(false)
    }
  }

  // Poll for results
  const pollForResults = async (jobId: string, apiKey: string) => {
    try {
      let complete = false
      let attempts = 0
      const maxAttempts = 10

      while (!complete && attempts < maxAttempts) {
        attempts++

        // Wait before polling
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const response = await fetch(`https://api.hume.ai/v0/batch/jobs/${jobId}`, {
          headers: {
            "X-Hume-Api-Key": apiKey,
          },
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()

        if (data.state === "completed") {
          complete = true

          // Get results
          const resultsResponse = await fetch(`https://api.hume.ai/v0/batch/jobs/${jobId}/results`, {
            headers: {
              "X-Hume-Api-Key": apiKey,
            },
          })

          if (!resultsResponse.ok) {
            throw new Error(`API error: ${resultsResponse.status}`)
          }

          const resultsData = await resultsResponse.json()

          // Process emotions from results
          if (
            resultsData &&
            resultsData.results &&
            resultsData.results.length > 0 &&
            resultsData.results[0].predictions &&
            resultsData.results[0].predictions.length > 0 &&
            resultsData.results[0].predictions[0].emotions
          ) {
            const emotionResults = resultsData.results[0].predictions[0].emotions
            const emotions: Record<string, number> = {}

            // Convert array of emotion objects to a simple key-value object
            emotionResults.forEach((emotion: { name: string; score: number }) => {
              emotions[emotion.name.toLowerCase()] = emotion.score
            })

            // Pass emotions to parent component
            onEmotionsDetected(emotions)
          } else {
            // If no emotions were detected, create some mock data
            // In a real app, you would handle this differently
            const mockEmotions = {
              joy: 0.7,
              interest: 0.8,
              curiosity: 0.6,
            }
            onEmotionsDetected(mockEmotions)
            console.log("No emotions detected in the audio, using mock data")
          }
        }
      }

      if (!complete) {
        setError("Analysis timed out")

        // Provide mock data as fallback
        const mockEmotions = {
          joy: 0.7,
          interest: 0.8,
          curiosity: 0.6,
        }
        onEmotionsDetected(mockEmotions)
      }
    } catch (err) {
      setError("Error getting results from Hume API")
      console.error("Hume API polling error:", err)

      // Provide mock data as fallback
      const mockEmotions = {
        joy: 0.7,
        interest: 0.8,
        curiosity: 0.6,
      }
      onEmotionsDetected(mockEmotions)
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Toggle recording
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording()
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRecording])

  // If component is not active, don't render controls
  if (!isActive) {
    return null
  }

  return (
    <div className="flex flex-col items-center">
      <Button
        variant={isRecording ? "destructive" : "default"}
        size="sm"
        onClick={toggleRecording}
        disabled={isAnalyzing}
        className="relative"
      >
        {isRecording ? (
          <>
            <MicOff className="h-4 w-4 mr-2" />
            Stop ({recordingTime}s)
          </>
        ) : (
          <>
            <Mic className="h-4 w-4 mr-2" />
            {isAnalyzing ? "Analyzing..." : "Start Voice Analysis"}
          </>
        )}

        {isAnalyzing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </Button>

      {error && <p className="text-xs text-red-500 mt-1">Error: {error}</p>}

      {isAnalyzing && <div className="mt-2 text-xs text-center text-gray-500">Analyzing your voice...</div>}
    </div>
  )
}

