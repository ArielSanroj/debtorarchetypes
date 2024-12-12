import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProfileAnalysisDashboard } from "@/components/dashboard/ProfileAnalysisDashboard";
import { EngagementStrategy } from "@/components/engagement/EngagementStrategy";
import { CampaignForm } from "@/components/campaigns/CampaignForm";
import { CampaignList } from "@/components/campaigns/CampaignList";
import { History, PlusIcon } from "lucide-react";
import { ARCHETYPE_PROFILES } from "@/types/archetypes";
import { useCampaigns } from "@/lib/api";
import type { ArchetypeScore } from "@/types/campaign";

export default function CampaignsPage() {
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { data: campaigns = [] } = useCampaigns();
  
  // Mock archetype scores - in production this would come from your API
  const archetypeScores: ArchetypeScore = {
    Autonomous: 50,
    Impulsive: 30,
    Avoidant: 20,
    Isolative: 25
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Campaign Management</h1>
        <div className="flex gap-2">
          <Button 
            variant={showHistory ? "outline" : "default"} 
            onClick={() => {
              setShowHistory(!showHistory);
              setShowForm(false);
            }}
          >
            <History className="h-4 w-4 mr-2" />
            Campaign History
          </Button>
          {!showHistory && (
            <Button onClick={() => setShowForm(!showForm)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              {showForm ? "Cancel" : "New Campaign"}
            </Button>
          )}
        </div>
      </div>

      {showHistory ? (
        <CampaignList campaigns={campaigns} />
      ) : (
        <>
          <ProfileAnalysisDashboard scores={archetypeScores} />

          {showForm && (
            <CampaignForm 
              archetypeScores={archetypeScores}
              onSuccess={() => setShowForm(false)}
              onCancel={() => setShowForm(false)}
            />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(ARCHETYPE_PROFILES).map(profile => (
              <EngagementStrategy
                key={profile.category}
                profile={profile}
                score={archetypeScores[profile.category]}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
