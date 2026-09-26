import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { Menu, X, Eye } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { isReducedMotion, toggleReducedMotion, trackEvent } = useAWE();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string, label: string) => {
    trackEvent('cta_clicked', { target: `nav_${label.toLowerCase()}` });
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/92 backdrop-blur-md border-b border-[#242424] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: isReducedMotion ? 'auto' : 'smooth' });
          }}
          className="text-base font-bold tracking-tight text-[#F2EFE8] font-display hover:text-[#B65B3C] transition-colors whitespace-nowrap"
        >
          AYUUWORKS
        </a>

        {/* Desktop Nav Items: WORK, EXPLORE, METHOD, ABOUT, START */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-[#9B978F]">
          <button
            onClick={() => scrollTo('projects-section', 'work')}
            className="hover:text-[#F2EFE8] transition-colors cursor-pointer"
          >
            WORK
          </button>
          <button
            onClick={() => scrollTo('business-explorer', 'explore')}
            className="hover:text-[#F2EFE8] transition-colors cursor-pointer"
          >
            EXPLORE
          </button>
          <button
            onClick={() => scrollTo('method-section', 'method')}
            className="hover:text-[#F2EFE8] transition-colors cursor-pointer"
          >
            METHOD
          </button>
          <button
            onClick={() => scrollTo('about-section', 'about')}
            className="hover:text-[#F2EFE8] transition-colors cursor-pointer"
          >
            ABOUT
          </button>
        </nav>

        {/* Right Action: Accessibility toggle + START */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleReducedMotion}
            title={isReducedMotion ? 'Enable smooth transitions' : 'Reduce motion'}
            className={`p-2 text-xs rounded transition-colors border border-[#242424] ${
              isReducedMotion ? 'text-[#B65B3C] border-[#B65B3C]/50' : 'text-[#9B978F] hover:text-[#F2EFE8]'
            }`}
            aria-label="Toggle reduced motion"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => scrollTo('enquiry-experience', 'start')}
            className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#111111] bg-[#F2EFE8] hover:bg-[#B65B3C] hover:text-[#F2EFE8] transition-all rounded shadow-sm"
          >
            START
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => scrollTo('enquiry-experience', 'start')}
            className="px-3 py-1.5 text-xs font-semibold uppercase text-[#111111] bg-[#F2EFE8] rounded"
          >
            START
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#9B978F] hover:text-[#F2EFE8] border border-[#242424] rounded"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#242424] bg-[#111111] px-6 py-6 space-y-4">
          <button
            onClick={() => scrollTo('projects-section', 'work')}
            className="block w-full text-left py-2 text-sm tracking-wider text-[#D7D0C5] hover:text-[#F2EFE8]"
          >
            WORK
          </button>
          <button
            onClick={() => scrollTo('business-explorer', 'explore')}
            className="block w-full text-left py-2 text-sm tracking-wider text-[#D7D0C5] hover:text-[#F2EFE8]"
          >
            EXPLORE
          </button>
          <button
            onClick={() => scrollTo('method-section', 'method')}
            className="block w-full text-left py-2 text-sm tracking-wider text-[#D7D0C5] hover:text-[#F2EFE8]"
          >
            METHOD
          </button>
          <button
            onClick={() => scrollTo('about-section', 'about')}
            className="block w-full text-left py-2 text-sm tracking-wider text-[#D7D0C5] hover:text-[#F2EFE8]"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollTo('enquiry-experience', 'start')}
            className="block w-full text-left py-2 text-sm font-semibold tracking-wider text-[#B65B3C]"
          >
            START A PROJECT →
          </button>
        </div>
      )}
    </header>
  );
};
