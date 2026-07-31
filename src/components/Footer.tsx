import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SocialItem } from '../types';
import { SolidIcon } from './SocialIcons';

interface FooterProps {
  isScrolled: boolean;
  skxieSocials: SocialItem[];
  extinctmuffinSocials: SocialItem[];
  onSocialClick: (social: SocialItem) => void;
}

export const Footer: React.FC<FooterProps> = ({
  isScrolled,
  skxieSocials,
  extinctmuffinSocials,
  onSocialClick,
}) => {
  const currentSocials = isScrolled ? extinctmuffinSocials : skxieSocials;
  const currentBrand = isScrolled ? 'extinctmuffin' : 'skxie';

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-20 px-6 sm:px-12 flex flex-row items-center justify-between bg-transparent border-none transition-colors duration-700 pointer-events-none">
      {/* SOCIAL LOGOS ONLY (Left Side Corner - Strictly Horizontal Row) */}
      <div className="flex flex-row items-center pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBrand + '-socials'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row items-center space-x-6 sm:space-x-8 flex-nowrap"
          >
            {currentSocials.map((social) => (
              <button
                key={social.id}
                onClick={() => onSocialClick(social)}
                aria-label={social.name}
                title={`${social.name} (${currentBrand})`}
                className="group relative p-1.5 transition-transform duration-200 hover:scale-125 focus:outline-none cursor-pointer flex-shrink-0"
              >
                <SolidIcon
                  type={social.icon}
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-200 opacity-90 group-hover:opacity-100 group-hover:drop-shadow-[0_2px_12px_rgba(255,255,255,0.6)]"
                  color="#FFFFFF"
                />
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right side corner kept clean */}
      <div className="pointer-events-none" />
    </footer>
  );
};
