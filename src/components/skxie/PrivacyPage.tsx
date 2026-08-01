import React from 'react';
import { motion } from 'motion/react';

interface PrivacyPageProps {
  isVisible: boolean;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <>
      {/* Top Gradient Fade to hide text scrolling under transparent header */}
      <div className="fixed top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#0A0A0B] via-[#0A0A0B]/95 to-transparent z-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-5xl mx-auto min-h-screen pt-28 pb-32 px-6 flex flex-col justify-start relative z-10 select-none"
      >
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-light font-serif-italic italic text-white">
            Privacy Policy
          </h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
            Last Updated: August 1, 2026
          </p>
        </div>

        <div className="text-zinc-400 text-xs sm:text-sm leading-relaxed space-y-4 font-light text-justify">
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
          </div>
        </div>
      </div>
    </motion.div>
  </>
  );
};
