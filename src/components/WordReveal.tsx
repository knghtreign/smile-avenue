import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface WordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
  id?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  once = false,
  amount = 0.15,
  id,
  as: Component = 'h2',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (customDelay = 0) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: customDelay,
      },
    }),
  };

  const child = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 22, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: shouldReduceMotion ? 0.25 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Component id={id} className={`inline-flex flex-wrap ${className}`}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        custom={delay}
      >
        {words.map((word, index) => (
          <span key={index} className="overflow-hidden inline-block mr-[0.25em] last:mr-0">
            <motion.span
              variants={child}
              className={`inline-block ${wordClassName}`}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
};
