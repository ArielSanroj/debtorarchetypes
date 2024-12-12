import { Users, BanknoteIcon, Timer, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useBorrowerStats, useCampaignStats } from "@/lib/api";
import type { BorrowerProfile } from "@db/schema";

// Profile descriptions from the archetype table
const profileDescriptions: Record<BorrowerProfile, string> = {
  autonomous: "Achievement-driven, ambitious. Focus on solving problems and striving for success.",
  impulsive: "Trendy, emotionally expressive. Focus on creativity and emotional connection.",
  avoidant: "Calm, stress-free. Focus on comfort and relaxation.",
  isolated: "Thoughtful, peaceful. Focus on introspection and personal space.",
} as const;

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ComponentType<any>;
}

function StatsCard({ title, value, description, icon: Icon }: StatsCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between space-x-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-semibold">{value}</h3>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {Icon && <Icon className="h-8 w-8 text-muted-foreground" />}
      </div>
    </Card>
  );
}

interface ProfileDistributionData {
  [K in BorrowerProfile]?: number;
}

function ProfileDistribution({ data }: { data: ProfileDistributionData }) {
  if (!data) return null;
  const total = Object.values(data).reduce((a, b) => a + (b || 0), 0);

  return (
    <Card className="p-6 col-span-3">
      <h3 className="font-semibold mb-4">Borrower Profiles</h3>
      <div className="space-y-4">
        {(Object.entries(data) as [BorrowerProfile, number][]).map(([profile, count]) => (
          <div key={profile} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium capitalize">{profile}</span>
              <span className="text-muted-foreground">
                {((count / total) * 100).toFixed(1)}% ({count})
              </span>
            </div>
            <Progress value={(count / total) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {profileDescriptions[profile]}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

interface CampaignStatsData {
  activeCampaigns: number;
  totalCampaigns: number;
  totalRecovered: number;
  totalEngaged: number;
}

function CampaignStats({ data }: { data: CampaignStatsData }) {
  if (!data) return null;
  
  return (
    <Card className="p-6 col-span-2">
      <h3 className="font-semibold mb-4">Campaign Performance</h3>
      <div className="space-y-4">
        <div className="grid gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
            <p className="text-2xl font-semibold">{data.activeCampaigns}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Recovered</p>
            <p className="text-2xl font-semibold">${data.totalRecovered?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
            <p className="text-2xl font-semibold">
              {((data.totalEngaged / data.totalCampaigns) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const { data: borrowerStats, isLoading: loadingBorrowers } = useBorrowerStats();
  const { data: campaignStats, isLoading: loadingCampaigns } = useCampaignStats();

  if (loadingBorrowers || loadingCampaigns) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Skeleton className="h-96 col-span-3" />
          <Skeleton className="h-96 col-span-2" />
        </div>
      </div>
    );
  }

  if (!borrowerStats || !campaignStats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-muted-foreground">Error loading dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Borrowers"
          value={borrowerStats.totalBorrowers.toLocaleString()}
          icon={Users}
        />
        <StatsCard
          title="Total Overdue"
          value={`$${borrowerStats.totalOverdue.toLocaleString()}`}
          icon={BanknoteIcon}
        />
        <StatsCard
          title="Avg Risk Score"
          value={borrowerStats.avgRiskScore.toFixed(1)}
          icon={Timer}
        />
        <StatsCard
          title="Recovery Rate"
          value={`${((campaignStats.totalRecovered / borrowerStats.totalOverdue) * 100).toFixed(1)}%`}
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <ProfileDistribution data={borrowerStats.profileDistribution} />
        <CampaignStats data={campaignStats} />
      </div>
    </div>
  );
}
