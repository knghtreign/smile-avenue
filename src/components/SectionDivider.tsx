import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type DividerVariant = 'wave' | 'curve' | 'organic' | 'layered' | 'crest';

interface SectionDividerProps {
  fromColor?: string; // Background of top section
  toColor: string;    // Background of bottom section to blend into
  variant?: DividerVariant;
  flipX?: boolean;
  flipY?: boolean;
  accentColor?: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  fromColor = 'transparent',
  toColor,
  variant = 'wave',
  flipX = false,
  flipY = false,
  accentColor = '#E8F75B',
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Scale and transform calculation
  const transform = `${flipX ? 'scaleX(-1) ' : ''}${flipY ? 'scaleY(-1)' : ''}`.trim() || undefined;

  // Render specific animated path variants
  const renderContent = () => {
    switch (variant) {
      case 'curve':
        return (
          <svg
            viewBox="0 0 1440 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10 sm:h-16 lg:h-20 block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Base Fill Curve */}
            <motion.path
              d="M0,0 C480,90 960,90 1440,0 L1440,90 L0,90 Z"
              fill={toColor}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      d: [
                        'M0,0 C480,90 960,90 1440,0 L1440,90 L0,90 Z',
                        'M0,15 C440,75 1000,95 1440,10 L1440,90 L0,90 Z',
                        'M0,0 C480,90 960,90 1440,0 L1440,90 L0,90 Z',
                      ],
                    }
              }
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Subtle luminous accent curve */}
            <motion.path
              d="M0,0 C480,90 960,90 1440,0"
              stroke={accentColor}
              strokeWidth="2"
              strokeOpacity="0.4"
              fill="none"
              strokeDasharray="6 8"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      strokeDashoffset: [0, -56],
                    }
              }
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </svg>
        );

      case 'organic':
        return (
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12 sm:h-18 lg:h-24 block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Soft backdrop layer */}
            <path
              d="M0,40 C360,90 720,10 1080,70 C1240,95 1360,80 1440,65 L1440,100 L0,100 Z"
              fill={toColor}
              fillOpacity="0.35"
            />
            {/* Primary animated organic wave */}
            <motion.path
              d="M0,20 C320,95 620,10 940,80 C1180,110 1340,30 1440,45 L1440,100 L0,100 Z"
              fill={toColor}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      d: [
                        'M0,20 C320,95 620,10 940,80 C1180,110 1340,30 1440,45 L1440,100 L0,100 Z',
                        'M0,35 C380,20 680,95 1000,30 C1220,70 1360,55 1440,25 L1440,100 L0,100 Z',
                        'M0,20 C320,95 620,10 940,80 C1180,110 1340,30 1440,45 L1440,100 L0,100 Z',
                      ],
                    }
              }
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Accent tracing line */}
            <motion.path
              d="M0,20 C320,95 620,10 940,80 C1180,110 1340,30 1440,45"
              stroke={accentColor}
              strokeWidth="2.5"
              strokeOpacity="0.45"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        );

      case 'layered':
        return (
          <svg
            viewBox="0 0 1440 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12 sm:h-16 lg:h-20 block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,60 C400,10 800,90 1440,30 L1440,96 L0,96 Z"
              fill={toColor}
              fillOpacity="0.4"
            />
            <motion.path
              d="M0,30 C480,90 960,10 1440,65 L1440,96 L0,96 Z"
              fill={toColor}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      d: [
                        'M0,30 C480,90 960,10 1440,65 L1440,96 L0,96 Z',
                        'M0,45 C520,30 920,80 1440,40 L1440,96 L0,96 Z',
                        'M0,30 C480,90 960,10 1440,65 L1440,96 L0,96 Z',
                      ],
                    }
              }
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </svg>
        );

      case 'crest':
        return (
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10 sm:h-14 lg:h-16 block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M0,0 C380,80 1060,80 1440,0 L1440,80 L0,80 Z"
              fill={toColor}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      d: [
                        'M0,0 C380,80 1060,80 1440,0 L1440,80 L0,80 Z',
                        'M0,10 C420,65 1020,90 1440,5 L1440,80 L0,80 Z',
                        'M0,0 C380,80 1060,80 1440,0 L1440,80 L0,80 Z',
                      ],
                    }
              }
              transition={{
                duration: 9.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </svg>
        );

      case 'wave':
      default:
        return (
          <svg
            viewBox="0 0 1440 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10 sm:h-16 lg:h-20 block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Primary soft harmonic wave */}
            <motion.path
              d="M0,32 C240,75 480,10 720,45 C960,80 1200,15 1440,50 L1440,90 L0,90 Z"
              fill={toColor}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      d: [
                        'M0,32 C240,75 480,10 720,45 C960,80 1200,15 1440,50 L1440,90 L0,90 Z',
                        'M0,45 C260,15 500,75 720,35 C940,0 1180,65 1440,30 L1440,90 L0,90 Z',
                        'M0,32 C240,75 480,10 720,45 C960,80 1200,15 1440,50 L1440,90 L0,90 Z',
                      ],
                    }
              }
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Luminous crest line */}
            <motion.path
              d="M0,32 C240,75 480,10 720,45 C960,80 1200,15 1440,50"
              stroke={accentColor}
              strokeWidth="2"
              strokeOpacity="0.4"
              fill="none"
              strokeDasharray="4 6"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      strokeDashoffset: [0, 48],
                    }
              }
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`w-full overflow-hidden leading-none relative z-10 pointer-events-none select-none ${className}`}
      style={{
        backgroundColor: fromColor,
        transform,
      }}
    >
      {renderContent()}
    </div>
  );
};
