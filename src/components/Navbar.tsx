import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { MagneticButton } from './MagneticButton';
import { MagneticLink } from './MagneticLink';
import { Phone } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['about', 'visit-story', 'treatments', 'reviews', 'faq', 'location'];
      const scrollPos = window.scrollY + 200;
      
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'ABOUT', id: 'about' },
    { href: '#visit-story', label: 'VISIT', id: 'visit-story' },
    { href: '#treatments', label: 'TREATMENTS', id: 'treatments' },
    { href: '#dentist-capsule', label: 'DENTIST', id: 'dentist-capsule' },
    { href: '#reviews', label: 'REVIEWS', id: 'reviews' },
    { href: '#location', label: 'LOCATION', id: 'location' },
    { href: '#faq', label: 'FAQ', id: 'faq' },
  ];

  return (
    <motion.nav 
      aria-label="Main Clinic Navigation"
      role="navigation"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full px-4 sm:px-8 lg:px-12 transition-all duration-300 ease-out z-50 sticky top-0 ${
        isScrolled 
          ? 'py-3 bg-[#FFFDF7]/90 backdrop-blur-md shadow-[0_4px_25px_rgba(18,35,66,0.08)] border-b border-[#122342]/10 text-[#122342]' 
          : 'pt-5 pb-3 bg-transparent text-white'
      }`} 
      id="main-navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand logo / name */}
        <MagneticLink 
          href="#" 
          role="link"
          ariaLabel={`${CLINIC_INFO.name} - Return to top`}
          className="flex items-center gap-2.5 font-bold text-sm tracking-[0.04em] uppercase group cursor-pointer rounded-full py-1" 
          id="brand-logo"
        >
          {/* Live pulsing dot indicator */}
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4E94A] opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F4E94A] shadow-[0_0_8px_rgba(244,233,74,0.9)]" />
          </span>
          <span className={`font-black tracking-[0.04em] text-sm sm:text-base font-satoshi transition-colors ${
            isScrolled ? 'text-[#122342]' : 'text-white'
          }`}>
            {CLINIC_INFO.name}
          </span>
        </MagneticLink>

        {/* Center navigation links */}
        <div className="hidden lg:flex items-center gap-5 font-black text-[11px] uppercase tracking-[0.12em] font-general" id="nav-links">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a 
                key={link.href}
                href={link.href} 
                role="link"
                aria-label={`Navigate to ${link.label} section`}
                className={`relative px-2 py-1 transition-transform duration-200 group hover:-translate-y-0.5 ${
                  isScrolled 
                    ? isActive ? 'text-[#122342] font-black' : 'text-[#122342]/70 hover:text-[#122342]' 
                    : isActive ? 'text-white font-black' : 'text-white/80 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <span 
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-200 ${
                    isActive 
                      ? 'w-full bg-[#F4E94A]' 
                      : 'w-0 group-hover:w-full bg-[#F4E94A]'
                  }`} 
                />
              </a>
            );
          })}
        </div>

        {/* Right Action Button & Emergency Call */}
        <div className="flex items-center gap-3">
          
          {/* Emergency direct line */}
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            aria-label={`Emergency telephone: Tooth hurting? Call ${CLINIC_INFO.phoneDisplay}`}
            className={`hidden sm:flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors font-general ${
              isScrolled
                ? 'text-[#122342] hover:text-[#6FA7D8]'
                : 'text-white hover:text-[#F4E94A]'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-[#F4E94A]" />
            <span>Tooth hurting? {CLINIC_INFO.phoneDisplay}</span>
          </a>

          <MagneticButton
            onClick={onOpenBooking}
            id="nav-book-btn"
            role="button"
            ariaLabel={`Book a visit at ${CLINIC_INFO.name}`}
            className={`font-black text-xs uppercase tracking-[0.1em] px-5 py-2.5 rounded-full transition-all duration-300 font-general shadow-md cursor-pointer ${
              isScrolled 
                ? 'bg-[#122342] text-[#F4E94A] hover:bg-black' 
                : 'bg-[#F4E94A] text-[#122342] hover:bg-white'
            }`}
          >
            <span>Book a Visit</span>
          </MagneticButton>
        </div>

      </div>
    </motion.nav>
  );
};
