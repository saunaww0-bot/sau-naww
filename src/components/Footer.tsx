import React from 'react';
import { ArrowUpRight, Send, Film, Disc, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenDirectTalk: () => void;
  onOpenOrders: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDirectTalk, onOpenOrders }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-black text-white py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Subtle specular top light */}
      <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <a href="#" className="text-xl font-semibold tracking-tight text-white block mb-4">
              Cut Agency
            </a>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed mb-6 font-normal">
              An iOS 26 Liquid Glass video and UI editing atelier. Sculpting high-density monochrome film, surgical sound design, and keynote-grade interfaces.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Studio Master Pipeline: Online & Accepting Submissions</span>
            </div>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-4">
              Direct Inquiries
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <button
                  type="button"
                  onClick={onOpenDirectTalk}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Book a Direct Talk</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </button>
              </li>
              <li>
                <a
                  href="https://t.me/CutAgencyBot"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3 text-neutral-500" />
                  <span>Telegram Studio Bot</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:production@cutagency.studio"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3 text-neutral-500" />
                  <span>production@cutagency.studio</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenOrders}
                  className="hover:text-white transition-colors cursor-pointer text-neutral-400 hover:text-white"
                >
                  Database Ledger View
                </button>
              </li>
            </ul>
          </div>

          {/* Socials & Networks */}
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-4">
              Broadcast
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="https://vimeo.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Vimeo 4K Pro</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>X / Twitter</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>YouTube Master</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Specs */}
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-4">
              Standard
            </div>
            <div className="text-xs text-neutral-400 space-y-1.5 font-mono">
              <div>30,000 MMK / Min</div>
              <div>ProRes 4444 XQ</div>
              <div>-14 LUFS Audio</div>
              <div>iOS 26 Liquid Spec</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div>
            © {new Date().getFullYear()} Cut Agency. Strict Monochrome Craft. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Server-Encrypted Dispatch</span>
            <span>·</span>
            <span>Zero-Pill Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
