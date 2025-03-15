"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

interface EmotionChartProps {
  emotionData?: Record<string, number>
  timeSeriesData?: Array<Record<string, number | string>>
}

export default function EmotionChart({
  emotionData = mockEmotionData,
  timeSeriesData = mockTimeSeriesData,
}: EmotionChartProps) {
  const [activeTab, setActiveTab] = useState("radar")

  // Ensure we have data to work with
  const safeEmotionData = emotionData || {}
  const safeTimeSeriesData = timeSeriesData || []

  // Get top emotions
  const topEmotions = Object.entries(safeEmotionData)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 5)

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="radar">Radar</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="radar" className="pt-4">
          <div className="aspect-square relative">
            {/* Radar Chart Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full max-w-[200px] max-h-[200px] relative">
                {/* Radar Background Circles */}
                <div className="absolute inset-0 rounded-full border border-gray-200 dark:border-gray-700 opacity-20"></div>
                <div className="absolute inset-[15%] rounded-full border border-gray-200 dark:border-gray-700 opacity-40"></div>
                <div className="absolute inset-[30%] rounded-full border border-gray-200 dark:border-gray-700 opacity-60"></div>
                <div className="absolute inset-[45%] rounded-full border border-gray-200 dark:border-gray-700 opacity-80"></div>
                <div className="absolute inset-[60%] rounded-full border border-gray-200 dark:border-gray-700"></div>

                {/* Radar Chart Points */}
                {topEmotions.map(([emotion, value], index) => {
                  const angle = (index / topEmotions.length) * Math.PI * 2 - Math.PI / 2
                  const distance = (value as number) * 0.9 // Scale to fit within chart
                  const x = 50 + Math.cos(angle) * distance * 50
                  const y = 50 + Math.sin(angle) * distance * 50

                  return (
                    <div
                      key={emotion}
                      className="absolute"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div
                        className="absolute whitespace-nowrap text-xs font-medium"
                        style={{
                          left: `${Math.cos(angle) * 15}px`,
                          top: `${Math.sin(angle) * 15}px`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {emotion}
                      </div>
                    </div>
                  )
                })}

                {/* Connect the points */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <polygon
                    points={topEmotions
                      .map(([emotion, value], index) => {
                        const angle = (index / topEmotions.length) * Math.PI * 2 - Math.PI / 2
                        const distance = (value as number) * 0.9 // Scale to fit within chart
                        const x = 50 + Math.cos(angle) * distance * 50
                        const y = 50 + Math.sin(angle) * distance * 50
                        return `${x},${y}`
                      })
                      .join(" ")}
                    fill="rgba(59, 130, 246, 0.2)"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {topEmotions.map(([emotion, value]) => (
              <div key={emotion} className="flex items-center justify-between">
                <span className="text-sm capitalize">{emotion}</span>
                <div className="flex-1 mx-2">
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${(value as number) * 100}%` }}></div>
                  </div>
                </div>
                <span className="text-sm font-medium">{Math.round((value as number) * 100)}%</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="pt-4">
          {safeTimeSeriesData.length > 0 ? (
            <div className="h-60 relative mb-10">
              {" "}
              {/* Added bottom margin for time labels */}
              {/* Chart container with proper structure to contain all elements */}
              <div className="absolute inset-0 flex">
                {/* Y-axis labels - compact */}
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
                    <line x1="0" y1="25" x2="100" y2="25" stroke="#e5e7eb" strokeWidth="0.5" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#e5e7eb" strokeWidth="0.5" />
                    <line x1="0" y1="75" x2="100" y2="75" stroke="#e5e7eb" strokeWidth="0.5" />

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

                  {/* X-axis time labels - 45 degree angle */}
                  <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between">
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
            </div>
          ) : (
            <div className="h-60 flex items-center justify-center">
              <p className="text-gray-500">No timeline data available</p>
            </div>
          )}

          <div className="mt-4 flex justify-center space-x-4">
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

