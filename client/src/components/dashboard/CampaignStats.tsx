import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";

interface CampaignStatsProps {
  data: {
    totalCampaigns: number;
    activeCampaigns: number;
    completedCampaigns: number;
    totalRecovered: number;
    totalEngaged: number;
  };
}

export function CampaignStats({ data }: CampaignStatsProps) {
  const chartData = [
    { name: 'Total', value: data.totalCampaigns },
    { name: 'Active', value: data.activeCampaigns },
    { name: 'Completed', value: data.completedCampaigns },
    { name: 'Engaged', value: data.totalEngaged },
  ];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </CardContent>
    </Card>
  );
}
