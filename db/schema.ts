import { pgTable, text, serial, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export type BorrowerProfile = 'autonomous' | 'isolated' | 'avoidant' | 'impulsive';
export type CampaignStatus = 'draft' | 'active' | 'completed' | 'cancelled';
export type ChannelType = 'email' | 'sms' | 'phone' | 'app';

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
  description: text("description"),
  targetProfile: text("target_profile").$type<BorrowerProfile>().notNull(),
  status: text("status").$type<CampaignStatus>().notNull().default('draft'),
  channels: json("channels").$type<ChannelType[]>().notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  metadata: json("metadata").$type<Record<string, any>>(),
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
