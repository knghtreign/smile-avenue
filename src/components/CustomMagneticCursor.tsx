import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const CustomMagneticCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isPointerAvailable, setIsPointerAvailable] = useState(false);

  const springConfig = { damping: 24, stiffness: 260, mass: 0.12 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const dotSpringConfig = { damping: 30, stiffness: 450, mass: 0.05 };
  const dotX = useSpring(-100, dotSpringConfig);
  const dotY = useSpring(-100, dotSpringConfig);

  useEffect(() => {
    // Only enable on desktop devices with a precision pointer
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updatePointerAvailability = () => {
      setIsPointerAvailable(mediaQuery.matches);
    };
    updatePointerAvailability();
    mediaQuery.addEventListener('change', updatePointerAvailability);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      // Check if target is interactive
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('button, a, input, select, textarea, [role="button"], [role="tab"], [data-magnetic="true"], label');
      if (interactiveEl) {
        setIsHovering(true);
        const customLabel = interactiveEl.getAttribute('data-cursor-label');
        setHoverLabel(customLabel || null);
      } else {
        setIsHovering(false);
        setHoverLabel(null);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', updatePointerAvailability);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, cursorX, cursorY, dotX, dotY]);

  if (!isPointerAvailable) return null;

  return (
    <>
      {/* Outer Magnetic Ring Follower */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.75 : isHovering ? 1.6 : 1,
            borderColor: isHovering ? '#E8F75B' : '#ffffff',
            backgroundColor: isHovering ? 'rgba(232, 247, 91, 0.15)' : 'transparent',
          }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="w-8 h-8 rounded-full border border-white/60 transition-colors"
        >
          {hoverLabel && (
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-wider bg-[#111318] text-[#E8F75B] px-1.5 py-0.5 rounded shadow whitespace-nowrap">
              {hoverLabel}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Center Precision Point */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 1.4 : isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="w-1.5 h-1.5 rounded-full bg-[#E8F75B] shadow-[0_0_6px_rgba(232,247,91,0.9)]"
        />
      </motion.div>
    </>
  );
};
