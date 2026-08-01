import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';

interface ContactPageProps {
  isVisible: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({ isVisible }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setIsSubmitting(true);
      setSubmitError(null);

      const formUrl = import.meta.env.VITE_CONTACT_FORM_URL;

      try {
        if (!formUrl) {
          // If no form URL is configured yet, log a warning and fallback to local success simulation
          console.warn("VITE_CONTACT_FORM_URL is not configured in the environment. Simulating submission.");
          await new Promise((resolve) => setTimeout(resolve, 1500));
        } else {
          // Use FormData for seamless compatibility with Google Apps Script doPost parameters
          const formData = new FormData();
          formData.append('name', contactName);
          formData.append('email', contactEmail);
          formData.append('message', contactMessage);

          await fetch(formUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors', // Required for Google Apps Script redirects
          });
        }

        setContactSubmitted(true);
        setContactName('');
        setContactEmail('');
        setContactMessage('');

        setTimeout(() => {
          setContactSubmitted(false);
        }, 5000);
      } catch (err) {
        console.error("Form submission error:", err);
        setSubmitError("Failed to send message. Please try again or email directly.");
      } finally {
        setIsSubmitting(false);
      }
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
            Get in Touch
          </span>
          <h1 className="text-4xl font-light font-serif-italic italic text-white">
            Contact
          </h1>
        </div>

        <p className="text-zinc-400 text-sm font-light leading-relaxed">
          Have a question, feedback, or looking to collaborate? Drop a message below or email directly at{' '}
          <a href="mailto:skxielol@gmail.com" className="text-white hover:underline transition-all font-medium">
            skxielol@gmail.com
          </a>.
        </p>

        {contactSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-medium text-center"
          >
            Your message has been sent successfully. Thank you!
          </motion.div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="px-4 py-3 text-xs bg-[#070709] border border-[#222228]/70 focus:border-[#44444F] rounded-lg text-white focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="px-4 py-3 text-xs bg-[#070709] border border-[#222228]/70 focus:border-[#44444F] rounded-lg text-white focus:outline-none transition-colors"
              />
            </div>
            <textarea
              placeholder="Your Message"
              required
              rows={6}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              className="w-full px-4 py-3 text-xs bg-[#070709] border border-[#222228]/70 focus:border-[#44444F] rounded-lg text-white focus:outline-none transition-colors resize-none"
            />
            {submitError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-medium text-center">
                {submitError}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white text-black hover:bg-[#E5E5E5] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all rounded-lg text-xs font-medium cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span>Sending...</span>
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};
