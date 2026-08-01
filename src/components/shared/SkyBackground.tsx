"use client";

import React, { useEffect, useRef } from 'react';

interface SkyBackgroundProps {
  isNight?: boolean;
}

interface AmbientParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

export const SkyBackground: React.FC<SkyBackgroundProps> = ({ isNight = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const activeTop = { r: 10, g: 10, b: 12 };
    const activeBottom = { r: 8, g: 8, b: 10 };

    const maxAmbientParticles = 25;
    const ambientParticles: AmbientParticle[] = Array.from({ length: maxAmbientParticles }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.random() * 0.4 + 0.2, // slow drift right
      vy: Math.random() * 0.2 - 0.1, // subtle vertical wave
      size: Math.random() * 1.5 + 0.8,
      opacity: Math.random() * 0.12 + 0.06,
      life: Math.random(),
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Sky Background Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, `rgb(${activeTop.r}, ${activeTop.g}, ${activeTop.b})`);
      skyGrad.addColorStop(1, `rgb(${activeBottom.r}, ${activeBottom.g}, ${activeBottom.b})`);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Ambient Cosmic Dust
      ambientParticles.forEach((bp) => {
        bp.x += bp.vx;
        bp.y += bp.vy;

        if (bp.x > width + 10) bp.x = -10;
        if (bp.y < -10) bp.y = height + 10;
        if (bp.y > height + 10) bp.y = -10;

        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${bp.opacity})`;
        ctx.fill();
      });

      // Vignette effect to frame the website beautifully
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.4,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(10, 10, 12, 0.25)'); // static dark vignette opacity
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );
};
