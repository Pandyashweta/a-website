import React from 'react';
import { motion } from 'motion/react';

interface AboutPageProps {
  isVisible: boolean;
  isWhite?: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({ isVisible, isWhite = false }) => {
  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const textColor = isWhite ? 'text-zinc-800' : 'text-zinc-300';
  const signatureColor = isWhite ? 'text-zinc-900' : 'text-white';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto min-h-screen pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 select-none text-center"
    >
      <div className="w-full space-y-6">
        {/* CENTERED BIO SECTION */}
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-light font-serif-italic transition-colors duration-300 ${titleColor}`}>
          About the Author
        </h1>

        <div className={`text-xs sm:text-sm leading-relaxed space-y-4 font-light max-w-xl mx-auto text-center transition-colors duration-300 ${textColor}`}>
          <p>
            Hey there! I’m Skxie, and I love sharing my stories with you! I write in various genres, often inspired by my own experiences, while some tales are pure fiction.
          </p>
          <p>
            Writing is my passion, and I hope you enjoy my books just as much as I love creating them! Please forgive any grammar mistakes- I’m always working on improving my English.
          </p>
          <p>
            When I’m not writing, I’m juggling school and a full-time job, but I make time to update my work on Wattpad, Stck Me, and soon on Amazon. I can’t wait to share the many stories I have in mind!
          </p>
          <p>
            Thank you for your support and for reading my work. <br className="hidden sm:inline" />
            I truly appreciate you all!
          </p>
          <p className={`pt-2 font-medium leading-relaxed transition-colors duration-300 ${signatureColor}`}>
            Much love,<br />
            <span className="font-serif-italic text-2xl sm:text-3xl inline-block pt-1">Skxie!</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
