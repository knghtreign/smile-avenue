import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useReducedMotion } from 'motion/react';
import { CLINIC_IMAGES, CLINIC_INFO } from '../data/clinicData';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { TactileStepCard } from './TactileStepCard';
import { MagneticButton } from './MagneticButton';

interface CleaningStep {
  id: string;
  stepNum: string;
  label: string;
  title: string;
  description: string;
  highlight: string;
}

const CLEANING_STEPS: CleaningStep[] = [
  {
    id: 'before',
    stepNum: '01',
    label: 'BEFORE',
    title: 'Gentle Plaque & Staining Assessment',
    description: 'High-definition digital intraoral mirror checkup to evaluate enamel surfaces, gum contours, and focal areas requiring gentle care without discomfort.',
    highlight: 'Zero Pressure · Visual Review',
  },
  {
    id: 'during',
    stepNum: '02',
    label: 'DURING',
    title: 'Ultrasonic Piezoelectric Polish',
    description: 'Harmonic micro-vibrations safely lift plaque deposits and tea/coffee stains, followed by a fine fluoridated polish that leaves teeth naturally glossy and smooth.',
    highlight: 'Enamel Safe · Pain-Free Hygiene',
  },
  {
    id: 'next',
    stepNum: '03',
    label: 'NEXT STEP',
    title: 'Fluoride Shield & Prevention Tips',
    description: 'Protective enamel remineralization and personalized home-care guidance to keep your teeth fresh, bright, and protected for months ahead.',
    highlight: 'Long-Term Enamel Protection',
  },
];

export const ClinicStory: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1); // Default: DURING
  const activeStep = CLEANING_STEPS[activeStepIndex];
  const photoStageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // 3D tilt for cleaning visual stage
  const springConfig = { damping: 25, stiffness: 220, mass: 0.15 };
  const photoRotateX = useSpring(0, springConfig);
  const photoRotateY = useSpring(0, springConfig);

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !photoStageRef.current) return;
    const rect = photoStageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    photoRotateY.set(x * 6);
    photoRotateX.set(-y * 6);
  };

  const handlePhotoMouseLeave = () => {
    photoRotateX.set(0);
    photoRotateY.set(0);
  };

  return (
    <section 
      id="cleaning-experience"
      aria-label="Clinical Dental Cleaning Experience"
      className="w-full bg-[#C9D7A6] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Large Rounded Blue Stage */}
        <div className="w-full bg-[#6EA8DA] rounded-[36px] sm:rounded-[44px] p-6 sm:p-12 lg:p-16 text-white shadow-2xl border border-white/30 relative overflow-hidden">
          
          {/* Background Ambient Accents */}
          <div 
            aria-hidden="true" 
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/15 blur-3xl pointer-events-none" 
          />
          <div 
            aria-hidden="true" 
            className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#E8F75B]/20 blur-3xl pointer-events-none" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* LEFT COLUMN: Editorial Text & Step Progress */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              
              <ScrollReveal yOffset={16} once={false}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-[11px] font-black uppercase tracking-[0.2em] text-white mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#E8F75B]" aria-hidden="true" />
                  <span>A CLOSER CLINICAL LOOK</span>
                </div>
              </ScrollReveal>

              <div className="mb-6">
                <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.0] text-white">
                  <WordReveal 
                    text="See what a" 
                    as="span" 
                    className="mr-2 text-white block" 
                    once={false}
                  />
                  <WordReveal 
                    text="cleaning visit" 
                    as="span" 
                    className="mr-2 text-white block" 
                    once={false}
                  />
                  <AnimatedUnderline styleVariant="brush" color="#E8F75B" delay={0.35}>
                    <span className="text-[#E8F75B]">looks like.</span>
                  </AnimatedUnderline>
                </h2>
              </div>

              <ScrollReveal yOffset={20} delay={0.14} once={false}>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed font-medium mb-8">
                  Preventive ultrasonic scaling in Sector 70, Noida. Gentle on enamel, refreshing, and completed in under <TextHighlight color="#E8F75B" textColor="#111318">40 minutes</TextHighlight>.
                </p>
              </ScrollReveal>

              {/* Horizontal Story Interactive Tabs with 3D Magnetic Tactile Feedback */}
              <div 
                className="bg-black/20 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 mb-6 grid grid-cols-3 gap-1.5"
                role="tablist"
                aria-label="Cleaning step tabs"
              >
                {CLEANING_STEPS.map((step, idx) => {
                  const isSelected = activeStepIndex === idx;
                  return (
                    <button
                      key={step.id}
                      role="tab"
                      id={`cleaning-tab-${step.id}`}
                      aria-selected={isSelected}
                      aria-controls={`cleaning-panel-${step.id}`}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`py-3 px-2 rounded-xl text-center transition-all duration-300 relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#E8F75B] ${
                        isSelected 
                          ? 'bg-[#E8F75B] text-[#111318] shadow-md font-black' 
                          : 'text-white/70 hover:text-white hover:bg-white/10 font-bold'
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-wider opacity-70">
                        STEP {step.stepNum}
                      </div>
                      <div className="text-xs sm:text-sm uppercase tracking-wider font-extrabold truncate">
                        {step.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Progress Line Indicator */}
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-6 p-0.5">
                <motion.div
                  className="h-full bg-[#E8F75B] rounded-full"
                  animate={{ width: `${((activeStepIndex + 1) / CLEANING_STEPS.length) * 100}%` }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
              </div>

              {/* Animated Text Box For Active Step */}
              <ScrollReveal yOffset={16} delay={0.1} once={false}>
                <div 
                  id={`cleaning-panel-${activeStep.id}`}
                  role="tabpanel"
                  aria-labelledby={`cleaning-tab-${activeStep.id}`}
                  className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/25 min-h-[160px] flex flex-col justify-between shadow-lg"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep.id}
                      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-black text-white">
                          {activeStep.title}
                        </h3>
                        <span className="text-xs font-black text-[#111318] bg-[#E8F75B] px-2.5 py-0.5 rounded-full">
                          {activeStep.stepNum} / 03
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium mb-4">
                        {activeStep.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-[#E8F75B] font-bold">
                        <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{activeStep.highlight}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </ScrollReveal>

            </div>

            {/* RIGHT COLUMN: Realistic Close-up Photographic Cleaning Visual with 3D Tilt */}
            <div className="lg:col-span-7">
              <ScrollReveal yOffset={28} delay={0.18} once={false}>
                <motion.div 
                  ref={photoStageRef}
                  onMouseMove={handlePhotoMouseMove}
                  onMouseLeave={handlePhotoMouseLeave}
                  style={{
                    perspective: 1000,
                    rotateX: photoRotateX,
                    rotateY: photoRotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[36px] overflow-hidden shadow-2xl border-4 border-white/80 bg-black/20 group cursor-pointer"
                >
                  
                  {/* Real Photographic Image */}
                  <img
                    src={CLINIC_IMAGES.dentalCleaning}
                    alt="Realistic close-up dental cleaning procedure at A&M Dental Station"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top Floating Badge */}
                  <div 
                    style={{ transform: 'translateZ(25px)' }}
                    className="absolute top-5 left-5 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/30 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-xl"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E8F75B] animate-pulse" aria-hidden="true" />
                    <span>ULTRASONIC ENAMEL CARE</span>
                  </div>

                  {/* Bottom Interactive Draggable / Stepper Pill */}
                  <div 
                    style={{ transform: 'translateZ(25px)' }}
                    className="absolute bottom-5 left-5 right-5 bg-[#111318]/90 backdrop-blur-md text-white p-4 rounded-2xl border border-white/20 flex items-center justify-between gap-4 shadow-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E8F75B] text-[#111318] flex items-center justify-center font-black text-xs">
                        {activeStep.stepNum}
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-wider text-white">
                          {activeStep.label} · VISIT PHASE
                        </div>
                        <div className="text-[11px] text-white/70 font-medium">
                          Select steps on left to inspect each phase
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {CLEANING_STEPS.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveStepIndex(idx)}
                          aria-label={`Jump to phase ${idx + 1}`}
                          className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                            activeStepIndex === idx 
                              ? 'bg-[#E8F75B] scale-125 shadow-[0_0_6px_rgba(232,247,91,0.9)]' 
                              : 'bg-white/40 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                </motion.div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
