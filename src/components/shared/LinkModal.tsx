import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Check, Copy } from 'lucide-react';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: {
    title: string;
    type: 'nav' | 'social';
    context: 'skxie' | 'extinctmuffin';
    url: string;
  } | null;
  onSaveUrl?: (newUrl: string) => void;
}

export const LinkModal: React.FC<LinkModalProps> = ({
  isOpen,
  onClose,
  activeItem,
  onSaveUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [editedUrl, setEditedUrl] = useState('');

  React.useEffect(() => {
    if (activeItem) {
      setEditedUrl(activeItem.url);
    }
  }, [activeItem]);

  if (!isOpen || !activeItem) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(editedUrl || activeItem.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (onSaveUrl && editedUrl) {
      onSaveUrl(editedUrl);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md bg-[#0F0F12] border border-[#222228] rounded-xl p-6 sm:p-8 text-[#D1D1D1] shadow-2xl"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#222228]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#777777]">
                {activeItem.context} • {activeItem.type}
              </span>
              <h3 className="text-xl font-light font-serif-italic italic text-white capitalize">
                {activeItem.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#666666] hover:text-white transition-colors rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-xs text-[#888888] mb-2 font-medium">
                Destination Link URL
              </label>
              <input
                type="text"
                value={editedUrl}
                onChange={(e) => setEditedUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#070709] border border-[#222228] rounded-lg text-white focus:outline-none focus:border-[#44444F] font-mono"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={editedUrl || activeItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg text-xs font-medium hover:bg-[#E5E5E5] transition-colors cursor-pointer"
              >
                <span>Visit Link</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[1.5]" />
              </a>

              <button
                onClick={handleCopy}
                className="flex items-center justify-center p-2.5 bg-[#1A1A1F] border border-[#222228] text-[#CCCCCC] rounded-lg hover:text-white transition-colors cursor-pointer"
                title="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400 stroke-[1.5]" /> : <Copy className="w-4 h-4 stroke-[1.5]" />}
              </button>
            </div>

            {onSaveUrl && (
              <button
                onClick={handleSave}
                className="w-full mt-2 py-1.5 text-xs text-center text-[#777777] hover:text-white underline transition-colors cursor-pointer"
              >
                Save updated link
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
