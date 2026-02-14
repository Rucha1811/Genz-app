"use client"

import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { MoodCard } from "@/components/dashboard/mood-card"
import { WellnessToolkit } from "@/components/dashboard/wellness-toolkit"
import { ProgressChart } from "@/components/dashboard/progress-chart"
import { AudioStories } from "@/components/dashboard/audio-stories"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [moodData, setMoodData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [lastMood, setLastMood] = useState<number | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        redirect("/auth/login")
      }

      setUser(user)

      const { data: moods } = await supabase
        .from("mood_entries")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(7)

      setMoodData(moods || [])
      if (moods && moods.length > 0) {
        setLastMood(moods[0].mood_score)
      }
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading your dashboard...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="container max-w-6xl">
        <DashboardHeader user={user} />

        {/* Quick Actions */}
        <div className="grid md:grid-cols-5 gap-3 mb-8">
          {[
            { label: "Mood Check-in", path: "#mood", icon: "🎯" },
            { label: "AI Analyzer", path: "/dashboard/analyzer", icon: "🧠" },
            { label: "Career Path", path: "/dashboard/career", icon: "🚀" },
            { label: "Wellness", path: "/dashboard/wellness", icon: "🌿" },
            { label: "Community", path: "/dashboard/community", icon: "👥" },
          ].map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto py-3 flex flex-col items-center gap-2 bg-card border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition"
              onClick={() => {
                if (action.path.startsWith("/")) {
                  router.push(action.path)
                }
              }}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Mood & Progress */}
          <div className="space-y-6">
            <div id="mood">
              <MoodCard
                user={user}
                onMoodSubmit={() => {
                  const loadMoods = async () => {
                    const { data: moods } = await supabase
                      .from("mood_entries")
                      .select("*")
                      .eq("user_id", user.id)
                      .order("created_at", { ascending: false })
                      .limit(7)
                    setMoodData(moods || [])
                    if (moods && moods.length > 0) {
                      setLastMood(moods[0].mood_score)
                    }
                  }
                  loadMoods()
                }}
              />
            </div>
            <ProgressChart moodData={moodData.reverse()} />
          </div>

          {/* Wellness & Audio */}
          <div className="space-y-6">
            <WellnessToolkit />
            <AudioStories moodScore={lastMood || undefined} />
          </div>
        </div>

        {/* Featured Tools */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Quick Analyzer Preview */}
          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20 md:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Quick Stress Relief</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Feeling overwhelmed? Let AI help you untangle your thoughts.
              </p>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => router.push("/dashboard/analyzer")}
              >
                Open Analyzer
              </Button>
            </CardContent>
          </Card>

          {/* Career Insights */}
          <Card className="bg-gradient-to-br from-card to-card/50 border-secondary/20 md:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Discover Your Path</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Get personalized career recommendations based on your interests and skills.
              </p>
              <Button
                className="w-full bg-secondary hover:bg-secondary/90"
                onClick={() => router.push("/dashboard/career")}
              >
                Explore Careers
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Footer */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6 text-center">
            <p className="text-sm font-medium text-foreground">
              Remember: Your future is not determined by one choice. You're building a path, not following a fixed map.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
