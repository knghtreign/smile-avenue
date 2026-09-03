import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLINIC_INFO } from '../data/clinicData';
import { X, Calendar, Phone, CheckCircle, ArrowRight, User, Clock, MessageSquare, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { MagneticLink } from './MagneticLink';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          id="booking-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#122342]/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl bg-[#FFFDF7] rounded-[32px] shadow-2xl border-2 border-white p-6 sm:p-10 z-10 my-8"
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6">
              <MagneticButton
                onClick={onClose}
                id="booking-modal-close-btn"
                role="button"
                ariaLabel="Close booking modal dialog"
                className="w-10 h-10 rounded-full bg-[#122342]/5 hover:bg-[#122342]/10 text-[#122342] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </MagneticButton>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Success Message */
                <motion.div
                  key="modal-success"
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F4E94A] text-[#122342] flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-10 h-10 stroke-[2.5]" aria-hidden="true" />
                  </div>

                  <h3 className="text-2xl font-black text-[#122342] font-satoshi">
                    Appointment Requested!
                  </h3>

                  <p className="text-sm font-medium text-[#122342]/80 max-w-sm font-general">
                    Thank you, <strong className="text-[#122342]">{formData.name}</strong>. Smile Avenue Dental Clinic team will call <span className="underline">{formData.phone}</span> shortly to confirm your booking.
                  </p>

                  <div className="bg-[#DCE8B8]/50 rounded-2xl p-4 text-xs font-bold text-[#122342] w-full text-left font-general border border-white">
                    <div><strong>Date:</strong> {formData.date || 'Flexible'} ({formData.time || 'General'})</div>
                    <div><strong>Treatment:</strong> {formData.treatment}</div>
                    <div><strong>Helpline:</strong> {CLINIC_INFO.phoneDisplay}</div>
                  </div>

                  <MagneticButton
                    onClick={() => {
                      setIsSubmitted(false);
                      onClose();
                    }}
                    role="button"
                    ariaLabel="Close confirmation window"
                    className="w-full py-3.5 rounded-full bg-[#122342] text-[#F4E94A] font-black text-xs uppercase tracking-wider hover:bg-black transition-colors font-general cursor-pointer"
                  >
                    CLOSE WINDOW
                  </MagneticButton>
                </motion.div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Appointment Request Form">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#6FA7D8] block mb-1 font-general">
                      DIRECT CONSULTATION · SECTOR 44
                    </span>
                    <h3 id="booking-modal-title" className="text-2xl sm:text-3xl font-black text-[#122342] tracking-tight font-satoshi">
                      Schedule a Visit
                    </h3>
                  </div>

                  {/* Name Input */}
                  <div className="font-general">
                    <label htmlFor="modal-name-input" className="block text-xs font-black uppercase tracking-wider text-[#122342] mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#122342]/60" aria-hidden="true" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      id="modal-name-input"
                      type="text"
                      required
                      aria-required="true"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onFocus={() => setActiveField('modal-name')}
                      onBlur={() => setActiveField(null)}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl bg-white border-2 text-sm font-bold text-[#122342] outline-none transition-all ${
                        activeField === 'modal-name' 
                          ? 'border-[#122342] shadow-[0_0_0_3px_rgba(244,233,74,0.6)]' 
                          : 'border-[#122342]/15'
                      }`}
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="font-general">
                    <label htmlFor="modal-phone-input" className="block text-xs font-black uppercase tracking-wider text-[#122342] mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#122342]/60" aria-hidden="true" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      id="modal-phone-input"
                      type="tel"
                      required
                      aria-required="true"
                      placeholder="e.g. 093685 41439"
                      value={formData.phone}
                      onFocus={() => setActiveField('modal-phone')}
                      onBlur={() => setActiveField(null)}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl bg-white border-2 text-sm font-bold text-[#122342] outline-none transition-all ${
                        activeField === 'modal-phone' 
                          ? 'border-[#122342] shadow-[0_0_0_3px_rgba(244,233,74,0.6)]' 
                          : 'border-[#122342]/15'
                      }`}
                    />
                  </div>

                  {/* Date & Time Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-general">
                    <div>
                      <label htmlFor="modal-date-input" className="block text-xs font-black uppercase tracking-wider text-[#122342] mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#122342]/60" aria-hidden="true" />
                        <span>Date</span>
                      </label>
                      <input
                        id="modal-date-input"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-white border-2 border-[#122342]/15 text-xs font-bold text-[#122342] outline-none focus:border-[#122342]"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-time-input" className="block text-xs font-black uppercase tracking-wider text-[#122342] mb-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#122342]/60" aria-hidden="true" />
                        <span>Time Slot</span>
                      </label>
                      <select
                        id="modal-time-input"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-white border-2 border-[#122342]/15 text-xs font-bold text-[#122342] outline-none focus:border-[#122342]"
                      >
                        <option value="">Any time</option>
                        <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                        <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                        <option value="Evening (5:00 PM - 10:00 PM)">Evening (5:00 PM - 10:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Service */}
                  <div className="font-general">
                    <label htmlFor="modal-service-select" className="block text-xs font-black uppercase tracking-wider text-[#122342] mb-1 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#122342]/60" aria-hidden="true" />
                      <span>Service Required</span>
                    </label>
                    <select
                      id="modal-service-select"
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-white border-2 border-[#122342]/15 text-xs font-bold text-[#122342] outline-none focus:border-[#122342]"
                    >
                      {treatments.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Action */}
                  <div className="pt-3 font-general">
                    <MagneticButton
                      type="submit"
                      id="modal-submit-btn"
                      role="button"
                      ariaLabel="Submit consultation request"
                      className="w-full bg-[#F4E94A] hover:bg-[#ebd931] text-[#122342] py-4 rounded-full font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <span>CONFIRM CONSULTATION REQUEST</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </MagneticButton>
                  </div>

                  <div className="pt-1 text-center font-general">
                    <span className="text-[11px] text-[#122342]/60 font-semibold">Or call directly: </span>
                    <MagneticLink 
                      href={`tel:${CLINIC_INFO.phone}`} 
                      role="link"
                      ariaLabel={`Call ${CLINIC_INFO.name} directly at ${CLINIC_INFO.phoneDisplay}`}
                      className="text-[11px] font-bold underline text-[#122342]"
                    >
                      {CLINIC_INFO.phoneDisplay}
                    </MagneticLink>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
