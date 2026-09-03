import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { MapPin, Phone, Clock, ExternalLink, Navigation, Sparkles, Compass } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';
import { MagneticLink } from './MagneticLink';

export const LocationSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Smile Avenue Dental Clinic, Village Chhalera & Sadarpur, Block D, Sector 44, Noida, Uttar Pradesh 201303')}`;
  const embedMapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent('Smile Avenue Dental Clinic Village Chhalera Sadarpur Block D Sector 44 Noida Uttar Pradesh 201303')}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section 
      id="location"
      aria-label="Smile Avenue Dental Clinic Location and Directions"
      className="w-full py-20 sm:py-28 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <ScrollReveal yOffset={16} once={false}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#122342]/10 text-[11px] font-black uppercase tracking-[0.2em] text-[#122342] mb-3 font-general shadow-xs">
                <Compass className="w-3.5 h-3.5 text-[#6FA7D8]" aria-hidden="true" />
                <span>SECTOR 44 NOIDA SANCTUARY</span>
              </div>
            </ScrollReveal>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#122342] font-satoshi">
              <WordReveal 
                text="Find Us in" 
                as="span" 
                className="mr-2.5"
                once={false}
              />
              <AnimatedUnderline styleVariant="brush" color="#F4E94A" delay={0.25}>
                <span className="text-[#122342]">Sector 44, Noida.</span>
              </AnimatedUnderline>
            </h2>
          </div>

          <ScrollReveal yOffset={20} delay={0.15} once={false}>
            <p className="text-sm sm:text-base font-semibold text-[#122342]/80 max-w-md font-general">
              Easily accessible ground floor clinic situated in Village Chhalera & Sadarpur, Block D. Open daily until <TextHighlight color="#F4E94A" textColor="#122342">10:00 PM</TextHighlight>.
            </p>
          </ScrollReveal>
        </div>

        {/* Map & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT COLUMN: Address & Operating Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Address Card */}
              <ScrollReveal yOffset={20} delay={0.1} once={false}>
                <div className="bg-[#FFFDF7] rounded-[32px] p-6 sm:p-8 border-2 border-white/90 shadow-[0_15px_35px_rgba(18,35,66,0.08)] hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#6FA7D8] text-white flex items-center justify-center shrink-0 shadow-sm font-black">
                      <MapPin className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#6FA7D8] font-general block mb-1">
                        EXACT CLINICAL ADDRESS
                      </span>
                      <p className="text-xl sm:text-2xl font-black text-[#122342] font-satoshi leading-snug">
                        {CLINIC_INFO.address.line1}
                      </p>
                      <p className="text-sm sm:text-base font-bold text-[#122342]/85 mt-1 font-general">
                        {CLINIC_INFO.address.sector}, {CLINIC_INFO.address.city}, {CLINIC_INFO.address.state} {CLINIC_INFO.address.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Hours Card */}
              <ScrollReveal yOffset={20} delay={0.18} once={false}>
                <div className="bg-[#FFFDF7] rounded-[32px] p-6 sm:p-8 border-2 border-white/90 shadow-[0_15px_35px_rgba(18,35,66,0.08)] hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4E94A] text-[#122342] flex items-center justify-center shrink-0 shadow-sm font-black">
                      <Clock className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#122342]/70 font-general block mb-1">
                        CLINIC TIMINGS & NIGHT VISITS
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                        </span>
                        <p className="text-lg sm:text-xl font-black text-[#122342] font-satoshi">
                          {CLINIC_INFO.status}
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-[#122342]/80 mt-1 font-general">
                        Extended evening appointments open until 10:00 PM daily.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Phone Direct Line */}
              <ScrollReveal yOffset={20} delay={0.26} once={false}>
                <div className="bg-[#FFFDF7] rounded-[32px] p-6 sm:p-8 border-2 border-white/90 shadow-[0_15px_35px_rgba(18,35,66,0.08)] hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#122342] text-[#F4E94A] flex items-center justify-center shrink-0 shadow-sm">
                      <Phone className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#122342]/70 font-general block mb-1">
                        OFFICIAL DIRECT LINE
                      </span>
                      <a 
                        href={`tel:${CLINIC_INFO.phone}`} 
                        aria-label={`Call Smile Avenue Dental Clinic directly at ${CLINIC_INFO.phoneDisplay}`}
                        className="text-xl sm:text-2xl font-black text-[#122342] hover:text-[#6FA7D8] transition-colors block font-satoshi"
                      >
                        {CLINIC_INFO.phoneDisplay}
                      </a>
                      <p className="text-xs font-bold text-[#122342]/70 mt-1 font-general">
                        Same-day emergency inquiries & appointments
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* Direct Action Buttons */}
            <ScrollReveal yOffset={20} delay={0.32} once={false}>
              <div className="flex flex-wrap gap-4 pt-2">
                <MagneticLink
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="location-directions-btn"
                  role="link"
                  ariaLabel="Open Smile Avenue Dental Clinic in Google Maps for directions"
                  className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#F4E94A] hover:bg-[#ebd931] text-[#122342] px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-md transition-all text-center font-general"
                >
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  <span>GET DIRECTIONS</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                </MagneticLink>

                <MagneticLink
                  href={`tel:${CLINIC_INFO.phone}`}
                  id="location-call-btn"
                  role="link"
                  ariaLabel={`Call clinic directly at ${CLINIC_INFO.phoneDisplay}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#122342] hover:bg-[#1c3664] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-md transition-colors font-general"
                >
                  <Phone className="w-4 h-4 text-[#F4E94A]" aria-hidden="true" />
                  <span>CALL</span>
                </MagneticLink>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Stylized Map with Animated Lines & Pulsing Marker */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-[420px] sm:h-[480px] lg:h-full min-h-[440px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-white/90 bg-[#6FA7D8]/20"
            >
              <iframe
                title="Smile Avenue Dental Clinic Location Map in Sector 44, Noida"
                src={embedMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[15%] contrast-[1.05]"
              />

              {/* Pulsing Map Marker Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center" aria-hidden="true">
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={shouldReduceMotion ? {} : {
                      scale: [1, 1.8, 2.4],
                      opacity: [0.8, 0.3, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                    className="absolute w-12 h-12 rounded-full bg-[#F4E94A]"
                  />

                  {/* Marker Pin */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#122342] border-2 border-[#F4E94A] text-[#F4E94A] flex items-center justify-center shadow-2xl">
                    <MapPin className="w-6 h-6 fill-[#F4E94A] text-[#122342]" />
                  </div>
                </div>

                {/* Floating clinic label */}
                <div className="mt-2 bg-[#122342]/95 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-[11px] font-black uppercase tracking-wider text-white shadow-xl flex items-center gap-2 whitespace-nowrap font-general">
                  <span className="w-2 h-2 rounded-full bg-[#F4E94A]" />
                  <span>{CLINIC_INFO.name} · Sector 44</span>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
