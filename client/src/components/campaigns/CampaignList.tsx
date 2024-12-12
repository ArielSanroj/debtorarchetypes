import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BorrowerProfile, CampaignStatus, ChannelType } from "@db/schema";

interface Campaign {
  id: number;
  name: string;
  description?: string;
  targetProfile: BorrowerProfile;
  status: CampaignStatus;
  channels: ChannelType[];
  startDate?: Date;
  endDate?: Date;
}

interface CampaignListProps {
  campaigns: Campaign[];
  onSelect?: (campaign: Campaign) => void;
}

export function CampaignList({ campaigns, onSelect }: CampaignListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | "all">("all");
  const [profileFilter, setProfileFilter] = useState<BorrowerProfile | "all">("all");

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    const matchesProfile = profileFilter === "all" || campaign.targetProfile === profileFilter;
    return matchesSearch && matchesStatus && matchesProfile;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as CampaignStatus | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={profileFilter}
          onValueChange={(value) => setProfileFilter(value as BorrowerProfile | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by profile" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Profiles</SelectItem>
            <SelectItem value="autonomous">Autonomous</SelectItem>
            <SelectItem value="isolated">Isolated</SelectItem>
            <SelectItem value="avoidant">Avoidant</SelectItem>
            <SelectItem value="impulsive">Impulsive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Target Profile</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Channels</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.map((campaign) => (
              <TableRow
                key={campaign.id}
                onClick={() => onSelect?.(campaign)}
                className={cn("cursor-pointer", onSelect && "hover:bg-accent")}
              >
                <TableCell>{campaign.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{campaign.targetProfile}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={campaign.status === 'active' ? 'default' : 'secondary'}
                  >
                    {campaign.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {campaign.channels.map((channel) => (
                    <Badge key={channel} variant="outline" className="mr-1">
                      {channel}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell>
                  {campaign.startDate && new Date(campaign.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {campaign.endDate && new Date(campaign.endDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
