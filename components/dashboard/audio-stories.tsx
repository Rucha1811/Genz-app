"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { PlayIcon, PauseIcon, Volume2Icon } from "lucide-react"

export function AudioStories({ moodScore }: { moodScore?: number }) {
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const loadStories = async () => {
      const { data } = await supabase.from("audio_stories").select("*").limit(8)
      setStories(data || [])
      setLoading(false)
    }

    loadStories()
  }, [])

  const getMoodFilter = (score?: number) => {
    if (!score) return stories
    switch (score) {
      case 1:
        return stories.filter((s) => s.mood_type === "anxious")
      case 2:
        return stories.filter((s) => s.mood_type === "stressed")
      case 3:
        return stories.filter((s) => s.mood_type === "neutral" || s.mood_type === "stressed")
      case 4:
        return stories.filter((s) => s.mood_type === "good" || s.mood_type === "neutral")
      case 5:
        return stories.filter((s) => s.mood_type === "great" || s.mood_type === "good")
      default:
        return stories
    }
  }

  const handlePlayPause = (story: any) => {
    if (playingId === story.id) {
      audioRef?.pause()
      setPlayingId(null)
    } else {
      if (audioRef && playingId) {
        audioRef.pause()
      }
      const audio = new Audio(story.audio_url)
      audio.play().catch(() => {
        console.log("Audio playback not available")
      })
      setAudioRef(audio)
      setPlayingId(story.id)

      audio.onended = () => setPlayingId(null)
    }
  }

  const filteredStories = getMoodFilter(moodScore)

  if (loading) {
    return <div>Loading audio stories...</div>
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-secondary/20">
      <CardHeader>
        <CardTitle className="text-lg">Audio Stories & Affirmations</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Listen to uplifting stories tailored to your mood</p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-3">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="p-3 rounded-lg border border-border/50 hover:border-secondary/50 transition group"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handlePlayPause(story)}
                  className="flex-shrink-0 mt-1 p-2 rounded-full bg-secondary/20 hover:bg-secondary/40 transition"
                >
                  {playingId === story.id ? (
                    <PauseIcon className="h-4 w-4 text-secondary-foreground" />
                  ) : (
                    <PlayIcon className="h-4 w-4 text-secondary-foreground" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-2">{story.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{story.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Volume2Icon className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {Math.floor(story.duration_seconds / 60)}:{String(story.duration_seconds % 60).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">No stories available for your current mood</p>
        )}
      </CardContent>
    </Card>
  )
}
