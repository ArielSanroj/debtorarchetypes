import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { ArchetypeScore } from '@/types/campaign';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface ProfileDistributionProps {
  scores: ArchetypeScore;
}

export function ProfileDistribution({ scores }: ProfileDistributionProps) {
  const data = Object.entries(scores).map(([name, value]) => ({
    name,
    value: Math.round(value)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
