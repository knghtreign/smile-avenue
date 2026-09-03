import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface StandardButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  id?: string;
  ariaLabel?: string;
  maxDistance?: number;
  type?: 'button' | 'submit' | 'reset';
  role?: string;
  disabled?: boolean;
}

export const MagneticButton: React.FC<StandardButtonProps> = ({
  children,
  onClick,
  className = '',
  id,
  ariaLabel,
  type = 'button',
  role = 'button',
  disabled = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      id={id}
      type={type}
      role={role}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative cursor-pointer select-none transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </motion.button>
  );
};

