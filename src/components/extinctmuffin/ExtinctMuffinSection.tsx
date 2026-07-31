import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ExtinctMuffinLogo } from './ExtinctMuffinLogo';

interface ExtinctMuffinSectionProps {
  onScrollToSection: (section: 'skxie' | 'extinctmuffin') => void;
}

export const ExtinctMuffinSection: React.FC<ExtinctMuffinSectionProps> = ({
  onScrollToSection,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ width: number; height: number } | null>(null);

  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const logoStateRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, angle: 0, vAngle: 0 });

  // Track container dimensions for responsive layout positioning
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      setRect({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Main animation / physics simulation loop
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const mouse = mouseRef.current;
      const { width, height } = rect || { width: window.innerWidth, height: window.innerHeight };

      // Process Middle Logo Physics
      const logoEl = logoRef.current;
      if (logoEl) {
        const logoState = logoStateRef.current;

        // Middle logo center is screen center + relative offset
        const logoCenterX = width / 2;
        const logoCenterY = height / 2;
        const currentX = logoCenterX + logoState.x;
        const currentY = logoCenterY + logoState.y;

        const dx = currentX - mouse.x;
        const dy = currentY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const logoRepelRadius = 260;
        if (mouse.active && dist < logoRepelRadius && dist > 0) {
          const force = (logoRepelRadius - dist) / logoRepelRadius;
          // The logo is heavier so it moves less (flee factor 3.2)
          const pushPower = force * 3.2;

          logoState.vx += (dx / dist) * pushPower;
          logoState.vy += (dy / dist) * pushPower;

          // Add subtle dynamic tilt rotation
          logoState.vAngle += (dx / dist) * force * 0.04;
        }

        // Spring force pulling it back to center (0, 0)
        const logoSpringStrength = 0.045;
        logoState.vx += (0 - logoState.x) * logoSpringStrength;
        logoState.vy += (0 - logoState.y) * logoSpringStrength;

        // Friction dampening
        const logoFriction = 0.88;
        logoState.vx *= logoFriction;
        logoState.vy *= logoFriction;
        logoState.vAngle *= logoFriction;

        logoState.x += logoState.vx;
        logoState.y += logoState.vy;
        logoState.angle += logoState.vAngle;

        logoEl.style.transform = `translate3d(${logoState.x}px, ${logoState.y}px, 0) rotate(${logoState.angle}deg)`;
      }

      animId = requestAnimationFrame(tick);
    };

    if (rect) {
      animId = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(animId);
  }, [rect]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rectBounds = container.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rectBounds.left;
    mouseRef.current.y = e.clientY - rectBounds.top;
    mouseRef.current.active = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  };

  return (
    <section
      ref={containerRef}
      id="section-extinctmuffin"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-screen flex flex-col items-center justify-center relative px-6 sm:px-12 overflow-hidden bg-transparent"
    >
      {/* Interactive Center Logo */}
      <div
        ref={logoRef}
        className="relative z-10 flex flex-col items-center justify-center will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.04, rotate: 1.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="cursor-pointer transition-transform"
            onClick={() => onScrollToSection('extinctmuffin')}
          >
            <ExtinctMuffinLogo
              size="lg"
              className="transform hover:drop-shadow-[0_12px_36px_rgba(255,102,196,0.6)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
