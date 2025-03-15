"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, X, Loader2 } from "lucide-react"

interface HumeFacialAnalyzerProps {
  onEmotionsDetected: (emotions: Record<string, number>) => void
}

export default function HumeFacialAnalyzer({ onEmotionsDetected }: HumeFacialAnalyzerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Start video stream
  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCapturing(true)
        setError(null)
      }
    } catch (err) {
      setError("Could not access camera. Please check permissions.")
      console.error("Error accessing camera:", err)
    }
  }

  // Stop video stream
  const stopCapture = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()

      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsCapturing(false)
    }
  }

  // Capture image and analyze
  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert canvas to blob
    try {
      setIsAnalyzing(true)

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob)
            else reject(new Error("Could not create image blob"))
          },
          "image/jpeg",
          0.95,
        )
      })

      // Call Hume API
      await analyzeWithHumeAPI(blob)
    } catch (err) {
      setError("Error capturing or analyzing image")
      console.error("Error:", err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Call Hume API
  const analyzeWithHumeAPI = async (imageBlob: Blob) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_HUME_API_KEY

      if (!apiKey) {
        setError("Hume API key not found")
        return
      }

      const formData = new FormData()
      formData.append("file", imageBlob, "face.jpg")

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
            setError("No emotions detected in the image")
          }
        }
      }

      if (!complete) {
        setError("Analysis timed out")
      }
    } catch (err) {
      setError("Error getting results from Hume API")
      console.error("Hume API polling error:", err)
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCapture()
    }
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md rounded-lg overflow-hidden bg-black">
        {isCapturing ? (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto" />
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm" onClick={stopCapture}>
                <X className="h-4 w-4 mr-1" />
                Close
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={captureAndAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4 mr-1" />
                    Analyze Emotions
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Camera className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
              Capture a photo to analyze your facial expressions and emotions
            </p>
            <Button onClick={startCapture}>
              <Camera className="h-4 w-4 mr-2" />
              Start Camera
            </Button>
          </div>
        )}
      </div>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  )
}

