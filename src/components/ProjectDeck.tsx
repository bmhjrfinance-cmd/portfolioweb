import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
  Code2,
  Compass,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import zardaImg from '../assets/images/zarda_cafe_mockup_1793481833593.jpg';
import spatialImg from '../assets/images/spatial_portfolio_mockup_1793481834342.jpg';
import fashionImg from '../assets/images/fashion_runway_avantgarde_1793475885234.jpg';

const rawBase = import.meta.env.BASE_URL || '/';
const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const athiSpatialImg = `${baseUrl}assets/aistudio/web_section_957282bc.jpg`;

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tech: string[];
  url?: string;
  image: string;
  indexLabel: string;
  description: string;
  highlights: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'zarda-cafe',
    title: 'Zarda Cafe Platform',
    category: 'Interactive Culinary Web Application & Menu System',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX Design', 'Responsive Web'],
    url: 'https://bmhjrfinance-cmd.github.io/zardacafe/#menu',
    image: zardaImg,
    indexLabel: '01 / 04',
    description: 'An artisanal dark luxury culinary platform engineered for Zarda Cafe. Features real-time menu browsing, category navigation, fluid micro-interactions, responsive typography, and high-conversion ordering UX.',
    highlights: [
      'Interactive culinary menu with instant item filtering',
      'Artisanal dark-mode typography & luxury amber accents',
      'Engineered with zero runtime dependencies for lightning-fast mobile performance',
      'Full cross-browser responsiveness and touch-friendly ordering flows'
    ]
  },
  {
    id: 'portfolio-v1',
    title: 'Interactive Personal Portfolio (V1)',
    category: '3D Immersive Web Experience',
    tech: ['3D Web Development', 'React', 'WebGL', 'Three.js', 'Framer Motion'],
    url: 'https://mypotfoliobyblessing.lovable.app/',
    image: spatialImg,
    indexLabel: '02 / 04',
    description: 'A cutting-edge 3D developer portfolio showcasing immersive WebGL canvas environments, interactive spatial object manipulation, dark glassmorphism surfaces, and dynamic state transitions.',
    highlights: [
      'Custom Three.js WebGL canvas with interactive mouse tracking',
      'Neon mint glowing spatial accents and OLED dark aesthetic',
      'Fluid page transitions powered by React & modern web animation',
      'Engineered with high-speed GPU rendering optimization'
    ]
  },
  {
    id: 'athi-spatial',
    title: 'Athi Spatial Engine & Configurator',
    category: 'High-Performance WebGL Spatial Architecture',
    tech: ['Three.js', 'Next.js', 'WebGL Shaders', 'GSAP', 'Tailwind CSS'],
    image: athiSpatialImg,
    indexLabel: '03 / 04',
    description: 'A physics-driven spatial computing interface built for ultra-low latency browser interaction. Demonstrates procedural 3D model manipulation, custom GLSL lighting shaders, and glass refraction.',
    highlights: [
      'VisionOS-inspired 3D spatial cylindrical card deck',
      'Procedural studio PBR reflections and glass transmission',
      'Damped spring kinematics and smooth gesture controls',
      'Built for creative studios and interactive product showcases'
    ]
  },
  {
    id: 'lumina-ui',
    title: 'Lumina Spatial Design System',
    category: 'Dark Luxury UI/UX Design System',
    tech: ['Figma', 'UI/UX Architecture', 'React', 'Tailwind CSS', 'WCAG AA'],
    image: fashionImg,
    indexLabel: '04 / 04',
    description: 'Comprehensive dark luxury UI design system crafted for high-performance creative agency websites and SaaS applications. Features accessible color contrast (WCAG 2.1 AA) and zero-pill discipline.',
    highlights: [
      'Reusable frosted glassmorphism component specifications',
      'Strict 60-30-10 color distribution with neon mint accents',
      'Modular typography pairing: Space Grotesk + Syne + JetBrains Mono',
      'Complete component state definitions with interactive micro-animations'
    ]
  }
];

export const ProjectDeck: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const activeProject = PROJECTS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : PROJECTS.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < PROJECTS.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) handleNext();
    else if (diff < -45) handlePrev();
    setTouchStartX(null);
  };

  return (
    <div
      className="relative w-full py-6 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Spatial Carousel Stage */}
      <div
        className="relative w-full h-[520px] sm:h-[580px] md:h-[620px] flex items-center justify-center overflow-hidden"
        style={{ perspective: isMobile ? '800px' : '1300px', transformStyle: 'preserve-3d' }}
      >
        {PROJECTS.map((project, index) => {
          let offset = index - currentIndex;
          const total = PROJECTS.length;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isCurrent = offset === 0;
          const maxDist = isMobile ? 1 : 2;
          if (Math.abs(offset) > maxDist) return null;

          const rotateY = offset * (isMobile ? -18 : -24);
          const translateX = offset * (isMobile ? 150 : 280);
          const translateZ = Math.abs(offset) * (isMobile ? -90 : -140);
          const scale = 1 - Math.abs(offset) * 0.12;
          const opacity = isCurrent ? 1 : (isMobile ? 0.35 : 0.55);
          const zIndex = 20 - Math.abs(offset);

          return (
            <motion.div
              key={project.id}
              onClick={() => {
                if (isCurrent) setSelectedProject(project);
                else setCurrentIndex(index);
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
                stiffness: 240,
                damping: 28,
                mass: 0.8,
              }}
              style={{
                position: 'absolute',
                zIndex: zIndex,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }}
              className={`w-[84vw] max-w-[340px] sm:max-w-[420px] md:max-w-[480px] h-[480px] sm:h-[540px] md:h-[570px] rounded-[28px] sm:rounded-[32px] overflow-hidden cursor-pointer group transform-gpu ${isCurrent
                  ? 'ring-1 ring-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,245,160,0.1)]'
                  : 'hover:opacity-75 shadow-2xl'
                }`}
            >
              {/* Frosted Glass Container */}
              <div className="relative w-full h-full bg-zinc-950/90 backdrop-blur-xl border border-white/15 rounded-[28px] sm:rounded-[32px] overflow-hidden flex flex-col justify-between">

                {/* Background Showcase Image */}
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.category}`}
                  width={480}
                  height={570}
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.95]"
                  loading={isCurrent ? 'eager' : 'lazy'}
                />

                {/* Dark Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 pointer-events-none" />

                {/* Top Action Bar */}
                <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-300">
                    {project.indexLabel}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#00F5A0] hover:text-black backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all shadow-lg"
                        title="Open Live Application"
                        aria-label={`Open live link for ${project.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-white hover:text-black backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all shadow-lg"
                      title="Inspect Details"
                      aria-label={`Inspect ${project.title}`}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom Information Block */}
                <div className="relative z-10 p-5 sm:p-6 text-white space-y-2.5">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#00F5A0] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0]" />
                    <span>{project.category}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-['Syne',sans-serif] tracking-tight text-white group-hover:text-[#00F5A0] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-zinc-300 font-light leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack pill strip */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls & Pagination */}
      <div className="w-full max-w-md mx-auto px-4 mt-4 flex flex-col items-center gap-3">
        {/* Floating Controller Pill */}
        <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/15 rounded-full py-1.5 px-3 sm:px-4 shadow-xl flex items-center justify-between gap-3 w-full max-w-[340px] sm:max-w-md">
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-white cursor-pointer"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 min-w-0 flex-1 px-1">
            <span className="w-2 h-2 rounded-full bg-[#00F5A0] shrink-0" />
            <div className="truncate text-left">
              <span className="text-xs font-semibold text-white block leading-tight truncate">
                {activeProject.title}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono block leading-tight truncate">
                {activeProject.indexLabel} · {activeProject.category}
              </span>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-white cursor-pointer"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Dot Indicator */}
        <div className="flex items-center gap-2">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentIndex
                  ? 'w-6 bg-[#00F5A0] shadow-[0_0_10px_rgba(0,245,160,0.6)]'
                  : 'w-1.5 bg-white/25 hover:bg-white/50'
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Expandable Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-2xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-zinc-950 border border-white/20 rounded-3xl shadow-2xl flex flex-col md:flex-row text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Close project modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Media Preview */}
              <div className="w-full md:w-3/5 h-64 sm:h-80 md:h-auto relative shrink-0">
                <img
                  src={selectedProject.image}
                  alt={`${selectedProject.title} detailed architectural showcase`}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:hidden" />
              </div>

              {/* Right Specifications Content */}
              <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#00F5A0] uppercase tracking-widest mb-1.5">
                    <span>{selectedProject.indexLabel}</span>
                    <span>•</span>
                    <span>FEATURED WORK</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold font-['Syne',sans-serif] tracking-tight text-white">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">{selectedProject.category}</p>

                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mt-4">
                    {selectedProject.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-5 pt-4 border-t border-zinc-800 space-y-2">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                      Engineering Highlights
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-300 font-light">
                      {selectedProject.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#00F5A0] font-mono mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="mt-5 pt-4 border-t border-zinc-800">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Stack Deployed
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Link Button */}
                <div className="pt-4 border-t border-zinc-800">
                  {selectedProject.url ? (
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 bg-[#00F5A0] hover:bg-[#00df90] text-black font-semibold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors"
                    >
                      <span>Launch Live Application</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-xs text-zinc-500 font-mono">
                      Proprietary client design system
                    </span>
                  )}
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
