import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { qlooService } from "./services/qloo";
import { generateCulturalInsights, generateCulturalStory, enhanceRecommendation } from "./services/openai";
import { insertUserSchema, insertCulturalProfileSchema, insertQuestionnaireResponseSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid user data" });
    }
  });

  app.get("/api/users/:email", async (req, res) => {
    try {
      const user = await storage.getUserByEmail(req.params.email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // Cultural Profile routes
  app.post("/api/cultural-profiles", async (req, res) => {
    try {
      const profileData = insertCulturalProfileSchema.parse(req.body);
      const profile = await storage.createCulturalProfile(profileData);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid profile data" });
    }
  });

  app.get("/api/cultural-profiles/user/:userId", async (req, res) => {
    try {
      const profile = await storage.getCulturalProfile(req.params.userId);
      if (!profile) {
        return res.status(404).json({ error: "Cultural profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cultural profile" });
    }
  });

  app.patch("/api/cultural-profiles/:id", async (req, res) => {
    try {
      const updates = req.body;
      const profile = await storage.updateCulturalProfile(req.params.id, updates);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update profile" });
    }
  });

  // Questionnaire routes
  app.post("/api/questionnaire/submit", async (req, res) => {
    try {
      const { profileId, responses } = req.body;
      
      if (!profileId || !responses || !Array.isArray(responses)) {
        return res.status(400).json({ error: "Profile ID and responses array required" });
      }

      // Save questionnaire responses
      const savedResponses = [];
      for (const response of responses) {
        const responseData = insertQuestionnaireResponseSchema.parse({
          profileId,
          questionId: response.questionId,
          response: response.answer
        });
        const saved = await storage.createQuestionnaireResponse(responseData);
        savedResponses.push(saved);
      }

      // Process responses to update cultural profile
      const preferences: Record<string, any> = {};
      responses.forEach((r: any) => {
        if (r.questionId === 'music-genres') {
          preferences.music = r.answer;
        } else if (r.questionId === 'food-cuisines') {
          preferences.food = r.answer;
        } else if (r.questionId === 'travel-destinations') {
          preferences.travel = r.answer;
        } else if (r.questionId === 'art-styles') {
          preferences.art = r.answer;
        } else if (r.questionId === 'lifestyle') {
          preferences.lifestyle = r.answer;
        }
      });

      // Get Qloo cultural affinities
      const qlooData = await qlooService.getCulturalAffinities(preferences);

      // Generate AI insights
      const aiInsights = await generateCulturalInsights({ preferences, qlooData });

      // Update cultural profile
      const completionPercentage = Math.min(100, (responses.length / 5) * 100);
      await storage.updateCulturalProfile(profileId, {
        preferences,
        culturalDNA: {
          insights: aiInsights,
          qlooAffinities: qlooData.culturalAffinities,
          totalEntities: qlooData.totalEntities
        },
        completionPercentage
      });

      // Save insights to database
      for (const insight of aiInsights) {
        await storage.createCulturalInsight({
          profileId,
          category: insight.category,
          insightText: insight.insight,
          matchPercentage: Math.round(insight.confidence * 100),
          source: 'hybrid'
        });
      }

      res.json({ 
        success: true, 
        responses: savedResponses,
        insights: aiInsights,
        completionPercentage 
      });
    } catch (error) {
      console.error("Questionnaire submission error:", error);
      res.status(500).json({ error: "Failed to process questionnaire responses" });
    }
  });

  // Cultural Insights routes
  app.get("/api/cultural-insights/:profileId", async (req, res) => {
    try {
      const insights = await storage.getCulturalInsights(req.params.profileId);
      res.json(insights);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cultural insights" });
    }
  });

  app.post("/api/cultural-insights/generate", async (req, res) => {
    try {
      const { profileId } = req.body;
      const profile = await storage.getCulturalProfileById(profileId);
      
      if (!profile) {
        return res.status(404).json({ error: "Cultural profile not found" });
      }

      const culturalDNA = profile.culturalDNA as any;
      const story = await generateCulturalStory(profile.preferences as Record<string, any>, culturalDNA?.insights || []);
      res.json({ story });
    } catch (error) {
      console.error("Story generation error:", error);
      res.status(500).json({ error: "Failed to generate cultural story" });
    }
  });

  // Recommendations routes
  app.get("/api/recommendations/:profileId", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
      const recommendations = await storage.getRecommendations(req.params.profileId, limit);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recommendations" });
    }
  });

  app.post("/api/recommendations/generate", async (req, res) => {
    try {
      const { profileId } = req.body;
      const profile = await storage.getCulturalProfileById(profileId);
      
      if (!profile) {
        return res.status(404).json({ error: "Cultural profile not found" });
      }

      // Get Qloo recommendations
      const qlooRecs = await qlooService.generateCrossRecommendations(profile.preferences as Record<string, any>);
      
      const savedRecommendations = [];
      
      // Process and save recommendations
      for (const rec of qlooRecs.slice(0, 15)) {
        try {
          // Enhance recommendation with AI
          const enhancedDescription = await enhanceRecommendation(rec, profile.preferences as Record<string, any>);
          
          const recommendation = await storage.createRecommendation({
            profileId,
            title: rec.name || rec.title || "Cultural Discovery",
            description: enhancedDescription || rec.description || "Discover something new",
            category: rec.category || rec.domain || "experience",
            matchPercentage: Math.round(Math.random() * 20 + 80), // 80-100% match
            location: rec.location || rec.city || rec.country,
            imageUrl: rec.image || rec.imageUrl,
            externalId: rec.id,
            metadata: rec
          });
          
          savedRecommendations.push(recommendation);
        } catch (recError) {
          console.error("Error processing recommendation:", recError);
        }
      }

      res.json({ recommendations: savedRecommendations });
    } catch (error) {
      console.error("Recommendation generation error:", error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  app.patch("/api/recommendations/:id/bookmark", async (req, res) => {
    try {
      const { isBookmarked } = req.body;
      const recommendation = await storage.updateRecommendation(req.params.id, { isBookmarked });
      res.json(recommendation);
    } catch (error) {
      res.status(400).json({ error: "Failed to update bookmark status" });
    }
  });

  // Qloo integration routes
  app.get("/api/qloo/search", async (req, res) => {
    try {
      const { query, categories } = req.query;
      if (!query) {
        return res.status(400).json({ error: "Query parameter required" });
      }

      const categoryList = categories ? (categories as string).split(',') : undefined;
      const result = await qlooService.search(query as string, categoryList);
      
      if (result.error) {
        return res.status(500).json(result);
      }
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Qloo search failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
