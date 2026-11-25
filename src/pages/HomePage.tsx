import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Loader2 } from 'lucide-react';
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
  const mutedText = isWhite ? 'text-zinc-600' : 'text-zinc-400';

  return (
    <div className="w-full relative">
      {/* ========================================================
          SPLIT HERO: TAGLINE & NEWSLETTER (LEFT) | BOOKS SHOWCASE (RIGHT)
          ======================================================== */}
      <section
        id="section-arave"
        className="w-full min-h-screen relative z-10 px-6 sm:px-10 lg:px-14 pt-24 pb-28 sm:pt-28 sm:pb-32 flex items-center justify-center max-w-[1440px] mx-auto"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-10 sm:gap-12 lg:gap-16 xl:gap-20">
          
          {/* ========================================================
              LEFT COLUMN: NAME + TAGLINE + NEWSLETTER CARD
              ======================================================== */}
          <div className="flex flex-col items-center text-center space-y-6 sm:space-y-7 w-full max-w-[480px] mx-auto">
            {/* NAME + TAGLINE */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="space-y-3.5 sm:space-y-4"
            >
              <div className="flex items-center justify-center gap-3.5">
                <span className={`h-px w-8 sm:w-10 ${isWhite ? 'bg-zinc-400' : 'bg-zinc-600'}`} />
                <h1 className={`text-[11px] sm:text-xs uppercase tracking-[0.45em] font-semibold transition-colors duration-300 ${titleColor}`}>
                  Aravé S.
                </h1>
                <span className={`h-px w-8 sm:w-10 ${isWhite ? 'bg-zinc-400' : 'bg-zinc-600'}`} />
              </div>

              <p className={`text-3xl sm:text-4xl lg:text-[44px] font-light font-serif-italic leading-[1.22] tracking-tight transition-colors duration-300 ${taglineColor}`}>
                Powered by caffeine <br className="hidden sm:inline" />
                and questionable <br className="hidden sm:inline" />
                life choices.
              </p>
            </motion.div>

            {/* INTEGRATED LUXURY NEWSLETTER CARD */}
            <motion.div
              id="section-newsletter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
              className={`w-full rounded-3xl border p-5 sm:p-6 sm:px-7 backdrop-blur-xl transition-all duration-300 ${
                isWhite
                  ? 'bg-white/80 border-zinc-200/90 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)]'
                  : 'bg-[#111116]/80 border-[#242430] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)]'
              }`}
            >
              {newsletterSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center space-y-2.5 py-1"
                >
                  <h3 className={`text-2xl sm:text-3xl font-serif-italic font-normal tracking-wide ${headingColor}`}>
                    Subscribed Successfully
                  </h3>
                  <p className={`text-xs font-light max-w-sm leading-relaxed ${mutedText}`}>
                    Thank you for joining the inner circle!
                  </p>
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
                <div className="flex flex-col items-center space-y-3 sm:space-y-3.5">
                  <div className="space-y-1 text-center">
                    <h2 className={`text-2xl sm:text-3xl lg:text-[32px] font-serif-italic font-normal leading-tight tracking-wide ${headingColor}`}>
                      Join the Inner Circle
                    </h2>
                    <p className={`text-[11px] sm:text-xs font-light tracking-wide leading-relaxed max-w-xs mx-auto ${mutedText}`}>
                      Subscribe for exclusive bonus content, early release updates, and personal notes from Aravé S.
                    </p>
                  </div>

                  <form onSubmit={handleNewsletterSubmit} className="w-full">
                    <div
                      className={`relative flex items-center p-1 sm:p-1.5 rounded-full border transition-all duration-300 ${
                        isWhite
                          ? 'bg-zinc-100/80 border-zinc-300/80 shadow-inner focus-within:border-black focus-within:bg-white focus-within:shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
                          : 'bg-[#15151E] border-[#2A2A38] shadow-inner focus-within:border-zinc-400 focus-within:bg-[#1A1A24] focus-within:shadow-[0_0_20px_rgba(255,255,255,0.04)]'
                      }`}
                    >
                      <div className={`pl-3 pr-1.5 flex items-center pointer-events-none transition-colors ${isWhite ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="Your email address..."
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        disabled={isSubmittingNewsletter}
                        className={`w-full min-w-0 bg-transparent border-none outline-none text-xs sm:text-[13px] px-1 py-1.5 focus:ring-0 ${
                          isWhite ? 'text-zinc-900 placeholder-zinc-400' : 'text-white placeholder-zinc-500'
                        }`}
                      />
                      <button
                        type="submit"
                        disabled={isSubmittingNewsletter}
                        className={`px-4 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1.5 whitespace-nowrap active:scale-95 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed ${
                          isWhite ? 'bg-black text-white hover:bg-zinc-800 shadow-sm' : 'bg-white text-black hover:bg-zinc-200 shadow-md'
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
                  </form>
                </div>
              )}
            </motion.div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: THE TWO BOOKS (SIDE BY SIDE)
              ======================================================== */}
          <div className="relative flex items-center justify-center w-full max-w-[560px] mx-auto lg:ml-auto">
            {/* Ambient Background Aura */}
            <div
              className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[80%] rounded-full blur-3xl ${
                isWhite ? 'bg-black/[0.04]' : 'bg-white/[0.06]'
              }`}
            />

            <div className="w-full relative grid grid-cols-2 gap-4 sm:gap-7 lg:gap-8 items-start">
              {/* COMING SOON (1 FEATURED UPCOMING BOOK) */}
              {(() => {
                const upcomingBook = booksData.find((b) => b.id === 'coming-soon-mystery') || booksData.find((b) => b.status === 'Coming Soon');
                if (!upcomingBook) return null;

                return (
                  <div className="space-y-3.5 sm:space-y-4">
                    <div className="text-center pb-0.5">
                      <h3 className={`text-[11px] sm:text-xs uppercase tracking-[0.28em] font-semibold transition-colors ${headingColor}`}>
                        COMING SOON
                      </h3>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => (onComingSoonClick ? onComingSoonClick() : onBookSelect && onBookSelect(upcomingBook))}
                      className="group cursor-pointer flex flex-col space-y-2.5 items-center text-center"
                    >
                      {/* LUXURY BOOK COVER CARD WITH 3D SPINE HIGHLIGHT & AMBIENT SHADOW */}
                      <div
                        className={`relative w-full aspect-[2/3] rounded-[3px] overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-1.5 ${cardBorder} ${
                          isWhite
                            ? 'shadow-[0_16px_36px_-8px_rgba(0,0,0,0.28),0_6px_14px_-4px_rgba(0,0,0,0.1)] group-hover:shadow-[0_24px_48px_-10px_rgba(0,0,0,0.34)]'
                            : 'shadow-[0_18px_40px_rgba(0,0,0,0.85)] group-hover:shadow-[0_26px_50px_rgba(0,0,0,0.95)]'
                        }`}
                      >
                        {/* Book Spine Highlight Overlay */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-[4px] bg-gradient-to-r from-white/25 via-white/10 to-transparent z-10" />
                        <div className="pointer-events-none absolute inset-y-0 left-[4px] w-[1px] bg-black/15 z-10" />

                        <img
                          src={houseNoQuestionMarkImg}
                          alt={upcomingBook.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                      </div>

                      {/* QUESTION MARK UNDERNEATH POSTER */}
                      <div className="pt-0.5 text-center">
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
                  <div className="space-y-3.5 sm:space-y-4">
                    <div className="text-center pb-0.5">
                      <h3 className={`text-[11px] sm:text-xs uppercase tracking-[0.28em] font-semibold transition-colors ${headingColor}`}>
                        NEW RELEASE
                      </h3>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      onClick={() => onBookSelect && onBookSelect(newReleaseBook)}
                      className="group cursor-pointer flex flex-col space-y-2.5 items-center text-center"
                    >
                      {/* LUXURY BOOK COVER CARD WITH 3D SPINE HIGHLIGHT & AMBIENT SHADOW */}
                      <div
                        className={`relative w-full aspect-[2/3] rounded-[3px] overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-1.5 ${cardBorder} ${
                          isWhite
                            ? 'shadow-[0_16px_36px_-8px_rgba(0,0,0,0.28),0_6px_14px_-4px_rgba(0,0,0,0.1)] group-hover:shadow-[0_24px_48px_-10px_rgba(0,0,0,0.34)]'
                            : 'shadow-[0_18px_40px_rgba(0,0,0,0.85)] group-hover:shadow-[0_26px_50px_rgba(0,0,0,0.95)]'
                        }`}
                      >
                        {/* Book Spine Highlight Overlay */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-[4px] bg-gradient-to-r from-white/25 via-white/10 to-transparent z-10" />
                        <div className="pointer-events-none absolute inset-y-0 left-[4px] w-[1px] bg-black/15 z-10" />

                        <img
                          src={toMrGeneralImg}
                          alt="TO MR. GENERAL"
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                      </div>

                      {/* BOOK DETAILS (CENTERED) */}
                      <div className="space-y-0.5 text-center px-0.5">
                        <h4 className={`text-xs sm:text-sm font-serif font-bold uppercase tracking-[0.14em] line-clamp-1 ${headingColor}`}>
                          TO MR. GENERAL
                        </h4>
                        <p className={`text-[11px] sm:text-xs font-light line-clamp-1 tracking-wide ${mutedText}`}>
                          A Dark Desi Romance Novel
                        </p>
                      </div>
                    </motion.div>
                  </div>
                );
              })()}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
