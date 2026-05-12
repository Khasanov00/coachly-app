import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-brand-text">Coachly</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-sm font-medium text-brand-muted hover:text-brand-primary transition-colors">Find Coaches</Link>
            <Link href="#" className="text-sm font-medium text-brand-muted hover:text-brand-primary transition-colors">How It Works</Link>
            <Link href="/profile" className="text-sm font-medium text-brand-muted hover:text-brand-primary transition-colors">My Profile</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-brand-text hover:text-brand-primary transition-colors">Log in</Link>
            <Link href="/login" className="bg-brand-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-secondary transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
