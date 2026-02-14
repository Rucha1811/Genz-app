"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

export function NewsFeed() {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const loadNews = async () => {
      const { data } = await supabase.from("news_items").select("*").order("created_at", { ascending: false }).limit(6)

      setNews(data || [])
      setLoading(false)
    }

    loadNews()
  }, [])

  if (loading) {
    return <div>Loading news...</div>
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "job-market":
        return "bg-emerald-500/10 text-emerald-600"
      case "career":
        return "bg-blue-500/10 text-blue-600"
      case "gen-z":
        return "bg-purple-500/10 text-purple-600"
      case "wellness":
        return "bg-pink-500/10 text-pink-600"
      default:
        return "bg-accent/10 text-accent"
    }
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-accent/20">
      <CardHeader>
        <CardTitle className="text-lg">Industry News & Trends</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Stay informed about jobs, skills, and opportunities</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {news.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg border border-border/50 hover:border-accent/50 transition hover:bg-accent/5 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 items-start mb-1">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded whitespace-nowrap ${getCategoryColor(item.category)}`}
                    >
                      {item.category.replace("-", " ").toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{item.source}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
