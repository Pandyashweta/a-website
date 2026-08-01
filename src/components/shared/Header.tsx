import React from 'react';
import { NavItem } from '@/types';
import skxieLogo from '@/assets/skxie.png';

interface HeaderProps {
  navItems: NavItem[];
  onNavClick: (item: NavItem) => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ navItems, onNavClick, onLogoClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 px-6 sm:px-12 flex items-center justify-between bg-transparent border-none pointer-events-none">
      {/* LEFT SIDE CORNER */}
      <div className="flex items-center pointer-events-auto">
        <button
          onClick={onLogoClick}
          className="hover:opacity-80 active:scale-95 transition-all focus:outline-none cursor-pointer p-1"
          aria-label="Home"
        >
          <img
            src={skxieLogo.src}
            alt="skxie logo"
            width="160"
            height="40"
            className="h-8 sm:h-10 w-auto object-contain select-none filter drop-shadow-md"
          />
        </button>
      </div>

      {/* RIGHT SIDE CORNER */}
      <div className="flex items-center justify-end pointer-events-auto">
        <nav className="flex items-center space-x-6 sm:space-x-10">
          {navItems.map((item) => {
            if (item.url.startsWith('/')) {
              return (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item)}
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium text-[#AAAAAA] hover:text-white transition-colors duration-300 whitespace-nowrap cursor-pointer drop-shadow-sm focus:outline-none"
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
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium text-[#AAAAAA] hover:text-white transition-colors duration-300 whitespace-nowrap cursor-pointer drop-shadow-sm no-underline"
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
