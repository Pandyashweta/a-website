import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, RotateCcw } from 'lucide-react';
import { characterArtData } from '../data';

export type ArtCategory = 'All Art' | 'Book Art' | 'Character Art';

interface ArtBooksPageProps {
  isVisible: boolean;
  isWhite?: boolean;
  bgMode?: 'black' | 'white';
  initialCategory?: ArtCategory;
}

interface FilterDropdownProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (val: string) => void;
  isWhite: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
  isWhite,
}) => {
  return (
    <div className="flex flex-col items-center sm:items-start space-y-1.5 w-full sm:w-auto relative">
      {/* LABEL (MATCHES SCREENSHOT SPEC) */}
      <span
        className={`text-xs sm:text-[13px] font-medium tracking-normal block text-center sm:text-left transition-colors duration-200 ${
          isWhite ? 'text-zinc-800' : 'text-zinc-200'
        }`}
      >
        {label}
      </span>

      {/* SELECT BUTTON BOX */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full sm:w-44 md:w-48 h-10 sm:h-11 px-3.5 flex items-center justify-between text-xs sm:text-sm transition-all border rounded-none sm:rounded-sm cursor-pointer select-none ${
          isWhite
            ? 'bg-white border-zinc-300 text-zinc-800 hover:border-zinc-400 focus:border-zinc-500'
            : 'bg-[#121218] border-zinc-700/80 text-zinc-200 hover:border-zinc-500 focus:border-zinc-400'
        }`}
        aria-expanded={isOpen}
      >
        <span className="truncate pr-2 font-normal">{value}</span>
        <ChevronDown
          className={`w-4 h-4 text-zinc-500 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full left-0 right-0 mt-1 z-50 py-1 border shadow-xl max-h-60 overflow-y-auto ${
              isWhite
                ? 'bg-white border-zinc-200 text-zinc-800'
                : 'bg-[#14141C] border-[#2A2A38] text-zinc-200'
            }`}
          >
            {options.map((opt) => {
              const isSelected = opt === value;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onSelect(opt)}
                  className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors cursor-pointer block ${
                    isSelected
                      ? isWhite
                        ? 'bg-zinc-100 font-semibold text-black'
                        : 'bg-zinc-800 font-semibold text-white'
                      : isWhite
                      ? 'hover:bg-zinc-50 text-zinc-700 hover:text-black'
                      : 'hover:bg-zinc-800/60 text-zinc-300 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ArtBooksPage: React.FC<ArtBooksPageProps> = ({
  isVisible,
  isWhite = false,
  bgMode = 'white',
  initialCategory = 'Book Art',
}) => {
  // SELECTED ART CATEGORY: 'All Art' | 'Book Art' | 'Character Art'
  const [artType, setArtType] = useState<ArtCategory>(initialCategory);

  // ART FILTER STATES
  const [seriesFilter, setSeriesFilter] = useState<string>('All');
  const [bookFilter, setBookFilter] = useState<string>('All');

  // DROPDOWN ACCORDION / TOGGLE STATE
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // SYNCHRONIZE INITIAL CATEGORY PROP
  useEffect(() => {
    if (initialCategory) {
      setArtType(initialCategory);
    }
  }, [initialCategory]);

  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE OR PRESSING ESCAPE
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const subTextColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';

  // FILTERED CHARACTER ART ITEMS
  const filteredCharacters = characterArtData.filter((item) => {
    if (seriesFilter !== 'All' && item.series !== seriesFilter) return false;
    if (bookFilter !== 'All' && item.book !== bookFilter) return false;
    return true;
  });

  const hasActiveCharFilters =
    seriesFilter !== 'All' ||
    bookFilter !== 'All';

  const resetCharacterFilters = () => {
    setSeriesFilter('All');
    setBookFilter('All');
    setOpenDropdown(null);
  };

  // EXTRACT DYNAMIC UNIQUE OPTIONS FROM DATA
  const rawSeries = Array.from(new Set(characterArtData.map((c) => c.series).filter((s) => Boolean(s && s.trim()))));
  const seriesOptions = ['All', ...rawSeries];
  const bookOptions = ['All', ...Array.from(new Set(characterArtData.map((c) => c.book).filter(Boolean)))];

  return (
    <>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-[1400px] mx-auto min-h-screen pt-22 sm:pt-26 md:pt-26 pb-28 sm:pb-36 px-4 sm:px-8 md:px-12 relative z-10 select-none space-y-8 text-center"
      >
        {/* HEADER SECTION WITH DYNAMIC CATEGORY TITLE */}
        <div className="flex flex-col items-center space-y-2 pt-1 sm:pt-2">
          {artType === 'Character Art' ? (
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight transition-colors duration-300 ${titleColor}`}
            >
              Character Art
            </h1>
          ) : artType === 'Book Art' ? (
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight transition-colors duration-300 ${titleColor}`}
            >
              Art - Books
            </h1>
          ) : (
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight transition-colors duration-300 ${titleColor}`}
            >
              Art Gallery
            </h1>
          )}
        </div>

        {/* DROPDOWN FILTER BAR (MATCHES SCREENSHOT LAYOUT SPEC) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-5xl mx-auto pt-1 pb-4">
          {/* FILTER BY ART (ALL ART | BOOK ART | CHARACTER ART) */}
          <FilterDropdown
            id="art"
            label="Filter by Art"
            value={artType}
            options={['All Art', 'Book Art', 'Character Art']}
            isOpen={openDropdown === 'art'}
            onToggle={() => setOpenDropdown(openDropdown === 'art' ? null : 'art')}
            onSelect={(val) => {
              setArtType(val as ArtCategory);
              setOpenDropdown(null);
            }}
            isWhite={isWhite}
          />

          {/* CHARACTER ART FILTERS (DISPLAYED WHEN CHARACTER ART OR ALL ART IS ACTIVE) */}
          {(artType === 'Character Art' || artType === 'All Art') && (
            <>
              {/* FILTER BY SERIES (ONLY DISPLAYED IF SERIES EXIST) */}
              {rawSeries.length > 0 && (
                <FilterDropdown
                  id="series"
                  label="Filter by Series"
                  value={seriesFilter}
                  options={seriesOptions}
                  isOpen={openDropdown === 'series'}
                  onToggle={() => setOpenDropdown(openDropdown === 'series' ? null : 'series')}
                  onSelect={(val) => {
                    setSeriesFilter(val);
                    setOpenDropdown(null);
                  }}
                  isWhite={isWhite}
                />
              )}

              {/* FILTER BY BOOK */}
              <FilterDropdown
                id="book"
                label="Filter by Book"
                value={bookFilter}
                options={bookOptions}
                isOpen={openDropdown === 'book'}
                onToggle={() => setOpenDropdown(openDropdown === 'book' ? null : 'book')}
                onSelect={(val) => {
                  setBookFilter(val);
                  setOpenDropdown(null);
                }}
                isWhite={isWhite}
              />
            </>
          )}
        </div>

        {/* ACTIVE FILTERS INDICATOR & RESET ACTION */}
        {(artType === 'Character Art' || artType === 'All Art') && hasActiveCharFilters && (
          <div className="flex items-center justify-center space-x-2 pt-0 pb-2">
            <button
              onClick={resetCharacterFilters}
              className={`inline-flex items-center space-x-1.5 text-xs font-medium cursor-pointer transition-colors duration-200 px-3 py-1 rounded-full border ${
                isWhite
                  ? 'border-zinc-300 bg-zinc-100 text-zinc-700 hover:text-black hover:border-zinc-400'
                  : 'border-[#2C2C38] bg-[#16161E] text-zinc-300 hover:text-white hover:border-zinc-600'
              }`}
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Character Filters</span>
            </button>
          </div>
        )}

        {/* -------------------- ART CONTENT: COMING SOON -------------------- */}
        <div className="py-16 sm:py-24 px-4 text-center max-w-lg mx-auto space-y-3">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-light font-serif-italic transition-colors duration-300 ${titleColor}`}>
            Coming Soon
          </h2>
          <p className={`text-xs sm:text-sm font-light leading-relaxed transition-colors duration-300 ${subTextColor}`}>
            Official book illustrations, art gallery showcases, and character portraits will be unveiled soon.
          </p>
        </div>
      </motion.div>
    </>
  );
};

