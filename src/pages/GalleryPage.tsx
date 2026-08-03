import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X } from 'lucide-react';
import { galleryData, GalleryItem } from '../data';

interface GalleryPageProps {
  isVisible: boolean;
  isWhite?: boolean;
  bgMode?: 'black' | 'white';
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ isVisible, isWhite = false, bgMode = 'white' }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const pageTitleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const pageSubColor = isWhite ? 'text-zinc-600' : 'text-zinc-400';

  const cardBorder = isWhite
    ? 'border border-zinc-300/80 shadow-md'
    : 'border border-[#22222A] shadow-2xl';

  // Rule: In black mode -> showcase Black variant first. In white mode -> showcase White variant first.
  const showBlackFirst = bgMode === 'black' || !isWhite;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-[1400px] mx-auto min-h-screen pt-22 sm:pt-26 md:pt-26 pb-28 sm:pb-36 px-4 sm:px-8 md:px-12 relative z-10 select-none space-y-8 text-left"
      >
        {/* HEADER TITLE */}
        <div className="text-center pt-1 sm:pt-2">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-light font-serif-italic transition-colors duration-300 ${pageTitleColor}`}>
            Creative Studio
          </h1>
        </div>

        {/* CREATIVE GALLERY GRID WITH THEME-MATCHED INITIAL POSTER SHOWCASE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-start max-w-2xl mx-auto">
          {galleryData.map((item, index) => {
            const hasDualVariants = Boolean(item.backImage);
            const initialSrc = showBlackFirst && item.backImage ? item.backImage : item.frontImage;
            const hoverSrc = showBlackFirst ? item.frontImage : (item.backImage || item.frontImage);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer relative w-full"
              >
                {/* POSTER CARD WITH THEME-MATCHED CROSSFADE */}
                <div className={`relative w-full rounded-none overflow-hidden transition-colors duration-300 ${cardBorder}`}>
                  {/* BASE LAYER SHOWCASE */}
                  <img
                    src={initialSrc}
                    alt="Poster Showcase"
                    loading="lazy"
                    className="w-full h-auto object-contain block"
                  />

                  {/* HOVER LAYER SHOWCASE (CROSSFADES SMOOTHLY ON HOVER) */}
                  {hasDualVariants && (
                    <img
                      src={hoverSrc}
                      alt="Poster Alternate Edition"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-contain block opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                    />
                  )}

                  {/* TOP RIGHT EXPAND ICON BUTTON */}
                  <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-none bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* PORTAL TO BODY: EXPANDED SHOWCASE (ABOVE ALL HEADERS, FOOTERS & GRADIENTS) */}
      {selectedItem && createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl overflow-y-auto select-none">
            {/* FLOATING FRAMELESS CLOSE BUTTON */}
            <button
              onClick={() => setSelectedItem(null)}
              className="fixed top-6 right-6 sm:top-8 sm:right-8 z-[100000] text-zinc-400 hover:text-white p-2 transition-all cursor-pointer focus:outline-none bg-transparent border-none opacity-80 hover:opacity-100 hover:scale-110"
              aria-label="Close Showcase"
            >
              <X className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.5]" />
            </button>

            {/* EXPANDED SHOWCASE CONTENT (BOTH IMAGES DISPLAY SIDE BY SIDE ON DOCUMENT BODY ROOT) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-6xl my-auto py-8 flex flex-col items-center justify-center space-y-6 z-[99999]"
            >
              {selectedItem.backImage ? (
                /* SHOWCASE BOTH BLACK & WHITE EDITIONS SIDE BY SIDE ORDERED BY ACTIVE THEME */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 w-full items-center justify-center">
                  <div className="relative w-full rounded-none overflow-hidden border-none shadow-2xl">
                    <img
                      src={showBlackFirst ? selectedItem.backImage : selectedItem.frontImage}
                      alt="Primary Edition Showcase"
                      className="w-full h-auto object-contain block max-h-[80vh]"
                    />
                  </div>

                  <div className="relative w-full rounded-none overflow-hidden border-none shadow-2xl">
                    <img
                      src={showBlackFirst ? selectedItem.frontImage : selectedItem.backImage}
                      alt="Secondary Edition Showcase"
                      className="w-full h-auto object-contain block max-h-[80vh]"
                    />
                  </div>
                </div>
              ) : (
                /* SINGLE IMAGE SHOWCASE WITH SQUARE EDGES */
                <div className="relative max-w-3xl w-full rounded-none overflow-hidden border-none shadow-2xl">
                  <img
                    src={selectedItem.frontImage}
                    alt="Poster Showcase"
                    className="w-full h-auto object-contain block max-h-[85vh]"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
