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
    headline: "Engineered for Financial Success",
    description: "Take control of your financial future with our tailored lending solutions",
    cta: "Explore Options",
    content: [
      "Highlight ROI and financial benefits",
      "Focus on growth opportunities",
      "Showcase success metrics"
    ],
    minScore: 30
  },
  {
    archetype: "Impulsive",
    headline: "Limited Time Lending Opportunities",
    description: "Don't miss out on exclusive rates and special offers",
    cta: "Act Now",
    content: [
      "Emphasize time-sensitive offers",
      "Showcase exclusive benefits",
      "Feature testimonials from satisfied customers"
    ],
    minScore: 30
  },
  {
    archetype: "Avoidant",
    headline: "Stress-Free Lending Solutions",
    description: "Simple, transparent, and hassle-free loan options",
    cta: "Learn More",
    content: [
      "Highlight easy application process",
      "Emphasize customer support",
      "Focus on simplicity and transparency"
    ],
    minScore: 30
  },
  {
    archetype: "Isolative",
    headline: "Personal Space for Financial Planning",
    description: "Take your time to explore options at your own pace",
    cta: "Browse Privately",
    content: [
      "Emphasize self-service options",
      "Focus on privacy and security",
      "Provide detailed online resources"
    ],
    minScore: 30
  }
];
