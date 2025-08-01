import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Lightbulb, Sparkles } from "lucide-react";
import type { CulturalInsight } from "@shared/schema";

interface AIInsightsProps {
  profileId: string;
}

export default function AIInsights({ profileId }: AIInsightsProps) {
  const { data: insights, isLoading } = useQuery<CulturalInsight[]>({
    queryKey: ['/api/cultural-insights', profileId],
    enabled: !!profileId,
  });

  const { data: storyData } = useQuery({
    queryKey: ['/api/cultural-insights/generate', profileId],
    queryFn: async () => {
      const response = await fetch('/api/cultural-insights/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId })
      });
      return response.json();
    },
    enabled: !!profileId && !!insights?.length,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-24 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!insights?.length) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Bot className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600">Complete your cultural questionnaire to see AI-powered insights!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Generated Story */}
      {storyData?.story && (
        <Card className="bg-gradient-to-br from-gray-50 to-cultural-teal/5 border-cultural-teal/20">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cultural-teal to-cultural-emerald rounded-full flex items-center justify-center">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-cultural-charcoal">Your Cultural Story</h4>
                <p className="text-sm text-gray-500">Powered by LLM + Qloo Taste AI™</p>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {storyData.story}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Individual Insights */}
      <div className="grid gap-4">
        {insights.map((insight) => (
          <Card key={insight.id} className="bg-white border border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cultural-amber/20 rounded-lg flex items-center justify-center">
                    <Lightbulb className="text-cultural-amber" size={20} />
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2 capitalize">
                      {insight.category}
                    </Badge>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {insight.insightText}
                    </p>
                  </div>
                </div>
                {insight.matchPercentage && (
                  <div className="text-xs text-cultural-teal font-medium">
                    {insight.matchPercentage}% confidence
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-xs text-gray-500 mt-4">
                <i className="fas fa-lightbulb text-cultural-amber mr-2"></i>
                Generated using 575M+ cultural data points
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
