import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Connect with <span className="text-purple-600 dark:text-purple-500">Emotional Intelligence</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Our AI-powered dating app uses Hume's emotion detection to help you find meaningful connections
                    based on emotional compatibility.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard" passHref>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Try Demo Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about" passHref>
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto">
                <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 opacity-50 rounded-xl"></div>
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <img
                      src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1887&auto=format&fit=crop"
                      alt="Emotion visualization dashboard"
                      className="rounded-lg shadow-lg w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900/20 px-3 py-1 text-sm">
                  <span className="text-purple-600 dark:text-purple-400">Powered by Hume AI</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our app uses advanced emotion detection to help you find compatible matches and improve your dating
                  experience.
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900 dark:border-gray-800">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Emotion-Based Matching</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Our AI analyzes emotional compatibility to suggest better matches than traditional dating apps.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900 dark:border-gray-800">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-purple-600 dark:text-purple-400"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m7 9 2 2c1.736-2.681 4.246-4.36 8-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Real-Time Emotion Detection</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  During video calls, our AI provides insights about your date's emotional state to enhance
                  communication.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900 dark:border-gray-800">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-purple-600 dark:text-purple-400"
                  >
                    <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Conversation Insights</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Get personalized feedback and tips to improve your dating conversations based on emotional analysis.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <span className="text-lg font-bold">EmotionConnect</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 EmotionConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

