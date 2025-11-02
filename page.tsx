"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ImageUpload } from "@/components/image-upload"
import { DiseaseResult } from "@/components/disease-result"
import type { DetectionResult } from "@/lib/disease-service"
import { Header } from "@/components/header"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("")

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleDetectionResult = (detectionResult: DetectionResult, image: string) => {
    setResult(detectionResult)
    setImageUrl(image)

    const history = JSON.parse(localStorage.getItem("scanHistory") || "[]")
    history.unshift({
      id: Math.random().toString(36).substr(2, 9),
      disease: detectionResult.disease,
      confidence: detectionResult.confidence,
      timestamp: new Date().toISOString(),
      imageUrl: image,
    })
    localStorage.setItem("scanHistory", JSON.stringify(history.slice(0, 50)))
  }

  const handleNewScan = () => {
    setResult(null)
    setImageUrl("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Upload a plant image to analyze and detect any diseases</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {result ? (
            <DiseaseResult result={result} imageUrl={imageUrl} onNewScan={handleNewScan} />
          ) : (
            <ImageUpload onDetectionResult={handleDetectionResult} />
          )}
        </div>

        {result && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Tips for Better Results</h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Take clear, well-lit photos of affected areas</li>
              <li>• Capture the underside of leaves if possible</li>
              <li>• Avoid shadows and glare on the image</li>
              <li>• Include multiple angles for complex cases</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  )
}
