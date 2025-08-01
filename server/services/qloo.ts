export interface QlooApiResponse {
  results?: any[];
  metadata?: any;
  error?: string;
}

export interface QlooInsightsRequest {
  query?: string;
  categories?: string[];
  sample?: string[];
  location?: string;
}

class QlooService {
  private baseUrl = "https://hackathon.api.qloo.com";
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.QLOO_API_KEY || process.env.QLOO_API_KEY_ENV_VAR || "";
    if (!this.apiKey) {
      console.warn("Qloo API key not found in environment variables");
    }
  }

  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<QlooApiResponse> {
    try {
      const url = new URL(`${this.baseUrl}/${endpoint}`);
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            url.searchParams.append(key, value.join(','));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });

      console.log(`Making Qloo API request to: ${url.toString()}`);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": this.apiKey,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Qloo API error: ${response.status} - ${errorText}`);
        return { error: `Qloo API error: ${response.status} - ${errorText}` };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Qloo API request failed:", error);
      return { error: `Qloo API request failed: ${error}` };
    }
  }

  async search(query: string, categories?: string[]): Promise<QlooApiResponse> {
    // Use correct parameter name 'query' instead of 'q'
    const params: Record<string, any> = { query: query };
    
    return this.makeRequest('search', params);
  }

  async getRecommendations(sample: string[], categories?: string[]): Promise<QlooApiResponse> {
    const params: Record<string, any> = {};
    
    if (categories && categories.length > 0) {
      const categoryMap: Record<string, string> = {
        'music': 'urn:entity:artist',
        'restaurants': 'urn:entity:place',
        'food': 'urn:entity:place', 
        'travel': 'urn:entity:destination',
        'places': 'urn:entity:destination',
        'movies': 'urn:entity:movie',
        'tv': 'urn:entity:tv_show',
        'books': 'urn:entity:book'
      };
      
      const mappedCategory = categoryMap[categories[0]] || 'urn:entity:place';
      params['filter.type'] = mappedCategory;
    } else {
      params['filter.type'] = 'urn:entity:place';
    }
    
    // Use sample entities as signal inputs
    if (sample && sample.length > 0) {
      params['signal.interests.entities'] = sample.join(',');
    }
    
    return this.makeRequest('v2/insights', params);
  }

  async getInsights(request: QlooInsightsRequest): Promise<QlooApiResponse> {
    return this.makeRequest('v2/insights', request);
  }

  async getInsightsForEntities(entityIds: string[], filterType: string): Promise<QlooApiResponse> {
    const params: Record<string, any> = {
      'filter.type': filterType,
      'signal.interests.entities': entityIds.slice(0, 10).join(',')
    };
    
    return this.makeRequest('v2/insights', params);
  }

  async getCulturalAffinities(preferences: Record<string, any>): Promise<any> {
    try {
      const insights = [];
      
      // Process music preferences
      if (preferences.music && preferences.music.length > 0) {
        for (const genre of preferences.music.slice(0, 2)) {
          try {
            // Search for artists related to this genre
            const searchResult = await this.search(genre);
            console.log(`Search result for ${genre}:`, searchResult);
            
            if (searchResult.results && searchResult.results.length > 0) {
              // Get entity IDs from search results (filter for artists if possible)
              const entityIds = searchResult.results
                .filter((r: any) => r.qloo_id)
                .slice(0, 3)
                .map((r: any) => r.qloo_id);
              
              if (entityIds.length > 0) {
                console.log(`Using entity IDs for ${genre}:`, entityIds);
                const insightsResult = await this.getInsightsForEntities(entityIds, 'urn:entity:artist');
                console.log(`Insights result for ${genre}:`, insightsResult);
                
                if (insightsResult.results) {
                  insights.push({
                    category: 'music',
                    query: genre,
                    searchEntities: searchResult.results.slice(0, 5),
                    insights: insightsResult.results
                  });
                  console.log(`Added music insights for ${genre}`);
                }
              }
            }
          } catch (error) {
            console.log(`Music insights error for ${genre}:`, error);
          }
        }
      }

      // Process food preferences  
      if (preferences.food && preferences.food.length > 0) {
        for (const cuisine of preferences.food.slice(0, 2)) {
          try {
            const searchResult = await this.search(cuisine);
            
            if (searchResult.results && searchResult.results.length > 0) {
              const entityIds = searchResult.results
                .filter((r: any) => r.qloo_id)
                .slice(0, 3)
                .map((r: any) => r.qloo_id);
              
              if (entityIds.length > 0) {
                const insightsResult = await this.getInsightsForEntities(entityIds, 'urn:entity:place');
                
                if (insightsResult.results) {
                  insights.push({
                    category: 'food',
                    query: cuisine,
                    searchEntities: searchResult.results.slice(0, 5),
                    insights: insightsResult.results
                  });
                }
              }
            }
          } catch (error) {
            console.log(`Food insights error for ${cuisine}:`, error);
          }
        }
      }

      // Process travel preferences
      if (preferences.travel && preferences.travel.length > 0) {
        for (const destination of preferences.travel.slice(0, 2)) {
          try {
            const searchResult = await this.search(destination);
            
            if (searchResult.results && searchResult.results.length > 0) {
              const entityIds = searchResult.results
                .filter((r: any) => r.qloo_id)
                .slice(0, 3)
                .map((r: any) => r.qloo_id);
              
              if (entityIds.length > 0) {
                const insightsResult = await this.getInsightsForEntities(entityIds, 'urn:entity:destination');
                
                if (insightsResult.results) {
                  insights.push({
                    category: 'travel',
                    query: destination,
                    searchEntities: searchResult.results.slice(0, 5),
                    insights: insightsResult.results
                  });
                }
              }
            }
          } catch (error) {
            console.log(`Travel insights error for ${destination}:`, error);
          }
        }
      }

      return {
        culturalAffinities: insights,
        totalEntities: insights.reduce((sum, insight) => sum + (insight.searchEntities?.length || 0), 0)
      };
    } catch (error) {
      console.error("Error getting cultural affinities:", error);
      return { culturalAffinities: [], totalEntities: 0 };
    }
  }

  async generateCrossRecommendations(userPreferences: Record<string, any>): Promise<any[]> {
    try {
      const recommendations = [];
      const entityIds: string[] = [];

      // Collect entity IDs from user preferences
      if (userPreferences.music) {
        for (const item of userPreferences.music.slice(0, 2)) {
          const result = await this.search(item, ['music']);
          if (result.results && result.results.length > 0) {
            entityIds.push(...result.results.slice(0, 3).map((r: any) => r.id).filter(Boolean));
          }
        }
      }

      if (userPreferences.food) {
        for (const item of userPreferences.food.slice(0, 2)) {
          const result = await this.search(item, ['restaurants']);
          if (result.results && result.results.length > 0) {
            entityIds.push(...result.results.slice(0, 2).map((r: any) => r.id).filter(Boolean));
          }
        }
      }

      // Get cross-domain recommendations
      if (entityIds.length > 0) {
        const recsResult = await this.getRecommendations(entityIds.slice(0, 10));
        if (recsResult.results) {
          recommendations.push(...recsResult.results.slice(0, 15));
        }
      }

      return recommendations;
    } catch (error) {
      console.error("Error generating cross recommendations:", error);
      return [];
    }
  }
}

export const qlooService = new QlooService();
