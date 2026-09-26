import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { PROJECTS } from '../data/projects';
import { X, Moon, Sun, ArrowRight, Shield, Terminal, Crosshair } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

export const ProjectModal: React.FC = () => {
  const { activeProjectModal, closeProjectModal, interactDemo, isReducedMotion } = useAWE();
  const [saanjhTime, setSaanjhTime] = useState<'sunset' | 'midnight'>('midnight');
  const [haveliSuite, setHaveliSuite] = useState<'jharokha' | 'pavilion'>('jharokha');

  if (!activeProjectModal) return null;

  const project = PROJECTS.find((p) => p.id === activeProjectModal);
  if (!project) return null;

  const handleClose = () => {
    soundEngine.playClick();
    closeProjectModal();
  };

  const handleApplyToBusiness = () => {
    soundEngine.playTargetLock();
    closeProjectModal();
    const el = document.getElementById('enquiry-experience');
    if (el) {
      el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="hud-bracket relative w-full max-w-3xl bg-[#141414] border border-[#242424] rounded-sm my-8 overflow-hidden shadow-2xl">
        {/* Header in Hinglish with AAA Game HUD Tag */}
        <div className="p-6 md:p-8 bg-[#161616] border-b border-[#242424] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#B65B3C] uppercase mb-1">
              <Terminal className="w-3.5 h-3.5 text-[#B65B3C]" />
              <span>{project.industry} // VERIFIED CASE DEPLOYMENT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#F2EFE8]">
              {project.title}
            </h2>
            <p className="text-xs text-[#9B978F] font-mono">{project.subtitle}</p>
          </div>

          <button
            onClick={handleClose}
            onMouseEnter={() => soundEngine.playHover()}
            className="p-2 rounded-sm border border-[#242424] bg-[#111111] text-[#9B978F] hover:text-[#F2EFE8] hover:border-[#B65B3C] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body with Hinglish and HUD elements */}
        <div className="p-6 md:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* 1. THE BUSINESS */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#9B978F] block">
              01 // THE BUSINESS VISION
            </span>
            <p className="text-sm font-semibold text-[#F2EFE8]">
              "{project.tagline}"
            </p>
            <p className="text-xs text-[#D7D0C5] leading-relaxed">
              {project.problem.description}
            </p>
          </div>

          {/* 2. THE CHALLENGE */}
          <div className="space-y-2 pt-4 border-t border-[#242424]">
            <span className="text-[10px] font-mono uppercase text-[#B65B3C] block font-bold">
              02 // ASLI BOTTLENECK & CHALLENGE
            </span>
            <h4 className="text-base font-bold text-[#F2EFE8]">
              {project.problem.title}
            </h4>
            <p className="text-xs text-[#D7D0C5] leading-relaxed">
              {project.problem.statedBottleneck}
            </p>
          </div>

          {/* 3. THE APPROACH */}
          <div className="space-y-2 pt-4 border-t border-[#242424]">
            <span className="text-[10px] font-mono uppercase text-[#B65B3C] block font-bold">
              03 // AYUUWORKS ARCHITECTURAL APPROACH
            </span>
            <p className="text-xs text-[#F2EFE8] leading-relaxed">
              {project.thinking.coreInsight}
            </p>
          </div>

          {/* 4. THE BUILD (Interactive Try It) */}
          <div className="space-y-4 pt-4 border-t border-[#242424]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#9B978F] block">
                04 // INTERACTIVE LIVE ENGINE SIMULATION
              </span>
              <span className="text-[10px] font-mono text-[#B65B3C]">PLAYABLE PROTOTYPE</span>
            </div>

            {/* Interactive Showcase for Saanjh */}
            {project.id === 'saanjh' && (
              <div className="p-6 bg-[#0d0d0d] border border-[#242424] rounded-sm space-y-4 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setSaanjhTime('sunset');
                      interactDemo('saanjh_sunset');
                    }}
                    className={`px-3 py-1.5 text-xs font-mono rounded-sm border flex items-center gap-1.5 cursor-pointer ${
                      saanjhTime === 'sunset' ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8]' : 'border-[#242424] text-[#9B978F]'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Dusk Golden Hour</span>
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playTargetLock();
                      setSaanjhTime('midnight');
                      interactDemo('saanjh_midnight');
                    }}
                    className={`px-3 py-1.5 text-xs font-mono rounded-sm border flex items-center gap-1.5 cursor-pointer ${
                      saanjhTime === 'midnight' ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8]' : 'border-[#242424] text-[#9B978F]'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Midnight Courtyard Illumination</span>
                  </button>
                </div>

                <div className="p-5 rounded-sm bg-[#141414] border border-[#242424] text-xs">
                  <p className="font-bold text-[#F2EFE8]">
                    {saanjhTime === 'midnight'
                      ? 'ROYAL COURTYARD SANGEET — CANDLELIT MIDNIGHT SIMULATION'
                      : 'SUNSET PHERAS — PALACE GARDEN ARCHITECTURAL BLUEPRINT'}
                  </p>
                  <p className="text-[#9B978F] mt-1">
                    800 royal wedding attendees ke liye spatial floorplan aur lighting atmosphere test karo.
                  </p>
                </div>
              </div>
            )}

            {/* Interactive Showcase for The Grand Haveli */}
            {project.id === 'the-grand-haveli' && (
              <div className="p-6 bg-[#0d0d0d] border border-[#242424] rounded-sm space-y-4 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setHaveliSuite('jharokha');
                      interactDemo('haveli_jharokha');
                    }}
                    className={`px-3 py-1.5 text-xs font-mono rounded-sm border cursor-pointer ${
                      haveliSuite === 'jharokha' ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8]' : 'border-[#242424] text-[#9B978F]'
                    }`}
                  >
                    Royal Jharokha Suite
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playTargetLock();
                      setHaveliSuite('pavilion');
                      interactDemo('haveli_pavilion');
                    }}
                    className={`px-3 py-1.5 text-xs font-mono rounded-sm border cursor-pointer ${
                      haveliSuite === 'pavilion' ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8]' : 'border-[#242424] text-[#9B978F]'
                    }`}
                  >
                    Private Courtyard Pavilion
                  </button>
                </div>

                <div className="p-5 rounded-sm bg-[#141414] border border-[#242424] text-xs">
                  <p className="font-bold text-[#F2EFE8]">
                    {haveliSuite === 'jharokha'
                      ? 'THE ROYAL JHAROKHA PALACE SUITE'
                      : 'HERITAGE COURTYARD POOL PAVILION'}
                  </p>
                  <p className="text-[#9B978F] mt-1">
                    Carved Yellow Sandstone · Private Star-Gazing Terrace · Dedicated Butler
                  </p>
                </div>
              </div>
            )}

            {project.id !== 'the-grand-haveli' && project.id !== 'saanjh' && (
              <div className="p-6 bg-[#0d0d0d] border border-[#242424] rounded-sm text-center text-xs text-[#D7D0C5] space-y-1">
                <p className="font-bold text-[#F2EFE8]">Tactile Digital Lookbook & Verification Engine</p>
                <p className="text-[#9B978F]">High-ticket buyer assurance live on screen.</p>
              </div>
            )}
          </div>

          {/* 5. WHAT WE LEARNED */}
          <div className="space-y-2 pt-4 border-t border-[#242424]">
            <span className="text-[10px] font-mono uppercase text-[#9B978F] block">
              05 // KEY TAKEAWAY & METRICS
            </span>
            <ul className="space-y-1.5 text-xs text-[#D7D0C5]">
              {project.thinking.approach.map((pr: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#B65B3C] font-bold">▪</span>
                  <span>{pr}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTA in Hinglish */}
        <div className="p-6 bg-[#161616] border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9B978F] font-mono">
            Kya aisa hi transformation aapke brand ke liye kaam karega?
          </p>

          <button
            onClick={handleApplyToBusiness}
            onMouseEnter={() => soundEngine.playHover()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-sm bg-[#F2EFE8] hover:bg-[#B65B3C] text-[#111111] hover:text-[#F2EFE8] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>APNE BUSINESS PAR APPLY KARO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
