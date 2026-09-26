import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#111111] border-t border-[#242424] py-16 px-6 text-[#9B978F]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Signature Column */}
          <div className="md:col-span-6 space-y-3">
            <span className="text-xl font-bold font-display text-[#F2EFE8] tracking-tight">
              AYUUWORKS
            </span>
            <p className="text-xs font-mono uppercase text-[#B65B3C] tracking-wider">
              WE MAKE BUSINESSES EASIER TO NOTICE, UNDERSTAND AND REMEMBER.
            </p>
            <p className="text-xs text-[#9B978F] max-w-md leading-relaxed">
              Premium digital experience studio combining strategy, design, technology, content and digital execution.
            </p>
          </div>

          {/* Nav Quick Links */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <span className="font-mono text-[#F2EFE8] uppercase tracking-wider block mb-2">STUDIO NAVIGATION</span>
            <p><a href="#projects-section" className="hover:text-[#F2EFE8] transition-colors">Work / Portfolio</a></p>
            <p><a href="#business-explorer" className="hover:text-[#F2EFE8] transition-colors">Explore My Business</a></p>
            <p><a href="#business-engine" className="hover:text-[#F2EFE8] transition-colors">The Business Engine</a></p>
            <p><a href="#method-section" className="hover:text-[#F2EFE8] transition-colors">Methodology</a></p>
            <p><a href="#live-lab" className="hover:text-[#F2EFE8] transition-colors">Interactive Demo Lab</a></p>
            <p><a href="#about-section" className="hover:text-[#F2EFE8] transition-colors">About Ayush Mishra</a></p>
          </div>

          {/* Studio Footprint */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <span className="font-mono text-[#F2EFE8] uppercase tracking-wider block mb-2">STUDIO COMMISSIONS</span>
            <p className="text-[#D7D0C5]">Limited commissions per quarter</p>
            <p className="text-[#9B978F]">Lucknow · Varanasi · NCR</p>
            <p className="text-[#B65B3C] font-mono mt-3">AWE INTELLIGENCE LAYER ACTIVE</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9B978F] gap-4 font-mono">
          <p>© {new Date().getFullYear()} AyuuWorks. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>TRANSPARENT SESSION FOOTPRINT</span>
            <span>·</span>
            <span>ZERO SURREPTITIOUS PROFILING</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
