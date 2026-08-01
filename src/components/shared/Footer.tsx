import React from 'react';
import { SocialItem } from '../../types';
import { SolidIcon } from './SocialIcons';

interface FooterProps {
  skxieSocials: SocialItem[];
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ skxieSocials, onPrivacyClick, onTermsClick }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-20 px-6 sm:px-12 flex flex-row items-center justify-between bg-transparent border-none pointer-events-none">
      {/* SOCIAL LOGOS ONLY (Left Side Corner - Strictly Horizontal Row) */}
      <div className="flex flex-row items-center pointer-events-auto">
        <div className="flex flex-row items-center space-x-6 sm:space-x-8 flex-nowrap">
          {skxieSocials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              title={`${social.name} (skxie)`}
              className="group relative p-1.5 transition-transform duration-200 hover:scale-125 focus:outline-none cursor-pointer flex-shrink-0"
            >
              <SolidIcon
                type={social.icon}
                className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-200 opacity-90 group-hover:opacity-100 group-hover:drop-shadow-[0_2px_12px_rgba(255,255,255,0.6)]"
                color="#FFFFFF"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright Notice (Centered) */}
      <div className="pointer-events-auto text-[9px] sm:text-[10px] text-zinc-500 tracking-wider font-light hidden sm:block select-none">
        &copy; {new Date().getFullYear()} skxie. All Rights Reserved.
      </div>

      {/* Right side corner - Privacy Policy & Terms Links */}
      <div className="pointer-events-auto flex items-center space-x-3 sm:space-x-4">
        {onPrivacyClick && (
          <button
            onClick={onPrivacyClick}
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-[#AAAAAA] hover:text-white transition-colors duration-300 cursor-pointer focus:outline-none"
          >
            Privacy Policy
          </button>
        )}
        {onPrivacyClick && onTermsClick && (
          <span className="text-zinc-700 text-[9px] sm:text-[10px] select-none">|</span>
        )}
        {onTermsClick && (
          <button
            onClick={onTermsClick}
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-[#AAAAAA] hover:text-white transition-colors duration-300 cursor-pointer focus:outline-none"
          >
            Terms
          </button>
        )}
      </div>
    </footer>
  );
};
