import React from 'react';
import { motion } from 'motion/react';

interface TermsPageProps {
  isVisible: boolean;
  isEmbedded?: boolean;
  isWhite?: boolean;
}

export const TermsPage: React.FC<TermsPageProps> = ({ isVisible, isEmbedded = false, isWhite = false }) => {
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
            Terms & Conditions
          </h2>
        )}
        <p className={`text-[10px] uppercase tracking-[0.2em] ${dateColor}`}>
          Last Updated: August 1, 2026
        </p>
      </div>

      <div className={`text-xs sm:text-sm leading-relaxed space-y-4 ${subColor}`}>
        <div className="space-y-2">
          <p>
            Welcome to <strong>Skxie</strong> ("Website," "we," "our," or "us"). By accessing or using this website, you agree to these Terms & Conditions. If you do not agree with these terms, please do not use this website.
          </p>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>1. Acceptance of Terms</h3>
          <p>
            By using this website, you confirm that you are at least the age of majority in your jurisdiction, or that you are using the website with parental/guardian consent.
          </p>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>2. About the Website & Services</h3>
          <p>
            Skxie is a personal author website designed to provide updates, information, and links related to books, writing projects, and creative content.
          </p>
          <p>
            The website may link to third-party platforms (such as Amazon, Wattpad, Goodreads, or online retailers) where books or content can be read or purchased.
          </p>
          <p>
            We do not directly sell products, process payments, or store financial data on this website.
          </p>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>3. Intellectual Property Rights</h3>
          <p>
            All content on this website—including text, graphics, logos, images, book covers, excerpts, trademarks, and overall design—is the intellectual property of Skxie, unless otherwise stated.
          </p>
          <p>
            You may not copy, reproduce, distribute, modify, publish, transmit, or create derivative works from any content on this website without explicit written permission.
          </p>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>4. Permitted & Prohibited Uses</h3>
          <p>You agree to use this website only for lawful purposes. You agree NOT to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the website in any way that violates applicable local, national, or international laws</li>
            <li>Attempt to gain unauthorized access to any portion of the website, servers, or networks</li>
            <li>Use automated systems (bots, scrapers, crawlers) to extract data without permission</li>
            <li>Upload or transmit harmful code, viruses, or malicious software</li>
            <li>Misrepresent your identity or affiliation when contacting us</li>
          </ul>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>5. Third-Party Links & Content</h3>
          <p>
            This website contains links to external websites and services. These links are provided for convenience only.
          </p>
          <p>
            We do not control, endorse, or assume responsibility for the content, privacy policies, or practices of any third-party websites or services. Accessing third-party links is at your own risk.
          </p>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>6. Disclaimer of Warranties</h3>
          <p>
            This website and its content are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied.
          </p>
          <p>
            We do not guarantee that the website will be uninterrupted, error-free, secure, or free of viruses or other harmful components.
          </p>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>7. Limitation of Liability</h3>
          <p>
            To the fullest extent permitted by applicable law, Skxie shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access to or use of this website.
          </p>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>8. User Submissions & Communications</h3>
          <p>
            If you send us messages, emails, suggestions, or feedback, you agree that we may use such communications without obligation or compensation to you, subject to our Privacy Policy.
          </p>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>9. Modifications to Website & Terms</h3>
          <p>
            We reserve the right to modify, suspend, or discontinue any aspect of this website at any time without prior notice.
          </p>
          <p>
            We may update these Terms & Conditions periodically. Changes take effect upon posting. Continued use of the website after updates constitutes your agreement to the modified terms.
          </p>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>10. Termination</h3>
          <p>
            We reserve the right to restrict or terminate your access to the website at our sole discretion, without notice, if we believe you have violated these Terms & Conditions.
          </p>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>11. Governing Law</h3>
          <p>
            These Terms & Conditions are governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
          </p>
        </div>

        <div className="space-y-1.5">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>12. Severability</h3>
          <p>
            If any provision of these Terms & Conditions is found to be invalid or unenforceable, that provision shall be enforced to the maximum extent permissible, and the remaining provisions shall remain in full force and effect.
          </p>
        </div>

        <div className="space-y-1.5 pb-4">
          <h3 className={`text-sm tracking-wide ${headingColor}`}>13. Contact</h3>
          <p>
            If you have any questions regarding these Terms & Conditions, please contact:
          </p>
          <p className="mt-1">
            <strong>Email:</strong> <a href="mailto:skxielol@gmail.com" className="underline font-semibold">skxielol@gmail.com</a>
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
