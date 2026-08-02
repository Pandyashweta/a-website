import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoBackgroundProps {
  bgMode?: 'black' | 'white';
  isHomePage?: boolean;
  isScrolledDown?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  bgMode = 'white',
  isHomePage = false,
  isScrolledDown = false,
}) => {
  // Video plays ONLY in Black mode AND ONLY on Home Page hero section (when NOT scrolled down)
  const isVideoActive = bgMode === 'black' && isHomePage && !isScrolledDown;
  const isWhite = bgMode === 'white';

  return (
    <div
      className={`fixed inset-0 z-0 overflow-hidden pointer-events-none select-none transition-colors duration-500 ${
        isWhite ? 'bg-white' : 'bg-[#0A0A0B]'
      }`}
    >
      <AnimatePresence>
        {isVideoActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            {/* BACKGROUND VIDEO */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter brightness-90 contrast-105"
            >
              <source src="/video1.mp4" type="video/mp4" />
            </video>

            {/* AMBIENT OVERLAY & VIGNETTE */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/70 via-[#0A0A0B]/50 to-[#0A0A0B]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_40%,rgba(10,10,11,0.85)_100%)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
