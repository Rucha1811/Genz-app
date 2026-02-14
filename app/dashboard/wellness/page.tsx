"use client"

import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AudioStories } from "@/components/dashboard/audio-stories"
import { EnhancedWellness } from "@/components/dashboard/enhanced-wellness"

export default function WellnessPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        redirect("/auth/login")
      }

      setUser(user)
      setLoading(false)
    }

    loadUser()
  }, [])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
            ← Back
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Wellness Center
          </h1>
          <p className="text-muted-foreground mt-2">
            Build daily habits with guided exercises and uplifting audio stories
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <EnhancedWellness />
          <AudioStories />
        </div>
      </div>
    </main>
  )
}
