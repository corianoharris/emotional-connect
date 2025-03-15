"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface EmotionScoreCardProps {
  title: string
  score: number
  description?: string
  trend?: "up" | "down" | "neutral"
  color?: "blue" | "green" | "purple" | "red" | "orange"
}

export default function EmotionScoreCard({
  title,
  score,
  description,
  trend = "neutral",
  color = "blue",
}: EmotionScoreCardProps) {
  // Ensure score is a valid number between 0 and 1
  const safeScore = isNaN(score) ? 0 : Math.max(0, Math.min(1, score))

  // Color mapping
  const colorMap = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-700 dark:text-blue-300",
      fill: "bg-blue-500",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-700 dark:text-green-300",
      fill: "bg-green-500",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-700 dark:text-purple-300",
      fill: "bg-purple-500",
    },
    red: {
      bg: "bg-red-50 dark:bg-red-900/20",
      text: "text-red-700 dark:text-red-300",
      fill: "bg-red-500",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-700 dark:text-orange-300",
      fill: "bg-orange-500",
    },
  }

  const selectedColor = colorMap[color] || colorMap.blue

  return (
    <Card className={`${selectedColor.bg} border-0`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`font-medium ${selectedColor.text}`}>{title}</h3>
            {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
          </div>
          <div className="flex items-center">
            {trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
            {trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
            {trend === "neutral" && <Minus className="h-4 w-4 text-gray-500" />}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-2xl font-bold">{Math.round(safeScore * 100)}%</div>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className={`h-full ${selectedColor.fill}`} style={{ width: `${safeScore * 100}%` }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

