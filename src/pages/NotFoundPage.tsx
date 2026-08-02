import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Home, Mail } from 'lucide-react';

interface NotFoundPageProps {
  isVisible: boolean;
  onGoHome: () => void;
  onGoContact: () => void;
  amazonUrl: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  isVisible,
  onGoHome,
  onGoContact,
  amazonUrl,
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto min-h-screen pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 select-none text-center"
    >
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-zinc-500">
            Error 404
          </span>
          <h1 className="text-4xl sm:text-5xl font-light font-serif-italic text-white">
            Page Not Found
          </h1>
        </div>

        <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto">
          The page or chapter you are looking for doesn't exist, has been moved, or is currently being rewritten.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 bg-white text-black hover:bg-zinc-200 transition-all rounded-xl text-xs font-semibold cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Main</span>
          </button>

          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 bg-[#16161D] hover:bg-[#22222C] text-zinc-300 hover:text-white transition-all rounded-xl text-xs font-semibold border border-[#2A2A36] cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Visit Amazon Author Page</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};
