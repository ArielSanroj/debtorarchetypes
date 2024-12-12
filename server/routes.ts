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
      const stats = await db.select({
        totalBorrowers: sql<number>`count(*)`,
        totalOverdue: sql<number>`sum(loan_amount)`,
        avgRiskScore: sql<number>`avg(risk_score)`,
        profileDistribution: sql<Record<string, number>>`
          json_object_agg(
            profile,
            count(*)
          )
        `
      }).from(borrowers);

      res.json(stats[0]);
    } catch (error) {
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
      const [campaign] = await db.insert(campaigns).values(req.body).returning();
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to create campaign" });
    }
  });

  app.get("/api/campaigns/stats", async (_req, res) => {
    try {
      const stats = await db.select({
        totalCampaigns: sql<number>`count(*)`,
        activeCampaigns: sql<number>`count(*) filter (where status = 'active')`,
        completedCampaigns: sql<number>`count(*) filter (where status = 'completed')`,
        totalRecovered: sql<number>`sum(cr.recovered)`,
        totalEngaged: sql<number>`count(*) filter (where cr.engaged = true)`
      })
      .from(campaigns)
      .leftJoin(campaignResults, sql`true`);

      res.json(stats[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaign stats" });
    }
  });

  return httpServer;
}
