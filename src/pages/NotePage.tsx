import React from 'react';
import { motion } from 'motion/react';

interface NotePageProps {
  isVisible: boolean;
  isWhite?: boolean;
  onBackToAbout?: () => void;
}

export const NotePage: React.FC<NotePageProps> = ({ isVisible, isWhite = false, onBackToAbout }) => {
  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const textColor = isWhite ? 'text-zinc-700' : 'text-zinc-300';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto min-h-screen pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 text-center"
    >
      <div className="w-full space-y-5 sm:space-y-6">
        {/* BACK TO ABOUT LINK (IF ACCESSED VIA ABOUT) */}
        {onBackToAbout && (
          <div className="flex items-center justify-start w-full pb-1">
            <button
              type="button"
              onClick={onBackToAbout}
              className={`inline-flex items-center space-x-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer focus:outline-none ${
                isWhite ? 'text-zinc-500 hover:text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>← Back to About</span>
            </button>
          </div>
        )}

        {/* HEADER SECTION */}
        <div className="flex flex-col items-center space-y-2">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-light font-serif-italic transition-colors duration-300 ${titleColor}`}>
            Authors&apos; Note
          </h1>
        </div>

        {/* CONTENT */}
        <div className={`text-xs sm:text-sm leading-relaxed space-y-3 font-light text-center transition-colors duration-300 ${textColor}`}>

          <p>
            The books I write are works of fiction and are written for storytelling &amp; entertainment purposes. The original work by Aravé S. is protected. Unauthorized copying or use of this content without permission is prohibited. Please do not steal or repost my work, I will appreciate it. I will take action against violations, so report any instances you see.
          </p>

          <p>
            All pictures, videos, and GIFs used in all books I write are for reference purposes only, and I do not own any of them, all rights belong to their respective owners. All characters, events, and situations are fictional and created by the author. Any resemblance to real persons or incidents is purely coincidental.
          </p>

          <p className="font-medium pt-0.5">
            Thank you for giving my story a chance.<br />
            I hope you&apos;ll stay until the very last page &lt;3
          </p>

          <div className="space-y-0.5 pt-0.5">
            <p className="font-bold">Trigger warnings will be given.</p>
            <p>Everything follows the guidelines of each platform I use.</p>
            <p className="font-semibold text-rose-400">and yes... it&apos;s mature.</p>
          </div>

          <div className="space-y-0.5 pt-0.5">
            <p className="font-medium">Reader discretion is advised.</p>
            <p>To the reader, thank you for being here.</p>
          </div>

          <p className="pt-2 font-serif-italic text-rose-400 font-normal text-lg sm:text-xl">
            Love you all!
          </p>
        </div>
      </div>
    </motion.div>
  );
};
