import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MessageSquare, 
  Bell, 
  PieChart,
  Zap
} from 'lucide-react';
import { ArchetypeProfile } from '../../types/archetypes';

interface EngagementStrategyProps {
  profile: ArchetypeProfile;
  score: number;
}

export function EngagementStrategy({ profile, score }: EngagementStrategyProps) {
  const getStrategyContent = () => {
    switch (profile.category) {
      case 'Autonomous':
        return {
          channels: ['Email Analytics', 'Self-Service Portal', 'Data Dashboard'],
          timing: ['Weekly Reports', 'Monthly Reviews', 'Quarterly Assessments'],
          content: ['Performance Metrics', 'ROI Calculations', 'Progress Tracking']
        };
      case 'Isolated':
        return {
          channels: ['Secure Portal', 'Private Messaging', 'Anonymous Support'],
          timing: ['User-Initiated', 'Scheduled Reviews', 'Automated Updates'],
          content: ['Privacy Policies', 'Security Features', 'Confidential Reports']
        };
      case 'Avoidant':
        return {
          channels: ['Simple SMS', 'Friendly Emails', 'Mobile App'],
          timing: ['Gentle Reminders', 'Positive Updates', 'Achievement Alerts'],
          content: ['Easy Steps', 'Success Stories', 'Support Resources']
        };
      case 'Impulsive':
        return {
          channels: ['Push Notifications', 'Social Media', 'Interactive App'],
          timing: ['Real-time Alerts', 'Flash Offers', 'Instant Updates'],
          content: ['Limited-Time Deals', 'Quick Wins', 'Reward Tracking']
        };
    }
  };

  const strategy = getStrategyContent();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Engagement Strategy: {profile.category}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="channels">
          <TabsList>
            <TabsTrigger value="channels">
              <MessageSquare className="w-4 h-4 mr-2" />
              Channels
            </TabsTrigger>
            <TabsTrigger value="timing">
              <Calendar className="w-4 h-4 mr-2" />
              Timing
            </TabsTrigger>
            <TabsTrigger value="content">
              <PieChart className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="channels">
            <div className="space-y-4">
              {strategy?.channels.map((channel, idx) => (
                <Button key={idx} variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  {channel}
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="timing">
            <div className="space-y-4">
              {strategy?.timing.map((time, idx) => (
                <Button key={idx} variant="outline" className="w-full justify-start">
                  <Zap className="w-4 h-4 mr-2" />
                  {time}
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="content">
            <div className="space-y-4">
              {strategy?.content.map((content, idx) => (
                <Button key={idx} variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {content}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
