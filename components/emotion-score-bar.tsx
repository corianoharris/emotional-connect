interface EmotionScoreBarProps {
  name: string
  value: number
}

export default function EmotionScoreBar({ name, value }: EmotionScoreBarProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span>{value.toFixed(2)}</span>
      </div>
      <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-purple-500" style={{ width: `${value * 100}%` }} />
      </div>
    </div>
  )
}

