import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { Calendar, Phone, CheckCircle, ArrowRight, Clock, User, MessageSquare, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';
import { MagneticButton } from './MagneticButton';
import { MagneticLink } from './MagneticLink';

export const AppointmentSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    treatment: 'General Dental Checkup & Consultation',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitted(true);
  };

  const treatments = [
    'General Dental Checkup & Consultation',
    'Gentle Scaling & Ultrasonic Polishing',
    'Root Canal Treatment (Single-Sitting)',
    'Crowns & Ceramic Dental Restorations',
    'Smile Aesthetics & Teeth Whitening',
    'Same-Day Emergency Tooth Pain Relief',
  ];

  return (
    <section 
      id="booking-section"
      aria-label="Direct Clinical Appointment Scheduling"
      className="w-full py-20 sm:py-28 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Direct Call & Context */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <ScrollReveal yOffset={16} once={false}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#122342]/10 text-[11px] font-black uppercase tracking-[0.2em] text-[#122342] mb-3 font-general shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-[#6FA7D8]" aria-hidden="true" />
                <span>DIRECT APPOINTMENT RESERVATION</span>
              </div>
            </ScrollReveal>

            <div className="mb-6">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.05] text-[#122342] font-satoshi">
                <WordReveal 
                  text="Reserve your" 
                  as="span" 
                  className="mr-2"
                  once={false}
                />
                <AnimatedUnderline styleVariant="brush" color="#F4E94A" delay={0.3}>
                  <span className="text-[#122342]">consultation slot.</span>
                </AnimatedUnderline>
              </h2>
            </div>

            <ScrollReveal yOffset={20} delay={0.15} once={false}>
              <p className="text-base sm:text-lg text-[#122342]/85 font-medium leading-relaxed mb-8 font-general">
                Select your convenient date and time. Our team in <TextHighlight color="#F4E94A" textColor="#122342">Sector 44, Noida</TextHighlight> will confirm your appointment promptly. Open daily until 10:00 PM.
              </p>
            </ScrollReveal>

            {/* Direct Telephone Contact Card with MagneticLink */}
            <ScrollReveal yOffset={20} delay={0.22} once={false}>
              <div className="bg-[#FFFDF7] rounded-[32px] p-6 sm:p-8 border-2 border-white/90 shadow-[0_15px_35px_rgba(18,35,66,0.08)]">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#122342]/60 font-general block mb-2">
                  PREFER TO CALL DIRECTLY?
                </span>
                <MagneticLink
                  href={`tel:${CLINIC_INFO.phone}`}
                  role="link"
                  ariaLabel={`Call Smile Avenue Dental Clinic at ${CLINIC_INFO.phoneDisplay}`}
                  className="text-2xl sm:text-3xl font-black text-[#122342] hover:text-[#6FA7D8] transition-colors flex items-center gap-3 mb-2 font-satoshi"
                >
                  <Phone className="w-6 h-6 text-[#122342]" aria-hidden="true" />
                  <span>{CLINIC_INFO.phoneDisplay}</span>
                </MagneticLink>
                <p className="text-xs font-bold text-[#122342]/70 font-general">
                  Available daily until 10:00 PM
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: FORM WITH MICRO-INTERACTIONS */}
          <div className="lg:col-span-7">
            <ScrollReveal yOffset={28} delay={0.15} once={false}>
              <div className="bg-[#FFFDF7] rounded-[38px] p-8 sm:p-12 border-2 border-white/90 shadow-[0_20px_50px_rgba(18,35,66,0.12)] relative overflow-hidden">
                
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="py-12 flex flex-col items-center text-center space-y-5"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-[#F4E94A] text-[#122342] flex items-center justify-center shadow-lg"
                      >
                        <CheckCircle className="w-12 h-12 stroke-[2.5]" aria-hidden="true" />
                      </motion.div>

                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-[#122342] tracking-tight font-satoshi">
                          Consultation Request Received!
                        </h3>
                        <p className="text-base text-[#122342]/80 font-medium max-w-md mt-2 font-general">
                          Thank you, <strong className="text-[#122342]">{formData.name}</strong>. Our front desk at Smile Avenue Dental Clinic ({CLINIC_INFO.phoneDisplay}) will call you shortly to confirm your visit.
                        </p>
                      </div>

                      <div className="bg-[#DCE8B8]/50 rounded-2xl p-4 text-xs font-bold text-[#122342] w-full max-w-sm text-left border border-white font-general">
                        <div className="font-black uppercase mb-1">Appointment Summary:</div>
                        <div>Date: {formData.date || 'Flexible'} ({formData.time || 'General'})</div>
                        <div>Service: {formData.treatment}</div>
                        <div>Contact: {formData.phone}</div>
                      </div>

                      <MagneticButton
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', phone: '', date: '', time: '', treatment: 'General Dental Checkup & Consultation', notes: '' });
                        }}
                        id="form-reset-btn"
                        role="button"
                        ariaLabel="Submit another appointment request"
                        className="mt-4 px-6 py-2.5 rounded-full bg-[#122342] text-[#F4E94A] text-xs font-black uppercase tracking-wider hover:bg-black transition-colors font-general cursor-pointer"
                      >
                        SUBMIT ANOTHER REQUEST
                      </MagneticButton>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 select-none" id="main-appointment-form" aria-label="Appointment Request Form">
                      <div className="mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#6FA7D8] font-general block">
                          EASY RESERVATION
                        </span>
                        <h3 className="text-2xl font-black text-[#122342] font-satoshi">
                          Book Your Appointment
                        </h3>
                      </div>

                      {/* Name & Phone Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-general">
                        {/* Name Input */}
                        <div className="relative">
                          <label htmlFor="form-full-name" className="block text-xs font-black uppercase tracking-wider text-[#122342] mb-1.5 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#122342]/60" aria-hidden="true" />
                            <span>Your Full Name *</span>
                          </label>
                          <input
                            id="form-full-name"
                            type="text"
                            required
                            aria-required="true"
                            placeholder="e.g. Ananya Roy"
                            value={formData.name}
                            onFocus={() => setActiveField('name')}
                            onBlur={() => setActiveField(null)}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full px-4 py-3.5 rounded-2xl bg-white border-2 text-sm font-bold text-[#122342] transition-all outline-none ${
                              activeField === 'name' 
                                ? 'border-[#122342] shadow-[0_0_0_3px_rgba(244,233,74,0.6)]' 
                                : 'border-[#122342]/15 hover:border-[#122342]/30'
                            }`}
                          />
                        </div>

                        {/* Phone Input */}
                        <div className="relative">
                          <label htmlFor="form-phone-number" className="block text-xs font-black uppercase tracking-wider text-[#122342] mb-1.5 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#122342]/60" aria-hidden="true" />
                            <span>Phone Number *</span>
                          </label>
                          <input
                            id="form-phone-number"
                            type="tel"
                            required
                            aria-required="true"
                            placeholder="e.g. 093685 41439"
                            value={formData.phone}
                            onFocus={() => setActiveField('phone')}
                            onBlur={() => setActiveField(null)}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`w-full px-4 py-3.5 rounded-2xl bg-white border-2 text-sm font-bold text-[#122342] transition-all outline-none ${
                              activeField === 'phone' 
                                ? 'border-[#122342] shadow-[0_0_0_3px_rgba(244,233,74,0.6)]' 
                                : 'border-[#122342]/15 hover:border-[#122342]/30'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Date & Time Slot Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-general">
                        <div>
                          <label htmlFor="form-preferred-date" className="block text-xs font-black uppercase tracking-wider text-[#122342] mb-1.5 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#122342]/60" aria-hidden="true" />
                            <span>Preferred Date</span>
                          </label>
                          <input
                            id="form-preferred-date"
                            type="date"
                            value={formData.date}
                            onFocus={() => setActiveField('date')}
                            onBlur={() => setActiveField(null)}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className={`w-full px-4 py-3.5 rounded-2xl bg-white border-2 text-sm font-bold text-[#122342] transition-all outline-none ${
                              activeField === 'date' 
                                ? 'border-[#122342] shadow-[0_0_0_3px_rgba(244,233,74,0.6)]' 
                                : 'border-[#122342]/15 hover:border-[#122342]/30'
                            }`}
                          />
                        </div>

                        <div>
                          <label htmlFor="form-preferred-time" className="block text-xs font-black uppercase tracking-wider text-[#122342] mb-1.5 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#122342]/60" aria-hidden="true" />
                            <span>Preferred Time Slot</span>
                          </label>
                          <select
                            id="form-preferred-time"
                            value={formData.time}
                            onFocus={() => setActiveField('time')}
                            onBlur={() => setActiveField(null)}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className={`w-full px-4 py-3.5 rounded-2xl bg-white border-2 text-sm font-bold text-[#122342] transition-all outline-none ${
                              activeField === 'time' 
                                ? 'border-[#122342] shadow-[0_0_0_3px_rgba(244,233,74,0.6)]' 
                                : 'border-[#122342]/15 hover:border-[#122342]/30'
                            }`}
                          >
                            <option value="">Select time slot</option>
                            <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                            <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                            <option value="Evening (5:00 PM - 10:00 PM)">Evening (5:00 PM - 10:00 PM)</option>
                          </select>
                        </div>
                      </div>

                      {/* Treatment Type */}
                      <div className="font-general">
                        <label htmlFor="form-treatment-type" className="block text-xs font-black uppercase tracking-wider text-[#122342] mb-1.5 flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-[#122342]/60" aria-hidden="true" />
                          <span>Dental Service Needed</span>
                        </label>
                        <select
                          id="form-treatment-type"
                          value={formData.treatment}
                          onFocus={() => setActiveField('treatment')}
                          onBlur={() => setActiveField(null)}
                          onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                          className={`w-full px-4 py-3.5 rounded-2xl bg-white border-2 text-sm font-bold text-[#122342] transition-all outline-none ${
                            activeField === 'treatment' 
                              ? 'border-[#122342] shadow-[0_0_0_3px_rgba(244,233,74,0.6)]' 
                              : 'border-[#122342]/15 hover:border-[#122342]/30'
                          }`}
                        >
                          {treatments.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>

                      {/* Submit Button with Magnetic Motion */}
                      <div className="pt-2 font-general">
                        <MagneticButton
                          type="submit"
                          id="form-submit-appointment-btn"
                          role="button"
                          ariaLabel="Submit appointment request form"
                          className="w-full group bg-[#F4E94A] hover:bg-[#ebd931] text-[#122342] py-4.5 rounded-full font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <span>CONFIRM APPOINTMENT REQUEST</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                        </MagneticButton>
                      </div>

                    </form>
                  )}
                </AnimatePresence>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
