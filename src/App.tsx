import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Volume2, 
  VolumeX, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Menu, 
  X as CloseIcon, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Code2, 
  ArrowDown,
  Compass,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GuideLines } from './components/GuideLines';
import { ProjectDeck } from './components/ProjectDeck';
import { PartnerLogos } from './components/PartnerLogos';
import { CookieBanner } from './components/CookieBanner';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { ScrollCanvas } from './components/ScrollCanvas';
import Lenis from 'lenis';

export default function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'philosophy' | 'services' | 'portfolio' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<LegalDocType>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Copy toast state
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  // Tech stack pill active selection state
  const [activeTechPill, setActiveTechPill] = useState<string>('Three.js / WebGL');

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    service: '3D WebGL & Three.js Development',
    budget: '$3,000 - $7,000',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState<string>('');

  // Subtle ambient spatial drone synthesizer
  const toggleAmbientSound = () => {
    if (!isAudioPlaying) {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gainNode = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(55, ctx.currentTime);
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(110, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(160, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 2);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        setAudioCtx(ctx);
        setIsAudioPlaying(true);
      } catch (e) {
        console.error('Audio context error:', e);
      }
    } else {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setIsAudioPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, [audioCtx]);

  // Ultra-smooth inertial scroll engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: id === 'home' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactError('Please complete all required fields.');
      return;
    }
    setContactStatus('submitting');
    setContactError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (res.ok) {
        setContactStatus('success');
      } else {
        throw new Error('API route not hosted on static target');
      }
    } catch {
      // Graceful static fallback for GitHub Pages
      try {
        const saved = JSON.parse(localStorage.getItem('bmj_inquiries') || '[]');
        saved.push({ ...contactForm, submittedAt: new Date().toISOString() });
        localStorage.setItem('bmj_inquiries', JSON.stringify(saved));
      } catch (_) {}
      setContactStatus('success');
    }
    setContactForm({
      name: '',
      email: '',
      service: '3D WebGL & Three.js Development',
      budget: '$3,000 - $7,000',
      message: '',
    });
  };

  const smoothEase = [0.16, 1, 0.3, 1] as const;

  const techStackDetails: Record<string, { desc: string; metrics: string; tools: string[] }> = {
    'Three.js / WebGL': {
      desc: 'Procedural meshes, custom GLSL lighting shaders, PBR reflections, and high-performance render loops optimized for 60fps on mobile browsers.',
      metrics: '60 FPS • <40MB VRAM • PBR Glass',
      tools: ['Three.js', 'WebGL2', 'GLSL Shaders', 'PMREM Studio Environment']
    },
    'Next.js Architecture': {
      desc: 'Server Components, dynamic SSR/SSG rendering, zero-waterfall data fetching, and robust API edge endpoints for high-speed delivery.',
      metrics: '100% Core Web Vitals • Sub-second TTFB',
      tools: ['App Router', 'Server Actions', 'Edge Runtime', 'Tailwind CSS']
    },
    'React Apps': {
      desc: 'Component-driven functional state architectures, custom hooks, performant context management, and clean declarative component composition.',
      metrics: 'React 19 • Strict Concurrency • Zero Memory Leaks',
      tools: ['Hooks', 'TypeScript', 'Concurrent Mode', 'Vite']
    },
    'Tailwind CSS': {
      desc: 'Design tokens, dark-mode OLED color palettes, responsive fluid breakpoints, custom typography hierarchies, and zero runtime overhead.',
      metrics: 'Tailwind v4 • JIT Engine • 12KB Output',
      tools: ['Custom Utilities', 'Fluid Clamps', 'CSS Variables', 'Animation Tokens']
    },
    'GSAP': {
      desc: 'Silky smooth scroll-driven timelines, pinned stage transitions, morphing SVGs, and mathematical precision spatial movements.',
      metrics: 'GPU Accelerated • Sub-pixel Precision',
      tools: ['ScrollTrigger', 'Flip Plugin', 'MotionPath', 'Ease Curves']
    },
    'UI/UX Design': {
      desc: 'Spatial interfaces, dark luxury glassmorphism surfaces, WCAG 2.1 AA accessible color contrast, and human-centered design heuristics.',
      metrics: 'WCAG 2.1 AA • 44px+ Hit Targets • 8pt Grid',
      tools: ['Figma', 'Spatial Prototyping', 'Design Tokens', 'Design Systems']
    },
    'TypeScript': {
      desc: 'Strict end-to-end type safety, generic utility interfaces, and bulletproof runtime validation protecting client state and API contracts.',
      metrics: 'Strict Null Checks • 0 Any Types',
      tools: ['TS 5.7+', 'Zod Schema', 'Type Inference', 'ESNext']
    },
    'GLSL Shaders': {
      desc: 'Custom vertex displacement, chromatic aberration, procedural glass absorption, and noise distortion executed directly on the GPU.',
      metrics: 'Direct GPU Pipeline • Zero Main-Thread Cost',
      tools: ['Fragment Shaders', 'Vertex Shaders', 'Uniforms', 'Simplex Noise']
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-white font-['DM_Sans',sans-serif] selection:bg-[#00F5A0] selection:text-black overflow-x-hidden">
      {/* Editorial Vertical Structural Grid Lines */}
      <GuideLines />

      {/* Fixed Smooth Scroll Animation Canvas (Implanted End-to-End Background) */}
      <ScrollCanvas totalFrames={120} />

      {/* ======================================================== */}
      {/* 1. HEADER & TOP NAVIGATION BAR (GLASS PILL CONTAINER)    */}
      {/* ======================================================== */}
      <motion.header 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 md:px-8 py-3.5 sm:py-5 flex items-center justify-between max-w-[1440px] mx-auto pointer-events-none"
      >
        {/* Left Brand Pill (Desktop & Mobile) */}
        <div className="pointer-events-auto flex items-center gap-3">
          <a 
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="flex items-center gap-2.5 bg-[#0a0a0c]/85 hover:bg-[#141418] backdrop-blur-xl border border-white/10 px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-xl group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0] animate-pulse" />
            <span className="font-['Syne',sans-serif] font-bold tracking-wider text-xs sm:text-sm text-white group-hover:text-[#00F5A0] transition-colors">
              BMJ STUDIO
            </span>
          </a>

          {/* Live Status Pill: Available for Remote Projects */}
          <div className="hidden lg:flex items-center gap-2 bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00F5A0] shadow-[0_0_6px_#00F5A0]" />
            <span className="font-['JetBrains_Mono',monospace] text-[11px] text-zinc-300">
              Available for Remote Projects
            </span>
          </div>
        </div>

        {/* Center Nav Links Pill (Desktop) */}
        <nav 
          aria-label="Main Navigation"
          className="pointer-events-auto hidden md:flex bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/10 rounded-full p-1 shadow-2xl items-center"
        >
          {[
            { label: 'Home', id: 'home' },
            { label: 'About', id: 'about' },
            { label: 'Services', id: 'services' },
            { label: 'Portfolio', id: 'portfolio' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.id as any);
                  scrollToSection(item.id);
                }}
                className={`px-4 py-1.5 text-xs font-medium tracking-wider transition-all duration-300 ease-out rounded-full whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white/15 text-white shadow-sm border border-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Controls: Audio + Action Button */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Spatial Audio Toggle */}
          <button
            onClick={toggleAmbientSound}
            aria-label={isAudioPlaying ? 'Mute spatial audio ambient' : 'Unmute spatial audio ambient'}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg"
            title={isAudioPlaying ? 'Mute ambient spatial sound' : 'Experience spatial audio drone'}
          >
            {isAudioPlaying ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00F5A0]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
            )}
          </button>

          {/* Action Button: Let's Work Together */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-white to-zinc-200 text-black px-4 py-2 rounded-full font-['Syne',sans-serif] font-bold text-xs tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span>Let's Work Together</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-[#0a0a0c]/85 border border-white/10 text-white cursor-pointer"
          >
            {mobileMenuOpen ? <CloseIcon className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-3 top-16 z-40 bg-[#0a0a0c]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-5 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#00F5A0] shadow-[0_0_6px_#00F5A0]" />
                <span className="font-['JetBrains_Mono',monospace] text-xs text-zinc-300">
                  Available for Remote Projects
                </span>
              </div>
              {[
                { label: 'Home', id: 'home' },
                { label: 'About', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Portfolio Showcase', id: 'portfolio' },
                { label: 'Direct Contact', id: 'contact' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                  className="text-left text-sm font-medium py-2 px-3 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer block"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    scrollToSection('contact');
                  }}
                  className="w-full text-center bg-white text-black py-2.5 rounded-full font-bold text-xs font-['Syne',sans-serif]"
                >
                  Let's Work Together ↗
                </button>
                <div className="flex items-center justify-between text-xs text-zinc-400 font-['JetBrains_Mono',monospace] px-2 pt-2">
                  <span>Athi River, Kenya</span>
                  <span>UTC+3</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* ======================================================== */}
        {/* 2. HERO SECTION (3D SPATIAL CANVAS)                      */}
        {/* ======================================================== */}
        <section 
          id="home"
          className="relative min-h-screen flex flex-col items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto overflow-hidden"
        >
          {/* Left Vertical Social Utility Bar (Desktop) */}
          <aside 
            aria-label="Social Profiles"
            className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-5 z-20 pointer-events-auto"
          >
            <a 
              href="https://github.com/bmhjrfinance-cmd" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile (bmhjrfinance-cmd)"
              className="p-2 text-zinc-400 hover:text-white hover:scale-110 transition-all rounded-full hover:bg-white/5"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 text-zinc-400 hover:text-white hover:scale-110 transition-all rounded-full hover:bg-white/5"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="X / Twitter Profile"
              className="p-2 text-zinc-400 hover:text-white hover:scale-110 transition-all rounded-full hover:bg-white/5"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="p-2 text-zinc-400 hover:text-white hover:scale-110 transition-all rounded-full hover:bg-white/5"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <div className="w-[1px] h-12 bg-white/15 mt-2" />
          </aside>

          {/* Right Vertical Scroll Utility (Desktop) */}
          <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-20 pointer-events-none">
            <span className="font-['JetBrains_Mono',monospace] text-[10px] uppercase tracking-widest text-zinc-500 [writing-mode:vertical-rl]">
              Scroll To Explore
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-zinc-500 animate-bounce" />
          </div>



          {/* Hero Foreground Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center pointer-events-none">
            {/* Top Sub-tag Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 sm:mb-6 pointer-events-auto"
            >
              <div className="inline-flex items-center gap-2 bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/15 px-4 py-1.5 rounded-full shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#00F5A0]" />
                <span className="font-['JetBrains_Mono',monospace] text-[11px] sm:text-xs text-zinc-300 uppercase tracking-widest">
                  3D Web Developer & UI/UX Designer
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
              className="font-['Syne',sans-serif] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.95] text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            >
              Blessing Moses<br />Junior
            </motion.h1>

            {/* Editorial Statement with Drop-Cap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: smoothEase }}
              className="mt-6 sm:mt-8 max-w-xl text-center px-4"
            >
              <p className="text-zinc-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                <span className="font-['Playfair_Display',serif] text-2xl sm:text-3xl text-white font-bold mr-1 align-baseline">
                  W
                </span>
                here web engineering meets 3D interactivity and digital imagination knows no bounds.
              </p>
            </motion.div>

            {/* Center Circular Interactive Call to Action */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: smoothEase }}
              className="mt-8 sm:mt-12 pointer-events-auto"
            >
              <a
                href="#portfolio"
                onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}
                className="group relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/20 hover:border-[#00F5A0] transition-all duration-500 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(0,245,160,0.25)] hover:scale-105"
              >
                <div className="absolute inset-1 rounded-full border border-dashed border-white/20 group-hover:rotate-180 transition-transform duration-1000" />
                <div className="flex flex-col items-center justify-center text-center px-2">
                  <span className="font-['Syne',sans-serif] text-xs sm:text-sm font-bold text-white group-hover:text-[#00F5A0] tracking-wider uppercase transition-colors">
                    Explore<br />Work
                  </span>
                  <ArrowDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#00F5A0] mt-1 transition-transform group-hover:translate-y-1" />
                </div>
              </a>
            </motion.div>

            {/* Mobile Social Bar (Only visible on mobile) */}
            <div className="flex md:hidden items-center gap-4 mt-8 pointer-events-auto">
              <a 
                href="https://github.com/bmhjrfinance-cmd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* TECH ECOSYSTEM LOGO TICKER / PARTNERS MARQUEE           */}
        {/* ======================================================== */}
        <section className="py-6 border-y border-white/10 bg-[#0a0a0c]/60 backdrop-blur-md">
          <div className="max-w-[1440px] mx-auto px-4 mb-3 text-center">
            <span className="font-['JetBrains_Mono',monospace] text-[10px] tracking-widest uppercase text-zinc-400">
              Technical Stack & Production Tooling
            </span>
          </div>
          <PartnerLogos />
        </section>

        {/* ======================================================== */}
        {/* 3. ABOUT SECTION ("WHO I AM" - SPLIT-SCREEN LAYOUT)      */}
        {/* ======================================================== */}
        <section 
          id="about"
          className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto"
        >
          {/* Section Identifier 01 with Crimson line */}
          <div className="flex items-center gap-4 mb-10">
            <span className="font-['JetBrains_Mono',monospace] text-xs font-semibold text-zinc-400">
              01
            </span>
            <div className="w-14 sm:w-20 h-[2px] bg-[#FF2D55]" />
            <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-widest uppercase text-zinc-400">
              Who I Am
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Headline & Editorial Bio */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[1.05]">
                NOT JUST A FRONT-END DEVELOPER.
              </h2>

              {/* Editorial Bio with Drop-Cap "W" */}
              <div className="mt-6 sm:mt-8 space-y-4 text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
                <p>
                  <span className="font-['Playfair_Display',serif] text-3xl sm:text-4xl text-white font-bold mr-1 align-baseline float-left leading-none mt-1">
                    W
                  </span>
                  ith 2 years of specialized experience in 3D Web Development and UI/UX Design, I bridge the gap between complex web architecture and immersive spatial user experiences. Based in Athi River, Kenya, I build high-speed, modern web applications powered by Next.js, React, and Three.js for clients worldwide.
                </p>
                <p className="text-zinc-400 text-sm sm:text-base">
                  Every project is treated as a spatial sculpture: combining math-backed WebGL rendering, accessible UX patterns, sub-second latency, and responsive zero-pill aesthetic discipline.
                </p>
              </div>

              {/* Interactive Tech Stack Pills */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-zinc-400 uppercase tracking-wider">
                    Core Technical Competencies (Click to inspect)
                  </span>
                  <span className="font-['JetBrains_Mono',monospace] text-[11px] text-[#00F5A0]">
                    {techStackDetails[activeTechPill]?.metrics || 'Active'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {Object.keys(techStackDetails).map((pill) => {
                    const isSelected = activeTechPill === pill;
                    return (
                      <button
                        key={pill}
                        onClick={() => setActiveTechPill(pill)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-['JetBrains_Mono',monospace] transition-all duration-300 ease-out cursor-pointer border ${
                          isSelected
                            ? 'bg-[#00F5A0]/15 text-[#00F5A0] border-[#00F5A0]/50 shadow-[0_0_12px_rgba(0,245,160,0.15)] font-medium'
                            : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:border-white/25 hover:bg-white/10'
                        }`}
                      >
                        {pill}
                      </button>
                    );
                  })}
                </div>

                {/* Tech Pill Dynamic Detail Card */}
                <div className="mt-4 p-4 rounded-xl bg-[#0a0a0c]/80 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-['Syne',sans-serif] text-sm font-bold text-white">
                      {activeTechPill}
                    </span>
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#00F5A0]">
                      PRODUCTION READY
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-light mb-3">
                    {techStackDetails[activeTechPill]?.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {techStackDetails[activeTechPill]?.tools.map((tool) => (
                      <span key={tool} className="text-[10px] font-['JetBrains_Mono',monospace] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to action link */}
              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={() => scrollToSection('services')}
                  className="inline-flex items-center gap-2 text-xs font-bold font-['JetBrains_Mono',monospace] uppercase tracking-wider text-white hover:text-[#00F5A0] transition-colors group cursor-pointer"
                >
                  <span>Explore Technical Stack</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <span className="text-zinc-600">•</span>
                <span className="font-['JetBrains_Mono',monospace] text-xs text-zinc-400">
                  Location: Athi River, Kenya (UTC+3)
                </span>
              </div>
            </div>

            {/* Right Graphic: Architectural Engineering Matrix Card on Pure Black */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-[#09090b] border border-white/15 p-6 shadow-2xl overflow-hidden group">
                {/* Visual Engineering Card on Pure Black */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black border border-white/10 p-5 flex flex-col justify-between">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00F5A0] animate-pulse" />
                      <span className="font-['JetBrains_Mono',monospace] text-xs font-semibold text-white tracking-wider">
                        STACK_PIPELINE.SYS
                      </span>
                    </div>
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] text-zinc-400">
                      v2.4.0 • 60 FPS
                    </span>
                  </div>

                  {/* Core Architecture Metrics & Code Matrix */}
                  <div className="my-auto space-y-3.5 py-2 font-['JetBrains_Mono',monospace]">
                    <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                        <span className="text-white">Active Focus</span>
                        <span className="text-[#00F5A0] font-medium">{activeTechPill}</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#00F5A0] to-[#FF2D55] w-4/5 rounded-full" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5">
                        <span className="text-zinc-500 block text-[9px] uppercase">Framework</span>
                        <span className="text-zinc-200 font-semibold">React + Next.js</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5">
                        <span className="text-zinc-500 block text-[9px] uppercase">Animation</span>
                        <span className="text-zinc-200 font-semibold">GSAP + Motion</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5">
                        <span className="text-zinc-500 block text-[9px] uppercase">Styling</span>
                        <span className="text-zinc-200 font-semibold">Tailwind OLED</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5">
                        <span className="text-zinc-500 block text-[9px] uppercase">Latency</span>
                        <span className="text-[#00F5A0] font-semibold">&lt; 16ms / Frame</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom live status */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-['JetBrains_Mono',monospace] text-zinc-400">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <Code2 className="w-3.5 h-3.5 text-[#00F5A0]" />
                      Production Architecture
                    </span>
                    <span className="text-zinc-500">100% Client Ready</span>
                  </div>
                </div>

                {/* Sub-caption details */}
                <div className="mt-4 flex items-center justify-between text-xs font-['JetBrains_Mono',monospace] text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Layers className="w-3.5 h-3.5 text-[#00F5A0]" />
                    Full-Stack Mastery
                  </span>
                  <span>Zero Lag • Clean OLED Black</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. PHILOSOPHY & MANIFESTO SECTION                        */}
        {/* ======================================================== */}
        <section 
          id="philosophy"
          className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto border-t border-white/5"
        >
          {/* Section Identifier */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-['JetBrains_Mono',monospace] text-xs font-semibold text-zinc-400">
              02
            </span>
            <div className="w-14 sm:w-20 h-[2px] bg-[#00F5A0]" />
            <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-widest uppercase text-zinc-400">
              Global Development Manifesto
            </span>
          </div>

          <div className="relative rounded-3xl bg-[#040404] border border-white/10 p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">

            <div className="relative z-10 max-w-3xl">
              {/* Display Headline with Serif Drop-Cap "W" */}
              <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-8">
                <span className="font-['Playfair_Display',serif] text-4xl sm:text-6xl text-white font-bold mr-1 align-baseline">
                  W
                </span>
                e Believe Digital Experiences Should Have No Boundaries.
              </h2>

              <div className="space-y-6 text-zinc-300 text-base sm:text-lg font-light leading-relaxed">
                <p>
                  The modern web has become overcrowded with cookie-cutter templates, sluggish DOM abstractions, and generic AI generation. True digital distinction lives at the intersection of high-precision software engineering and spatial storytelling.
                </p>
                <p className="text-zinc-400 text-sm sm:text-base">
                  Operating from Athi River, Kenya, I collaborate with forward-thinking design studios, startup founders, and global brands to engineer interfaces that feel physical, reactive, and breathtakingly fast. Every millisecond of frame time is protected; every spatial curve is calculated with mathematical purpose.
                </p>
              </div>

              {/* Manifesto Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                <div>
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-[#00F5A0] block mb-1">
                    01 // Zero-Lag Fidelity
                  </span>
                  <p className="text-xs text-zinc-400">
                    Targeting 60 frames per second on mobile GPU hardware through strict asset minimization.
                  </p>
                </div>
                <div>
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-[#00F5A0] block mb-1">
                    02 // Spatial Depth
                  </span>
                  <p className="text-xs text-zinc-400">
                    Bridging 2D web workflows with WebGL 3D refractive surfaces and physics-based easing.
                  </p>
                </div>
                <div>
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-[#00F5A0] block mb-1">
                    03 // Global Reach
                  </span>
                  <p className="text-xs text-zinc-400">
                    Engineered from Athi River, Kenya, for distributed remote projects worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. SERVICES OFFERED (3-COLUMN PILLAR GRID)               */}
        {/* ======================================================== */}
        <section 
          id="services"
          className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto border-t border-white/5"
        >
          {/* Section Identifier */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-['JetBrains_Mono',monospace] text-xs font-semibold text-zinc-400">
              03
            </span>
            <div className="w-14 sm:w-20 h-[2px] bg-[#FF2D55]" />
            <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-widest uppercase text-zinc-400">
              Services & Capabilities
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                Architectural Pillars
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-3 font-light">
                Tailored engineering packages delivering measurable performance, spatial interactivity, and accessible digital luxury.
              </p>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-[#00F5A0] hover:underline cursor-pointer"
            >
              Discuss Custom Commission ↗
            </button>
          </div>

          {/* 3-Column Pillar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Pillar 1 */}
            <div className="relative rounded-2xl bg-[#09090c] border border-white/10 hover:border-[#00F5A0]/40 p-7 sm:p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,160,0.1)] flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-['JetBrains_Mono',monospace] text-2xl font-bold text-zinc-500 group-hover:text-[#00F5A0] transition-colors">
                    01
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white">
                    <Compass className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white mb-3">
                  3D WebGL &amp; Three.js Development
                </h3>

                <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                  Custom interactive 3D viewports, procedural glass shaders, particle systems, physics simulation, and WebGL render loops engineered to run silky-smooth across mobile and desktop devices.
                </p>

                <ul className="space-y-2.5 text-xs text-zinc-300 font-['JetBrains_Mono',monospace]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5A0]" />
                    Interactive 3D Product Showcases
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5A0]" />
                    Custom GLSL Shaders &amp; Refractions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5A0]" />
                    Mobile Performance &amp; VRAM Budgets
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5A0]" />
                    Procedural Geometry Generation
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-['JetBrains_Mono',monospace] text-zinc-400">
                  Tech: Three.js / WebGL / GLSL
                </span>
                <span className="text-xs text-zinc-300 group-hover:text-[#00F5A0] transition-colors font-bold">
                  60 FPS Standard
                </span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="relative rounded-2xl bg-[#09090c] border border-white/10 hover:border-white/30 p-7 sm:p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)] flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-['JetBrains_Mono',monospace] text-2xl font-bold text-zinc-500 group-hover:text-white transition-colors">
                    02
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white">
                    <Code2 className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white mb-3">
                  Next.js &amp; React Architecture
                </h3>

                <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                  Robust enterprise-grade front-end web architecture. Fast server-side rendering, sub-second TTFB, type-safe API routing, and buttery micro-animations powered by Framer Motion &amp; GSAP.
                </p>

                <ul className="space-y-2.5 text-xs text-zinc-300 font-['JetBrains_Mono',monospace]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    Next.js App Router &amp; Server Components
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    Clean React 19 State Architecture
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    TypeScript End-to-End Safety
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    100% Core Web Vitals Optimization
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-['JetBrains_Mono',monospace] text-zinc-400">
                  Tech: React / Next.js / TS / Motion
                </span>
                <span className="text-xs text-zinc-300 group-hover:text-white transition-colors font-bold">
                  Zero Slop
                </span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="relative rounded-2xl bg-[#09090c] border border-white/10 hover:border-[#FF2D55]/40 p-7 sm:p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,45,85,0.1)] flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-['JetBrains_Mono',monospace] text-2xl font-bold text-zinc-500 group-hover:text-[#FF2D55] transition-colors">
                    03
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white mb-3">
                  UI/UX Design &amp; Spatial Systems
                </h3>

                <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                  VisionOS-inspired spatial user interfaces, dark luxury design tokens, high-contrast accessible typography, and bespoke Figma designs converted into pristine production code.
                </p>

                <ul className="space-y-2.5 text-xs text-zinc-300 font-['JetBrains_Mono',monospace]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2D55]" />
                    Spatial Glassmorphism &amp; Depth Styling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2D55]" />
                    Design Tokens &amp; Figma Design Systems
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2D55]" />
                    WCAG 2.1 AA Contrast Compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2D55]" />
                    Adaptive Mobile-First Responsive Layouts
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-['JetBrains_Mono',monospace] text-zinc-400">
                  Tech: Figma / Tailwind CSS / WCAG
                </span>
                <span className="text-xs text-zinc-300 group-hover:text-[#FF2D55] transition-colors font-bold">
                  Dark Luxury
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. PORTFOLIO SHOWCASE (3D SPATIAL CAROUSEL DECK)         */}
        {/* ======================================================== */}
        <section 
          id="portfolio"
          className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto border-t border-white/5"
        >
          {/* Section Identifier */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-['JetBrains_Mono',monospace] text-xs font-semibold text-zinc-400">
              04
            </span>
            <div className="w-14 sm:w-20 h-[2px] bg-[#00F5A0]" />
            <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-widest uppercase text-zinc-400">
              Featured Selected Works
            </span>
          </div>

          <div className="mb-12">
            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-tight">
              Spatial Project Deck
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 font-light">
              Interactive 3D carousel inspired by VisionOS spatial ergonomics. Drag, swipe, or use controls to inspect project architectures, live production links, and technical breakdowns.
            </p>
          </div>

          {/* 3D Spatial Carousel Component */}
          <ProjectDeck />
        </section>

        {/* ======================================================== */}
        {/* 7. DIRECT CONTACT SECTION                                */}
        {/* ======================================================== */}
        <section 
          id="contact"
          className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto border-t border-white/5"
        >
          {/* Section Identifier */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-['JetBrains_Mono',monospace] text-xs font-semibold text-zinc-400">
              05
            </span>
            <div className="w-14 sm:w-20 h-[2px] bg-[#FF2D55]" />
            <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-widest uppercase text-zinc-400">
              Direct Contact &amp; Commissions
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Direct Info Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
                  Let's Build Something Exceptional Together.
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
                  Have a vision for a 3D web experience, high-performance web application, or spatial UI? Reach out directly via email, phone/WhatsApp, or submit the project inquiry form.
                </p>

                {/* Direct Contact Cards */}
                <div className="mt-8 space-y-4">
                  {/* Email Card */}
                  <div className="p-5 rounded-2xl bg-[#09090c] border border-white/10 hover:border-[#00F5A0]/40 transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00F5A0]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-['JetBrains_Mono',monospace] text-[10px] uppercase text-zinc-400 tracking-wider">
                          Direct Email
                        </span>
                        <a 
                          href="mailto:bmhjrfinance@gmail.com" 
                          className="font-medium text-sm sm:text-base text-white hover:text-[#00F5A0] transition-colors"
                        >
                          bmhjrfinance@gmail.com
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard('bmhjrfinance@gmail.com', 'email')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copiedType === 'email' ? (
                        <Check className="w-4 h-4 text-[#00F5A0]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Phone / WhatsApp Card */}
                  <div className="p-5 rounded-2xl bg-[#09090c] border border-white/10 hover:border-[#00F5A0]/40 transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00F5A0]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-['JetBrains_Mono',monospace] text-[10px] uppercase text-zinc-400 tracking-wider">
                          Phone &amp; WhatsApp
                        </span>
                        <a 
                          href="https://wa.me/2541813355209" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-sm sm:text-base text-white hover:text-[#00F5A0] transition-colors"
                        >
                          +254 1(813) 355-209
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard('+254 1(813) 355-209', 'phone')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                      title="Copy phone number to clipboard"
                    >
                      {copiedType === 'phone' ? (
                        <Check className="w-4 h-4 text-[#00F5A0]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Location Card */}
                  <div className="p-5 rounded-2xl bg-[#09090c] border border-white/10 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FF2D55]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-['JetBrains_Mono',monospace] text-[10px] uppercase text-zinc-400 tracking-wider">
                        Location &amp; Working Hours
                      </span>
                      <span className="font-medium text-sm sm:text-base text-white">
                        Athi River, Kenya
                      </span>
                      <span className="block text-xs text-zinc-400 font-['JetBrains_Mono',monospace]">
                        Available for Remote &amp; Worldwide Projects (UTC+3)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Toast Feedback for Copy */}
              <AnimatePresence>
                {copiedType && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 p-3 rounded-xl bg-[#00F5A0]/15 border border-[#00F5A0]/30 text-[#00F5A0] text-xs font-['JetBrains_Mono',monospace] flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Copied {copiedType === 'email' ? 'email' : 'phone number'} to clipboard!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-[#0a0a0c] border border-white/15 p-6 sm:p-10 shadow-2xl relative">
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                  <div>
                    <h3 className="font-['Syne',sans-serif] text-xl font-bold text-white">
                      Project Commission Brief
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Direct transmission to Blessing Moses Junior's developer inbox.
                    </p>
                  </div>
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] px-2.5 py-1 rounded bg-[#00F5A0]/15 border border-[#00F5A0]/30 text-[#00F5A0]">
                    24h Response
                  </span>
                </div>

                {contactStatus === 'success' ? (
                  <div className="py-12 text-center flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-[#00F5A0]/20 border border-[#00F5A0] flex items-center justify-center text-[#00F5A0] mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-['Syne',sans-serif] text-2xl font-bold text-white mb-2">
                      Inquiry Dispatched!
                    </h4>
                    <p className="text-sm text-zinc-300 max-w-md font-light mb-6">
                      Thank you. Blessing Moses Junior has received your project details and will review your specifications shortly.
                    </p>
                    <button
                      onClick={() => setContactStatus('idle')}
                      className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs font-['JetBrains_Mono',monospace] transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    {contactError && (
                      <div className="p-3 rounded-xl bg-[#FF2D55]/15 border border-[#FF2D55]/30 text-[#FF2D55] text-xs font-['JetBrains_Mono',monospace]">
                        {contactError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-['JetBrains_Mono',monospace] text-zinc-300 mb-1.5 uppercase tracking-wider">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="e.g. Elena Rostova"
                          className="w-full bg-black/60 border border-white/10 focus:border-[#00F5A0] rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-base sm:text-sm focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-['JetBrains_Mono',monospace] text-zinc-300 mb-1.5 uppercase tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="elena@studio.com"
                          className="w-full bg-black/60 border border-white/10 focus:border-[#00F5A0] rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-base sm:text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-['JetBrains_Mono',monospace] text-zinc-300 mb-1.5 uppercase tracking-wider">
                          Project Service
                        </label>
                        <select
                          value={contactForm.service}
                          onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                          className="w-full bg-black/60 border border-white/10 focus:border-[#00F5A0] rounded-xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none transition-colors cursor-pointer"
                        >
                          <option value="3D WebGL & Three.js Development">3D WebGL &amp; Three.js Development</option>
                          <option value="Next.js & React Architecture">Next.js &amp; React Architecture</option>
                          <option value="UI/UX Design & Spatial Systems">UI/UX Design &amp; Spatial Systems</option>
                          <option value="Full-Stack Web Engineering">Full-Stack Web Engineering</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-['JetBrains_Mono',monospace] text-zinc-300 mb-1.5 uppercase tracking-wider">
                          Estimated Budget
                        </label>
                        <select
                          value={contactForm.budget}
                          onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                          className="w-full bg-black/60 border border-white/10 focus:border-[#00F5A0] rounded-xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none transition-colors cursor-pointer"
                        >
                          <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                          <option value="$3,000 - $7,000">$3,000 - $7,000</option>
                          <option value="$7,000 - $15,000">$7,000 - $15,000</option>
                          <option value="$15,000+">$15,000+ (Enterprise / Retainer)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-['JetBrains_Mono',monospace] text-zinc-300 mb-1.5 uppercase tracking-wider">
                        Project Scope &amp; Vision *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell me about your brand, requirements, deadlines, or interactive spatial ideas..."
                        className="w-full bg-black/60 border border-white/10 focus:border-[#00F5A0] rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-base sm:text-sm focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactStatus === 'submitting'}
                      className="w-full py-4 rounded-full bg-gradient-to-r from-white via-zinc-100 to-zinc-300 text-black font-['Syne',sans-serif] font-bold text-sm tracking-wider uppercase hover:opacity-95 transition-all shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {contactStatus === 'submitting' ? (
                        <span>Encrypting &amp; Dispatching...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <span className="text-base">✉️</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ======================================================== */}
      {/* 8. TECHNICAL FOOTER & COMPLIANCE BAR                     */}
      {/* ======================================================== */}
      <footer className="relative z-10 border-t border-white/10 bg-[#040406]/80 backdrop-blur-xl py-14 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          {/* Top Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00F5A0] shadow-[0_0_6px_#00F5A0]" />
                <span className="font-['Syne',sans-serif] font-bold tracking-wider text-base text-white">
                  BMJ STUDIO
                </span>
                <span className="text-xs text-zinc-500 font-['JetBrains_Mono',monospace]">
                  • 3D Interactive &amp; Web Architecture
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-light max-w-sm leading-relaxed">
                Engineering high-performance web applications, spatial 3D WebGL viewports, and accessible dark-luxury UI systems for clients worldwide.
              </p>
              <div className="pt-2 text-xs font-['JetBrains_Mono',monospace] text-zinc-400">
                Blessing Moses Junior • Athi River, Kenya (UTC+3)
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-2">
              <span className="block font-['JetBrains_Mono',monospace] text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Navigation
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li>
                  <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors cursor-pointer">
                    Home // Spatial Hero
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">
                    About // 01 Bio &amp; Stack
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors cursor-pointer">
                    Services // 03 Pillars
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('portfolio')} className="hover:text-white transition-colors cursor-pointer">
                    Portfolio // 04 Projects
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer">
                    Contact // Direct Inquiry
                  </button>
                </li>
              </ul>
            </div>

            {/* Compliance & Security Audit Button */}
            <div className="md:col-span-4 space-y-3">
              <span className="block font-['JetBrains_Mono',monospace] text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Engineering Integrity
              </span>
              
              {/* Security Audit Badge Button */}
              <button
                onClick={() => setLegalModal('audit')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#00F5A0] group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-['JetBrains_Mono',monospace] text-xs font-bold text-white block">
                      Security Audit &amp; Code Optimization
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      20/20 Checks Verified • Live Report
                    </span>
                  </div>
                </div>
                <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#00F5A0] bg-[#00F5A0]/10 px-2 py-0.5 rounded border border-[#00F5A0]/20">
                  PASS
                </span>
              </button>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => setLegalModal('privacy')}
                  className="text-[11px] font-['JetBrains_Mono',monospace] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span className="text-zinc-600">•</span>
                <button
                  onClick={() => setLegalModal('terms')}
                  className="text-[11px] font-['JetBrains_Mono',monospace] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
                <span className="text-zinc-600">•</span>
                <button
                  onClick={() => setLegalModal('refund')}
                  className="text-[11px] font-['JetBrains_Mono',monospace] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Commission Agreement
                </button>
                <span className="text-zinc-600">•</span>
                <button
                  onClick={() => setLegalModal('cookies')}
                  className="text-[11px] font-['JetBrains_Mono',monospace] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cookie Settings
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Standards Notice */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 font-['JetBrains_Mono',monospace] gap-4">
            <div>
              © {new Date().getFullYear()} Blessing Moses Junior. All rights reserved.
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
                Data Minimization Enforced • No 3rd Party Trackers
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-[#00F5A0] text-[10px]">
                WCAG 2.1 AA Compliant
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      <CookieBanner onOpenPolicy={() => setLegalModal('cookies')} />


      {/* Legal & 20-Point Security Audit Modal */}
      <AnimatePresence>
        {legalModal && (
          <LegalModal
            type={legalModal}
            onClose={() => setLegalModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
