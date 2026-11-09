# Avant-Garde Spatial Portfolio with Smooth Scroll Animation

An avant-garde portfolio featuring an implanted 120-frame scroll animation sequence operating beneath the layout.

## Key Highlights

- **Implanted Scroll Animation**: The 120-frame visual sequence is pinned edge-to-edge (`100vw` × `100vh`) in the background, smoothly scrubbing from frame 1 to frame 120 as the user travels through the sections.
- **End-to-End Viewport Coverage**: Aspect ratio is preserved with high-DPI retina canvas scaling (`Math.max(wRatio, hRatio)`) without stretching and without any zoom in or zoom out distortion.
- **Glassmorphic Layering**: The original plain black layout was converted to transparent / dark frosted glass overlays (`backdrop-blur`, subtle cinematic scrims), ensuring the underlying animation is clearly visible while text contrast remains high.
- **Lenis Smooth Scroll**: Inertial momentum smooth scrolling ensures fluid, stutter-free movement on both mouse wheel and trackpad.
- **Zero Flickering Preloader**: Instant initial frame presentation with dynamic nearest-frame fallback.
- **Complete Sections & Component Suite**:
  - Top Navigation Bar with live availability pill and brand indicator
  - Structural Guide Lines
  - Hero with Headline, Drop-Cap statement, and interactive "Explore Work" CTA
  - Technical Stack & Partner Marquee
  - About Section ("Who I Am" split-screen)
  - Philosophy & Manifesto
  - Services Offered (3-column pillar grid)
  - Portfolio Showcase (3D spatial carousel deck)
  - Direct Contact Form & Interactive State
  - Technical Footer & Compliance Bar
  - Ambient Sound Synthesizer & Legal Modals

## Running Locally

### Option 1: One-Click Launch (Windows)
Double-click `start.bat`. It will launch the Vite development server and open `http://localhost:3000` in your default browser.

### Option 2: Terminal
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Option 3: Production Build & Preview
```bash
npm run build
npm run preview
```
