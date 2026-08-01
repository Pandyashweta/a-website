import React, { useState } from 'react';
import { Header } from './components/shared/Header';
import { Footer } from './components/shared/Footer';
import { BlankCanvas } from './components/BlankCanvas';
import { SkyBackground } from './components/shared/SkyBackground';
import { AboutPage } from './components/skxie/AboutPage';
import { ContactPage } from './components/skxie/ContactPage';
import { NewsletterPage } from './components/skxie/NewsletterPage';
import { FaqsPage } from './components/skxie/FaqsPage';
import { PrivacyPage } from './components/skxie/PrivacyPage';
import { TermsPage } from './components/skxie/TermsPage';
import { NavItem, SocialItem } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'faqs' | 'contact' | 'newsletter' | 'privacy' | 'terms'>('home');

  // Navigation items for skxie: books, about, faqs, contact, newsletter
  const [navItems] = useState<NavItem[]>([
    { id: 'books', label: 'books', url: 'https://books.skxie.com' },
    { id: 'about', label: 'about', url: '#' },
    { id: 'faqs', label: 'faqs', url: '#' },
    { id: 'contact', label: 'contact', url: '#' },
    { id: 'newsletter', label: 'newsletter', url: '#' },
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
        onNavClick={(id) => setCurrentView(id)}
        onLogoClick={() => setCurrentView('home')}
      />

      {/* MAIN BODY CANVAS */}
      {currentView === 'home' && <BlankCanvas />}
      {currentView === 'about' && (
        <AboutPage isVisible={true} />
      )}
      {currentView === 'faqs' && (
        <FaqsPage isVisible={true} />
      )}
      {currentView === 'contact' && (
        <ContactPage isVisible={true} />
      )}
      {currentView === 'newsletter' && (
        <NewsletterPage isVisible={true} />
      )}
      {currentView === 'privacy' && (
        <PrivacyPage isVisible={true} />
      )}
      {currentView === 'terms' && (
        <TermsPage isVisible={true} />
      )}

      {/* FOOTER */}
      <Footer
        skxieSocials={skxieSocials}
        onPrivacyClick={() => setCurrentView('privacy')}
        onTermsClick={() => setCurrentView('terms')}
        onFaqsClick={() => setCurrentView('faqs')}
        onNewsletterClick={() => setCurrentView('newsletter')}
      />
    </div>
  );
}
