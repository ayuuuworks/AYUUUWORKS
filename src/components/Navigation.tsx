import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  ['WORK', '/work'],
  ['SERVICES', '/services'],
  ['PROCESS', '/process'],
  ['ABOUT', '/about'],
  ['START', '/start-a-project'],
];

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/90 backdrop-blur-sm border-b border-[#242424]">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="/" className="font-display font-bold tracking-[-0.02em] text-[#F2EFE8] hover:text-[#B65B3C] transition-colors">
          AYUUWORKS
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[11px] uppercase tracking-[0.18em] text-[#9B978F]">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-[#F2EFE8] transition-colors">
              {label}
            </a>
          ))}
        </nav>

        <a href="/start-a-project" className="hidden md:inline-flex border border-[#3a3732] px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-[#F2EFE8] hover:border-[#B65B3C] hover:text-[#B65B3C] transition-colors">
          Start a project
        </a>

        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="md:hidden p-2 text-[#F2EFE8]"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#242424] bg-[#111111] px-6 py-6">
          <nav className="flex flex-col">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 border-b border-[#242424] text-xs uppercase tracking-[0.18em] text-[#9B978F] hover:text-[#F2EFE8]"
              >
                {label}
              </a>
            ))}
            <a href="/start-a-project" onClick={() => setMobileMenuOpen(false)} className="mt-5 bg-[#F2EFE8] text-[#111111] px-4 py-4 text-center text-xs uppercase tracking-[0.16em]">
              Start a project
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
