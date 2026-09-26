import React from 'react';
import { useAWE } from '../awe/context';
import { ArrowDown, Crosshair, Terminal, Sparkles } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

export const MirrorMomentScene: React.FC = () => {
  const { isReducedMotion, trackEvent } = useAWE();

  const handleContinue = () => {
    soundEngine.playTargetLock();
    trackEvent('cta_clicked', { target: 'mirror_moment_continue' });
    const el = document.getElementById('journey-summary');
    if (el) el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section className="relative py-32 px-6 max-w-5xl mx-auto border-t border-[#242424] bg-[#111111] text-center">
      {/* AAA Game HUD Reticle & Radar Rings */}
      <div className="hud-bracket relative z-10 p-8 sm:p-12 border border-[#2e2a24] bg-[#141414]/90 space-y-10 max-w-3xl mx-auto rounded-sm shadow-2xl">
        <div className="flex items-center justify-center gap-2 text-[11px] font-mono tracking-widest text-[#B65B3C] uppercase">
          <Terminal className="w-3.5 h-3.5 text-[#B65B3C]" />
          <span>PHASE 09 // THE MIRROR MOMENT · AAYNA</span>
        </div>

        {/* Cinematic Hinglish Mirror Statements */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black font-display text-[#9B978F] tracking-tight leading-tight">
            AAP YAHAN AYUUWORKS KO DEKHNE AAYE THE.
          </h2>

          <div className="w-16 h-px bg-[#B65B3C]/60 mx-auto my-4"></div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
            LEKIN RAASTE MEIN,<br />
            <span className="text-[#B65B3C]">AAP APNE KHUD KE BUSINESS KO DEKHNE LAGE.</span>
          </h2>

          <div className="inline-block px-3 py-1 bg-[#1a1816] border border-[#B65B3C]/40 text-xs font-mono text-[#F2EFE8] uppercase tracking-widest">
            KASAM SE, YEHI TOH ASLI MAQSAD HAI.
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#D7D0C5] max-w-lg mx-auto leading-relaxed">
          Duniya ke best creative partners sirf apni tareef nahi karte. Woh aapko woh clarity dete hain jisse aap dekh sako ki aapka business agle level par kya ban sakta hai.
        </p>

        <div className="pt-2">
          <button
            onClick={handleContinue}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-8 py-4 bg-[#F2EFE8] hover:bg-[#B65B3C] text-[#111111] hover:text-[#F2EFE8] font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-lg shadow-[#B65B3C]/10"
          >
            <span>APNA SESSION BRIEF REVIEW KARO</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        {/* HUD Sub-telemetry */}
        <div className="pt-4 border-t border-[#242424] flex items-center justify-center gap-3 text-[10px] font-mono text-[#9B978F]">
          <Crosshair className="w-3 h-3 text-[#B65B3C]" />
          <span>REAL-TIME COGNITIVE REFLECTION COMPLETE</span>
        </div>
      </div>
    </section>
  );
};
