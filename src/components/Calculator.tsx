import React, { useState } from 'react';
import { ArrowRight, Clock, ShieldCheck, Film, Sparkles } from 'lucide-react';

interface CalculatorProps {
  onSelectMinutes: (minutes: number) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onSelectMinutes }) => {
  const [minutes, setMinutes] = useState<number>(3);
  const RATE_PER_MINUTE = 30000; // 30,000 MMK

  const totalMMK = minutes * RATE_PER_MINUTE;

  const getTurnaround = (mins: number) => {
    if (mins <= 2) return '24 to 48 Hours';
    if (mins <= 5) return '2 to 3 Business Days';
    if (mins <= 10) return '4 to 5 Business Days';
    return 'Phased Priority Delivery (5–7 Days)';
  };

  const handleApply = () => {
    onSelectMinutes(minutes);
    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-24 md:py-32 px-6 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 mb-4 font-medium">
            <span>Pricing Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Transparent Rate</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Fixed 30,000 MMK per minute. No surprises.
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            We operate on a pure flat-rate minute model. Whether you need an ultra-dense 30-second app launch teaser or a 10-minute keynote showcase, calculating your investment is exact.
          </p>
        </div>

        {/* Pricing & Interactive Calculator Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Calculator Controls */}
          <div className="lg:col-span-7 liquid-glass-surface rounded-3xl p-8 sm:p-10 relative">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-8">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Production Duration Calculator
              </span>
              <span className="text-xs font-mono text-white px-2.5 py-1 rounded-full bg-white/10">
                Rate: 30,000 MMK / Min
              </span>
            </div>

            {/* Slider Control */}
            <div className="mb-10">
              <div className="flex items-baseline justify-between mb-4">
                <label htmlFor="duration-slider" className="text-sm font-medium text-neutral-300">
                  Select Target Runtime
                </label>
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-3xl font-semibold text-white tabular-nums">
                    {minutes}
                  </span>
                  <span className="text-sm text-neutral-400">
                    {minutes === 1 ? 'Minute' : 'Minutes'}
                  </span>
                </div>
              </div>

              <input
                id="duration-slider"
                type="range"
                min="1"
                max="20"
                step="1"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="w-full h-2 rounded-lg cursor-pointer accent-white"
              />

              <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-2">
                <span>1 min</span>
                <span>5 mins</span>
                <span>10 mins</span>
                <span>15 mins</span>
                <span>20 mins</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="mb-8">
              <span className="block text-xs uppercase tracking-wider text-neutral-400 mb-3 font-medium">
                Common Format Presets
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Reel / TikTok', mins: 1 },
                  { label: 'Product Teaser', mins: 2 },
                  { label: 'App Demo Walkthrough', mins: 3 },
                  { label: 'Keynote Feature', mins: 5 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setMinutes(preset.mins)}
                    className={`px-3 py-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      minutes === preset.mins
                        ? 'bg-white text-black border-white font-medium shadow-md'
                        : 'liquid-glass-subtle text-neutral-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs truncate">{preset.label}</div>
                    <div className={`text-[11px] font-mono mt-0.5 ${minutes === preset.mins ? 'text-black/70' : 'text-neutral-500'}`}>
                      {preset.mins} min ({ (preset.mins * RATE_PER_MINUTE).toLocaleString() } MMK)
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Inclusions checklist */}
            <div className="pt-6 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <Film className="w-4 h-4 text-white shrink-0" />
                <span>Includes Full High-Bitrate Master + Web-Compressed Social Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <Sparkles className="w-4 h-4 text-white shrink-0" />
                <span>Liquid Glass specular finish, custom sound mix & micro-motion</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                <span>Two rounds of precision frame-by-frame client revisions included</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Total Card */}
          <div className="lg:col-span-5 liquid-glass-surface rounded-3xl p-8 sm:p-10 relative flex flex-col justify-between border border-white/20 shadow-2xl">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                  Summary Estimate
                </span>
                <span className="font-mono text-xs text-neutral-500">
                  Fixed Rate
                </span>
              </div>

              <div className="mb-8">
                <div className="text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                  Total Investment
                </div>
                <div className="flex items-baseline gap-2 font-mono">
                  <span className="text-4xl sm:text-5xl font-bold text-white tabular-nums tracking-tight">
                    {totalMMK.toLocaleString()}
                  </span>
                  <span className="text-xl text-neutral-400 font-sans font-medium">
                    MMK
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-2 font-mono">
                  Calculated as {minutes} min × 30,000 MMK
                </p>
              </div>

              <div className="space-y-4 py-6 border-y border-white/[0.08] mb-8 text-xs">
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span>Estimated Turnaround</span>
                  </span>
                  <span className="font-medium text-white">{getTurnaround(minutes)}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Revisions Allowed</span>
                  <span className="font-medium text-white">2 Direct Rounds</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Source Project File</span>
                  <span className="font-medium text-white">Available Upon Request</span>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-4 px-6 text-sm font-semibold text-black bg-white rounded-full hover:bg-neutral-200 transition-all cursor-pointer shadow-[0_0_24px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2"
              >
                <span>Lock In {minutes} Min & Submit Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[11px] text-neutral-500 mt-3">
                No upfront card required. Direct review and confirmation via Telegram.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
