import React from 'react';
import { motion } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, ArrowRight, Star, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';
import { MagneticButton } from './MagneticButton';
import { MagneticLink } from './MagneticLink';

interface FinalCtaProps {
  onOpenBooking: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenBooking }) => {
  return (
    <section 
      className="w-full bg-[#6EA8DA] text-white py-24 sm:py-32 px-6 sm:px-12 lg:px-20 relative overflow-hidden flex items-center justify-center"
      id="final-call-to-action"
      aria-label="Direct Consultation Call to Action"
    >
      {/* Background Drifting Circles */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full border border-white"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -90, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full border border-[#E8F75B]"
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <ScrollReveal yOffset={16} once={false}>
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#E8F75B] mb-6 border border-white/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 fill-[#E8F75B]" aria-hidden="true" />
            <span>A&M DENTAL STATION · NOIDA</span>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto mb-6">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.98] text-white">
            <WordReveal 
              text="Ready for gentle," 
              as="span" 
              className="mr-2 text-white block sm:inline"
              once={false}
            />
            <AnimatedUnderline styleVariant="brush" color="#E8F75B" delay={0.3}>
              <span className="text-[#E8F75B]">thoughtful care?</span>
            </AnimatedUnderline>
          </h2>
        </div>

        <ScrollReveal yOffset={20} delay={0.15} once={false}>
          <p className="text-lg sm:text-xl font-bold text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Visit our clinic in <TextHighlight color="#E8F75B" textColor="#111318">Sector 70, Noida</TextHighlight> for checkups, root canal therapy, teeth cleaning, implants, or aesthetic smile makeovers.
          </p>
        </ScrollReveal>

        {/* Action Buttons with Magnetic Pull */}
        <ScrollReveal yOffset={20} delay={0.22} once={false}>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <MagneticButton
              onClick={onOpenBooking}
              id="final-book-btn"
              role="button"
              ariaLabel={`Book appointment with ${CLINIC_INFO.name}`}
              maxDistance={4}
              className="group inline-flex items-center gap-3 bg-[#E8F75B] hover:bg-white text-[#111318] px-10 py-5 rounded-full font-black text-sm uppercase tracking-wider shadow-2xl transition-colors"
            >
              <span>BOOK AN APPOINTMENT</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </MagneticButton>

            <MagneticLink
              href={`tel:${CLINIC_INFO.phone}`}
              id="final-call-btn"
              role="link"
              ariaLabel={`Call ${CLINIC_INFO.name} directly at ${CLINIC_INFO.phoneDisplay}`}
              maxDistance={4}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-[#111318] px-8 py-5 rounded-full font-black text-sm uppercase tracking-wider backdrop-blur-md border border-white/30 transition-colors shadow-lg"
            >
              <Phone className="w-4 h-4 text-[#E8F75B]" aria-hidden="true" />
              <span>CALL {CLINIC_INFO.phoneDisplay}</span>
            </MagneticLink>
          </div>
        </ScrollReveal>

        <ScrollReveal yOffset={10} delay={0.3} once={false}>
          <div 
            role="status"
            aria-label="Clinic operating hours: Open Monday through Sunday"
            className="mt-10 flex items-center justify-center gap-3 text-xs font-bold text-white/80 uppercase tracking-widest"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8F75B] animate-pulse" aria-hidden="true" />
            <span>{CLINIC_INFO.status} · MONDAY TO SUNDAY</span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
