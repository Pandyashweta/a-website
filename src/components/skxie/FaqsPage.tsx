"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface FaqsPageProps {
  isVisible: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

export const FaqsPage: React.FC<FaqsPageProps> = ({ isVisible }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
      answer: "Subscribe to the newsletter directly from the Newsletter section in the header to receive official announcements, exclusive previews, and writing updates directly in your inbox."
    }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-5xl mx-auto min-h-screen pt-28 pb-32 px-6 flex flex-col justify-start relative z-10 select-none"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-500">
            Frequently Asked Questions
          </span>
          <h1 className="text-4xl font-light font-serif-italic italic text-white">
            FAQs
          </h1>
        </div>

        <div className="space-y-3 pt-2">
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
    </motion.div>
  );
};
