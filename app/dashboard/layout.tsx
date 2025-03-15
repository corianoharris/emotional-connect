"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage on client side only
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed width sidebar */}
      <div className="w-64 h-full flex-shrink-0">
        <Navigation />
      </div>

      {/* Main content area with scrolling */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {mounted ? children : <div className="p-8">Loading...</div>}
      </main>
    </div>
  )
}

