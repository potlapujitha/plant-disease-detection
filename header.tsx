"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={user ? "/dashboard" : "/"} className="text-2xl font-bold text-green-600 hover:text-green-700">
          PlantShield
        </Link>

        <nav className="flex gap-4 items-center">
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-600 font-medium hover:text-gray-900 transition">
                Dashboard
              </Link>
              <Link href="/history" className="text-gray-600 font-medium hover:text-gray-900 transition">
                History
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 font-medium hover:text-gray-900 transition">
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
