import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ExternalLink, Sparkles, BookOpen, Mail, Loader2 } from 'lucide-react';
import { booksData, BookItem } from '../data/booksData';
import houseNoQuestionMarkImg from '../assets/books/house-no-.png';
import toMrGeneralImg from '../assets/books/to-mr-genral.png';

const DEFAULT_NEWSLETTER_URL = "https://script.google.com/macros/s/AKfycby9aQ4596ogv6jZjQdWYn8Giqiz1uTpa4AWqIB5yLy32U_8GFoK8iz1bLFu3Oe3IBGO/exec";

interface HomePageProps {
  isWhite?: boolean;
  onBookSelect?: (book: BookItem) => void;
  onComingSoonClick?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ isWhite = false, onBookSelect, onComingSoonClick }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('arave_newsletter_subscribed') === 'true';
  });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubmittingNewsletter(true);
    const envUrl = typeof import.meta !== 'undefined'
      ? (import.meta as any).env?.VITE_NEWSLETTER_FORM_URL
      : undefined;
    const formUrl = envUrl || DEFAULT_NEWSLETTER_URL;

    try {
      const formData = new FormData();
      formData.append('type', 'newsletter');
      formData.append('name', 'Newsletter Subscriber');
      formData.append('email', newsletterEmail.trim());
      formData.append('source', 'Home Page Newsletter');
      formData.append('message', 'Subscribed via Home Page Newsletter');

      await fetch(formUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });

      sessionStorage.setItem('arave_newsletter_subscribed', 'true');
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    } catch (err) {
      console.error('Newsletter submission error:', err);
      sessionStorage.setItem('arave_newsletter_subscribed', 'true');
      setNewsletterSubscribed(true);
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  const titleColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';
  const taglineColor = isWhite ? 'text-zinc-900' : 'text-white';
  const headingColor = isWhite ? 'text-zinc-900' : 'text-white';
  const cardBorder = isWhite ? 'border border-zinc-300/80' : 'border border-[#22222A]';
  const bookShadow = isWhite
    ? 'shadow-[0_14px_30px_-6px_rgba(0,0,0,0.28),0_8px_12px_-4px_rgba(0,0,0,0.15)]'
    : 'shadow-[0_16px_40px_rgba(0,0,0,0.75)]';
  const mutedText = isWhite ? 'text-zinc-600' : 'text-zinc-400';

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
        id="section-arave"
        className="w-full h-screen flex flex-col items-center justify-center relative px-6 sm:px-12 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center space-y-4 max-w-3xl mx-auto z-10"
        >
          <h1 className={`text-xs sm:text-sm uppercase tracking-[0.5em] font-semibold transition-colors duration-300 ${titleColor}`}>
            Aravé S.
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
        className="w-full min-h-screen pt-20 pb-28 px-4 sm:px-8 md:px-12 max-w-2xl sm:max-w-3xl mx-auto relative z-10 flex flex-col justify-center items-center space-y-10"
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
            const upcomingBook = booksData.find((b) => b.id === 'coming-soon-mystery') || booksData.find((b) => b.status === 'Coming Soon');
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
                  onClick={() => (onComingSoonClick ? onComingSoonClick() : onBookSelect && onBookSelect(upcomingBook))}
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
            const newReleaseBook = booksData.find((b) => b.id === 'to-mr-general') || booksData.find((b) => b.status !== 'Coming Soon') || booksData[0];

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

      {/* ========================================================
          NEWSLETTER SUBSCRIPTION SECTION
          ======================================================== */}
      <section
        id="section-newsletter"
        className="w-full pt-4 pb-36 px-4 sm:px-8 max-w-xl mx-auto relative z-10 flex flex-col items-center justify-center text-center space-y-6"
      >
        {newsletterSubscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center space-y-3 py-2 text-center"
          >
            <div className="space-y-1">
              <h3 className={`text-2xl sm:text-3xl font-serif-italic font-normal tracking-wide ${headingColor}`}>
                Subscribed Successfully
              </h3>
              <p className={`text-xs font-light max-w-sm mx-auto leading-relaxed ${mutedText}`}>
                Thank you for joining the inner circle!
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('arave_newsletter_subscribed');
                setNewsletterEmail('');
                setNewsletterSubscribed(false);
              }}
              className={`pt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer ${
                isWhite ? 'text-zinc-500 hover:text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Subscribe Another Email
            </button>
          </motion.div>
        ) : (
          <div className="w-full flex flex-col items-center space-y-5">
            {/* SECTION HEADER */}
            <div className="text-center">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-serif-italic font-normal leading-tight ${headingColor}`}>
                Join the Inner Circle
              </h2>
            </div>

            {/* UNIFIED LUXURY PILL CAPSULE FORM */}
            <form onSubmit={handleNewsletterSubmit} className="w-full max-w-md space-y-3">
              <div
                className={`relative flex items-center p-1 sm:p-1.5 rounded-full border transition-all duration-300 ${
                  isWhite
                    ? 'bg-zinc-100/90 border-zinc-300/80 shadow-sm focus-within:border-zinc-800 focus-within:bg-white focus-within:shadow-md'
                    : 'bg-[#14141B] border-[#2A2A36] shadow-lg focus-within:border-zinc-400 focus-within:bg-[#181822] focus-within:shadow-[0_0_20px_rgba(255,255,255,0.04)]'
                }`}
              >
                <div
                  className={`pl-3.5 pr-2 flex items-center pointer-events-none transition-colors ${
                    isWhite ? 'text-zinc-400' : 'text-zinc-500'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={isSubmittingNewsletter}
                  className={`w-full bg-transparent border-none outline-none text-xs sm:text-[13px] px-1 py-1.5 focus:ring-0 ${
                    isWhite
                      ? 'text-zinc-900 placeholder-zinc-400'
                      : 'text-white placeholder-zinc-500'
                  }`}
                />
                <button
                  type="submit"
                  disabled={isSubmittingNewsletter}
                  className={`px-5 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1.5 whitespace-nowrap active:scale-95 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isWhite
                      ? 'bg-black text-white hover:bg-zinc-800 shadow-sm'
                      : 'bg-white text-black hover:bg-zinc-200 shadow-md'
                  }`}
                >
                  {isSubmittingNewsletter ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Joining...</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </div>

              <p className={`text-[11px] sm:text-xs font-light text-center tracking-wide pt-0.5 leading-relaxed ${mutedText}`}>
                Subscribe for exclusive bonus content, early release updates, and personal notes from Aravé S.
              </p>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

