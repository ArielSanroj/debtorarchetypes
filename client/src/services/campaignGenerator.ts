import { ArchetypeProfile, ArchetypeCategory } from '../types/archetypes';

export interface CampaignTemplate {
  title: string;
  description: string;
  strategy: string;
  cta: string;
  channels: string[];
  content: string[];
}

export const generateCampaign = (
  profile: ArchetypeProfile,
  score: number
): CampaignTemplate => {
  const templates: Record<ArchetypeCategory, CampaignTemplate> = {
    Autonomous: {
      title: "Data-Driven Financial Solutions",
      description: "Take control of your financial future with transparent, efficient solutions",
      strategy: "Self-service, data-focused approach with clear metrics",
      cta: "Analyze Your Options",
      channels: ["Email", "Dashboard", "Financial Calculator"],
      content: [
        "ROI Analysis",
        "Payment Schedule Calculator",
        "Credit Score Impact Report",
        "Self-Service Portal Guide"
      ]
    },
    Isolated: {
      title: "Secure, Private Financial Planning",
      description: "Manage your finances privately with our secure, confidential tools",
      strategy: "Privacy-focused, minimal-interaction approach",
      cta: "Explore Privately",
      channels: ["Secure Portal", "Private Dashboard", "Anonymous Chat"],
      content: [
        "Privacy Guarantee",
        "Secure Self-Service Tools",
        "Anonymous Consultation Options",
        "Private Payment Portal"
      ]
    },
    Avoidant: {
      title: "Simple Steps to Financial Freedom",
      description: "Easy, stress-free solutions to achieve your financial goals",
      strategy: "Simplified, positive reinforcement approach",
      cta: "Start Simply",
      channels: ["SMS", "Mobile App", "Friendly Email"],
      content: [
        "Quick-Start Guide",
        "Simple Payment Options",
        "Stress-Free Solutions",
        "Positive Progress Tracker"
      ]
    },
    Impulsive: {
      title: "Limited Time Financial Opportunities",
      description: "Act now to secure exclusive financial benefits and rewards",
      strategy: "Urgent, reward-focused approach",
      cta: "Claim Now",
      channels: ["Push Notifications", "Social Media", "SMS"],
      content: [
        "Flash Offers",
        "Instant Rewards Program",
        "Quick Decision Guide",
        "Exclusive Benefits Timer"
      ]
    }
  };

  return templates[profile.category];
};
