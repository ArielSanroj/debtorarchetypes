import { Express } from "express";
import { createServer } from "http";
import { db } from "../db";
import { borrowers, campaigns, campaignResults } from "@db/schema";
import { desc, sql } from "drizzle-orm";

export function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  // Borrowers API
  app.get("/api/borrowers", async (_req, res) => {
    try {
      const result = await db.select().from(borrowers).orderBy(desc(borrowers.createdAt));
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch borrowers" });
    }
  });

  app.get("/api/borrowers/stats", async (_req, res) => {
    try {
      // Get basic stats
      const [basicStats] = await db.select({
        totalBorrowers: sql<number>`count(*)`,
        totalOverdue: sql<number>`COALESCE(sum(loan_amount), 0)`,
        avgRiskScore: sql<number>`COALESCE(avg(risk_score), 0)`,
      }).from(borrowers);

      // Get profile distribution separately
      const profileCounts = await db.select({
        profile: borrowers.profile,
        count: sql<number>`count(*)`
      })
      .from(borrowers)
      .groupBy(borrowers.profile);

      const profileDistribution = Object.fromEntries(
        profileCounts.map(({ profile, count }) => [profile, count])
      );

      const stats = {
        ...basicStats,
        profileDistribution,
      };

      res.json(stats[0] || {
        totalBorrowers: 0,
        totalOverdue: 0,
        avgRiskScore: 0,
        profileDistribution: {}
      });
    } catch (error) {
      console.error('Failed to fetch borrower stats:', error);
      res.status(500).json({ error: "Failed to fetch borrower stats" });
    }
  });

  // Campaigns API
  app.get("/api/campaigns", async (_req, res) => {
    try {
      const result = await db.select().from(campaigns).orderBy(desc(campaigns.createdAt));
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    try {
      const campaign = {
        name: req.body.name,
        archetype: req.body.archetype,
        headline: req.body.headline,
        description: req.body.description,
        cta: req.body.cta,
        content: req.body.content,
      };

      const [newCampaign] = await db.insert(campaigns).values(campaign).returning();
      res.json(newCampaign);
    } catch (error) {
      console.error('Failed to create campaign:', error);
      res.status(500).json({ error: "Failed to create campaign" });
    }
  });

  app.get("/api/campaigns/stats", async (_req, res) => {
    try {
      // First get total campaigns count
      const [campaignCount] = await db.select({
        count: sql<number>`count(*)`
      }).from(campaigns);

      // Then get recovery and engagement stats
      const [results] = await db.select({
        totalRecovered: sql<number>`COALESCE(sum(recovered), 0)`,
        totalEngaged: sql<number>`count(*) filter (where engaged = true)`
      }).from(campaignResults);

      const stats = {
        totalCampaigns: campaignCount?.count || 0,
        totalRecovered: results?.totalRecovered || 0,
        totalEngaged: results?.totalEngaged || 0,
      };

      res.json(stats[0] || {
        totalCampaigns: 0,
        totalRecovered: 0,
        totalEngaged: 0
      });
    } catch (error) {
      console.error('Failed to fetch campaign stats:', error);
      res.status(500).json({ error: "Failed to fetch campaign stats" });
    }
  });

  return httpServer;
}
