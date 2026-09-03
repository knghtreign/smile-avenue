import React from 'react';
import { motion } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline } from './TextHighlight';
import { Star, MessageSquare, Clock, MapPin, Sparkles } from 'lucide-react';

export const ResultsNumbers: React.FC = () => {
  return (
    <section 
      id="results"
      aria-label="Verified Clinic Performance and Community Trust"
      className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Context */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <ScrollReveal yOffset={16} once={false}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#122342]/10 text-[11px] font-black uppercase tracking-[0.2em] text-[#122342] mb-3 font-general shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#6FA7D8]" aria-hidden="true" />
              <span>VERIFIED CLINICAL METRICS</span>
            </div>
          </ScrollReveal>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#122342] font-satoshi">
            <WordReveal 
              text="Authentic Trust in" 
              as="span" 
              className="mr-2.5"
              once={false}
            />
            <AnimatedUnderline styleVariant="brush" color="#F4E94A" delay={0.25}>
              <span className="text-[#122342]">Real Numbers.</span>
            </AnimatedUnderline>
          </h2>
          <p className="text-sm sm:text-base text-[#122342]/75 font-medium mt-3 font-general">
            Zero fabricated claims or unverified metrics. Every detail reflects our official clinical listing and patient record in Noida.
          </p>
        </div>

        {/* 4 Verified Metric Cards with Replayable Framer Motion Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: 5.0 Google Rating */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[32px] bg-[#6FA7D8] p-7 text-white shadow-[0_15px_35px_rgba(18,35,66,0.12)] border-2 border-white/80 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F4E94A] font-general">
                GOOGLE RATING
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Star className="w-4 h-4 fill-[#F4E94A] text-[#F4E94A]" />
              </div>
            </div>

            <div>
              {/* Scaled animated number */}
              <motion.div 
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="text-5xl sm:text-6xl font-black font-satoshi tracking-tight text-white mb-1"
              >
                5.0 ★
              </motion.div>
              <div className="text-xs font-bold text-white/90 uppercase tracking-wider font-general">
                Perfect 5-Star Score
              </div>
              <p className="text-xs text-white/75 mt-2 font-medium font-general">
                Consistently rated 5 out of 5 stars by treated patients in Sector 44, Noida.
              </p>
            </div>
          </motion.div>

          {/* Card 2: 16 Verified Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[32px] bg-[#FFFDF7] p-7 text-[#122342] shadow-[0_15px_35px_rgba(18,35,66,0.1)] border-2 border-white/90 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#6FA7D8] font-general">
                PATIENT REVIEWS
              </span>
              <div className="w-8 h-8 rounded-full bg-[#6FA7D8]/15 flex items-center justify-center text-[#6FA7D8]">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>

            <div>
              {/* Digit roll reveal */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-5xl sm:text-6xl font-black font-satoshi tracking-tight text-[#122342] mb-1"
              >
                16
              </motion.div>
              <div className="text-xs font-bold text-[#122342]/70 uppercase tracking-wider font-general">
                Verified Google Reviews
              </div>
              <p className="text-xs text-[#122342]/70 mt-2 font-medium font-general">
                Genuine organic testimonials praising gentle techniques and clean facilities.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Open Until 10:00 PM */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[32px] bg-[#FFFDF7] p-7 text-[#122342] shadow-[0_15px_35px_rgba(18,35,66,0.1)] border-2 border-white/90 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#6FA7D8] font-general">
                DAILY HOURS
              </span>
              <div className="w-8 h-8 rounded-full bg-[#F4E94A]/40 flex items-center justify-center text-[#122342]">
                <Clock className="w-4 h-4" />
              </div>
            </div>

            <div>
              {/* Glowing accent reveal */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-4xl sm:text-5xl font-black font-satoshi tracking-tight text-[#122342] mb-1 flex items-center gap-2"
              >
                <span>10 PM</span>
                <span className="w-3 h-3 rounded-full bg-[#F4E94A] animate-pulse" />
              </motion.div>
              <div className="text-xs font-bold text-[#122342]/70 uppercase tracking-wider font-general">
                Open Daily Until 10:00 PM
              </div>
              <p className="text-xs text-[#122342]/70 mt-2 font-medium font-general">
                Extended night hours accommodating after-work consultations and urgent walk-ins.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Sector 44, Noida Location */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[32px] bg-[#6FA7D8] p-7 text-white shadow-[0_15px_35px_rgba(18,35,66,0.12)] border-2 border-white/80 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F4E94A] font-general">
                NOIDA CLINIC
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                <MapPin className="w-4 h-4" />
              </div>
            </div>

            <div>
              {/* Slide in pin location */}
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl sm:text-5xl font-black font-satoshi tracking-tight text-white mb-1"
              >
                Sec 44
              </motion.div>
              <div className="text-xs font-bold text-[#F4E94A] uppercase tracking-wider font-general">
                Block D, Village Chhalera & Sadarpur
              </div>
              <p className="text-xs text-white/80 mt-2 font-medium font-general">
                Postal Code 201303, Uttar Pradesh. Effortless road access and dedicated arrival area.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
