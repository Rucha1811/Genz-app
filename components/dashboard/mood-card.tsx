"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { toast } from "sonner"

const moods = [
  { label: "Anxious", value: 1, color: "bg-red-400" },
  { label: "Stressed", value: 2, color: "bg-orange-400" },
  { label: "Neutral", value: 3, color: "bg-yellow-400" },
  { label: "Good", value: 4, color: "bg-green-400" },
  { label: "Great", value: 5, color: "bg-emerald-400" },
]

export function MoodCard({ user, onMoodSubmit }: { user: any; onMoodSubmit: () => void }) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async () => {
    if (!selectedMood) {
      toast.error("Please select a mood")
      return
    }

    setIsLoading(true)
    try {
      const { error } = await supabase.from("mood_entries").insert({
        user_id: user.id,
        mood_score: selectedMood,
        mood_label: moods.find((m) => m.value === selectedMood)?.label,
        notes,
      })

      if (error) throw error

      toast.success("Mood logged successfully!")
      setSelectedMood(null)
      setNotes("")
      onMoodSubmit()
    } catch (error) {
      toast.error("Failed to log mood")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">How are you feeling?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-5 gap-2">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-3 rounded-lg transition ${
                selectedMood === mood.value
                  ? `${mood.color} text-white shadow-lg scale-105`
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <div className="text-xs font-medium">{mood.label}</div>
            </button>
          ))}
        </div>

        <textarea
          placeholder="Any notes about your mood? (optional)"
          className="w-full p-3 rounded-lg bg-input border border-border text-sm focus:ring-2 focus:ring-primary outline-none transition"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <Button onClick={handleSubmit} disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
          {isLoading ? "Saving..." : "Log Mood"}
        </Button>
      </CardContent>
    </Card>
  )
}
