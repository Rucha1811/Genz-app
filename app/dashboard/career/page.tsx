"use client"

import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CareerPathGenerator } from "@/components/dashboard/career-path-generator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CareerPage() {
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
            Career Guidance
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover future-proof careers aligned with your interests, skills, and personality
          </p>
        </div>

        <div className="space-y-6">
          <CareerPathGenerator />

          <Card className="border-secondary/20 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-sm">What We Consider</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-muted-foreground">
              <p>✓ Your interests and passions</p>
              <p>✓ Current job market trends</p>
              <p>✓ AI automation risk assessment</p>
              <p>✓ Salary expectations and growth potential</p>
              <p>✓ Skills needed for the next 5-10 years</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
