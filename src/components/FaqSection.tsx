import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, HelpCircle, Phone, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { ScrollReveal } from './ScrollReveal';
import { WordReveal } from './WordReveal';
import { AnimatedUnderline, TextHighlight } from './TextHighlight';
import { MagneticButton } from './MagneticButton';
import { MagneticLink } from './MagneticLink';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Treatments' | 'Safety & Hygiene' | 'Timing & Location' | 'Appointments';
  badge: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'pain-free-care',
    question: 'How does Smile Avenue Dental Clinic ensure treatments are gentle and pain-free?',
    answer:
      'We prioritize patient comfort using gentle localized numbing protocols, rotary endodontic equipment, and modern diagnostic imaging. Our dental team explains each step before starting so you always remain calm and informed throughout your visit.',
    category: 'Treatments',
    badge: 'Gentle Dentistry',
  },
  {
    id: 'sterilization-safety',
    question: 'What sterilization protocols are practiced at the clinic?',
    answer:
      'Patient safety is paramount. We follow multi-stage medical autoclave sterilization protocols. All instruments are sealed in sterile pouches opened only in your presence. Contact surfaces, barrier films, and suction tips are 100% medical-grade single-use disposables.',
    category: 'Safety & Hygiene',
    badge: 'Medical Autoclave',
  },
  {
    id: 'late-hours',
    question: 'Are you really open until 10:00 PM daily in Sector 44, Noida?',
    answer:
      'Yes, Smile Avenue Dental Clinic operates extended clinical hours daily until 10:00 PM. This allows working professionals and families in Sector 44, Noida and surrounding areas to receive full dental consultations and treatments after office hours without taking leave.',
    category: 'Timing & Location',
    badge: 'Open Until 10:00 PM',
  },
  {
    id: 'same-day-emergency',
    question: 'Can I walk in or book same-day care for acute toothaches or broken teeth?',
    answer:
      'Yes. We accommodate same-day urgent visits for acute toothaches, cracked teeth, lost fillings, or gum discomfort. Call our direct line at 093685 41439 or book online for quick confirmation.',
    category: 'Appointments',
    badge: 'Same-Day Care',
  },
  {
    id: 'cleaning-scaling',
    question: 'Does ultrasonic teeth scaling damage or thin tooth enamel?',
    answer:
      'No. Ultrasonic cleaning uses high-frequency harmonic micro-vibrations accompanied by a cooling water spray to lift hardened plaque and surface stains. It is enamel-safe and preserves your healthy tooth structure.',
    category: 'Treatments',
    badge: 'Enamel-Safe Scaling',
  },
  {
    id: 'location-parking',
    question: 'Where is Smile Avenue Dental Clinic located in Sector 44, Noida?',
    answer:
      'We are located at Village Chhalera & Sadarpur, Block D, Sector 44, Noida, Uttar Pradesh 201303. The clinic features accessible ground floor access and hassle-free arrival from main Sector 44 roadways.',
    category: 'Timing & Location',
    badge: 'Sector 44 Noida',
  },
  {
    id: 'first-consultation',
    question: 'What should I expect during my first dental checkup?',
    answer:
      'Your consultation begins with an unhurried, comfortable clinical examination. The doctor reviews your oral health, explains any findings clearly with transparent cost breakdowns, and answers your questions with zero treatment pressure.',
    category: 'Appointments',
    badge: 'Unhurried Checkup',
  },
];

interface FaqSectionProps {
  onOpenBooking?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  const [openId, setOpenId] = useState<string | null>('pain-free-care');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const baseId = useId();

  const categories = ['All', 'Treatments', 'Safety & Hygiene', 'Timing & Location', 'Appointments'];

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="w-full py-20 sm:py-28 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <ScrollReveal yOffset={16} once={false}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#122342]/10 text-xs font-black uppercase tracking-[0.2em] text-[#122342] mb-3 font-general shadow-xs">
              <HelpCircle className="w-3.5 h-3.5 text-[#6FA7D8]" aria-hidden="true" />
              <span>TRANSPARENT PATIENT ANSWERS</span>
            </div>
          </ScrollReveal>

          <div className="mb-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] text-[#122342] font-satoshi">
              <WordReveal 
                text="Frequently asked" 
                as="span" 
                className="mr-2"
                once={false}
              />
              <AnimatedUnderline styleVariant="brush" color="#F4E94A" delay={0.3}>
                <span className="text-[#122342]">questions.</span>
              </AnimatedUnderline>
            </h2>
          </div>

          <ScrollReveal yOffset={20} delay={0.14} once={false}>
            <p className="text-sm sm:text-base text-[#122342]/80 leading-relaxed font-medium font-general">
              Clear clinical answers about gentle treatments, sterilization standards, night appointments until <TextHighlight color="#F4E94A" textColor="#122342">10:00 PM</TextHighlight>, and your visit to Sector 44, Noida.
            </p>
          </ScrollReveal>
        </div>

        {/* Filter Controls & Search */}
        <ScrollReveal yOffset={20} delay={0.18} once={false}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white/80 backdrop-blur-md rounded-full border border-white shadow-xs overflow-x-auto no-scrollbar font-general">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isSelected}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#122342] text-[#F4E94A] shadow-sm'
                        : 'text-[#122342]/70 hover:text-[#122342] hover:bg-white/60'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Quick Search Field */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-[#122342]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g. pain, night)..."
                aria-label="Search frequently asked dental topics"
                className="w-full pl-9 pr-4 py-2.5 bg-white/90 focus:bg-white text-xs font-semibold rounded-full border border-white focus:outline-none focus:ring-2 focus:ring-[#122342] text-[#122342] placeholder-[#122342]/40 transition-all shadow-xs font-general"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#122342]/50 hover:text-[#122342]"
                >
                  ✕
                </button>
              )}
            </div>

          </div>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="space-y-3.5" role="region" aria-label="Questions list">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white/85 backdrop-blur-md rounded-3xl p-10 text-center border border-white shadow-md">
              <p className="text-sm font-bold text-[#122342]/70 mb-2 font-general">No matching questions found for "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="text-xs font-black uppercase tracking-wider text-[#122342] underline hover:text-[#6FA7D8] cursor-pointer font-general"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              const headerId = `${baseId}-faq-header-${faq.id}`;
              const contentId = `${baseId}-faq-content-${faq.id}`;

              return (
                <ScrollReveal key={faq.id} yOffset={16} delay={0.04 * index} once={false}>
                  <div
                    className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-[#122342] text-white border-[#122342] shadow-xl'
                        : 'bg-[#FFFDF7] text-[#122342] border-white/90 hover:bg-white shadow-[0_4px_20px_rgba(18,35,66,0.04)]'
                    }`}
                  >
                    {/* Header Button */}
                    <button
                      id={headerId}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 text-left cursor-pointer select-none transition-colors"
                    >
                      <div className="flex items-center gap-3.5 pr-2">
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full transition-colors font-general ${
                            isOpen
                              ? 'bg-[#F4E94A] text-[#122342]'
                              : 'bg-[#6FA7D8]/15 text-[#122342]'
                          }`}
                        >
                          {faq.badge}
                        </span>
                        <h3
                          className={`text-base sm:text-lg font-black tracking-tight leading-snug transition-colors font-satoshi ${
                            isOpen ? 'text-white' : 'text-[#122342]'
                          }`}
                        >
                          {faq.question}
                        </h3>
                      </div>

                      {/* Smooth Rotating Plus/Cross Icon Button */}
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 280,
                          damping: 20,
                        }}
                        className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors ${
                          isOpen
                            ? 'bg-[#F4E94A] text-[#122342] shadow-md'
                            : 'bg-[#122342]/5 text-[#122342] hover:bg-[#122342]/10'
                        }`}
                      >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" aria-hidden="true" />
                      </motion.div>
                    </button>

                    {/* Expandable Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={contentId}
                          role="region"
                          aria-labelledby={headerId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.32,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-1 text-sm sm:text-base text-white/80 leading-relaxed font-normal border-t border-white/10 space-y-3 font-general">
                            <p>{faq.answer}</p>
                            
                            <div className="pt-2 flex items-center gap-2 text-xs text-[#F4E94A] font-bold">
                              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                              <span>Clinical hygiene verified · Smile Avenue Dental Clinic</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </ScrollReveal>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA Banner */}
        <ScrollReveal yOffset={24} delay={0.2} once={false}>
          <div className="mt-12 bg-[#FFFDF7] rounded-[36px] p-6 sm:p-8 border-2 border-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#122342] text-[#F4E94A] flex items-center justify-center font-black shrink-0 shadow-md">
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black text-[#122342] font-satoshi">
                  Have a specific tooth or treatment question?
                </h4>
                <p className="text-xs sm:text-sm text-[#122342]/70 font-semibold font-general">
                  Direct clinic consultation helpline available daily until 10:00 PM.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <MagneticLink
                href={`tel:${CLINIC_INFO.phone}`}
                ariaLabel={`Call clinical helpline at ${CLINIC_INFO.phoneDisplay}`}
                className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-[#122342]/5 hover:bg-[#122342]/10 text-[#122342] text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all border border-[#122342]/10 font-general"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Call Helpline</span>
              </MagneticLink>

              {onOpenBooking && (
                <MagneticButton
                  onClick={onOpenBooking}
                  ariaLabel="Book a consultation visit"
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-[#F4E94A] text-[#122342] text-xs font-black tracking-wider uppercase hover:bg-[#ebd931] text-center shadow-md flex items-center justify-center gap-1.5 font-general cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Book Visit</span>
                </MagneticButton>
              )}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
