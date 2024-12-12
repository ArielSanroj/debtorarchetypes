export type ArchetypeScore = {
  Autonomous: number;
  Impulsive: number;
  Avoidant: number;
  Isolative: number;
};

export type Campaign = {
  id: string;
  name: string;
  archetype: keyof ArchetypeScore;
  headline: string;
  description: string;
  cta: string;
  content: string[];
  createdAt: Date;
};

export type CampaignTemplate = {
  archetype: keyof ArchetypeScore;
  headline: string;
  description: string;
  cta: string;
  content: string[];
  minScore: number;
};

export const CAMPAIGN_TEMPLATES: CampaignTemplate[] = [
  {
    archetype: "Autonomous",
    headline: "Data-Driven Financial Recovery Plan",
    description: "Take control with our transparent, goal-oriented recovery solutions backed by analytics",
    cta: "View Your Plan",
    content: [
      "Access your personalized financial dashboard",
      "Track progress with real-time metrics",
      "Flexible self-service repayment tools",
      "Educational resources for financial growth"
    ],
    minScore: 30
  },
  {
    archetype: "Impulsive",
    headline: "Quick Action, Immediate Benefits",
    description: "Unlock exclusive benefits today with our rapid recovery program",
    cta: "Claim Now",
    content: [
      "Limited-time repayment incentives",
      "Interactive payment calculator",
      "Instant approval on payment plans",
      "Exclusive rewards for quick action"
    ],
    minScore: 30
  },
  {
    archetype: "Avoidant",
    headline: "Stress-Free Path to Financial Freedom",
    description: "Simple, positive steps towards resolving your loan - no pressure, no complexity",
    cta: "Start Easy",
    content: [
      "Simple step-by-step guidance",
      "Flexible, small-payment options",
      "Positive progress celebrations",
      "Supportive, no-pressure assistance"
    ],
    minScore: 30
  },
  {
    archetype: "Isolative",
    headline: "Private & Secure Financial Recovery",
    description: "Resolve your loan privately with our secure, confidential recovery platform",
    cta: "Access Privately",
    content: [
      "100% private online portal",
      "Secure self-service options",
      "Anonymous financial consultation",
      "Confidential payment arrangements"
    ],
    minScore: 30
  }
];
