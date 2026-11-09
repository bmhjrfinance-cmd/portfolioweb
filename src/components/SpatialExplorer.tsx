import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  MoreHorizontal, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  Paperclip, 
  User, 
  Lock, 
  Mic, 
  Plus, 
  LayoutGrid, 
  Layers, 
  X,
  Compass,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface LocationCard {
  id: string;
  title: string;
  subtitle: string;
  indexLabel: string;
  description: string;
  location: string;
  coordinates: string;
  image: string;
}

const LOCATIONS: LocationCard[] = [
  {
    id: 'acropolis',
    title: 'Acropolis',
    subtitle: 'Sacred Rock & Citadel',
    indexLabel: '1 / 7',
    description: 'The Acropolis of Athens is an ancient citadel located on a rocky outcrop above the city. It is home to the Parthenon and other magnificent classical structures.',
    location: 'Acropolis of Athens, 105 58 Athens, Greece',
    coordinates: '37.9715° N, 23.7267° E',
    image: '/src/assets/images/athens_acropolis_sunset_1793476543291.jpg',
  },
  {
    id: 'plaka',
    title: 'Plaka District',
    subtitle: 'Historic Old Town',
    indexLabel: '2 / 7',
    description: 'Nestled on the northern slopes of the Acropolis, Plaka boasts labyrinthine cobblestone alleys, 19th-century neoclassical mansions, and vibrant bougainvillea courtyards.',
    location: 'Plaka, Central Athens 105 56, Greece',
    coordinates: '37.9730° N, 23.7297° E',
    image: '/src/assets/images/athens_plaka_district_1793476544547.jpg',
  },
  {
    id: 'temple-zeus',
    title: 'Temple of Zeus',
    subtitle: 'Olympieion',
    indexLabel: '3 / 7',
    description: 'A colossal ruined temple in the center of Athens dedicated to Olympian Zeus. Construction began in the 6th century BC and was completed by Roman Emperor Hadrian.',
    location: 'Athens 105 57, Greece',
    coordinates: '37.9693° N, 23.7331° E',
    image: '/src/assets/images/athens_temple_of_zeus_1793476672264.jpg',
  },
  {
    id: 'parthenon',
    title: 'Parthenon',
    subtitle: 'Acropolis Classical Temple',
    indexLabel: '4 / 7',
    description: 'The enduring symbol of classical Greece and Western democracy, constructed of pure Pentelic marble with revolutionary optical refinements and architectural balance.',
    location: 'Dionysiou Areopagitou, Athens 105 58',
    coordinates: '37.9715° N, 23.7266° E',
    image: 'assets/aistudio/web_section_957282bc.jpg',
  },
  {
    id: 'astir-beach',
    title: 'Astir Beach',
    subtitle: 'Vouliagmeni Riviera',
    indexLabel: '5 / 7',
    description: 'A world-class coastal sanctuary on the Athens Riviera featuring crystal-clear Aegean waters, pristine golden sands, and luxury pine-fringed headlands.',
    location: 'Apollonos 40, Vouliagmeni 166 71, Greece',
    coordinates: '37.8143° N, 23.7745° E',
    image: '/src/assets/images/athens_astir_beach_1793476545140.jpg',
  },
  {
    id: 'herodes',
    title: 'Herodes Atticus',
    subtitle: 'Ancient Amphitheatre',
    indexLabel: '6 / 7',
    description: 'Steep-sloped stone Roman theatre on the southwest slope of the Acropolis, still hosting world-renowned summer performances and international fashion shows.',
    location: 'Dionysiou Areopagitou, Athens 105 55',
    coordinates: '37.9708° N, 23.7247° E',
    image: '/src/assets/images/athens_temple_of_zeus_1793476672264.jpg',
  },
  {
    id: 'sounion',
    title: 'Cape Sounion',
    subtitle: 'Temple of Poseidon',
    indexLabel: '7 / 7',
    description: 'Perched on high cliffs dropping vertically into the Aegean Sea, this iconic temple marks the southernmost tip of the Attic peninsula with legendary sunset vistas.',
    location: 'Lavreotiki 195 00, Greece',
    coordinates: '37.6502° N, 24.0245° E',
    image: '/src/assets/images/athens_acropolis_sunset_1793476543291.jpg',
  },
];

const smoothEase = [0.16, 1, 0.3, 1] as const;

export const SpatialExplorer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeCard = LOCATIONS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : LOCATIONS.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < LOCATIONS.length - 1 ? prev + 1 : 0));
  };

  const toggleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <section 
      id="section-explorer"
      className="relative min-h-[820px] sm:min-h-[950px] md:min-h-[1050px] py-12 sm:py-16 md:py-24 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background with Ambient Living Room / Window to Acropolis from reference image */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <img
          src="/public/assets/aistudio/web_section_957282bc.jpg"
          alt="Ambient Luxury Room"
          className="w-full h-full object-cover object-center opacity-70"
          loading="lazy"
        />
        {/* Top and Bottom Smooth Gradient Fades into Pure Black Theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/45 to-black pointer-events-none" />
      </div>

      {/* ======================================================== */}
      {/* 1. TOP FLOATING SAFARI / VISIONOS TOOLBAR (Mobile Optimized) */}
      {/* ======================================================== */}
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 z-30 pt-2 sm:pt-4">
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="bg-black/55 backdrop-blur-xl border border-white/20 rounded-full py-1.5 sm:py-2 px-2.5 sm:px-5 shadow-2xl flex items-center justify-between gap-1.5 sm:gap-2 text-white/90"
        >
          {/* Left Controls */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 shrink-0">
            <button 
              onClick={() => setCurrentIndex(0)}
              className="p-1 sm:p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white hidden sm:block"
              title="Overview"
              aria-label="Overview"
            >
              <LayoutGrid className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </button>
            <button 
              onClick={handlePrev}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              title="Previous"
              aria-label="Previous destination"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              title="Next"
              aria-label="Next destination"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Center Address Capsule */}
          <div className="flex-1 min-w-0 mx-1 sm:mx-2 bg-white/10 hover:bg-white/15 border border-white/10 transition-colors rounded-full px-2.5 sm:px-4 py-1 sm:py-1.5 flex items-center justify-between text-xs sm:text-sm text-white/90 font-light">
            <span className="text-[10px] sm:text-[11px] font-mono opacity-60 shrink-0">aA</span>
            <div className="flex items-center gap-1.5 truncate px-1">
              <Lock className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white/70 shrink-0" />
              <span className="font-medium tracking-wide truncate text-[11px] sm:text-xs">Athens Explorer</span>
            </div>
            <button className="opacity-70 hover:opacity-100 transition-opacity shrink-0" aria-label="Voice search">
              <Mic className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 shrink-0">
            <button 
              onClick={() => setIsExpanded(true)}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              title="Expand"
              aria-label="Expand card"
            >
              <Maximize2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </button>
            <button 
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white hidden sm:block"
              title="Share"
              aria-label="Share page"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCurrentIndex((prev) => (prev + 1) % LOCATIONS.length)}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white hidden sm:block"
              title="Browse Tabs"
              aria-label="Browse tabs"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN 3D PERSPECTIVE CAROUSEL STACK (Touch Responsive) */}
      {/* ======================================================== */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-[1400px] mx-auto px-2 sm:px-4 my-auto py-4 sm:py-8 flex items-center justify-center overflow-hidden"
      >
        {/* Left Floating Action Capsule (Desktop only) */}
        <motion.div 
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-5 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full py-5 px-2.5 shadow-2xl"
        >
          <button 
            onClick={() => {
              const el = document.getElementById('section-explorer');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-white/70 hover:text-white transition-colors p-1"
            title="Attach Link"
            aria-label="Anchor link"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <button 
            onClick={() => toggleLike(activeCard.id)}
            className={`transition-colors p-1 ${liked[activeCard.id] ? 'text-red-500' : 'text-white/70 hover:text-white'}`}
            title="Favorite"
            aria-label="Save favorite"
          >
            <Heart className={`w-4 h-4 ${liked[activeCard.id] ? 'fill-red-500' : ''}`} />
          </button>
          <button 
            className="text-white/70 hover:text-white transition-colors p-1"
            title="User Profile"
            aria-label="User profile"
          >
            <User className="w-4 h-4" />
          </button>
        </motion.div>

        {/* 3D Cylindrical Cards Stage */}
        <div 
          className="relative w-full h-[470px] sm:h-[540px] md:h-[600px] flex items-center justify-center"
          style={{ perspective: isMobile ? '900px' : '1400px', transformStyle: 'preserve-3d' }}
        >
          {LOCATIONS.map((card, index) => {
            let offset = index - currentIndex;
            const total = LOCATIONS.length;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCurrent = offset === 0;
            // On mobile, only render adjacent cards to keep touch rendering 120fps
            const maxDistance = isMobile ? 1 : 2;
            const isVisible = Math.abs(offset) <= maxDistance;

            if (!isVisible) return null;

            // Responsive 3D calculations
            const rotateY = offset * (isMobile ? -16 : -22);
            const translateX = offset * (isMobile ? 140 : 260);
            const translateZ = Math.abs(offset) * (isMobile ? -70 : -120);
            const scale = 1 - Math.abs(offset) * (isMobile ? 0.14 : 0.12);
            const opacity = isCurrent ? 1 : (isMobile ? 0.35 : Math.max(0.45, 1 - Math.abs(offset) * 0.35));
            const zIndex = 20 - Math.abs(offset);

            return (
              <motion.div
                key={card.id}
                onClick={() => {
                  if (!isCurrent) setCurrentIndex(index);
                }}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 340,
                  damping: 32,
                  mass: 0.5,
                }}
                style={{
                  position: 'absolute',
                  zIndex: zIndex,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                }}
                className={`w-[84vw] max-w-[320px] sm:max-w-[360px] md:max-w-[410px] h-[450px] sm:h-[520px] md:h-[580px] rounded-[28px] sm:rounded-[32px] overflow-hidden cursor-pointer group transform-gpu select-none ${
                  isCurrent 
                    ? 'ring-1 ring-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]' 
                    : 'hover:opacity-80 shadow-xl'
                }`}
              >
                {/* Frosted Glass Border Reflection */}
                <div className="relative w-full h-full bg-zinc-950/85 backdrop-blur-md border border-white/20 rounded-[28px] sm:rounded-[32px] overflow-hidden flex flex-col justify-between">
                  
                  {/* Background Photo */}
                  <img
                    src={card.image}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    loading={isCurrent ? 'eager' : 'lazy'}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />

                  {/* Gradient Scrim for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 pointer-events-none" />

                  {/* --- Card Header: Expand & Options (Visible on Active Card) --- */}
                  <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                    {isCurrent ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(true);
                          }}
                          className="bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/25 rounded-full py-1 sm:py-1.5 px-3 sm:px-4 text-[11px] sm:text-xs font-medium text-white flex items-center gap-1.5 shadow-lg transition-all active:scale-95"
                          aria-label="Expand image"
                        >
                          <Maximize2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                          <span>Expand</span>
                        </button>

                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowOptions(!showOptions);
                            }}
                            className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/25 flex items-center justify-center text-white shadow-lg transition-all active:scale-95"
                            aria-label="More options"
                          >
                            <MoreHorizontal className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                          </button>

                          {/* Options Dropdown */}
                          {showOptions && (
                            <div 
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-9 sm:top-10 w-44 bg-zinc-950/95 backdrop-blur-2xl border border-white/20 rounded-xl p-2 shadow-2xl text-xs space-y-1 z-30"
                            >
                              <button 
                                onClick={() => {
                                  toggleLike(card.id);
                                  setShowOptions(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white flex items-center justify-between"
                              >
                                <span>Save Location</span>
                                <Heart className={`w-3.5 h-3.5 ${liked[card.id] ? 'fill-red-500 text-red-500' : ''}`} />
                              </button>
                              <button 
                                onClick={() => {
                                  if (navigator.clipboard) {
                                    navigator.clipboard.writeText(`${card.title} - ${card.coordinates}`);
                                  }
                                  setShowOptions(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white flex items-center justify-between"
                              >
                                <span>Copy GPS Coords</span>
                                <Compass className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="h-7 sm:h-8" />
                    )}
                  </div>

                  {/* --- Card Bottom Information --- */}
                  <div className="relative z-10 p-4 sm:p-6 text-white space-y-2">
                    {/* Title & Index */}
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-white">
                        {card.title}
                      </h3>
                      <span className="text-[11px] sm:text-xs font-mono text-white/70 tracking-wider">
                        {card.indexLabel}
                      </span>
                    </div>

                    {/* Subtitle / Category */}
                    <div className="text-[11px] sm:text-xs font-light text-zinc-300 tracking-wide">
                      {card.subtitle}
                    </div>

                    {/* Description Paragraph (Full on Active) */}
                    {isCurrent && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-2.5 pt-0.5"
                      >
                        <p className="text-[11px] sm:text-xs text-zinc-300 font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
                          {card.description}
                        </p>

                        <div className="pt-2 border-t border-white/15 space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-300 font-light truncate">
                            <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white/90 shrink-0" />
                            <span className="truncate">{card.location}</span>
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 pl-4 sm:pl-5">
                            {card.coordinates}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. BOTTOM FLOATING NAVIGATION PILL & PAGINATION DOTS     */}
      {/* ======================================================== */}
      <div className="w-full max-w-md mx-auto px-4 z-30 pb-2 sm:pb-4 flex flex-col items-center gap-3 sm:gap-4">
        
        {/* Floating Capsule Bar with Thumbnail & Arrows */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-full py-1.5 sm:py-2 px-3 sm:px-4 shadow-2xl flex items-center justify-between gap-2.5 sm:gap-4 w-full max-w-[340px] sm:max-w-md"
        >
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-white cursor-pointer shrink-0"
            aria-label="Previous destination"
          >
            <ChevronLeft className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>

          {/* Central Preview: Round Avatar + Text */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-7 sm:w-9 h-7 sm:h-9 rounded-full overflow-hidden border border-white/30 shrink-0 shadow-md">
              <img
                src={activeCard.image}
                alt={activeCard.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left truncate min-w-0 flex-1">
              <span className="text-[11px] sm:text-xs font-medium text-white block leading-tight truncate">
                Athens
              </span>
              <span className="text-[9px] sm:text-[10px] text-zinc-400 font-light block leading-tight truncate">
                Where History Meets Timeless Beauty
              </span>
            </div>
          </div>

          {/* Right Heart & Next Button */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => toggleLike(activeCard.id)}
              className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${
                liked[activeCard.id] ? 'text-red-500' : 'text-white/80 hover:text-white'
              }`}
              title="Like"
              aria-label="Favorite destination"
            >
              <Heart className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${liked[activeCard.id] ? 'fill-red-500' : ''}`} />
            </button>
            <button
              onClick={handleNext}
              className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-white cursor-pointer"
              aria-label="Next destination"
            >
              <ChevronRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </button>
          </div>
        </motion.div>

        {/* 7-Dot Pagination Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {LOCATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? 'w-5 sm:w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                  : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>

      {/* ======================================================== */}
      {/* 4. EXPAND MODAL VIEW (Mobile Optimized)                  */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full md:w-3/5 h-56 sm:h-72 md:h-[500px] relative shrink-0">
                <img
                  src={activeCard.image}
                  alt={activeCard.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
              </div>

              <div className="w-full md:w-2/5 p-5 sm:p-6 md:p-8 flex flex-col justify-between text-white space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">
                    <span>VISIONOS // GREECE</span>
                    <span>·</span>
                    <span>{activeCard.indexLabel}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light tracking-tight">{activeCard.title}</h2>
                  <p className="text-xs text-zinc-400 mt-1">{activeCard.subtitle}</p>

                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mt-3 sm:mt-4">
                    {activeCard.description}
                  </p>

                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-zinc-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                      <span className="truncate">{activeCard.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <Compass className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>{activeCard.coordinates}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-3">
                  <button 
                    onClick={() => toggleLike(activeCard.id)}
                    className="flex-1 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-medium tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Heart className={`w-3.5 h-3.5 ${liked[activeCard.id] ? 'fill-black' : ''}`} />
                    <span>{liked[activeCard.id] ? 'Saved' : 'Save'}</span>
                  </button>
                  <button 
                    onClick={handleNext}
                    className="px-4 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-medium tracking-wider transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
