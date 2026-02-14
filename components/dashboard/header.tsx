"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function DashboardHeader({ user }: { user: any }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    setIsLoading(true)
    await supabase.auth.signOut()
    router.push("/")
  }

  const userName = user?.user_metadata?.full_name || user?.email || "Friend"

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome back, {userName.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground mt-1">Check in with yourself and track your progress</p>
      </div>
      <Button variant="outline" onClick={handleLogout} disabled={isLoading}>
        {isLoading ? "Logging out..." : "Logout"}
      </Button>
    </div>
  )
}
