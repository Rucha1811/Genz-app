import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { interests, skills, personality } = await request.json()

    if (!interests || !skills) {
      return Response.json({ error: "Invalid input" }, { status: 400 })
    }

    const { text } = await generateText({
      model: "openai/gpt-4o",
      system: `You are a career advisor for Gen-Z. Analyze interests and skills to suggest future-proof careers. Respond in JSON with:
{
  "careers": [
    {
      "title": "career name",
      "description": "2-3 sentence description",
      "growth_trend": "High/Medium/Low",
      "why_fit": "why this matches the user",
      "salary_range": "estimated range",
      "ai_risk": "Low/Medium/High - risk of automation"
    }
  ],
  "skills_to_develop": ["skill1", "skill2", "skill3"],
  "roadmap": "2-3 sentence actionable path"
}`,
      prompt: `Suggest future-proof careers for someone with:
- Interests: ${interests}
- Skills: ${skills}
- Personality: ${personality}`,
      temperature: 0.7,
      maxTokens: 1200,
    })

    try {
      return Response.json(JSON.parse(text))
    } catch {
      return Response.json({
        careers: [
          {
            title: "Tech-Adjacent Career",
            description: text,
            growth_trend: "High",
            why_fit: "Based on your interests",
            salary_range: "$60k-$120k+",
            ai_risk: "Low",
          },
        ],
        skills_to_develop: ["AI tools", "Data analysis", "Communication"],
        roadmap: "Focus on adaptability and continuous learning in evolving tech landscape.",
      })
    }
  } catch (error) {
    console.error("Career analysis error:", error)
    return Response.json({ error: "Failed to analyze career path" }, { status: 500 })
  }
}
