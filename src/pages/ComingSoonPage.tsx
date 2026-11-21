import React from 'react';
import { motion } from 'motion/react';

interface ComingSoonPageProps {
  isVisible: boolean;
  isWhite?: boolean;
  title?: string;
  badgeText?: string;
  description?: string;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  isVisible,
  isWhite = false,
  title = "Coming Soon",
  description,
}) => {
  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const textColor = isWhite ? 'text-zinc-700' : 'text-zinc-300';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto min-h-screen pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 text-center"
    >
      <div className="w-full space-y-6">

        {/* HEADER */}
        <div className="space-y-2">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight transition-colors duration-300 ${titleColor}`}>
            {title}
          </h1>
        </div>

        {/* DESCRIPTION */}
        <div className={`text-xs sm:text-sm leading-relaxed space-y-3 font-light max-w-lg mx-auto transition-colors duration-300 ${textColor}`}>
          {description ? (
            <p>{description}</p>
          ) : (
            <>
              <p>
                Official author profiles and book listings on Amazon and Goodreads will launch alongside upcoming publication schedules.
              </p>
              <p>
                In the meantime, you can dive straight into current stories and updates on Wattpad and Stck Me.
              </p>
            </>
          )}
        </div>

      </div>
    </motion.div>
  );
};
