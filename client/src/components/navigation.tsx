import { Link, useLocation } from "wouter";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Discover" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cultural-teal to-cultural-emerald rounded-xl flex items-center justify-center">
              <Globe className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-display font-bold text-cultural-teal">CultureAI</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link 
                key={href}
                href={href}
                className={`transition-colors ${
                  location === href 
                    ? "text-cultural-teal font-semibold" 
                    : "text-gray-600 hover:text-cultural-teal"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link href="/questionnaire">
              <Button className="bg-cultural-teal hover:bg-cultural-teal/90 text-white">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map(({ href, label }) => (
                <Link 
                  key={href}
                  href={href}
                  className={`px-4 py-2 transition-colors ${
                    location === href 
                      ? "text-cultural-teal font-semibold" 
                      : "text-gray-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link href="/questionnaire" className="px-4">
                <Button 
                  className="w-full bg-cultural-teal hover:bg-cultural-teal/90 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
