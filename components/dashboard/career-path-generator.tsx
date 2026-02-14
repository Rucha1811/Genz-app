"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { toast } from "sonner"

export function CareerPathGenerator() {
  const [step, setStep] = useState(1)
  const [interests, setInterests] = useState("")
  const [skills, setSkills] = useState("")
  const [personality, setPersonality] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!interests.trim() || !skills.trim()) {
      toast.error("Please fill in interests and skills")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/career-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests, skills, personality }),
      })

      if (!response.ok) throw new Error("Failed")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      toast.error("Failed to generate career path")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high":
        return "bg-red-500/10 border-red-500/30"
      case "medium":
        return "bg-yellow-500/10 border-yellow-500/30"
      default:
        return "bg-green-500/10 border-green-500/30"
    }
  }

  if (result) {
    return (
      <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Your Career Path</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {result.careers?.map((career: any, idx: number) => (
            <div key={idx} className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{career.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{career.description}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    career.growth_trend === "High"
                      ? "bg-emerald-500/20 text-emerald-600"
                      : career.growth_trend === "Medium"
                        ? "bg-yellow-500/20 text-yellow-600"
                        : "bg-red-500/20 text-red-600"
                  }`}
                >
                  {career.growth_trend} Growth
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-2 mt-3 text-xs">
                <div className="p-2 bg-muted/30 rounded">
                  <p className="text-muted-foreground">Salary</p>
                  <p className="font-semibold">{career.salary_range}</p>
                </div>
                <div className="p-2 bg-muted/30 rounded">
                  <p className="text-muted-foreground">AI Risk</p>
                  <p className={`font-semibold ${career.ai_risk === "Low" ? "text-green-600" : "text-orange-600"}`}>
                    {career.ai_risk}
                  </p>
                </div>
                <div className="p-2 bg-muted/30 rounded">
                  <p className="text-muted-foreground">Match</p>
                  <p className="font-semibold">{career.why_fit}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
            <p className="font-semibold text-sm mb-2">Skills to Develop</p>
            <div className="flex flex-wrap gap-2">
              {result.skills_to_develop?.map((skill: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="font-semibold text-sm mb-2">Your Roadmap</p>
            <p className="text-sm text-foreground/80">{result.roadmap}</p>
          </div>

          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => {
              setResult(null)
              setStep(1)
              setInterests("")
              setSkills("")
              setPersonality("")
            }}
          >
            Start Over
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">Career Path Generator</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Step {step}/3</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 1 && (
          <>
            <div>
              <label className="text-sm font-medium">What are your interests?</label>
              <Input
                placeholder="e.g., technology, design, business, science..."
                className="mt-2"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={() => setStep(2)} disabled={!interests.trim()}>
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="text-sm font-medium">What skills do you have or want to develop?</label>
              <Input
                placeholder="e.g., coding, writing, problem-solving..."
                className="mt-2"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1" onClick={() => setStep(3)} disabled={!skills.trim()}>
                Next
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="text-sm font-medium">Describe your personality (optional)</label>
              <Input
                placeholder="e.g., creative, analytical, people-oriented..."
                className="mt-2"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button className="flex-1" onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Generating...
                  </>
                ) : (
                  "Generate Path"
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
