import React, { useState } from 'react';
import { Header } from './components/shared/Header';
import { Footer } from './components/shared/Footer';
import { BlankCanvas } from './components/BlankCanvas';
import { SkyBackground } from './components/shared/SkyBackground';
import { AboutPage } from './components/skxie/AboutPage';
import { NavItem, SocialItem } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');

  // Navigation items for skxie: books, about
  const [navItems] = useState<NavItem[]>([
    { id: 'books', label: 'books', url: 'https://books.skxie.com' },
    { id: 'about', label: 'about', url: '#' },
  ]);

  // Social Links for skxie: Insta, discord, email, amazon, goodreads, wattpad, stck-me
  const [skxieSocials] = useState<SocialItem[]>([
    { id: 'sk-insta', name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/skxie' },
    { id: 'sk-discord', name: 'Discord', icon: 'discord', url: 'https://discord.gg/skxie' },
    { id: 'sk-email', name: 'Email', icon: 'email', url: 'mailto:skxie@contact.com' },
    { id: 'sk-amazon', name: 'Amazon', icon: 'amazon', url: 'https://amazon.com/author/skxie' },
    { id: 'sk-goodreads', name: 'Goodreads', icon: 'goodreads', url: 'https://goodreads.com/skxie' },
    { id: 'sk-wattpad', name: 'Wattpad', icon: 'wattpad', url: 'https://wattpad.com/user/skxielol' },
    { id: 'sk-stck-me', name: 'Stck Me', icon: 'stck-me', url: 'https://skxielol.stck.me' },
  ]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#D1D1D1] font-sans antialiased selection:bg-[#222226] selection:text-white relative overflow-x-hidden">
      {/* AMBIENT SKY BACKGROUND ANIMATION */}
      <SkyBackground isNight={true} />

      {/* HEADER */}
      <Header
        navItems={navItems}
        onAboutClick={() => setCurrentView('about')}
        onLogoClick={() => setCurrentView('home')}
      />

      {/* MAIN BODY CANVAS */}
      {currentView === 'home' ? (
        <BlankCanvas />
      ) : (
        <AboutPage isVisible={currentView === 'about'} />
      )}

      {/* FOOTER */}
      <Footer skxieSocials={skxieSocials} />
    </div>
  );
}
