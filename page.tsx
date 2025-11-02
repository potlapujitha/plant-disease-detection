"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"

interface ScanRecord {
  id: string
  disease: string
  confidence: number
  timestamp: string
  imageUrl: string
}

export default function HistoryPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [history, setHistory] = useState<ScanRecord[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const stored = localStorage.getItem("scanHistory")
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Scan History</h1>
          <p className="text-gray-600">View all your previous plant disease scans and results</p>
        </div>

        {history.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Scans Yet</h2>
            <p className="text-gray-600 mb-6">Start by uploading a plant image in your dashboard</p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((record) => (
              <div key={record.id} className="bg-white rounded-lg shadow-md p-6 flex gap-6 hover:shadow-lg transition">
                {record.imageUrl && (
                  <img
                    src={record.imageUrl || "/placeholder.svg"}
                    alt={record.disease}
                    className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                  />
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{record.disease}</h3>
                    <span className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                      {Math.round(record.confidence * 100)}% Confidence
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{formatDate(record.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">About Your History</h3>
          <p className="text-blue-800 text-sm">
            We keep a record of your last 50 scans. This helps you track plant health over time and compare disease
            patterns.
          </p>
        </div>
      </main>
    </div>
  )
}
