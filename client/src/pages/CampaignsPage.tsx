import { useCampaigns } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";

export default function CampaignsPage() {
  const { data: campaigns, isLoading } = useCampaigns();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!campaigns) {
    return <div>Error loading campaigns</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
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
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
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
