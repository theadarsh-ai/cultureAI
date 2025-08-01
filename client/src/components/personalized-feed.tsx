import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, MapPin, Star, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Recommendation } from "@shared/schema";

interface PersonalizedFeedProps {
  profileId: string;
}

export default function PersonalizedFeed({ profileId }: PersonalizedFeedProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: recommendations, isLoading, error } = useQuery<Recommendation[]>({
    queryKey: ['/api/recommendations', profileId],
    enabled: !!profileId,
  });

  const generateMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/recommendations/generate', { profileId });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/recommendations', profileId] });
      toast({
        title: "New Recommendations Generated!",
        description: "Fresh cultural discoveries based on your profile.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate new recommendations.",
        variant: "destructive"
      });
    }
  });

  const bookmarkMutation = useMutation({
    mutationFn: async ({ id, isBookmarked }: { id: string; isBookmarked: boolean }) => {
      const response = await apiRequest('PATCH', `/api/recommendations/${id}/bookmark`, { isBookmarked });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/recommendations', profileId] });
    }
  });

  const handleBookmark = (recommendation: Recommendation) => {
    bookmarkMutation.mutate({
      id: recommendation.id,
      isBookmarked: !recommendation.isBookmarked
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'music': 'cultural-purple',
      'food': 'cultural-terracotta',
      'travel': 'cultural-emerald',
      'art': 'cultural-amber',
      'experience': 'cultural-teal',
      'restaurants': 'cultural-terracotta',
      'places': 'cultural-emerald',
    };
    return colors[category] || 'cultural-teal';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'music': 'fas fa-music',
      'food': 'fas fa-utensils',
      'travel': 'fas fa-map-marker-alt',
      'art': 'fas fa-palette',
      'experience': 'fas fa-star',
      'restaurants': 'fas fa-utensils',
      'places': 'fas fa-map-marker-alt',
    };
    return icons[category] || 'fas fa-star';
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-red-600 mb-4">Failed to load recommendations</p>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/recommendations', profileId] })}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations?.length) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Star className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 mb-4">No recommendations yet! Generate your personalized cultural feed.</p>
          </div>
          <Button 
            onClick={() => generateMutation.mutate()}
            disabled={generateMutation.isPending}
            className="bg-cultural-teal hover:bg-cultural-teal/90"
          >
            {generateMutation.isPending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4" />
                Generate Recommendations
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const featuredRecommendation = recommendations[0];
  const otherRecommendations = recommendations.slice(1);

  return (
    <div className="space-y-8">
      {/* Generate New Recommendations Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-display font-bold text-cultural-charcoal">
          Your Cultural Feed
        </h3>
        <Button
          onClick={() => generateMutation.mutate()}
          disabled={generateMutation.isPending}
          variant="outline"
          className="border-cultural-teal text-cultural-teal hover:bg-cultural-teal hover:text-white"
        >
          {generateMutation.isPending ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Feed
            </>
          )}
        </Button>
      </div>

      {/* Featured Recommendation */}
      {featuredRecommendation && (
        <Card className="bg-white shadow-lg border border-gray-100">
          {featuredRecommendation.imageUrl && (
            <img 
              src={featuredRecommendation.imageUrl} 
              alt={featuredRecommendation.title}
              className="w-full h-64 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400";
              }}
            />
          )}
          <CardContent className="p-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge className={`bg-${getCategoryColor(featuredRecommendation.category)}/20 text-${getCategoryColor(featuredRecommendation.category)}`}>
                <i className={`${getCategoryIcon(featuredRecommendation.category)} mr-2`}></i>
                {featuredRecommendation.category}
              </Badge>
              {featuredRecommendation.matchPercentage && (
                <Badge variant="secondary">
                  <Star className="mr-1 h-3 w-3" />
                  {featuredRecommendation.matchPercentage}% match
                </Badge>
              )}
            </div>
            
            <h3 className="text-2xl font-display font-bold text-cultural-charcoal mb-4">
              {featuredRecommendation.title}
            </h3>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {featuredRecommendation.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {featuredRecommendation.location && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin size={16} />
                    <span>{featuredRecommendation.location}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBookmark(featuredRecommendation)}
                  disabled={bookmarkMutation.isPending}
                >
                  <Bookmark 
                    size={16} 
                    className={featuredRecommendation.isBookmarked ? "fill-current text-cultural-teal" : ""} 
                  />
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Other Recommendations Grid */}
      {otherRecommendations.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {otherRecommendations.map((rec) => (
            <Card key={rec.id} className="bg-white shadow-lg border border-gray-100">
              {rec.imageUrl && (
                <img 
                  src={rec.imageUrl} 
                  alt={rec.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240";
                  }}
                />
              )}
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className={`bg-${getCategoryColor(rec.category)}/20 text-${getCategoryColor(rec.category)} text-xs`}>
                    <i className={`${getCategoryIcon(rec.category)} mr-1`}></i>
                    {rec.category}
                  </Badge>
                </div>
                
                <h4 className="font-display font-semibold text-cultural-charcoal mb-2">
                  {rec.title}
                </h4>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {rec.description}
                </p>
                
                <div className="flex items-center justify-between">
                  {rec.matchPercentage && (
                    <span className="text-xs text-gray-500">
                      {rec.matchPercentage}% match
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBookmark(rec)}
                    disabled={bookmarkMutation.isPending}
                  >
                    <Bookmark 
                      size={14} 
                      className={rec.isBookmarked ? "fill-current text-cultural-teal" : ""} 
                    />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
