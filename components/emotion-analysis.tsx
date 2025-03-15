"use client"

import { useState, useEffect } from "react"

// Mock emotion data for demonstration
const mockEmotionData = {
  currentEmotions: {
    joy: 65,
    interest: 80,
    surprise: 30,
    sadness: 10,
    anger: 5,
    fear: 8,
  },
  emotionTrend: [
    { time: "10:30", joy: 50, interest: 60 },
    { time: "10:35", joy: 55, interest: 70 },
    { time: "10:40", joy: 60, interest: 75 },
    { time: "10:45", joy: 65, interest: 80 },
  ],
  insights: [
    "Sarah seems genuinely interested in your conversation",
    "Her joy levels have been increasing throughout your chat",
    "She responds most positively when discussing travel",
  ],
  suggestions: [
    "Ask more about her travel experiences",
    "Share your own outdoor adventures",
    "Consider suggesting a video call to deepen the connection",
  ],
}

export default function EmotionAnalysis() {
  const [data, setData] = useState(mockEmotionData)
  const [analyzing, setAnalyzing] = useState(true)

  // Simulate real-time analysis
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyzing(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      {analyzing ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Analyzing emotions...</p>
        </div>
      ) : (
        <>
          <div>
            <h4 className="text-sm font-medium mb-2">Current Emotions</h4>
            <div className="space-y-2">
              {Object.entries(data.currentEmotions)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .slice(0, 3)
                .map(([emotion, value]) => (
                  <div key={emotion}>
                    <div className="flex justify-between items-center text-xs">
                      <span className="capitalize">{emotion}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="mt-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Insights</h4>
            <ul className="space-y-2 text-xs">
              {data.insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 mr-2"></span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Suggestions</h4>
            <ul className="space-y-2 text-xs">
              {data.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              Powered by Hume AI emotion detection technology
            </p>
          </div>
        </>
      )}
    </div>
  )
}

