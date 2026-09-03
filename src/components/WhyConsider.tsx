import React from 'react';
import { motion } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { Check, Phone, MapPin, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';
import { MagneticButton } from './MagneticButton';
import { MagneticLink } from './MagneticLink';

interface WhyConsiderProps {
  onOpenBooking: () => void;
}

export const WhyConsider: React.FC<WhyConsiderProps> = ({ onOpenBooking }) => {
  const checklistItems = [
    { label: 'Google Rating', value: `${CLINIC_INFO.rating} Stars (Independent Patient Feedback)` },
    { label: 'Verified Reviews', value: `${CLINIC_INFO.reviewsCount} Authentic Google Patient Reviews` },
    { label: 'Location', value: `BH-68, ${CLINIC_INFO.address.sector}, ${CLINIC_INFO.address.city}` },
    { label: 'Operating Hours', value: CLINIC_INFO.status },
    { label: 'Direct Helpline', value: CLINIC_INFO.phoneDisplay },
  ];

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('A&M Dental Station, BH-68, Sector 70, Noida, Uttar Pradesh 201301')}`;

  return (
    <section 
      id="reviews-checklist"
      aria-label="Clinic Comparison Facts and Verification Checklist"
      className="w-full bg-[#C9D7A6] text-[#111318] py-20 sm:py-28 px-6 sm:px-12 lg:px-20 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <ScrollReveal yOffset={30} once={false}>
          <div className="bg-white/95 backdrop-blur-xl rounded-[38px] p-8 sm:p-14 border-2 border-white shadow-[0_25px_60px_rgba(17,19,24,0.08)]">
            
            <div className="max-w-2xl mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111318]/5 border border-[#111318]/10 text-[11px] font-black uppercase tracking-[0.2em] text-[#111318] mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#111318]" aria-hidden="true" />
                <span>DECISION CHECKLIST</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.05] text-[#111318]">
                <WordReveal 
                  text="Still comparing" 
                  as="span" 
                  className="mr-2"
                  once={false}
                />
                <AnimatedUnderline styleVariant="brush" color="#E8F75B" delay={0.3}>
                  <span className="text-[#111318]">dental clinics?</span>
                </AnimatedUnderline>
              </h2>
              
              <p className="text-base sm:text-lg text-[#111318]/80 font-semibold mt-4">
                Here are the key verified facts to help you choose <TextHighlight color="#E8F75B">{CLINIC_INFO.name}</TextHighlight> with complete confidence.
              </p>
            </div>

            {/* Visual Comparison Checklist with Animated Staggered Items */}
            <div className="space-y-3.5 mb-12" id="comparison-checklist">
              {checklistItems.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 6 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#BCE4BF]/40 hover:bg-[#BCE4BF]/75 transition-colors border border-black/5 gap-2 group cursor-default"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-[#E8F75B] flex items-center justify-center text-[#111318] shrink-0 font-black shadow-sm group-hover:scale-110 transition-transform">
                      <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />
                    </div>
                    <span className="text-sm sm:text-base font-black uppercase tracking-wide text-[#111318]">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#111318] sm:text-right pl-11 sm:pl-0">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Direct Action Buttons with Magnetic Pull */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-black/10">
              <MagneticLink
                href={`tel:${CLINIC_INFO.phone}`}
                id="compare-call-btn"
                role="link"
                ariaLabel={`Call A&M Dental Station at ${CLINIC_INFO.phoneDisplay}`}
                maxDistance={3}
                className="group inline-flex items-center gap-2 bg-[#111318] hover:bg-black text-[#E8F75B] px-7 py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-md"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>CALL A&M ({CLINIC_INFO.phoneDisplay})</span>
              </MagneticLink>

              <MagneticLink
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="compare-directions-btn"
                role="link"
                ariaLabel="Get Google Maps directions to A&M Dental Station in Sector 70, Noida"
                maxDistance={3}
                className="inline-flex items-center gap-2 bg-white hover:bg-[#BCE4BF] text-[#111318] px-7 py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-colors border border-black/15 shadow-sm"
              >
                <MapPin className="w-4 h-4 text-[#111318]" aria-hidden="true" />
                <span>GET DIRECTIONS</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </MagneticLink>

              <MagneticButton
                onClick={onOpenBooking}
                id="compare-book-btn"
                role="button"
                ariaLabel={`Schedule an appointment with ${CLINIC_INFO.name}`}
                maxDistance={3}
                className="inline-flex items-center gap-2 bg-[#E8F75B] hover:bg-[#d8e74b] text-[#111318] px-8 py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-md sm:ml-auto transition-colors"
              >
                <span>BOOK APPOINTMENT</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </MagneticButton>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
