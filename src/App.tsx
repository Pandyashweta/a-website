import React, { useState, useEffect } from 'react';
import { Header, Footer, VideoBackground, CookieBanner } from './components/layout';
import {
  HomePage,
  BooksPage,
  AboutPage,
  ContactPage,
  NewsletterPage,
  LegalPage,
  NotFoundPage,
  ArtBooksPage,
  MoodBoardPage,
  PlaylistPage,
  NotePage,
  FaqsPage,
  ComingSoonPage,
} from './pages';
import { navItemsData, socialsData } from './data';
import { NavItem, SocialItem } from './types';

type ViewType =
  | 'home'
  | 'books'
  | 'extras'
  | 'art-books'
  | 'book-art'
  | 'character-art'
  | 'art'
  | 'mood-board'
  | 'playlist'
  | 'content-warning'
  | 'reading-order'
  | 'about'
  | 'note'
  | 'faqs'
  | 'contact'
  | 'newsletter'
  | 'legal'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'coming-soon'
  | '404';

const validViews: Record<string, ViewType> = {
  books: 'books',
  about: 'about',
  note: 'note',
  notes: 'note',
  'author-note': 'note',
  faqs: 'faqs',
  faq: 'faqs',
  contact: 'contact',
  newsletter: 'newsletter',
  legal: 'legal',
  privacy: 'privacy',
  terms: 'terms',
  cookies: 'cookies',
  'art-books': 'book-art',
  artbooks: 'book-art',
  'book-art': 'book-art',
  bookart: 'book-art',
  'character-art': 'character-art',
  characterart: 'character-art',
  art: 'art',
  'art-gallery': 'art',
  artgallery: 'art',
  extras: 'art',
  'mood-board': 'mood-board',
  moodboard: 'mood-board',
  playlist: 'playlist',
  playlists: 'playlist',
  'content-warning': 'books',
  'content-warnings': 'books',
  'contentwarning': 'books',
  'contentwarnings': 'books',
  'reading-order': 'reading-order',
  'readingorder': 'reading-order',
  'coming-soon': 'coming-soon',
  comingsoon: 'coming-soon',
  amazon: 'coming-soon',
  goodreads: 'coming-soon',
};

const getInitialView = (): ViewType => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  const target = hash || path;
  if (target && validViews[target]) {
    return validViews[target];
  }
  return 'home';
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>(getInitialView);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [booksResetKey, setBooksResetKey] = useState(0);
  const [bgMode, setBgMode] = useState<'black' | 'white'>('white');
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  const navigateToView = (view: ViewType) => {
    setCurrentView(view);
    if (view === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const navigateToBooks = (bookId: string | null = null) => {
    setSelectedBookId(bookId);
    setBooksResetKey((prev) => prev + 1);
    setCurrentView('books');
    window.location.hash = 'books';
  };

  // Scroll to top immediately when currentView changes for smooth navigation
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView]);

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
    const handleRoute = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      const target = hash || path;
      if (target && validViews[target]) {
        setCurrentView(validViews[target]);
      } else if (!hash && (!path || path === 'index.html')) {
        setCurrentView('home');
      } else if (path && !validViews[path] && path !== 'index.html') {
        setCurrentView('404');
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  // Dynamic Browser Tab Titles for SEO and User Experience
  useEffect(() => {
    const titleMap: Record<ViewType, string> = {
      home: 'Aravé S.',
      books: 'Books - Aravé S.',
      extras: 'Extras - Aravé S.',
      'art-books': 'Art - Books (Coming Soon) - Aravé S.',
      'book-art': 'Art - Books (Coming Soon) - Aravé S.',
      'character-art': 'Character Art (Coming Soon) - Aravé S.',
      art: 'Art Gallery (Coming Soon) - Aravé S.',
      'mood-board': 'Mood Board - Aravé S.',
      playlist: 'Playlist - Aravé S.',
      'content-warning': 'Content Warnings - Aravé S.',
      'reading-order': 'Reading Order (Coming Soon) - Aravé S.',
      about: 'About - Aravé S.',
      note: "Authors' Note - Aravé S.",
      faqs: 'FAQs - Aravé S.',
      contact: 'Contact - Aravé S.',
      newsletter: 'Newsletter - Aravé S.',
      legal: 'Legal - Aravé S.',
      privacy: 'Privacy Policy - Aravé S.',
      terms: 'Terms & Conditions - Aravé S.',
      cookies: 'Cookie Policy - Aravé S.',
      'coming-soon': 'Coming Soon - Aravé S.',
      '404': '404 Page Not Found - Aravé S.',
    };
    document.title = titleMap[currentView] || 'Aravé S.';
  }, [currentView]);

  const navItems = navItemsData.filter((item) => item.id !== 'faqs' && item.id !== 'note');
  const araveSocials = socialsData;

  const isWhite = bgMode === 'white';

  return (
    <div
      className={`min-h-screen font-sans antialiased relative overflow-x-hidden transition-colors duration-500 selection:bg-[#33333E] selection:text-white ${
        currentView === 'contact' ? 'lg:h-screen lg:overflow-hidden' : ''
      } ${
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
        onNavClick={(id) => {
          if (id === 'books') {
            navigateToBooks(null);
            return;
          }
          navigateToView(id as ViewType);
        }}
        onLogoClick={() => {
          navigateToView('home');
        }}
      />

      {/* MAIN BODY PAGES WITH DYNAMIC THEME PROP */}
      {currentView === 'home' && (
        <HomePage
          isWhite={isWhite}
          onBookSelect={(book) => {
            if (book.id === 'coming-soon-mystery') {
              setCurrentView('coming-soon');
              window.location.hash = 'coming-soon';
            } else {
              navigateToBooks(book.id);
            }
          }}
          onComingSoonClick={() => {
            setCurrentView('coming-soon');
            window.location.hash = 'coming-soon';
          }}
        />
      )}
      {currentView === 'books' && (
        <BooksPage
          key={`books-${booksResetKey}`}
          isVisible={true}
          isWhite={isWhite}
          initialBookId={selectedBookId}
          onClearInitialBook={() => setSelectedBookId(null)}
        />
      )}
      {(currentView === 'art-books' ||
        currentView === 'book-art' ||
        currentView === 'character-art' ||
        currentView === 'art') && (
        <ArtBooksPage
          isVisible={true}
          isWhite={isWhite}
          bgMode={bgMode}
          initialCategory={
            currentView === 'character-art'
              ? 'Character Art'
              : currentView === 'art'
              ? 'All Art'
              : 'Book Art'
          }
        />
      )}
      {currentView === 'mood-board' && (
        <MoodBoardPage
          isVisible={true}
          isWhite={isWhite}
        />
      )}
      {currentView === 'playlist' && (
        <PlaylistPage
          isVisible={true}
          isWhite={isWhite}
        />
      )}

      {currentView === 'reading-order' && (
        <ComingSoonPage
          isVisible={true}
          isWhite={isWhite}
          title="Reading Order"
          description="The official reading order is coming soon as upcoming book releases are scheduled."
        />
      )}
      {currentView === 'about' && (
        <AboutPage
          isVisible={true}
          isWhite={isWhite}
          onNoteClick={() => navigateToView('note')}
        />
      )}
      {currentView === 'faqs' && (
        <FaqsPage
          isVisible={true}
          isWhite={isWhite}
        />
      )}
      {currentView === 'note' && (
        <NotePage
          isVisible={true}
          isWhite={isWhite}
          onBackToAbout={() => navigateToView('about')}
        />
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
      {currentView === 'coming-soon' && (
        <ComingSoonPage
          isVisible={true}
          isWhite={isWhite}
        />
      )}
      {currentView === '404' && (
        <NotFoundPage
          isVisible={true}
          isWhite={isWhite}
          onGoHome={() => setCurrentView('home')}
          onGoBooks={() => navigateToBooks(null)}
          onGoContact={() => navigateToView('contact')}
        />
      )}

      {/* FOOTER WITH ANIMATED DISPLAY TOGGLE (VIDEO DEFAULT -> WHITE -> BLACK) */}
      <Footer
        araveSocials={araveSocials}
        bgMode={bgMode}
        onBgModeChange={(mode) => setBgMode(mode)}
        onLegalClick={() => navigateToView('legal')}
        onContactClick={() => navigateToView('contact')}
        onFaqsClick={() => navigateToView('faqs')}
        onNewsletterClick={() => navigateToView('newsletter')}
        onComingSoonClick={() => navigateToView('coming-soon')}
      />

      {/* COOKIE CONSENT BANNER */}
      <CookieBanner 
        onNavigateToPrivacy={() => setCurrentView('privacy')} 
        onNavigateToCookiePolicy={() => setCurrentView('cookies')}
      />
    </div>
  );
}
