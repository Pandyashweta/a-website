import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Home, Mail } from 'lucide-react';

interface NotFoundPageProps {
  isVisible: boolean;
  isWhite?: boolean;
  onGoHome: () => void;
  onGoBooks?: () => void;
  onGoContact?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  isVisible,
  isWhite = false,
  onGoHome,
  onGoBooks,
  onGoContact,
}) => {
  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const subtextColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';
  const primaryBtnClass = isWhite
    ? 'bg-black text-white hover:bg-zinc-800 border-black'
    : 'bg-white text-black hover:bg-zinc-200 border-white';
  const secondaryBtnClass = isWhite
    ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300'
    : 'bg-[#16161D] hover:bg-[#22222C] text-zinc-200 hover:text-white border border-[#2A2A36]';

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
          <h1 className={`text-4xl sm:text-5xl font-light font-serif-italic transition-colors duration-300 ${titleColor}`}>
            Page Not Found
          </h1>
        </div>

        <p className={`text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto transition-colors duration-300 ${subtextColor}`}>
          The page or chapter you are looking for doesn't exist, has been moved, or is currently being rewritten.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <button
            type="button"
            onClick={onGoHome}
            className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 transition-all rounded-xl text-xs font-semibold cursor-pointer border ${primaryBtnClass}`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </button>

          {onGoBooks && (
            <button
              type="button"
              onClick={onGoBooks}
              className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 transition-all rounded-xl text-xs font-semibold cursor-pointer ${secondaryBtnClass}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Books</span>
            </button>
          )}

          {onGoContact && (
            <button
              type="button"
              onClick={onGoContact}
              className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 transition-all rounded-xl text-xs font-semibold cursor-pointer ${secondaryBtnClass}`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
