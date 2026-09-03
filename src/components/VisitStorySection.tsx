import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';
import { ScrollReveal } from './ScrollReveal';
import { Sparkles, ArrowRight, ShieldCheck, MapPin, Eye, Stethoscope, HeartHandshake } from 'lucide-react';

interface Stage {
  id: string;
  stepNumber: string;
  title: string;
  shortLabel: string;
  visualConcept: string;
  subtitle: string;
  description: string;
  color: string;
}

const STAGES: Stage[] = [
  {
    id: 'arrive',
    stepNumber: '01',
    title: 'ARRIVE',
    shortLabel: 'Ground Floor Arrival',
    visualConcept: 'Sanitized Reception & Calm Welcome Lounge',
    subtitle: 'Sector 44, Noida Sanctuary',
    description: 'Step directly into our quiet ground-level lounge. No sterile hospital odors, no crowded waiting queues.',
    color: '#6FA7D8',
  },
  {
    id: 'meet',
    stepNumber: '02',
    title: 'MEET',
    shortLabel: 'Direct Doctor Consultation',
    visualConcept: 'Open Dialogue & Listening Session',
    subtitle: 'Unrushed Conversation',
    description: 'Sit with our clinical team in a comfortable consultation room. We listen to your history and expectations first.',
    color: '#F4E94A',
  },
  {
    id: 'understand',
    stepNumber: '03',
    title: 'UNDERSTAND',
    shortLabel: 'Visual Diagnostics & Clarity',
    visualConcept: 'High-Res Digital Imaging & Step-by-Step Plan',
    subtitle: 'Full Transparency',
    description: 'Inspect your intraoral scans on a high-definition monitor. Every procedure and transparent cost is explained before beginning.',
    color: '#49B9B1',
  },
  {
    id: 'treat',
    stepNumber: '04',
    title: 'TREAT',
    shortLabel: 'Gentle Clinical Care',
    visualConcept: 'Ergonomic Operatory & Pain-Free Protocol',
    subtitle: 'Relaxed Precision',
    description: 'Receive careful, gentle dental therapy using autoclaved micro-instruments, gentle anesthesia, and soothing guidance.',
    color: '#122342',
  },
];

interface VisitStorySectionProps {
  onOpenBooking: () => void;
}

export const VisitStorySection: React.FC<VisitStorySectionProps> = ({ onOpenBooking }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = STAGES[activeStageIndex];

  return (
    <section 
      id="visit-story"
      aria-label="What Happens When You Visit Smile Avenue Dental Clinic"
      className="w-full py-20 sm:py-28 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Background container: large rounded pale canvas */}
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <ScrollReveal yOffset={16} once={false}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#122342]/10 text-[11px] font-black uppercase tracking-[0.2em] text-[#122342] mb-3 font-general shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#6FA7D8]" aria-hidden="true" />
                <span>STEP-BY-STEP CLINICAL JOURNEY</span>
              </div>
            </ScrollReveal>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#122342] font-satoshi">
              <WordReveal 
                text="What Happens When" 
                as="span" 
                className="mr-2.5"
                once={false}
              />
              <AnimatedUnderline styleVariant="brush" color="#F4E94A" delay={0.25}>
                <span className="text-[#122342]">You Visit?</span>
              </AnimatedUnderline>
            </h2>
          </div>

          <ScrollReveal yOffset={20} delay={0.15} once={false}>
            <p className="text-sm sm:text-base font-semibold text-[#122342]/80 max-w-md font-general">
              Four deliberate stages designed to remove uncertainty, ensure clinical comfort, and give you total control over <TextHighlight color="#F4E94A" textColor="#122342">your treatment</TextHighlight>.
            </p>
          </ScrollReveal>
        </div>

        {/* Large Rounded Blue & Cream Interactive Story Stage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[36px] sm:rounded-[48px] bg-[#6FA7D8] p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_rgba(18,35,66,0.15)] border-2 border-white/80 relative overflow-hidden"
        >
          {/* Subtle architectural grid lines */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-15">
            <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
              <line x1="100" y1="0" x2="100" y2="600" stroke="white" strokeWidth="1" strokeDasharray="6 6" />
              <line x1="400" y1="0" x2="400" y2="600" stroke="white" strokeWidth="1" strokeDasharray="6 6" />
              <line x1="700" y1="0" x2="700" y2="600" stroke="white" strokeWidth="1" strokeDasharray="6 6" />
              <line x1="0" y1="300" x2="800" y2="300" stroke="white" strokeWidth="1" strokeDasharray="6 6" />
            </svg>
          </div>

          {/* Top Stage Navigation Pathway */}
          <div className="relative z-10 mb-8 sm:mb-12">
            
            {/* Connecting connecting path SVG */}
            <div className="hidden sm:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[3px] bg-white/25 z-0">
              <motion.div 
                className="h-full bg-[#F4E94A]"
                initial={{ width: '0%' }}
                animate={{ width: `${(activeStageIndex / (STAGES.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>

            {/* 4 Stage Trigger Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10">
              {STAGES.map((stg, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <motion.button
                    key={stg.id}
                    onClick={() => setActiveStageIndex(idx)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 text-left transition-all duration-300 border-2 cursor-pointer relative overflow-hidden ${
                      isActive 
                        ? 'bg-[#FFFDF7] text-[#122342] border-[#F4E94A] shadow-lg -translate-y-1' 
                        : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
                    }`}
                  >
                    {/* Travelling active marker dot */}
                    {isActive && (
                      <motion.div 
                        layoutId="active-stage-indicator"
                        className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#F4E94A]"
                      />
                    )}

                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-widest font-general ${
                        isActive ? 'text-[#6FA7D8]' : 'text-white/70'
                      }`}>
                        STAGE {stg.stepNumber}
                      </span>
                    </div>

                    <div className="text-base sm:text-lg font-black font-satoshi tracking-tight">
                      {stg.title}
                    </div>

                    <div className={`text-[11px] font-semibold truncate mt-0.5 ${
                      isActive ? 'text-[#122342]/70' : 'text-white/75'
                    }`}>
                      {stg.shortLabel}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Visual Composition (Cream & Blue Architectural Scene) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFDF7] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 border-2 border-white/90 shadow-xl">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6FA7D8]/15 text-[#122342] text-[10px] font-black uppercase tracking-widest font-general">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6FA7D8]" />
                <span>STAGE {activeStage.stepNumber} — {activeStage.title}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-[#122342] font-satoshi tracking-tight">
                {activeStage.subtitle}
              </h3>

              <p className="text-sm sm:text-base text-[#122342]/85 font-medium leading-relaxed font-general">
                {activeStage.description}
              </p>

              {/* Stage Specific Highlights */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-[#122342]/90">
                <span className="px-3 py-1.5 rounded-xl bg-[#DCE8B8]/50 border border-[#DCE8B8] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#122342]" />
                  <span>Verified 5.0 Care</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#6FA7D8]/15 border border-[#6FA7D8]/30 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#6FA7D8]" />
                  <span>Sector 44, Noida</span>
                </span>
              </div>

              {/* Progress and Actions */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-full bg-[#F4E94A] text-[#122342] font-black text-xs uppercase tracking-wider shadow-md hover:bg-[#ebd931] hover:scale-105 active:scale-95 transition-all font-general cursor-pointer flex items-center gap-2"
                >
                  <span>Book a Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {activeStageIndex < STAGES.length - 1 ? (
                  <button
                    onClick={() => setActiveStageIndex(prev => prev + 1)}
                    className="text-xs font-black uppercase tracking-wider text-[#122342]/70 hover:text-[#122342] transition-colors flex items-center gap-1 py-2 font-general cursor-pointer"
                  >
                    <span>Next: Stage 0{activeStageIndex + 2}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <a
                    href="tel:09368541439"
                    className="text-xs font-black uppercase tracking-wider text-[#6FA7D8] hover:text-[#122342] transition-colors py-2 font-general"
                  >
                    Direct: 093685 41439
                  </a>
                )}
              </div>
            </div>

            {/* Right Architectural Geometric Illustration */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl bg-[#6FA7D8]/15 p-6 flex items-center justify-center border border-[#6FA7D8]/20 overflow-hidden">
              
              {/* Dynamic Editorial Visual Representation */}
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* SVG Clinic Scene Illustration */}
                <svg 
                  className="w-full h-full max-w-[380px] drop-shadow-md" 
                  viewBox="0 0 400 300" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background architectural block */}
                  <rect x="40" y="50" width="320" height="200" rx="24" fill="#FFFDF7" stroke="#6FA7D8" strokeWidth="2" />
                  
                  {/* Window / Horizon in blue */}
                  <rect x="60" y="70" width="280" height="50" rx="14" fill="#6FA7D8" opacity="0.25" />
                  <line x1="60" y1="95" x2="340" y2="95" stroke="#6FA7D8" strokeWidth="1.5" strokeDasharray="4 4" />

                  {activeStageIndex === 0 && (
                    /* Stage 1: Arrive - Reception & Lounge elements */
                    <g>
                      {/* Reception desk */}
                      <rect x="120" y="150" width="160" height="65" rx="12" fill="#6FA7D8" />
                      <rect x="140" y="130" width="120" height="25" rx="8" fill="#F4E94A" />
                      {/* Friendly clinic indicator */}
                      <circle cx="200" cy="110" r="16" fill="#122342" />
                      <path d="M194 110 L198 114 L207 105" stroke="#F4E94A" strokeWidth="2.5" strokeLinecap="round" />
                      <text x="200" y="190" textAnchor="middle" fill="#FFFDF7" fontSize="12" fontWeight="900" fontFamily="sans-serif">WELCOME DESK</text>
                    </g>
                  )}

                  {activeStageIndex === 1 && (
                    /* Stage 2: Meet - Two seated conversation seats */
                    <g>
                      <circle cx="140" cy="140" r="22" fill="#6FA7D8" />
                      <circle cx="260" cy="140" r="22" fill="#49B9B1" />
                      {/* Dialogue connector */}
                      <path d="M165 140 C190 120, 210 120, 235 140" stroke="#F4E94A" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 4" />
                      <rect x="160" y="175" width="80" height="40" rx="10" fill="#122342" />
                      <text x="200" y="200" textAnchor="middle" fill="#FFFDF7" fontSize="11" fontWeight="800" fontFamily="sans-serif">OPEN DIALOGUE</text>
                    </g>
                  )}

                  {activeStageIndex === 2 && (
                    /* Stage 3: Understand - Digital RVG screen and diagnostic clarity */
                    <g>
                      <rect x="110" y="90" width="180" height="110" rx="14" fill="#122342" />
                      <rect x="125" y="105" width="150" height="80" rx="8" fill="#6FA7D8" opacity="0.3" />
                      {/* Tooth silhouette inside screen */}
                      <path d="M185 125 C185 115, 215 115, 215 125 C215 140, 225 155, 210 170 C205 160, 195 160, 190 170 C175 155, 185 140, 185 125 Z" fill="#FFFDF7" />
                      <circle cx="200" cy="142" r="8" fill="#F4E94A" opacity="0.8" />
                      <text x="200" y="228" textAnchor="middle" fill="#122342" fontSize="11" fontWeight="800" fontFamily="sans-serif">HD INTRAORAL SCAN</text>
                    </g>
                  )}

                  {activeStageIndex === 3 && (
                    /* Stage 4: Treat - Precision ergonomic clinic suite */
                    <g>
                      {/* Treatment chair geometric form */}
                      <path d="M110 185 L180 160 L240 160 L290 195 L270 210 L180 190 Z" fill="#6FA7D8" />
                      {/* Overhead clinical light */}
                      <rect x="190" y="70" width="20" height="40" rx="6" fill="#122342" />
                      <polygon points="170,110 230,110 250,150 150,150" fill="#F4E94A" opacity="0.35" />
                      <circle cx="200" cy="110" r="10" fill="#F4E94A" />
                      <text x="200" y="240" textAnchor="middle" fill="#122342" fontSize="11" fontWeight="800" fontFamily="sans-serif">STERILE CARE SUITE</text>
                    </g>
                  )}
                </svg>

                {/* Floating pill badge */}
                <div className="absolute bottom-4 right-4 bg-[#122342] text-[#FFFDF7] px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider font-general shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F4E94A]" />
                  <span>{activeStage.visualConcept}</span>
                </div>
              </motion.div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
