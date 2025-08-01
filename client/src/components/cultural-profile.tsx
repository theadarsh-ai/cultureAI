import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, Globe, Lightbulb, TrendingUp } from "lucide-react";
import type { CulturalProfile } from "@shared/schema";

interface CulturalProfileProps {
  profileId: string;
}

export default function CulturalProfileComponent({ profileId }: CulturalProfileProps) {
  const { data: profile, isLoading } = useQuery<CulturalProfile>({
    queryKey: ['/api/cultural-profiles', profileId],
    enabled: !!profileId,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-24 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <User className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600">Cultural profile not found.</p>
        </CardContent>
      </Card>
    );
  }

  const preferences = profile.preferences as Record<string, string[]>;
  const culturalDNA = profile.culturalDNA as any;

  // Get insights count
  const { data: insights } = useQuery({
    queryKey: ['/api/cultural-insights', profileId],
    enabled: !!profileId,
  });

  const insightsCount = insights?.length || 0;
  const preferencesCount = Object.keys(preferences).length;

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card className="bg-gradient-to-br from-cultural-teal/5 to-cultural-emerald/5 border-cultural-teal/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-cultural-charcoal">
              Your Cultural Profile
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Profile Completion</p>
                <p className="font-semibold text-cultural-teal">{profile.completionPercentage || 100}%</p>
              </div>
              <div className="w-16">
                <Progress value={profile.completionPercentage || 100} className="h-2" />
              </div>
            </div>
          </div>

          {/* Cultural DNA Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
              <Globe className="mx-auto mb-2 text-cultural-teal" size={24} />
              <p className="font-semibold text-cultural-charcoal">{preferencesCount}</p>
              <p className="text-sm text-gray-600">Cultural Categories</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
              <Lightbulb className="mx-auto mb-2 text-cultural-amber" size={24} />
              <p className="font-semibold text-cultural-charcoal">{insightsCount}</p>
              <p className="text-sm text-gray-600">AI Insights</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
              <TrendingUp className="mx-auto mb-2 text-cultural-emerald" size={24} />
              <p className="font-semibold text-cultural-charcoal">{Object.values(preferences).flat().length}</p>
              <p className="text-sm text-gray-600">Cultural Preferences</p>
            </div>
          </div>

          {/* Preferences Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(preferences).map(([category, items]) => (
              <div key={category} className="bg-white p-6 rounded-xl border border-gray-100">
                <h4 className="font-semibold text-cultural-charcoal mb-4 capitalize flex items-center">
                  <i className={`fas fa-${getCategoryIcon(category)} text-${getCategoryColor(category)} mr-2`}></i>
                  {category}
                </h4>
                <div className="space-y-2">
                  {items.map((item: string, index: number) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cultural Affinities */}
      {culturalDNA?.qlooAffinities && culturalDNA.qlooAffinities.length > 0 && (
        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-display font-bold text-cultural-charcoal mb-6">
              Cultural Affinities
            </h3>
            <div className="grid gap-4">
              {culturalDNA.qlooAffinities.map((affinity: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-cultural-charcoal capitalize">
                      {affinity.category}: {affinity.query}
                    </p>
                    <p className="text-sm text-gray-600">
                      {affinity.entities?.length || 0} related entities found
                    </p>
                  </div>
                  <Badge className={`bg-${getCategoryColor(affinity.category)}/20 text-${getCategoryColor(affinity.category)}`}>
                    {affinity.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'music': 'cultural-purple',
    'food': 'cultural-terracotta',
    'travel': 'cultural-emerald',
    'art': 'cultural-amber',
    'lifestyle': 'cultural-teal',
  };
  return colors[category] || 'cultural-teal';
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'music': 'music',
    'food': 'utensils',
    'travel': 'map-marker-alt',
    'art': 'palette',
    'lifestyle': 'coffee',
  };
  return icons[category] || 'star';
}
