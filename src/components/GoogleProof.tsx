import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion, useSpring } from 'motion/react';
import { CLINIC_INFO, CLINIC_IMAGES } from '../data/clinicData';
import { Star, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';

export const GoogleProof: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const [ratingCount, setRatingCount] = useState<number>(0);
  const [reviewsCount, setReviewsCount] = useState<number>(0);

  // 3D Tilt for photographic showcase
  const imageStageRef = useRef<HTMLDivElement>(null);
  const springConfig = { damping: 25, stiffness: 220, mass: 0.12 };
  const imgRotateX = useSpring(0, springConfig);
  const imgRotateY = useSpring(0, springConfig);

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !imageStageRef.current) return;
    const rect = imageStageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    imgRotateY.set(x * 6);
    imgRotateX.set(-y * 6);
  };

  const handleImageMouseLeave = () => {
    imgRotateX.set(0);
    imgRotateY.set(0);
  };

  // Replayable smooth counter animation
  useEffect(() => {
    if (!isInView) {
      setRatingCount(0);
      setReviewsCount(0);
      return;
    }

    if (shouldReduceMotion) {
      setRatingCount(CLINIC_INFO.rating);
      setReviewsCount(CLINIC_INFO.reviewsCount);
      return;
    }

    const duration = 1400; // ms
    const startTime = performance.now();

    const animateCounters = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out cubic: 1 - (1 - progress)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setRatingCount(parseFloat((easeOut * CLINIC_INFO.rating).toFixed(1)));
      setReviewsCount(Math.floor(easeOut * CLINIC_INFO.reviewsCount));

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      } else {
        setRatingCount(CLINIC_INFO.rating);
        setReviewsCount(CLINIC_INFO.reviewsCount);
      }
    };

    requestAnimationFrame(animateCounters);
  }, [isInView, shouldReduceMotion]);

  return (
    <section 
      ref={ref}
      id="reviews"
      aria-label="Verified Google Patient Reviews and Trust Metrics"
      className="w-full bg-[#BCE4BF] text-[#111318] py-20 sm:py-28 px-6 sm:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Background ambient lighting accents */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/30 rounded-full blur-3xl pointer-events-none -mr-28 -mt-28"
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#E8F75B]/30 rounded-full blur-3xl pointer-events-none -ml-28 -mb-28"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Numbers & Trust */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal yOffset={16} once={false}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/50 border border-white/60 text-[11px] font-black uppercase tracking-[0.2em] text-[#111318] mb-3 shadow-sm">
                <Award className="w-3.5 h-3.5 text-[#111318]" aria-hidden="true" />
                <span>VERIFIED PATIENT PROOF</span>
              </div>
            </ScrollReveal>
            
            <div className="mb-10">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#111318]">
                <WordReveal 
                  text="Patients share their" 
                  as="span" 
                  className="mr-2"
                  once={false}
                />
                <AnimatedUnderline styleVariant="brush" color="#E8F75B" delay={0.3}>
                  <span className="text-[#111318]">real experiences.</span>
                </AnimatedUnderline>
              </h2>

              <ScrollReveal yOffset={16} delay={0.15} once={false}>
                <p className="mt-4 text-base sm:text-lg text-[#111318]/85 font-semibold max-w-xl">
                  Over <TextHighlight color="#E8F75B">{CLINIC_INFO.reviewsCount}+ patients</TextHighlight> trust Dr. Munish Sharma and A&M Dental Station in Sector 70, Noida for painless and gentle treatments.
                </p>
              </ScrollReveal>
            </div>

            {/* Giant Numbers Grid with Smooth Entrance Motion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Rating 4.9 */}
              <ScrollReveal yOffset={24} delay={0.12} once={false}>
                <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-7 sm:p-8 border-2 border-white shadow-[0_15px_35px_rgba(17,19,24,0.06)] relative overflow-hidden group hover:bg-white hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" aria-hidden="true" />
                      ))}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8F75B] text-[#111318]">
                      GOOGLE VERIFIED
                    </span>
                  </div>

                  {/* Smooth Animated Counter */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 10 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl sm:text-7xl font-black text-[#111318] tracking-tighter leading-none mb-2"
                  >
                    {ratingCount.toFixed(1)}
                  </motion.div>

                  <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#111318]/80">
                    Google Star Rating
                  </div>
                </div>
              </ScrollReveal>

              {/* Reviews 432 */}
              <ScrollReveal yOffset={24} delay={0.2} once={false}>
                <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-7 sm:p-8 border-2 border-white shadow-[0_15px_35px_rgba(17,19,24,0.06)] relative overflow-hidden group hover:bg-white hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#E8F75B] flex items-center justify-center text-[#111318] font-black shadow-sm">
                      <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#111318] text-[#E8F75B]">
                      100% AUTHENTIC
                    </span>
                  </div>

                  {/* Smooth Animated Counter */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 10 }}
                    transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl sm:text-7xl font-black text-[#111318] tracking-tighter leading-none mb-2"
                  >
                    {reviewsCount}+
                  </motion.div>

                  <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#111318]/80">
                    Verified Reviews
                  </div>
                </div>
              </ScrollReveal>

            </div>

            <ScrollReveal yOffset={16} delay={0.28} once={false}>
              <div className="flex items-center gap-2 mt-6">
                <CheckCircle2 className="w-4 h-4 text-[#111318]" aria-hidden="true" />
                <p className="text-xs sm:text-sm font-bold text-[#111318]/75 tracking-wide">
                  Live data verified from A&M Dental Station Google Maps business profile in Noida.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Trust Image Card with 3D Tilt */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal yOffset={30} delay={0.18} once={false}>
              <motion.div 
                ref={imageStageRef}
                onMouseMove={handleImageMouseMove}
                onMouseLeave={handleImageMouseLeave}
                style={{
                  perspective: 1000,
                  rotateX: imgRotateX,
                  rotateY: imgRotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative aspect-[4/3.5] rounded-[38px] overflow-hidden shadow-[0_25px_60px_rgba(17,19,24,0.18)] border-4 border-white/90 bg-white/40 group cursor-pointer"
              >
                <img
                  src={CLINIC_IMAGES.clinicChair}
                  alt="A&M Dental Station Treatment Suite"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-6">
                  <div 
                    style={{ transform: 'translateZ(24px)' }}
                    className="w-full bg-[#111318]/90 backdrop-blur-md px-4 py-3 rounded-2xl text-xs font-black text-white tracking-wider uppercase shadow-xl flex items-center justify-between border border-white/15"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E8F75B]" aria-hidden="true" />
                      <span>MODERN OPERATORY SUITE</span>
                    </div>
                    <span className="text-[#E8F75B] text-[11px] font-extrabold">
                      SECTOR 70 NOIDA
                    </span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
