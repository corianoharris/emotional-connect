"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, MessageSquare, User, Settings, LogOut } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()
  const [matchCount, setMatchCount] = useState(0)

  // Load match count from localStorage on mount and when it changes
  useEffect(() => {
    const loadMatchCount = () => {
      if (typeof window !== "undefined") {
        const count = Number.parseInt(localStorage.getItem("matchCount") || "0")
        const connectedCount = Number.parseInt(localStorage.getItem("connectedCount") || "0")
        setMatchCount(count + connectedCount)
      }
    }

    // Load initial count
    loadMatchCount()

    // Listen for match count updates
    const handleMatchCountUpdate = () => {
      loadMatchCount()
    }

    window.addEventListener("matchCountUpdated", handleMatchCountUpdate)

    return () => {
      window.removeEventListener("matchCountUpdated", handleMatchCountUpdate)
    }
  }, [])

  const navItems = [
    {
      name: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Matches",
      href: "/dashboard/matches",
      icon: Heart,
      badge: matchCount > 0 ? matchCount : null,
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      <div className="p-4">
        <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">EmotionConnect</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-800/30 dark:text-purple-200"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/40"
                    }`}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t dark:border-gray-700">
        <Link
          href="/"
          className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="mr-2 h-5 w-5" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  )
}

