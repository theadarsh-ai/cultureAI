import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import WorldMap from "@/components/world-map";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Bot, Database, Globe, Shield, Brain, Network, Lightbulb, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Cultural Questionnaire Preview */}
      <section id="discover" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-cultural-charcoal mb-4">
              Your Cultural Journey Begins
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Answer a few questions about your preferences and let our AI reveal the cultural patterns that define your unique taste profile.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-cultural-teal/5 to-cultural-emerald/5 border-cultural-teal/20">
              <CardContent className="p-8 text-center">
                <Bot className="mx-auto mb-6 text-cultural-teal" size={64} />
                <h3 className="text-2xl font-display font-semibold text-cultural-charcoal mb-4">
                  AI-Powered Cultural Discovery
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Our intelligent questionnaire analyzes your preferences across music, food, travel, art, and lifestyle to create your unique cultural DNA profile.
                </p>
                <Link href="/questionnaire">
                  <Button className="bg-cultural-teal hover:bg-cultural-teal/90 text-white px-8 py-4 rounded-full font-semibold">
                    Start Cultural Discovery
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive World Map */}
      <section className="py-16 bg-gradient-to-br from-cultural-charcoal to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              Your Cultural Connections
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore how your preferences connect you to cultures worldwide through our interactive map powered by AI insights.
            </p>
          </div>
          <WorldMap />
        </div>
      </section>

      {/* AI Insights Showcase */}
      <section id="insights" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-cultural-charcoal mb-4">
              AI-Powered Cultural Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced LLM integration with Qloo's Taste AI™ reveals the deeper cultural stories behind your preferences.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features list */}
            <div>
              <h3 className="text-3xl font-display font-bold text-cultural-charcoal mb-8">
                Intelligent Cultural Discovery
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cultural-teal/20 rounded-xl flex items-center justify-center mt-1">
                    <Brain className="text-cultural-teal" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-cultural-charcoal mb-2">LLM-Enhanced Analysis</h4>
                    <p className="text-gray-600">Advanced language models provide nuanced cultural context and storytelling around your taste patterns.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cultural-amber/20 rounded-xl flex items-center justify-center mt-1">
                    <Network className="text-cultural-amber" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-cultural-charcoal mb-2">Cross-Domain Connections</h4>
                    <p className="text-gray-600">Qloo's Taste AI™ reveals hidden connections between your preferences across music, food, travel, and lifestyle.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cultural-purple/20 rounded-xl flex items-center justify-center mt-1">
                    <Globe className="text-cultural-purple" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-cultural-charcoal mb-2">Global Cultural Intelligence</h4>
                    <p className="text-gray-600">Access insights from 575+ million cultural entities and understand your place in the global cultural landscape.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cultural-emerald/20 rounded-xl flex items-center justify-center mt-1">
                    <Shield className="text-cultural-emerald" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-cultural-charcoal mb-2">Privacy-First Approach</h4>
                    <p className="text-gray-600">All insights are generated from anonymized, aggregated data that respects user privacy and cultural sensitivity.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Insight Panel */}
            <div>
              <Card className="bg-gradient-to-br from-gray-50 to-cultural-teal/5 border-gray-200">
                <CardContent className="p-8">
                  {/* AI Avatar */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cultural-teal to-cultural-emerald rounded-full flex items-center justify-center">
                      <Bot className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cultural-charcoal">CultureAI Assistant</h4>
                      <p className="text-sm text-gray-500">Powered by LLM + Qloo Taste AI™</p>
                    </div>
                  </div>

                  {/* Sample AI Generated Insight */}
                  <Card className="bg-white border border-gray-100 mb-6">
                    <CardContent className="p-6">
                      <h5 className="font-semibold text-cultural-charcoal mb-3">Cultural Profile Analysis</h5>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        "Based on your preferences for jazz music, Mediterranean cuisine, and contemporary art, your taste profile shows a strong affinity for cultures that value improvisation, communal dining, and artistic expression. This suggests you would enjoy experiences in cities like Barcelona, New Orleans, or Istanbul, where these cultural elements converge."
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Lightbulb className="text-cultural-amber mr-2" size={16} />
                        Generated using 575M+ cultural data points
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sample recommendations */}
                  <div className="space-y-3">
                    <h5 className="font-semibold text-cultural-charcoal">Sample Recommendations</h5>
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100">
                      <div className="w-12 h-12 bg-cultural-terracotta/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-music text-cultural-terracotta"></i>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Buena Vista Social Club</p>
                        <p className="text-xs text-gray-500">Cuban jazz ensemble</p>
                      </div>
                      <div className="text-xs text-cultural-teal font-medium">95% match</div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100">
                      <div className="w-12 h-12 bg-cultural-amber/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-map-marker-alt text-cultural-amber"></i>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Barcelona's Gothic Quarter</p>
                        <p className="text-xs text-gray-500">Historic cultural district</p>
                      </div>
                      <div className="text-xs text-cultural-teal font-medium">91% match</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section className="py-16 bg-cultural-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              CultureAI combines cutting-edge language models with Qloo's comprehensive cultural intelligence platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Technical specs */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-8">Technical Foundation</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cultural-teal/20 rounded-xl flex items-center justify-center mt-1">
                    <Bot className="text-cultural-teal" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Large Language Model Integration</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">OpenAI GPT-4 integration for natural language processing, cultural storytelling, and nuanced preference interpretation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cultural-amber/20 rounded-xl flex items-center justify-center mt-1">
                    <Database className="text-cultural-amber" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Qloo Taste AI™ API</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">Access to 575+ million cultural entities and 10+ trillion behavioral signals for comprehensive taste analysis.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cultural-purple/20 rounded-xl flex items-center justify-center mt-1">
                    <Network className="text-cultural-purple" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Cross-Domain Intelligence</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">Real-time analysis across 12+ lifestyle categories including music, food, travel, fashion, and entertainment.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cultural-emerald/20 rounded-xl flex items-center justify-center mt-1">
                    <Shield className="text-cultural-emerald" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Privacy-First Architecture</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">GDPR/CCPA compliant with zero PII collection and fully anonymized cultural intelligence data.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance metrics */}
            <div className="bg-gray-800 rounded-3xl p-8 border border-gray-600">
              <h4 className="font-display font-semibold text-white mb-6">Integration Highlights</h4>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center p-4 bg-gray-700 rounded-xl">
                  <div className="text-2xl font-bold text-cultural-amber mb-1">575M+</div>
                  <div className="text-xs text-gray-300">Cultural Entities</div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-xl">
                  <div className="text-2xl font-bold text-cultural-emerald mb-1">&lt;100ms</div>
                  <div className="text-xs text-gray-300">API Response Time</div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-xl">
                  <div className="text-2xl font-bold text-cultural-purple mb-1">12+</div>
                  <div className="text-xs text-gray-300">Cultural Categories</div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-xl">
                  <div className="text-2xl font-bold text-cultural-teal mb-1">AI</div>
                  <div className="text-xs text-gray-300">Powered Insights</div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm">
                <div className="text-gray-400 mb-2">// Real-time Cultural Analysis</div>
                <div className="text-cultural-emerald">const</div> <span className="text-white">insights</span> <span className="text-gray-400">=</span> <span className="text-cultural-emerald">await</span> <span className="text-white">generateCulturalInsights</span><span className="text-gray-400">(</span><br />
                &nbsp;&nbsp;<span className="text-cultural-purple">preferences:</span> <span className="text-white">userPrefs</span><span className="text-gray-400">,</span><br />
                &nbsp;&nbsp;<span className="text-cultural-purple">qlooData:</span> <span className="text-white">culturalAffinities</span><br />
                <span className="text-gray-400">);</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-cultural-teal via-cultural-emerald to-cultural-teal">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-display font-bold text-white mb-6">
            Discover Your Cultural Universe
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Join thousands of users exploring their global taste profiles and connecting with cultures worldwide through AI-powered insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link href="/questionnaire">
              <Button className="bg-white text-cultural-teal px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl">
                Start Your Cultural Journey
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-cultural-teal px-10 py-4 rounded-full font-bold text-lg">
                Explore Sample Profile
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/70 text-sm">
            <div className="flex items-center space-x-2">
              <Shield size={16} />
              <span>Privacy-First</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe size={16} />
              <span>Global Coverage</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain size={16} />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={16} />
              <span>Cultural Intelligence</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cultural-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cultural-teal to-cultural-emerald rounded-xl flex items-center justify-center">
                  <Globe className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold">CultureAI</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Connecting people with global cultures through AI-powered taste intelligence and personalized cultural discovery.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-6">Platform</h4>
              <div className="space-y-3 text-sm">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors block">How it Works</Link>
                <Link href="/profile" className="text-gray-300 hover:text-white transition-colors block">Cultural Insights</Link>
                <Link href="/questionnaire" className="text-gray-300 hover:text-white transition-colors block">Get Started</Link>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-6">Resources</h4>
              <div className="space-y-3 text-sm">
                <a href="#" className="text-gray-300 hover:text-white transition-colors block">Developer Guide</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors block">Cultural Blog</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors block">Research Papers</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors block">Support Center</a>
              </div>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 CultureAI. Powered by Qloo Taste AI™ and OpenAI.
            </p>
            <div className="text-gray-400 text-sm">
              Built for the Qloo LLM Hackathon 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
