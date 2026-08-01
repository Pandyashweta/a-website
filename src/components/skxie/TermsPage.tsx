import React from 'react';
import { motion } from 'motion/react';

interface TermsPageProps {
  isVisible: boolean;
}

export const TermsPage: React.FC<TermsPageProps> = ({ isVisible }) => {
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
            Terms & Conditions
          </h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
            Last Updated: August 1, 2026
          </p>
        </div>

        <div className="text-zinc-400 text-xs sm:text-sm leading-relaxed space-y-4 font-light text-justify">
          <p>
            Welcome to <strong>Skxie</strong> ("Website," "we," "our," or "us"). By accessing or using this website, you agree to these Terms & Conditions. If you do not agree with these terms, please do not use this website.
          </p>

          <hr className="border-[#222228]/40 my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white tracking-wide">1. About the Website</h3>
            <p>
              Skxie is a personal author website that shares information about books, writing, projects, and related content. The website may include links to third-party platforms where books or other content are published or sold.
            </p>
            <p>
              This website is intended for informational purposes only.
            </p>
          </div>

          <hr className="border-[#222228]/40 my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white tracking-wide">2. Acceptance of Terms</h3>
            <p>
              By accessing or using this website, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions and our Privacy Policy.
            </p>
          </div>

          <hr className="border-[#222228]/40 my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white tracking-wide">3. Intellectual Property</h3>
            <p>
              Unless otherwise stated, all content available on this website - including but not limited to:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-zinc-400">
              <li>Book titles</li>
              <li>Original writing</li>
              <li>Articles</li>
              <li>Images created by us</li>
              <li>Graphics</li>
              <li>Logos</li>
              <li>Website design</li>
              <li>Branding</li>
              <li>Text</li>
              <li>Layout</li>
              <li>Original artwork</li>
            </ul>
            <p>
              is owned by or licensed to Skxie and is protected by applicable copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may view, download, or print content for your personal, non-commercial use only.
            </p>
            <p className="font-semibold text-zinc-300">You may not:</p>
            <ul className="list-disc pl-4 space-y-1 text-zinc-400">
              <li>Copy or reproduce website content without permission.</li>
              <li>Republish or distribute content.</li>
              <li>Sell, license, or commercially exploit any material from this website.</li>
              <li>Modify or create derivative works from our content without written permission.</li>
            </ul>
          </div>

          <hr className="border-[#222228]/40 my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white tracking-wide">4. Books and External Platforms</h3>
            <p>
              Books featured on this website may be available through third-party publishing or retail platforms.
            </p>
            <p>
              Any purchases, payments, shipping, downloads, refunds, or customer support related to those platforms are handled solely by the respective third party under their own terms and policies.
            </p>
            <p>
              Skxie is not responsible for transactions completed on external websites.
            </p>
          </div>

          <hr className="border-[#222228]/40 my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white tracking-wide">5. User Conduct</h3>
            <p>You agree not to:</p>
            <ul className="list-disc pl-4 space-y-1 text-zinc-400">
              <li>Use this website for unlawful purposes.</li>
              <li>Attempt to gain unauthorized access to the website or its servers.</li>
              <li>Distribute malware, viruses, or malicious software.</li>
              <li>Interfere with the operation or security of the website.</li>
              <li>Copy or scrape website content in violation of applicable laws.</li>
            </ul>
          </div>

          <hr className="border-[#222228]/40 my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white tracking-wide">6. Accuracy of Information</h3>
            <p>
              We strive to keep the information on this website accurate and up to date.
            </p>
            <p>
              However, we do not guarantee that all information is complete, accurate, current, or free from errors. Content may be updated, modified, or removed at any time without prior notice.
            </p>
          </div>

          <hr className="border-[#222228]/40 my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white tracking-wide">7. External Links</h3>
            <p>
              This website may contain links to third-party websites for your convenience.
            </p>
            <p>
              We do not own, control, or endorse those websites and are not responsible for their content, privacy practices, availability, or services.
            </p>
            <p>
              Your use of third-party websites is entirely at your own risk.
            </p>
          </div>

          <hr className="border-[#222228]/40 my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white tracking-wide">8. Disclaimer</h3>
            <p>
              All content provided on this website is offered "as is" and "as available" without warranties of any kind, whether express or implied.
            </p>
            <p>
              To the fullest extent permitted by law, we disclaim all warranties, including but not limited to:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-zinc-400">
              <li>Merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Continuous availability</li>
              <li>Accuracy or completeness of content</li>
            </ul>
          </div>

          <hr className="border-[#222228]/40 my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white tracking-wide">9. Limitation of Liability</h3>
            <p>
              To the fullest extent permitted by applicable law, Skxie shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising out of or related to:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-zinc-400">
              <li>Your use of this website.</li>
              <li>Your inability to access the website.</li>
              <li>Errors or omissions in the content.</li>
              <li>Reliance on information provided on the website.</li>
              <li>Your use of third-party websites linked from this website.</li>
            </ul>
          </div>

          <hr className="border-[#222228]/40 my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white tracking-wide">10. Privacy</h3>
            <p>
              Your use of this website is also governed by our Privacy Policy, which explains how personal information is collected and used.
            </p>
          </div>

          <hr className="border-[#222228]/40 my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white tracking-wide">11. Changes to These Terms</h3>
            <p>
              We reserve the right to modify or update these Terms & Conditions at any time.
            </p>
            <p>
              Changes become effective immediately upon publication on this page. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.
            </p>
          </div>

          <hr className="border-[#222228]/40 my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white tracking-wide">12. Governing Law</h3>
            <p>
              These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India, without regard to conflict of law principles.
            </p>
            <p>
              Any disputes arising from these Terms shall be subject to the jurisdiction of the competent courts in India.
            </p>
          </div>

          <hr className="border-[#222228]/40 my-4" />

          <div className="space-y-2 pb-4">
            <h3 className="text-sm font-medium text-white tracking-wide">13. Contact</h3>
            <p>
              If you have any questions regarding these Terms & Conditions, please contact:
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
