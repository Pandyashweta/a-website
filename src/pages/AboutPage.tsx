import React from 'react';
import { motion } from 'motion/react';

interface AboutPageProps {
  isVisible: boolean;
  isWhite?: boolean;
  onNoteClick?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ isVisible, isWhite = false, onNoteClick }) => {
  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const textColor = isWhite ? 'text-zinc-800' : 'text-zinc-300';
  const signatureColor = isWhite ? 'text-zinc-900' : 'text-white';
  const noteLinkColor = isWhite
    ? 'text-zinc-950 font-semibold underline underline-offset-4 decoration-zinc-400 hover:decoration-black hover:text-black transition-colors cursor-pointer'
    : 'text-white font-semibold underline underline-offset-4 decoration-zinc-400 hover:decoration-white hover:text-pink-400 transition-colors cursor-pointer';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-3xl mx-auto min-h-screen pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 text-center"
    >
      <div className="w-full space-y-12">
        {/* CENTERED BIO SECTION */}
        <div className="space-y-6">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-light font-serif-italic transition-colors duration-300 ${titleColor}`}>
            About the Author
          </h1>

          <div className={`text-xs sm:text-sm leading-relaxed space-y-4 font-light max-w-xl mx-auto text-center transition-colors duration-300 ${textColor}`}>
            <p>
              Hello, there! I’m Aravé S., or Ara for short. Writing is my passion, or rather, my hobby, and I hope you enjoy my stories as much as I love creating them. Please forgive any grammar mistakes as I work on improving my English.
            </p>
            <p>
              I enjoy telling stories, particularly those with darker elements. When I&apos;m not writing, I&apos;m usually busy with work or traveling. You can find my updates on Wattpad and Stck Me, and I plan to share my work on Amazon soon.
            </p>
            <p>
              Here is a{' '}
              <a
                href="#note"
                onClick={(e) => {
                  e.preventDefault();
                  onNoteClick?.();
                }}
                className={noteLinkColor}
                title="Read Author's Note"
              >
                note
              </a>{' '}
              about what I write and the material I use as references.
            </p>
            <p>
              Thank you for your support and for reading my work.<br className="hidden sm:inline" />
              I truly appreciate you all!
            </p>
            <p className={`pt-2 font-medium leading-relaxed transition-colors duration-300 ${signatureColor}`}>
              Much love,<br />
              <span className="font-serif-italic text-2xl sm:text-3xl inline-block pt-1">Aravé S.!</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
