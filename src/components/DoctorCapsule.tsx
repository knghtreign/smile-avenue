import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { X, Phone, Calendar, Clock, MapPin, Sparkles, UserCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface DoctorCapsuleProps {
  onOpenBooking: () => void;
}

export const DoctorCapsule: React.FC<DoctorCapsuleProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      id="dentist-capsule"
      aria-label="Meet Your Dentist Interactive Capsule"
      className="w-full py-16 sm:py-24 px-4 sm:px-8 relative flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Decorative ambient background */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#6FA7D8]/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        
        {/* Section Context Header */}
        <ScrollReveal yOffset={16} once={false}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-white/80 text-[11px] font-black uppercase tracking-[0.2em] text-[#122342] mb-3 shadow-sm font-general">
            <Sparkles className="w-3.5 h-3.5 text-[#6FA7D8]" aria-hidden="true" />
            <span>CLINICAL LEADERSHIP</span>
          </div>
        </ScrollReveal>

        <ScrollReveal yOffset={20} delay={0.1} once={false}>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#122342] tracking-tight font-satoshi mb-3">
            Gentle hands. Direct communication.
          </h2>
          <p className="text-sm sm:text-base text-[#122342]/75 font-medium max-w-lg mx-auto mb-8 font-general">
            At Smile Avenue Dental Clinic in Sector 44, Noida, our clinical consultations are transparent, patient-first, and never rushed.
          </p>
        </ScrollReveal>

        {/* The Interactive Capsule Stage */}
        <div className="relative min-h-[120px] flex items-center justify-center w-full my-4">
          
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* THE UNIFIED CAPSULE / PILL */
              <motion.div
                key="closed-capsule"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ scale: 0.95, opacity: 0.8 }}
                transition={{ duration: 0.4 }}
                className="relative flex items-center justify-center"
              >
                {/* Glow ring */}
                <motion.div 
                  className="absolute -inset-2 rounded-full bg-[#F4E94A]/40 blur-md pointer-events-none"
                  animate={{
                    opacity: isHovered ? [0.6, 0.9, 0.6] : 0.4,
                    scale: isHovered ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />

                <motion.button
                  id="meet-dentist-pill"
                  onClick={() => setIsOpen(true)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="relative group w-[124px] sm:w-[136px] h-[38px] sm:h-[42px] rounded-full bg-[#F4E94A] text-[#122342] font-black text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-general shadow-[0_12px_30px_rgba(18,35,66,0.18)] border-2 border-white flex items-center justify-center overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#F4E94A]/60"
                  aria-label="Click to open: Meet Your Dentist interactive information panel"
                >
                  {/* Subtle vertical center seam line hint */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#122342]/15 pointer-events-none" />

                  {/* Left Half shimmer */}
                  <span className="relative z-10 flex items-center gap-1.5 px-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#122342] animate-ping" />
                    <span>MEET DENTIST</span>
                  </span>

                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  />
                </motion.button>
              </motion.div>
            ) : (
              /* THE PHYSICALLY SPLIT & EXPANDED CAPSULE PANEL */
              <motion.div
                key="open-capsule"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-2xl bg-[#FFFDF7] rounded-[36px] shadow-[0_30px_70px_rgba(18,35,66,0.22)] border-2 border-[#6FA7D8]/40 overflow-hidden p-6 sm:p-8 text-left"
              >
                {/* Physical Top Seam Indicator showing the two separated halves */}
                <div className="flex items-center justify-between pb-4 border-b border-[#122342]/10 mb-6">
                  <div className="flex items-center gap-2">
                    {/* Left half pill fragment */}
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="px-3 py-1 rounded-l-full bg-[#F4E94A] text-[#122342] text-[10px] font-black uppercase tracking-wider font-general"
                    >
                      CLINICAL
                    </motion.div>
                    {/* Right half pill fragment */}
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="px-3 py-1 rounded-r-full bg-[#6FA7D8] text-white text-[10px] font-black uppercase tracking-wider font-general"
                    >
                      PROFILE
                    </motion.div>
                  </div>

                  {/* Close button to snap capsule back together */}
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full bg-[#122342]/10 hover:bg-[#122342] hover:text-white flex items-center justify-center text-[#122342] transition-colors cursor-pointer"
                    aria-label="Close dentist profile"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Internal Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Doctor visual / placeholder avatar */}
                  <div className="md:col-span-4 flex flex-col items-center">
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-[#6FA7D8]/20 border-2 border-[#6FA7D8] flex items-center justify-center overflow-hidden shadow-inner">
                      <UserCheck className="w-16 h-16 text-[#6FA7D8]" />
                      <div className="absolute bottom-2 left-2 right-2 bg-[#122342]/85 backdrop-blur-xs text-[#FFFDF7] text-[9px] font-bold uppercase tracking-wider text-center py-1 rounded-md">
                        SECTOR 44 · NOIDA
                      </div>
                    </div>
                  </div>

                  {/* Doctor Verified Info & Placeholder */}
                  <div className="md:col-span-8 space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F4E94A]/60 text-[#122342] text-[10px] font-black tracking-wider uppercase font-general">
                      <span>VERIFIED LOCAL CLINIC</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-[#122342] font-satoshi">
                      Smile Avenue Dental Team
                    </h3>

                    {/* STRICT ACCURACY PLACEHOLDER AS INSTRUCTED */}
                    <div className="p-3.5 rounded-xl bg-[#DCE8B8]/40 border border-[#DCE8B8] text-xs font-semibold text-[#122342]/90 leading-relaxed font-general">
                      <p className="font-bold text-[#122342]">Doctor information coming soon</p>
                      <p className="mt-1 text-[#122342]/75">
                        We believe in 100% verified credentials. Full biography, specializations, and individual clinician profiles will be published upon verified registry update.
                      </p>
                    </div>

                    {/* Clinic Highlights */}
                    <div className="flex flex-wrap gap-3 pt-1 text-xs text-[#122342]/80 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#6FA7D8]" />
                        <span>Open until 10:00 PM</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#6FA7D8]" />
                        <span>Sector 44, Noida</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#122342] font-bold">★ 5.0 Rating</span>
                        <span>(16 Google Reviews)</span>
                      </div>
                    </div>

                    {/* Direct CTAs */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onOpenBooking();
                        }}
                        className="px-5 py-2.5 rounded-full bg-[#F4E94A] text-[#122342] font-black text-xs uppercase tracking-wider shadow-md hover:bg-[#ebd931] hover:scale-105 active:scale-95 transition-all font-general cursor-pointer flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book a Visit</span>
                      </button>

                      <a
                        href={`tel:${CLINIC_INFO.phone}`}
                        className="px-4 py-2.5 rounded-full bg-[#122342] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1c3664] transition-colors font-general flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#F4E94A]" />
                        <span>093685 41439</span>
                      </a>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
