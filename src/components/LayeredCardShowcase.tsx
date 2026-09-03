import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline } from './TextHighlight';
import { Sparkles, ArrowRight, RotateCw, Star, Clock, MapPin, ShieldCheck, Phone } from 'lucide-react';

interface ShowcaseCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  accentBg: string;
  accentText: string;
  statValue?: string;
  statLabel?: string;
}

const CARDS: ShowcaseCard[] = [
  {
    id: 'rating',
    badge: 'COMMUNITY TRUST',
    title: '5.0 ★ Google Rating',
    subtitle: '16 Verified Patient Reviews',
    description: 'Every review reflects genuine patient satisfaction in Sector 44, Noida. We maintain a unblemished 5-star record through painless dentistry, transparent fee structures, and personalized care.',
    icon: Star,
    accentBg: '#F4E94A',
    accentText: '#122342',
    statValue: '5.0 ★',
    statLabel: '100% Verified',
  },
  {
    id: 'hours',
    badge: 'ACCESSIBLE CARE',
    title: 'Open Until 10:00 PM',
    subtitle: 'Daily Evening Appointments',
    description: 'Designed around working professionals and busy families. Never take time off work or rush through traffic for dental checkups, emergencies, or orthodontic adjustments.',
    icon: Clock,
    accentBg: '#6FA7D8',
    accentText: '#FFFDF7',
    statValue: '10 PM',
    statLabel: 'Night Hours',
  },
  {
    id: 'location',
    badge: 'STRATEGIC ADDRESS',
    title: 'Sector 44, Noida',
    subtitle: 'Village Chhalera & Sadarpur, Block D',
    description: 'Centrally situated in Sector 44 with effortless road connectivity and ample parking. Peaceful clinical environment away from crowded commercial avenues.',
    icon: MapPin,
    accentBg: '#DCE8B8',
    accentText: '#122342',
    statValue: '201303',
    statLabel: 'Noida PIN',
  },
  {
    id: 'hygiene',
    badge: 'CLINICAL INTEGRITY',
    title: 'Autoclaved Sterility',
    subtitle: 'Hospital-Grade Infection Control',
    description: 'Every instrument undergoes multi-barrier autoclaving and pouch sealing. Our operatory is disinfected between every single patient appointment without compromise.',
    icon: ShieldCheck,
    accentBg: '#49B9B1',
    accentText: '#FFFDF7',
    statValue: '100%',
    statLabel: 'Autoclaved',
  },
  {
    id: 'emergency',
    badge: 'RAPID RESPONSE',
    title: 'Direct Dental Line',
    subtitle: '093685 41439 Quick Connect',
    description: 'Toothache or fractured tooth? Speak directly to our front desk. Fast scheduling for same-day emergency triage and pain relief.',
    icon: Phone,
    accentBg: '#F4E94A',
    accentText: '#122342',
    statValue: 'Direct',
    statLabel: 'Call Line',
  },
];

interface LayeredCardShowcaseProps {
  onOpenBooking: () => void;
}

export const LayeredCardShowcase: React.FC<LayeredCardShowcaseProps> = ({ onOpenBooking }) => {
  const [cards, setCards] = useState(CARDS);

  const handleCycleCard = () => {
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <section 
      id="showcase-stack"
      aria-label="Smile Avenue Dental Clinic Highlights Stack"
      className="w-full py-20 sm:py-28 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <ScrollReveal yOffset={16} once={false}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#122342]/10 text-[11px] font-black uppercase tracking-[0.2em] text-[#122342] mb-3 font-general shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#6FA7D8]" aria-hidden="true" />
                <span>PHYSICAL LAYERED SHOWCASE</span>
              </div>
            </ScrollReveal>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#122342] font-satoshi">
              <WordReveal 
                text="Crafted Standards for" 
                as="span" 
                className="mr-2.5"
                once={false}
              />
              <AnimatedUnderline styleVariant="brush" color="#F4E94A" delay={0.25}>
                <span className="text-[#122342]">Every Patient.</span>
              </AnimatedUnderline>
            </h2>
          </div>

          <ScrollReveal yOffset={20} delay={0.15} once={false}>
            <p className="text-sm sm:text-base font-semibold text-[#122342]/80 max-w-md font-general">
              Click or drag cards to cycle through the physical deck. Learn why patients across Noida trust Smile Avenue Dental Clinic.
            </p>
          </ScrollReveal>
        </div>

        {/* Stack Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: The Physical Interactive Card Stack */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[460px] sm:min-h-[500px]">
            
            <div className="relative w-full max-w-md h-[400px] flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {cards.map((card, index) => {
                  // Only render the top 3 cards for clean physical stacking
                  if (index > 3) return null;

                  const isFront = index === 0;
                  const rotation = index === 0 ? 0 : index === 1 ? 3 : index === 2 ? -3 : 5;
                  const offsetY = index * 14;
                  const scale = 1 - index * 0.05;
                  const zIndex = 30 - index * 5;

                  const IconComponent = card.icon;

                  return (
                    <motion.div
                      key={card.id}
                      layout
                      initial={{ scale: 0.9, opacity: 0, y: 30 }}
                      animate={{
                        scale,
                        y: offsetY,
                        rotate: rotation,
                        opacity: 1 - index * 0.15,
                        zIndex,
                      }}
                      exit={{
                        x: 350,
                        rotate: 20,
                        opacity: 0,
                        transition: { duration: 0.45, ease: 'easeIn' },
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 24,
                      }}
                      drag={isFront ? 'x' : false}
                      dragConstraints={{ left: -50, right: 50 }}
                      onDragEnd={(_, info) => {
                        if (Math.abs(info.offset.x) > 60) {
                          handleCycleCard();
                        }
                      }}
                      onClick={isFront ? handleCycleCard : undefined}
                      className={`absolute inset-0 rounded-[32px] sm:rounded-[36px] bg-[#FFFDF7] p-7 sm:p-9 shadow-[0_20px_50px_rgba(18,35,66,0.14)] border-2 border-white flex flex-col justify-between select-none ${
                        isFront ? 'cursor-grab active:cursor-grabbing hover:shadow-[0_25px_60px_rgba(18,35,66,0.2)]' : 'pointer-events-none'
                      }`}
                    >
                      {/* Top Bar inside Card */}
                      <div className="flex items-center justify-between">
                        <div 
                          className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest font-general flex items-center gap-1.5"
                          style={{ backgroundColor: card.accentBg, color: card.accentText }}
                        >
                          <IconComponent className="w-3 h-3" />
                          <span>{card.badge}</span>
                        </div>

                        {card.statValue && (
                          <div className="text-right">
                            <span className="font-black text-lg text-[#122342] font-satoshi block leading-none">
                              {card.statValue}
                            </span>
                            <span className="text-[9px] font-bold text-[#122342]/60 uppercase tracking-wider font-general">
                              {card.statLabel}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Main Card Content */}
                      <div className="space-y-2.5 my-auto">
                        <h3 className="text-2xl sm:text-3xl font-black text-[#122342] font-satoshi tracking-tight leading-snug">
                          {card.title}
                        </h3>
                        <div className="text-xs font-bold text-[#6FA7D8] uppercase tracking-wider font-general">
                          {card.subtitle}
                        </div>
                        <p className="text-xs sm:text-sm text-[#122342]/80 font-medium leading-relaxed font-general line-clamp-3">
                          {card.description}
                        </p>
                      </div>

                      {/* Card Bottom: Interaction Cue */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#122342]/10 text-xs font-black uppercase tracking-wider text-[#122342]/70 font-general">
                        <span className="flex items-center gap-1.5">
                          <RotateCw className="w-3.5 h-3.5 text-[#6FA7D8]" />
                          <span>Tap card to cycle ({index + 1}/5)</span>
                        </span>
                        <span className="text-[#6FA7D8]">Next →</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Deck Controls */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleCycleCard}
                className="px-5 py-2.5 rounded-full bg-[#FFFDF7] text-[#122342] font-black text-xs uppercase tracking-wider shadow-sm border border-[#122342]/10 hover:bg-[#F4E94A] transition-all font-general cursor-pointer flex items-center gap-2"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Next Card in Stack</span>
              </button>
            </div>
          </div>

          {/* RIGHT: High-Impact Editorial Description & Verification */}
          <div className="lg:col-span-5 bg-[#6FA7D8] rounded-[36px] p-7 sm:p-10 text-white shadow-xl space-y-5 border-2 border-white/80">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest font-general">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F4E94A]" />
              <span>SMILE AVENUE PILLARS</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black font-satoshi tracking-tight leading-tight">
              A clinic founded on patient peace of mind.
            </h3>

            <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed font-general">
              Every decision at Smile Avenue Dental Clinic — from our late-evening appointments to our single-chair quiet consultation philosophy — is built to ensure you never fear visiting the dentist again.
            </p>

            <div className="pt-2 space-y-3">
              <div className="p-3.5 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-[#F4E94A] font-general">
                    VERIFIED GOOGLE RATING
                  </div>
                  <div className="text-xl font-black font-satoshi">5.0 ★ · 16 Reviews</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#F4E94A] text-[#122342] flex items-center justify-center font-black">
                  ★
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-[#F4E94A] font-general">
                    EVENING OPERATING HOURS
                  </div>
                  <div className="text-xl font-black font-satoshi">Open Until 10:00 PM</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white text-[#122342] flex items-center justify-center font-black">
                  <Clock className="w-4 h-4 text-[#6FA7D8]" />
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-3">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 rounded-full bg-[#F4E94A] text-[#122342] font-black text-xs uppercase tracking-wider shadow-md hover:bg-[#ebd931] transition-all font-general cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
