import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { thoughts } = await request.json()

    if (!thoughts || typeof thoughts !== "string") {
      return Response.json({ error: "Invalid input" }, { status: 400 })
    }

    const systemPrompt = `You are a compassionate mental health AI assistant designed for Gen-Z users dealing with overthinking and career anxiety. Your role is to:

1. Identify overthinking patterns and anxiety loops in the user's thoughts
2. Pinpoint specific triggers (future fear, perfectionism, comparison, etc.)
3. Provide reframed perspectives
4. Suggest grounding techniques and actionable steps

Format your response as JSON with these keys:
{
  "patterns": ["list of identified overthinking patterns"],
  "triggers": ["list of emotional triggers"],
  "reframed_thoughts": ["positive reframed perspective"],
  "grounding_techniques": ["3-5 specific techniques to try now"],
  "action_steps": ["2-3 small, manageable actions today"],
  "confidence_boost": "an encouraging, realistic statement"
}

Be empathetic, practical, and gen-z friendly. Use conversational language.`

    const { text } = await generateText({
      model: "openai/gpt-4o",
      system: systemPrompt,
      prompt: `Please analyze these anxious thoughts: "${thoughts}"`,
      temperature: 0.7,
      maxTokens: 1000,
    })

    // Parse the JSON response
    try {
      const analysis = JSON.parse(text)
      return Response.json(analysis)
    } catch {
      // If parsing fails, return the raw text in a structured format
      return Response.json({
        patterns: ["Complex overthinking pattern detected"],
        triggers: ["Multiple stress factors identified"],
        reframed_thoughts: [text],
        grounding_techniques: [
          "5-4-3-2-1 grounding: name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste",
          "Box breathing: 4 counts in, hold 4, out 4, hold 4",
          "Body scan: notice physical sensations without judgment",
        ],
        action_steps: ["Take a 5-minute break", "Write down one small task", "Reach out to someone"],
        confidence_boost: text,
      })
    }
  } catch (error) {
    console.error("Error in overthinking analyzer:", error)
    return Response.json({ error: "Failed to analyze thoughts" }, { status: 500 })
  }
}
