import { useEffect, useRef } from "react";

interface WorldMapProps {
  culturalConnections?: Array<{
    lat: number;
    lng: number;
    name: string;
    category: string;
    color: string;
  }>;
}

export default function WorldMap({ culturalConnections = [] }: WorldMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This would integrate with React Leaflet or similar mapping library
    // For now, showing a placeholder with connection points
    if (mapRef.current && culturalConnections.length > 0) {
      // Add connection point animations
      const points = mapRef.current.querySelectorAll('.connection-point');
      points.forEach((point, index) => {
        (point as HTMLElement).style.animationDelay = `${index * 0.5}s`;
      });
    }
  }, [culturalConnections]);

  // Default connection points for demonstration
  const defaultConnections = [
    { id: '1', top: '25%', left: '33%', category: 'music', color: 'cultural-amber' },
    { id: '2', top: '50%', left: '50%', category: 'food', color: 'cultural-terracotta' },
    { id: '3', top: '33%', right: '25%', category: 'art', color: 'cultural-purple' },
    { id: '4', bottom: '33%', left: '25%', category: 'travel', color: 'cultural-emerald' },
  ];

  return (
    <div className="relative bg-cultural-charcoal rounded-3xl p-8 border border-gray-600">
      {/* Map Container */}
      <div ref={mapRef} className="relative">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
          alt="Interactive world map visualization showing global cultural connections and taste patterns" 
          className="w-full h-96 object-cover rounded-xl" 
        />

        {/* Cultural connection overlays */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {defaultConnections.map((point) => (
              <div
                key={point.id}
                className={`connection-point absolute w-4 h-4 bg-${point.color} rounded-full animate-pulse-slow shadow-lg`}
                style={{
                  top: point.top,
                  left: point.left,
                  right: point.right,
                  bottom: point.bottom,
                  boxShadow: `0 0 20px var(--${point.color})`
                }}
              />
            ))}
          </div>
        </div>

        {/* Cultural insights panel */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h4 className="font-semibold text-lg mb-4 text-white">Cultural Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-cultural-amber rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <i className="fas fa-music text-white text-sm"></i>
                </div>
                <p className="text-sm font-medium text-white">Music Affinity</p>
                <p className="text-xs text-gray-300">Latin & Afrobeat</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-cultural-terracotta rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <i className="fas fa-utensils text-white text-sm"></i>
                </div>
                <p className="text-sm font-medium text-white">Cuisine Profile</p>
                <p className="text-xs text-gray-300">Mediterranean & Asian</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-cultural-purple rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <i className="fas fa-camera text-white text-sm"></i>
                </div>
                <p className="text-sm font-medium text-white">Art Preference</p>
                <p className="text-xs text-gray-300">Contemporary & Traditional</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
