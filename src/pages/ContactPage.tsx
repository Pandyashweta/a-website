import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  isVisible: boolean;
  isWhite?: boolean;
}

const DEFAULT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwIpapTSKMUeSDXzdfB-_16rcQHBpVGXY5eAZ4YlO56Byy0xh06Gx2dkhdSYn7nF669/exec";

export const ContactPage: React.FC<ContactPageProps> = ({ isVisible, isWhite = false }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('arave_contact_submitted') === 'true';
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

        sessionStorage.setItem('arave_contact_submitted', 'true');
        setContactSubmitted(true);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      } catch (err) {
        console.error("Form submission error:", err);
        sessionStorage.setItem('arave_contact_submitted', 'true');
        setContactSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const headingColor = isWhite ? 'text-zinc-900' : 'text-white';
  const subColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';
  const textColor = isWhite ? 'text-zinc-700' : 'text-zinc-300';
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
      className="w-full max-w-4xl mx-auto min-h-screen pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 select-none text-center"
    >
      <div className="w-full space-y-8 sm:space-y-10">
        {/* HEADER SECTION */}
        <div className="space-y-2.5 text-center">
          <h1 className={`text-4xl sm:text-5xl font-light font-serif-italic transition-colors duration-300 ${titleColor}`}>
            Contact
          </h1>
          <p className={`text-xs sm:text-[13px] font-light leading-relaxed max-w-lg mx-auto transition-colors duration-300 ${subColor}`}>
            For readers, business inquiries, and collaboration opportunities, please get in touch using the contact details below.
          </p>
        </div>

        {/* 2-COLUMN SIDE-BY-SIDE LAYOUT: LEFT = EDITORIAL TEXT, RIGHT = MESSAGE FORM BOX */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start text-left">
          {/* LEFT COLUMN: EDITORIAL DETAILS */}
          <div className={`space-y-4 sm:space-y-5 text-xs sm:text-[13px] leading-relaxed font-light ${textColor}`}>
            {/* For reader messages */}
            <div className="space-y-1">
              <h2 className={`text-xs uppercase tracking-[0.2em] font-semibold ${headingColor}`}>
                For reader messages
              </h2>
              <p>
                I&apos;d love to hear from readers. For general messages, thoughts about my books, and reading-related inquiries, you can reach me at:
              </p>
              <p className="pt-0.5">
                <a
                  href="mailto:aravehere@gmail.com"
                  className={`inline-block font-medium underline underline-offset-4 transition-colors ${
                    isWhite ? 'text-black hover:text-zinc-600' : 'text-white hover:text-zinc-300'
                  }`}
                >
                  aravehere@gmail.com
                </a>
              </p>
            </div>

            {/* For literary and translation rights */}
            <div className="space-y-1">
              <h2 className={`text-xs uppercase tracking-[0.2em] font-semibold ${headingColor}`}>
                For literary and translation rights
              </h2>
              <p>
                For inquiries regarding foreign translation rights, publishing opportunities, or other literary matters, please contact me directly at the email address above.
              </p>
            </div>

            {/* For everything else */}
            <div className="space-y-1">
              <h2 className={`text-xs uppercase tracking-[0.2em] font-semibold ${headingColor}`}>
                For everything else
              </h2>
              <p>
                For any other questions or inquiries, feel free to get in touch. I&apos;ll do my best to respond as soon as possible.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: SEND A DIRECT MESSAGE FORM BOX */}
          <div className="w-full">
            {contactSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 sm:p-8 border rounded-2xl text-center flex flex-col items-center justify-center space-y-3 w-full transition-colors duration-300 ${cardBg}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${isWhite ? 'bg-zinc-100 border-zinc-300 text-black' : 'bg-white/5 border-white/10 text-white'}`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className={`text-base font-light tracking-wide ${titleColor}`}>
                    Message Sent Successfully
                  </h3>
                  <p className={`text-xs font-light max-w-sm mx-auto leading-relaxed ${subColor}`}>
                    Thank you for reaching out! Your message has been sent. I will get back to you as soon as possible.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.removeItem('arave_contact_submitted');
                    setContactSubmitted(false);
                  }}
                  className={`pt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer ${subColor}`}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <div className="w-full space-y-1">
                <h2 className={`text-xs uppercase tracking-[0.2em] font-semibold ${headingColor}`}>
                  Send a direct message
                </h2>

                <form onSubmit={handleContactSubmit} className="space-y-3 pt-1 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs border rounded-md focus:outline-none transition-colors ${inputBg}`}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs border rounded-md focus:outline-none transition-colors ${inputBg}`}
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs border rounded-md focus:outline-none transition-colors resize-none ${inputBg}`}
                  />
                  {submitError && (
                    <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-xs font-medium text-center">
                      {submitError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-2.5 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all rounded-md text-xs font-semibold cursor-pointer shadow-sm ${btnBg}`}
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
        </div>

        {/* CENTERED SIGN-OFF SECTION */}
        <div className="pt-2 text-center space-y-1">
          <p className={`text-xs sm:text-[13px] font-light ${subColor}`}>
            Thank you for being here and supporting my work.
          </p>
          <p className={`tracking-wider ${headingColor} flex items-center justify-center space-x-1.5 pt-0.5`}>
            <span className="text-base sm:text-lg select-none">~</span>
            <span className="font-serif-italic text-2xl sm:text-3xl font-normal inline-block">Aravé S.</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
