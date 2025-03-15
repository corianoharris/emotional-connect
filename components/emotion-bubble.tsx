"use client"

interface EmotionBubbleProps {
  emotions: Record<string, number>
}

export default function EmotionBubble({ emotions = {} }: EmotionBubbleProps) {
  // Ensure we have data to work with
  const safeEmotions = emotions || {}

  // Get top emotion
  const topEmotion = Object.entries(safeEmotions)
    .sort(([, a], [, b]) => b - a)
    .shift()

  if (!topEmotion) {
    return null
  }

  const [emotion, value] = topEmotion

  // Color mapping based on emotion
  const getEmotionColor = (emotion: string) => {
    const emotionMap: Record<string, string> = {
      joy: "bg-yellow-500",
      happiness: "bg-yellow-500",
      interest: "bg-purple-500",
      curiosity: "bg-purple-400",
      surprise: "bg-purple-500",
      excitement: "bg-orange-500",
      contentment: "bg-green-500",
      love: "bg-red-500",
      amusement: "bg-pink-500",
      sadness: "bg-purple-700",
      anger: "bg-red-600",
      fear: "bg-gray-700",
      disgust: "bg-green-700",
      contempt: "bg-gray-600",
    }

    return emotionMap[emotion.toLowerCase()] || "bg-purple-500"
  }

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs text-white ${getEmotionColor(emotion)}`}>
      <span className="capitalize">{emotion}</span>
      <span className="ml-1 font-medium">{Math.round(value * 100)}%</span>
    </div>
  )
}

