import React from 'react';
import { useAWE } from '../awe/context';
import { ArrowDown } from 'lucide-react';

export const MirrorMomentScene: React.FC = () => {
  const { isReducedMotion } = useAWE();

  const handleContinue = () => {
    const el = document.getElementById('journey-summary');
    if (el) el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section className="relative py-32 px-6 max-w-5xl mx-auto border-t border-[#242424] bg-[#111111] text-center">
      {/* Editorial Architectural Framing */}
      <div className="relative z-10 space-y-10 max-w-3xl mx-auto">
        <div className="inline-block text-[11px] font-mono tracking-widest text-[#B65B3C] uppercase">
          THE MIRROR MOMENT
        </div>

        {/* Section 20 Exact Statements */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-display text-[#9B978F] tracking-tight leading-tight">
            YOU CAME HERE TO SEE AYUUWORKS.
          </h2>

          <div className="w-12 h-px bg-[#242424] mx-auto my-4"></div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
            SOMEWHERE ALONG THE WAY,<br />
            <span className="text-[#D7D0C5]">YOU STARTED LOOKING AT YOUR OWN BUSINESS.</span>
          </h2>

          <p className="text-sm font-mono text-[#B65B3C] tracking-widest uppercase pt-2">
            That's the point.
          </p>
        </div>

        <p className="text-sm sm:text-base text-[#9B978F] max-w-lg mx-auto leading-relaxed">
          The best creative partners don't just talk about themselves. They give you the clarity to see where your business can go next.
        </p>

        <div className="pt-4">
          <button
            onClick={handleContinue}
            className="px-6 py-3.5 bg-[#141414] hover:bg-[#F2EFE8] text-[#D7D0C5] hover:text-[#111111] border border-[#242424] hover:border-[#F2EFE8] text-xs font-mono font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <span>REVIEW YOUR SESSION BRIEF</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
