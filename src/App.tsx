/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BlankCanvas } from './components/BlankCanvas';
import { LinkModal } from './components/LinkModal';
import { BackgroundVideo } from './components/BackgroundVideo';
import { NavItem, SocialItem } from './types';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
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
      {/* AMBIENT BACKGROUND VIDEO / ANIMATION WITH DYNAMIC THEME DUAL SCENARIOS */}
      <BackgroundVideo isScrolled={isScrolled} />

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
