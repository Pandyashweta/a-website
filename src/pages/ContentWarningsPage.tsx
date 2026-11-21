import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { booksData } from '../data/booksData';

interface ContentWarningsPageProps {
  isVisible: boolean;
  isWhite?: boolean;
  onGoHome?: () => void;
  onGoBooks?: () => void;
}

export const ContentWarningsPage: React.FC<ContentWarningsPageProps> = ({
  isVisible,
  isWhite = false,
}) => {
  // FILTER TO ONLY BOOKS WITH ACTUAL CONTENT WARNINGS
  const booksWithWarnings = booksData.filter(
    (b) => b.contentNotes && b.contentNotes.length > 0
  );

  // OPEN BY DEFAULT TO MATCH THE ORIGINAL FORMAT
  const [openBookId, setOpenBookId] = useState<string | null>('to-mr-general');

  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const subtextColor = isWhite ? 'text-zinc-500' : 'text-zinc-400';
  const textColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';
  const dividerBorder = isWhite ? 'border-zinc-200' : 'border-zinc-800/80';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto min-h-screen pt-28 sm:pt-36 pb-28 sm:pb-36 px-4 sm:px-6 flex flex-col items-center justify-start relative z-10 text-center"
    >
      <div className="w-full space-y-6">
        {/* HEADER & INTRO */}
        <div className="space-y-3.5">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold font-sans tracking-tight transition-colors duration-300 ${titleColor}`}>
            Content Warnings
          </h1>

          <div className="text-xs sm:text-sm leading-relaxed max-w-lg mx-auto space-y-1 transition-colors duration-300">
            <p className={`font-bold ${isWhite ? 'text-zinc-900' : 'text-white'}`}>
              Trigger warnings will be given before each chapter.
            </p>
            <p className={`font-normal ${subtextColor}`}>
              Everything follows the guidelines of each platform used.
            </p>
            <p className="text-rose-500 font-medium pt-1">
              and yes... it&apos;s mature. Reader discretion is advised.
            </p>
          </div>
        </div>

        {/* BOOK TITLE DROPDOWN ACCORDION (MATCHING EXACT OLD FORMAT) */}
        <div className="space-y-4 pt-8 text-left max-w-xl mx-auto w-full">
          {booksWithWarnings.map((book) => {
            const isOpen = openBookId === book.id;
            return (
              <div
                key={book.id}
                className={`w-full border-b ${dividerBorder} pb-3 transition-colors`}
              >
                <button
                  type="button"
                  onClick={() => setOpenBookId(isOpen ? null : book.id)}
                  className="w-full flex items-center justify-between py-2 text-left cursor-pointer group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm sm:text-base font-semibold tracking-wider uppercase transition-colors ${
                      isWhite
                        ? 'text-zinc-900 group-hover:text-black'
                        : 'text-zinc-100 group-hover:text-white'
                    }`}
                  >
                    {book.title}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <ul className={`pt-2 pb-2 space-y-2.5 text-xs sm:text-sm font-light list-disc list-inside ${textColor}`}>
                        {book.contentNotes?.map((note, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {note}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
