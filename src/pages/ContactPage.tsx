import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  isVisible: boolean;
  isWhite?: boolean;
}

const DEFAULT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-MRCMc5lKSuhqz37ZYcN71JrE8V3WxxMMRHhyy4tUixZzUdx3nXeNOkOn2dSQfSdU/exec";

export const ContactPage: React.FC<ContactPageProps> = ({ isVisible, isWhite = false }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('skxie_contact_submitted') === 'true';
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim() && contactEmail.trim() && contactMessage.trim()) {
      setIsSubmitting(true);
      setSubmitError(null);

      const envUrl = typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_CONTACT_FORM_URL : undefined;
      const formUrl = envUrl || DEFAULT_SCRIPT_URL;

      try {
        const formData = new FormData();
        formData.append('name', contactName);
        formData.append('email', contactEmail);
        formData.append('message', contactMessage);

        await fetch(formUrl, {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        });

        sessionStorage.setItem('skxie_contact_submitted', 'true');
        setContactSubmitted(true);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      } catch (err) {
        console.error("Form submission error:", err);
        sessionStorage.setItem('skxie_contact_submitted', 'true');
        setContactSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const subColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';
  const emailLinkColor = isWhite ? 'text-black font-semibold' : 'text-white font-medium';

  const cardBg = isWhite ? 'bg-white border-zinc-300 shadow-lg' : 'bg-[#0C0C10] border-[#22222A] shadow-xl';
  const inputBg = isWhite
    ? 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500'
    : 'bg-[#0C0C10] border-[#22222A] text-white placeholder-zinc-500 focus:border-[#444454]';

  const btnBg = isWhite
    ? 'bg-black text-white hover:bg-zinc-800'
    : 'bg-white text-black hover:bg-zinc-200';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto min-h-screen pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-6 flex flex-col items-center justify-start sm:justify-center relative z-10 select-none text-center"
    >
      <div className="w-full space-y-8">
        {/* CENTERED HEADER TITLE & SUBTITLE */}
        <div className="space-y-3">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-light font-serif-italic transition-colors duration-300 ${titleColor}`}>
            Get in Touch
          </h1>
          <p className={`text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto transition-colors duration-300 ${subColor}`}>
            Have a question, feedback, or looking to collaborate? Drop a message below.
          </p>
        </div>

        {/* SUBSCRIBED SUCCESS STATE OR CENTERED CONTACT FORM */}
        {contactSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 sm:p-10 border rounded-2xl text-center flex flex-col items-center justify-center space-y-4 w-full max-w-lg mx-auto transition-colors duration-300 ${cardBg}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${isWhite ? 'bg-zinc-100 border-zinc-300 text-black' : 'bg-white/5 border-white/10 text-white'}`}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className={`text-base sm:text-lg font-light tracking-wide ${titleColor}`}>
                Message Sent Successfully
              </h3>
              <p className={`text-xs font-light max-w-sm mx-auto leading-relaxed ${subColor}`}>
                Thank you for reaching out! Your message has been sent. I will get back to you as soon as possible.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('skxie_contact_submitted');
                setContactSubmitted(false);
              }}
              className={`pt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer ${subColor}`}
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <div className="w-full max-w-lg mx-auto">
            <form onSubmit={handleContactSubmit} className="space-y-3.5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className={`w-full px-4 py-3 text-xs border rounded-md focus:outline-none transition-colors ${inputBg}`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className={`w-full px-4 py-3 text-xs border rounded-md focus:outline-none transition-colors ${inputBg}`}
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={5}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className={`w-full px-4 py-3 text-xs border rounded-md focus:outline-none transition-colors resize-none ${inputBg}`}
              />
              {submitError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-xs font-medium text-center">
                  {submitError}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all rounded-md text-xs font-semibold cursor-pointer shadow-sm ${btnBg}`}
              >
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                    <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
};
