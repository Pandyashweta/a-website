import React from 'react';
import { motion } from 'motion/react';

interface CookiePolicyPageProps {
  isVisible: boolean;
  isEmbedded?: boolean;
  isWhite?: boolean;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ isVisible, isEmbedded = false, isWhite = false }) => {
  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-black font-normal' : 'text-white font-light';
  const subColor = isWhite ? 'text-zinc-800 font-normal' : 'text-zinc-400 font-light';
  const headingColor = isWhite ? 'text-black font-bold' : 'text-white font-semibold';
  const dateColor = isWhite ? 'text-zinc-700 font-semibold' : 'text-zinc-500 font-semibold';

  const content = (
    <div className="space-y-4 text-left">
      <div>
        {!isEmbedded && (
          <h2 className={`text-2xl font-serif-italic mb-1 ${titleColor}`}>
            Cookie Policy
          </h2>
        )}
        <p className={`text-[10px] uppercase tracking-[0.2em] ${dateColor}`}>
          Last Updated: August 1, 2026
        </p>
      </div>

      <div className={`text-xs sm:text-sm leading-relaxed space-y-4 ${subColor}`}>
        <div className="space-y-2">
          <p>
            This Cookie Policy explains how <strong>Skxie</strong> ("we," "our," or "us") uses cookies and similar technologies when you visit our website.
          </p>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>1. What Are Cookies?</h3>
          <p>
            Cookies are small text files stored on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, save user preferences, and provide technical security.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>2. Cookies We Use</h3>

          <div className="space-y-1.5">
            <h4 className={`text-xs uppercase tracking-wider ${headingColor}`}>Essential Cookies</h4>
            <p>
              These technical cookies are necessary for the website to function properly and securely. They enable core site functionality such as:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Security & CSRF protection</li>
              <li>Session management & user authentication</li>
              <li>User preference persistence (such as cookie consent choices)</li>
            </ul>
            <p className={`text-xs pt-1 ${isWhite ? 'text-zinc-700' : 'text-zinc-500'}`}>
              Because essential cookies are strictly required for security and core operation, they cannot be turned off.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className={`text-xs uppercase tracking-wider ${headingColor}`}>Analytics & Performance Cookies</h4>
            <p>
              At this time, <strong>Skxie does not use analytics cookies</strong> or third-party tracking scripts (such as Google Analytics or Meta Pixel).
            </p>
            <p>
              If analytics or performance services are introduced in the future, this policy will be updated immediately, and visitors will be prompted for consent.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className={`text-xs uppercase tracking-wider ${headingColor}`}>Third-Party Services</h4>
            <p>
              Some external platforms linked from this website (such as Amazon, Goodreads, Discord, or Wattpad) may place their own cookies when you visit their external sites. Those cookies are governed directly by the respective privacy policies of those third parties.
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>3. Managing & Disabling Cookies</h3>
          <p>
            Most modern web browsers allow you to manage, block, or delete cookies through their browser settings. You can clear your browser's local storage and cookies at any time.
          </p>
          <p>
            Please note that disabling essential cookies may impact web page performance or accessibility.
          </p>
        </div>

        <div className="space-y-1.5 pb-4">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>4. Contact Us</h3>
          <p>
            If you have any questions about our Cookie Policy or privacy practices, feel free to contact us directly at{' '}
            <a href="mailto:skxielol@gmail.com" className="underline font-semibold">
              skxielol@gmail.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );

  if (isEmbedded) return content;

  const topGradient = isWhite
    ? 'from-white via-white/90 to-transparent'
    : 'from-[#0A0A0B] via-[#0A0A0B]/95 to-transparent';

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 h-28 bg-gradient-to-b ${topGradient} z-40 pointer-events-none transition-colors duration-300`} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-5xl mx-auto min-h-screen pt-28 pb-32 px-6 flex flex-col justify-start relative z-10 select-none"
      >
        {content}
      </motion.div>
    </>
  );
};
