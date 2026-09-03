import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Play, Pause, ExternalLink } from 'lucide-react';
import { FEATURED_CONTENT } from '../data/clinicData';
import { FeaturedContentItem } from '../types';
import { MagneticButton } from './MagneticButton';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';

interface FeaturedCarouselProps {
  onOpenBooking?: () => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ onOpenBooking }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedDetail, setSelectedDetail] = useState<FeaturedContentItem | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const categories = ['ALL', 'DIAGNOSTICS', 'TREATMENTS', 'AESTHETICS', 'PREVENTIVE', 'EXPERIENCE'];

  const filteredItems = activeCategory === 'ALL'
    ? FEATURED_CONTENT
    : FEATURED_CONTENT.filter((item) => item.category === activeCategory);

  // Safe index normalization
  const activeItem = filteredItems[currentIndex % filteredItems.length] || filteredItems[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
  };

  // Auto-play cycle
  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, filteredItems.length]);

  return (
    <section
      id="featured"
      aria-label="Featured Clinical Highlights Carousel"
      className="w-full bg-[#BCE4BF] text-[#111318] py-20 sm:py-28 px-6 sm:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Subtle background ambient circles */}
      <div 
        aria-hidden="true" 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#6EA8DA]/15 blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#E8F75B]/20 blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Title and Category Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <ScrollReveal yOffset={16} once={false}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111318]/5 border border-[#111318]/10 text-xs font-black uppercase tracking-[0.2em] text-[#111318]/80 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#111318]" aria-hidden="true" />
                <span>FEATURED CLINICAL SPOTLIGHT</span>
              </div>
            </ScrollReveal>

            <div className="mt-1">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] text-[#111318]">
                <WordReveal 
                  text="Advanced care." 
                  as="span" 
                  className="mr-2 block sm:inline"
                  once={false}
                />
                <AnimatedUnderline styleVariant="brush" color="#E8F75B" delay={0.3}>
                  <span className="text-[#111318]">Sub-millimeter precision.</span>
                </AnimatedUnderline>
              </h2>
            </div>
          </div>

          {/* Interactive Categories Pill Menu */}
          <ScrollReveal yOffset={20} delay={0.15} once={false}>
            <div className="flex items-center gap-1.5 p-1.5 bg-white/70 backdrop-blur-md rounded-full border border-white/80 shadow-sm flex-wrap">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    aria-pressed={isSelected}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#111318] text-[#E8F75B] shadow-sm'
                        : 'text-[#111318]/70 hover:text-[#111318] hover:bg-white/60'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* Carousel Showcase Stage */}
        <ScrollReveal yOffset={28} delay={0.2} once={false}>
          <div
            className="relative bg-[#111318] text-white rounded-[38px] overflow-hidden shadow-2xl border-4 border-white/90"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
              
              {/* Left Column: Image Canvas with Zoom Effect */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-black/40">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={activeItem.image}
                      alt={activeItem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:to-[#111318]" />
                    
                    {/* Badge on Image */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 bg-[#111318]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[#E8F75B] text-xs font-black tracking-wider uppercase">
                      <span className="w-2 h-2 rounded-full bg-[#E8F75B] animate-pulse" aria-hidden="true" />
                      <span>{activeItem.category}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                      <span className="text-xs text-white/70 font-semibold block">CLINICAL HIGHLIGHT</span>
                      <span className="text-sm font-bold text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#E8F75B]" aria-hidden="true" />
                        <span>{activeItem.highlight}</span>
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Information & Interactive Callouts */}
              <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative bg-[#111318]">
                <div>
                  {/* Top Bar with Counter and Auto-play Toggle */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#E8F75B]">
                      <span className="text-base font-black">
                        {String((currentIndex % filteredItems.length) + 1).padStart(2, '0')}
                      </span>
                      <span className="text-white/40">/</span>
                      <span className="text-white/60">
                        {String(filteredItems.length).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title={isPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
                        aria-label={isPlaying ? 'Pause auto-slide' : 'Play auto-slide'}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#E8F75B]" aria-hidden="true" /> : <Play className="w-3.5 h-3.5 text-white" aria-hidden="true" />}
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Content Details */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.id}
                      initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="space-y-4"
                    >
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-[#6EA8DA] block">
                        {activeItem.subtitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                        {activeItem.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/75 leading-relaxed font-normal">
                        {activeItem.description}
                      </p>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">
                            Key Benefit
                          </span>
                          <span className="text-sm font-black text-[#E8F75B]">
                            {activeItem.stats}
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedDetail(activeItem)}
                          className="text-xs font-bold text-white hover:text-[#E8F75B] underline flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>Details</span>
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer Controls */}
                <div className="pt-8 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Dot Indicators */}
                  <div className="flex items-center gap-2">
                    {filteredItems.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentIndex % filteredItems.length
                            ? 'w-7 bg-[#E8F75B]'
                            : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Navigation Arrows with Magnetic physics */}
                  <div className="flex items-center gap-3">
                    <MagneticButton
                      onClick={handlePrev}
                      ariaLabel="Previous featured item"
                      className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20"
                    >
                      <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                    </MagneticButton>

                    <MagneticButton
                      onClick={handleNext}
                      ariaLabel="Next featured item"
                      className="w-11 h-11 rounded-full bg-[#E8F75B] text-[#111318] hover:bg-[#d8e84a] flex items-center justify-center font-bold shadow-md"
                    >
                      <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    </MagneticButton>

                    {onOpenBooking && (
                      <MagneticButton
                        onClick={onOpenBooking}
                        className="px-4 py-2.5 rounded-full bg-[#6EA8DA] text-[#111318] text-xs font-black tracking-wider uppercase hover:bg-[#5b97cb] transition-colors ml-2"
                      >
                        Book Slot
                      </MagneticButton>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Modal for In-depth Detail View */}
        <AnimatePresence>
          {selectedDetail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedDetail(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#111318] text-white p-6 sm:p-8 rounded-[32px] max-w-lg w-full border border-white/20 shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-widest text-[#E8F75B] uppercase">
                    {selectedDetail.category} · SPECIFICATION
                  </span>
                  <button
                    onClick={() => setSelectedDetail(null)}
                    aria-label="Close detail modal"
                    className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 text-sm font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="rounded-2xl overflow-hidden aspect-video relative">
                  <img
                    src={selectedDetail.image}
                    alt={selectedDetail.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h4 className="text-xl font-black text-white">{selectedDetail.title}</h4>
                  <p className="text-xs text-[#6EA8DA] font-bold mt-0.5">{selectedDetail.subtitle}</p>
                  <p className="text-sm text-white/80 mt-3 leading-relaxed">{selectedDetail.description}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="text-xs text-white/60">Safety & Standards:</div>
                  <div className="text-sm font-bold text-[#E8F75B] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    <span>{selectedDetail.highlight}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {onOpenBooking && (
                    <MagneticButton
                      onClick={() => {
                        setSelectedDetail(null);
                        onOpenBooking();
                      }}
                      className="flex-1 py-3 rounded-full bg-[#E8F75B] text-[#111318] text-xs font-black uppercase tracking-wider text-center"
                    >
                      Book Consultation For This
                    </MagneticButton>
                  )}
                  <button
                    onClick={() => setSelectedDetail(null)}
                    className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
