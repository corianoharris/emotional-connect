"use client"

import { useEffect, useRef } from "react"

interface EmotionRadarChartProps {
  data?: Record<string, number>
}

export default function EmotionRadarChart({ data = {} }: EmotionRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Ensure we have data to work with
  const safeData = data || {}

  // Get top emotions (up to 8 for the radar chart)
  const emotions = Object.entries(safeData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // If no emotions data, show empty state
    if (emotions.length === 0) {
      ctx.font = "14px sans-serif"
      ctx.fillStyle = "#6b7280"
      ctx.textAlign = "center"
      ctx.fillText("No emotion data available", rect.width / 2, rect.height / 2)
      return
    }

    // Calculate center and radius
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) * 0.8

    // Draw radar background
    ctx.strokeStyle = "#e5e7eb"
    ctx.fillStyle = "rgba(243, 244, 246, 0.2)"

    // Draw concentric circles
    for (let i = 1; i <= 4; i++) {
      const r = radius * (i / 4)
      ctx.beginPath()
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw radar axes
    emotions.forEach(([,], i) => {
      const angle = (i / emotions.length) * Math.PI * 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
      ctx.stroke()
    })

    // Draw emotion data
    ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
    ctx.strokeStyle = "rgb(59, 130, 246)"
    ctx.lineWidth = 2

    ctx.beginPath()
    emotions.forEach(([, value], i) => {
      const angle = (i / emotions.length) * Math.PI * 2
      const distance = value * radius
      const x = centerX + distance * Math.cos(angle)
      const y = centerY + distance * Math.sin(angle)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw data points
    ctx.fillStyle = "rgb(59, 130, 246)"
    emotions.forEach(([, value], i) => {
      const angle = (i / emotions.length) * Math.PI * 2
      const distance = value * radius
      const x = centerX + distance * Math.cos(angle)
      const y = centerY + distance * Math.sin(angle)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw labels
    ctx.font = "12px sans-serif"
    ctx.fillStyle = "#4b5563"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    emotions.forEach(([emotion], i) => {
      const angle = (i / emotions.length) * Math.PI * 2
      const labelDistance = radius * 1.1
      const x = centerX + labelDistance * Math.cos(angle)
      const y = centerY + labelDistance * Math.sin(angle)

      // Capitalize first letter
      const label = emotion.charAt(0).toUpperCase() + emotion.slice(1)

      ctx.fillText(label, x, y)
    })
  }, [emotions])

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}

