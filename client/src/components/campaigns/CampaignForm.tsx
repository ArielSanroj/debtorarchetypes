import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ArchetypeScore, CampaignTemplate } from "@/types/campaign";
import { CAMPAIGN_TEMPLATES } from "@/types/campaign";
import { useCreateCampaign } from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  archetype: z.enum(["Autonomous", "Impulsive", "Avoidant", "Isolative"]),
  headline: z.string().min(1, "Headline is required"),
  cta: z.string().min(1, "CTA is required"),
  content: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

interface CampaignFormProps {
  archetypeScores: ArchetypeScore;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CampaignForm({ archetypeScores, onSuccess, onCancel }: CampaignFormProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null);
  const { toast } = useToast();
  const createCampaign = useCreateCampaign();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: [],
    },
  });

  const recommendedTemplates = CAMPAIGN_TEMPLATES.filter(
    template => archetypeScores[template.archetype] >= template.minScore
  );

  const useTemplate = (template: CampaignTemplate) => {
    setSelectedTemplate(template);
    form.reset({
      name: "",
      description: "",
      archetype: template.archetype,
      headline: template.headline,
      cta: template.cta,
      content: template.content,
    });
  };

  async function onSubmit(values: FormValues) {
    try {
      await createCampaign.mutateAsync({
        name: values.name,
        archetype: values.archetype,
        headline: values.headline,
        description: values.description || "",
        cta: values.cta,
        content: values.content,
      });
      
      toast({
        title: "Success",
        description: "Campaign created successfully",
      });
      
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedTemplate ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recommended Templates</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {recommendedTemplates.map((template) => (
                  <Card key={template.archetype} className="p-4">
                    <h4 className="font-medium">{template.headline}</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{template.archetype}</Badge>
                      <Badge variant="outline">Score: {archetypeScores[template.archetype]}</Badge>
                    </div>
                    <div className="mt-4">
                      <Button 
                        onClick={() => useTemplate(template)}
                        className="w-full"
                      >
                        Use Template
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter campaign name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Enter campaign description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Content Items</FormLabel>
                  <div className="space-y-2">
                    {form.watch("content").map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input 
                          value={item}
                          onChange={(e) => {
                            const newContent = [...form.getValues("content")];
                            newContent[index] = e.target.value;
                            form.setValue("content", newContent);
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newContent = form.getValues("content").filter((_, i) => i !== index);
                            form.setValue("content", newContent);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.setValue("content", [...form.getValues("content"), ""]);
                    }}
                  >
                    Add Content Item
                  </Button>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedTemplate(null);
                      form.reset();
                    }}
                  >
                    Back to Templates
                  </Button>
                  <Button type="submit" disabled={createCampaign.isPending}>
                    {createCampaign.isPending ? "Creating..." : "Create Campaign"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}