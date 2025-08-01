import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import CulturalProfileComponent from "@/components/cultural-profile";
import AIInsights from "@/components/ai-insights";
import PersonalizedFeed from "@/components/personalized-feed";
import WorldMap from "@/components/world-map";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Brain, Compass, Globe, TrendingUp, ArrowRight } from "lucide-react";

export default function Profile() {
  // Get all cultural profiles to find the most recent one
  const { data: profiles, isLoading, error } = useQuery<any[]>({
    queryKey: ['/api/cultural-profiles'],
    retry: false,
  });

  // Debug logging
  console.log('Profiles data:', profiles);
  console.log('Is loading:', isLoading);
  console.log('Error:', error);

  // Get the most recent profile (the one the user just completed)
  const profile = Array.isArray(profiles) && profiles.length > 0 ? profiles[profiles.length - 1] : null;
  const profileId = profile?.id || null;

  console.log('Selected profile:', profile);
  console.log('Profile ID:', profileId);

  // Demo mode when no profile exists
  const isDemoMode = !profile || !profileId;
  console.log('Demo mode:', isDemoMode);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-32 bg-gray-200 rounded-xl"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-48 bg-gray-200 rounded-xl"></div>
                  <div className="h-64 bg-gray-200 rounded-xl"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-32 bg-gray-200 rounded-xl"></div>
                  <div className="h-48 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isDemoMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Demo Profile Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-display font-bold text-cultural-charcoal mb-4">
                Your Cultural Profile
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Discover your unique cultural DNA through AI-powered insights and personalized recommendations.
              </p>
              
              <Card className="max-w-2xl mx-auto bg-gradient-to-br from-cultural-teal/5 to-cultural-emerald/5 border-cultural-teal/20">
                <CardContent className="p-8 text-center">
                  <User className="mx-auto mb-4 text-cultural-teal" size={48} />
                  <h3 className="text-xl font-display font-semibold text-cultural-charcoal mb-4">
                    No Cultural Profile Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Complete our cultural questionnaire to unlock personalized insights, AI-generated recommendations, and discover your place in the global cultural landscape.
                  </p>
                  
                  <Link href="/questionnaire">
                    <Button className="bg-cultural-teal hover:bg-cultural-teal/90 text-white px-8 py-3 rounded-full font-semibold mb-6">
                      Start Cultural Discovery
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </Link>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-cultural-amber/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <Brain className="text-cultural-amber" size={16} />
                      </div>
                      <p className="text-xs text-gray-600 font-medium">AI Analysis</p>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-cultural-purple/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <Globe className="text-cultural-purple" size={16} />
                      </div>
                      <p className="text-xs text-gray-600 font-medium">575M+ Entities</p>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-cultural-emerald/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <Compass className="text-cultural-emerald" size={16} />
                      </div>
                      <p className="text-xs text-gray-600 font-medium">Personal Recs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Demo Features Showcase */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-display font-bold text-cultural-charcoal mb-6">
                  What You'll Discover
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cultural-teal/20 rounded-xl flex items-center justify-center mt-1">
                      <Brain className="text-cultural-teal" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cultural-charcoal mb-2">Cultural DNA Analysis</h4>
                      <p className="text-gray-600">AI-powered insights reveal your unique taste patterns and cultural affinities across music, food, travel, and art.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cultural-amber/20 rounded-xl flex items-center justify-center mt-1">
                      <Globe className="text-cultural-amber" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cultural-charcoal mb-2">Global Connections</h4>
                      <p className="text-gray-600">See how your preferences connect you to cultures worldwide through interactive visualizations and cultural mapping.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cultural-purple/20 rounded-xl flex items-center justify-center mt-1">
                      <Compass className="text-cultural-purple" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cultural-charcoal mb-2">Personalized Recommendations</h4>
                      <p className="text-gray-600">Discover new music, restaurants, destinations, and experiences tailored to your cultural profile.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cultural-emerald/20 rounded-xl flex items-center justify-center mt-1">
                      <TrendingUp className="text-cultural-emerald" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cultural-charcoal mb-2">Cultural Journey Tracking</h4>
                      <p className="text-gray-600">Monitor your cultural exploration progress and see how your tastes evolve over time.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo World Map */}
              <div>
                <WorldMap />
              </div>
            </div>

            {/* Technology Showcase */}
            <div className="bg-gradient-to-br from-cultural-charcoal to-gray-800 text-white rounded-3xl p-12 text-center">
              <h2 className="text-3xl font-display font-bold mb-6">
                Powered by Advanced AI Technology
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                CultureAI combines OpenAI's language models with Qloo's comprehensive cultural intelligence platform to provide unprecedented cultural insights.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="text-2xl font-bold text-cultural-teal mb-2">575M+</div>
                  <div className="text-sm text-gray-300">Cultural Entities</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="text-2xl font-bold text-cultural-amber mb-2">12+</div>
                  <div className="text-sm text-gray-300">Cultural Categories</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="text-2xl font-bold text-cultural-emerald mb-2">AI</div>
                  <div className="text-sm text-gray-300">Powered Insights</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="text-2xl font-bold text-cultural-purple mb-2">Real-time</div>
                  <div className="text-sm text-gray-300">Processing</div>
                </div>
              </div>

              <Link href="/questionnaire">
                <Button className="bg-white text-cultural-charcoal hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
                  Begin Your Cultural Journey
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Profile Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-display font-bold text-cultural-charcoal mb-2">
                  Cultural Profile Dashboard
                </h1>
                <p className="text-gray-600">
                  Your personalized cultural intelligence powered by AI and Qloo's Taste AI™
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-cultural-emerald/20 text-cultural-emerald">
                  <i className="fas fa-check-circle mr-2"></i>
                  Profile Complete
                </Badge>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <User size={16} />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center space-x-2">
                <Brain size={16} />
                <span>AI Insights</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center space-x-2">
                <Compass size={16} />
                <span>Feed</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center space-x-2">
                <Globe size={16} />
                <span>Map</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {profileId && <CulturalProfileComponent profileId={profileId} />}
            </TabsContent>

            <TabsContent value="insights" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold text-cultural-charcoal mb-4">
                  AI-Generated Cultural Insights
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Discover the deeper cultural stories behind your preferences through advanced AI analysis and cultural intelligence.
                </p>
              </div>
              {profileId && <AIInsights profileId={profileId} />}
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold text-cultural-charcoal mb-4">
                  Personalized Cultural Feed
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Explore curated recommendations based on your unique cultural profile and AI-powered taste analysis.
                </p>
              </div>
              {profileId && <PersonalizedFeed profileId={profileId} />}
            </TabsContent>

            <TabsContent value="map" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold text-cultural-charcoal mb-4">
                  Your Cultural Connections
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Visualize your global cultural affinities and discover how your preferences connect you to cultures worldwide.
                </p>
              </div>
              <WorldMap />
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  );
}
