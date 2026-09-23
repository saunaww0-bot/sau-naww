import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Elena Rostova',
    role: 'Creative Director',
    company: 'Aether OS & Hardware',
    project: 'Liquid Glass Keynote (4 Mins)',
    quote: 'Most video editors deliver generic trendy motion that dates within two months. Cut Agency operates like industrial designers. The specular edge lighting and spring damping made our software launch look like an Apple product debut.',
    year: '2026'
  },
  {
    id: 'rev-2',
    name: 'Julian Vance',
    role: 'Head of Product Marketing',
    company: 'Monolith Protocol',
    project: 'Brand Film & Teasers (3 Mins)',
    quote: 'The 30,000 MMK / minute rate structure is refreshingly transparent. We gave them rough screen captures and raw phone footage; what came back looked like a multi-million-dollar broadcast spot. The audio sub-bass hits are phenomenal.',
    year: '2026'
  },
  {
    id: 'rev-3',
    name: 'Kento Takahashi',
    role: 'Lead Architect',
    company: 'Forma Spatial Studio',
    project: 'Architectural Showreel (5 Mins)',
    quote: 'Their monochrome color grading preserved every subtle highlight rolloff in our concrete facades without blowing out skies. Turnaround was completed ahead of schedule, directly dispatched through Telegram.',
    year: '2026'
  },
  {
    id: 'rev-4',
    name: 'Marcus Sterling',
    role: 'Founder',
    company: 'Veloce AI',
    project: 'SaaS Product Demo (2 Mins)',
    quote: 'No tedious back-and-forth emails. We submitted our clip on their portal, got instant Telegram confirmation, and received the first cut 36 hours later. First round was basically locked master.',
    year: '2026'
  },
  {
    id: 'rev-5',
    name: 'Clara Lindqvist',
    role: 'Brand Producer',
    company: 'Nordic Sound Labs',
    project: 'Spatial Audio Release (1.5 Mins)',
    quote: 'The acoustic polish alone justified three times the invoice. They understand how liquid glass visual aesthetics match micro-transient sound design. They are our permanent editing atelier.',
    year: '2026'
  },
  {
    id: 'rev-6',
    name: 'David Chen',
    role: 'Venture Partner',
    company: 'Apex Seed Capital',
    project: 'Portfolio Summit Opener (6 Mins)',
    quote: 'Cut Agency gave our founders an unmistakable aura of confidence. The monochrome restraint cuts through the noise of saturated tech videos. Remarkable fidelity.',
    year: '2026'
  }
];

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-24 md:py-32 px-6 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 mb-4 font-medium">
            <span>Client Critiques</span>
            <span aria-hidden="true">·</span>
            <span>Verified Productions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Trusted by directors, founders, and spatial designers.
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            From keynote product unveilings to high-acutance architectural films, our clients value uncompromising aesthetic discipline and surgical execution speed.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="liquid-glass-surface rounded-3xl p-8 flex flex-col justify-between relative group hover:border-white/25 transition-all duration-300"
            >
              {/* Specular highlight */}
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

              <div>
                {/* Star rating + project type */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">
                    {item.year}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-neutral-200 leading-relaxed font-normal mb-8">
                  "{item.quote}"
                </p>
              </div>

              {/* Author attribution */}
              <div className="pt-6 border-t border-white/[0.08]">
                <div className="text-sm font-semibold text-white">
                  {item.name}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {item.role}, <span className="text-neutral-300">{item.company}</span>
                </div>
                <div className="text-[11px] font-mono text-neutral-500 mt-2">
                  Scope: {item.project}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
