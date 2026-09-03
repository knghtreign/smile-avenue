import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface Particle {
  id: number;
  top: string;
  left: string;
  size: number;
  driftY: number;
  driftX: number;
  duration: number;
  delay: number;
  color: 'white' | 'blue' | 'yellow';
  opacityRange: [number, number, number];
}

const PARTICLES: Particle[] = [
  { id: 1, top: '6%', left: '10%', size: 3.5, driftY: -35, driftX: 6, duration: 11.5, delay: 0, color: 'white', opacityRange: [0.2, 0.7, 0.2] },
  { id: 2, top: '12%', left: '88%', size: 3, driftY: -40, driftX: -8, duration: 13.2, delay: 1.2, color: 'yellow', opacityRange: [0.2, 0.8, 0.2] },
  { id: 3, top: '20%', left: '24%', size: 4, driftY: -28, driftX: 9, duration: 14.0, delay: 2.4, color: 'blue', opacityRange: [0.2, 0.65, 0.2] },
  { id: 4, top: '30%', left: '76%', size: 2.5, driftY: -42, driftX: -5, duration: 12.8, delay: 0.8, color: 'white', opacityRange: [0.15, 0.6, 0.15] },
  { id: 5, top: '38%', left: '15%', size: 4.5, driftY: -36, driftX: 7, duration: 15.0, delay: 3.1, color: 'yellow', opacityRange: [0.25, 0.85, 0.25] },
  { id: 6, top: '48%', left: '92%', size: 3, driftY: -38, driftX: -6, duration: 11.8, delay: 1.6, color: 'blue', opacityRange: [0.2, 0.7, 0.2] },
  { id: 7, top: '58%', left: '30%', size: 3.5, driftY: -30, driftX: 8, duration: 14.5, delay: 2.0, color: 'white', opacityRange: [0.18, 0.65, 0.18] },
  { id: 8, top: '68%', left: '82%', size: 4, driftY: -40, driftX: -10, duration: 13.5, delay: 0.5, color: 'yellow', opacityRange: [0.2, 0.8, 0.2] },
  { id: 9, top: '78%', left: '18%', size: 3, driftY: -34, driftX: 5, duration: 12.2, delay: 2.8, color: 'blue', opacityRange: [0.2, 0.6, 0.2] },
  { id: 10, top: '88%', left: '65%', size: 4, driftY: -42, driftX: -7, duration: 14.0, delay: 1.0, color: 'white', opacityRange: [0.2, 0.75, 0.2] },
  { id: 11, top: '94%', left: '22%', size: 2.5, driftY: -28, driftX: 6, duration: 15.5, delay: 3.5, color: 'yellow', opacityRange: [0.2, 0.7, 0.2] },
  { id: 12, top: '50%', left: '50%', size: 3.5, driftY: -32, driftX: -8, duration: 13.0, delay: 1.8, color: 'white', opacityRange: [0.15, 0.6, 0.15] },
];

export const GlobalParticleSystem: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return null;
  }

  const getColorClasses = (color: 'white' | 'blue' | 'yellow') => {
    switch (color) {
      case 'yellow':
        return 'bg-[#F4E94A] shadow-[0_0_6px_rgba(244,233,74,0.6)]';
      case 'blue':
        return 'bg-[#6FA7D8] shadow-[0_0_6px_rgba(110,167,216,0.6)]';
      case 'white':
      default:
        return 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]';
    }
  };

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
    >
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${getColorClasses(p.color)}`}
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: [0, p.driftY, 0],
            x: [0, p.driftX, 0],
            opacity: p.opacityRange,
            translateX: mouseOffset.x * (p.id % 2 === 0 ? 1 : -1),
            translateY: mouseOffset.y * (p.id % 3 === 0 ? 1 : -1),
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay },
            x: { duration: p.duration * 1.1, repeat: Infinity, ease: 'easeInOut', delay: p.delay },
            opacity: { duration: p.duration * 0.9, repeat: Infinity, ease: 'easeInOut', delay: p.delay },
            translateX: { duration: 0.8, ease: 'easeOut' },
            translateY: { duration: 0.8, ease: 'easeOut' },
          }}
        />
      ))}
    </div>
  );
};

