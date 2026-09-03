import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';
import { Sparkles, ArrowRight, Sliders, CheckCircle2, Star, ShieldCheck } from 'lucide-react';

interface BeforeAfterSectionProps {
  onOpenBooking: () => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onOpenBooking }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    handlePointerMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    handlePointerMove(e.touches[0].clientX);
  };

  return (
    <section 
      id="before-after"
      aria-label="Smile Restoration Before and After Comparison"
      className="w-full py-20 sm:py-28 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <ScrollReveal yOffset={16} once={false}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#122342]/10 text-[11px] font-black uppercase tracking-[0.2em] text-[#122342] mb-3 font-general shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#6FA7D8]" aria-hidden="true" />
                <span>CLINICAL RESTORATION SLIDER</span>
              </div>
            </ScrollReveal>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#122342] font-satoshi">
              <WordReveal 
                text="Visible Precision." 
                as="span" 
                className="mr-2.5"
                once={false}
              />
              <AnimatedUnderline styleVariant="brush" color="#F4E94A" delay={0.25}>
                <span className="text-[#122342]">Lasting Confidence.</span>
              </AnimatedUnderline>
            </h2>
          </div>

          <ScrollReveal yOffset={20} delay={0.15} once={false}>
            <p className="text-sm sm:text-base font-semibold text-[#122342]/80 max-w-md font-general">
              Drag the interactive split slider to compare initial enamel staining against our clinical <TextHighlight color="#F4E94A" textColor="#122342">whitening & restoration protocol</TextHighlight>.
            </p>
          </ScrollReveal>
        </div>

        {/* Comparison Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: The Interactive Drag Split Slider */}
          <div className="lg:col-span-7">
            <ScrollReveal yOffset={24} delay={0.1} once={false}>
              <div 
                ref={containerRef}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative aspect-[16/11] rounded-[36px] overflow-hidden border-2 border-white/80 shadow-[0_25px_60px_rgba(18,35,66,0.18)] cursor-ew-resize select-none bg-[#122342]"
              >
                {/* AFTER IMAGE (Full width base) */}
                <img
                  src="/src/assets/images/final_smile_1788182817999.jpg"
                  alt="Smile Avenue Dental Clinic Restored Radiance After Treatment"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                />

                {/* BEFORE IMAGE (Clipped overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden select-none pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src="/src/assets/images/dental_cleaning_visit_1788185633482.jpg"
                    alt="Smile Avenue Dental Clinic Clinical Checkup Before Whitening"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                  />
                  {/* Subtle darkening tone to indicate initial state */}
                  <div className="absolute inset-0 bg-amber-900/10 pointer-events-none" />
                </div>

                {/* The Draggable Split Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-[3px] bg-[#F4E94A] z-20 pointer-events-none shadow-[0_0_10px_rgba(244,233,74,0.8)]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Handle Pill */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#F4E94A] text-[#122342] shadow-[0_6px_20px_rgba(18,35,66,0.3)] border-2 border-white flex items-center justify-center">
                    <Sliders className="w-4 h-4 rotate-90" />
                  </div>
                </div>

                {/* Left & Right Labels */}
                <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-[#122342]/85 text-white text-[10px] font-black uppercase tracking-widest font-general backdrop-blur-xs pointer-events-none z-10">
                  BEFORE (INITIAL)
                </div>

                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-[#F4E94A] text-[#122342] text-[10px] font-black uppercase tracking-widest font-general shadow-md pointer-events-none z-10">
                  AFTER (RESTORED)
                </div>

                {/* Bottom Guide Prompt */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 text-white/90 text-[10px] font-bold uppercase tracking-wider font-general backdrop-blur-md pointer-events-none z-10 flex items-center gap-1.5">
                  <span>← Drag split slider left or right →</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT: Restorative Highlights Card */}
          <div className="lg:col-span-5 bg-[#FFFDF7] rounded-[36px] p-7 sm:p-9 border-2 border-white/90 shadow-xl space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6FA7D8]/15 text-[#122342] text-[10px] font-black uppercase tracking-widest font-general">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6FA7D8]" />
              <span>MEASURABLE OUTCOMES</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#122342] font-satoshi tracking-tight">
              Predictable, natural enamel rejuvenation.
            </h3>

            <p className="text-sm sm:text-base text-[#122342]/80 font-medium leading-relaxed font-general">
              At Smile Avenue Dental Clinic, we focus on biological preservation. We restore healthy tooth shade and structural integrity without unnecessary enamel removal or invasive procedures.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6FA7D8] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-[#122342]">
                  Gentle non-acidic whitening agents protecting sensitive gums
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6FA7D8] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-[#122342]">
                  Sub-millimeter edge contours for comfortable bite alignment
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6FA7D8] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-[#122342]">
                  High-gloss protective finish sealing enamel pores against stains
                </span>
              </div>
            </div>

            {/* Google Rating Verification Box */}
            <div className="p-3.5 rounded-2xl bg-[#DCE8B8]/40 border border-[#DCE8B8] flex items-center justify-between mt-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#122342]/70 font-general block">
                  COMMUNITY REVIEWS
                </span>
                <span className="text-base font-black text-[#122342] font-satoshi">
                  5.0 ★ Google Rating · 16 Reviews
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#F4E94A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F4E94A]" />
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-[#F4E94A] text-[#122342] font-black text-xs uppercase tracking-wider shadow-md hover:bg-[#ebd931] hover:scale-105 active:scale-95 transition-all font-general cursor-pointer flex items-center gap-2"
              >
                <span>Book Smile Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="text-xs font-black uppercase tracking-wider text-[#122342]/80 hover:text-[#122342] transition-colors py-2 font-general"
              >
                093685 41439
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
