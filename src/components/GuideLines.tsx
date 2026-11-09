import React from 'react';

export const GuideLines: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      <div className="relative w-full h-full max-w-[1440px] mx-auto">
        {/* Line 1 - Left margin / social alignment */}
        <div className="absolute top-0 bottom-0 left-[6%] md:left-[9%] lg:left-[11%] w-px guide-line opacity-40 md:opacity-60" />

        {/* Line 2 - Primary editorial text column (hidden on tiny mobile) */}
        <div className="hidden sm:block absolute top-0 bottom-0 left-[28%] md:left-[27%] lg:left-[28%] w-px guide-line opacity-30 md:opacity-50" />

        {/* Line 3 - Mid-right column (hidden on tiny mobile) */}
        <div className="hidden sm:block absolute top-0 bottom-0 left-[58%] md:left-[54%] lg:left-[53%] w-px guide-line opacity-30 md:opacity-50" />

        {/* Line 4 - Right action column */}
        <div className="absolute top-0 bottom-0 right-[6%] md:right-[10%] lg:right-[12%] w-px guide-line opacity-40 md:opacity-60" />
      </div>
    </div>
  );
};
