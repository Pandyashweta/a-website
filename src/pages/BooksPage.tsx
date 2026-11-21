import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import {
  booksData,
  seriesData,
  standaloneBooks,
  toMrGeneralBook,
  BookItem,
  SeriesItem,
} from '../data';

interface BooksPageProps {
  isVisible: boolean;
  isWhite?: boolean;
  initialBookId?: string | null;
  onClearInitialBook?: () => void;
}

const renderFormattedBlurb = (text: string, titleColorClass: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className={`font-semibold ${titleColorClass}`}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export const BooksPage: React.FC<BooksPageProps> = ({
  isVisible,
  isWhite = false,
  initialBookId,
  onClearInitialBook,
}) => {
  const series = seriesData[0];

  const [selectedSeries, setSelectedSeries] = useState<SeriesItem | null>(() => {
    if (initialBookId) {
      const found = booksData.find((b) => b.id === initialBookId);
      if (found && found.series === 'Tales of Love') {
        return series;
      }
    }
    return null;
  });

  const [selectedBook, setSelectedBook] = useState<BookItem | null>(() => {
    if (initialBookId) {
      return booksData.find((b) => b.id === initialBookId) || null;
    }
    return null;
  });

  React.useEffect(() => {
    if (initialBookId) {
      const found = booksData.find((b) => b.id === initialBookId);
      if (found) {
        setSelectedBook(found);
        if (found.series === 'Tales of Love') {
          setSelectedSeries(series);
        } else {
          setSelectedSeries(null);
        }
      }
    }
  }, [initialBookId, series]);

  const handleBackToCatalog = () => {
    setSelectedBook(null);
    setSelectedSeries(null);
    onClearInitialBook?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSeries = () => {
    setSelectedBook(null);
    onClearInitialBook?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [openContentNotes, setOpenContentNotes] = useState<Record<string, boolean>>({});

  const pageTitleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const pageSubColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';

  const bookShadow = isWhite
    ? 'shadow-[0_14px_32px_rgba(0,0,0,0.22)] group-hover:shadow-[0_22px_48px_rgba(0,0,0,0.36)]'
    : 'shadow-[0_16px_40px_rgba(0,0,0,0.85)] group-hover:shadow-[0_26px_56px_rgba(0,0,0,1)]';

  const btnBg = isWhite
    ? 'bg-black text-white hover:bg-zinc-800 border-black'
    : 'bg-[#121216] text-white hover:bg-[#1C1C24] border-[#2A2A36]';

  const otherBooksInSeries = selectedBook && selectedBook.series
    ? booksData.filter((b) => b.series === selectedBook.series && b.id !== selectedBook.id)
    : [];

  const otherStandaloneBooks = selectedBook && !selectedBook.series
    ? standaloneBooks.filter((b) => b.id !== selectedBook.id && b.id !== 'coming-soon-mystery')
    : [];

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-[1400px] mx-auto min-h-screen pt-22 sm:pt-26 md:pt-26 pb-36 sm:pb-48 px-4 sm:px-8 md:px-12 relative z-10"
      >
        <AnimatePresence mode="wait">
          {/* ========================================================
              VIEW 1: MAIN BOOKS CATALOG (SERIES & STANDALONE SECTIONS)
              ======================================================== */}
          {!selectedSeries && !selectedBook && (
            <motion.div
              key="books-main-catalog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto pb-16"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-start justify-items-center">
                {/* COLUMN 1: TALES OF LOVE SERIES */}
                <div className="w-full flex flex-col items-center space-y-6 sm:space-y-8">
                  <div className="text-center pt-2 sm:pt-4 min-h-[58px] sm:min-h-[64px] flex flex-col justify-end space-y-1">
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight transition-colors duration-300 ${pageTitleColor}`}>
                      Tales of Love Series
                    </h2>
                    <p className={`text-xs sm:text-sm font-light tracking-wide ${pageSubColor}`}>
                      {series?.subtitle || 'The Seven stages of Dark side of Love'}
                    </p>
                  </div>

                  {series && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => {
                        setSelectedSeries(series);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group cursor-pointer w-full max-w-[280px] sm:max-w-[310px] md:max-w-[330px]"
                    >
                      <div className={`relative w-full aspect-[2/3] rounded-[2px] overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-2.5 ${bookShadow}`}>
                        <img
                          src={series.coverImage}
                          alt={series.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* COLUMN 2: MR. GENERAL */}
                <div className="w-full flex flex-col items-center space-y-6 sm:space-y-8">
                  <div className="text-center pt-2 sm:pt-4 min-h-[58px] sm:min-h-[64px] flex flex-col justify-end space-y-1">
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight transition-colors duration-300 ${pageTitleColor}`}>
                      Mr. General
                    </h2>
                    <p className={`text-xs sm:text-sm font-light tracking-wide ${pageSubColor}`}>
                      Can duty ever become love?
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                    onClick={() => {
                      setSelectedBook(toMrGeneralBook);
                      setSelectedSeries(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer w-full max-w-[280px] sm:max-w-[310px] md:max-w-[330px]"
                  >
                    <div className={`relative w-full aspect-[2/3] rounded-[2px] overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-2.5 ${bookShadow}`}>
                      <img
                        src={toMrGeneralBook.coverImage}
                        alt={toMrGeneralBook.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================
              VIEW 2: SERIES PAGE SHOWING ALL 7 BOOKS (RINA KENT STYLE)
              ======================================================== */}
          {selectedSeries && !selectedBook && (
            <motion.div
              key="series-all-books"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 sm:space-y-10 text-left"
            >
              {/* BACK BUTTON TO MAIN BOOKS CATALOG */}
              <button
                onClick={handleBackToCatalog}
                className={`inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer focus:outline-none ${pageSubColor} hover:${pageTitleColor}`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to books</span>
              </button>

              {/* SERIES HEADER */}
              <div className="text-center pt-1 pb-6 space-y-3 max-w-2xl mx-auto">
                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight transition-colors duration-300 ${pageTitleColor}`}>
                  Tales of Love Series
                </h1>
                <p className={`text-xs sm:text-sm font-light tracking-wide ${pageSubColor}`}>
                  {selectedSeries.subtitle || 'The Seven stages of Dark side of Love'}
                </p>
                <div className={`text-xs sm:text-sm font-light leading-relaxed pt-2 space-y-2.5 ${pageSubColor}`}>
                  <p>
                    <strong className={`font-semibold ${pageTitleColor}`}>Tales of Love</strong> is a seven-book dark romance series that takes us on a journey at the sides of love.
                  </p>
                  <p>
                    The whole book is set in a simple universe called <span className={`font-semibold ${pageTitleColor}`}>#AraVerse</span>. Each book is its own unique dark side of a love story.
                  </p>
                </div>
              </div>

              {/* 3-COLUMN 7-BOOK COVERS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-5xl mx-auto items-start justify-items-center">
                {selectedSeries.books.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedBook(book);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer w-full max-w-[310px] sm:max-w-[330px] md:max-w-[340px]"
                  >
                    <div className={`relative w-full aspect-[2/3] rounded-[2px] overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-2.5 ${bookShadow}`}>
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========================================================
              VIEW 3: INDIVIDUAL BOOK SHOWCASE PAGE
              ======================================================== */}
          {selectedBook && (
            <motion.div
              key={`individual-book-${selectedBook.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 text-left"
            >
              {/* BACK BUTTON */}
              <button
                onClick={selectedSeries ? handleBackToSeries : handleBackToCatalog}
                className={`inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer focus:outline-none ${pageSubColor} hover:${pageTitleColor}`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{selectedSeries ? 'Back to Tales of Love Series' : 'Back to books'}</span>
              </button>

              {/* TWO COLUMN INDIVIDUAL SHOWCASE FLEX LAYOUT */}
              <div className="flex flex-col md:flex-row gap-8 lg:gap-10 items-start">
                
                {/* LEFT COLUMN: CRISP COVER & STACKED BUY / AUDIO BUTTONS */}
                <div className="w-full md:w-[260px] lg:w-[280px] shrink-0 space-y-6 mx-auto md:mx-0">
                  {/* LARGE BOOK COVER */}
                  <div className={`w-full aspect-[2/3] rounded-[2px] overflow-hidden shadow-2xl ${bookShadow}`}>
                    <img
                      src={selectedBook.coverImage}
                      alt={selectedBook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* STACKED RECTANGULAR BUY / READ BUTTONS (IF AVAILABLE) */}
                  {selectedBook.status === 'To be announced' || selectedBook.status === 'TBA' || !selectedBook.buyLinks || selectedBook.buyLinks.length === 0 ? (
                    <div className={`w-full block py-3 px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-center rounded-sm shadow-sm select-none border ${btnBg}`}>
                      COMING SOON
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedBook.buyLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full block py-3 px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-center rounded-sm transition-all shadow-sm no-underline cursor-pointer border ${btnBg}`}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* LISTEN TO AUDIO SECTION (IF AVAILABLE) */}
                  {selectedBook.audioLinks && selectedBook.audioLinks.length > 0 && (
                    <div className="pt-4 border-t border-zinc-500/20 space-y-3">
                      <div className="space-y-1">
                        <h4 className={`text-xl font-serif-italic font-normal transition-colors ${pageTitleColor}`}>
                          Listen to audio
                        </h4>
                        {selectedBook.narrator && (
                          <p className={`text-xs font-serif italic ${pageSubColor}`}>
                            Narrated by: {selectedBook.narrator}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        {selectedBook.audioLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full block py-3 px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-center rounded-sm transition-all shadow-sm no-underline cursor-pointer border ${btnBg}`}
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN: BOOK TITLE, METADATA, BLURB & SERIES */}
                <div className="flex-1 min-w-0 space-y-6">
                  {/* TITLE */}
                  <div className="space-y-1">
                    {selectedBook.series && (
                      <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-amber-500 block">
                        {selectedBook.series}
                      </span>
                    )}
                    <h1 className={`text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight transition-colors ${pageTitleColor}`}>
                      {selectedBook.title}
                    </h1>
                    {selectedBook.subtitle && selectedBook.subtitle !== 'TBA' && (
                      <p className={`text-xs sm:text-sm font-light tracking-wide ${pageSubColor}`}>
                        {selectedBook.subtitle}
                      </p>
                    )}
                  </div>

                  {/* METADATA BLOCK */}
                  <div className="space-y-1.5 text-xs sm:text-sm font-light">
                    {selectedBook.series ? (
                      <p className={pageSubColor}>
                        <strong className={`font-semibold ${pageTitleColor}`}>Series:</strong> {selectedBook.series}
                      </p>
                    ) : (
                      <p className={pageSubColor}>
                        <strong className={`font-semibold ${pageTitleColor}`}>Type:</strong> Standalone Novel
                      </p>
                    )}
                    <p className={pageSubColor}>
                      <strong className={`font-semibold ${pageTitleColor}`}>Genre:</strong> {selectedBook.genre}
                    </p>
                    <p className={pageSubColor}>
                      <strong className={`font-semibold ${pageTitleColor}`}>Tropes:</strong>{' '}
                      <span className="text-amber-500 font-medium">
                        {selectedBook.tropes.join(', ')}
                      </span>
                    </p>
                    <p className={pageSubColor}>
                      <strong className={`font-semibold ${pageTitleColor}`}>Status / Release:</strong>{' '}
                      {selectedBook.status === selectedBook.releaseDate
                        ? selectedBook.status
                        : `${selectedBook.status} (${selectedBook.releaseDate})`}
                    </p>
                  </div>

                  {/* HOOK LINE */}
                  {selectedBook.hook && selectedBook.hook !== 'TBA' && (
                    <p className={`text-sm sm:text-base font-serif italic font-semibold leading-relaxed transition-colors ${pageTitleColor}`}>
                      "{selectedBook.hook}"
                    </p>
                  )}

                  {/* SYNOPSIS BLURB PARAGRAPHS */}
                  <div className="space-y-4 text-xs sm:text-sm font-light leading-relaxed">
                    {selectedBook.blurbParagraphs ? (
                      selectedBook.blurbParagraphs.map((para, idx) => {
                        const isItalic = para.startsWith('_') && para.endsWith('_');
                        const isUpdateNote = para.startsWith('UPDATES ON BOOK');
                        const cleanText = isItalic ? para.slice(1, -1) : para;

                        if (isUpdateNote) {
                          return (
                            <p key={idx} className={`font-semibold text-xs sm:text-sm tracking-wide pt-2 ${pageTitleColor}`}>
                              {cleanText}
                            </p>
                          );
                        }

                        if (isItalic) {
                          return (
                            <p key={idx} className={`font-serif italic font-normal text-sm sm:text-base ${pageTitleColor}`}>
                              {cleanText}
                            </p>
                          );
                        }

                        return (
                          <p key={idx} className={para.length < 40 ? `font-medium text-sm sm:text-base ${pageTitleColor}` : pageSubColor}>
                            {renderFormattedBlurb(cleanText, pageTitleColor)}
                          </p>
                        );
                      })
                    ) : (
                      <p className={pageSubColor}>{renderFormattedBlurb(selectedBook.description, pageTitleColor)}</p>
                    )}
                  </div>

                  {/* DIRECT READING / PLATFORM LINKS UNDERNEATH BLURB */}
                  {selectedBook.buyLinks && selectedBook.buyLinks.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {selectedBook.buyLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center space-x-2 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all shadow-sm no-underline cursor-pointer border ${btnBg}`}
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* CONTENT WARNINGS ACCORDION BAR (IF AVAILABLE) */}
                  {selectedBook.contentNotes && selectedBook.contentNotes.length > 0 && (
                    <div className="pt-4 border-t border-zinc-500/20">
                      <div className="w-full space-y-2">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenContentNotes((prev) => ({
                              ...prev,
                              [selectedBook.id]: !prev[selectedBook.id],
                            }))
                          }
                          className="w-full px-4 py-3 bg-[#2D2D32] hover:bg-[#383840] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-colors rounded-sm cursor-pointer select-none border border-zinc-700/50 shadow-sm"
                        >
                          <span>CONTENT WARNINGS</span>
                          <span className="text-base font-bold">
                            {openContentNotes[selectedBook.id] ? '−' : '+'}
                          </span>
                        </button>

                        <AnimatePresence>
                          {openContentNotes[selectedBook.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden pl-4 pr-2 pt-2 pb-3"
                            >
                              <ul className={`list-disc list-inside space-y-1.5 text-xs sm:text-sm font-light ${pageSubColor}`}>
                                {selectedBook.contentNotes.map((note, idx) => (
                                  <li key={idx}>{note}</li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* PINTEREST MOODBOARD LINK SECTION */}
                  {selectedBook.id === 'to-mr-general' && (
                    <div className="pt-6 border-t border-zinc-500/20 space-y-3">
                      <a
                        href="https://in.pinterest.com/skxielol/to-mr-general/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] rounded-sm transition-all shadow-sm no-underline cursor-pointer border ${btnBg}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                        <span>View Pinterest Moodboard</span>
                      </a>
                    </div>
                  )}

                  {/* OTHER BOOKS IN THIS SERIES (CLEAN COVERS ONLY) */}
                  {otherBooksInSeries.length > 0 && (
                    <div className="pt-8 border-t border-zinc-500/20 space-y-4">
                      <h4 className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-colors ${pageTitleColor}`}>
                        OTHER BOOKS IN THIS SERIES
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
                        {otherBooksInSeries.map((otherBook) => (
                          <div
                            key={otherBook.id}
                            onClick={() => {
                              setSelectedBook(otherBook);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group cursor-pointer"
                          >
                            <div className={`w-full aspect-[2/3] rounded-[2px] overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-1.5 ${bookShadow}`}>
                              <img
                                src={otherBook.coverImage}
                                alt={otherBook.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* OTHER STANDALONE NOVELS */}
                  {otherStandaloneBooks.length > 0 && (
                    <div className="pt-8 border-t border-zinc-500/20 space-y-4">
                      <h4 className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-colors ${pageTitleColor}`}>
                        MORE BOOKS BY THE AUTHOR
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
                        {otherStandaloneBooks.map((otherBook) => (
                          <div
                            key={otherBook.id}
                            onClick={() => {
                              setSelectedBook(otherBook);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group cursor-pointer"
                          >
                            <div className={`w-full aspect-[2/3] rounded-[2px] overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-1.5 ${bookShadow}`}>
                              <img
                                src={otherBook.coverImage}
                                alt={otherBook.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
