import React from 'react';

interface LogoItem {
  name: string;
  svg: React.ReactNode;
}

const LOGOS: LogoItem[] = [
  {
    name: 'Google',
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    svg: (
      <svg className="h-5 w-auto fill-current" viewBox="0 0 1155 1000">
        <path d="m577.3 0 577.4 1000H0z" />
      </svg>
    ),
  },
  {
    name: 'Apple',
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 170 170">
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.19-9.5-10.9-20.2-14.13-32.08-3.23-11.89-4.85-23.11-4.85-33.68 0-14.12 3.49-25.96 10.46-35.51 6.97-9.55 15.75-14.41 26.33-14.58 4.79 0 10.22 1.34 16.3 4.02 6.08 2.68 10.05 4.02 11.91 4.02 1.58 0 5.63-1.4 12.16-4.19 6.52-2.79 11.89-3.99 16.11-3.6 12.01.76 21.6 5.56 28.78 14.4-10.79 6.53-16.08 15.65-15.86 27.37.22 9.14 3.73 16.82 10.53 23.03 6.8 6.2 14.88 9.69 24.23 10.45-2.09 6.19-4.7 12.72-7.84 19.57zM119.22 31.84c0-7.39 2.64-14.28 7.92-20.67 5.28-6.39 11.8-10.45 19.57-12.17.43 2.07.65 3.96.65 5.66 0 7.39-2.72 14.33-8.15 20.82-5.43 6.49-12 10.6-19.72 12.33-.07-1.96-.27-3.95-.27-5.97z" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 38 57">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
      </svg>
    ),
  },
  {
    name: 'Stripe',
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 60 25">
        <path d="M59.64 14.28c0-4.66-2.28-8.34-6.72-8.34-4.47 0-7.14 3.68-7.14 8.28 0 5.43 3.24 8.22 7.73 8.22 2.19 0 3.86-.5 5.12-1.2v-3.4c-1.26.65-2.67.97-4.28.97-1.74 0-3.26-.64-3.52-2.53h8.73c.03-.43.08-1.52.08-2zm-8.83-1.63c0-1.72.99-2.45 2.11-2.45 1.09 0 2.05.73 2.05 2.45h-4.16zM37.89 5.94c-1.89 0-3.11.89-3.73 1.52V6.16h-4.88v21.36h5.08v-5.91c.64.55 1.74 1.34 3.48 1.34 3.86 0 6.84-3.13 6.84-8.48 0-5.11-3.02-8.53-6.79-8.53zm-1.42 12.39c-1.39 0-2.31-.53-2.88-1.15v-5.64c.59-.69 1.54-1.18 2.88-1.18 2.19 0 3.69 1.83 3.69 3.99 0 2.18-1.49 3.98-3.69 3.98zm-15.93-8.8h-4.86v13.01h5.08V9.53zm-2.46-3.87c1.72 0 2.8-1.07 2.8-2.58 0-1.54-1.09-2.58-2.8-2.58-1.72 0-2.8 1.04-2.8 2.58 0 1.51 1.08 2.58 2.8 2.58zm-7.63 7.82c0-2.18-1.62-2.9-3.89-3.37-1.55-.32-2.09-.76-2.09-1.42 0-.67.65-1.13 1.78-1.13 1.72 0 3.47.67 4.78 1.51V5.78C9.8 5.2 8.35 4.94 6.82 4.94 2.86 4.94.3 7.02.3 10.3c0 4.14 5.72 3.49 5.72 5.28 0 .84-.73 1.2-1.92 1.2-1.89 0-4.08-.87-5.59-1.95v4.54c1.72.76 3.56 1.09 5.37 1.09 4.14 0 6.94-2.04 6.94-5.52z" />
      </svg>
    ),
  },
  {
    name: 'Prada',
    svg: (
      <span className="font-serif tracking-[0.25em] text-lg font-bold uppercase">PRADA</span>
    ),
  },
  {
    name: 'Balenciaga',
    svg: (
      <span className="tracking-[0.3em] text-sm font-semibold uppercase">BALENCIAGA</span>
    ),
  },
  {
    name: 'Nike',
    svg: (
      <svg className="h-5 w-auto fill-current" viewBox="0 0 24 24">
        <path d="M21.707 5.293c-.276-.276-.704-.338-1.045-.152L2.43 14.773c-.503.275-.583.985-.145 1.365l3.242 2.809c.348.302.864.298 1.207-.01l14.973-13.644z" />
      </svg>
    ),
  },
  {
    name: 'Vogue',
    svg: (
      <span className="font-serif tracking-[0.35em] text-base font-normal uppercase italic">VOGUE</span>
    ),
  },
];

export const PartnerLogos: React.FC = () => {
  // Duplicate array for seamless infinite CSS loop
  const doubleLogos = [...LOGOS, ...LOGOS];

  return (
    <section className="relative w-full py-14 border-y border-zinc-900 bg-black overflow-hidden z-20">
      {/* Editorial Category Tag */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-8 flex items-center justify-between text-zinc-500 text-[11px] font-mono tracking-widest uppercase">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
          <span>COLLABORATIVE NETWORK &amp; GLOBAL CAMPAIGNS</span>
        </div>
        <span className="hidden sm:inline text-zinc-600">PARIS · NEW YORK · TOKYO · MILAN</span>
      </div>

      {/* Marquee Container with Left/Right Gradient Mask for Infinite Depth */}
      <div className="relative w-full overflow-hidden mask-fade-edges">
        {/* Left Fade Scrim */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade Scrim */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Buttery Smooth Compositor-Only Marquee Track */}
        <div className="flex items-center gap-14 sm:gap-20 md:gap-24 animate-marquee py-2">
          {doubleLogos.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center justify-center shrink-0 text-zinc-500 hover:text-white transition-colors duration-200 cursor-pointer select-none"
              title={item.name}
            >
              {item.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
