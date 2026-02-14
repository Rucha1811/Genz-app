"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MindFlow
            </h1>
            <p className="text-xl text-muted-foreground">Your AI mentor for mental health & career clarity</p>
          </div>

          <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Overthinking about your future? Anxious about career choices? We help Gen-Z reduce stress, gain clarity, and
            build a future-proof career path with AI-powered guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            {user ? (
              <>
                <Button size="lg" onClick={() => router.push("/dashboard")} className="bg-primary hover:bg-primary/90">
                  Go to Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={async () => {
                    await supabase.auth.signOut()
                    setUser(null)
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={() => router.push("/auth/sign-up")}
                  className="bg-primary hover:bg-primary/90"
                >
                  Get Started Free
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push("/auth/login")}>
                  Login
                </Button>
              </>
            )}
          </div>

          <div className="grid md:grid-cols-4 gap-4 pt-12 text-center">
            {[
              { icon: "🧠", label: "Mental Health Support" },
              { icon: "🎯", label: "Career Guidance" },
              { icon: "🎵", label: "Audio Stories" },
              { icon: "📊", label: "Progress Tracking" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
