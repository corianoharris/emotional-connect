"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HumeFacialAnalyzer from "@/components/hume-facial-analyzer"
import EmotionRadarChart from "@/components/emotion-radar-chart"
import EmotionScoreCard from "@/components/emotion-score-card"

export default function HumeDashboardIntegration() {
  const [detectedEmotions, setDetectedEmotions] = useState<Record<string, number> | null>(null)
  const [activeTab, setActiveTab] = useState("capture")

  const handleEmotionsDetected = (emotions: Record<string, number>) => {
    setDetectedEmotions(emotions)
    setActiveTab("results")
  }

  // Get top emotions
  const getTopEmotions = () => {
    if (!detectedEmotions) return []

    return Object.entries(detectedEmotions)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
  }

  const topEmotions = getTopEmotions()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hume AI Emotion Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="capture" className="flex-1">
              Capture
            </TabsTrigger>
            <TabsTrigger value="results" className="flex-1" disabled={!detectedEmotions}>
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="capture">
            <HumeFacialAnalyzer onEmotionsDetected={handleEmotionsDetected} />
          </TabsContent>

          <TabsContent value="results">
            {detectedEmotions ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topEmotions.map(([emotion, score], index) => (
                    <EmotionScoreCard
                      key={emotion}
                      title={emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                      score={score}
                      description={`${index === 0 ? "Primary" : index === 1 ? "Secondary" : "Tertiary"} emotion`}
                      trend="up"
                      color={index === 0 ? "blue" : index === 1 ? "green" : "purple"}
                    />
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Emotion Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <EmotionRadarChart data={detectedEmotions} />
                    </div>
                  </CardContent>
                </Card>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Hume AI Analysis</h3>
                  <p className="text-sm">
                    This analysis is powered by Hume AI's emotion recognition technology. The radar chart shows the
                    distribution of detected emotions in your facial expressions. The top emotions detected are
                    {topEmotions.map(([emotion, score], index) => (
                      <span key={emotion}>
                        {index === 0 ? " " : index === topEmotions.length - 1 ? " and " : ", "}
                        <strong>{emotion}</strong> ({Math.round(score * 100)}%)
                      </span>
                    ))}
                    .
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No emotion data available. Please capture an image first.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

