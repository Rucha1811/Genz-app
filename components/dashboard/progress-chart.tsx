"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProgressChart({ moodData }: { moodData: any[] }) {
  const weekData = moodData.slice(-7)

  const getMoodEmoji = (score: number) => {
    switch (score) {
      case 1:
        return "😰"
      case 2:
        return "😟"
      case 3:
        return "😐"
      case 4:
        return "😊"
      case 5:
        return "😄"
      default:
        return "❓"
    }
  }

  const avgMood =
    weekData.length > 0 ? (weekData.reduce((sum, m) => sum + m.mood_score, 0) / weekData.length).toFixed(1) : "N/A"

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-accent/20">
      <CardHeader>
        <CardTitle className="text-lg">Weekly Mood Trend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {weekData.length > 0 ? (
          <>
            <div className="flex items-end justify-around h-32 gap-2">
              {weekData.map((entry, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className={`w-full bg-primary/30 rounded-t-lg transition`}
                    style={{ height: `${(entry.mood_score / 5) * 100}%` }}
                  />
                  <span className="text-lg">{getMoodEmoji(entry.mood_score)}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-center p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Average Mood</p>
                <p className="text-2xl font-bold">{avgMood}/5</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Entries</p>
                <p className="text-2xl font-bold">{weekData.length}</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">Start logging moods to see your trend</p>
        )}
      </CardContent>
    </Card>
  )
}
