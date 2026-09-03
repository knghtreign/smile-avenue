import React, { useState } from 'react';
import { motion, useSpring, useReducedMotion } from 'motion/react';
import { CLINIC_IMAGES } from '../data/clinicData';
import { Lightbox, LightboxItem } from './Lightbox';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';
import { ArrowUpRight, Camera, Sparkles } from 'lucide-react';

interface GalleryCardProps {
  item: LightboxItem;
  index: number;
  category: string;
  title: string;
  aspectClass: string;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  item,
  index,
  category,
  title,
  aspectClass,
  onClick,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const springConfig = { damping: 20, stiffness: 240, mass: 0.1 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    rotateY.set(x * 6);
    rotateX.set(-y * 6);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        perspective: 800,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative group cursor-pointer overflow-hidden rounded-[32px] bg-black/5 h-full shadow-[0_15px_35px_rgba(17,19,24,0.08)] border-2 border-white/80"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Open high-resolution photo: ${title}`}
    >
      <div className={`relative ${aspectClass} overflow-hidden rounded-[30px]`}>
        <img
          src={item.image}
          alt={item.caption}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Floating Category Tag */}
        <div 
          style={{ transform: 'translateZ(20px)' }}
          className="absolute top-4 left-4 bg-[#111318]/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-white/20 shadow-md flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8F75B]" aria-hidden="true" />
          <span>{category}</span>
        </div>

        {/* Hover Caption Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 sm:p-7">
          <div 
            style={{ transform: 'translateZ(24px)' }}
            className="flex items-center justify-between w-full text-white"
          >
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#E8F75B] block mb-1">
                {category}
              </span>
              <span className="text-sm sm:text-base font-bold tracking-wide">
                {title}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#E8F75B] text-[#111318] text-xs font-black uppercase tracking-wider shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span>EXPAND</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ClinicExperience: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: LightboxItem[] = [
    {
      image: CLINIC_IMAGES.clinicReception,
      caption: 'Reception Lounge & Consultation Check-in Area in Sector 70, Noida',
    },
    {
      image: CLINIC_IMAGES.clinicDetail,
      caption: 'Sterilised Micro-Instruments & Advanced Digital Dental Tools',
    },
    {
      image: CLINIC_IMAGES.clinicTreatment,
      caption: 'Modern Sterilised Treatment Operatory Suite with Ergonomic Patient Seating',
    },
    {
      image: CLINIC_IMAGES.clinicWaiting,
      caption: 'Comfortable, Quiet & Calm Waiting Lounge Area',
    },
  ];

  return (
    <section 
      id="clinic"
      aria-label="Physical Clinic Tour and Photographic Experience"
      className="w-full bg-[#C9D7A6] text-[#111318] py-20 sm:py-28 px-6 sm:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Ambient background accents */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-0 w-[450px] h-[450px] bg-white/30 rounded-full blur-3xl pointer-events-none -ml-32 -mt-32" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#6EA8DA]/25 rounded-full blur-3xl pointer-events-none -mr-28 -mb-28" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <ScrollReveal yOffset={16} once={false}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/50 border border-white/60 text-[11px] font-black uppercase tracking-[0.2em] text-[#111318] mb-3 shadow-sm">
                <Camera className="w-3.5 h-3.5 text-[#111318]" aria-hidden="true" />
                <span>THE PHYSICAL ENVIRONMENT</span>
              </div>
            </ScrollReveal>
            
            <div className="mt-1">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] text-[#111318]">
                <WordReveal 
                  text="See exactly where" 
                  as="span" 
                  className="mr-2"
                  once={false}
                />
                <AnimatedUnderline styleVariant="brush" color="#E8F75B" delay={0.3}>
                  <span className="text-[#111318]">you're going.</span>
                </AnimatedUnderline>
              </h2>
            </div>
          </div>
          
          <ScrollReveal yOffset={20} delay={0.15} once={false}>
            <p className="text-sm sm:text-base font-bold text-[#111318]/80 max-w-md">
              High-definition photographic tour of A&M Dental Station in <TextHighlight color="#E8F75B">Sector 70, Noida</TextHighlight>. Click any photo to inspect in full resolution.
            </p>
          </ScrollReveal>
        </div>

        {/* Gallery Composition with Tactile 3D Tilt and Replayable Viewport Animations */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Large Image (Reception / Lounge) */}
          <div className="md:col-span-7">
            <GalleryCard
              item={galleryItems[0]}
              index={0}
              category="RECEPTION & LOUNGE"
              title="Check-in & Consultation Area"
              aspectClass="aspect-[16/11] md:h-full"
              onClick={() => setLightboxIndex(0)}
            />
          </div>

          {/* Vertical Detail Image */}
          <div className="md:col-span-5">
            <GalleryCard
              item={galleryItems[1]}
              index={1}
              category="STERILISATION"
              title="Precision Dental Instruments"
              aspectClass="aspect-[3/4] md:h-full"
              onClick={() => setLightboxIndex(1)}
            />
          </div>

          {/* Supporting Image 1 (Treatment Suite) */}
          <div className="md:col-span-6">
            <GalleryCard
              item={galleryItems[2]}
              index={2}
              category="TREATMENT SUITE"
              title="Modern Operatory Room"
              aspectClass="aspect-[16/10]"
              onClick={() => setLightboxIndex(2)}
            />
          </div>

          {/* Supporting Image 2 (Waiting Area) */}
          <div className="md:col-span-6">
            <GalleryCard
              item={galleryItems[3]}
              index={3}
              category="PATIENT COMFORT"
              title="Calm Waiting Environment"
              aspectClass="aspect-[16/10]"
              onClick={() => setLightboxIndex(3)}
            />
          </div>

        </div>
      </div>

      {/* Lightbox Component */}
      <Lightbox
        items={galleryItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />
    </section>
  );
};
