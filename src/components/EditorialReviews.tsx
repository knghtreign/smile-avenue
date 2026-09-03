import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline } from './TextHighlight';
import { Star, MessageSquare, Quote, Sparkles, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

interface PatientReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  treatment: string;
  headline: string;
  comment: string;
  verified: boolean;
}

const REVIEWS_DATA: PatientReview[] = [
  {
    id: 'rev-1',
    author: 'Verified Local Patient',
    rating: 5,
    date: 'Recent Visit',
    treatment: 'Gentle Root Canal & Crown',
    headline: 'Completely painless experience in Sector 44',
    comment: 'I was very anxious about root canal treatment, but the dental team made it completely painless and calm. The clinic is extremely clean, modern, and open late in the evening which made after-work visits very easy.',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Sector 44 Resident',
    rating: 5,
    date: 'Verified Visit',
    treatment: 'Dental Cleaning & Polishing',
    headline: 'Pristine hygiene and unhurried consultation',
    comment: 'The doctor explained every detail of my teeth using digital intraoral scans. No forced treatments or unnecessary charges. Transparent fees, friendly team, and genuine 5-star clinic.',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Noida Professional',
    rating: 5,
    date: 'Verified Visit',
    treatment: 'Smile Restoration & Whitening',
    headline: 'Open until 10 PM is a lifesaver',
    comment: 'Having a top-quality dental clinic open until 10:00 PM in Noida is incredible. I finished my office shift and had my dental appointment at 8:30 PM with zero wait time. Highly recommend Smile Avenue.',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Family Patient',
    rating: 5,
    date: 'Verified Visit',
    treatment: 'Preventative Dental Care',
    headline: 'Caring environment for both adults and kids',
    comment: 'Great clinic environment in Village Chhalera, Sector 44. Very polite staff and gentle touch. My entire family visits here now for our routine dental maintenance.',
    verified: true,
  },
];

export const EditorialReviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = REVIEWS_DATA[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  };

  return (
    <section 
      id="reviews"
      aria-label="Verified Patient Reviews for Smile Avenue Dental Clinic"
      className="w-full py-20 sm:py-28 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <ScrollReveal yOffset={16} once={false}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#122342]/10 text-[11px] font-black uppercase tracking-[0.2em] text-[#122342] mb-3 font-general shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#6FA7D8]" aria-hidden="true" />
                <span>EDITORIAL REVIEWS COMPOSITION</span>
              </div>
            </ScrollReveal>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#122342] font-satoshi">
              <WordReveal 
                text="Authentic Words From" 
                as="span" 
                className="mr-2.5"
                once={false}
              />
              <AnimatedUnderline styleVariant="brush" color="#F4E94A" delay={0.25}>
                <span className="text-[#122342]">Real Patients.</span>
              </AnimatedUnderline>
            </h2>
          </div>

          <ScrollReveal yOffset={20} delay={0.15} once={false}>
            <div className="bg-white/80 rounded-2xl p-4 border border-[#122342]/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F4E94A] text-[#122342] flex items-center justify-center font-black text-xl">
                ★
              </div>
              <div>
                <div className="text-xl font-black text-[#122342] font-satoshi leading-none">
                  5.0 ★ Google Rating
                </div>
                <div className="text-xs font-bold text-[#122342]/70 uppercase tracking-wider font-general mt-1">
                  16 Verified Reviews · Sector 44, Noida
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Editorial Layout: Large Featured Review with Layered Behind Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Interactive Review Stage */}
          <div className="lg:col-span-8 relative">
            <div className="relative min-h-[380px] flex items-center">
              
              {/* Background stack visual effect */}
              <div 
                aria-hidden="true"
                className="absolute inset-0 translate-y-3 translate-x-2 bg-[#DCE8B8]/60 rounded-[36px] border border-white pointer-events-none"
              />
              <div 
                aria-hidden="true"
                className="absolute inset-0 translate-y-1.5 -translate-x-1 bg-[#6FA7D8]/30 rounded-[36px] border border-white pointer-events-none"
              />

              {/* Foreground Animated Featured Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReview.id}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full rounded-[36px] bg-[#FFFDF7] p-8 sm:p-12 shadow-[0_20px_50px_rgba(18,35,66,0.12)] border-2 border-white flex flex-col justify-between z-10"
                >
                  <div>
                    {/* Top Row: Stars & Treatment Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(activeReview.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#F4E94A] text-[#122342]" />
                        ))}
                        <span className="ml-2 font-black text-xs text-[#122342] font-general">
                          5.0 / 5.0
                        </span>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-[#6FA7D8]/20 text-[#122342] text-[10px] font-black uppercase tracking-widest font-general">
                        {activeReview.treatment}
                      </span>
                    </div>

                    {/* Review Quote */}
                    <div className="relative mb-6">
                      <Quote className="w-10 h-10 text-[#6FA7D8]/20 absolute -top-4 -left-3 pointer-events-none" />
                      <h3 className="text-xl sm:text-2xl font-black text-[#122342] font-satoshi tracking-tight mb-3 relative z-10">
                        "{activeReview.headline}"
                      </h3>
                      <p className="text-sm sm:text-base text-[#122342]/85 font-medium leading-relaxed font-general">
                        {activeReview.comment}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: Author & Navigation Controls */}
                  <div className="pt-6 border-t border-[#122342]/10 flex items-center justify-between">
                    <div>
                      <div className="font-black text-sm text-[#122342] font-general flex items-center gap-1.5">
                        <span>{activeReview.author}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#6FA7D8]" />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#122342]/60 font-general mt-0.5">
                        Verified Google Maps Patient · {activeReview.date}
                      </div>
                    </div>

                    {/* Slider Navigation */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-full bg-[#122342]/10 hover:bg-[#122342] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Previous patient review"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-full bg-[#F4E94A] hover:bg-[#ebd931] text-[#122342] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                        aria-label="Next patient review"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* Right Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-[#122342]/60 font-general mb-2">
              ALL VERIFIED REVIEWS ({REVIEWS_DATA.length})
            </div>

            {REVIEWS_DATA.map((rev, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={rev.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border-2 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#6FA7D8] text-white border-white shadow-md -translate-x-1'
                      : 'bg-white/60 text-[#122342] border-transparent hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider font-general opacity-85">
                      {rev.treatment}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 fill-current ${isSelected ? 'text-[#F4E94A]' : 'text-[#F4E94A]'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="font-bold text-xs truncate font-general">
                    {rev.headline}
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
