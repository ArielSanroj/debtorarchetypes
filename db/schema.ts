import { pgTable, text, serial, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export type BorrowerProfile = 'autonomous' | 'isolated' | 'avoidant' | 'impulsive';
export type CampaignStatus = 'draft' | 'active' | 'completed' | 'cancelled';
export type ChannelType = 'email' | 'sms' | 'phone' | 'app';

// Zod schemas for validation
import { z } from 'zod';

export const borrowerProfileEnum = z.enum(['autonomous', 'isolated', 'avoidant', 'impulsive']);
export const campaignStatusEnum = z.enum(['draft', 'active', 'completed', 'cancelled']);
export const channelTypeEnum = z.enum(['email', 'sms', 'phone', 'app']);

export const borrowers = pgTable("borrowers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  profile: text("profile").$type<BorrowerProfile>().notNull(),
  riskScore: integer("risk_score").notNull(),
  loanAmount: integer("loan_amount").notNull(),
  daysOverdue: integer("days_overdue").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  metadata: json("metadata").$type<Record<string, any>>(),
});

export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  archetype: text("archetype").$type<BorrowerProfile>().notNull(),
  headline: text("headline").notNull(),
  description: text("description").notNull(),
  cta: text("cta").notNull(),
  content: text("content").array().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const campaignResults = pgTable("campaign_results", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => campaigns.id),
  borrowerId: integer("borrower_id").references(() => borrowers.id),
  engaged: boolean("engaged").notNull().default(false),
  recovered: integer("recovered"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBorrowerSchema = createInsertSchema(borrowers);
export const selectBorrowerSchema = createSelectSchema(borrowers);
export const insertCampaignSchema = createInsertSchema(campaigns);
export const selectCampaignSchema = createSelectSchema(campaigns);
export const insertCampaignResultSchema = createInsertSchema(campaignResults);
export const selectCampaignResultSchema = createSelectSchema(campaignResults);
