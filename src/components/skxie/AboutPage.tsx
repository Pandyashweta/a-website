import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Send } from 'lucide-react';

interface AboutPageProps {
  isVisible: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

export const AboutPage: React.FC<AboutPageProps> = ({ isVisible, activeTab, setActiveTab }) => {
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
      {/* Sticky Left/Top Sidebar Navigation (Tabs) */}
      <div className="w-full md:w-56 shrink-0 md:sticky md:top-28 h-fit space-y-4 md:space-y-6">
        <div className="pt-2 hidden md:block">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-500">
            About skxie
          </span>
        </div>
        <nav className="flex flex-row md:flex-col gap-4 md:gap-2.5 items-center md:items-start overflow-x-auto pb-3 md:pb-0 border-b border-[#222228]/40 md:border-none scrollbar-none">
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
              className={`px-0.5 py-1 text-left text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap border-b-2 ${
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
              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
                <div className="space-y-2">
                  <h2 className="text-3xl font-light font-serif-italic italic text-white">
                    Privacy Policy
                  </h2>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    Last Updated: August 1, 2026
                  </p>
                </div>

                <div className="text-zinc-400 text-xs leading-relaxed space-y-4 font-light text-justify">
                  <p>
                    Welcome to <strong>Skxie</strong> ("we," "our," or "us"). Your privacy is important to us. This Privacy Policy explains what information we collect, how we use it, and your rights when you visit our website.
                  </p>
                  <p>
                    By using this website, you agree to the practices described in this Privacy Policy.
                  </p>

                  <hr className="border-[#222228]/40 my-4" />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white tracking-wide">1. About This Website</h3>
                    <p>
                      Skxie is a personal author website created to share information about books, writing, projects, and related content. The website may also provide links to third-party platforms where books are published or sold.
                    </p>
                    <p>
                      This website does not directly sell books or process payments.
                    </p>
                  </div>

                  <hr className="border-[#222228]/40 my-4" />

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-white tracking-wide">2. Information We Collect</h3>
                    
                    <div className="space-y-1">
                      <h4 className="text-xs font-semibold text-zinc-300">Information You Voluntarily Provide</h4>
                      <p>
                        If you contact us by email, we may receive information that you choose to provide, including:
                      </p>
                      <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                        <li>Your name (if included)</li>
                        <li>Your email address</li>
                        <li>The contents of your message</li>
                        <li>Any other information you voluntarily send</li>
                      </ul>
                      <p>
                        We only use this information to respond to your inquiry or communicate with you.
                      </p>
                    </div>

                    <div className="space-y-1 pt-2">
                      <h4 className="text-xs font-semibold text-zinc-300">Automatically Collected Information</h4>
                      <p>
                        Like most websites, certain technical information may be collected automatically when you visit, including:
                      </p>
                      <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                        <li>IP address</li>
                        <li>Browser type</li>
                        <li>Device information</li>
                        <li>Operating system</li>
                        <li>Pages visited</li>
                        <li>Date and time of access</li>
                        <li>Referring website (if applicable)</li>
                      </ul>
                      <p>
                        This information is used for security, performance, and maintaining the website.
                      </p>
                      <p>
                        At this time, Skxie does <strong>not</strong> use Google Analytics or similar visitor analytics services. If analytics are added in the future, this Privacy Policy will be updated accordingly.
                      </p>
                    </div>
                  </div>

                  <hr className="border-[#222228]/40 my-4" />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white tracking-wide">3. Cookies</h3>
                    <p>
                      This website does not intentionally use cookies for advertising or visitor analytics.
                    </p>
                    <p>
                      However, our hosting provider (Vercel) and your web browser may use essential technical cookies or similar technologies necessary for website security, performance, and proper operation.
                    </p>
                    <p>
                      You can manage cookies through your browser settings.
                    </p>
                  </div>

                  <hr className="border-[#222228]/40 my-4" />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white tracking-wide">4. How We Use Your Information</h3>
                    <p>We may use information to:</p>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                      <li>Respond to inquiries</li>
                      <li>Maintain and improve the website</li>
                      <li>Protect the security and integrity of the website</li>
                      <li>Comply with legal obligations</li>
                      <li>Prevent misuse or unauthorized access</li>
                    </ul>
                    <p>We do not sell your personal information.</p>
                  </div>

                  <hr className="border-[#222228]/40 my-4" />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white tracking-wide">5. Third-Party Links</h3>
                    <p>
                      Our website may contain links to third-party websites, including online bookstores, publishing platforms, social media platforms, or other external services.
                    </p>
                    <p>
                      When you leave Skxie, the privacy practices of those websites are governed by their own privacy policies. We encourage you to review those policies before providing personal information.
                    </p>
                    <p>
                      We are not responsible for the privacy practices or content of third-party websites.
                    </p>
                  </div>

                  <hr className="border-[#222228]/40 my-4" />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white tracking-wide">6. Data Sharing</h3>
                    <p>We do not sell, rent, or trade your personal information.</p>
                    <p>We may disclose information only when:</p>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                      <li>Required by law</li>
                      <li>Necessary to protect our legal rights</li>
                      <li>Required to investigate fraud or security issues</li>
                      <li>Needed to comply with lawful governmental requests</li>
                    </ul>
                  </div>

                  <hr className="border-[#222228]/40 my-4" />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white tracking-wide">7. Data Security</h3>
                    <p>
                      We take reasonable measures to help protect information provided through this website.
                    </p>
                    <p>
                      However, no method of transmitting information over the Internet or storing electronic data is completely secure. While we strive to protect your information, we cannot guarantee absolute security.
                    </p>
                  </div>

                  <hr className="border-[#222228]/40 my-4" />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white tracking-wide">8. Data Retention</h3>
                    <p>
                      If you contact us, we may retain your communication only for as long as necessary to respond to your inquiry, maintain our records, comply with legal obligations, or resolve disputes.
                    </p>
                  </div>

                  <hr className="border-[#222228]/40 my-4" />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white tracking-wide">9. Children's Privacy</h3>
                    <p>
                      This website is not directed toward children under the age required by applicable law, and we do not knowingly collect personal information from children.
                    </p>
                    <p>
                      If you believe that a child has provided personal information, please contact us so we can remove it where appropriate.
                    </p>
                  </div>

                  <hr className="border-[#222228]/40 my-4" />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white tracking-wide">10. Your Rights</h3>
                    <p>
                      Depending on your location and applicable law, you may have rights regarding your personal information, including the right to:
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                      <li>Request access to your personal information</li>
                      <li>Request correction of inaccurate information</li>
                      <li>Request deletion of personal information where applicable</li>
                      <li>Object to certain processing activities</li>
                    </ul>
                    <p>
                      To exercise these rights, please contact us using the email address below.
                    </p>
                  </div>

                  <hr className="border-[#222228]/40 my-4" />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white tracking-wide">11. International Visitors</h3>
                    <p>
                      If you access this website from outside India, you understand that your information may be processed in India or in locations where our hosting providers operate.
                    </p>
                  </div>

                  <hr className="border-[#222228]/40 my-4" />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white tracking-wide">12. Changes to This Privacy Policy</h3>
                    <p>
                      We may update this Privacy Policy from time to time.
                    </p>
                    <p>
                      Any changes will be posted on this page with an updated "Last Updated" date. Continued use of the website after changes become effective constitutes acceptance of the revised Privacy Policy.
                    </p>
                  </div>

                  <hr className="border-[#222228]/40 my-4" />

                  <div className="space-y-2 pb-4">
                    <h3 className="text-sm font-medium text-white tracking-wide">13. Contact</h3>
                    <p>
                      If you have any questions regarding this Privacy Policy or your personal information, please contact:
                    </p>
                    <p className="mt-1">
                      <strong>Email:</strong> <a href="mailto:skxielol@gmail.com" className="text-white hover:underline">skxielol@gmail.com</a>
                    </p>
                    <p>
                      <strong>Website:</strong> <a href="https://skxie.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">https://skxie.vercel.app/</a>
                    </p>
                    <p className="pt-2 text-zinc-300 italic">
                      Thank you for visiting Skxie.
                    </p>
                  </div>
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
