import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Coachly completely transformed my approach to leadership. Within 3 months of working with Eleanor, I secured the promotion I had been chasing for years.",
    author: "Michael T.",
    role: "VP of Product",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5
  },
  {
    id: 2,
    content: "The booking process is seamless, and the quality of coaches is unmatched. I finally found someone who understands the unique challenges of scaling a tech startup.",
    author: "Sarah L.",
    role: "Startup Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5
  },
  {
    id: 3,
    content: "I was struggling with burnout and productivity. Jerome helped me rebuild my routine from the ground up. I've never felt more energized and focused.",
    author: "David W.",
    role: "Senior Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    rating: 5
  }
];

export const TestimonialsGrid = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto expo-reveal">
          <h2 className="text-4xl font-extrabold text-brand-text mb-4">Real Stories. Real Impact.</h2>
          <p className="text-lg text-brand-muted">Don't just take our word for it. Hear from the professionals who have elevated their careers through Coachly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative expo-reveal">
              <Quote className="absolute top-8 right-8 w-10 h-10 text-brand-primary/10" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-brand-text text-lg leading-relaxed font-medium mb-8 relative z-10">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-primary/20"
                />
                <div>
                  <h4 className="font-bold text-brand-text">{testimonial.author}</h4>
                  <p className="text-sm text-brand-muted font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
