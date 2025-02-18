import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Bell, 
  Target,
  Clock,
  Gift
} from 'lucide-react';
import { DEBT_CAMPAIGN_TEMPLATES } from '@/services/debtCampaignStrategy';
import type { ArchetypeCategory } from '@/types/archetypes';

interface DebtCampaignCreatorProps {
  selectedArchetype: ArchetypeCategory;
  score: number;
}

export function DebtCampaignCreator({ selectedArchetype, score }: DebtCampaignCreatorProps) {
  const campaign = DEBT_CAMPAIGN_TEMPLATES[selectedArchetype];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Debt Recovery Campaign</CardTitle>
          <Badge variant="secondary">{`${score}% Match`}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="message">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="message">Message</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="incentives">Incentives</TabsTrigger>
            <TabsTrigger value="communication">Style</TabsTrigger>
          </TabsList>

          <TabsContent value="message" className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Primary Message</h3>
              <p>{campaign.primaryMessage}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Supporting Points</h3>
              {campaign.supportingPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 border rounded">
                  <Target className="w-4 h-4" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="channels" className="space-y-4">
            {campaign.channels.map((channel, idx) => (
              <Button key={idx} variant="outline" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                {channel}
              </Button>
            ))}
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Timing Strategy</h3>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{campaign.timing}</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="incentives" className="space-y-4">
            {campaign.incentives.map((incentive, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 border rounded">
                <Gift className="w-4 h-4" />
                <span>{incentive}</span>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="communication" className="space-y-4">
            {campaign.communicationStyle.map((style, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 border rounded">
                <MessageSquare className="w-4 h-4" />
                <span>{style}</span>
              </div>
            ))}
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Call to Action</h3>
              <p>{campaign.callToAction}</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
