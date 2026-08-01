import React, { useState } from 'react';
import { Header } from './components/shared/Header';
import { Footer } from './components/shared/Footer';
import { BlankCanvas } from './components/BlankCanvas';
import { SkyBackground } from './components/shared/SkyBackground';
import { AboutPage } from './components/skxie/AboutPage';
import { ContactPage } from './components/skxie/ContactPage';
import { NewsletterPage } from './components/skxie/NewsletterPage';
import { NavItem, SocialItem } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'contact' | 'newsletter'>('home');
  const [aboutActiveTab, setAboutActiveTab] = useState<string>('bio');

  // Navigation items for skxie: books, about, contact, newsletter
  const [navItems] = useState<NavItem[]>([
    { id: 'books', label: 'books', url: 'https://books.skxie.com' },
    { id: 'about', label: 'about', url: '#' },
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
        onNavClick={(id) => {
          setCurrentView(id);
          if (id === 'about') {
            setAboutActiveTab('bio');
          }
        }}
        onLogoClick={() => setCurrentView('home')}
      />

      {/* MAIN BODY CANVAS */}
      {currentView === 'home' && <BlankCanvas />}
      {currentView === 'about' && (
        <AboutPage
          isVisible={true}
          activeTab={aboutActiveTab}
          setActiveTab={setAboutActiveTab}
        />
      )}
      {currentView === 'contact' && (
        <ContactPage isVisible={true} />
      )}
      {currentView === 'newsletter' && (
        <NewsletterPage isVisible={true} />
      )}

      {/* FOOTER */}
      <Footer
        skxieSocials={skxieSocials}
        onPrivacyClick={() => {
          setCurrentView('about');
          setAboutActiveTab('privacy');
        }}
        onTermsClick={() => {
          setCurrentView('about');
          setAboutActiveTab('terms');
        }}
      />
    </div>
  );
}
