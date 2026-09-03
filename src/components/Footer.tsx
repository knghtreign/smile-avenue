import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, MapPin, ArrowUp, Star, Clock } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { MagneticButton } from './MagneticButton';
import { MagneticLink } from './MagneticLink';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'ABOUT CLINIC', href: '#about' },
    { label: 'VISIT JOURNEY', href: '#visit-story' },
    { label: 'TREATMENTS', href: '#treatments' },
    { label: 'MEET DENTIST', href: '#dentist-capsule' },
    { label: 'PATIENT REVIEWS', href: '#reviews' },
    { label: 'SMILE RESTORATION', href: '#before-after' },
    { label: 'LOCATION & HOURS', href: '#location' },
    { label: 'PATIENT FAQ', href: '#faq' },
  ];

  return (
    <footer 
      className="w-full bg-[#122342] text-[#FFFDF7] py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-t-2 border-white/15 relative overflow-hidden" 
      id="site-footer"
      role="contentinfo"
      aria-label="Smile Avenue Dental Clinic Footer"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Large Oversized Satoshi Headline in Footer */}
        <div className="pb-12 sm:pb-16 border-b border-white/10">
          <ScrollReveal yOffset={20} once={false}>
            <div className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-satoshi uppercase mb-4">
              Smile Avenue Dental
            </div>
            <p className="text-sm sm:text-base text-white/75 font-medium max-w-xl font-general">
              Clarity, comfort & modern dental precision in Sector 44, Noida. Open daily until 10:00 PM for gentle clinical care.
            </p>
          </ScrollReveal>
        </div>

        {/* Middle Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-white/10">
          
          {/* Clinic Information */}
          <div className="md:col-span-5 space-y-4">
            <ScrollReveal yOffset={16} once={false}>
              <div 
                role="region"
                aria-label={`Rating: ${CLINIC_INFO.rating} out of 5 stars based on ${CLINIC_INFO.reviewsCount} Google reviews`}
                className="inline-flex items-center gap-2 bg-[#F4E94A] text-[#122342] px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase font-general shadow-sm"
              >
                <Star className="w-3.5 h-3.5 fill-[#122342] text-[#122342]" aria-hidden="true" />
                <span>{CLINIC_INFO.rating} Stars ({CLINIC_INFO.reviewsCount} Google Reviews)</span>
              </div>
            </ScrollReveal>

            <ScrollReveal yOffset={16} delay={0.08} once={false}>
              <div className="text-xs sm:text-sm text-white/80 font-medium font-general space-y-2">
                <p>Village Chhalera & Sadarpur, Block D, Sector 44, Noida, Uttar Pradesh 201303</p>
                <p className="text-[#F4E94A] font-bold">Open Daily Until 10:00 PM</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <ScrollReveal yOffset={16} delay={0.1} once={false}>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#F4E94A] block mb-2 font-general">
                EXPLORE
              </span>
            </ScrollReveal>

            <ul className="space-y-2 text-xs font-black uppercase tracking-wider font-general" role="list">
              {navLinks.map((link, idx) => (
                <li key={link.href}>
                  <ScrollReveal yOffset={10} delay={0.12 + idx * 0.03} once={false}>
                    <MagneticLink
                      href={link.href}
                      role="link"
                      ariaLabel={`Navigate to ${link.label}`}
                      className="text-white/70 hover:text-[#F4E94A] inline-block transition-colors py-0.5"
                    >
                      {link.label}
                    </MagneticLink>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Line & Directions */}
          <div className="md:col-span-4 space-y-4">
            <ScrollReveal yOffset={16} delay={0.12} once={false}>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#F4E94A] block mb-2 font-general">
                CONTACT DIRECT
              </span>
            </ScrollReveal>

            <ScrollReveal yOffset={16} delay={0.18} once={false}>
              <div className="flex items-start gap-2.5 text-xs font-bold text-white/90 font-general">
                <MapPin className="w-4 h-4 text-[#6FA7D8] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Sector 44, Noida (Village Chhalera & Sadarpur)</span>
              </div>
            </ScrollReveal>

            <ScrollReveal yOffset={16} delay={0.24} once={false}>
              <div className="flex items-center gap-2.5 text-xs font-bold text-white font-general">
                <Phone className="w-4 h-4 text-[#F4E94A] shrink-0" aria-hidden="true" />
                <MagneticLink 
                  href={`tel:${CLINIC_INFO.phone}`} 
                  role="link"
                  ariaLabel={`Call clinic telephone at ${CLINIC_INFO.phoneDisplay}`}
                  className="hover:text-[#F4E94A] transition-colors font-black text-sm"
                >
                  {CLINIC_INFO.phoneDisplay}
                </MagneticLink>
              </div>
            </ScrollReveal>

            <ScrollReveal yOffset={16} delay={0.3} once={false}>
              <div 
                role="status" 
                aria-label="Clinic operating hours"
                className="flex items-center gap-2 text-xs font-bold text-white/75 font-general"
              >
                <Clock className="w-4 h-4 text-[#6FA7D8] shrink-0" />
                <span>Open until 10:00 PM</span>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-white/60 font-general">
          <div>
            © {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.
          </div>

          <MagneticButton
            onClick={scrollToTop}
            id="footer-back-to-top-btn"
            role="button"
            ariaLabel="Scroll back to top of the page"
            className="group flex items-center gap-2 text-white/80 hover:text-[#F4E94A] transition-colors cursor-pointer py-1 px-3 rounded-full"
          >
            <span>BACK TO TOP</span>
            <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#F4E94A] group-hover:text-[#122342] flex items-center justify-center transition-colors">
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </MagneticButton>
        </div>

      </div>
    </footer>
  );
};
