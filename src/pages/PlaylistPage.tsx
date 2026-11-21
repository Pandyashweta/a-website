import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { extrasData } from '../data';

interface PlaylistPageProps {
  isVisible: boolean;
  isWhite?: boolean;
}

export const PlaylistPage: React.FC<PlaylistPageProps> = ({
  isVisible,
  isWhite = false,
}) => {
  if (!isVisible) return null;

  const titleColor = isWhite ? 'text-zinc-900' : 'text-white';
  const smallBtnClass = isWhite
    ? 'bg-zinc-900 text-white hover:bg-black border-zinc-900 shadow-sm'
    : 'bg-white text-zinc-900 hover:bg-zinc-100 border-white shadow-sm';

  const { playlist } = extrasData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-3xl mx-auto min-h-screen pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 select-none text-center"
    >
      <div className="w-full space-y-6">
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center space-y-3">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight transition-colors duration-300 ${titleColor}`}>
            Playlist
          </h1>
        </div>

        {/* DILKASHI BUTTON ONLY */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {playlist.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] rounded-sm transition-all cursor-pointer border ${smallBtnClass}`}
            >
              <span>{link.name}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
