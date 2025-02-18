import type { ArchetypeCategory } from '../types/archetypes';

export interface DebtCampaignTemplate {
  archetype: ArchetypeCategory;
  primaryMessage: string;
  supportingPoints: string[];
  channels: string[];
  timing: string;
  incentives: string[];
  communicationStyle: string[];
  callToAction: string;
  followUpStrategy: string;
}

export const DEBT_CAMPAIGN_TEMPLATES: Record<ArchetypeCategory, DebtCampaignTemplate> = {
  Autonomous: {
    archetype: "Autonomous",
    primaryMessage: "Take Control of Your Financial Future with Data-Driven Solutions",
    supportingPoints: [
      "Personalized payment calculator showing exact impact on credit score",
      "Self-managed restructuring options with clear terms",
      "Direct access to account analytics and progress tracking",
      "Transparent fee structure and interest calculations"
    ],
    channels: [
      "Secure online portal",
      "Email with detailed PDF reports",
      "Interactive financial dashboard",
      "Mobile app with self-service tools"
    ],
    timing: "Weekly data-driven updates with monthly progress reports",
    incentives: [
      "Early settlement discount calculator",
      "Credit score improvement projections",
      "Fee reduction for consistent payments",
      "Self-service reward points"
    ],
    communicationStyle: [
      "Factual and data-focused",
      "Clear performance metrics",
      "Professional and direct",
      "Emphasis on control and choice"
    ],
    callToAction: "Review Your Custom Payment Solutions",
    followUpStrategy: "Automated progress reports and milestone notifications"
  },
  Isolative: {
    archetype: "Isolative",
    primaryMessage: "Confidential Financial Solutions on Your Terms",
    supportingPoints: [
      "Private online resolution options",
      "Anonymous financial counseling available",
      "Secure, non-intrusive payment arrangements",
      "Confidential account review process"
    ],
    channels: [
      "Private online portal",
      "Secure messaging system",
      "Anonymous chat support",
      "Encrypted document sharing"
    ],
    timing: "User-initiated interactions with scheduled private reviews",
    incentives: [
      "Private settlement options",
      "Discrete payment arrangements",
      "Confidential debt consolidation",
      "Personal progress tracking"
    ],
    communicationStyle: [
      "Respectful of privacy",
      "Non-intrusive communication",
      "Written confirmation only when requested",
      "Focus on security and confidentiality"
    ],
    callToAction: "Explore Private Resolution Options",
    followUpStrategy: "Scheduled secure updates based on user preferences"
  },
  Avoidant: {
    archetype: "Avoidant",
    primaryMessage: "Simple, Stress-Free Solutions for a Fresh Start",
    supportingPoints: [
      "Easy-to-follow payment plans",
      "No-pressure account review",
      "Simplified documentation process",
      "Positive financial guidance"
    ],
    channels: [
      "Friendly SMS reminders",
      "Simple email updates",
      "Easy-to-use mobile app",
      "Supportive chat system"
    ],
    timing: "Gentle reminders with positive reinforcement",
    incentives: [
      "Small wins celebration",
      "Gradual payment increases",
      "Early resolution bonuses",
      "Stress-free payment options"
    ],
    communicationStyle: [
      "Encouraging and supportive",
      "Simple, clear language",
      "Focus on positive progress",
      "Non-judgmental approach"
    ],
    callToAction: "Take Your First Easy Step",
    followUpStrategy: "Regular positive reinforcement and achievement celebrations"
  },
  Impulsive: {
    archetype: "Impulsive",
    primaryMessage: "Act Now for Exclusive Debt Resolution Benefits",
    supportingPoints: [
      "Limited-time settlement offers",
      "Immediate account resolution options",
      "Quick-start payment programs",
      "Instant approval process"
    ],
    channels: [
      "Push notifications",
      "SMS alerts",
      "Interactive mobile app",
      "Real-time chat support"
    ],
    timing: "Time-sensitive offers with immediate benefits",
    incentives: [
      "Instant settlement discounts",
      "Same-day payment rewards",
      "Quick resolution bonuses",
      "Immediate fee waivers"
    ],
    communicationStyle: [
      "Urgent and dynamic",
      "Emphasis on immediate benefits",
      "Clear deadlines",
      "Focus on quick wins"
    ],
    callToAction: "Claim Your Special Offer Now",
    followUpStrategy: "Regular flash offers and immediate reward notifications"
  }
};
