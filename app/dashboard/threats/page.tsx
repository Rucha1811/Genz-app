"use client"

import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ThreatsPage() {
  const [user, setUser] = useState<any>(null)
  const [careers, setCareers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        redirect("/auth/login")
      }

      setUser(user)

      // Fetch careers from database
      const { data } = await supabase.from("careers").select("*").limit(10)
      setCareers(data || [])
      setLoading(false)
    }

    loadData()
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-destructive to-orange-400 bg-clip-text text-transparent">
            Career Risk Assessment
          </h1>
          <p className="text-muted-foreground mt-2">
            See which careers are at risk due to AI automation and market shifts
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {careers.map((career) => {
            const getRiskColor = (risk: string) => {
              switch (risk?.toLowerCase()) {
                case "high":
                  return "border-red-500/30 bg-red-500/5"
                case "medium":
                  return "border-yellow-500/30 bg-yellow-500/5"
                default:
                  return "border-green-500/30 bg-green-500/5"
              }
            }

            return (
              <Card key={career.id} className={`${getRiskColor(career.risk_score)} border`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{career.title}</CardTitle>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        career.risk_score === "High"
                          ? "bg-red-500/20 text-red-600"
                          : career.risk_score === "Medium"
                            ? "bg-yellow-500/20 text-yellow-600"
                            : "bg-green-500/20 text-green-600"
                      }`}
                    >
                      {career.risk_score || "Unknown"} Risk
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{career.description}</p>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">Growth Trend</p>
                      <p className="text-sm">{career.growth_trend}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">Future Outlook</p>
                      <p className="text-sm">{career.future_outlook}</p>
                    </div>
                  </div>

                  {career.required_skills && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Key Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {career.required_skills.map((skill: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-muted text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
