import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxItem {
  image: string;
  caption: string;
}

interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onSelectIndex,
}) => {
  const isOpen = currentIndex !== null && items.length > 0;
  const currentItem = isOpen && currentIndex !== null ? items[currentIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && currentIndex !== null) {
        onSelectIndex((currentIndex + 1) % items.length);
      } else if (e.key === 'ArrowLeft' && currentIndex !== null) {
        onSelectIndex((currentIndex - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onSelectIndex]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 select-none"
          onClick={onClose}
          id="lightbox-backdrop"
        >
          {/* Top Bar with Number indicator and Close Button */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-20 pointer-events-none">
            {/* 20 — Animated Numbers: 01 / 04 */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs font-black tracking-widest uppercase">
              <span className="text-[#E8F75B]">
                {String((currentIndex ?? 0) + 1).padStart(2, '0')}
              </span>
              <span className="text-white/40">/</span>
              <span className="text-white/70">
                {String(items.length).padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={onClose}
              className="pointer-events-auto w-11 h-11 rounded-full bg-white/15 hover:bg-[#E8F75B] text-white hover:text-[#111318] flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer"
              id="lightbox-close-btn"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left Arrow */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentIndex !== null) {
                  onSelectIndex((currentIndex - 1 + items.length) % items.length);
                }
              }}
              className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#111318] backdrop-blur-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Center Image Container: scale 0.94 -> 1, duration 400-500ms */}
          <div 
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.image}
                initial={{ opacity: 0, scale: 0.94, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <img
                  src={currentItem.image}
                  alt={currentItem.caption}
                  referrerPolicy="no-referrer"
                  className="max-h-[72vh] w-auto max-w-full rounded-[24px] object-contain shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/15"
                />
                
                {/* Caption */}
                <div className="mt-4 text-center">
                  <p className="text-white font-extrabold text-sm sm:text-base tracking-wide">
                    {currentItem.caption}
                  </p>
                  <p className="text-xs text-[#E8F75B] font-bold uppercase tracking-widest mt-0.5">
                    A&M Dental Station · Sector 70 Noida
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentIndex !== null) {
                  onSelectIndex((currentIndex + 1) % items.length);
                }
              }}
              className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#111318] backdrop-blur-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
