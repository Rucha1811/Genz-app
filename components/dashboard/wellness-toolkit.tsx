"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const wellnessTools = [
  {
    id: "breathing",
    name: "3-Min Breathing Reset",
    description: "Quick breathing exercise",
    icon: "🫁",
    action: "Start",
  },
  {
    id: "sleep",
    name: "Sleep Support Guided",
    description: "Wind down for better sleep",
    icon: "😴",
    action: "Listen",
  },
  {
    id: "grounding",
    name: "Grounding Technique",
    description: "5-4-3-2-1 sensory reset",
    icon: "🌍",
    action: "Guide Me",
  },
  {
    id: "affirmation",
    name: "Daily Affirmation",
    description: "Career confidence boost",
    icon: "✨",
    action: "Read",
  },
]

export function WellnessToolkit() {
  const [activeExercise, setActiveExercise] = useState<string | null>(null)

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-secondary/20">
      <CardHeader>
        <CardTitle className="text-lg">Daily Wellness Toolkit</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-3">
          {wellnessTools.map((tool) => (
            <div
              key={tool.id}
              className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-secondary/50 transition cursor-pointer"
              onClick={() => setActiveExercise(tool.id)}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="text-2xl">{tool.icon}</div>
                  <p className="font-medium text-sm">{tool.name}</p>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveExercise(tool.id)
                  }}
                >
                  {tool.action}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {activeExercise && (
          <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20 text-sm">
            <p className="font-medium mb-2">Coming soon: Interactive exercises with audio guidance</p>
            <p className="text-muted-foreground">MindFlow is preparing immersive wellness experiences powered by AI.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
