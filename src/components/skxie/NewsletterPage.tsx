import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface NewsletterPageProps {
  isVisible: boolean;
}

export const NewsletterPage: React.FC<NewsletterPageProps> = ({ isVisible }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSubscribed(false);
      }, 3000);
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto min-h-screen pt-28 pb-32 px-6 flex flex-col justify-start relative z-10 select-none"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-500">
            Stay in the Loop
          </span>
          <h1 className="text-4xl font-light font-serif-italic italic text-white">
            Newsletter
          </h1>
        </div>

        <p className="text-zinc-400 text-sm font-light leading-relaxed">
          Join the inner circle. Subscribe to get updates on new chapters, publishing releases, 
          and exclusive writing notes directly in your inbox.
        </p>

        {newsletterSubscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-10 bg-[#070709] border border-emerald-500/30 rounded-2xl text-center flex flex-col items-center justify-center space-y-4 shadow-xl my-4"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-light text-white tracking-wide">
                Subscribed Successfully
              </h3>
              <p className="text-xs text-zinc-400 font-light max-w-sm mx-auto leading-relaxed">
                Thank you for subscribing! You are now in the loop and will receive exclusive updates on new releases directly in your inbox.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setNewsletterEmail('');
                setNewsletterSubscribed(false);
              }}
              className="pt-2 text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Subscribe Another Email
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3 text-xs bg-[#070709] border border-[#222228]/70 focus:border-[#44444F] rounded-lg text-white focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-black hover:bg-[#E5E5E5] active:scale-95 transition-all rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};
