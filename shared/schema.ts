import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const culturalProfiles = pgTable("cultural_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  preferences: jsonb("preferences").notNull(),
  culturalDNA: jsonb("cultural_dna").default(null),
  completionPercentage: integer("completion_percentage").default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const culturalInsights = pgTable("cultural_insights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").notNull().references(() => culturalProfiles.id),
  category: text("category").notNull(), // music, food, travel, etc.
  insightText: text("insight_text").notNull(),
  matchPercentage: integer("match_percentage"),
  source: text("source"), // qloo, openai, or hybrid
  createdAt: timestamp("created_at").defaultNow(),
});

export const recommendations = pgTable("recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").notNull().references(() => culturalProfiles.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  matchPercentage: integer("match_percentage"),
  location: text("location"),
  imageUrl: text("image_url"),
  externalId: text("external_id"), // Qloo entity ID
  metadata: jsonb("metadata"),
  isBookmarked: boolean("is_bookmarked").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const questionnaireResponses = pgTable("questionnaire_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").notNull().references(() => culturalProfiles.id),
  questionId: text("question_id").notNull(),
  response: jsonb("response").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCulturalProfileSchema = createInsertSchema(culturalProfiles).omit({
  id: true,
  lastUpdated: true,
});

export const insertCulturalInsightSchema = createInsertSchema(culturalInsights).omit({
  id: true,
  createdAt: true,
});

export const insertRecommendationSchema = createInsertSchema(recommendations).omit({
  id: true,
  createdAt: true,
});

export const insertQuestionnaireResponseSchema = createInsertSchema(questionnaireResponses).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type CulturalProfile = typeof culturalProfiles.$inferSelect;
export type InsertCulturalProfile = z.infer<typeof insertCulturalProfileSchema>;

export type CulturalInsight = typeof culturalInsights.$inferSelect;
export type InsertCulturalInsight = z.infer<typeof insertCulturalInsightSchema>;

export type Recommendation = typeof recommendations.$inferSelect;
export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;

export type QuestionnaireResponse = typeof questionnaireResponses.$inferSelect;
export type InsertQuestionnaireResponse = z.infer<typeof insertQuestionnaireResponseSchema>;
