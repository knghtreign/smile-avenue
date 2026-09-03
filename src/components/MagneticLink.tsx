import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface StandardLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  id?: string;
  ariaLabel?: string;
  maxDistance?: number;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  role?: string;
}

export const MagneticLink: React.FC<StandardLinkProps> = ({
  children,
  href,
  className = '',
  id,
  ariaLabel,
  target,
  rel,
  onClick,
  role = 'link',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (href.startsWith('#')) {
      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          e.preventDefault();
          const navOffset = 72;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    }
  };

  return (
    <motion.a
      id={id}
      href={href}
      target={target}
      rel={rel}
      role={role}
      aria-label={ariaLabel}
      onClick={handleClick}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative inline-flex items-center cursor-pointer select-none transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </motion.a>
  );
};

