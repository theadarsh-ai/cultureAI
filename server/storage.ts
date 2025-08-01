import { 
  type User, 
  type InsertUser,
  type CulturalProfile,
  type InsertCulturalProfile,
  type CulturalInsight,
  type InsertCulturalInsight,
  type Recommendation,
  type InsertRecommendation,
  type QuestionnaireResponse,
  type InsertQuestionnaireResponse
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Cultural Profiles
  getCulturalProfile(userId: string): Promise<CulturalProfile | undefined>;
  getCulturalProfileById(id: string): Promise<CulturalProfile | undefined>;
  createCulturalProfile(profile: InsertCulturalProfile): Promise<CulturalProfile>;
  updateCulturalProfile(id: string, updates: Partial<CulturalProfile>): Promise<CulturalProfile>;
  
  // Cultural Insights
  getCulturalInsights(profileId: string): Promise<CulturalInsight[]>;
  createCulturalInsight(insight: InsertCulturalInsight): Promise<CulturalInsight>;
  
  // Recommendations
  getRecommendations(profileId: string, limit?: number): Promise<Recommendation[]>;
  createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation>;
  updateRecommendation(id: string, updates: Partial<Recommendation>): Promise<Recommendation>;
  
  // Questionnaire Responses
  getQuestionnaireResponses(profileId: string): Promise<QuestionnaireResponse[]>;
  createQuestionnaireResponse(response: InsertQuestionnaireResponse): Promise<QuestionnaireResponse>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private culturalProfiles: Map<string, CulturalProfile>;
  private culturalInsights: Map<string, CulturalInsight>;
  private recommendations: Map<string, Recommendation>;
  private questionnaireResponses: Map<string, QuestionnaireResponse>;

  constructor() {
    this.users = new Map();
    this.culturalProfiles = new Map();
    this.culturalInsights = new Map();
    this.recommendations = new Map();
    this.questionnaireResponses = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getCulturalProfile(userId: string): Promise<CulturalProfile | undefined> {
    return Array.from(this.culturalProfiles.values()).find(profile => profile.userId === userId);
  }

  async getCulturalProfileById(id: string): Promise<CulturalProfile | undefined> {
    return this.culturalProfiles.get(id);
  }

  async createCulturalProfile(insertProfile: InsertCulturalProfile): Promise<CulturalProfile> {
    const id = randomUUID();
    const profile: CulturalProfile = { 
      ...insertProfile, 
      id,
      culturalDNA: insertProfile.culturalDNA || null,
      lastUpdated: new Date()
    };
    this.culturalProfiles.set(id, profile);
    return profile;
  }

  async updateCulturalProfile(id: string, updates: Partial<CulturalProfile>): Promise<CulturalProfile> {
    const existing = this.culturalProfiles.get(id);
    if (!existing) {
      throw new Error("Cultural profile not found");
    }
    const updated = { 
      ...existing, 
      ...updates, 
      lastUpdated: new Date() 
    };
    this.culturalProfiles.set(id, updated);
    return updated;
  }

  async getCulturalInsights(profileId: string): Promise<CulturalInsight[]> {
    return Array.from(this.culturalInsights.values())
      .filter(insight => insight.profileId === profileId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createCulturalInsight(insertInsight: InsertCulturalInsight): Promise<CulturalInsight> {
    const id = randomUUID();
    const insight: CulturalInsight = { 
      ...insertInsight, 
      id,
      source: insertInsight.source || 'ai',
      createdAt: new Date()
    };
    this.culturalInsights.set(id, insight);
    return insight;
  }

  async getRecommendations(profileId: string, limit = 20): Promise<Recommendation[]> {
    return Array.from(this.recommendations.values())
      .filter(rec => rec.profileId === profileId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
  }

  async createRecommendation(insertRecommendation: InsertRecommendation): Promise<Recommendation> {
    const id = randomUUID();
    const recommendation: Recommendation = { 
      ...insertRecommendation, 
      id,
      metadata: insertRecommendation.metadata || null,
      location: insertRecommendation.location || null,
      imageUrl: insertRecommendation.imageUrl || null,
      externalId: insertRecommendation.externalId || null,
      matchPercentage: insertRecommendation.matchPercentage || null,
      isBookmarked: insertRecommendation.isBookmarked || false,
      createdAt: new Date()
    };
    this.recommendations.set(id, recommendation);
    return recommendation;
  }

  async updateRecommendation(id: string, updates: Partial<Recommendation>): Promise<Recommendation> {
    const existing = this.recommendations.get(id);
    if (!existing) {
      throw new Error("Recommendation not found");
    }
    const updated = { ...existing, ...updates };
    this.recommendations.set(id, updated);
    return updated;
  }

  async getQuestionnaireResponses(profileId: string): Promise<QuestionnaireResponse[]> {
    return Array.from(this.questionnaireResponses.values())
      .filter(response => response.profileId === profileId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createQuestionnaireResponse(insertResponse: InsertQuestionnaireResponse): Promise<QuestionnaireResponse> {
    const id = randomUUID();
    const response: QuestionnaireResponse = { 
      ...insertResponse, 
      id,
      createdAt: new Date()
    };
    this.questionnaireResponses.set(id, response);
    return response;
  }
}

export const storage = new MemStorage();
