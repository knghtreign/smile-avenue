import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for fluid progress bar response
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 h-[3.5px] bg-black/10 pointer-events-none"
      id="scroll-progress-container"
      aria-hidden="true"
    >
      <motion.div
        id="scroll-progress-bar"
        className="h-full bg-[#E8F75B] origin-left shadow-[0_0_10px_rgba(232,247,91,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
};
