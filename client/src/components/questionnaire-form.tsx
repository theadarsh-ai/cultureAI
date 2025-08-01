import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Music, Utensils, MapPin, Palette, Coffee } from "lucide-react";

interface QuestionnaireFormProps {
  profileId: string;
  onComplete: () => void;
}

interface Question {
  id: string;
  title: string;
  description: string;
  type: 'multiple_choice';
  options: Array<{
    id: string;
    label: string;
    description: string;
    icon: any;
    color: string;
  }>;
}

const questions: Question[] = [
  {
    id: 'music-genres',
    title: 'Music Affinity',
    description: 'Select the styles that move your soul',
    type: 'multiple_choice',
    options: [
      { id: 'afrobeat', label: 'Afrobeat', description: 'Rhythmic, percussion-driven', icon: '🥁', color: 'cultural-amber' },
      { id: 'flamenco', label: 'Flamenco', description: 'Passionate, expressive', icon: '💃', color: 'cultural-terracotta' },
      { id: 'jazz', label: 'Jazz', description: 'Improvisational, soulful', icon: '🎷', color: 'cultural-purple' },
      { id: 'kpop', label: 'K-Pop', description: 'Modern, energetic', icon: '🌟', color: 'cultural-emerald' },
      { id: 'classical', label: 'Classical', description: 'Timeless, sophisticated', icon: '🎼', color: 'cultural-burgundy' },
      { id: 'reggae', label: 'Reggae', description: 'Laid-back, conscious', icon: '🌴', color: 'cultural-teal' },
    ]
  },
  {
    id: 'food-cuisines',
    title: 'Cuisine Profile',
    description: 'Choose the flavors that speak to you',
    type: 'multiple_choice',
    options: [
      { id: 'italian', label: 'Italian', description: 'Pasta, fresh ingredients', icon: '🍝', color: 'cultural-terracotta' },
      { id: 'japanese', label: 'Japanese', description: 'Sushi, umami flavors', icon: '🍣', color: 'cultural-burgundy' },
      { id: 'indian', label: 'Indian', description: 'Spices, complex flavors', icon: '🍛', color: 'cultural-amber' },
      { id: 'mexican', label: 'Mexican', description: 'Bold, vibrant tastes', icon: '🌮', color: 'cultural-emerald' },
      { id: 'thai', label: 'Thai', description: 'Sweet, sour, spicy', icon: '🍜', color: 'cultural-purple' },
      { id: 'french', label: 'French', description: 'Refined, classical', icon: '🥐', color: 'cultural-teal' },
    ]
  },
  {
    id: 'travel-destinations',
    title: 'Where do you dream of exploring?',
    description: 'Select destinations that call to your wanderlust',
    type: 'multiple_choice',
    options: [
      { id: 'tokyo', label: 'Tokyo', description: 'Modern culture meets tradition', icon: '🏯', color: 'cultural-burgundy' },
      { id: 'istanbul', label: 'Istanbul', description: 'East meets West', icon: '🕌', color: 'cultural-terracotta' },
      { id: 'barcelona', label: 'Barcelona', description: 'Art, architecture, passion', icon: '🏛️', color: 'cultural-amber' },
      { id: 'marrakech', label: 'Marrakech', description: 'Exotic markets, traditions', icon: '🐪', color: 'cultural-emerald' },
      { id: 'reykjavik', label: 'Reykjavik', description: 'Nordic minimalism, nature', icon: '🏔️', color: 'cultural-teal' },
      { id: 'rio', label: 'Rio de Janeiro', description: 'Vibrant culture, beaches', icon: '🏖️', color: 'cultural-purple' },
    ]
  },
  {
    id: 'art-styles',
    title: 'Art Preference',
    description: 'Choose the visual expressions that move you',
    type: 'multiple_choice',
    options: [
      { id: 'impressionist', label: 'Impressionist', description: 'Light, color, emotion', icon: '🌅', color: 'cultural-amber' },
      { id: 'contemporary', label: 'Contemporary', description: 'Modern, experimental', icon: '🎨', color: 'cultural-purple' },
      { id: 'traditional', label: 'Traditional', description: 'Cultural heritage, crafts', icon: '🏺', color: 'cultural-terracotta' },
      { id: 'street-art', label: 'Street Art', description: 'Urban, expressive', icon: '🧱', color: 'cultural-emerald' },
      { id: 'minimalist', label: 'Minimalist', description: 'Clean, simple lines', icon: '⚪', color: 'cultural-teal' },
      { id: 'abstract', label: 'Abstract', description: 'Non-representational', icon: '🔶', color: 'cultural-burgundy' },
    ]
  },
  {
    id: 'lifestyle',
    title: 'What describes your ideal lifestyle?',
    description: 'Select the approaches that resonate with you',
    type: 'multiple_choice',
    options: [
      { id: 'social', label: 'Social & Communal', description: 'Shared experiences, gatherings', icon: '👥', color: 'cultural-terracotta' },
      { id: 'mindful', label: 'Mindful & Intentional', description: 'Conscious living, balance', icon: '🧘', color: 'cultural-emerald' },
      { id: 'adventurous', label: 'Adventurous & Bold', description: 'New experiences, risks', icon: '🎯', color: 'cultural-amber' },
      { id: 'artistic', label: 'Creative & Artistic', description: 'Expression, aesthetics', icon: '✨', color: 'cultural-purple' },
      { id: 'intellectual', label: 'Intellectual & Curious', description: 'Learning, exploration', icon: '📚', color: 'cultural-teal' },
      { id: 'traditional', label: 'Traditional & Rooted', description: 'Heritage, stability', icon: '🏡', color: 'cultural-burgundy' },
    ]
  }
];

export default function QuestionnaireForm({ profileId, onComplete }: QuestionnaireFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string[]>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: async (responseData: any) => {
      const response = await apiRequest('POST', '/api/questionnaire/submit', responseData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Cultural Profile Created!",
        description: "Your preferences have been analyzed and your cultural insights are ready.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/cultural-profiles'] });
      onComplete();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit questionnaire. Please try again.",
        variant: "destructive"
      });
    }
  });

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionToggle = (questionId: string, optionId: string) => {
    setResponses(prev => {
      const current = prev[questionId] || [];
      const isSelected = current.includes(optionId);
      
      if (isSelected) {
        return {
          ...prev,
          [questionId]: current.filter(id => id !== optionId)
        };
      } else {
        return {
          ...prev,
          [questionId]: [...current, optionId]
        };
      }
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Submit questionnaire
      const formattedResponses = Object.entries(responses).map(([questionId, answer]) => ({
        questionId,
        answer
      }));

      submitMutation.mutate({
        profileId,
        responses: formattedResponses
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const canProceed = responses[currentQuestion.id]?.length > 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-cultural-teal/5 to-cultural-emerald/5 border-cultural-teal/20">
        <CardContent className="p-8">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Step {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-2xl font-display font-semibold text-cultural-charcoal mb-4">
              {currentQuestion.title}
            </h3>
            <p className="text-gray-600 mb-6">{currentQuestion.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = responses[currentQuestion.id]?.includes(option.id) || false;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionToggle(currentQuestion.id, option.id)}
                    className={`group p-6 bg-white rounded-xl border-2 transition-all transform hover:scale-105 text-left ${
                      isSelected 
                        ? `border-${option.color} bg-${option.color}/5` 
                        : 'border-gray-200 hover:border-cultural-teal'
                    }`}
                  >
                    <div className={`w-12 h-12 bg-${option.color}/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-${option.color}/30 transition-colors`}>
                      <span className="text-2xl">{option.icon}</span>
                    </div>
                    <h4 className="font-semibold text-cultural-charcoal mb-2">{option.label}</h4>
                    <p className="text-sm text-gray-500">{option.description}</p>
                    {isSelected && (
                      <div className="mt-3">
                        <div className={`w-6 h-6 bg-${option.color} rounded-full flex items-center justify-center`}>
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="text-gray-500 hover:text-cultural-teal"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Previous
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!canProceed || submitMutation.isPending}
              className="bg-cultural-teal hover:bg-cultural-teal/90 text-white px-8"
            >
              {submitMutation.isPending ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Processing...
                </>
              ) : isLastQuestion ? (
                <>
                  Complete Profile
                  <i className="fas fa-check ml-2"></i>
                </>
              ) : (
                <>
                  Continue
                  <i className="fas fa-arrow-right ml-2"></i>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
