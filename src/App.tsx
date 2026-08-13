import React, { useState, useEffect } from 'react';
import { Header, Footer, VideoBackground, CookieBanner } from './components/layout';
import {
  HomePage,
  BooksPage,
  GalleryPage,
  AboutPage,
  ContactPage,
  NewsletterPage,
  LegalPage,
  NotFoundPage,
} from './pages';
import { navItemsData, socialsData } from './data';
import { NavItem, SocialItem } from './types';

export default function App() {
  type ViewType = 'home' | 'books' | 'gallery' | 'about' | 'faqs' | 'contact' | 'newsletter' | 'legal' | 'privacy' | 'terms' | 'cookies' | '404';

  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [bgMode, setBgMode] = useState<'black' | 'white'>('white');
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  // Track scroll position to hide video background when scrolling down on HomePage
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Client-side URL Path Routing handling
  useEffect(() => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    if (!path) return;

    const validViews: Record<string, ViewType> = {
      books: 'books',
      gallery: 'gallery',
      gallary: 'gallery',
      about: 'about',
      faqs: 'about',
      contact: 'contact',
      newsletter: 'newsletter',
      legal: 'legal',
      privacy: 'privacy',
      terms: 'terms',
      cookies: 'cookies',
    };

    if (validViews[path]) {
      setCurrentView(validViews[path]);
    } else {
      setCurrentView('404');
    }
  }, []);

  // Dynamic Browser Tab Titles for SEO and User Experience
  useEffect(() => {
    const titleMap: Record<ViewType, string> = {
      home: 'skxie',
      books: 'Books - skxie',
      gallery: 'Gallery - skxie',
      about: 'About - skxie',
      faqs: 'About - skxie',
      contact: 'Contact - skxie',
      newsletter: 'Newsletter - skxie',
      legal: 'Legal - skxie',
      privacy: 'Privacy Policy - skxie',
      terms: 'Terms & Conditions - skxie',
      cookies: 'Cookie Policy - skxie',
      '404': '404 Page Not Found - skxie',
    };
    document.title = titleMap[currentView] || 'skxie';
  }, [currentView]);

  const [navItems] = useState<NavItem[]>(navItemsData);
  const [skxieSocials] = useState<SocialItem[]>(socialsData);

  const isWhite = bgMode === 'white';

  return (
    <div
      className={`min-h-screen font-sans antialiased relative overflow-x-hidden transition-colors duration-500 selection:bg-[#33333E] selection:text-white ${
        isWhite ? 'bg-white text-zinc-900' : 'bg-[#0A0A0B] text-[#D1D1D1]'
      }`}
    >
      {/* BACKGROUND VIDEO ANIMATION */}
      <VideoBackground
        bgMode={bgMode}
        isHomePage={currentView === 'home'}
        isScrolledDown={isScrolledDown}
      />

      {/* HEADER */}
      <Header
        navItems={navItems}
        isWhite={isWhite}
        onNavClick={(id) => setCurrentView(id as ViewType)}
        onLogoClick={() => setCurrentView('home')}
      />

      {/* MAIN BODY PAGES WITH DYNAMIC THEME PROP */}
      {currentView === 'home' && (
        <HomePage
          isWhite={isWhite}
          onBookSelect={() => setCurrentView('books')}
        />
      )}
      {currentView === 'books' && <BooksPage isVisible={true} isWhite={isWhite} />}
      {currentView === 'gallery' && <GalleryPage isVisible={true} isWhite={isWhite} bgMode={bgMode} />}
      {(currentView === 'about' || currentView === 'faqs') && (
        <AboutPage isVisible={true} isWhite={isWhite} />
      )}
      {currentView === 'contact' && (
        <ContactPage isVisible={true} isWhite={isWhite} />
      )}
      {currentView === 'newsletter' && (
        <NewsletterPage isVisible={true} isWhite={isWhite} />
      )}
      {currentView === 'legal' && (
        <LegalPage isVisible={true} initialTab="privacy" isWhite={isWhite} />
      )}
      {currentView === 'privacy' && (
        <LegalPage isVisible={true} initialTab="privacy" isWhite={isWhite} />
      )}
      {currentView === 'terms' && (
        <LegalPage isVisible={true} initialTab="terms" isWhite={isWhite} />
      )}
      {currentView === 'cookies' && (
        <LegalPage isVisible={true} initialTab="cookies" isWhite={isWhite} />
      )}
      {currentView === '404' && (
        <NotFoundPage
          isVisible={true}
          onGoHome={() => setCurrentView('home')}
          onGoContact={() => setCurrentView('contact')}
          amazonUrl="https://amazon.com/author/skxie"
        />
      )}

      {/* FOOTER WITH ANIMATED DISPLAY TOGGLE (VIDEO DEFAULT -> WHITE -> BLACK) */}
      <Footer
        skxieSocials={skxieSocials}
        bgMode={bgMode}
        onBgModeChange={(mode) => setBgMode(mode)}
        onLegalClick={() => setCurrentView('legal')}
        onContactClick={() => setCurrentView('contact')}
      />

      {/* COOKIE CONSENT BANNER */}
      <CookieBanner 
        onNavigateToPrivacy={() => setCurrentView('privacy')} 
        onNavigateToCookiePolicy={() => setCurrentView('cookies')}
      />
    </div>
  );
}
