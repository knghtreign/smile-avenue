import React, { useRef, useState } from 'react';
import { motion, useSpring, useReducedMotion } from 'motion/react';

interface TactileStepCardProps {
  children: React.ReactNode;
  isActive?: boolean;
  isPast?: boolean;
  onClick?: () => void;
  className?: string;
  id?: string;
  ariaLabel?: string;
  role?: string;
  badgeText?: string;
  number?: string;
  title?: string;
  subtitle?: string;
  magneticIntensity?: number;
  tiltIntensity?: number;
}

export const TactileStepCard: React.FC<TactileStepCardProps> = ({
  children,
  isActive = false,
  isPast = false,
  onClick,
  className = '',
  id,
  ariaLabel,
  role = 'tab',
  badgeText,
  number,
  title,
  subtitle,
  magneticIntensity = 12,
  tiltIntensity = 14,
}) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Springs for 3D tilt
  const springConfig = { damping: 20, stiffness: 260, mass: 0.1 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const magnetX = useSpring(0, springConfig);
  const magnetY = useSpring(0, springConfig);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalized [-1, 1] relative to center
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    // Magnetic pull
    magnetX.set(x * magneticIntensity);
    magnetY.set(y * magneticIntensity);

    // 3D Tilt: mouse moving right tilts Y positive; mouse moving down tilts X negative
    rotateY.set(x * tiltIntensity);
    rotateX.set(-y * tiltIntensity);

    // Specular Glare position in percentage
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    magnetX.set(0);
    magnetY.set(0);
  };

  return (
    <motion.button
      ref={cardRef}
      id={id}
      role={role}
      aria-selected={isActive}
      aria-label={ariaLabel || `${number || ''} ${title || ''}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 800,
        x: magnetX,
        y: magnetY,
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      className={`relative group text-left rounded-3xl p-5 sm:p-6 transition-colors duration-300 cursor-pointer outline-none focus-visible:ring-3 focus-visible:ring-[#E8F75B] overflow-hidden ${
        isActive
          ? 'bg-[#111318] text-white border-2 border-[#E8F75B] shadow-[0_16px_36px_rgba(17,19,24,0.35)]'
          : 'bg-white/80 hover:bg-white text-[#111318] border-2 border-white/90 shadow-md'
      } ${className}`}
    >
      {/* 3D Dynamic Specular Glare Layer */}
      {!shouldReduceMotion && isHovered && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-3xl opacity-40 transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(232, 247, 91, 0.45) 0%, rgba(255, 255, 255, 0.15) 35%, transparent 70%)`,
          }}
        />
      )}

      {/* 3D Elevated Content Layer (translateZ gives physical depth) */}
      <div style={{ transform: 'translateZ(24px)' }} className="relative z-10">
        {children ? (
          children
        ) : (
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span
                className={`text-xl sm:text-2xl font-black block transition-colors ${
                  isActive
                    ? 'text-[#E8F75B]'
                    : isPast
                    ? 'text-[#111318]'
                    : 'text-[#111318]/50'
                }`}
              >
                {number}
              </span>

              {badgeText && (
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#E8F75B] text-[#111318]'
                      : 'bg-black/5 text-[#111318]/70'
                  }`}
                >
                  {badgeText}
                </span>
              )}
            </div>

            {title && (
              <h4 className="text-sm sm:text-base font-black uppercase tracking-wider block truncate">
                {title}
              </h4>
            )}

            {subtitle && (
              <p
                className={`text-xs mt-1 font-semibold leading-snug line-clamp-2 ${
                  isActive ? 'text-white/80' : 'text-[#111318]/70'
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Active Glowing Corner Indicator */}
      {isActive && (
        <motion.span
          layoutId="tactile-active-indicator"
          className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#E8F75B] shadow-[0_0_8px_rgba(232,247,91,1)]"
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
};
