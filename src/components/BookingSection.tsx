"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { createBooking } from "@/actions/booking";
import { useSession } from "next-auth/react";

export const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string>("9:00 AM");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("date", `2026-05-${selectedDate}`);
    formData.append("time", selectedTime);
    
    try {
      await createBooking(formData);
      setSuccess(true);
    } catch (error: any) {
      alert(error.message || "Failed to book session. Are you logged in?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 lg:p-12 expo-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Side - Calendar Mock */}
            <div>
              <h3 className="text-xl font-bold text-brand-text mb-8">1. Select Date & Time</h3>
              
              <div className="flex items-center justify-between mb-6">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft className="w-5 h-5 text-brand-muted" /></button>
                <span className="font-semibold text-brand-text">May 2026</span>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight className="w-5 h-5 text-brand-muted" /></button>
              </div>

              <div className="grid grid-cols-7 gap-y-4 text-center mb-8">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-xs font-medium text-brand-muted">{day}</div>
                ))}
                
                {/* Mock empty days */}
                <div className="text-sm text-gray-300 py-2">28</div>
                <div className="text-sm text-gray-300 py-2">29</div>
                <div className="text-sm text-gray-300 py-2">30</div>
                <div className="text-sm text-gray-300 py-2">1</div>
                
                {/* Mock active days */}
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(day => (
                  <button key={day} onClick={() => setSelectedDate(day)} className={`text-sm py-2 rounded-full cursor-pointer transition-colors ${selectedDate === day ? "bg-brand-primary text-white font-bold shadow-md" : "text-brand-text hover:bg-gray-50"}`}>{day}</button>
                ))}
                
                <button onClick={() => setSelectedDate(15)} className={`text-sm py-2 rounded-full cursor-pointer transition-colors ${selectedDate === 15 ? "bg-brand-primary text-white font-bold shadow-md shadow-brand-primary/30" : "text-brand-text hover:bg-gray-50"}`}>15</button>

                {[16, 17, 18, 19, 20, 21].map(day => (
                  <button key={day} onClick={() => setSelectedDate(day)} className={`text-sm py-2 rounded-full cursor-pointer transition-colors ${selectedDate === day ? "bg-brand-primary text-white font-bold shadow-md" : "text-brand-text hover:bg-gray-50"}`}>{day}</button>
                ))}
                
                <button onClick={() => setSelectedDate(22)} className={`text-sm py-2 rounded-full cursor-pointer transition-colors flex flex-col items-center ${selectedDate === 22 ? "bg-brand-primary text-white font-bold shadow-md" : "text-brand-text hover:bg-gray-50"}`}>
                  <span>22</span>
                  {selectedDate !== 22 && <div className="w-1 h-1 bg-brand-primary rounded-full mt-0.5"></div>}
                </button>

                {[23, 24, 25, 26, 27, 28, 29, 30, 31].map(day => (
                   <button key={day} onClick={() => setSelectedDate(day)} className={`text-sm py-2 rounded-full cursor-pointer transition-colors ${selectedDate === day ? "bg-brand-primary text-white font-bold shadow-md" : "text-brand-text hover:bg-gray-50"}`}>{day}</button>
                ))}
              </div>

              <div className="mb-4">
                <span className="text-sm font-semibold text-brand-text">Available Time Slots</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"].map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 px-4 text-sm font-medium rounded-xl transition-colors ${selectedTime === time ? "border-2 border-brand-primary text-brand-primary bg-brand-primary/5" : "border border-gray-200 text-brand-text hover:border-brand-primary/50"}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              <h3 className="text-xl font-bold text-brand-text mb-8">2. Your Details</h3>
              
              {success ? (
                <div className="bg-green-50 text-green-800 p-8 rounded-3xl text-center">
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                  <p>Your session is scheduled for May {selectedDate} at {selectedTime}. You can view the details in your profile dashboard.</p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-xs font-semibold text-brand-text mb-1.5">Full Name</label>
                    <div className="relative">
                      <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none text-sm transition-all bg-white" placeholder="John Doe" />
                      <Check className="absolute right-4 top-3.5 w-4 h-4 text-brand-primary" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-text mb-1.5">Email Address</label>
                    <div className="relative">
                      <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none text-sm transition-all bg-white" placeholder="john.doe@email.com" />
                      <Check className="absolute right-4 top-3.5 w-4 h-4 text-brand-primary" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-text mb-1.5">Goals (Optional)</label>
                    <textarea name="goals" placeholder="Tell us what you'd like to achieve..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none text-sm transition-all bg-white resize-none h-24"></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full bg-brand-primary text-white py-4 rounded-xl text-sm font-bold hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 disabled:opacity-50">
                    {isSubmitting ? "Confirming..." : "Book Your Session"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <p className="text-center text-xs text-brand-muted font-medium flex items-center justify-center gap-1.5 mt-4">
                    <ShieldCheck className="w-4 h-4 text-brand-primary" />
                    Secure booking • You can reschedule anytime
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
