import React from 'react';
import { Eye, Activity, VolumeX, Layers, Check } from 'lucide-react';
import { ServiceItem } from '../types';

const SERVICES: ServiceItem[] = [
  {
    id: 'color-grading',
    index: '01',
    title: 'Color Grading',
    tagline: 'Deep obsidian contrast and spectral luminous roll-offs.',
    description: 'We treat digital sensors like high-density black and white stock. Custom luminance curves, anti-aliased highlight compression, and calibrated optical halation engineered for OLED displays.',
    deliverables: ['Custom Monochrome LUTs', 'Highlight & Shadow Curve Calibration', 'Micro-Grain Optical Texturing', 'HDR & SDR Display Pass'],
    specs: 'Delivered in 10-bit / 12-bit ProRes 4444'
  },
  {
    id: 'motion-architecture',
    index: '02',
    title: 'Motion Architecture',
    tagline: 'Fluid iOS 26 spring dynamics and hypnotic pacing.',
    description: 'Every keyframe is mapped to physical spring mass models. We eliminate abrupt transitions in favor of continuous momentum, kinetic zooms, and seamless spatial dimensional shifts.',
    deliverables: ['Spring Physics Transitions', 'Kinetic Title Staging', 'Viewport Dimension Shifts', 'Dynamic Velocity Ramping'],
    specs: '60 FPS / 120 FPS High-Refresh Masters'
  },
  {
    id: 'sound-design',
    index: '03',
    title: 'Sound Design',
    tagline: 'Tactile sub-impacts and surgical auditory realism.',
    description: 'Audio is 50% of the visual perception. We engineer tactile glass clicks, weighted sub-bass drops, spatial stereo pans, and broadcast-level LUFS loudness mastering.',
    deliverables: ['Bespoke Foley & Haptic Clicks', 'Sub-bass Transient Design', 'Spatial Audio Layering', 'Clean Voice De-Noise & Master'],
    specs: '-14 LUFS Broadcast Standard'
  },
  {
    id: 'ui-polish',
    index: '04',
    title: 'UI Polish',
    tagline: 'Specular edge glow, glass layers, and keynote fidelity.',
    description: 'Screen recordings are notoriously messy. We rebuild interface interactions with Apple iOS 26 liquid glass panels, synthetic mouse kinematics, dynamic depth blur, and pixel-perfect framing.',
    deliverables: ['Liquid Glass Panel Overlays', 'Specular Edge Highlight Simulation', 'Smooth Cursor & Touch Trajectories', 'Keynote-Grade Framing'],
    specs: '4K Native Interface Re-render'
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 px-6 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 mb-4 font-medium">
            <span>Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Atelier Disciplines</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Four specialized disciplines. One unified standard.
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            We don't offer bloated agency packages. Every production is built on these four interlocking craft verticals to achieve unmistakable visual gravity.
          </p>
        </div>

        {/* Asymmetric Bento-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, idx) => {
            const icons = [
              <Eye key="eye" className="w-5 h-5 text-white" />,
              <Activity key="activity" className="w-5 h-5 text-white" />,
              <VolumeX key="volume" className="w-5 h-5 text-white" />,
              <Layers key="layers" className="w-5 h-5 text-white" />
            ];

            return (
              <div
                key={service.id}
                className="liquid-glass-surface rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative group hover:border-white/25 transition-all duration-300"
              >
                {/* Top highlight line */}
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-sm text-neutral-500 font-medium">
                      {service.index}
                    </span>
                    <div className="w-10 h-10 rounded-full liquid-glass-subtle flex items-center justify-center">
                      {icons[idx]}
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-white tracking-tight mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm font-medium text-neutral-300 mb-4">
                    {service.tagline}
                  </p>

                  <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.08]">
                  <div className="text-xs uppercase tracking-wider text-neutral-400 mb-3 font-medium">
                    Tangible Deliverables
                  </div>
                  <ul className="space-y-2 mb-6">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-white/[0.04]">
                    Standard: {service.specs}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
