import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavItem } from '../types';
import { ExtinctMuffinLogo } from './ExtinctMuffinLogo';

interface HeaderProps {
  isScrolled: boolean;
  navItems: NavItem[];
  onNavItemClick: (item: NavItem) => void;
  onBrandClick: (section: 'skxie' | 'extinctmuffin') => void;
}

export const Header: React.FC<HeaderProps> = ({
  isScrolled,
  navItems,
  onNavItemClick,
  onBrandClick,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 px-6 sm:px-12 flex items-center justify-between bg-transparent border-none transition-colors duration-700 pointer-events-none">
      {/* LEFT SIDE CORNER */}
      <div className="flex items-center pointer-events-auto">
        <AnimatePresence mode="wait">
          {!isScrolled ? (
            <motion.button
              key="brand-skxie-left"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onBrandClick('skxie')}
              className="text-2xl sm:text-3xl font-light font-serif-italic tracking-tight text-[#E5E5E5] hover:text-white transition-colors focus:outline-none cursor-pointer drop-shadow-md"
            >
              skxie
            </motion.button>
          ) : (
            <motion.div
              key="tagline-muffin-left"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center space-x-2"
            >
              <span className="text-sm sm:text-base font-medium font-serif-italic text-pink-300 drop-shadow-[0_2px_8px_rgba(255,182,193,0.6)]">
                hi, I am muffin
              </span>
              <span className="text-base animate-bounce">🧁</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT SIDE CORNER */}
      <div className="flex items-center justify-end pointer-events-auto">
        <AnimatePresence mode="wait">
          {!isScrolled ? (
            <motion.nav
              key="nav-links-right"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center space-x-6 sm:space-x-10"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavItemClick(item)}
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium text-[#AAAAAA] hover:text-white transition-colors duration-300 whitespace-nowrap cursor-pointer drop-shadow-sm"
                >
                  {item.label}
                </button>
              ))}
            </motion.nav>
          ) : (
            <motion.button
              key="brand-extinctmuffin-right"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onBrandClick('extinctmuffin')}
              className="hover:scale-105 transition-transform focus:outline-none cursor-pointer p-1"
              aria-label="extinctmuffin home"
            >
              <ExtinctMuffinLogo size="sm" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
