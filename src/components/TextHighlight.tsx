import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface TextHighlightProps {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  className?: string;
  delay?: number;
  id?: string;
}

export const TextHighlight: React.FC<TextHighlightProps> = ({
  children,
  color = '#E8F75B',
  textColor = '#111318',
  className = '',
  delay = 0.2,
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span id={id} className={`relative inline-block px-1.5 py-0.5 mx-0.5 rounded-md ${className}`}>
      {/* Animated Highlighter Background Pill */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-md -z-0 origin-left"
        style={{ backgroundColor: color }}
        initial={shouldReduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.85 }}
        whileInView={shouldReduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 0.65,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <span className="relative z-10 font-black" style={{ color: textColor }}>
        {children}
      </span>
    </span>
  );
};

interface AnimatedUnderlineProps {
  children: React.ReactNode;
  color?: string;
  height?: number;
  className?: string;
  delay?: number;
  styleVariant?: 'straight' | 'curly' | 'brush';
  id?: string;
}

export const AnimatedUnderline: React.FC<AnimatedUnderlineProps> = ({
  children,
  color = '#E8F75B',
  height = 4,
  className = '',
  delay = 0.25,
  styleVariant = 'straight',
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span id={id} className={`relative inline-block ${className}`}>
      {children}
      {styleVariant === 'curly' ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
          className="absolute -bottom-1.5 left-0 w-full h-3 overflow-visible pointer-events-none"
        >
          <motion.path
            d="M0,7 Q25,0 50,7 T100,7"
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </svg>
      ) : styleVariant === 'brush' ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 200 16"
          preserveAspectRatio="none"
          className="absolute -bottom-2 left-0 w-full h-3.5 overflow-visible pointer-events-none"
        >
          <motion.path
            d="M2,10 C50,3 150,4 198,9 C150,14 50,13 2,10 Z"
            fill={color}
            initial={shouldReduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            whileInView={shouldReduceMotion ? { scaleX: 1, opacity: 0.9 } : { scaleX: 1, opacity: 0.9 }}
            viewport={{ once: false, amount: 0.3 }}
            style={{ originX: 0 }}
            transition={{
              duration: 0.7,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </svg>
      ) : (
        <motion.span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 w-full rounded-full pointer-events-none origin-left"
          style={{
            backgroundColor: color,
            height: `${height}px`,
          }}
          initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.65,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      )}
    </span>
  );
};
