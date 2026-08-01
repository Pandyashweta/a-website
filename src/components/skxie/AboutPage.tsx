import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Send } from 'lucide-react';

interface AboutPageProps {
  isVisible: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

export const AboutPage: React.FC<AboutPageProps> = ({ isVisible }) => {
  const [activeTab, setActiveTab] = useState<string>('bio');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const faqs: FAQItem[] = [
    {
      question: "Where can I read your stories?",
      answer: "My books are available on Wattpad and Stck Me. You can access them using the links in the header!"
    },
    {
      question: "Are physical copies of your books available?",
      answer: "Yes, select releases are available in print. Please check the 'books' link in the header for the latest availability and purchasing options."
    },
    {
      question: "How can I get updates on new releases?",
      answer: "Subscribe to the newsletter at the bottom of this page to receive official announcements, exclusive previews, and writing updates directly in your inbox."
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        setContactSubmitted(false);
      }, 3000);
    }
  };

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
      className="w-full max-w-5xl mx-auto min-h-screen pt-28 pb-32 px-6 sm:px-12 flex flex-col md:flex-row gap-12 relative z-10 select-none"
    >
      {/* Sticky Left Sidebar Navigation (Tabs) */}
      <div className="w-full md:w-56 shrink-0 md:sticky md:top-28 h-fit space-y-6 hidden md:block">
        <div className="pt-2">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-500">
            About skxie
          </span>
        </div>
        <nav className="flex flex-col gap-2.5 items-start">
          {[
            { id: 'bio', label: 'Bio' },
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'faqs', label: 'FAQs' },
            { id: 'contact', label: 'Contact' },
            { id: 'newsletter', label: 'Newsletter' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setOpenFaqIndex(null); // Reset FAQ state on switch
              }}
              className={`w-fit px-0.5 py-1 text-left text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                activeTab === item.id
                  ? 'border-white text-white font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Right Column Content - Tabbed View */}
      <div className="flex-1 min-h-[40vh] flex flex-col justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Bio Section */}
            {activeTab === 'bio' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-light font-serif-italic italic text-white">
                  Bio
                </h2>
                <div className="text-zinc-400 text-sm leading-relaxed space-y-4 font-light">
                  <p>
                    skxie is a digital storyteller and novelist designing immersive tales of mystery, 
                    modern romance, and emotional vulnerability. Exploring the hidden corners of human 
                    connection, skxie builds worlds where secrets unravel and choices define destinies.
                  </p>
                  <p>
                    With a passion for engaging narrative arcs and multi-dimensional character dynamics, 
                    skxie's stories are written to keep readers engrossed from the very first page.
                  </p>
                </div>
              </div>
            )}

            {/* Privacy Policy Section */}
            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-light font-serif-italic italic text-white">
                  Privacy Policy
                </h2>
                <div className="text-zinc-400 text-xs leading-relaxed space-y-3 font-light">
                  <p>
                    Your privacy is paramount. This policy outlines how information is gathered and used 
                    when visiting this page or interacting with the newsletter.
                  </p>
                  <p>
                    <strong>Information Collection:</strong> The only personal information collected is 
                    your email address, and only when you voluntarily submit it to subscribe to the newsletter 
                    or send a message through the contact form.
                  </p>
                  <p>
                    <strong>Data Protection:</strong> We will never sell, lease, or distribute your email 
                    address to third parties. Information is stored securely and used solely to send updates, 
                    releases, or direct replies.
                  </p>
                </div>
              </div>
            )}

            {/* FAQs Section */}
            {activeTab === 'faqs' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-light font-serif-italic italic text-white">
                  FAQs
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-[#222228] rounded-xl overflow-hidden bg-[#121216]/30 backdrop-blur-sm transition-all duration-300"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <span className="text-xs tracking-wide font-medium">{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${
                            openFaqIndex === idx ? 'rotate-180 text-white' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openFaqIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-4 pb-4 text-zinc-400 text-xs font-light leading-relaxed border-t border-[#222228]/30 pt-2">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Section */}
            {activeTab === 'contact' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-light font-serif-italic italic text-white">
                  Contact
                </h2>
                <p className="text-zinc-400 text-xs font-light">
                  Have a question or looking to collaborate? Drop a message below or email directly at{' '}
                  <a href="mailto:skxie@contact.com" className="text-white hover:underline">
                    skxie@contact.com
                  </a>.
                </p>

                {contactSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-medium text-center"
                  >
                    Your message has been sent successfully. Thank you!
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="px-3.5 py-2.5 text-xs bg-[#070709] border border-[#222228]/70 focus:border-[#44444F] rounded-lg text-white focus:outline-none transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="px-3.5 py-2.5 text-xs bg-[#070709] border border-[#222228]/70 focus:border-[#44444F] rounded-lg text-white focus:outline-none transition-colors"
                      />
                    </div>
                    <textarea
                      placeholder="Your Message"
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#070709] border border-[#222228]/70 focus:border-[#44444F] rounded-lg text-white focus:outline-none transition-colors resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black hover:bg-[#E5E5E5] active:scale-95 transition-all rounded-lg text-xs font-medium cursor-pointer"
                    >
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Newsletter Section */}
            {activeTab === 'newsletter' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-light font-serif-italic italic text-white">
                  Newsletter
                </h2>
                <p className="text-zinc-400 text-xs font-light">
                  Join the inner circle. Subscribe to get updates on new chapters, publishing releases, 
                  and exclusive writing notes directly in your inbox.
                </p>

                {newsletterSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-medium text-center"
                  >
                    Thank you for subscribing! Welcome to the loop.
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 text-xs bg-[#070709] border border-[#222228]/70 focus:border-[#44444F] rounded-lg text-white focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-white text-black hover:bg-[#E5E5E5] active:scale-95 transition-all rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
