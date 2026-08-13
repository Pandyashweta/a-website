import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AboutPageProps {
  isVisible: boolean;
  isWhite?: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({ isVisible, isWhite = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const textColor = isWhite ? 'text-zinc-800' : 'text-zinc-300';
  const subtextColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';
  const signatureColor = isWhite ? 'text-zinc-900' : 'text-white';
  const cardBorder = isWhite ? 'border-zinc-300/80 bg-zinc-50/80' : 'border-[#22222A] bg-[#121216]/60';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-3xl mx-auto min-h-screen pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 text-center"
    >
      <div className="w-full space-y-12">
        {/* CENTERED BIO SECTION */}
        <div className="space-y-6">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-light font-serif-italic transition-colors duration-300 ${titleColor}`}>
            About the Author
          </h1>

          <div className={`text-xs sm:text-sm leading-relaxed space-y-4 font-light max-w-xl mx-auto text-center transition-colors duration-300 ${textColor}`}>
            <p>
              Hey there! I’m Skxie, and I love sharing my stories with you! I write in various genres, often inspired by my own experiences, while some tales are pure fiction.
            </p>
            <p>
              Writing is my passion, and I hope you enjoy my books just as much as I love creating them! Please forgive any grammar mistakes- I’m always working on improving my English.
            </p>
            <p>
              When I’m not writing, I’m juggling school and a full-time job, but I make time to update my work on Wattpad, Stck Me, and soon on Amazon. I can’t wait to share the many stories I have in mind!
            </p>
            <p>
              Thank you for your support and for reading my work. <br className="hidden sm:inline" />
              I truly appreciate you all!
            </p>
            <p className={`pt-2 font-medium leading-relaxed transition-colors duration-300 ${signatureColor}`}>
              Much love,<br />
              <span className="font-serif-italic text-2xl sm:text-3xl inline-block pt-1">Skxie!</span>
            </p>
          </div>
        </div>

        {/* A NOTE ABOUT MY WRITINGS COLLAPSIBLE ACCORDION */}
        <div className="w-full max-w-2xl mx-auto space-y-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full px-5 py-3.5 ${
              isWhite
                ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-zinc-300'
                : 'bg-[#2D2D32] hover:bg-[#383840] text-white border-zinc-700/50'
            } font-semibold text-xs uppercase tracking-[0.15em] flex items-center justify-between transition-colors rounded-sm cursor-pointer select-none border shadow-sm`}
          >
            <span>A NOTE ABOUT MY WRITINGS</span>
            <span className="text-base font-bold ml-2">
              {isOpen ? '−' : '+'}
            </span>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className={`p-6 sm:p-8 rounded-sm border ${cardBorder} text-center space-y-4`}>
                  <p className="italic text-center text-amber-500/90 pb-1 text-xs sm:text-sm font-light">
                    "I know you guys won't read this section, but I'm sharing it anyway."
                  </p>
                  
                  <div className={`text-xs sm:text-sm leading-relaxed space-y-3.5 font-light text-center ${subtextColor}`}>
                    <p>
                      The books I write are works of fiction and are written for storytelling &amp; entertainment purposes. The original work by skxie is protected. Unauthorized copying or use of this content without permission is prohibited. Please do not steal or repost my work, I will appreciate it. I will take action against violations, so report any instances you see.
                    </p>
                    
                    <p>
                      All pictures, videos, and GIFs used in all books I write are for reference purposes only, and I do not own any of them, all rights belong to their respective owners.
                    </p>
                    
                    <p>
                      All characters, events, and situations are fictional and created by the author. Any resemblance to real persons or incidents is purely coincidental.
                    </p>
                    
                    <p>
                      Please excuse any grammatical or spelling errors in the story. My first languages are not English, Hindi, and Urdu. I'll provide translations whenever necessary. Please let me know if I make a mistake and point it out gently.
                    </p>
                    
                    <blockquote className="py-2 px-4 italic font-serif text-center border-y border-amber-500/30 my-2">
                      "Every author inspires everyone in one way or another, and I have nothing but love and respect for all the writers out there who create their own worlds that their readers can escape into."
                    </blockquote>
                    
                    <p>
                      This is my own little world- the stories I write I've poured my heart into, shaped by my own imagination and written with my own touch. While inspiration exists everywhere, this book is entirely my own, created with my own creativity and...
                    </p>
                    
                    <p className="pt-1 font-medium">
                      Thank you for giving my story a chance.<br />
                      I hope you'll stay until the very last page &lt;3
                    </p>
                    
                    <div className="pt-2 space-y-1 text-xs">
                      <p>Trigger warnings will be given.</p>
                      <p>Everything follows the guidelines of each platform I use.</p>
                      <p className="font-semibold text-rose-400">and yes... it's mature.</p>
                      <p className="font-medium">Reader discretion is advised.</p>
                    </div>
                    
                    <div className="pt-3 text-center space-y-1 font-serif-italic text-sm sm:text-base">
                      <p>To the reader, thank you for being here.</p>
                      <p className="text-zinc-500">. . .</p>
                      <p className="text-rose-400 font-semibold">Love you all!</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
