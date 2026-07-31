import React from 'react';

interface ExtinctMuffinLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'custom';
}

export const ExtinctMuffinLogo: React.FC<ExtinctMuffinLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Height sizing presets
  const sizeClasses = {
    sm: 'h-9 sm:h-11',
    md: 'h-16 sm:h-20',
    lg: 'h-28 sm:h-36 md:h-44',
    custom: '',
  };

  return (
    <div
      className={`inline-flex items-center justify-center select-none filter drop-shadow-[0_6px_20px_rgba(96,0,56,0.65)] ${
        sizeClasses[size]
      } ${className}`}
    >
      <svg
        viewBox="0 0 650 160"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-full overflow-visible"
      >
        <defs>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Grand+Hotel&family=Dancing+Script:wght@700&display=swap');
            .muffin-sticker-text {
              font-family: 'Pacifico', 'Grand Hotel', 'Dancing Script', cursive;
              font-style: italic;
              font-size: 82px;
            }
          `}</style>

          {/* Deep dark berry outer shadow */}
          <filter id="muffin-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#400022" floodOpacity="0.8" />
          </filter>
        </defs>

        <g filter="url(#muffin-glow)" transform="rotate(-3 325 80)">
          {/* Layer 1: Outermost dark burgundy sticker contour */}
          <text
            x="325"
            y="95"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#500028"
            stroke="#500028"
            strokeWidth="32"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="muffin-sticker-text"
          >
            extinctmuffin
          </text>

          {/* Layer 2: Middle rich berry stroke */}
          <text
            x="325"
            y="95"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#7A0043"
            stroke="#7A0043"
            strokeWidth="20"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="muffin-sticker-text"
          >
            extinctmuffin
          </text>

          {/* Layer 3: Inner bright pink fill */}
          <text
            x="325"
            y="95"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#FF52B7"
            className="muffin-sticker-text"
          >
            extinctmuffin
          </text>
        </g>
      </svg>
    </div>
  );
};
