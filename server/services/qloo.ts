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
  private baseUrl = "https://hackathon.api.qloo.com/v2";
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
    // Use the insights endpoint with proper filter.type
    const params: Record<string, any> = {};
    
    if (categories && categories.length > 0) {
      // Map common categories to proper URN format
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
      params['filter.type'] = 'urn:entity:place'; // Default to places
    }
    
    // Add the query as a text signal if provided
    if (query) {
      params['signal.text'] = query;
    }
    
    return this.makeRequest('v2/insights', params);
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

  async getCulturalAffinities(preferences: Record<string, any>): Promise<any> {
    try {
      // Convert user preferences to Qloo queries
      const searches = [];
      
      if (preferences.music && preferences.music.length > 0) {
        for (const genre of preferences.music.slice(0, 3)) {
          const result = await this.search(genre, ['music']);
          if (result.results && result.results.length > 0) {
            searches.push({
              category: 'music',
              query: genre,
              entities: result.results.slice(0, 5)
            });
          }
        }
      }

      if (preferences.food && preferences.food.length > 0) {
        for (const cuisine of preferences.food.slice(0, 3)) {
          const result = await this.search(cuisine, ['restaurants', 'food']);
          if (result.results && result.results.length > 0) {
            searches.push({
              category: 'food',
              query: cuisine,
              entities: result.results.slice(0, 5)
            });
          }
        }
      }

      if (preferences.travel && preferences.travel.length > 0) {
        for (const destination of preferences.travel.slice(0, 3)) {
          const result = await this.search(destination, ['travel', 'places']);
          if (result.results && result.results.length > 0) {
            searches.push({
              category: 'travel',
              query: destination,
              entities: result.results.slice(0, 5)
            });
          }
        }
      }

      return {
        culturalAffinities: searches,
        totalEntities: searches.reduce((sum, search) => sum + search.entities.length, 0)
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
