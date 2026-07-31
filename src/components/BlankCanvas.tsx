import React from 'react';
import { SkxieSection } from './skxie/SkxieSection';
import { ExtinctMuffinSection } from './extinctmuffin/ExtinctMuffinSection';

interface BlankCanvasProps {
  isScrolled: boolean;
  onScrollToSection: (section: 'skxie' | 'extinctmuffin') => void;
}

export const BlankCanvas: React.FC<BlankCanvasProps> = ({
  isScrolled,
  onScrollToSection,
}) => {
  return (
    <main className="w-full min-h-screen bg-transparent relative z-10 select-none">
      <SkxieSection />
      <ExtinctMuffinSection onScrollToSection={onScrollToSection} />
    </main>
  );
};
