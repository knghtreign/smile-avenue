import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const GlobalAmbientMotion: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 0.5% slow-drift transform to ambient background elements */}
      <motion.div
        className="w-[102%] h-[102%] -left-[1%] -top-[1%] absolute"
        animate={{
          x: ['-0.5%', '0.5%', '-0.5%'],
          y: ['-0.5%', '0.5%', '-0.5%'],
          rotate: [-0.15, 0.15, -0.15],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Subtle atmospheric ambient glow patches */}
        <div className="absolute top-[15%] left-[8%] w-[500px] h-[500px] rounded-full bg-white/[0.035] blur-[120px]" />
        <div className="absolute top-[45%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#E8F75B]/[0.025] blur-[140px]" />
        <div className="absolute top-[75%] left-[18%] w-[550px] h-[550px] rounded-full bg-[#6EA8DA]/[0.03] blur-[130px]" />
      </motion.div>
    </div>
  );
};
