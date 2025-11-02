"use client"

import type { DetectionResult } from "@/lib/disease-service"

interface DiseaseResultProps {
  result: DetectionResult
  imageUrl: string
  onNewScan: () => void
}

export function DiseaseResult({ result, imageUrl, onNewScan }: DiseaseResultProps) {
  const severityColors = {
    low: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      badge: "bg-green-100 text-green-800",
    },
    medium: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      badge: "bg-yellow-100 text-yellow-800",
    },
    high: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-100 text-red-800" },
  }

  const colors = severityColors[result.severity]

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-lg p-6 space-y-4`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className={`text-2xl font-bold ${colors.text}`}>{result.disease}</h3>
          <p className="text-gray-600 text-sm">Confidence: {Math.round(result.confidence * 100)}%</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge}`}>
          {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)}
        </span>
      </div>

      <img src={imageUrl || "/placeholder.svg"} alt="Analyzed plant" className="w-full h-48 object-cover rounded-lg" />

      <div className="bg-white rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
        <p className="text-gray-700">{result.description}</p>
      </div>

      <div className="bg-white rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Recommended Treatment</h4>
        <p className="text-gray-700">{result.treatment}</p>
      </div>

      <button
        onClick={onNewScan}
        className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        Scan Another Plant
      </button>
    </div>
  )
}
