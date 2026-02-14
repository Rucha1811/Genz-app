"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"

const exercises = [
  {
    id: "box-breathing",
    name: "Box Breathing",
    description: "4 counts in, hold 4, out 4, hold 4",
    duration: "5 minutes",
    icon: "🫁",
    steps: [
      "Breathe in for 4 counts",
      "Hold for 4 counts",
      "Breathe out for 4 counts",
      "Hold for 4 counts",
      "Repeat 5 times",
    ],
  },
  {
    id: "grounding-5",
    name: "5-4-3-2-1 Grounding",
    description: "Engage all senses to reset",
    duration: "3-5 minutes",
    icon: "🌍",
    steps: [
      "Notice 5 things you can see",
      "Notice 4 things you can touch",
      "Notice 3 things you can hear",
      "Notice 2 things you can smell",
      "Notice 1 thing you can taste",
    ],
  },
  {
    id: "progressive-relax",
    name: "Progressive Relaxation",
    description: "Tense and release muscle groups",
    duration: "10 minutes",
    icon: "😌",
    steps: [
      "Tense your toes for 5 seconds, then release",
      "Move up to calves, then thighs",
      "Continue up through your body",
      "End with facial muscles",
      "Notice the relaxation",
    ],
  },
  {
    id: "body-scan",
    name: "Body Scan Meditation",
    description: "Observe sensations without judgment",
    duration: "8 minutes",
    icon: "🧠",
    steps: [
      "Lie down or sit comfortably",
      "Start at your head, notice sensations",
      "Slowly move attention down your body",
      "Don't judge, just observe",
      "End with full-body awareness",
    ],
  },
]

export function EnhancedWellness() {
  const [activeExercise, setActiveExercise] = useState<string | null>(null)
  const [completedExercises, setCompletedExercises] = useState<string[]>([])

  const handleComplete = (id: string) => {
    setCompletedExercises([...completedExercises, id])
    toast.success("Great job! Your wellness streak is building.")
    setActiveExercise(null)
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-accent/20">
      <CardHeader>
        <CardTitle className="text-lg">Wellness Exercises</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Completed today: {completedExercises.length}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!activeExercise ? (
          <div className="grid md:grid-cols-2 gap-3">
            {exercises.map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => setActiveExercise(exercise.id)}
                className="p-3 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-accent/5 transition text-left group"
              >
                <div className="flex items-start gap-2">
                  <span className="text-2xl">{exercise.icon}</span>
                  <div>
                    <p className="font-semibold text-sm">{exercise.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{exercise.description}</p>
                    <p className="text-xs text-accent mt-1">{exercise.duration}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {exercises
              .filter((e) => e.id === activeExercise)
              .map((exercise) => (
                <div key={exercise.id} className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{exercise.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{exercise.description}</p>
                  </div>

                  <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
                    {exercise.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-3 text-sm">
                        <div className="font-semibold text-primary flex-shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <p className="text-foreground/80">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setActiveExercise(null)}>
                      Back
                    </Button>
                    <Button className="flex-1 bg-accent hover:bg-accent/90" onClick={() => handleComplete(exercise.id)}>
                      Mark Complete
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
