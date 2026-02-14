"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { toast } from "sonner"

export function CommunitySection() {
  const [posts, setPosts] = useState<any[]>([])
  const [newPost, setNewPost] = useState("")
  const [category, setCategory] = useState("advice")
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const supabase = createClient()

  const categories = ["advice", "career", "anxiety", "success-story", "skill-share"]

  const handlePostSubmit = async () => {
    if (!newPost.trim()) {
      toast.error("Please write something")
      return
    }

    setIsLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast.error("You must be logged in")
        return
      }

      const { error } = await supabase.from("community_posts").insert({
        user_id: user.id,
        title: newPost.substring(0, 60),
        content: newPost,
        category,
        anonymous: true,
      })

      if (error) throw error

      toast.success("Post shared with the community!")
      setNewPost("")
      setShowForm(false)

      // Reload posts
      loadPosts()
    } catch (error) {
      toast.error("Failed to post")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadPosts = async () => {
    const { data } = await supabase
      .from("community_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)

    setPosts(data || [])
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-secondary/20">
      <CardHeader>
        <CardTitle className="text-lg">Anonymous Community Room</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Share concerns, celebrate wins, and support each other</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showForm ? (
          <Button
            onClick={() => setShowForm(true)}
            className="w-full bg-secondary hover:bg-secondary/90"
            variant="default"
          >
            Share Your Story (Anonymous)
          </Button>
        ) : (
          <div className="space-y-3 p-3 bg-muted/20 rounded-lg border border-border/50">
            <div className="space-y-2">
              <label className="text-xs font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 rounded border border-border text-sm bg-input"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace("-", " ").toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              placeholder="What's on your mind? (Shared anonymously)"
              className="w-full p-2 rounded border border-border text-sm bg-input focus:ring-2 focus:ring-secondary outline-none"
              rows={3}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setShowForm(false)
                  setNewPost("")
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-secondary hover:bg-secondary/90"
                onClick={handlePostSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="p-2 bg-muted/20 rounded-lg border border-border/50 text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-secondary mb-1">{post.category.toUpperCase()}</p>
                    <p className="text-foreground/80 text-xs leading-relaxed">{post.content}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Anonymous • Just now</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground text-center py-4">Be the first to share your story</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
