import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Mail } from 'lucide-react';

interface NewsletterPageProps {
  isVisible: boolean;
  isWhite?: boolean;
}

export const NewsletterPage: React.FC<NewsletterPageProps> = ({ isVisible, isWhite = false }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('skxie_newsletter_subscribed') === 'true';
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      sessionStorage.setItem('skxie_newsletter_subscribed', 'true');
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const subColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';
  const inputClass = isWhite
    ? 'bg-zinc-100/90 border-zinc-300 text-zinc-900 placeholder-zinc-500 focus:border-black'
    : 'bg-[#0C0C10] border-[#22222A] text-white placeholder-zinc-500 focus:border-[#444454]';

  const buttonClass = isWhite
    ? 'bg-black text-white hover:bg-zinc-800'
    : 'bg-white text-black hover:bg-zinc-200';

  const cardClass = isWhite
    ? 'bg-zinc-100 border-zinc-300 shadow-lg text-zinc-900'
    : 'bg-[#0C0C10] border-[#22222A] shadow-2xl text-white';

  const tagColor = isWhite ? 'text-zinc-500' : 'text-zinc-400';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto min-h-screen pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 select-none text-center"
    >
      <div className="w-full space-y-8">
        {/* CENTERED HEADER TITLE & DESCRIPTION */}
        <div className="space-y-3">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-light font-serif-italic transition-colors duration-300 ${titleColor}`}>
            Newsletter
          </h1>
          <p className={`text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto transition-colors duration-300 ${subColor}`}>
            Join the inner circle. Subscribe to get updates on new chapters, publishing releases, 
            and exclusive writing notes directly in your inbox.
          </p>
        </div>

        {/* SUBSCRIBED SUCCESS STATE OR CENTERED INPUT FORM */}
        {newsletterSubscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 sm:p-10 border rounded-2xl text-center flex flex-col items-center justify-center space-y-4 w-full max-w-lg mx-auto transition-colors duration-300 ${cardClass}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${isWhite ? 'bg-black/5 border-black/10 text-black' : 'bg-white/5 border-white/10 text-white'}`}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className={`text-base sm:text-lg font-light tracking-wide ${titleColor}`}>
                Subscribed Successfully
              </h3>
              <p className={`text-xs font-light max-w-sm mx-auto leading-relaxed ${subColor}`}>
                Thank you for subscribing! You are now in the loop and will receive exclusive updates on new releases directly in your inbox.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('skxie_newsletter_subscribed');
                setNewsletterEmail('');
                setNewsletterSubscribed(false);
              }}
              className={`pt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer ${isWhite ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              Subscribe Another Email
            </button>
          </motion.div>
        ) : (
          <div className="w-full max-w-lg mx-auto space-y-5">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 text-xs border rounded-xl focus:outline-none transition-colors ${inputClass}`}
                />
              </div>
              <button
                type="submit"
                className={`px-6 py-3 active:scale-95 transition-all rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap shadow-sm ${buttonClass}`}
              >
                Subscribe
              </button>
            </form>

            {/* CENTERED STAY IN THE LOOP STYLED TEXT */}
            <div className="flex items-center justify-center pt-1">
              <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${tagColor}`}>
                STAY IN THE LOOP
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
