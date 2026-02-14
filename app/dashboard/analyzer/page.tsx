"use client"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { OverthinkinAnalyzer } from "@/components/dashboard/overthinking-analyzer"

export default function AnalyzerPage() {
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
      <div className="container max-w-2xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
            ← Back
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Overthinking Analyzer
          </h1>
          <p className="text-muted-foreground mt-2">
            Type out your anxious thoughts and let AI help you untangle them with practical insights and techniques.
          </p>
        </div>

        <OverthinkinAnalyzer />

        <Card className="mt-8 border-secondary/20 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="text-sm">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2 text-muted-foreground">
            <p>1. Share your anxious thoughts or worries</p>
            <p>2. AI identifies overthinking patterns and triggers</p>
            <p>3. Get reframed perspectives and grounding techniques</p>
            <p>4. Take action with small, manageable steps</p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
