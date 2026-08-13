import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { booksData, BookItem } from '../data/booksData';
import houseNoQuestionMarkImg from '../assets/books/house-no-.png';
import toMrGeneralImg from '../assets/books/to-mr-genral.png';

interface HomePageProps {
  isWhite?: boolean;
  onBookSelect?: (book: BookItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ isWhite = false, onBookSelect }) => {
  const [filter, setFilter] = useState<'upcoming' | 'released'>('upcoming');

  const titleColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';
  const taglineColor = isWhite ? 'text-zinc-900' : 'text-white';
  const headingColor = isWhite ? 'text-zinc-900' : 'text-white';
  const cardBorder = isWhite ? 'border border-zinc-300/80' : 'border border-[#22222A]';
  const bookShadow = isWhite
    ? 'shadow-[0_14px_30px_-6px_rgba(0,0,0,0.28),0_8px_12px_-4px_rgba(0,0,0,0.15)]'
    : 'shadow-[0_16px_40px_rgba(0,0,0,0.75)]';
  const mutedText = isWhite ? 'text-zinc-600' : 'text-zinc-400';
  const badgeBgReleased = isWhite ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60';
  const badgeBgUpcoming = isWhite ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-amber-950/80 text-amber-300 border border-amber-800/60';

  const filteredBooks = booksData.filter((book) => {
    if (filter === 'released') return book.status !== 'Coming Soon';
    if (filter === 'upcoming') return book.status === 'Coming Soon';
    return true;
  });

  const handleScrollDown = () => {
    const target = document.getElementById('section-books');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative">
      {/* ========================================================
          HERO SECTION
          ======================================================== */}
      <section
        id="section-skxie"
        className="w-full h-screen flex flex-col items-center justify-center relative px-6 sm:px-12 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center space-y-4 max-w-3xl mx-auto z-10"
        >
          <h1 className={`text-xs sm:text-sm uppercase tracking-[0.5em] font-semibold transition-colors duration-300 ${titleColor}`}>
            skxie
          </h1>
          <p className={`text-2xl sm:text-3xl md:text-4xl font-light font-serif-italic leading-snug transition-colors duration-300 ${taglineColor}`}>
            Powered by caffeine and questionable <br className="hidden sm:inline" />
            life choices.
          </p>
        </motion.div>

        {/* ANIMATED SCROLL DOWN ARROW (PURE STANDALONE FLOATING ARROW) */}
        <motion.button
          onClick={handleScrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 1, delay: 0.8 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
          className={`absolute bottom-20 sm:bottom-24 z-20 p-2 transition-all cursor-pointer focus:outline-none bg-transparent border-none hover:scale-110 ${
            isWhite ? 'text-black' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
          }`}
          aria-label="Scroll down to showcase books"
          title="Scroll down to explore books"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 sm:w-7 sm:h-7"
          >
            <polyline points="5 9 12 16 19 9" />
          </svg>
        </motion.button>
      </section>

      {/* ========================================================
          SHOWCASE BOOKS SECTION (1 BOOK FOR COMING SOON & 1 BOOK FOR NEW RELEASE)
          ======================================================== */}
      <section
        id="section-books"
        className="w-full min-h-screen pt-20 pb-20 px-4 sm:px-8 md:px-12 max-w-2xl sm:max-w-3xl mx-auto relative z-10 flex flex-col justify-center items-center space-y-10"
      >
        {/* SUBTITLE */}
        <div className="text-center pt-2 sm:pt-3">
          <p className={`text-xs sm:text-sm uppercase tracking-[0.25em] font-medium ${mutedText}`}>
            Explore Released Titles & Upcoming Works
          </p>
        </div>

        {/* 2-COLUMN FEATURED SHOWCASE (1 BOOK PER SECTION) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* COMING SOON (1 FEATURED UPCOMING BOOK) */}
          {(() => {
            const upcomingBook = booksData.find((b) => b.status === 'Coming Soon') || booksData[3];
            if (!upcomingBook) return null;

            return (
              <div className="space-y-4">
                <div className="text-center pb-1">
                  <h3 className={`text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold ${headingColor}`}>
                    COMING SOON
                  </h3>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => onBookSelect && onBookSelect(upcomingBook)}
                  className="group cursor-pointer flex flex-col space-y-3 items-center text-center"
                >
                  {/* BOOK COVER CARD WITH DEEP AMBIENT DROP SHADOW */}
                  <div className={`relative w-full aspect-[2/3] rounded-sm overflow-hidden ${cardBorder} ${bookShadow}`}>
                    <img
                      src={houseNoQuestionMarkImg}
                      alt={upcomingBook.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* QUESTION MARK UNDERNEATH POSTER */}
                  <div className="space-y-1 text-center px-0.5 pt-1">
                    <p className={`text-xl sm:text-2xl font-serif font-bold tracking-widest ${headingColor}`}>
                      ?
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })()}

          {/* NEW RELEASE (1 FEATURED NEW RELEASE BOOK) */}
          {(() => {
            const newReleaseBook = booksData.find((b) => b.status !== 'Coming Soon') || booksData[0];

            return (
              <div className="space-y-4">
                <div className="text-center pb-1">
                  <h3 className={`text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold ${headingColor}`}>
                    NEW RELEASE
                  </h3>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  onClick={() => onBookSelect && onBookSelect(newReleaseBook)}
                  className="group cursor-pointer flex flex-col space-y-3 items-center text-center"
                >
                  {/* BOOK COVER CARD WITH DEEP AMBIENT DROP SHADOW */}
                  <div className={`relative w-full aspect-[2/3] rounded-sm overflow-hidden ${cardBorder} ${bookShadow}`}>
                    <img
                      src={toMrGeneralImg}
                      alt="TO MR. GENERAL"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* BOOK DETAILS (CENTERED) */}
                  <div className="space-y-1 text-center px-0.5">
                    <h4 className={`text-sm sm:text-base font-serif font-bold uppercase tracking-wider line-clamp-1 ${headingColor}`}>
                      TO MR. GENERAL
                    </h4>
                    <p className={`text-xs font-light line-clamp-1 ${mutedText}`}>
                      A Dark Desi Romance Novel
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
};

