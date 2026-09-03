import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TREATMENTS_DATA, CLINIC_INFO } from '../data/clinicData';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface TreatmentInteractionProps {
  onOpenBooking: () => void;
}

export const TreatmentInteraction: React.FC<TreatmentInteractionProps> = ({ onOpenBooking }) => {
  const [activeId, setActiveId] = useState('whitening');
  const [ripplePulse, setRipplePulse] = useState(0);

  const activeTreatment = TREATMENTS_DATA.find((t) => t.id === activeId) || TREATMENTS_DATA[0];

  const handleSelect = (id: string) => {
    setActiveId(id);
    setRipplePulse((prev) => prev + 1);
  };

  return (
    <section 
      id="treatments"
      aria-label="Interactive Dental Treatments Visualizer"
      className="w-full py-20 sm:py-28 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <ScrollReveal yOffset={16} once={false}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#122342]/10 text-[11px] font-black uppercase tracking-[0.2em] text-[#122342] mb-3 font-general shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#6FA7D8]" aria-hidden="true" />
                <span>CENTRAL TREATMENT VISUALIZER</span>
              </div>
            </ScrollReveal>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#122342] font-satoshi">
              <WordReveal 
                text="Precision Dentistry" 
                as="span" 
                className="mr-2.5"
                once={false}
              />
              <AnimatedUnderline styleVariant="brush" color="#F4E94A" delay={0.3}>
                <span className="text-[#122342]">Transformed.</span>
              </AnimatedUnderline>
            </h2>
          </div>

          <ScrollReveal yOffset={20} delay={0.15} once={false}>
            <p className="text-sm sm:text-base font-semibold text-[#122342]/80 max-w-md font-general">
              Click any treatment to trigger the interactive dental object transformation, revealing our clinical methodology and <TextHighlight color="#F4E94A" textColor="#122342">restorative precision</TextHighlight>.
            </p>
          </ScrollReveal>
        </div>

        {/* Large Rounded Container */}
        <div className="rounded-[36px] sm:rounded-[48px] bg-[#6FA7D8] p-6 sm:p-10 lg:p-14 border-2 border-white/80 shadow-[0_30px_70px_rgba(18,35,66,0.18)] relative overflow-hidden">
          
          {/* Top Interactive Selector Tabs */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-10 relative z-20 justify-center lg:justify-start">
            {TREATMENTS_DATA.map((item) => {
              const isActive = activeId === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  className={`px-5 py-3 rounded-full font-black text-xs sm:text-[13px] uppercase tracking-wider transition-all duration-300 font-general cursor-pointer border-2 relative overflow-hidden ${
                    isActive
                      ? 'bg-[#F4E94A] text-[#122342] border-white shadow-[0_8px_25px_rgba(244,233,74,0.4)]'
                      : 'bg-[#FFFDF7]/90 text-[#122342] border-transparent hover:bg-white'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-treatment-pill"
                      className="absolute inset-0 bg-[#F4E94A] -z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Grid Layout: Central Transforming Dental Object & Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* LEFT / CENTER: The Transforming Dental Object */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[340px] sm:min-h-[420px]">
              
              {/* Interaction Ripple Rings */}
              <motion.div
                key={`ripple-${ripplePulse}`}
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute w-72 h-72 rounded-full border-2 border-[#F4E94A] pointer-events-none"
              />

              {/* Central Tooth Container with Clip-Path & Layered Reveal */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                
                {/* Background Aura */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-white/20 blur-2xl pointer-events-none"
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Transforming SVG Tooth Object */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    initial={{ scale: 0.88, rotate: -4, opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
                    animate={{ scale: 1, rotate: 0, opacity: 1, clipPath: 'circle(100% at 50% 50%)' }}
                    exit={{ scale: 0.9, rotate: 4, opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <svg
                      viewBox="0 0 240 240"
                      className="w-full h-full drop-shadow-[0_20px_40px_rgba(18,35,66,0.3)]"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Base Human Molar Crown Anatomy */}
                      <path
                        d="M60 70 C55 35, 100 25, 120 40 C140 25, 185 35, 180 70 C175 110, 190 160, 165 210 C150 215, 135 170, 120 150 C105 170, 90 215, 75 210 C50 160, 65 110, 60 70 Z"
                        fill="#FFFDF7"
                        stroke="#122342"
                        strokeWidth="3.5"
                      />

                      {/* Internal Structure Visualizations Based on Active Treatment */}
                      {activeId === 'whitening' && (
                        /* Luminous Sparkle & Enamel Radiance */
                        <g>
                          <circle cx="120" cy="80" r="30" fill="#F4E94A" opacity="0.4" />
                          <path d="M120 45 L124 65 L144 69 L124 73 L120 93 L116 73 L96 69 L116 65 Z" fill="#F4E94A" />
                          <path d="M150 90 L152 100 L162 102 L152 104 L150 114 L148 104 L138 102 L148 100 Z" fill="#FFFDF7" />
                          <path d="M90 90 L92 100 L102 102 L92 104 L90 114 L88 104 L78 102 L88 100 Z" fill="#FFFDF7" />
                        </g>
                      )}

                      {activeId === 'root-canal' && (
                        /* Internal Pulp Canal & Precision Sealing */
                        <g>
                          <path d="M120 70 L120 130 M105 130 L95 190 M135 130 L145 190" stroke="#6FA7D8" strokeWidth="6" strokeLinecap="round" />
                          <circle cx="120" cy="70" r="8" fill="#F4E94A" />
                          <circle cx="95" cy="190" r="5" fill="#F4E94A" />
                          <circle cx="145" cy="190" r="5" fill="#F4E94A" />
                        </g>
                      )}

                      {activeId === 'veneers' && (
                        /* Exterior Ceramic Shell Layer */
                        <g>
                          <path
                            d="M65 65 C85 45, 155 45, 175 65 C180 90, 180 130, 170 145 C140 155, 100 155, 70 145 C60 130, 60 90, 65 65 Z"
                            fill="#49B9B1"
                            opacity="0.35"
                            stroke="#49B9B1"
                            strokeWidth="2.5"
                          />
                          <line x1="85" y1="65" x2="85" y2="140" stroke="#FFFDF7" strokeWidth="2" strokeDasharray="3 3" />
                          <line x1="120" y1="55" x2="120" y2="145" stroke="#FFFDF7" strokeWidth="2" strokeDasharray="3 3" />
                          <line x1="155" y1="65" x2="155" y2="140" stroke="#FFFDF7" strokeWidth="2" strokeDasharray="3 3" />
                        </g>
                      )}

                      {activeId === 'implants' && (
                        /* Titanium Screw Foundation Anchor */
                        <g>
                          <rect x="105" y="140" width="30" height="70" rx="6" fill="#122342" />
                          <line x1="100" y1="155" x2="140" y2="155" stroke="#F4E94A" strokeWidth="3" />
                          <line x1="100" y1="170" x2="140" y2="170" stroke="#F4E94A" strokeWidth="3" />
                          <line x1="100" y1="185" x2="140" y2="185" stroke="#F4E94A" strokeWidth="3" />
                          <line x1="105" y1="200" x2="135" y2="200" stroke="#F4E94A" strokeWidth="3" />
                        </g>
                      )}

                      {activeId === 'cleaning' && (
                        /* Ultrasonic Scaling Waves */
                        <g>
                          <path d="M45 90 Q35 105 45 120" stroke="#F4E94A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                          <path d="M35 80 Q20 105 35 130" stroke="#FFFDF7" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                          <path d="M195 90 Q205 105 195 120" stroke="#F4E94A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                          <path d="M205 80 Q220 105 205 130" stroke="#FFFDF7" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                        </g>
                      )}
                    </svg>
                  </motion.div>
                </AnimatePresence>

                {/* Floating Status Pill */}
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 bg-[#122342] text-[#FFFDF7] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest font-general shadow-md border border-white/30"
                >
                  {activeTreatment.tagline}
                </motion.div>
              </div>
            </div>

            {/* RIGHT: Detailed Narrative Card */}
            <div className="lg:col-span-5 bg-[#FFFDF7] rounded-[32px] p-6 sm:p-8 border-2 border-white/90 shadow-xl space-y-4 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6FA7D8]/15 text-[#122342] text-[10px] font-black uppercase tracking-widest font-general">
                <Sparkles className="w-3.5 h-3.5 text-[#6FA7D8]" />
                <span>CLINICAL EXCELLENCE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#122342] font-satoshi tracking-tight">
                {activeTreatment.shortTitle}
              </h3>

              <p className="text-sm sm:text-base text-[#122342]/85 font-medium leading-relaxed font-general">
                {activeTreatment.description}
              </p>

              {/* Verified Clinical Attributes */}
              <div className="pt-2 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#122342]">
                  <CheckCircle2 className="w-4 h-4 text-[#6FA7D8]" />
                  <span>{activeTreatment.benefit}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#122342]">
                  <CheckCircle2 className="w-4 h-4 text-[#6FA7D8]" />
                  <span>Autoclaved micro-sterilisation protocol</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#122342]">
                  <CheckCircle2 className="w-4 h-4 text-[#6FA7D8]" />
                  <span>Evening appointments open until 10:00 PM</span>
                </div>
              </div>

              {/* Booking Trigger */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-full bg-[#F4E94A] text-[#122342] font-black text-xs uppercase tracking-wider shadow-md hover:bg-[#ebd931] hover:scale-105 active:scale-95 transition-all font-general cursor-pointer flex items-center gap-2"
                >
                  <span>Book {activeTreatment.shortTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="text-xs font-black uppercase tracking-wider text-[#122342]/80 hover:text-[#122342] transition-colors py-2 font-general"
                >
                  Call {CLINIC_INFO.phoneDisplay}
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
