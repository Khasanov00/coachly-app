import React from 'react';
import { Star } from 'lucide-react';

const coaches = [
  {
    id: 1,
    name: "Eleanor Pena",
    role: "Leadership Coach",
    rating: 4.9,
    reviews: 128,
    tags: ["Executive", "Career Growth"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Arlene McCoy",
    role: "Business Strategist",
    rating: 5.0,
    reviews: 84,
    tags: ["Startups", "Scaling"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Jerome Bell",
    role: "Mindset & Performance",
    rating: 4.8,
    reviews: 205,
    tags: ["Productivity", "Wellness"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
  }
];

export const CoachesGrid = () => {
  return (
    <section className="py-24 bg-zinc-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl expo-reveal">
            <h2 className="text-4xl font-extrabold text-brand-text mb-4">Meet Our Top Coaches</h2>
            <p className="text-lg text-brand-muted">Work with industry experts who have a proven track record of helping people just like you achieve incredible results.</p>
          </div>
          <button className="whitespace-nowrap px-6 py-3 rounded-xl border-2 border-brand-primary text-brand-primary font-bold hover:bg-brand-primary hover:text-white transition-colors expo-reveal">
            View All Coaches
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach) => (
            <div key={coach.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 expo-reveal group">
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img 
                  src={coach.image} 
                  alt={coach.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-brand-text">{coach.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {coach.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-brand-text mb-1">{coach.name}</h3>
                <p className="text-brand-muted text-sm font-medium mb-6">{coach.role}</p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                  <span className="text-sm text-brand-muted font-medium">{coach.reviews} Reviews</span>
                  <button className="text-brand-primary font-bold text-sm hover:text-brand-secondary transition-colors">
                    View Profile &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
