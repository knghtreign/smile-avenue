import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, Calendar, ArrowRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { MagneticLink } from './MagneticLink';

interface FloatingBookingBarProps {
  onOpenBooking: () => void;
}

export const FloatingBookingBar: React.FC<FloatingBookingBarProps> = ({ onOpenBooking }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop: Floating Bottom-Right Pill */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="toolbar"
            aria-label="Quick appointment and contact actions"
            className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center gap-2 p-2 bg-[#122342]/95 backdrop-blur-xl border-2 border-white/20 rounded-full shadow-[0_20px_40px_rgba(18,35,66,0.3)] text-white font-general"
            id="floating-desktop-bar"
          >
            {/* Live Clinic Dot & Status */}
            <div 
              role="status" 
              aria-live="polite"
              aria-label={`Clinic Status: Open. Closes at 10:00 PM. Rating: ${CLINIC_INFO.rating} stars.`}
              className="flex items-center gap-2 pl-3 pr-2 py-1 text-[11px] font-bold text-white/90 border-r border-white/15"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4E94A] opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F4E94A]" />
              </span>
              <span className="tracking-wider uppercase text-[10px] hidden md:inline">OPEN · CLOSES 10 PM</span>
            </div>

            {/* Direct Call Link with Magnetic Pull */}
            <MagneticLink
              href={`tel:${CLINIC_INFO.phone}`}
              id="floating-call-btn"
              role="link"
              ariaLabel={`Call ${CLINIC_INFO.name} directly at ${CLINIC_INFO.phoneDisplay}`}
              maxDistance={3}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F4E94A]" aria-hidden="true" />
              <span>CALL</span>
            </MagneticLink>

            {/* Book Button with Magnetic Pull & Spring Animation */}
            <MagneticButton
              onClick={onOpenBooking}
              id="floating-book-btn"
              role="button"
              ariaLabel={`Schedule an appointment with ${CLINIC_INFO.name}`}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F4E94A] text-[#122342] font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-colors shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>BOOK APPOINTMENT</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </MagneticButton>
          </motion.div>

          {/* Mobile: Sticky Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="toolbar"
            aria-label="Mobile quick consultation and call toolbar"
            className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#122342]/95 backdrop-blur-xl border-t border-white/15 p-3 flex items-center gap-2 shadow-[0_-10px_30px_rgba(18,35,66,0.3)] font-general"
            id="floating-mobile-bar"
          >
            <motion.a
              href={`tel:${CLINIC_INFO.phone}`}
              id="floating-mobile-call-btn"
              role="link"
              aria-label={`Call ${CLINIC_INFO.name} directly at ${CLINIC_INFO.phoneDisplay}`}
              whileTap={{ scale: 0.96 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/10 text-white font-extrabold text-xs uppercase tracking-wider border border-white/10"
            >
              <Phone className="w-4 h-4 text-[#F4E94A]" aria-hidden="true" />
              <span>CALL DIRECT</span>
            </motion.a>

            <motion.button
              onClick={onOpenBooking}
              type="button"
              role="button"
              id="floating-mobile-book-btn"
              aria-label="Open booking modal to schedule an appointment"
              whileTap={{ scale: 0.96 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#F4E94A] text-[#122342] font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>BOOK VISIT</span>
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
