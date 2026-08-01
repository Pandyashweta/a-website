import React from 'react';
import { motion } from 'motion/react';

interface AboutPageProps {
  isVisible: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-5xl mx-auto min-h-screen pt-28 pb-32 px-6 flex flex-col justify-start relative z-10 select-none"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-500">
            About the Author
          </span>
          <h1 className="text-4xl font-light font-serif-italic italic text-white">
            Bio
          </h1>
        </div>

        <div className="text-zinc-400 text-sm leading-relaxed space-y-4 font-light text-justify">
          <p>
            skxie is a digital storyteller and novelist designing immersive tales of mystery, 
            modern romance, and emotional vulnerability. Exploring the hidden corners of human 
            connection, skxie builds worlds where secrets unravel and choices define destinies.
          </p>
          <p>
            With a passion for engaging narrative arcs and multi-dimensional character dynamics, 
            skxie's stories are written to keep readers engrossed from the very first page.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
