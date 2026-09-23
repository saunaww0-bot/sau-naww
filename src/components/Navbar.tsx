import React from 'react';

interface NavbarProps {
  onOpenDirectTalk: () => void;
  onOpenOrders: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDirectTalk, onOpenOrders }) => {
  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4 transition-all duration-200 border-b border-white/[0.08] bg-black/70 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-lg font-semibold tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          Cut Agency
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider text-neutral-400 font-medium">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
          <a href="#order" className="hover:text-white transition-colors">Order</a>
          <button 
            type="button"
            onClick={onOpenOrders}
            className="hover:text-white transition-colors cursor-pointer text-left"
          >
            Database Log
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenDirectTalk}
            className="px-4 py-2 text-xs font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-colors whitespace-nowrap cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Book a Direct Talk
          </button>
        </div>
      </div>
    </header>
  );
};
