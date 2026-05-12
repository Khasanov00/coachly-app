"use client";

import React, { useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { BookingSection } from '@/components/BookingSection';
import { CoachesGrid } from '@/components/CoachesGrid';
import { TestimonialsGrid } from '@/components/TestimonialsGrid';
import { Footer } from '@/components/Footer';
import { Star, CheckCircle2, Calendar, ShieldCheck, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const trustRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      
      tl.from(headingRef.current, {
        y: 60,
        opacity: 0,
        delay: 0.5,
      })
      .from(subtextRef.current, {
        y: 40,
        opacity: 0,
      }, '-=0.7')
      .from(trustRef.current, {
        y: 20,
        opacity: 0,
      }, '-=0.7');

      // Scroll reveals for Expo style
      const revealElements = gsap.utils.toArray('.expo-reveal');
      revealElements.forEach((el: any) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-white selection:bg-brand-primary/20">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left lg:max-w-3xl">
            <div ref={trustRef} className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                      alt="User avatar" 
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-bold text-brand-text">4.9/5</span>
                </div>
                <p className="text-xs text-brand-muted font-medium">Trusted by 2,500+ individuals worldwide</p>
              </div>
            </div>

            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-bold tracking-wide uppercase">
              Find Your Path. Book Your Session.
            </div>
            
            <h1 ref={headingRef} className="text-5xl lg:text-7xl font-extrabold text-brand-text leading-[1.1] mb-8">
              Expert Coaching. <br />
              <span className="text-brand-primary">Real Results.</span>
            </h1>
            
            <p ref={subtextRef} className="text-xl text-brand-muted leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
              Connect with certified coaches and achieve your goals through 
              personalized guidance and support. We help you transform your 
              business, career, and life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto bg-brand-primary text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-brand-secondary transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Book Your Session
              </button>
              <button className="w-full sm:w-auto bg-white text-brand-text border-2 border-gray-100 px-10 py-4 rounded-xl text-lg font-bold hover:border-brand-primary hover:text-brand-primary transition-all">
                How it works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Banner */}
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-primary">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-text text-sm">Verified Coaches</h4>
                <p className="text-xs text-brand-muted">Vetted professionals</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-primary">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-text text-sm">Flexible Scheduling</h4>
                <p className="text-xs text-brand-muted">Fits your routine</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-text text-sm">Secure & Private</h4>
                <p className="text-xs text-brand-muted">Encrypted data</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-primary">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-text text-sm">Proven Results</h4>
                <p className="text-xs text-brand-muted">Success stories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingSection />
      
      <CoachesGrid />

      <TestimonialsGrid />

      <Footer />
    </main>
  );
}
