import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  scaleOffset?: number;
  staggerChildren?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
  id?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  yOffset = 24,
  scaleOffset = 0.98,
  staggerChildren,
  once = false,
  amount = 0.15,
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion 
    ? { opacity: 0 }
    : { opacity: 0, y: yOffset, scale: scaleOffset };

  const animate = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1 };

  return (
    <motion.div
      id={id}
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      transition={{
        duration: shouldReduceMotion ? 0.25 : duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: staggerChildren,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

