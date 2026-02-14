"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { toast } from "sonner"

export function OverthinkinAnalyzer() {
  const [thoughts, setThoughts] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!thoughts.trim()) {
      toast.error("Please share what's on your mind")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/analyze-overthinking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thoughts }),
      })

      if (!response.ok) throw new Error("Failed to analyze")

      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      toast.error("Failed to analyze thoughts. Try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">Overthinking Analyzer</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Share what's on your mind, and let AI help untangle it</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!analysis ? (
          <>
            <textarea
              placeholder="I keep worrying about my future... I don't know if I'm good enough for my dream career. Everyone seems to have it figured out except me..."
              className="w-full p-4 rounded-lg bg-input border border-border text-sm focus:ring-2 focus:ring-primary outline-none transition min-h-[120px]"
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              disabled={isLoading}
            />

            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !thoughts.trim()}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Analyzing...
                </>
              ) : (
                "Analyze & Get Insights"
              )}
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
              <p className="font-semibold text-sm">Patterns Detected</p>
              <ul className="list-disc list-inside space-y-1">
                {analysis.patterns?.map((p: string, i: number) => (
                  <li key={i} className="text-sm text-foreground/80">
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 p-3 bg-accent/10 rounded-lg">
              <p className="font-semibold text-sm">Reframed Perspective</p>
              <p className="text-sm text-foreground/80">{analysis.reframed_thoughts?.[0]}</p>
            </div>

            <div className="space-y-2 p-3 bg-secondary/10 rounded-lg">
              <p className="font-semibold text-sm">Grounding Techniques (Try Now)</p>
              <ol className="list-decimal list-inside space-y-1">
                {analysis.grounding_techniques?.slice(0, 2).map((t: string, i: number) => (
                  <li key={i} className="text-sm text-foreground/80">
                    {t}
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-2 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <p className="font-semibold text-sm">Next Steps</p>
              <ul className="space-y-1">
                {analysis.action_steps?.map((step: string, i: number) => (
                  <li key={i} className="text-sm text-foreground/80">
                    • {step}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm italic text-primary/80 text-center py-2">{analysis.confidence_boost}</p>

            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                setAnalysis(null)
                setThoughts("")
              }}
            >
              Analyze Something Else
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
