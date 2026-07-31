/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { Header } from './components/shared/Header';
import { Footer } from './components/shared/Footer';
import { BlankCanvas } from './components/BlankCanvas';
import { LinkModal } from './components/shared/LinkModal';
import { SkyBackground } from './components/shared/SkyBackground';
import { NavItem, SocialItem } from './types';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNight, setIsNight] = useState(true);
  const [activeModalItem, setActiveModalItem] = useState<{
    title: string;
    type: 'nav' | 'social';
    context: 'skxie' | 'extinctmuffin';
    url: string;
  } | null>(null);

  // Navigation items for skxie: books, wattpad, stck me
  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: 'books', label: 'books', url: 'https://books.skxie.com' },
    { id: 'wattpad', label: 'wattpad', url: 'https://wattpad.com/user/skxie' },
    { id: 'stck-me', label: 'stck me', url: 'https://stck.me/profile/skxie' },
  ]);

  // Social Links for skxie: Insta, discord, email
  const [skxieSocials, setSkxieSocials] = useState<SocialItem[]>([
    { id: 'sk-insta', name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/skxie' },
    { id: 'sk-discord', name: 'Discord', icon: 'discord', url: 'https://discord.gg/skxie' },
    { id: 'sk-email', name: 'Email', icon: 'email', url: 'mailto:skxie@contact.com' },
  ]);

  // Social Links for extinctmuffin
  const [extinctmuffinSocials, setExtinctmuffinSocials] = useState<SocialItem[]>([
    { id: 'em-insta', name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/extinctmuffin' },
    { id: 'em-discord', name: 'Discord', icon: 'discord', url: 'https://discord.gg/extinctmuffin' },
    { id: 'em-email', name: 'Email', icon: 'email', url: 'mailto:extinctmuffin@contact.com' },
  ]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.45;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll smoothly to section
  const handleScrollToSection = (section: 'skxie' | 'extinctmuffin') => {
    const elementId = section === 'skxie' ? 'section-skxie' : 'section-extinctmuffin';
    const elem = document.getElementById(elementId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Nav item click handler
  const handleNavItemClick = (item: NavItem) => {
    const currentContext = isScrolled ? 'extinctmuffin' : 'skxie';
    setActiveModalItem({
      title: item.label,
      type: 'nav',
      context: currentContext,
      url: item.url,
    });
  };

  // Social item click handler
  const handleSocialClick = (social: SocialItem) => {
    const currentContext = isScrolled ? 'extinctmuffin' : 'skxie';
    setActiveModalItem({
      title: social.name,
      type: 'social',
      context: currentContext,
      url: social.url,
    });
  };

  // Update URL if user saves in modal
  const handleSaveModalUrl = (newUrl: string) => {
    if (!activeModalItem) return;

    if (activeModalItem.type === 'nav') {
      setNavItems((prev) =>
        prev.map((item) =>
          item.label === activeModalItem.title ? { ...item, url: newUrl } : item
        )
      );
    } else if (activeModalItem.context === 'skxie') {
      setSkxieSocials((prev) =>
        prev.map((soc) =>
          soc.name === activeModalItem.title ? { ...soc, url: newUrl } : soc
        )
      );
    } else {
      setExtinctmuffinSocials((prev) =>
        prev.map((soc) =>
          soc.name === activeModalItem.title ? { ...soc, url: newUrl } : soc
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#D1D1D1] font-sans antialiased selection:bg-[#222226] selection:text-white relative overflow-x-hidden">
      {/* AMBIENT SKY BACKGROUND ANIMATION */}
      <SkyBackground isNight={isNight} isScrolled={isScrolled} />

      {/* DAY/NIGHT CELESTIAL TOGGLE SWITCH */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            key="day-night-toggle"
            onClick={() => setIsNight(!isNight)}
            className="fixed bottom-6 right-6 sm:right-12 z-50 p-3 rounded-full bg-[#16161A]/85 backdrop-blur-md border border-white/10 hover:border-white/20 text-white cursor-pointer pointer-events-auto shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex items-center justify-center select-none"
            title={`Switch to ${isNight ? 'Day' : 'Night'} Mode`}
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              {isNight ? (
                <Sun className="w-5 h-5 text-amber-400 fill-amber-400/20 animate-[spin_10s_linear_infinite]" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-300 fill-indigo-300/10" />
              )}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <Header
        isScrolled={isScrolled}
        navItems={navItems}
        onNavItemClick={handleNavItemClick}
        onBrandClick={handleScrollToSection}
      />

      {/* MAIN BODY CANVAS */}
      <BlankCanvas
        isScrolled={isScrolled}
        onScrollToSection={handleScrollToSection}
      />

      {/* FOOTER */}
      <Footer
        isScrolled={isScrolled}
        skxieSocials={skxieSocials}
        extinctmuffinSocials={extinctmuffinSocials}
        onSocialClick={handleSocialClick}
      />

      {/* LINK ACTION DIALOG */}
      <LinkModal
        isOpen={Boolean(activeModalItem)}
        onClose={() => setActiveModalItem(null)}
        activeItem={activeModalItem}
        onSaveUrl={handleSaveModalUrl}
      />
    </div>
  );
}
