import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface FaqsPageProps {
  isVisible: boolean;
  isWhite?: boolean;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FaqsPage: React.FC<FaqsPageProps> = ({
  isVisible,
  isWhite = false,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 'faq-araverse',
      question: 'What is the #AraVerse?',
      answer:
        'The #AraVerse is the broader storytelling universe crafted by Aravé S., characterized by poetic angst, morally complex characters, deep desi cultural roots, and immersive, atmospheric romance.',
    },
    {
      id: 'faq-standalone',
      question: 'Can all the books be read as standalones?',
      answer:
        'Yes. All books in the #AraVerse- including standalone novels & series. All are written so that each story can be experienced and enjoyed on its own without requiring you to read any other book.',
    },
    {
      id: 'faq-where-to-read',
      question: 'Where can I read your stories right now?',
      answer:
        'Current chapters and releases are published serialized directly on Wattpad (@Araveink) and Stck.me (skxielol.stck.me). Direct reading links are available on the home page and in the Books section.',
    },

    {
      id: 'faq-amazon-paperback',
      question: 'Will your books be available on Amazon, Kindle, or in paperback?',
      answer:
        'Currently, stories are published serialized directly on Wattpad and Stck.me. Official releases on Amazon (Kindle and paperback) are planned for the future, but will not be available anytime soon.',
    },
    {
      id: 'faq-maturity-rating',
      question: 'What is the age rating and maturity level of your books?',
      answer:
        'All stories are intended strictly for mature readers (18+). They feature explicit romantic content, intense power dynamics, dark themes, and emotional angst. Reader discretion is strongly advised.',
    },
    {
      id: 'faq-trigger-warnings',
      question: 'Where can I find content and trigger warnings?',
      answer:
        'Book-level content warnings can be found directly on each book\'s individual page in the Books section. In addition, specific trigger warnings are provided before each individual chapter across all platforms.',
    },
  ];

  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const dividerColor = isWhite ? 'border-zinc-200' : 'border-zinc-800/80';
  const answerColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto min-h-screen pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-6 flex flex-col justify-start relative z-10"
    >
      <div className="space-y-8 text-center w-full">
        {/* HEADER SECTION */}
        <div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight transition-colors duration-300 ${titleColor}`}>
            Frequently Asked Questions
          </h1>
        </div>

        {/* ACCORDION FAQ ITEMS (CLEAN DIVIDER ROWS - ACCURATELY ALIGNED) */}
        <div className="text-left w-full pt-2">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`w-full border-b ${dividerColor} transition-colors`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between py-4 sm:py-4.5 text-left cursor-pointer group focus:outline-none select-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-xs sm:text-sm md:text-[15px] font-medium tracking-wide transition-colors duration-200 pr-4 leading-snug ${
                      isOpen
                        ? isWhite
                          ? 'text-zinc-950 font-semibold'
                          : 'text-white font-semibold'
                        : isWhite
                        ? 'text-zinc-800 group-hover:text-black'
                        : 'text-zinc-300 group-hover:text-white'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? isWhite
                          ? 'rotate-180 text-pink-500'
                          : 'rotate-180 text-pink-400'
                        : isWhite
                        ? 'text-zinc-400 group-hover:text-zinc-700'
                        : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className={`pb-5 pt-1 text-xs sm:text-sm font-light leading-relaxed ${answerColor}`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
