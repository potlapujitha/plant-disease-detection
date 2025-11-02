"use client"

import type React from "react"

import { useState, useRef } from "react"
import { type DetectionResult, detectDisease } from "@/lib/disease-service"

interface ImageUploadProps {
  onDetectionResult: (result: DetectionResult, imageUrl: string) => void
}

export function ImageUpload({ onDetectionResult }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file")
      return
    }

    const reader = new FileReader()
    reader.onload = async (e) => {
      const imageData = e.target?.result as string
      setPreview(imageData)
      setLoading(true)

      try {
        const result = await detectDisease(imageData)
        onDetectionResult(result, imageData)
      } catch (error) {
        alert("Error analyzing image. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition"
        >
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />
          <div className="text-4xl mb-2">📸</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Upload Plant Image</h3>
          <p className="text-gray-600">Drag and drop your image here, or click to select</p>
        </div>
      ) : (
        <div className="space-y-4">
          <img
            src={preview || "/placeholder.svg"}
            alt="Plant preview"
            className="w-full h-64 object-cover rounded-lg"
          />
          <button
            onClick={() => {
              setPreview("")
              if (fileInputRef.current) fileInputRef.current.value = ""
            }}
            disabled={loading}
            className="w-full py-2 px-4 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
          >
            Choose Different Image
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-3">Analyzing your plant...</p>
        </div>
      )}
    </div>
  )
}
