import React from 'react';
import { Terminal, Crosshair, Radio } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';
import { useAWE } from '../awe/context';
import { getTranslations } from '../data/translations';

export const Footer: React.FC = () => {
  const { language } = useAWE();
  const t = getTranslations(language);
  const isHinglish = language === 'hinglish';

  return (
    <footer className="relative bg-[#0d0d0d] border-t border-[#242424] py-16 px-6 text-[#9B978F]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Signature Column */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-display text-[#F2EFE8] tracking-tight">
                AYUUWORKS
              </span>
              <span className="px-2 py-0.5 text-[9px] font-mono bg-[#141414] border border-[#242424] text-[#B65B3C] rounded-sm">
                AWE ENGINE v3.2
              </span>
            </div>
            <p className="text-xs font-mono uppercase text-[#B65B3C] tracking-wider">
              {isHinglish
                ? 'WE MAKE BUSINESSES EASIER TO NOTICE, UNDERSTAND AND REMEMBER.'
                : 'WE MAKE BUSINESSES EASIER TO NOTICE, UNDERSTAND AND REMEMBER.'}
            </p>
            <p className="text-xs text-[#9B978F] max-w-md leading-relaxed">
              {isHinglish
                ? 'Strategy, bespoke luxury design, technology aur high-speed execution ka ek unified studio. Bina generic templates ya saste marketing shor ke.'
                : 'A unified digital flagship studio blending strategy, bespoke luxury craft, and high-velocity engineering. Zero generic templates or marketing noise.'}
            </p>
          </div>

          {/* Nav Quick Links */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <span className="font-mono text-[#F2EFE8] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-[#B65B3C]" />
              <span>STUDIO NAVIGATION</span>
            </span>
            <p><a href="#projects-section" onMouseEnter={() => soundEngine.playHover()} className="hover:text-[#F2EFE8] transition-colors">01 // Kaam / Case Studies</a></p>
            <p><a href="#business-explorer" onMouseEnter={() => soundEngine.playHover()} className="hover:text-[#F2EFE8] transition-colors">02 // Business Diagnosis</a></p>
            <p><a href="#business-engine" onMouseEnter={() => soundEngine.playHover()} className="hover:text-[#F2EFE8] transition-colors">03 // The Business Engine</a></p>
            <p><a href="#method-section" onMouseEnter={() => soundEngine.playHover()} className="hover:text-[#F2EFE8] transition-colors">04 // PUEP Framework</a></p>
            <p><a href="#live-lab" onMouseEnter={() => soundEngine.playHover()} className="hover:text-[#F2EFE8] transition-colors">05 // Interactive Live Lab</a></p>
            <p><a href="#about-section" onMouseEnter={() => soundEngine.playHover()} className="hover:text-[#F2EFE8] transition-colors">06 // About Ayush Mishra</a></p>
          </div>

          {/* Studio Footprint */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <span className="font-mono text-[#F2EFE8] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Crosshair className="w-3 h-3 text-[#B65B3C]" />
              <span>STUDIO COMMISSIONS</span>
            </span>
            <p className="text-[#D7D0C5]">Limited commissions per quarter</p>
            <p className="text-[#9B978F]">Lucknow · Varanasi · NCR</p>
            <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-[#B65B3C]">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>SYS.ONLINE // PING: 18ms</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9B978F] gap-4 font-mono">
          <p>© {new Date().getFullYear()} AyuuWorks. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>AAA MOTION GRAPHICS ACTIVE</span>
            <span>·</span>
            <span>TRANSPARENT CLIENT TELEMETRY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
