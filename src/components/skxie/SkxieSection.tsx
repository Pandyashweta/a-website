import React from 'react';
import { motion } from 'motion/react';

export const SkxieSection: React.FC = () => {
  return (
    <section
      id="section-skxie"
      className="w-full h-screen flex flex-col items-center justify-center relative px-6 sm:px-12 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="text-center space-y-3 max-w-sm"
      >
        <h1 className="text-[10px] uppercase tracking-[0.45em] font-semibold text-zinc-500">
          skxie
        </h1>
        <p className="text-sm font-light text-zinc-400 font-serif-italic italic leading-relaxed">
          storyteller & digital novelist designing tales of mystery, modern romance, and vulnerability.
        </p>
      </motion.div>
    </section>
  );
};
