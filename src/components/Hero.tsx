import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, Sparkles, SlidersHorizontal, ArrowDownRight } from 'lucide-react';
import heroImage from '../assets/images/hero_liquid_glass_studio_1790169079657.jpg';

interface HeroProps {
  onBookDirectTalk: () => void;
  onScrollToOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookDirectTalk, onScrollToOrder }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubPosition, setScrubPosition] = useState(42);

  return (
    <section className="relative pt-20 pb-28 md:pt-32 md:pb-40 px-6 overflow-hidden">
      {/* Subtle monochrome ambient light spot behind hero */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.04] blur-[140px] rounded-full"
      />

      <div className="max-w-7xl mx-auto">
        {/* Top headline block with signature load-in motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-neutral-400 mb-6 font-medium">
            <span>Video & Interface Atelier</span>
            <span aria-hidden="true">·</span>
            <span>iOS 26 Liquid Glass Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white text-balance leading-[1.08] mb-8">
            The liquid glass editing service for visionary media.
          </h1>

          <p className="text-lg sm:text-xl text-neutral-400 font-normal leading-relaxed text-balance max-w-2xl mx-auto mb-10">
            We sculpt raw cinematic footage and product interfaces into pure monochrome prestige. Specular light tracking, tactile sonic impact, and precision surgical pacing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onBookDirectTalk}
              className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-black bg-white rounded-full hover:bg-neutral-200 transition-all cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2"
            >
              <span>Book a Direct Talk</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onScrollToOrder}
              className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 rounded-full transition-all cursor-pointer backdrop-blur-xl"
            >
              Submit Footage & Estimate
            </button>
          </div>
        </motion.div>

        {/* Liquid Glass Mockup Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main glass frame */}
          <div className="liquid-glass-surface rounded-[2.5rem] p-4 sm:p-6 relative overflow-hidden group">
            {/* Top specular reflection rim */}
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

            {/* Mockup Header bar */}
            <div className="flex items-center justify-between pb-4 px-2 border-b border-white/[0.08] text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white/20 border border-white/30" />
                <span className="w-3 h-3 rounded-full bg-white/10" />
                <span className="w-3 h-3 rounded-full bg-white/10" />
                <span className="ml-3 text-white font-medium">Cut Engine // Master Timeline 01</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline-block text-neutral-500 font-mono text-[11px]">4K ProRes 4444 XQ</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-white/10 text-white font-mono">24.000 FPS</span>
              </div>
            </div>

            {/* Video Canvas Layer */}
            <div className="relative mt-4 rounded-2xl overflow-hidden aspect-[16/9] bg-neutral-950 border border-white/10">
              <img
                src={heroImage}
                alt="Cut Agency iOS 26 Liquid Glass video editing interface"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />

              {/* Glass overlay control overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause studio reel' : 'Play studio reel'}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full liquid-glass-pill flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-2xl"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-white" />
                  ) : (
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* Bottom HUD glass pill */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 liquid-glass-subtle rounded-2xl p-3 sm:p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-neutral-300 font-mono">
                  <div className="flex items-center gap-3">
                    <button 
                      type="button" 
                      onClick={() => setIsPlaying(!isPlaying)} 
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <span>00:01:24:18</span>
                    <span className="text-neutral-600">/</span>
                    <span className="text-neutral-500">00:03:40:00</span>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-neutral-400" />
                      <span>-14 LUFS</span>
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Liquid Glass Grade</span>
                    </span>
                  </div>
                </div>

                {/* Interactive scrubber */}
                <div className="relative w-full flex items-center pt-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scrubPosition}
                    onChange={(e) => setScrubPosition(Number(e.target.value))}
                    aria-label="Timeline scrubber"
                    className="w-full cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Timeline Multi-track Glass Strip */}
            <div className="mt-4 grid grid-cols-12 gap-2 text-xs font-mono">
              <div className="col-span-12 sm:col-span-3 liquid-glass-subtle rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] uppercase tracking-wider">Tracks</span>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </div>
                <div className="mt-2 space-y-1 text-[11px] text-neutral-300">
                  <div className="flex justify-between"><span>V1: Master Grade</span><span className="text-neutral-500">Active</span></div>
                  <div className="flex justify-between"><span>V2: Liquid Overlay</span><span className="text-neutral-500">Optic</span></div>
                  <div className="flex justify-between"><span>A1: Spatial Sound</span><span className="text-neutral-500">Stereo</span></div>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-9 liquid-glass-subtle rounded-xl p-3 overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between text-neutral-500 text-[11px]">
                  <span>Timeline Sequences</span>
                  <span>Continuous 30,000 MMK / Min</span>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  <div className="h-6 rounded bg-white/15 border border-white/20 px-2 flex items-center text-[10px] text-white truncate">
                    01_Intro_Glass
                  </div>
                  <div className="h-6 rounded bg-white/25 border border-white/30 px-2 flex items-center text-[10px] text-white font-medium truncate">
                    02_UI_MicroZoom
                  </div>
                  <div className="h-6 rounded bg-white/10 border border-white/15 px-2 flex items-center text-[10px] text-neutral-300 truncate">
                    03_Grade_Transition
                  </div>
                  <div className="h-6 rounded bg-white/20 border border-white/25 px-2 flex items-center text-[10px] text-white truncate">
                    04_Outro_Lock
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
