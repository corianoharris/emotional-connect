import { Heart } from "lucide-react"

interface EmotionMatchScoreProps {
  score: number
  emotion: string
}

export default function EmotionMatchScore({ score, emotion }: EmotionMatchScoreProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Heart className="h-4 w-4 text-pink-500 mr-1" />
          <span className="text-sm font-medium">Emotion Match</span>
        </div>
        <span className="text-sm font-bold">{score}%</span>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Dominant emotion: <span className="font-medium">{emotion}</span>
      </p>
    </div>
  )
}

