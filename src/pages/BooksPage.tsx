import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Music, ExternalLink } from 'lucide-react';
import { booksData, BookItem } from '../data';

interface BooksPageProps {
  isVisible: boolean;
  isWhite?: boolean;
}

export const BooksPage: React.FC<BooksPageProps> = ({ isVisible, isWhite = false }) => {
  const releasedBooks = booksData.filter((b) => b.status !== 'Coming Soon');
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [openContentNotes, setOpenContentNotes] = useState<Record<string, boolean>>({});

  const pageTitleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const pageSubColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';

  const cardBorder = isWhite
    ? 'border-zinc-300/80'
    : 'border-[#22222A] hover:border-[#444456]';

  const bookShadow = isWhite
    ? 'shadow-[0_14px_30px_-6px_rgba(0,0,0,0.28),0_8px_12px_-4px_rgba(0,0,0,0.15)] group-hover:shadow-[0_22px_42px_-8px_rgba(0,0,0,0.36),0_12px_16px_-4px_rgba(0,0,0,0.2)]'
    : 'shadow-[0_16px_40px_rgba(0,0,0,0.75)] group-hover:shadow-[0_25px_55px_rgba(0,0,0,0.9)]';

  const btnBg = isWhite
    ? 'bg-black text-white hover:bg-zinc-800 border-black'
    : 'bg-[#121216] text-white hover:bg-[#1C1C24] border-[#2A2A36]';

  const otherBooks = releasedBooks.filter((b) => b.id !== selectedBook?.id);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-[1400px] mx-auto min-h-screen pt-22 sm:pt-26 md:pt-26 pb-28 sm:pb-36 px-4 sm:px-8 md:px-12 relative z-10"
      >
        <AnimatePresence mode="wait">
          {!selectedBook ? (
            /* ========================================================
               MAIN BOOKS SHOWCASE GRID (SINGLE BOOK CARD)
               ======================================================== */
            <motion.div
              key="books-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 sm:space-y-10"
            >
              {/* PAGE HEADER */}
              <div className="text-center pt-1 sm:pt-2 space-y-3">
                <h1 className={`text-3xl sm:text-4xl md:text-5xl font-light font-serif-italic transition-colors duration-300 ${pageTitleColor}`}>
                  Individual Novels
                </h1>
                <p className={`text-xs sm:text-sm font-light tracking-wide ${pageSubColor}`}>
                  Explore individual novels available to read for free.
                </p>
              </div>

              {/* CENTERED SINGLE BOOK SHOWCASE CARD */}
              <div className="flex justify-center items-center w-full">
                <div className="w-full max-w-[215px] sm:max-w-[235px]">
                  {releasedBooks.map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => {
                        setSelectedBook(book);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group cursor-pointer flex flex-col space-y-3 items-center text-center"
                    >
                      {/* BOOK COVER CARD WITH CRISP RECTANGULAR EDGES & DEEP DROP SHADOW */}
                      <div className={`relative w-full aspect-[2/3] rounded-sm overflow-hidden ${cardBorder} ${bookShadow}`}>
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* BOOK TITLE & SUBTITLE BELOW COVER (CENTERED) */}
                      <div className="space-y-1 text-center px-0.5">
                        <h3 className={`text-sm sm:text-base font-serif font-bold uppercase tracking-wider line-clamp-1 ${pageTitleColor}`}>
                          {book.title}
                        </h3>
                        <p className={`text-xs font-light line-clamp-1 ${pageSubColor}`}>
                          {book.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ========================================================
               INDIVIDUAL BOOK SHOWCASE PAGE
               ======================================================== */
            <motion.div
              key={`individual-book-${selectedBook.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 text-left"
            >
              {/* BACK TO ALL BOOKS BUTTON */}
              <button
                onClick={() => setSelectedBook(null)}
                className={`inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer focus:outline-none ${pageSubColor} hover:${pageTitleColor}`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to books</span>
              </button>

              {/* TWO COLUMN INDIVIDUAL SHOWCASE FLEX LAYOUT */}
              <div className="flex flex-col md:flex-row gap-8 lg:gap-10 items-start">
                
                {/* LEFT COLUMN: CRISP COVER & STACKED BUY / AUDIO BUTTONS */}
                <div className="w-full md:w-[260px] lg:w-[280px] shrink-0 space-y-6 mx-auto md:mx-0">
                  {/* LARGE BOOK COVER */}
                  <div className={`w-full aspect-[2/3] rounded-sm overflow-hidden shadow-2xl border ${isWhite ? 'border-zinc-300' : 'border-[#22222A]'}`}>
                    <img
                      src={selectedBook.coverImage}
                      alt={selectedBook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* STACKED RECTANGULAR BUY BUTTONS */}
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

                  {/* LISTEN TO AUDIO SECTION */}
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
                  <h1 className={`text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight transition-colors ${pageTitleColor}`}>
                    {selectedBook.title}
                  </h1>

                  {/* METADATA BLOCK */}
                  <div className="space-y-1.5 text-xs sm:text-sm font-light">
                    {selectedBook.series ? (
                      <p className={pageSubColor}>
                        <strong className={`font-semibold ${pageTitleColor}`}>Series:</strong> {selectedBook.series}
                      </p>
                    ) : null}
                    <p className={pageSubColor}>
                      <strong className={`font-semibold ${pageTitleColor}`}>Tropes:</strong>{' '}
                      <span className="text-amber-500 font-medium">
                        {selectedBook.tropes.join(', ')}
                      </span>
                    </p>
                    <p className={pageSubColor}>
                      <strong className={`font-semibold ${pageTitleColor}`}>Release Date:</strong> {selectedBook.releaseDate}
                    </p>
                  </div>

                  {/* HOOK LINE */}
                  {selectedBook.hook && (
                    <p className={`text-sm sm:text-base font-serif italic font-semibold leading-relaxed transition-colors ${pageTitleColor}`}>
                      {selectedBook.hook}
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
                            {cleanText}
                          </p>
                        );
                      })
                    ) : (
                      <p className={pageSubColor}>{selectedBook.description}</p>
                    )}
                  </div>

                  {/* CONTENT WARNINGS ACCORDION BAR */}
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
                  <div className="pt-6 border-t border-zinc-500/20 space-y-3">
                    <h4 className={`text-xs uppercase tracking-[0.2em] font-semibold ${pageSubColor}`}>
                      Aesthetic Mood Board
                    </h4>
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

                  {/* OTHER BOOKS BY THE AUTHOR ROW */}
                  {otherBooks.length > 0 && (
                    <div className="pt-8 border-t border-zinc-500/20 space-y-4">
                      <h4 className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-colors ${pageTitleColor}`}>
                        OTHER BOOKS BY THE AUTHOR
                      </h4>

                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-3 sm:gap-4">
                        {otherBooks.map((otherBook) => (
                          <div
                            key={otherBook.id}
                            onClick={() => {
                              setSelectedBook(otherBook);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group cursor-pointer space-y-1.5 flex flex-col items-center text-center"
                          >
                            <div className={`w-full aspect-[2/3] rounded-sm overflow-hidden border ${cardBorder} ${bookShadow}`}>
                              <img
                                src={otherBook.coverImage}
                                alt={otherBook.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className={`text-[10px] sm:text-xs font-serif font-bold uppercase tracking-wider line-clamp-1 ${pageTitleColor}`}>
                              {otherBook.title}
                            </p>
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
