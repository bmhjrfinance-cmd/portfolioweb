import React, { useEffect, useRef } from 'react';

interface ScrollCanvasProps {
  totalFrames?: number;
  className?: string;
  onProgress?: (progress: number) => void;
}

export const ScrollCanvas: React.FC<ScrollCanvasProps> = ({
  totalFrames = 120,
  className = '',
  onProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);
    let currentFrameIndex = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrameId: number;
    let isDisposed = false;

    // Build URL ensuring compatibility with Vite base path (e.g. /REPO-NAME/)
    const rawBase = import.meta.env.BASE_URL || '/';
    const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

    const getFrameUrl = (index: number) => {
      const num = String(index + 1).padStart(3, '0');
      return `${baseUrl}frames/ezgif-frame-${num}.webp`;
    };

    // Helper to load a single frame
    const loadFrame = (index: number, onComplete?: (img: HTMLImageElement) => void) => {
      if (images[index] || index >= totalFrames || isDisposed) return;
      const img = new Image();
      img.src = getFrameUrl(index);
      img.onload = () => {
        if (isDisposed) return;
        images[index] = img;
        if (onComplete) onComplete(img);
      };
    };

    // 1. Immediately load frame 0 for instant initial paint
    loadFrame(0, () => {
      renderFrame(0);
    });

    // 2. High-priority preload for the first ~10 frames (initial scroll buffer)
    const INITIAL_PRELOAD_COUNT = Math.min(10, totalFrames);
    for (let i = 1; i < INITIAL_PRELOAD_COUNT; i++) {
      loadFrame(i);
    }

    // 3. Progressive lazy-load for the remaining frames (10 to totalFrames - 1)
    // Uses requestIdleCallback with setTimeout fallback to keep main thread and initial paint fast
    const scheduleRemainingFrames = () => {
      let nextIndex = INITIAL_PRELOAD_COUNT;
      const loadNextBatch = () => {
        if (isDisposed || nextIndex >= totalFrames) return;
        const BATCH_SIZE = 5;
        const end = Math.min(nextIndex + BATCH_SIZE, totalFrames);
        for (let i = nextIndex; i < end; i++) {
          loadFrame(i);
        }
        nextIndex = end;
        if (nextIndex < totalFrames) {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadNextBatch, { timeout: 150 });
          } else {
            setTimeout(loadNextBatch, 50);
          }
        }
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadNextBatch, { timeout: 300 });
      } else {
        setTimeout(loadNextBatch, 100);
      }
    };

    scheduleRemainingFrames();

    // Dynamic nearest-frame fallback to prevent any blank frame or stutter
    const getBestFrame = (index: number): HTMLImageElement | null => {
      if (images[index] && images[index]?.complete && (images[index]?.naturalWidth ?? 0) > 0) {
        return images[index];
      }
      for (let offset = 1; offset < totalFrames; offset++) {
        const prev = index - offset;
        if (prev >= 0 && images[prev] && images[prev]?.complete && (images[prev]?.naturalWidth ?? 0) > 0) {
          return images[prev];
        }
        const next = index + offset;
        if (next < totalFrames && images[next] && images[next]?.complete && (images[next]?.naturalWidth ?? 0) > 0) {
          return images[next];
        }
      }
      return images[0] || null;
    };

    // Render frame strictly end-to-end without zoom in or out
    const renderFrame = (index: number) => {
      const img = getBestFrame(index);
      if (!img) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Dark base fill
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Maintain aspect ratio while covering entire viewport edge-to-edge
      const imgW = img.naturalWidth || 1280;
      const imgH = img.naturalHeight || 720;
      const hRatio = canvasWidth / imgW;
      const vRatio = canvasHeight / imgH;
      const ratio = Math.max(hRatio, vRatio);

      const renderWidth = imgW * ratio;
      const renderHeight = imgH * ratio;

      const offsetX = (canvasWidth - renderWidth) / 2;
      const offsetY = (canvasHeight - renderHeight) / 2;

      ctx.drawImage(
        img,
        0,
        0,
        imgW,
        imgH,
        offsetX,
        offsetY,
        renderWidth,
        renderHeight
      );
    };

    // High DPI Canvas Scaling
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      renderFrame(currentFrameIndex);
    };

    // Calculate normalized page scroll progress (0.0 at top -> 1.0 at bottom)
    const updateScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        targetProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      } else {
        targetProgress = 0;
      }
    };

    // Buttery smooth animation interpolation loop
    const animationLoop = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.00005) {
        currentProgress += diff * 0.12;
      } else {
        currentProgress = targetProgress;
      }

      if (onProgress) {
        onProgress(currentProgress);
      }

      const targetFrame = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(currentProgress * (totalFrames - 1)))
      );

      if (targetFrame !== currentFrameIndex) {
        currentFrameIndex = targetFrame;
        renderFrame(currentFrameIndex);
      }

      animationFrameId = requestAnimationFrame(animationLoop);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    resizeCanvas();
    updateScrollProgress();
    animationFrameId = requestAnimationFrame(animationLoop);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, [totalFrames, onProgress]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        id="scroll-animation-canvas"
        width={1280}
        height={720}
        role="img"
        aria-label="Interactive 3D spatial scroll animation depicting avant-garde visual sequences by Blessing Moses Junior"
        className="w-full h-full block"
      />
      {/* Subtle cinematic gradient scrim for high text contrast without washing out the visual */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-black/15 pointer-events-none backdrop-brightness-95" />
    </div>
  );
};
