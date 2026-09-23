import React, { useState } from 'react';
import { Eye, Layers, Sliders, Maximize2 } from 'lucide-react';
import cinematicGraded from '../assets/images/portfolio_cinematic_graded_1790169090933.jpg';
import uiShowcase from '../assets/images/portfolio_ui_showcase_1790169100195.jpg';
import motionFrame from '../assets/images/portfolio_motion_frame_1790169109199.jpg';
import { PortfolioItem } from '../types';

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'nordic-spaces',
    title: 'Monolith Architecture Film',
    client: 'Vanguard Studios Berlin',
    category: 'Color Grading & Pacing',
    duration: '02:45',
    aspect: '2.39:1 Anamorphic',
    description: 'Transforming washed-out flat LOG camera files into rich obsidian shadows and high-acutance highlights with optical lens halation.',
    image: cinematicGraded,
    beforeLabel: 'Flat Sensor LOG',
    afterLabel: 'Cut Studio Liquid Grade',
    beforeDescription: 'Washed out, low contrast, hazy highlights, muted dynamic range.',
    afterDescription: 'Deep zero-black floor, specular rim lighting, calibrated film response.'
  },
  {
    id: 'solstice-ui',
    title: 'Solstice iOS 26 Operating Concept',
    client: 'Lumina Interface Lab',
    category: 'UI Polish & Glass Layers',
    duration: '01:15',
    aspect: '16:9 4K UHD',
    description: 'Rebuilding recorded simulator footage into floating translucent glass panels with specular reflections and continuous fluid springs.',
    image: uiShowcase,
    beforeLabel: 'Raw Screen Capture',
    afterLabel: 'iOS 26 Liquid Polish',
    beforeDescription: 'Flat 2D graphics, rigid static frames, distracting cursor jitters.',
    afterDescription: 'Multi-layer frosted blur, reactive specular highlights, haptic ease curves.'
  },
  {
    id: 'kinetic-identity',
    title: 'Chronos Kinetic Brand Identity',
    client: 'Chronos Swiss Tech',
    category: 'Motion & Sound Design',
    duration: '00:50',
    aspect: '1:1 Square & 9:16',
    description: 'Ultra-dense frame design blending volumetric liquid glass sculptures with surgical sub-bass audio transients.',
    image: motionFrame,
    beforeLabel: 'Rough 3D Animatic',
    afterLabel: 'Finished Kinetic Master',
    beforeDescription: 'Monochrome wireframe, unmixed stock audio, linear time-ramping.',
    afterDescription: 'Micro-sculpted glass refraction, -14 LUFS custom foley, 60fps velocity curve.'
  }
];

export const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const activeItem = PORTFOLIO_ITEMS[activeTab];

  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 mb-4 font-medium">
              <span>Selected Works</span>
              <span aria-hidden="true">·</span>
              <span>Before & After Fidelity</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              Surgical transformation. Drag to inspect.
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-sm">
            Drag the interactive split slider across any work to compare the raw submitted source material against the final Cut Agency master.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveTab(idx);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === idx
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'liquid-glass-subtle text-neutral-300 hover:text-white border-white/10'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Stage */}
        <div className="liquid-glass-surface rounded-3xl p-4 sm:p-8 relative">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Canvas Wrapper */}
          <div 
            className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-neutral-950 border border-white/10 select-none cursor-ew-resize"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
              const percent = (x / rect.width) * 100;
              setSliderPosition(percent);
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
              const percent = (x / rect.width) * 100;
              setSliderPosition(percent);
            }}
          >
            {/* "After" Master Image (Underneath) */}
            <img
              src={activeItem.image}
              alt={activeItem.afterLabel}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* "Before" Raw Image (Clipped Overlay with Desaturation & Low Contrast simulation) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r border-white/80 transition-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={activeItem.image}
                  alt={activeItem.beforeLabel}
                  className="absolute inset-0 w-full h-full object-cover filter contrast-75 brightness-125 saturate-50 blur-[0.5px]"
                  style={{
                    width: '100%',
                    maxWidth: 'none'
                  }}
                  referrerPolicy="no-referrer"
                />
                {/* Visual haze over before side */}
                <div className="absolute inset-0 bg-neutral-900/30 backdrop-blur-[0.5px]" />
              </div>

              {/* Before Tag */}
              <div className="absolute top-4 left-4 z-10 liquid-glass-pill px-3 py-1 rounded-full text-[11px] font-mono text-white/90">
                BEFORE: {activeItem.beforeLabel}
              </div>
            </div>

            {/* After Tag */}
            <div className="absolute top-4 right-4 z-10 liquid-glass-pill px-3 py-1 rounded-full text-[11px] font-mono text-white/90 bg-white/10">
              AFTER: {activeItem.afterLabel}
            </div>

            {/* Center Slider Divider Handle */}
            <div
              className="absolute inset-y-0 z-20 pointer-events-none flex items-center justify-center -translate-x-1/2"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-white text-black shadow-2xl flex items-center justify-center">
                <Sliders className="w-4 h-4 rotate-90" />
              </div>
            </div>

            {/* Bottom Floating Hint */}
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 pointer-events-none ${isHovering ? 'opacity-0' : 'opacity-80'}`}>
              <div className="liquid-glass-subtle px-3 py-1.5 rounded-full text-[11px] text-neutral-300 font-mono">
                Drag horizontally to compare
              </div>
            </div>
          </div>

          {/* Details below stage */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-white/[0.08]">
            <div className="md:col-span-4">
              <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1 font-mono">
                {activeItem.client} · {activeItem.duration}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {activeItem.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {activeItem.description}
              </p>
            </div>

            <div className="md:col-span-4 liquid-glass-subtle rounded-2xl p-4 border border-white/5">
              <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-mono mb-2">
                Raw Input Condition
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {activeItem.beforeDescription}
              </p>
            </div>

            <div className="md:col-span-4 liquid-glass-subtle rounded-2xl p-4 border border-white/15">
              <div className="text-[11px] uppercase tracking-wider text-white font-mono mb-2">
                Cut Studio Treatment
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed font-medium">
                {activeItem.afterDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
