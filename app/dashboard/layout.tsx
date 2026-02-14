"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
      }
      setUser(user)
    }

    checkAuth()
  }, [router])

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Overthinking Analyzer", path: "/dashboard/analyzer" },
    { label: "Career Guidance", path: "/dashboard/career" },
    { label: "Wellness Center", path: "/dashboard/wellness" },
    { label: "Community", path: "/dashboard/community" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            MindFlow
          </h1>

          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={pathname === item.path ? "default" : "ghost"}
                size="sm"
                onClick={() => router.push(item.path)}
                className={pathname === item.path ? "bg-primary hover:bg-primary/90" : ""}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                // Could implement a mobile menu here
              }}
            >
              Menu
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border/50 px-4 py-2 flex gap-2 overflow-x-auto">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={pathname === item.path ? "default" : "ghost"}
              size="sm"
              onClick={() => router.push(item.path)}
              className={`whitespace-nowrap ${pathname === item.path ? "bg-primary hover:bg-primary/90" : ""}`}
            >
              {item.label.split(" ")[0]}
            </Button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div>{children}</div>
    </div>
  )
}
