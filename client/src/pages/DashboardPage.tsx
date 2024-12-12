import { Users, BanknoteIcon, Timer, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProfileDistribution } from "@/components/dashboard/ProfileDistribution";
import { CampaignStats } from "@/components/dashboard/CampaignStats";
import { useBorrowerStats, useCampaignStats } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data: borrowerStats, isLoading: loadingBorrowers } = useBorrowerStats();
  const { data: campaignStats, isLoading: loadingCampaigns } = useCampaignStats();

  if (loadingBorrowers || loadingCampaigns) {
    return <div>Loading...</div>;
  }

  if (!borrowerStats || !campaignStats) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Borrowers"
          value={borrowerStats.totalBorrowers}
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
