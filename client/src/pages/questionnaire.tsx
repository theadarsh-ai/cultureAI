import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import QuestionnaireForm from "@/components/questionnaire-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Brain, ArrowRight, CheckCircle } from "lucide-react";

export default function Questionnaire() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'signup' | 'questionnaire' | 'complete'>('signup');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const { toast } = useToast();

  // Check if user already exists
  const { data: existingUser } = useQuery({
    queryKey: ['/api/users', userEmail],
    enabled: !!userEmail && userEmail.includes('@'),
    retry: false,
  });

  const createUserMutation = useMutation({
    mutationFn: async (userData: { email: string; name: string }) => {
      const response = await apiRequest('POST', '/api/users', userData);
      return response.json();
    },
    onSuccess: (user) => {
      setUserId(user.id);
      createProfileMutation.mutate({ userId: user.id, preferences: {}, completionPercentage: 0 });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create user account. Please try again.",
        variant: "destructive"
      });
    }
  });

  const createProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      const response = await apiRequest('POST', '/api/cultural-profiles', profileData);
      return response.json();
    },
    onSuccess: (profile) => {
      setProfileId(profile.id);
      setStep('questionnaire');
      toast({
        title: "Welcome to CultureAI!",
        description: "Let's discover your unique cultural profile.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create cultural profile. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSignup = () => {
    if (!userEmail || !userName) {
      toast({
        title: "Missing Information",
        description: "Please provide both your name and email.",
        variant: "destructive"
      });
      return;
    }

    if (existingUser && existingUser.id) {
      // User exists, check if they have a profile
      setUserId(existingUser.id);
      // Try to get their existing profile
      fetch(`/api/cultural-profiles/user/${existingUser.id}`)
        .then(res => res.json())
        .then(profile => {
          if (profile && profile.id) {
            setProfileId(profile.id);
            if (profile.completionPercentage >= 100) {
              setStep('complete');
            } else {
              setStep('questionnaire');
            }
          } else {
            // Create new profile for existing user
            createProfileMutation.mutate({ userId: existingUser.id, preferences: {}, completionPercentage: 0 });
          }
        })
        .catch(() => {
          createProfileMutation.mutate({ userId: existingUser.id, preferences: {}, completionPercentage: 0 });
        });
    } else {
      createUserMutation.mutate({ email: userEmail, name: userName });
    }
  };

  const handleQuestionnaireComplete = () => {
    setStep('complete');
    setTimeout(() => {
      setLocation('/profile');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {step === 'signup' && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <Brain className="mx-auto mb-6 text-cultural-teal" size={64} />
                <h1 className="text-4xl font-display font-bold text-cultural-charcoal mb-4">
                  Begin Your Cultural Journey
                </h1>
                <p className="text-xl text-gray-600">
                  Create your account to unlock personalized cultural insights powered by AI and Qloo's Taste AI™
                </p>
              </div>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-cultural-charcoal">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-cultural-charcoal">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="mt-2"
                      />
                      {existingUser && (
                        <p className="text-sm text-cultural-teal mt-2">
                          Welcome back! We found your existing account.
                        </p>
                      )}
                    </div>

                    <Button
                      onClick={handleSignup}
                      disabled={createUserMutation.isPending || createProfileMutation.isPending}
                      className="w-full bg-cultural-teal hover:bg-cultural-teal/90 text-white py-3 rounded-full font-semibold"
                    >
                      {createUserMutation.isPending || createProfileMutation.isPending ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Setting up your profile...
                        </>
                      ) : (
                        <>
                          Continue to Questionnaire
                          <ArrowRight className="ml-2" size={16} />
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="w-8 h-8 bg-cultural-teal/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <i className="fas fa-shield-alt text-cultural-teal text-sm"></i>
                        </div>
                        <p className="text-xs text-gray-600">Privacy First</p>
                      </div>
                      <div>
                        <div className="w-8 h-8 bg-cultural-amber/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <i className="fas fa-brain text-cultural-amber text-sm"></i>
                        </div>
                        <p className="text-xs text-gray-600">AI Powered</p>
                      </div>
                      <div>
                        <div className="w-8 h-8 bg-cultural-emerald/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <i className="fas fa-globe text-cultural-emerald text-sm"></i>
                        </div>
                        <p className="text-xs text-gray-600">Global Insights</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 'questionnaire' && profileId && (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-display font-bold text-cultural-charcoal mb-4">
                  Cultural Discovery Questionnaire
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Help us understand your cultural preferences across music, food, travel, art, and lifestyle. 
                  Our AI will analyze your responses to create your unique cultural DNA profile.
                </p>
              </div>

              <QuestionnaireForm 
                profileId={profileId} 
                onComplete={handleQuestionnaireComplete}
              />
            </div>
          )}

          {step === 'complete' && (
            <div className="max-w-2xl mx-auto text-center">
              <CheckCircle className="mx-auto mb-8 text-cultural-emerald" size={80} />
              <h1 className="text-4xl font-display font-bold text-cultural-charcoal mb-6">
                Cultural Profile Complete!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your unique cultural DNA has been analyzed using AI and Qloo's cultural intelligence. 
                You'll be redirected to your personalized profile in a few seconds.
              </p>
              
              <div className="bg-gradient-to-br from-cultural-teal/5 to-cultural-emerald/5 rounded-2xl p-8 border border-cultural-teal/20">
                <h3 className="font-display font-semibold text-cultural-charcoal mb-4">
                  What's Next?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-cultural-teal/20 rounded-xl mx-auto mb-3 flex items-center justify-center">
                      <i className="fas fa-user-circle text-cultural-teal"></i>
                    </div>
                    <h4 className="font-semibold text-sm mb-2">View Your Profile</h4>
                    <p className="text-xs text-gray-600">Explore your cultural DNA and insights</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-cultural-amber/20 rounded-xl mx-auto mb-3 flex items-center justify-center">
                      <i className="fas fa-lightbulb text-cultural-amber"></i>
                    </div>
                    <h4 className="font-semibold text-sm mb-2">AI Insights</h4>
                    <p className="text-xs text-gray-600">Discover cultural connections and stories</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-cultural-emerald/20 rounded-xl mx-auto mb-3 flex items-center justify-center">
                      <i className="fas fa-compass text-cultural-emerald"></i>
                    </div>
                    <h4 className="font-semibold text-sm mb-2">Recommendations</h4>
                    <p className="text-xs text-gray-600">Get personalized cultural discoveries</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setLocation('/profile')}
                className="mt-8 bg-cultural-teal hover:bg-cultural-teal/90 text-white px-8 py-3 rounded-full font-semibold"
              >
                View My Cultural Profile
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
