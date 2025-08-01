import Navigation from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { User, Brain, Compass, Globe, Lightbulb, TrendingUp, Heart, MapPin, Star, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Demo() {
  // Sample cultural profile data for hackathon demo
  const sampleProfile = {
    id: "demo-profile-1",
    userId: "demo-user-1",
    preferences: {
      music: ["Afrobeat", "Classical", "Jazz"],
      food: ["Thai", "Mexican", "Italian"],
      travel: ["Rio de Janeiro", "Reykjavik", "Marrakech"],
      art: ["Street Art", "Contemporary", "Photography"]
    },
    completionPercentage: 100,
    culturalDNA: {
      totalEntities: 47,
      insights: 8,
      affinities: 12
    }
  };

  const sampleInsights = [
    {
      id: "1",
      category: "music_art",
      insightText: "Your taste profile reveals a sophisticated appreciation for rhythm-driven, culturally rich musical forms. Afrobeat's complex polyrhythms, jazz's improvisational spirit, and classical music's structural elegance suggest you value both emotional expression and technical mastery. This combination indicates a deep appreciation for music that tells stories of cultural heritage and human experience.",
      matchPercentage: 92,
      source: "hybrid"
    },
    {
      id: "2", 
      category: "lifestyle_travel_food",
      insightText: "Your culinary and travel preferences show a remarkable affinity for cultures that seamlessly blend tradition with innovation. From Thailand's balance of sweet, sour, and spicy to Mexico's ancient ingredients in modern dishes, and from Rio's vibrant street culture to Reykjavik's Nordic minimalism, you're drawn to destinations where authentic cultural identity thrives alongside contemporary creativity.",
      matchPercentage: 88,
      source: "hybrid"
    }
  ];

  const sampleStory = `Your cultural DNA reveals a fascinating tapestry of global sensibilities woven together by a common thread: the celebration of authentic cultural expression through innovation. Your musical preferences span continents and centuries - from the rhythmic complexity of West African Afrobeat to the mathematical precision of European classical music, with jazz serving as the perfect bridge between structure and spontaneity.

Your culinary journey takes you from the aromatic spice markets of Thailand to the rich, earthy flavors of Mexican highlands, each preference reflecting cultures that have mastered the art of transforming simple ingredients into complex, soul-satisfying experiences. This isn't just about taste - it's about storytelling through food.

Your travel destinations reveal an adventurer's heart seeking authenticity in diversity. Rio de Janeiro's infectious energy, Reykjavik's serene innovation, and Marrakech's timeless mystique represent three very different approaches to creating vibrant cultural identities. You're drawn to places where tradition isn't preserved in museums but lives and breathes in daily life.

This cultural profile suggests you're someone who appreciates depth, authenticity, and the beautiful complexity that emerges when different cultural elements interact. You don't just consume culture - you seek to understand the stories, histories, and human experiences that give it meaning.`;

  const sampleRecommendations = [
    {
      id: "1",
      title: "Explore Fela Kuti's Lagos",
      description: "Dive into the birthplace of Afrobeat with a virtual tour of the legendary musician's stomping grounds, complete with music history and cultural context.",
      category: "Music Discovery",
      matchScore: 95,
      location: "Lagos, Nigeria",
      type: "Virtual Experience"
    },
    {
      id: "2",
      title: "Thai Royal Cuisine Workshop", 
      description: "Learn the intricate balance of flavors that defines royal Thai cuisine, with emphasis on traditional techniques passed down through generations.",
      category: "Culinary Experience",
      matchScore: 89,
      location: "Bangkok, Thailand",
      type: "Cooking Class"
    },
    {
      id: "3",
      title: "Nordic Jazz Festival Circuit",
      description: "Experience the unique Nordic approach to jazz, where minimalism meets maximum emotional impact in intimate venue settings.",
      category: "Music & Travel",
      matchScore: 91,
      location: "Reykjavik, Iceland", 
      type: "Cultural Event"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Demo Header */}
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
                  <Sparkles className="mr-2" size={12} />
                  Live Demo
                </Badge>
                <Badge className="bg-cultural-amber/20 text-cultural-amber">
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

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <Card className="bg-gradient-to-br from-cultural-teal/5 to-cultural-emerald/5 border-cultural-teal/20">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold text-cultural-charcoal">
                      Your Cultural Profile
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Profile Completion</p>
                        <p className="font-semibold text-cultural-teal">{sampleProfile.completionPercentage}%</p>
                      </div>
                      <div className="w-16">
                        <Progress value={sampleProfile.completionPercentage} className="h-2" />
                      </div>
                    </div>
                  </div>

                  {/* Cultural DNA Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
                      <Globe className="mx-auto mb-2 text-cultural-teal" size={24} />
                      <p className="font-semibold text-cultural-charcoal">{sampleProfile.culturalDNA.totalEntities}</p>
                      <p className="text-sm text-gray-600">Cultural Entities</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
                      <Lightbulb className="mx-auto mb-2 text-cultural-amber" size={24} />
                      <p className="font-semibold text-cultural-charcoal">{sampleProfile.culturalDNA.insights}</p>
                      <p className="text-sm text-gray-600">AI Insights</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
                      <TrendingUp className="mx-auto mb-2 text-cultural-emerald" size={24} />
                      <p className="font-semibold text-cultural-charcoal">{sampleProfile.culturalDNA.affinities}</p>
                      <p className="text-sm text-gray-600">Cultural Affinities</p>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(sampleProfile.preferences).map(([category, items]) => (
                      <div key={category} className="bg-white p-6 rounded-xl border border-gray-100">
                        <h4 className="font-semibold text-cultural-charcoal mb-4 capitalize">
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
            </TabsContent>

            {/* AI Insights Tab */}
            <TabsContent value="insights" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold text-cultural-charcoal mb-4">
                  AI-Generated Cultural Insights
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Discover the deeper cultural stories behind your preferences through advanced AI analysis and cultural intelligence.
                </p>
              </div>

              {/* Cultural Story */}
              <Card className="bg-gradient-to-br from-gray-50 to-cultural-teal/5 border-cultural-teal/20">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cultural-teal to-cultural-emerald rounded-full flex items-center justify-center">
                      <Sparkles className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cultural-charcoal">Your Cultural Story</h4>
                      <p className="text-sm text-gray-500">Powered by Gemini AI + Qloo Taste AI™</p>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {sampleStory}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Insights */}
              <div className="grid gap-6">
                {sampleInsights.map((insight) => (
                  <Card key={insight.id} className="border-l-4 border-l-cultural-teal">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Brain className="text-cultural-teal" size={20} />
                          <h4 className="font-semibold text-cultural-charcoal capitalize">
                            {insight.category.replace('_', ' & ')}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-cultural-emerald">
                            {insight.matchPercentage}% match
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {insight.source === 'hybrid' ? 'AI + Qloo' : insight.source}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {insight.insightText}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold text-cultural-charcoal mb-4">
                  Personalized Cultural Feed
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Explore curated recommendations based on your unique cultural profile and AI-powered taste analysis.
                </p>
              </div>

              <div className="grid gap-6">
                {sampleRecommendations.map((rec) => (
                  <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-cultural-charcoal">
                              {rec.title}
                            </h3>
                            <Badge className="bg-cultural-emerald/20 text-cultural-emerald">
                              {rec.matchScore}% match
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">
                            {rec.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              {rec.location}
                            </span>
                            <span>{rec.type}</span>
                            <Badge variant="outline" className="text-xs">
                              {rec.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Heart size={14} />
                          </Button>
                          <Button size="sm" className="bg-cultural-teal hover:bg-cultural-teal/90">
                            Explore
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* World Map Tab */}
            <TabsContent value="map" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold text-cultural-charcoal mb-4">
                  Your Cultural Connections
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Visualize your global cultural affinities and discover how your preferences connect you to cultures worldwide.
                </p>
              </div>

              <Card className="bg-cultural-charcoal border-gray-600">
                <CardContent className="p-8">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
                      alt="Interactive world map showing cultural connections" 
                      className="w-full h-96 object-cover rounded-xl" 
                    />
                    
                    {/* Cultural connection overlays */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        {/* Africa - Afrobeat */}
                        <div className="absolute w-4 h-4 bg-cultural-amber rounded-full animate-pulse shadow-lg" 
                             style={{ top: '45%', left: '48%' }}>
                          <div className="absolute -top-8 -left-4 bg-cultural-amber text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                            Afrobeat Origins
                          </div>
                        </div>
                        
                        {/* Europe - Classical */}
                        <div className="absolute w-4 h-4 bg-cultural-purple rounded-full animate-pulse shadow-lg" 
                             style={{ top: '35%', left: '52%' }}>
                          <div className="absolute -top-8 -left-6 bg-cultural-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                            Classical Heritage
                          </div>
                        </div>
                        
                        {/* Thailand */}
                        <div className="absolute w-4 h-4 bg-cultural-terracotta rounded-full animate-pulse shadow-lg" 
                             style={{ top: '48%', right: '25%' }}>
                          <div className="absolute -top-8 -left-4 bg-cultural-terracotta text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                            Thai Cuisine
                          </div>
                        </div>
                        
                        {/* South America - Rio */}
                        <div className="absolute w-4 h-4 bg-cultural-emerald rounded-full animate-pulse shadow-lg" 
                             style={{ bottom: '40%', left: '30%' }}>
                          <div className="absolute -top-8 -left-2 bg-cultural-emerald text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                            Rio Culture
                          </div>
                        </div>
                        
                        {/* Iceland */}
                        <div className="absolute w-4 h-4 bg-cultural-teal rounded-full animate-pulse shadow-lg" 
                             style={{ top: '25%', left: '45%' }}>
                          <div className="absolute -top-8 -left-4 bg-cultural-teal text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                            Nordic Innovation
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                    {['Music', 'Food', 'Art', 'Travel', 'Heritage'].map((category, index) => (
                      <div key={category} className="text-center text-white">
                        <div className={`w-3 h-3 rounded-full mx-auto mb-2 bg-cultural-${['amber', 'terracotta', 'purple', 'emerald', 'teal'][index]}`}></div>
                        <span className="text-xs">{category}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-cultural-charcoal to-gray-800 text-white rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              Ready to Discover Your Cultural DNA?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Take our interactive questionnaire to unlock your personalized cultural insights powered by AI and Qloo's Taste AI™.
            </p>
            
            <Link href="/questionnaire">
              <Button className="bg-cultural-teal hover:bg-cultural-teal/90 text-white px-8 py-3 rounded-full font-semibold text-lg">
                Start Your Cultural Journey
                <Sparkles className="ml-2" size={20} />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}