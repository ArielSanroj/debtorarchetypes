import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProfileDistribution } from "@/components/dashboard/ProfileDistribution";
import { CampaignForm } from "@/components/campaigns/CampaignForm";
import { PlusIcon } from "lucide-react";
import type { ArchetypeScore } from "@/types/campaign";

export default function CampaignsPage() {
  const [showForm, setShowForm] = useState(false);
  
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
        <Button onClick={() => setShowForm(!showForm)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          {showForm ? "Cancel" : "New Campaign"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ProfileDistribution scores={archetypeScores} />
        {showForm && (
          <CampaignForm 
            archetypeScores={archetypeScores}
            onSuccess={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}
