import React, { useEffect, useRef, useState } from 'react';

const AMBIENT_VIDEOS = [
  {
    id: 'nebula-flow',
    name: 'Cosmic Fluid',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-fast-flowing-smoke-or-dust-41584-large.mp4',
  },
];

interface BackgroundVideoProps {
  isScrolled?: boolean;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ isScrolled = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 50;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let time = 0;

    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      const bgGradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        10,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );

      bgGradient.addColorStop(0, '#0d0d12');
      bgGradient.addColorStop(0.6, '#08080a');
      bgGradient.addColorStop(1, '#030304');

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Render floating particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.4})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Dynamic theme background transition layer */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-to-br from-[#1a0c1e] via-[#0d0914] to-[#1a110a] ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Colorful energetic background glow orbs for extinctmuffin */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
          isScrolled ? 'opacity-80 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <div className="absolute top-[10%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-pink-500/15 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[15%] w-[40vw] h-[40vw] rounded-full bg-purple-600/15 blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[40%] right-[30%] w-[25vw] h-[25vw] rounded-full bg-amber-400/10 blur-[100px]" />
      </div>

      {/* Canvas particle loop layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Video background layer */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        src={AMBIENT_VIDEOS[0].url}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? (isScrolled ? 'opacity-30 mix-blend-screen' : 'opacity-40 mix-blend-screen') : 'opacity-0'
        }`}
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#0A0A0B]/30 to-[#0A0A0B]/80 pointer-events-none" />
    </div>
  );
};
