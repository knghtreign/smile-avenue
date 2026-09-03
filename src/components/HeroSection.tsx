import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'motion/react';
import { CLINIC_INFO, CLINIC_IMAGES } from '../data/clinicData';
import { Navbar } from './Navbar';
import { Phone, ArrowRight, Star, Clock, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Desktop Mouse 3D Tilt & Parallax
  const [isDesktop, setIsDesktop] = useState(false);
  const mouseX = useSpring(0, { stiffness: 70, damping: 22 });
  const mouseY = useSpring(0, { stiffness: 70, damping: 22 });

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const normalizedY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const scrollArtworkY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  // Pointer parallax offsets
  const artworkParallaxX = useTransform(mouseX, [-1, 1], [-8, 8]);
  const artworkParallaxY = useTransform(mouseY, [-1, 1], [-8, 8]);

  const badgeParallaxX = useTransform(mouseX, [-1, 1], [-6, 6]);
  const badgeParallaxY = useTransform(mouseY, [-1, 1], [-6, 6]);

  const ctaParallaxX = useTransform(mouseX, [-1, 1], [-4, 4]);
  const ctaParallaxY = useTransform(mouseY, [-1, 1], [-4, 4]);

  const customEase = [0.22, 1, 0.36, 1] as const;

  // Staggered reveal for headline lines
  const headlineLines = [
    { text: 'Dental care crafted with', highlight: false },
    { text: 'clarity, comfort &', highlight: true },
    { text: 'modern precision.', highlight: false },
  ];

  return (
    <section 
      ref={sectionRef}
      role="banner"
      aria-label="Smile Avenue Dental Clinic Hero Section"
      className="w-full min-h-screen bg-[#DCE8B8] flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 pt-2 sm:pt-4 relative overflow-hidden"
    >
      {/* 01 — LARGE ROUNDED BLUE #6FA7D8 HERO PANEL WITH SAGE #DCE8B8 OUTER MARGIN */}
      <motion.div 
        ref={stageRef}
        id="hero-stage"
        role="region"
        aria-label="Smile Avenue Dental Clinic Welcome"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, clipPath: 'inset(8% 8% 8% 8% round 48px)', scale: 0.96 }}
        whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 38px)', scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.0, ease: customEase }}
        className="w-[94vw] max-w-[1380px] min-h-[760px] lg:min-h-[820px] rounded-[38px] bg-[#6FA7D8] relative overflow-hidden flex flex-col justify-between shadow-[0_35px_80px_rgba(18,35,66,0.14)] border-2 border-white/60"
      >
        {/* Ambient background lines */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 800" fill="none">
            <path d="M0 200 C300 100, 700 300, 1000 150 M0 450 C300 350, 700 550, 1000 400" stroke="white" strokeWidth="1.5" />
            <path d="M0 320 C350 480, 650 220, 1000 380" stroke="#F4E94A" strokeWidth="1" strokeDasharray="6 6" />
          </svg>
        </div>

        {/* 02 — NAVIGATION INSIDE BLUE STAGE */}
        <Navbar onOpenBooking={onOpenBooking} />

        {/* 03 — MAIN HERO BODY GRID */}
        <div className="relative z-10 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 px-6 sm:px-12 lg:px-16 pt-4 pb-16 lg:pb-14 items-center gap-8">
          
          {/* LEFT COLUMN: Editorial Typography & Verified Business Info */}
          <div className="lg:col-span-6 flex flex-col justify-center max-w-[540px] z-20">
            
            {/* Eyebrow */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
              className="mb-4 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#F4E94A] animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/95 font-general">
                SECTOR 44 · NOIDA · OPEN UNTIL 10:00 PM
              </span>
            </motion.div>

            {/* Main Headline: Line-by-Line Vertical Mask Reveal with Yellow Sweep on 'Clarity' */}
            <h1 className="text-white font-black text-[42px] sm:text-[62px] lg:text-[72px] leading-[0.96] tracking-[-0.035em] font-satoshi mb-6 select-none">
              {headlineLines.map((line, idx) => (
                <span key={idx} className="block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '100%', opacity: 0 }}
                    whileInView={{ y: '0%', opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + idx * 0.14,
                      ease: customEase,
                    }}
                  >
                    {line.highlight ? (
                      <span className="relative inline-block text-[#122342] px-2 mr-1">
                        {/* The Yellow Physical Sweep Marker */}
                        <motion.span
                          className="absolute inset-0 bg-[#F4E94A] -rotate-1 rounded-lg -z-10 shadow-md"
                          initial={{ width: '0%' }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: false }}
                          transition={{
                            duration: 0.6,
                            delay: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                        <span>{line.text}</span>
                      </span>
                    ) : (
                      line.text
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Supporting Verified Business Copy */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.6, ease: customEase }}
              className="mb-8 space-y-2 text-white"
            >
              <p className="text-base sm:text-lg font-bold text-white/95 font-general leading-snug">
                Village Chhalera & Sadarpur, Block D, Sector 44, Noida · Open until 10:00 PM
              </p>
              
              {/* Floating Verified Info Elements */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wider font-general pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-xs">
                  <Star className="w-3.5 h-3.5 fill-[#F4E94A] text-[#F4E94A]" />
                  <span>5.0 ★ · 16 Google Reviews</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-xs">
                  <Clock className="w-3.5 h-3.5 text-[#F4E94A]" />
                  <span>Open until 10:00 PM</span>
                </span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.75, ease: customEase }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onOpenBooking}
                id="hero-book-visit-btn"
                className="group relative inline-flex items-center justify-center gap-2.5 bg-[#F4E94A] text-[#122342] px-8 py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_12px_30px_rgba(244,233,74,0.4)] hover:bg-white hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all font-general cursor-pointer"
              >
                <span>Book a Visit</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={`tel:${CLINIC_INFO.phone}`}
                id="hero-emergency-call"
                className="inline-flex items-center gap-2 px-4 py-3 text-white hover:text-[#F4E94A] font-bold text-xs uppercase tracking-wider font-general transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[#F4E94A]">
                  <Phone className="w-4 h-4" />
                </div>
                <span>Call 093685 41439</span>
              </a>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Massive Layered Dental Artwork Composition */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end z-10">
            <div className="relative w-full max-w-[560px] aspect-[4/3.5] flex items-center justify-center">
              
              {/* Subtle architectural halo */}
              <div 
                aria-hidden="true" 
                className="absolute inset-0 bg-white/10 rounded-full blur-3xl pointer-events-none"
              />

              {/* Parallax layer with 3D tilt */}
              <motion.div
                style={{ y: scrollArtworkY, x: artworkParallaxX }}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.9, delay: 0.4, ease: customEase }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Micro-breathing animation */}
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <img
                    src={CLINIC_IMAGES.heroArtwork}
                    alt="Smile Avenue Dental Clinic Precision Dentistry Artwork"
                    referrerPolicy="no-referrer"
                    id="hero-dental-artwork"
                    className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(18,35,66,0.35)] select-none pointer-events-none"
                  />

                  {/* Micro Sparkle Accents */}
                  <motion.div 
                    aria-hidden="true"
                    animate={shouldReduceMotion ? {} : { scale: [0.8, 1.2, 0.8], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-[20%] right-[22%] pointer-events-none"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#F4E94A] drop-shadow-[0_0_8px_rgba(244,233,74,0.9)]">
                      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* 04 — FLOATING PROOF BADGE (Bottom Left) */}
        <motion.div 
          style={{ x: badgeParallaxX, y: badgeParallaxY }}
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.6, ease: customEase }}
          className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 bg-[#FFFDF7] text-[#122342] px-5 py-3 rounded-[22px] shadow-[0_15px_35px_rgba(18,35,66,0.12)] flex items-center gap-3 border border-white/80 z-30"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#F4E94A] text-[#122342] font-black text-sm">
            ★
          </div>
          <div>
            <div className="font-black text-lg text-[#122342] font-satoshi leading-none">
              5.0 ★
            </div>
            <p className="text-[10px] uppercase tracking-wider text-[#122342]/70 font-extrabold font-general mt-0.5">
              16 GOOGLE REVIEWS · NOIDA
            </p>
          </div>
        </motion.div>

        {/* 05 — CIRCULAR YELLOW BOOKING CTA (Bottom Right) */}
        <motion.div 
          style={{ x: ctaParallaxX, y: ctaParallaxY }}
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.7, ease: customEase }}
          className="absolute -bottom-4 right-6 sm:right-12 z-30"
        >
          <motion.button
            onClick={onOpenBooking}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="group relative w-[114px] h-[114px] sm:w-[124px] sm:h-[124px] rounded-full bg-[#F4E94A] text-[#122342] flex flex-col items-center justify-center shadow-[0_20px_40px_rgba(18,35,66,0.2)] border-2 border-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-white/80"
            aria-label="Book a Visit at Smile Avenue Dental Clinic"
          >
            {/* SVG Circular Text */}
            <motion.svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 124 124"
              aria-hidden="true"
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <path
                id="heroBookingCircle"
                d="M 62, 62 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                fill="none"
              />
              <text className="text-[9.5px] font-black uppercase tracking-[0.2em] fill-[#122342] font-general">
                <textPath href="#heroBookingCircle" startOffset="0%">
                  BOOK A VISIT · SMILE AVENUE ·
                </textPath>
              </text>
            </motion.svg>

            {/* Center Arrow */}
            <div className="relative z-10 text-xl font-black leading-none">
              ↗
            </div>
          </motion.button>
        </motion.div>

      </motion.div>
    </section>
  );
};
