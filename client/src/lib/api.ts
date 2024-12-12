import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { BorrowerProfile, CampaignStatus, ChannelType } from '@db/schema';

interface Borrower {
  id: number;
  name: string;
  email: string;
  phone?: string;
  profile: BorrowerProfile;
  riskScore: number;
  loanAmount: number;
  daysOverdue: number;
  metadata?: Record<string, any>;
}

interface Campaign {
  id: number;
  name: string;
  archetype: BorrowerProfile;
  headline: string;
  description: string;
  cta: string;
  content: string[];
  createdAt: Date;
}

interface Stats {
  totalBorrowers: number;
  totalOverdue: number;
  avgRiskScore: number;
  profileDistribution: Record<BorrowerProfile, number>;
}

interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalRecovered: number;
  totalEngaged: number;
}

export function useBorrowers() {
  return useQuery<Borrower[]>({
    queryKey: ['/api/borrowers'],
    queryFn: async () => {
      const res = await fetch('/api/borrowers');
      if (!res.ok) throw new Error('Failed to fetch borrowers');
      return res.json();
    }
  });
}

export function useBorrowerStats() {
  return useQuery<Stats>({
    queryKey: ['/api/borrowers/stats'],
    queryFn: async () => {
      const res = await fetch('/api/borrowers/stats');
      if (!res.ok) throw new Error('Failed to fetch borrower stats');
      return res.json();
    }
  });
}

export function useCampaigns() {
  return useQuery<Campaign[]>({
    queryKey: ['/api/campaigns'],
    queryFn: async () => {
      const res = await fetch('/api/campaigns');
      if (!res.ok) throw new Error('Failed to fetch campaigns');
      return res.json();
    }
  });
}

export function useCampaignStats() {
  return useQuery<CampaignStats>({
    queryKey: ['/api/campaigns/stats'],
    queryFn: async () => {
      const res = await fetch('/api/campaigns/stats');
      if (!res.ok) throw new Error('Failed to fetch campaign stats');
      return res.json();
    }
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (campaign: Omit<Campaign, 'id'>) => {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaign),
      });
      
      if (!res.ok) {
        throw new Error('Failed to create campaign');
      }
      
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns/stats'] });
    },
  });
}
