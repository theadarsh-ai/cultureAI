import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || ""
});

export interface CulturalAnalysisRequest {
  preferences: Record<string, any>;
  qlooData?: any;
}

export interface CulturalInsight {
  category: string;
  insight: string;
  culturalConnections: string[];
  recommendedExperiences: string[];
  confidence: number;
}

export async function generateCulturalInsights(data: CulturalAnalysisRequest): Promise<CulturalInsight[]> {
  try {
    // Reduce prompt size to avoid rate limits
    const preferenceSummary = Object.entries(data.preferences)
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
      .join('; ');
    
    const prompt = `
    Analyze these cultural preferences and provide insights in JSON format:
    
    Preferences: ${preferenceSummary}
    
    Return JSON with this structure:
    {
      "insights": [
        {
          "category": "music|food|travel",
          "insight": "cultural insight about patterns and connections",
          "culturalConnections": ["region/tradition names"],
          "recommendedExperiences": ["specific recommendations"],
          "confidence": 0.85
        }
      ]
    }
    
    Focus on cross-cultural patterns, geographic affinities, and authentic experiences.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a world-renowned cultural anthropologist and AI assistant specializing in cross-cultural analysis and personalized cultural recommendations. Provide thoughtful, accurate insights based on cultural data patterns."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 2000,
      temperature: 0.7
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.insights || [];
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate cultural insights");
  }
}

export async function generateCulturalStory(preferences: Record<string, any>, insights: CulturalInsight[]): Promise<string> {
  try {
    const prompt = `
    Create a compelling, personalized cultural narrative based on these preferences and insights:
    
    Preferences: ${JSON.stringify(preferences)}
    Cultural Insights: ${JSON.stringify(insights)}
    
    Write a 3-4 paragraph cultural story that:
    1. Explains the user's unique cultural DNA
    2. Connects their preferences to global cultural traditions
    3. Suggests a cultural journey or path of discovery
    4. Is engaging, personal, and inspiring
    
    Write in second person ("Your taste profile reveals...") and make it feel like a personalized cultural reading.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a master storyteller and cultural guide who creates personalized cultural narratives that help people understand their place in the global cultural landscape."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.8
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("OpenAI story generation error:", error);
    throw new Error("Failed to generate cultural story");
  }
}

export async function enhanceRecommendation(recommendation: any, userContext: Record<string, any>): Promise<string> {
  try {
    const prompt = `
    Enhance this cultural recommendation with personal context and deeper insights:
    
    Recommendation: ${JSON.stringify(recommendation)}
    User Context: ${JSON.stringify(userContext)}
    
    Provide a 2-3 sentence enhanced description that explains:
    1. Why this specifically matches the user's cultural profile
    2. What unique cultural value they'll gain from this experience
    3. How it connects to their broader cultural journey
    
    Be specific, personal, and culturally insightful.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a personalized cultural concierge who enhances recommendations with meaningful, personal context."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("OpenAI enhancement error:", error);
    return "";
  }
}
