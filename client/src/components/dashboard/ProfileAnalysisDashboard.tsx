import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from 'recharts';
import { ArchetypeCategory } from '../../types/archetypes';

interface ProfileScores {
  [key in ArchetypeCategory]: number;
}

interface ProfileMetric {
  category: string;
  score: number;
  engagement: number;
  response: number;
}

export function ProfileAnalysisDashboard({ scores }: { scores: ProfileScores }) {
  const profileData: ProfileMetric[] = Object.entries(scores).map(([category, score]) => ({
    category,
    score,
    engagement: Math.random() * 100, // Replace with real engagement metrics
    response: Math.random() * 100 // Replace with real response rates
  }));

  const radarData = Object.entries(scores).map(([category, value]) => ({
    subject: category,
    value
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profileData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Radar Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="Profile"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
