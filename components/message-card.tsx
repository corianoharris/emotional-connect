interface MessageCardProps {
  sender: "user" | "assistant"
  message: string
  emotions: Array<{
    name: string
    value: number
  }>
}

export default function MessageCard({ sender, message, emotions }: MessageCardProps) {
  return (
    <div className="mb-6">
      <div className="mb-2">
        <div className="font-medium mb-1">{sender === "user" ? "User" : "Assistant"}</div>
        <div className="text-lg">{message}</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {emotions.slice(0, 3).map((emotion) => (
          <div key={emotion.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{emotion.name}</span>
              <span>{emotion.value.toFixed(2)}</span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500" style={{ width: `${emotion.value * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

