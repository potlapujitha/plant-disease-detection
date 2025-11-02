"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600 mb-6">Sign in to PlantShield</p>

            {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              {"Don't have an account? "}
              <Link href="/signup" className="text-green-600 font-medium hover:text-green-700">
                Sign up
              </Link>
            </p>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">Demo credentials for testing:</p>
              <p className="text-xs text-gray-500 text-center mt-1">Email: demo@example.com</p>
              <p className="text-xs text-gray-500 text-center">Password: demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
