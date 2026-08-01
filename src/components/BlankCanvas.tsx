import React from 'react';
import { SkxieSection } from './skxie/SkxieSection';

export const BlankCanvas: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-transparent relative z-10 select-none">
      <SkxieSection />
    </main>
  );
};
