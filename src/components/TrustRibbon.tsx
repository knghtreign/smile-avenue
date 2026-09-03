import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { ScrollReveal } from './ScrollReveal';

export const TrustRibbon: React.FC = () => {
  const marqueeItems = [
    `${CLINIC_INFO.rating} GOOGLE RATING`,
    `${CLINIC_INFO.reviewsCount} VERIFIED REVIEWS`,
    `${CLINIC_INFO.address.sector.toUpperCase()} · ${CLINIC_INFO.address.city.toUpperCase()}`,
    CLINIC_INFO.phoneDisplay,
    CLINIC_INFO.status.toUpperCase(),
  ];

  return (
    <ScrollReveal yOffset={10} duration={0.6}>
      <section 
        className="w-full h-12 sm:h-14 bg-[#111318] text-white flex items-center overflow-hidden relative z-20 border-y border-white/10" 
        id="trust-ribbon"
        aria-label="Verified clinic highlights and contact ticker"
      >
        <div className="animate-marquee flex items-center gap-10 text-[11px] font-extrabold tracking-[0.16em] uppercase whitespace-nowrap px-8 select-none">
          {[...Array(6)].map((_, setIdx) => (
            <React.Fragment key={setIdx}>
              {marqueeItems.map((item, idx) => (
                <div key={`${setIdx}-${idx}`} className="flex items-center gap-10">
                  <span className="hover:text-[#E8F75B] transition-colors cursor-default">{item}</span>
                  <span className="text-[#E8F75B] font-black text-xs select-none" aria-hidden="true">•</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
};
