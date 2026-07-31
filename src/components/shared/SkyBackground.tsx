import React, { useEffect, useRef } from 'react';

interface SkyBackgroundProps {
  isNight: boolean;
  isScrolled: boolean;
}

interface Star {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  twinklePhase: number;
  baseOpacity: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  speed: number;
  life: number;
}

interface Cloud {
  x: number;
  y: number;
  width: number;
  speed: number;
  opacity: number;
  depth: number; // 0.5 to 1.5 for parallax scaling
}

interface WindStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  amplitude: number;
  frequency: number;
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

export const SkyBackground: React.FC<SkyBackgroundProps> = ({
  isNight,
  isScrolled,
}) => {
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

    // --- State and Constants ---
    let time = 0;
    
    // Active colors (will be lerped toward targets)
    const activeTop = { r: 10, g: 10, b: 12 };
    const activeBottom = { r: 8, g: 8, b: 10 };

    let activeNightFactor = isNight ? 1 : 0;
    let activeScrollFactor = isScrolled ? 1 : 0;

    // Helper functions
    const lerp = (start: number, end: number, amt: number) => {
      return start + (end - start) * amt;
    };

    // --- Star Fields (Night Only, Muffin Section Only) ---
    const starCount = 80;
    const stars: Star[] = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.75), // Concentrate stars in the top 75%
      size: Math.random() * 1.5 + 0.5,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      baseOpacity: Math.random() * 0.6 + 0.3,
    }));

    // --- Shooting Stars (Night Only) ---
    let shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      if (activeNightFactor < 0.5 || activeScrollFactor < 0.5) return;
      const angle = Math.PI / 6 + Math.random() * (Math.PI / 12); // ~30-45 degrees down-left
      const speed = Math.random() * 10 + 12;
      shootingStars.push({
        x: Math.random() * (width * 0.6) + width * 0.3,
        y: Math.random() * (height * 0.3),
        vx: -Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 80 + 60,
        speed,
        life: 1.0,
      });
    };

    // --- Procedural Clouds ---
    const cloudCount = 6;
    const clouds: Cloud[] = Array.from({ length: cloudCount }).map((_, idx) => {
      const depth = 0.5 + (idx / (cloudCount - 1)) * 1.0; // depth from 0.5 (far) to 1.5 (close)
      const cloudWidth = (Math.random() * 45 + 65) * depth; // Base size radius

      return {
        x: Math.random() * (width + cloudWidth * 4) - cloudWidth * 2,
        y: (0.15 + (idx / cloudCount) * 0.45) * height, // stagger vertically in upper sky
        width: cloudWidth,
        speed: (0.12 + Math.random() * 0.2) / depth, // far clouds move slower
        opacity: (0.4 + Math.random() * 0.3) * (depth > 1 ? 0.8 : 1.1),
        depth,
      };
    });

    // --- Wind Streaks ---
    const windStreakCount = 3;
    const windStreaks: WindStreak[] = Array.from({ length: windStreakCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 150 + 100,
      speed: Math.random() * 1.8 + 1.2,
      opacity: Math.random() * 0.07 + 0.02,
      amplitude: Math.random() * 6 + 3,
      frequency: 0.005 + Math.random() * 0.005,
    }));

    // --- Ambient Cosmic Dust / Particles (Visible in both sections) ---
    const maxAmbientParticles = 25;
    const ambientParticles: AmbientParticle[] = Array.from({ length: maxAmbientParticles }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() * 0.4 + 0.2), // slow drift right
      vy: (Math.random() * 0.2 - 0.1), // subtle vertical wave
      size: Math.random() * 1.5 + 0.8,
      opacity: Math.random() * 0.12 + 0.06,
      life: Math.random(), // randomized lifecycle start
    }));

    // --- Animation Rendering Loop ---
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Lerp night factor and scroll factor
      const targetNightFactor = isNight ? 1 : 0;
      activeNightFactor = lerp(activeNightFactor, targetNightFactor, 0.03);

      const targetScrollFactor = isScrolled ? 1 : 0;
      activeScrollFactor = lerp(activeScrollFactor, targetScrollFactor, 0.035);

      // Calculate Target Sky Colors
      // Skxie: (10, 10, 12) -> minimal dark space
      // Muffin Day Top: (214, 162, 232) lilac, Bottom: (251, 199, 212) bubblegum
      // Muffin Night Top: (23, 6, 36) nebula purple, Bottom: (10, 4, 20) deep indigo
      const skyTop = isNight 
        ? { r: 23, g: 6, b: 36 } 
        : { r: 214, g: 162, b: 232 };

      const skyBottom = isNight
        ? { r: 10, g: 4, b: 20 }
        : { r: 251, g: 199, b: 212 };

      // Lerp between minimal dark and sky colors based on scroll factor
      const targetTop = {
        r: lerp(10, skyTop.r, activeScrollFactor),
        g: lerp(10, skyTop.g, activeScrollFactor),
        b: lerp(12, skyTop.b, activeScrollFactor),
      };

      const targetBottom = {
        r: lerp(8, skyBottom.r, activeScrollFactor),
        g: lerp(8, skyBottom.g, activeScrollFactor),
        b: lerp(10, skyBottom.b, activeScrollFactor),
      };

      activeTop.r = lerp(activeTop.r, targetTop.r, 0.03);
      activeTop.g = lerp(activeTop.g, targetTop.g, 0.03);
      activeTop.b = lerp(activeTop.b, targetTop.b, 0.03);

      activeBottom.r = lerp(activeBottom.r, targetBottom.r, 0.03);
      activeBottom.g = lerp(activeBottom.g, targetBottom.g, 0.03);
      activeBottom.b = lerp(activeBottom.b, targetBottom.b, 0.03);

      // Draw Sky Background Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, `rgb(${Math.round(activeTop.r)}, ${Math.round(activeTop.g)}, ${Math.round(activeTop.b)})`);
      skyGrad.addColorStop(1, `rgb(${Math.round(activeBottom.r)}, ${Math.round(activeBottom.g)}, ${Math.round(activeBottom.b)})`);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Render Ambient Cosmic Dust (Visible everywhere, fades slightly in Day)
      ambientParticles.forEach((bp) => {
        bp.x += bp.vx;
        bp.y += bp.vy;

        // Wrap around boundaries
        if (bp.x > width + 10) bp.x = -10;
        if (bp.y < -10) bp.y = height + 10;
        if (bp.y > height + 10) bp.y = -10;

        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.size, 0, Math.PI * 2);
        
        // Fades slightly in Day sky to keep contrast
        const currentOpacity = bp.opacity * (1 - activeNightFactor * 0.3 * (1 - activeScrollFactor));
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      });

      // 2. Render Twinkling Stars (Night Sky & Muffin Section Only)
      if (activeNightFactor > 0.01 && activeScrollFactor > 0.01) {
        stars.forEach((star) => {
          if (star.x > width) star.x = Math.random() * width;
          if (star.y > height) star.y = Math.random() * (height * 0.75);

          const alpha = star.baseOpacity * 
            (0.35 + 0.65 * Math.sin(time * 12 * star.twinkleSpeed + star.twinklePhase)) * 
            activeNightFactor * 
            activeScrollFactor;
          
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        });

        // Chance to spawn a shooting star
        if (Math.random() < 0.003 && shootingStars.length < 2) {
          spawnShootingStar();
        }

        // Draw and update shooting stars
        shootingStars.forEach((ss, index) => {
          ss.x += ss.vx;
          ss.y += ss.vy;
          ss.life -= 0.015;

          if (ss.life <= 0 || ss.x < -100 || ss.y > height + 100) {
            shootingStars.splice(index, 1);
            return;
          }

          const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.vx * 3, ss.y - ss.vy * 3);
          grad.addColorStop(0, `rgba(255, 255, 255, ${ss.life * activeNightFactor * activeScrollFactor})`);
          grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

          ctx.beginPath();
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(ss.x - ss.vx * 1.5, ss.y - ss.vy * 1.5);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.stroke();
        });
      }

      // 3. Render Sun & Moon (Muffin Section Only)
      if (activeScrollFactor > 0.01) {
        const celestialYOffset = activeNightFactor * 200; // Sinks 200px at night
        const baseOpacity = activeScrollFactor;

        // Sun (Day only)
        if (activeNightFactor < 0.99) {
          const sunX = width * 0.75;
          const sunY = height * 0.22 + celestialYOffset;
          const sunOpacity = (1 - activeNightFactor) * baseOpacity;

          // Sun Glow Halo
          const sunGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 130);
          sunGlow.addColorStop(0, `rgba(255, 248, 230, ${sunOpacity * 0.45})`);
          sunGlow.addColorStop(0.3, `rgba(255, 236, 179, ${sunOpacity * 0.18})`);
          sunGlow.addColorStop(1, `rgba(255, 236, 179, 0)`);
          
          ctx.beginPath();
          ctx.arc(sunX, sunY, 130, 0, Math.PI * 2);
          ctx.fillStyle = sunGlow;
          ctx.fill();

          // Sun Core
          ctx.beginPath();
          ctx.arc(sunX, sunY, 32, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${sunOpacity * 0.9})`;
          ctx.shadowColor = 'rgba(255, 250, 220, 0.4)';
          ctx.shadowBlur = 20;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }

        // Moon (Night only)
        if (activeNightFactor > 0.01) {
          const moonX = width * 0.25;
          const moonY = height * 0.22 + (1 - activeNightFactor) * 200;
          const moonOpacity = activeNightFactor * baseOpacity;

          // Draw Crescent Moon
          ctx.shadowColor = `rgba(220, 235, 255, ${moonOpacity * 0.35})`;
          ctx.shadowBlur = 25;
          ctx.fillStyle = `rgba(235, 243, 255, ${moonOpacity * 0.9})`;
          
          ctx.beginPath();
          const moonRadius = 26;
          ctx.arc(moonX, moonY, moonRadius, -Math.PI / 2, Math.PI / 2, false);
          ctx.quadraticCurveTo(moonX + moonRadius * 0.35, moonY, moonX, moonY - moonRadius);
          ctx.fill();
          
          ctx.shadowBlur = 0; // reset
        }
      }

      // 4. Render Wind Streaks (Muffin Section Only)
      if (activeScrollFactor > 0.01) {
        ctx.lineWidth = 1.0;
        windStreaks.forEach((streak) => {
          streak.x += streak.speed;
          if (streak.x > width + streak.length) {
            streak.x = -streak.length;
            streak.y = Math.random() * height;
          }

          ctx.beginPath();
          for (let i = 0; i < streak.length; i += 5) {
            const currX = streak.x - streak.length + i;
            const currY = streak.y + Math.sin(currX * streak.frequency) * streak.amplitude;
            if (i === 0) {
              ctx.moveTo(currX, currY);
            } else {
              ctx.lineTo(currX, currY);
            }
          }
          ctx.strokeStyle = `rgba(255, 255, 255, ${streak.opacity * (1 - activeNightFactor * 0.4) * activeScrollFactor})`;
          ctx.stroke();
        });
      }

      // 5. Render Stylized Reference-Matched Clouds (Muffin Section Only)
      if (activeScrollFactor > 0.01) {
        clouds.forEach((cloud) => {
          cloud.x += cloud.speed;
          
          if (cloud.x > width + cloud.width * 2) {
            cloud.x = -cloud.width * 2;
            cloud.y = (0.15 + Math.random() * 0.35) * height;
          }

          const r = cloud.width;
          const cloudX = cloud.x;
          const cloudY = cloud.y;
          const opacity = cloud.opacity * activeScrollFactor;

          // Configure shadow blur and color for exact glowing cloud look
          if (activeNightFactor < 0.99) {
            // Day: soft blue glow
            ctx.shadowColor = `rgba(138, 203, 247, ${0.45 * activeScrollFactor})`;
            ctx.shadowBlur = 18;
          } else {
            // Night: dark purple glow
            ctx.shadowColor = `rgba(12, 6, 28, ${0.6 * activeScrollFactor})`;
            ctx.shadowBlur = 12;
          }

          // Create unified cloud linear gradient from top-white to bottom-blue
          const cloudGrad = ctx.createLinearGradient(cloudX, cloudY - r * 0.9, cloudX, cloudY + r * 0.8);
          if (activeNightFactor < 0.99) {
            // Day: Top is pure white, bottom is baby blue (matching reference image)
            cloudGrad.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.95})`);
            cloudGrad.addColorStop(0.3, `rgba(242, 248, 255, ${opacity * 0.95})`);
            cloudGrad.addColorStop(1, `rgba(138, 203, 247, ${opacity * 0.95})`);
          } else {
            // Night: Moonlit silver top to dark indigo bottom
            cloudGrad.addColorStop(0, `rgba(225, 235, 255, ${opacity * 0.85})`);
            cloudGrad.addColorStop(0.35, `rgba(85, 75, 115, ${opacity * 0.6})`);
            cloudGrad.addColorStop(1, `rgba(28, 20, 52, ${opacity * 0.9})`);
          }

          ctx.fillStyle = cloudGrad;

          // Draw the compound fluffy shape of 4 circles:
          ctx.beginPath();
          
          // Center-top large circle
          ctx.arc(cloudX, cloudY - r * 0.1, r * 0.85, 0, Math.PI * 2);
          
          // Left medium circle
          ctx.arc(cloudX - r * 0.75, cloudY + r * 0.1, r * 0.6, 0, Math.PI * 2);
          
          // Right small-medium circle
          ctx.arc(cloudX + r * 0.7, cloudY + r * 0.15, r * 0.55, 0, Math.PI * 2);
          
          // Bottom circle (bulge/flat connection)
          ctx.arc(cloudX + r * 0.15, cloudY + r * 0.45, r * 0.45, 0, Math.PI * 2);
          
          ctx.fill();
          
          // Reset shadow for next drawings
          ctx.shadowBlur = 0;

          // Draw soft top highlights (Day: crisp white, Night: soft silver)
          const hlOpacity = lerp(0.2, 0.08, activeNightFactor) * activeScrollFactor;
          const hlR = Math.round(lerp(255, 235, activeNightFactor));
          const hlG = Math.round(lerp(255, 240, activeNightFactor));
          const hlB = Math.round(lerp(255, 255, activeNightFactor));

          ctx.fillStyle = `rgba(${hlR}, ${hlG}, ${hlB}, ${hlOpacity})`;
          
          // Subtle inner bubble offsets for dimensional look
          ctx.beginPath();
          ctx.arc(cloudX, cloudY - r * 0.22, r * 0.72, 0, Math.PI * 2);
          ctx.arc(cloudX - r * 0.72, cloudY + r * 0.02, r * 0.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Vignette effect to frame the website beautifully
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.4,
        width / 2, height / 2, Math.max(width, height) * 0.8
      );
      // Faint dark borders
      const vigOpacity = lerp(0.25, 0.55, activeNightFactor) * lerp(0.4, 1.0, activeScrollFactor);
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, `rgba(10, 10, 12, ${vigOpacity})`);
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isNight, isScrolled]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};
