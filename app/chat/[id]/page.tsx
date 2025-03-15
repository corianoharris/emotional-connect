"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Mic, Video, Phone, BarChart2 } from "lucide-react"
import EmotionAnalysisPanel from "@/components/emotion-analysis-panel"
import EmotionBubble from "@/components/emotion-bubble"
import HumeVoiceAnalyzer from "@/components/hume-voice-analyzer"
import EmotionScoreBar from "@/components/emotion-score-bar"

// Mock data for demonstration
const mockContact = {
  id: 1,
  name: "Sarah Johnson",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
  online: true,
}

const initialMessages = [
  {
    id: 1,
    sender: "them",
    text: "Hi there! I saw that we matched. I really liked your profile!",
    time: "10:30 AM",
    emotions: [
      { name: "Boredom", value: 0.43 },
      { name: "Calmness", value: 0.36 },
      { name: "Tiredness", value: 0.21 },
    ],
  },
  {
    id: 2,
    sender: "me",
    text: "Hey Sarah! Thanks for reaching out. I was impressed by your travel photos. Where was that mountain view from?",
    time: "10:32 AM",
    emotions: [
      { name: "Satisfaction", value: 0.28 },
      { name: "Contentment", value: 0.28 },
      { name: "Joy", value: 0.22 },
    ],
  },
  {
    id: 3,
    sender: "them",
    text: "That was from my trip to Colorado last summer! I love hiking and being outdoors. Do you enjoy hiking too?",
    time: "10:35 AM",
    emotions: [
      { name: "Excitement", value: 0.21 },
      { name: "Amusement", value: 0.17 },
      { name: "Realization", value: 0.14 },
    ],
  },
]

export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [showEmotionAnalysis, setShowEmotionAnalysis] = useState(true)
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [currentEmotions, setCurrentEmotions] = useState<Record<string, number> | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      emotions: currentEmotions
        ? Object.entries(currentEmotions)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }))
        : [
            { name: "Satisfaction", value: Math.random() * 0.3 + 0.2 },
            { name: "Contentment", value: Math.random() * 0.3 + 0.2 },
            { name: "Joy", value: Math.random() * 0.3 + 0.2 },
          ],
    }

    setMessages([...messages, message])
    setNewMessage("")
    setCurrentEmotions(null)

    // Simulate response after a short delay
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: "them",
        text: "That sounds great! I'd love to chat more about our shared interests. Maybe we could plan a video call soon?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        emotions: [
          { name: "Excitement", value: Math.random() * 0.3 + 0.2 },
          { name: "Interest", value: Math.random() * 0.3 + 0.2 },
          { name: "Surprise (Positive)", value: Math.random() * 0.2 + 0.1 },
        ],
      }
      setMessages((prev) => [...prev, response])
    }, 3000)
  }

  const toggleEmotionAnalysis = () => {
    setShowEmotionAnalysis(!showEmotionAnalysis)
  }

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode)
  }

  const handleEmotionsDetected = (emotions: Record<string, number>) => {
    setCurrentEmotions(emotions)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Chat header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center ml-2">
              <div className="relative">
                <img
                  src={mockContact.image || "/placeholder.svg"}
                  alt={mockContact.name}
                  className="w-10 h-10 rounded-full object-cover"
                  crossOrigin="anonymous"
                />
                {mockContact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                )}
              </div>
              <div className="ml-3">
                <h2 className="font-medium">{mockContact.name}</h2>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Online</span>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1"></div>
                    <span className="text-xs text-purple-600 dark:text-purple-400">Joy: 85%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant={showEmotionAnalysis ? "default" : "ghost"} size="icon" onClick={toggleEmotionAnalysis}>
              <BarChart2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                {message.sender === "them" && (
                  <img
                    src={mockContact.image || "/placeholder.svg"}
                    alt={mockContact.name}
                    className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                    crossOrigin="anonymous"
                  />
                )}
                <div className="flex flex-col max-w-xs md:max-w-md lg:max-w-lg">
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.sender === "me" ? "bg-purple-600 text-white" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "me" ? "text-purple-100" : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>

                  {/* Emotion scores */}
                  <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-3 gap-4">
                      {message.emotions.map((emotion, index) => (
                        <EmotionScoreBar key={index} name={emotion.name} value={emotion.value} />
                      ))}
                    </div>
                  </div>
                </div>
                {message.sender === "me" && (
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="You"
                    className="w-8 h-8 rounded-full object-cover ml-2 self-end"
                  />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {showEmotionAnalysis && (
          <div className="w-80 border-l dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
            <EmotionAnalysisPanel contactName={mockContact.name} />
          </div>
        )}
      </div>

      {/* Chat input */}
      <div className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4">
        {isVoiceMode ? (
          <div className="flex flex-col items-center py-4">
            <HumeVoiceAnalyzer onEmotionsDetected={handleEmotionsDetected} />

            {currentEmotions && (
              <div className="mt-4 w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Detected Emotions:</span>
                  <div className="flex space-x-1">
                    {Object.entries(currentEmotions)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([emotion, value]) => (
                        <EmotionBubble key={emotion} emotions={{ [emotion]: value }} />
                      ))}
                  </div>
                </div>

                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="mb-2"
                />

                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={toggleVoiceMode}>
                    Switch to Text
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={newMessage.trim() === ""}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-5 w-5 mr-2" /> Send with Emotions
                  </Button>
                </div>
              </div>
            )}

            {!currentEmotions && (
              <div className="mt-4 w-full flex justify-center">
                <Button variant="outline" size="sm" onClick={toggleVoiceMode}>
                  Switch to Text Mode
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleVoiceMode}>
              <Mic className="h-5 w-5" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

