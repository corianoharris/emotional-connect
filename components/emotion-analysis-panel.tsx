"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for demonstration
const mockEmotionData = {
  joy: 0.85,
  interest: 0.78,
  surprise: 0.45,
  contentment: 0.72,
  amusement: 0.65,
  curiosity: 0.68,
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

const mockInsights = [
  "Sarah shows high levels of joy and interest in the conversation.",
  "There's a strong emotional connection when discussing travel and outdoor activities.",
  "Consider sharing more about your hiking experiences to build rapport.",
]

interface EmotionAnalysisPanelProps {
  contactName: string
  emotionData?: Record<string, number>
  timeSeriesData?: Array<Record<string, number | string>>
  insights?: string[]
}

export default function EmotionAnalysisPanel({
  contactName,
  emotionData = mockEmotionData,
  timeSeriesData = mockTimeSeriesData,
  insights = mockInsights,
}: EmotionAnalysisPanelProps) {
  const [activeTab, setActiveTab] = useState("emotions")

  // Ensure we have data to work with
  const safeEmotionData = emotionData || {}
  const safeTimeSeriesData = timeSeriesData || []
  const safeInsights = insights || []

  // Get top emotions
  const topEmotions = Object.entries(safeEmotionData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="font-medium">Emotion Analysis</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{contactName}'s emotional responses</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="px-4 pt-2 justify-start border-b dark:border-gray-700 rounded-none">
          <TabsTrigger value="emotions">Emotions</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="emotions" className="p-4 h-full">
            <div className="space-y-4">
              {topEmotions.length > 0 ? (
                topEmotions.map(([emotion, value]) => (
                  <div key={emotion}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium capitalize">{emotion}</span>
                      <span className="text-sm">{Math.round(value * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${value * 100}%` }}></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No emotion data available</p>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">What This Means</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {contactName} is showing high levels of {topEmotions.length > 0 ? topEmotions[0][0] : "interest"} in
                  your conversation. This indicates a positive emotional connection and engagement.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="p-4 h-full">
            <div className="">
              <h3 className="text-sm font-medium">Emotion Trends</h3>

              {safeTimeSeriesData.length > 0 ? (
                <div className="h-40 relative mt-4 mb-24">
                  <div className="absolute inset-0 flex">
                    {/* Y-axis labels */}
                    <div className="flex flex-col justify-between text-[10px] text-gray-500 pr-1 py-1">
                      <div>100%</div>
                      <div>75%</div>
                      <div>50%</div>
                      <div>25%</div>
                      <div>0%</div>
                    </div>

                    {/* Chart area */}
                    <div className="flex-1 relative">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Background grid lines */}
                        <line x1="0" y1="0" x2="100" y2="0" stroke="#e5e7eb" strokeWidth="0.5" />
                        <line x1="0" y1="25" x2="100" y2="25" stroke="#e5e7eb" strokeWidth="0.5" />
                        <line x1="0" y1="50" x2="100" y2="50" stroke="#e5e7eb" strokeWidth="0.5" />
                        <line x1="0" y1="75" x2="100" y2="75" stroke="#e5e7eb" strokeWidth="0.5" />
                        <line x1="0" y1="100" x2="100" y2="100" stroke="#e5e7eb" strokeWidth="0.5" />

                        {/* Joy line */}
                        <polyline
                          points={safeTimeSeriesData
                            .map(
                              (point, i) =>
                                `${(i / (safeTimeSeriesData.length - 1)) * 100},${100 - ((point.joy as number) || 0) * 100}`,
                            )
                            .join(" ")}
                          fill="none"
                          stroke="rgb(59, 130, 246)"
                          strokeWidth="2"
                        />

                        {/* Interest line */}
                        <polyline
                          points={safeTimeSeriesData
                            .map(
                              (point, i) =>
                                `${(i / (safeTimeSeriesData.length - 1)) * 100},${100 - ((point.interest as number) || 0) * 100}`,
                            )
                            .join(" ")}
                          fill="none"
                          stroke="rgb(16, 185, 129)"
                          strokeWidth="2"
                        />

                        {/* Contentment line */}
                        <polyline
                          points={safeTimeSeriesData
                            .map(
                              (point, i) =>
                                `${(i / (safeTimeSeriesData.length - 1)) * 100},${100 - ((point.contentment as number) || 0) * 100}`,
                            )
                            .join(" ")}
                          fill="none"
                          stroke="rgb(139, 92, 246)"
                          strokeWidth="2"
                        />
                      </svg>

                      {/* X-axis time labels */}
                      <div className="absolute bottom-[-20px] left-0 right-0 flex justify-between">
                        {safeTimeSeriesData.map((point, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className="h-2 w-px bg-gray-200 dark:bg-gray-700"></div>
                            <div
                              className="text-[10px] text-gray-500 mt-1 origin-top-left"
                              style={{ transform: "rotate(45deg)", transformOrigin: "left top" }}
                            >
                              {point.time as string}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-[-60px] left-0 right-0">
                    <div className="flex justify-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                        <span className="text-xs">Joy</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-xs">Interest</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                        <span className="text-xs">Contentment</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No trend data available</p>
                </div>
              )}

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Trend Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {contactName}'s emotional engagement has been{" "}
                  {safeTimeSeriesData.length > 0 ? "increasing" : "steady"} throughout your conversation, particularly
                  when discussing shared interests.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="p-4 h-full">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Conversation Insights</h3>

              {safeInsights.length > 0 ? (
                <ul className="space-y-3 mt-2">
                  {safeInsights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{insight}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No insights available</p>
                </div>
              )}

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Suggested Topics</h3>
                <ul className="space-y-1">
                  <li className="text-sm text-blue-600 dark:text-blue-400">• Travel experiences</li>
                  <li className="text-sm text-blue-600 dark:text-blue-400">• Outdoor activities</li>
                  <li className="text-sm text-blue-600 dark:text-blue-400">• Favorite hiking spots</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

