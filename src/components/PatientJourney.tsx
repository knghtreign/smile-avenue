import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useReducedMotion } from 'motion/react';
import { JOURNEY_STEPS, CLINIC_INFO } from '../data/clinicData';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';
import { TactileStepCard } from './TactileStepCard';
import { MagneticButton } from './MagneticButton';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

export const PatientJourney: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const photoStageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const activeStep = JOURNEY_STEPS[activeStepIdx];
  const progressPercent = ((activeStepIdx + 1) / JOURNEY_STEPS.length) * 100;

  // 3D Tilt for large photographic stage
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

  const stepFeatures = [
    { icon: Sparkles, text: 'Ultra-gentle sterilization' },
    { icon: ShieldCheck, text: 'Zero hidden treatment costs' },
    { icon: HeartHandshake, text: 'Personalized patient care' },
  ];

  return (
    <section 
      id="about"
      aria-label="Clinical Treatment Process and Expectations"
      className="w-full bg-[#AECBE0] text-[#111318] py-20 sm:py-28 px-6 sm:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Background ambient lighting accents */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-0 w-[450px] h-[450px] bg-white/20 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E8F75B]/25 rounded-full blur-3xl pointer-events-none -ml-24 -mb-24"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Animated Word Reveal, Highlight & Underline */}
        <div className="mb-12 sm:mb-16 max-w-3xl">
          <ScrollReveal yOffset={16} once={false}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/50 border border-white/60 text-[11px] font-black uppercase tracking-[0.2em] text-[#111318] mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E8F75B] animate-pulse" aria-hidden="true" />
              <span>TRANSPARENT CLINICAL CARE</span>
            </div>
          </ScrollReveal>
          
          <div className="mt-1">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#111318]">
              <WordReveal 
                text="What happens when you" 
                as="span"
                className="mr-2"
                once={false}
              />
              <AnimatedUnderline styleVariant="brush" color="#E8F75B" delay={0.35}>
                <span className="text-[#111318]">visit our clinic?</span>
              </AnimatedUnderline>
            </h2>
          </div>

          <ScrollReveal yOffset={18} delay={0.15} once={false}>
            <p className="mt-4 text-base sm:text-lg text-[#111318]/85 font-semibold max-w-2xl leading-relaxed">
              Every appointment is meticulously structured for absolute comfort, clinical precision, and complete clarity. Experience dental care designed around <TextHighlight color="#E8F75B">your peace of mind</TextHighlight>.
            </p>
          </ScrollReveal>
        </div>

        {/* Tactile Step Navigation & Interactive Stage System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Tactile 3D Tilt Step Cards & Detail Panel */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            
            {/* Step-by-Step Navigation with 3D Tilt and Magnetic Pull */}
            <div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5" 
              role="tablist" 
              aria-label="Step-by-step clinical journey stages"
            >
              {JOURNEY_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIdx;
                const isPast = idx < activeStepIdx;

                return (
                  <TactileStepCard
                    key={step.number}
                    id={`journey-tab-${step.number}`}
                    role="tab"
                    isActive={isActive}
                    isPast={isPast}
                    onClick={() => setActiveStepIdx(idx)}
                    number={step.number}
                    title={step.title}
                    ariaLabel={`Step ${step.number}: ${step.title} - ${step.subtitle}`}
                    magneticIntensity={10}
                    tiltIntensity={12}
                    className="h-full flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-xl sm:text-2xl font-black transition-colors ${
                        isActive ? 'text-[#E8F75B]' : isPast ? 'text-[#111318]' : 'text-[#111318]/45'
                      }`}>
                        {step.number}
                      </span>
                      {isActive && (
                        <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#E8F75B] text-[#111318]">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-black tracking-wider uppercase block truncate">
                        {step.title}
                      </span>
                      <span className={`text-[10px] font-bold block truncate mt-0.5 ${
                        isActive ? 'text-white/75' : 'text-[#111318]/60'
                      }`}>
                        {step.subtitle}
                      </span>
                    </div>
                  </TactileStepCard>
                );
              })}
            </div>

            {/* Dynamic Active Step Content Card */}
            <ScrollReveal yOffset={20} delay={0.1} once={false}>
              <div 
                id={`journey-panel-${activeStep.number}`}
                role="tabpanel"
                aria-labelledby={`journey-tab-${activeStep.number}`}
                className="bg-white/95 backdrop-blur-xl rounded-[32px] p-7 sm:p-9 border border-white shadow-[0_20px_45px_rgba(17,19,24,0.08)] relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black px-3.5 py-1.5 bg-[#E8F75B] text-[#111318] rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111318]" aria-hidden="true" />
                      STAGE {activeStep.number} OF 04
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-[#111318]/70 uppercase tracking-wide">
                      {activeStep.subtitle}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-[#111318]/50 uppercase tracking-widest hidden sm:inline">
                    CLINICAL PROTOCOL
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.number}
                    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-black text-[#111318] mb-3 tracking-tight">
                      {activeStep.title}
                    </h3>
                    <p className="text-base sm:text-lg text-[#111318]/85 font-semibold leading-relaxed">
                      {activeStep.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Micro-Features Guarantee Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-6 pt-5 border-t border-black/10">
                  {stepFeatures.map((feat, fIdx) => {
                    const Icon = feat.icon;
                    return (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-bold text-[#111318]/80">
                        <Icon className="w-3.5 h-3.5 text-[#111318] shrink-0" aria-hidden="true" />
                        <span className="truncate">{feat.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Dynamic Progress Line with Traveling Indicator */}
                <div className="relative mt-7 pt-2" aria-hidden="true">
                  <div className="w-full bg-black/10 h-2.5 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      className="h-full bg-[#111318] rounded-full"
                      initial={false}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  {/* Traveling Pulsing Dot Indicator */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#E8F75B] border-2 border-[#111318] shadow-md z-10 pointer-events-none"
                    style={{ left: `calc(${progressPercent}% - 8px)` }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>

                {/* Bottom Navigation Toolbar with Magnetic Buttons */}
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-black/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#111318]" aria-hidden="true" />
                    <span className="text-xs font-bold text-[#111318]/70 uppercase tracking-wider">
                      Verified Process · {CLINIC_INFO.name}
                    </span>
                  </div>

                  <MagneticButton
                    onClick={() => setActiveStepIdx((activeStepIdx + 1) % JOURNEY_STEPS.length)}
                    id="journey-advance-step-btn"
                    role="button"
                    ariaLabel={activeStepIdx === 3 ? 'Restart clinical journey from step 1' : `Advance to step ${activeStepIdx + 2}`}
                    maxDistance={4}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-[#111318] text-[#E8F75B] py-2.5 px-4 rounded-full hover:bg-black shadow transition-all"
                  >
                    <span>{activeStepIdx === 3 ? 'RESTART TOUR' : 'NEXT STEP'}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </MagneticButton>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Tactile 3D Photographic Stage with Crossfade & Ambient Badges */}
          <div className="lg:col-span-6">
            <ScrollReveal yOffset={30} delay={0.15} once={false}>
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
                className="relative aspect-[4/3] rounded-[38px] overflow-hidden shadow-[0_25px_60px_rgba(17,19,24,0.22)] border-4 border-white/80 bg-white/40 group cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep.image}
                    src={activeStep.image}
                    alt={`Step ${activeStep.number} - ${activeStep.title} at ${CLINIC_INFO.name}`}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </AnimatePresence>

                {/* Gradient vignette for text contrast */}
                <div 
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" 
                />
                
                {/* Floating Top-Right Step Badge with 3D Depth */}
                <div 
                  style={{ transform: 'translateZ(30px)' }}
                  className="absolute top-6 right-6 bg-[#111318]/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider border border-white/15 shadow-xl flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E8F75B] animate-ping" aria-hidden="true" />
                  <span>STEP {activeStep.number} IN ACTION</span>
                </div>

                {/* Floating Bottom-Left Clinic Location Badge */}
                <div 
                  style={{ transform: 'translateZ(25px)' }}
                  className="absolute bottom-6 left-6 right-6 flex items-center justify-between bg-[#111318]/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl text-xs font-black tracking-wider uppercase border border-white/15 shadow-2xl"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E8F75B] shadow-[0_0_8px_rgba(232,247,91,1)]" aria-hidden="true" />
                    <span>{CLINIC_INFO.name} · NOIDA SEC 49</span>
                  </div>
                  <span className="text-[#E8F75B] text-[11px] font-extrabold hidden sm:inline">
                    {CLINIC_INFO.rating} ★★★★★ ({CLINIC_INFO.reviewsCount} REVIEWS)
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
