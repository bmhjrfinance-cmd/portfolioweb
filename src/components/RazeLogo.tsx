import React from 'react';

interface RazeLogoProps {
  className?: string;
}

export const RazeLogo: React.FC<RazeLogoProps> = ({ className = 'h-16 md:h-20 lg:h-24' }) => {
  return (
    <svg
      viewBox="0 0 520 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} max-w-full drop-shadow-[0_0_25px_rgba(255,255,255,0.08)]`}
      aria-label="RAZE Logo"
    >
      {/* Letter R */}
      <g stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Left vertical stem */}
        <line x1="24" y1="18" x2="24" y2="84" />
        {/* Upper rounded loop */}
        <path d="M 24 18 H 70 C 90 18 90 52 70 52 H 24" />
        {/* Diagonal right leg */}
        <line x1="62" y1="52" x2="94" y2="84" />
        {/* Center circular eye dot */}
        <circle cx="56" cy="35" r="5" fill="white" stroke="none" />
      </g>

      {/* Letter A */}
      <g stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Left leg to rounded apex, then down to right leg (no crossbar for avant-garde minimal look) */}
        <path d="M 140 84 L 175 20 C 178 14 186 14 189 20 L 224 84" />
        {/* Stylized geometric interior accent */}
        <line x1="162" y1="62" x2="202" y2="62" stroke="white" strokeWidth="3" opacity="0.4" />
      </g>

      {/* Letter Z */}
      <g stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Top bar */}
        <line x1="270" y1="18" x2="336" y2="18" />
        {/* Diagonal stroke */}
        <line x1="336" y1="18" x2="270" y2="84" />
        {/* Bottom bar */}
        <line x1="270" y1="84" x2="336" y2="84" />
        {/* Center horizontal slice line */}
        <line x1="288" y1="51" x2="318" y2="51" stroke="white" strokeWidth="5" />
      </g>

      {/* Letter E (geometric arc with central eye dot) */}
      <g stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer curved body with horizontal ends */}
        <path d="M 444 26 C 424 16 384 18 384 51 C 384 84 424 86 444 76" />
        {/* Center dot/pupil element */}
        <circle cx="414" cy="51" r="5" fill="white" stroke="none" />
      </g>
    </svg>
  );
};
