import React from 'react';
import { motion } from 'motion/react';

export const SkxieSection: React.FC = () => {
  return (
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
  );
};
