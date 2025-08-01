import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Brain, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 via-white to-cultural-teal/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-cultural-charcoal leading-tight mb-6">
              Discover Your 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cultural-teal to-cultural-emerald">
                {" "}Global Taste
              </span>
              {" "}Profile
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Powered by AI and cultural intelligence, CultureAI connects your preferences across music, food, travel, and lifestyle to reveal your unique cultural DNA and recommend experiences from around the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/questionnaire">
                <Button className="bg-cultural-teal hover:bg-cultural-teal/90 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105">
                  Start Cultural Discovery
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" className="border-2 border-cultural-teal text-cultural-teal hover:bg-cultural-teal hover:text-white px-8 py-4 rounded-full font-semibold">
                  View Sample Profile
                </Button>
              </Link>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cultural-amber/20 rounded-lg flex items-center justify-center">
                  <Brain className="text-cultural-amber" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-sm">AI-Powered Insights</p>
                  <p className="text-gray-500 text-xs">LLM + Qloo Integration</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cultural-purple/20 rounded-lg flex items-center justify-center">
                  <MapPin className="text-cultural-purple" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-sm">Global Connections</p>
                  <p className="text-gray-500 text-xs">575M+ Cultural Entities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero visualization */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Interactive world map showing cultural connections and diversity" 
              className="rounded-2xl shadow-2xl w-full h-auto animate-float" 
            />
            
            {/* Floating cultural elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-cultural-terracotta rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
              <i className="fas fa-music text-white text-xl"></i>
            </div>
            <div className="absolute top-8 -right-8 w-20 h-20 bg-cultural-amber rounded-full flex items-center justify-center shadow-lg animate-float" style={{animationDelay: '2s'}}>
              <i className="fas fa-utensils text-white text-xl"></i>
            </div>
            <div className="absolute -bottom-6 left-12 w-14 h-14 bg-cultural-purple rounded-full flex items-center justify-center shadow-lg animate-pulse-slow" style={{animationDelay: '4s'}}>
              <i className="fas fa-theater-masks text-white"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
