import React from 'react';

const links = [
  ['Work', '/work'],
  ['Services', '/services'],
  ['Process', '/process'],
  ['About', '/about'],
  ['Contact', '/contact'],
  ['Start a Project', '/start-a-project'],
];

const legal = [
  ['Privacy', '/privacy-policy'],
  ['Terms', '/terms'],
  ['Cookies', '/cookies'],
];

export const Footer: React.FC = () => (
  <footer className="bg-[#111111] border-t border-[#242424] py-16 px-6 text-[#9B978F]">
    <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
      <div className="md:col-span-6">
        <span className="font-display text-xl font-bold text-[#F2EFE8]">AYUUWORKS</span>
        <p className="mt-3 max-w-md text-xs uppercase tracking-[.14em] text-[#B65B3C]">We make businesses easier to notice, understand and remember.</p>
        <p className="mt-5 max-w-md text-sm leading-relaxed">Luxury digital experiences, creative production and growth systems built around the business, not the template.</p>
      </div>
      <nav className="md:col-span-3 grid grid-cols-2 gap-y-3 gap-x-5 text-xs uppercase tracking-[.14em]">
        {links.map(([label, href]) => <a key={href} href={href} className="hover:text-[#F2EFE8] transition-colors">{label}</a>)}
      </nav>
      <nav className="md:col-span-3 flex md:flex-col flex-wrap gap-4 text-xs uppercase tracking-[.14em]">
        {legal.map(([label, href]) => <a key={href} href={href} className="hover:text-[#F2EFE8] transition-colors">{label}</a>)}
      </nav>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#242424] flex flex-col sm:flex-row justify-between gap-3 text-[11px] text-[#5f5b54] uppercase tracking-[.12em]">
      <span>AYUUWORKS / FOUNDED BY AYUSH MISHRA</span>
      <span>© {new Date().getFullYear()} AYUUWORKS</span>
    </div>
  </footer>
);
