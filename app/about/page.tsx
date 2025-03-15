import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield, Brain } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400 mr-2" />
            <span className="text-lg font-bold">EmotionConnect</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Home
            </Link>
            <Link href="/about" className="text-pink-600 dark:text-pink-400 font-medium">
              About
            </Link>
            <Link href="/signup" passHref>
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
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
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-12 md:py-24 bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">About EmotionConnect</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              We're revolutionizing online dating by using advanced emotion AI to help people form deeper, more
              meaningful connections.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup" passHref>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                  Join Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Our mission */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We believe that emotional compatibility is the foundation of lasting relationships. Our mission is to
                use technology to help people understand their own emotions and connect with others on a deeper level.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-pink-50 dark:bg-gray-900 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Emotional Intelligence</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our AI helps you understand your own emotional patterns and those of potential matches.
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-gray-900 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Meaningful Connections</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We match people based on emotional compatibility, not just surface-level preferences.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-gray-900 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Safe Environment</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our emotion AI helps detect negative interactions and creates a safer dating experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our platform uses advanced AI to analyze emotions and help you find compatible matches.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Emotion detection visualization"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-pink-100 dark:bg-pink-900/20 rounded-full p-2 mr-4">
                    <span className="text-pink-600 dark:text-pink-400 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Sign up and complete your profile with information about yourself and what you're looking for.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-pink-100 dark:bg-pink-900/20 rounded-full p-2 mr-4">
                    <span className="text-pink-600 dark:text-pink-400 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Discover Matches</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our AI analyzes emotional compatibility to suggest matches that are right for you.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-pink-100 dark:bg-pink-900/20 rounded-full p-2 mr-4">
                    <span className="text-pink-600 dark:text-pink-400 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Connect with Emotion</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      During video calls, our AI provides real-time emotion insights to enhance your communication.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-pink-100 dark:bg-pink-900/20 rounded-full p-2 mr-4">
                    <span className="text-pink-600 dark:text-pink-400 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Build Relationships</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Use our emotion insights to develop deeper understanding and stronger connections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Technology</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Powered by Hume AI, our platform uses cutting-edge emotion recognition technology.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Emotion Recognition</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our AI can detect subtle emotional cues from facial expressions, voice tone, and language patterns
                  during video calls and messaging.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mr-2"></span>
                    <span>Facial expression analysis</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mr-2"></span>
                    <span>Voice tone analysis</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mr-2"></span>
                    <span>Natural language processing</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Emotional Compatibility</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our matching algorithm considers emotional patterns and compatibility factors to suggest better
                  matches.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                    <span>Emotional intelligence assessment</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                    <span>Communication style analysis</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                    <span>Relationship value alignment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Connect on a Deeper Level?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Join EmotionConnect today and experience a new way of dating that focuses on emotional compatibility.
            </p>
            <Link href="/signup" passHref>
              <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                Create Your Profile <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400 mr-2" />
                <span className="text-lg font-bold">EmotionConnect</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 max-w-xs">
                Revolutionizing online dating with emotion AI technology for deeper connections.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      Dating Tips
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      Success Stories
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t dark:border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">© 2025 EmotionConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

