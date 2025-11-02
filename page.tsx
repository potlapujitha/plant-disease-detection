"use client"

import { useAuth } from "@/lib/auth-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Detect Plant Diseases in Seconds</h1>
          <p className="text-xl text-gray-600 mb-8">
            Use AI-powered image analysis to identify plant diseases and get instant treatment solutions. Help your
            plants thrive with PlantShield.
          </p>
          <div className="flex gap-4">
            <Link
              href="/signup"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-lg transition"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-medium text-lg transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Image</h3>
            <p className="text-gray-600">Snap a photo of your plant and upload it directly from your device.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
            <p className="text-gray-600">Our advanced AI analyzes your plant image in real-time.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Solutions</h3>
            <p className="text-gray-600">Receive personalized treatment recommendations instantly.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600 text-sm">
          <p>PlantShield - Your AI-powered plant health companion</p>
        </div>
      </footer>
    </div>
  )
}
