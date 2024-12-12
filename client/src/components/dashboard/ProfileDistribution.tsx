import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "recharts";

interface ProfileDistributionProps {
  data: Record<string, number>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function ProfileDistribution({ data }: ProfileDistributionProps) {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Borrower Profile Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
          colors={COLORS}
        />
      </CardContent>
    </Card>
  );
}
