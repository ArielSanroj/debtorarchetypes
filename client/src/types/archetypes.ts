export type ArchetypeCategory = 'Autonomous' | 'Isolated' | 'Avoidant' | 'Impulsive';

export interface ArchetypeProfile {
  category: ArchetypeCategory;
  focus: string;
  traits: string[];
  challenges: string[];
  strategies: string[];
  communicationStyle: string[];
  tools: string[];
}

export const ARCHETYPE_PROFILES: Record<ArchetypeCategory, ArchetypeProfile> = {
  Autonomous: {
    category: 'Autonomous',
    focus: 'Solving problems, striving for success, growth, and mastery',
    traits: ['Achievement-driven', 'Analytical', 'Independent', 'Goal-oriented'],
    challenges: [
      'Overanalysis delays decisions',
      'Reluctance to seek help',
      'Perfectionist tendencies'
    ],
    strategies: [
      'Provide transparent, data-driven plans',
      'Offer self-service tools',
      'Emphasize incremental progress'
    ],
    communicationStyle: [
      'Transparent',
      'Factual',
      'Data-focused',
      'Non-intrusive but clear and direct'
    ],
    tools: [
      'Financial calculators',
      'Dashboards',
      'Educational guides',
      'Flexible repayment schedules'
    ]
  },
  Isolated: {
    category: 'Isolated',
    focus: 'Introspection, solitude, self-care, and personal space',
    traits: ['Value privacy', 'Introspective', 'Trustworthy once confidence is built'],
    challenges: [
      'Reluctance to engage',
      'Difficulty trusting new methods',
      'Resistance to change'
    ],
    strategies: [
      'Ensure privacy and security',
      'Offer anonymous, self-service tools',
      'Highlight trust, provide reflective content'
    ],
    communicationStyle: [
      'Discreet',
      'Secure',
      'Confidential',
      'Reflective, emphasizing long-term growth'
    ],
    tools: [
      'Secure online portals',
      'Anonymous webinars',
      'Private consultations',
      'Closed forums'
    ]
  },
  Avoidant: {
    category: 'Avoidant',
    focus: 'Comfort, relaxation, and escapism',
    traits: ['Calm', 'Optimistic', 'Harmony-seeking', 'Prefer simplicity'],
    challenges: [
      'Procrastination and avoidance',
      'Dislike of complexity',
      'Focus on short-term rewards'
    ],
    strategies: [
      'Keep solutions simple',
      'Offer immediate incentives',
      'Encourage small steps'
    ],
    communicationStyle: [
      'Positive',
      'Encouraging',
      'Stress-free',
      'Simple language with visual aids'
    ],
    tools: [
      'Flash promotions',
      'Step-up repayment plans',
      'Wellness-oriented financial sessions',
      'Community support forums'
    ]
  },
  Impulsive: {
    category: 'Impulsive',
    focus: 'Creativity, excitement, emotional connection, and exclusivity',
    traits: ['Energetic', 'Quick decision-makers', 'Adaptable', 'Enthusiastic'],
    challenges: [
      'Impulsivity leading to regret',
      'Low frustration tolerance',
      'Difficulty committing long-term'
    ],
    strategies: [
      'Use urgent, dynamic campaigns',
      'Offer immediate rewards',
      'Provide supportive follow-up'
    ],
    communicationStyle: [
      'Energetic',
      'Emotionally appealing',
      'Urgent calls-to-action',
      'Brief reflective prompts'
    ],
    tools: [
      'Flash sales',
      'Time-limited offers',
      'Gamified challenges',
      'Interactive events'
    ]
  }
};
