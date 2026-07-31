import React from 'react';
import { motion } from 'motion/react';
import { ExtinctMuffinLogo } from './ExtinctMuffinLogo';

interface BlankCanvasProps {
  isScrolled: boolean;
  onScrollToSection: (section: 'skxie' | 'extinctmuffin') => void;
}

export const BlankCanvas: React.FC<BlankCanvasProps> = ({
  isScrolled,
  onScrollToSection,
}) => {
  return (
    <main className="w-full min-h-screen bg-transparent relative z-10 select-none">
      {/* SECTION 1: skxie frame (Clean dark aesthetic without box frame) */}
      <section
        id="section-skxie"
        className="w-full h-screen flex flex-col items-center justify-center relative px-6 sm:px-12 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center space-y-4 max-w-2xl px-4"
        >
          {/* Subtle minimal branding hint or clean empty space */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-7xl sm:text-9xl font-serif-italic font-light tracking-widest text-white select-none pointer-events-none"
          >
            skxie
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: extinctmuffin frame (Colorful theme with playful stickers & badges) */}
      <section
        id="section-extinctmuffin"
        className="w-full h-screen flex flex-col items-center justify-center relative px-6 sm:px-12 overflow-hidden"
      >
        {/* Floating Playful Stickers & Badge Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Sticker 1: Giant Muffin */}
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [-4, 6, -4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-[22%] left-[12%] sm:left-[18%] bg-pink-500/20 backdrop-blur-md border border-pink-300/40 p-4 rounded-3xl shadow-xl flex items-center gap-3 transform -rotate-6"
          >
            <span className="text-4xl sm:text-5xl">🧁</span>
            <div className="text-left">
              <span className="block text-xs font-bold uppercase tracking-wider text-pink-200">Fresh Baked</span>
              <span className="text-sm font-semibold text-white">Muffin Vibe</span>
            </div>
          </motion.div>

          {/* Sticker 2: Magic Star Badge */}
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [8, -6, 8],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="absolute top-[28%] right-[10%] sm:right-[18%] bg-purple-500/20 backdrop-blur-md border border-purple-300/40 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 transform rotate-12"
          >
            <span className="text-3xl">⭐</span>
            <span className="text-xs sm:text-sm font-bold text-purple-100 tracking-wide">✨ Pure Magic</span>
          </motion.div>

          {/* Sticker 3: Cute Heart Sprinkle */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [-12, 12, -12],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute bottom-[28%] left-[15%] sm:left-[22%] bg-amber-400/20 backdrop-blur-md border border-amber-300/40 px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2"
          >
            <span className="text-2xl">💖</span>
            <span className="text-xs font-bold text-amber-100">Sweet & Cozy</span>
          </motion.div>

          {/* Sticker 4: Rainbow Badge */}
          <motion.div
            animate={{
              y: [0, 16, 0],
              rotate: [5, -8, 5],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
            className="absolute bottom-[24%] right-[12%] sm:right-[20%] bg-indigo-500/20 backdrop-blur-md border border-indigo-300/40 p-3.5 rounded-3xl shadow-xl flex items-center gap-3"
          >
            <span className="text-3xl">🌈</span>
            <span className="text-xs font-bold text-indigo-100">Dreamland</span>
          </motion.div>

          {/* Floating Sparkle Dots */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[18%] right-[35%] text-2xl text-yellow-300"
          >
            ✦
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-[35%] left-[38%] text-3xl text-pink-300"
          >
            ✧
          </motion.div>
        </div>

        {/* Center Muffin Branding Sticker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center relative z-10 flex flex-col items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="cursor-pointer transition-transform"
            onClick={() => onScrollToSection('extinctmuffin')}
          >
            <ExtinctMuffinLogo size="lg" className="transform hover:drop-shadow-[0_12px_32px_rgba(255,102,196,0.5)]" />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};
