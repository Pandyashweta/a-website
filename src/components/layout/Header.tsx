import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { NavItem } from '../../types';

interface HeaderProps {
  navItems: NavItem[];
  isWhite?: boolean;
  onNavClick: (id: string) => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ navItems, isWhite = false, onNavClick, onLogoClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const navTextColor = isWhite
    ? 'text-zinc-800 hover:text-black font-semibold'
    : 'text-[#AAAAAA] hover:text-white font-medium';

  const topGradient = isWhite
    ? 'from-white via-white/85 to-transparent'
    : 'from-[#0A0A0B] via-[#0A0A0B]/85 to-transparent';

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      {/* GLOBAL TOP FADE-IN GRADIENT OVERLAY FOR HEADER & MOBILE READABILITY */}
      <div className={`fixed top-0 left-0 right-0 h-20 sm:h-24 md:h-28 bg-gradient-to-b ${topGradient} z-40 pointer-events-none transition-colors duration-300`} />

      <header className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 px-4 sm:px-5 md:px-6 flex items-center justify-between bg-transparent border-none pointer-events-none">
        {/* LEFT SIDE CORNER LOGO WITH SMOOTH ANIMATED LOGO SWITCHING */}
        <div className="flex items-center pointer-events-auto pl-2 sm:pl-3 md:pl-4 translate-y-2 sm:translate-y-2.5">
          <button
            onClick={onLogoClick}
            className="hover:opacity-80 active:scale-95 transition-all focus:outline-none cursor-pointer p-1"
            aria-label="Home"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isWhite ? 'black' : 'white'}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`font-serif-italic font-normal text-[37px] sm:text-[43px] md:text-[49px] leading-none select-none filter drop-shadow-sm inline-block ${
                  isWhite ? 'text-zinc-900' : 'text-white'
                }`}
              >
                Aravé S.
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* RIGHT SIDE CORNER NAV LINKS */}
        <div className="flex items-center justify-end pointer-events-auto">
          <nav className="flex items-center space-x-3 sm:space-x-6 md:space-x-10">
            {navItems
              .filter((item) => item.id !== 'faqs' && item.id !== 'note')
              .map((item) => {
              // SPECIAL HANDLING FOR EXTRAS DROPDOWN
              if (item.id === 'extras') {
                return (
                  <div
                    key={item.id}
                    ref={dropdownRef}
                    className="relative flex items-center"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      className={`inline-flex items-center text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.25em] md:tracking-[0.3em] transition-colors duration-300 whitespace-nowrap cursor-pointer focus:outline-none py-1.5 ${navTextColor}`}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* DROPDOWN MENU */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 3, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 2, scale: 0.98 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          className={`absolute top-full right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 pt-1.5 min-w-[124px] sm:min-w-[136px] z-50 text-center`}
                        >
                          <div
                            className={`py-2 px-1 text-center transition-colors duration-200 ${
                              isWhite
                                ? 'bg-white/95 backdrop-blur-md text-zinc-900'
                                : 'bg-[#0A0A0B]/95 backdrop-blur-md text-zinc-100'
                            }`}
                          >
                            <div className="space-y-1">
                              {/* ART GALLERY ITEM */}
                              <button
                                type="button"
                                onClick={() => {
                                  setIsDropdownOpen(false);
                                  onNavClick('art');
                                }}
                                className={`w-full text-center px-2 py-1.5 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 cursor-pointer focus:outline-none whitespace-nowrap block ${
                                  isWhite
                                    ? 'text-zinc-600 hover:text-black'
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                              >
                                Art gallery
                              </button>

                              {/* READING ORDER ITEM */}
                              <button
                                type="button"
                                onClick={() => {
                                  setIsDropdownOpen(false);
                                  onNavClick('reading-order');
                                }}
                                className={`w-full text-center px-2 py-1.5 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 cursor-pointer focus:outline-none whitespace-nowrap block ${
                                  isWhite
                                    ? 'text-zinc-600 hover:text-black'
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                              >
                                Reading order
                              </button>

                              {/* FAQS ITEM */}
                              <button
                                type="button"
                                onClick={() => {
                                  setIsDropdownOpen(false);
                                  onNavClick('faqs');
                                }}
                                className={`w-full text-center px-2 py-1.5 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 cursor-pointer focus:outline-none whitespace-nowrap block ${
                                  isWhite
                                    ? 'text-zinc-600 hover:text-black'
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                              >
                                FAQs
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isInternal =
                item.url === '#' ||
                item.id === 'books' ||
                item.id === 'about' ||
                item.id === 'contact' ||
                item.id === 'newsletter';

              if (isInternal) {
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavClick(item.id)}
                    className={`text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.25em] md:tracking-[0.3em] transition-colors duration-300 whitespace-nowrap cursor-pointer focus:outline-none ${navTextColor}`}
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.25em] md:tracking-[0.3em] transition-colors duration-300 whitespace-nowrap cursor-pointer no-underline ${navTextColor}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
};
