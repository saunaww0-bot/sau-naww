import React, { useState } from 'react';
import { X, Send, Phone, MessageSquare, ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface DirectTalkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectTalkModal: React.FC<DirectTalkModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [timing, setTiming] = useState('Today / Immediate');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('contact', handle);
      formData.append('edit_type', `Direct Talk Request (${timing})`);
      formData.append('edit_style', 'Consultation & Scoping');
      formData.append('minutes', '1');
      formData.append('description', `Direct Talk inquiry: ${notes || 'Immediate discussion requested.'}`);

      const res = await fetch('/api/orders', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch Direct Talk request.');
      }
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error sending request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg liquid-glass-surface rounded-3xl p-6 sm:p-8 relative border border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 font-medium">
            <span>Direct Intake</span>
            <span aria-hidden="true">·</span>
            <span>Founder & Director</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full liquid-glass-subtle hover:bg-white/15 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Direct Talk Confirmed
            </h3>
            <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed mb-6 font-mono">
              Our lead creative director has received your alert via Telegram and will connect directly through your handle.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-semibold text-black bg-white rounded-full hover:bg-neutral-200 transition-colors"
            >
              Return to Studio
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">
              Book a Direct Talk
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              Skip agency middlemen. Speak directly with our lead editor regarding project turnaround, custom monochrome grading, or urgent keynote releases.
            </p>

            {error && (
              <div className="p-3 rounded-xl bg-neutral-900 border border-white/20 text-xs text-neutral-200 mb-4">
                {error}
              </div>
            )}

            {/* Quick Action buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href="https://t.me/CutAgencyBot"
                target="_blank"
                rel="noreferrer"
                className="liquid-glass-subtle hover:border-white/30 p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all group"
              >
                <Send className="w-5 h-5 text-white mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-white">Instant Telegram</span>
                <span className="text-[10px] text-neutral-500 font-mono">@CutAgencyBot</span>
              </a>

              <a
                href="tel:+959960000000"
                className="liquid-glass-subtle hover:border-white/30 p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all group"
              >
                <Phone className="w-5 h-5 text-white mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-white">Studio Line</span>
                <span className="text-[10px] text-neutral-500 font-mono">+95 Direct Line</span>
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Your Name / Studio
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Sterling"
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-glass-subtle border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Telegram Handle / Direct Phone
                </label>
                <input
                  type="text"
                  required
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="@handle or direct number"
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-glass-subtle border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Preferred Call Time
                </label>
                <select
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-glass-subtle border border-white/15 text-xs text-white bg-neutral-950 focus:outline-none focus:border-white cursor-pointer"
                >
                  <option value="Today / Immediate">Today / Immediate Dispatch</option>
                  <option value="Within 2 Hours">Within Next 2 Hours</option>
                  <option value="Tomorrow Morning">Tomorrow Morning</option>
                  <option value="Async Telegram Voice Memo">Async Telegram Voice Memo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Brief Project Scope (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Estimated length, timeline, or reference links..."
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-glass-subtle border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 text-xs font-semibold text-black bg-white rounded-full hover:bg-neutral-200 transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatched via Bot...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Direct Talk Booking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
