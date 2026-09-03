import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useReducedMotion } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';
import { TactileStepCard } from './TactileStepCard';
import { MagneticButton } from './MagneticButton';
import { 
  Sparkles, 
  Scan, 
  ShieldCheck, 
  Smile, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Activity,
  Sliders
} from 'lucide-react';

interface SmileTransformationProps {
  onOpenBooking: () => void;
}

interface TransformStage {
  id: string;
  stepNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  metrics: { label: string; value: string };
  image: string;
  accent: string;
}

export const SmileTransformation: React.FC<SmileTransformationProps> = ({ onOpenBooking }) => {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isComparing, setIsComparing] = useState<boolean>(true);
  const shouldReduceMotion = useReducedMotion();
  const comparisonRef = useRef<HTMLDivElement>(null);

  // 3D Tilt for the visual comparison stage
  const springConfig = { damping: 24, stiffness: 240, mass: 0.12 };
  const stageRotateX = useSpring(0, springConfig);
  const stageRotateY = useSpring(0, springConfig);

  const stages: TransformStage[] = [
    {
      id: 'scan',
      stepNumber: '01',
      badge: 'DIGITAL MAPPING',
      title: 'Precision 3D Scan & Smile Diagnostics',
      subtitle: 'Zero radiation, sub-millimeter precision mapping',
      description: 'We capture an instant, high-definition digital blueprint of your dental structure. No uncomfortable messy putty impressions — just effortless digital scanning that identifies alignment, enamel health, and bite balance within minutes.',
      details: [
        'Instant 3D intraoral digital color capture',
        'Sub-millimeter margin analysis',
        'Comprehensive cavity and gum depth check',
      ],
      metrics: { label: 'Scan Time', value: '< 3 Mins' },
      image: '/src/assets/images/clinic_detail_1788182853665.jpg',
      accent: '#E8F75B',
    },
    {
      id: 'design',
      stepNumber: '02',
      badge: 'AESTHETIC HARMONY',
      title: 'Biomimetic Symmetry & Custom Shade Matching',
      subtitle: 'Custom color grading crafted for natural facial balance',
      description: 'Every tooth is naturally unique. We calibrate translucency, micro-texture, and tooth contours to perfectly match your natural complexion and lip dynamics so your smile looks stunning, authentic, and naturally radiant.',
      details: [
        'VITA 3D Master Shade Matching',
        'Facial aesthetic proportion analysis',
        'Preview your finished smile before treatment begins',
      ],
      metrics: { label: 'Shade Match', value: '100% Custom' },
      image: '/src/assets/images/clinic_treatment_1788182837907.jpg',
      accent: '#BCE4BF',
    },
    {
      id: 'care',
      stepNumber: '03',
      badge: 'PAIN-FREE PROTOCOL',
      title: 'Gentle Micro-Restoration & Chairside Comfort',
      subtitle: 'Minimally invasive techniques preserving natural tooth tissue',
      description: 'Dr. Munish Sharma and our experienced team utilize gentle, ultra-quiet instrumentation and targeted numbing protocols. We focus on conservative, tooth-preserving dentistry that resolves discomfort quickly with zero anxiety.',
      details: [
        'Multi-stage topical comfort application',
        'High-magnification surgical loupes precision',
        'Warm, calming ambient clinic environment',
      ],
      metrics: { label: 'Patient Comfort', value: '99.8%' },
      image: '/src/assets/images/dental_cleaning_visit_1788185633482.jpg',
      accent: '#AECBE0',
    },
    {
      id: 'radiance',
      stepNumber: '04',
      badge: 'LONG-TERM RADIANCE',
      title: 'Enamel Shielding & Final Brilliant Reveal',
      subtitle: 'High-gloss diamond polish with protective fluoride seal',
      description: 'Your transformation concludes with an ultra-fine smoothing and biocompatible mineral seal that protects enamel against stains and sensitivity, leaving you with a confident, brilliant smile you are proud to share with the world.',
      details: [
        'Diamond-grit non-abrasive micro-polish',
        'Fluoride mineral protective coating',
        'Personalized long-term home maintenance kit',
      ],
      metrics: { label: 'Satisfaction', value: '5.0 / 5.0' },
      image: '/src/assets/images/final_smile_1788182817999.jpg',
      accent: '#E8F75B',
    },
  ];

  const currentStage = stages[activeStageIdx];

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !comparisonRef.current) return;
    const rect = comparisonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    stageRotateY.set(x * 7);
    stageRotateX.set(-y * 7);
  };

  const handleStageMouseLeave = () => {
    stageRotateX.set(0);
    stageRotateY.set(0);
  };

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!comparisonRef.current) return;
    const rect = comparisonRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (offset / rect.width) * 100));
    setSliderPos(percentage);
  };

  return (
    <section 
      id="transform"
      aria-label="How We Transform Your Smile and Clinical Workflow"
      className="w-full bg-[#111318] text-white py-24 sm:py-32 px-6 sm:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Background ambient lighting effects */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#E8F75B]/10 rounded-full blur-[140px] pointer-events-none -ml-40"
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#BCE4BF]/10 rounded-full blur-[140px] pointer-events-none -mr-40"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Animated Words & Underlines */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-18">
          <div className="max-w-3xl">
            <ScrollReveal yOffset={16} once={false}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-black uppercase tracking-[0.2em] text-[#E8F75B] mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#E8F75B]" aria-hidden="true" />
                <span>CLINICAL EXCELLENCE IN ACTION</span>
              </div>
            </ScrollReveal>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
              <WordReveal 
                text="How We Transform" 
                as="span" 
                className="mr-2.5 text-white" 
                once={false}
              />
              <AnimatedUnderline styleVariant="brush" color="#E8F75B" delay={0.35}>
                <span className="text-[#E8F75B]">Your Smile</span>
              </AnimatedUnderline>
            </h2>

            <ScrollReveal yOffset={20} delay={0.15} once={false}>
              <p className="mt-4 text-base sm:text-lg text-white/80 font-medium max-w-2xl leading-relaxed">
                Experience a state-of-the-art restorative approach. From advanced digital scanning to hand-finished aesthetics, see how <TextHighlight color="#E8F75B" textColor="#111318">Dr. Munish Sharma</TextHighlight> delivers natural radiance.
              </p>
            </ScrollReveal>
          </div>

          {/* Metric Highlight Badge */}
          <ScrollReveal yOffset={20} delay={0.25} once={false} className="shrink-0">
            <div className="bg-white/5 border border-white/15 rounded-3xl p-5 flex items-center gap-4 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F75B] text-[#111318] flex items-center justify-center font-black">
                <Activity className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-white/60 block">
                  SATISFACTION RATING
                </span>
                <span className="text-xl sm:text-2xl font-black text-white">
                  {CLINIC_INFO.rating} / 5.0 · <span className="text-[#E8F75B]">100% Verified</span>
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 4-Step Tactile Navigation Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10" 
          role="tablist" 
          aria-label="Transformation methodology steps"
        >
          {stages.map((stage, idx) => {
            const isActive = idx === activeStageIdx;
            const isPast = idx < activeStageIdx;

            return (
              <TactileStepCard
                key={stage.id}
                id={`transform-tab-${stage.id}`}
                role="tab"
                isActive={isActive}
                isPast={isPast}
                onClick={() => setActiveStageIdx(idx)}
                ariaLabel={`Transformation Step ${stage.stepNumber}: ${stage.title}`}
                magneticIntensity={12}
                tiltIntensity={15}
                className="h-full flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-2xl font-black transition-colors ${
                    isActive ? 'text-[#E8F75B]' : isPast ? 'text-white' : 'text-white/40'
                  }`}>
                    {stage.stepNumber}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-[#E8F75B] text-[#111318]' : 'bg-white/10 text-white/70'
                  }`}>
                    {stage.badge}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm sm:text-base font-black tracking-tight uppercase line-clamp-1 mb-1">
                    {stage.title}
                  </h4>
                  <p className={`text-xs font-semibold line-clamp-2 ${
                    isActive ? 'text-white/85' : 'text-white/60'
                  }`}>
                    {stage.subtitle}
                  </p>
                </div>
              </TactileStepCard>
            );
          })}
        </div>

        {/* Dynamic Interactive Stage & Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Interactive 3D Comparison & Visual Stage */}
          <div className="lg:col-span-7">
            <ScrollReveal yOffset={24} delay={0.1} once={false}>
              <motion.div
                ref={comparisonRef}
                onMouseMove={handleStageMouseMove}
                onMouseLeave={handleStageMouseLeave}
                style={{
                  perspective: 1000,
                  rotateX: stageRotateX,
                  rotateY: stageRotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative aspect-[16/10] sm:aspect-[16/10] rounded-[36px] overflow-hidden border-2 border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.6)] bg-black/40 group select-none"
              >
                {/* Visual Stage Image with AnimatePresence */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentStage.image}
                    src={currentStage.image}
                    alt={currentStage.title}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Ambient dynamic lighting vignette */}
                <div 
                  aria-hidden="true" 
                  className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-black/30 pointer-events-none" 
                />

                {/* Floating 3D Badge (Top Left) */}
                <div 
                  style={{ transform: 'translateZ(30px)' }}
                  className="absolute top-6 left-6 bg-[#111318]/90 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-2xl"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E8F75B] animate-pulse" aria-hidden="true" />
                  <span>PHASE {currentStage.stepNumber} · {currentStage.badge}</span>
                </div>

                {/* Floating Metric Pill (Top Right) */}
                <div 
                  style={{ transform: 'translateZ(30px)' }}
                  className="absolute top-6 right-6 bg-[#E8F75B] text-[#111318] px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider shadow-2xl flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{currentStage.metrics.label}: {currentStage.metrics.value}</span>
                </div>

                {/* Bottom Stage Details Banner */}
                <div 
                  style={{ transform: 'translateZ(25px)' }}
                  className="absolute bottom-6 left-6 right-6 bg-[#111318]/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex items-center justify-between shadow-2xl"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#E8F75B] block">
                      CLINIC PROTOCOL
                    </span>
                    <h5 className="text-sm sm:text-base font-black text-white truncate">
                      {currentStage.title}
                    </h5>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-white/70 hidden sm:inline">
                      Sector 49, Noida
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#E8F75B]" aria-hidden="true" />
                  </div>
                </div>

              </motion.div>
            </ScrollReveal>
          </div>

          {/* Right Column: Stage Description, Guarantees & Call-to-Action */}
          <div className="lg:col-span-5">
            <ScrollReveal yOffset={28} delay={0.2} once={false}>
              <div 
                id={`transform-panel-${currentStage.id}`}
                role="tabpanel"
                aria-labelledby={`transform-tab-${currentStage.id}`}
                className="bg-white/5 border border-white/15 rounded-[32px] p-7 sm:p-9 backdrop-blur-xl shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-black px-3 py-1 bg-[#E8F75B] text-[#111318] rounded-full uppercase tracking-wider">
                    STEP {currentStage.stepNumber} OF 04
                  </span>
                  <span className="text-xs font-extrabold text-white/60 uppercase tracking-widest">
                    {currentStage.badge}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStage.id}
                    initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
                      {currentStage.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed mb-6">
                      {currentStage.description}
                    </p>

                    {/* Stage Feature Bullets */}
                    <div className="space-y-3 mb-8">
                      {currentStage.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#E8F75B] shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-xs sm:text-sm font-bold text-white/90">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Step Action Buttons */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  <MagneticButton
                    onClick={onOpenBooking}
                    id="transform-book-consult-btn"
                    role="button"
                    ariaLabel="Schedule your personalized smile transformation consultation"
                    maxDistance={4}
                    className="w-full sm:w-auto flex-1 bg-[#E8F75B] hover:bg-white text-[#111318] py-3.5 px-6 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <span>START YOUR TRANSFORMATION</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </MagneticButton>

                  <MagneticButton
                    onClick={() => setActiveStageIdx((activeStageIdx + 1) % stages.length)}
                    id="transform-next-stage-btn"
                    role="button"
                    ariaLabel="Cycle to next transformation stage"
                    maxDistance={3}
                    className="w-full sm:w-auto px-4 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider transition-colors text-center"
                  >
                    <span>{activeStageIdx === 3 ? 'RESTART' : 'NEXT STEP'}</span>
                  </MagneticButton>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
