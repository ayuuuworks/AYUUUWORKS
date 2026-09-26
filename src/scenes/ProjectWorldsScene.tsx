import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { PROJECTS, ProjectItem } from '../data/projects';
import { ArrowUpRight, Sparkles, Building, Utensils, Compass, HeartHandshake, Crosshair, Terminal } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

export const ProjectWorldsScene: React.FC = () => {
  const { session, openProjectModal, trackEvent, isReducedMotion } = useAWE();

  // Adaptive recommendation based on session exploration
  const sortedProjects = [...PROJECTS].sort((a, b) => {
    const userInd = (session.industry || '').toLowerCase();
    const aMatch = a.industry.toLowerCase().includes(userInd.split(' ')[0]) || (session.diagnosis?.recommended_project === a.id);
    const bMatch = b.industry.toLowerCase().includes(userInd.split(' ')[0]) || (session.diagnosis?.recommended_project === b.id);
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  const handleOpenCaseStudy = (project: ProjectItem) => {
    soundEngine.playTargetLock();
    trackEvent('project_opened', { projectId: project.id, projectTitle: project.title });
    openProjectModal(project.id);
  };

  const scrollToEnquiry = () => {
    soundEngine.playClick();
    const el = document.getElementById('enquiry-experience');
    if (el) {
      el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section id="projects-section" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111]">
      {/* Header in Hinglish with AAA Game HUD Tag */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <Terminal className="w-3.5 h-3.5 text-[#B65B3C]" />
          <span>PORTFOLIO · 06 // PROVEN COMMERCIAL MISSIONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          HAMARA ASLI KAAM.
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          Hum static websites ya boring brochure designs nahi banate. Hum living digital flagships khade karte hain jo market mein command aur prestige create karein.
        </p>

        {/* Adaptive Case Study Recommendation */}
        <div className="hud-bracket mt-6 p-4 rounded-sm border border-[#2e2a24] bg-[#161616] text-xs text-[#D7D0C5] flex items-start gap-3">
          <Crosshair className="w-4 h-4 text-[#B65B3C] mt-0.5 shrink-0" />
          <div className="font-mono">
            <span className="text-[#F2EFE8] uppercase font-bold">RELEVANCE INTEL: </span>
            Aapne jo explore kiya <strong className="text-[#B65B3C]">[{session.industry || 'business'}]</strong>, uske basis par yeh case studies aapke context se sabse zyada aligned hain.
          </div>
        </div>
      </div>

      {/* Projects Grid: 2-Column AAA HUD Card Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedProjects.map((project, idx) => {
          const isTopMatch = idx === 0;

          return (
            <article
              key={project.id}
              className={`hud-bracket p-6 sm:p-8 rounded-sm border transition-[border-color,background-color] duration-200 flex flex-col justify-between relative shadow-2xl shadow-black/80 ${
                isTopMatch
                  ? 'border-[#B65B3C]/70 bg-[#161514]'
                  : 'border-[#242424] bg-[#141414] hover:border-[#383838]'
              }`}
            >
              {isTopMatch && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 bg-[#B65B3C] text-[#F2EFE8] text-[10px] font-mono tracking-wider uppercase rounded-sm shadow-md font-bold flex items-center gap-1">
                  <span>★ TOP RECOMMENDED MATCH</span>
                </div>
              )}

              <div className="space-y-6">
                {/* Meta Bar */}
                <div className="flex items-center justify-between border-b border-[#242424] pb-3 text-xs font-mono text-[#9B978F]">
                  <span className="uppercase text-[#B65B3C] font-bold">{project.industry}</span>
                  <span>MISSION // 0{idx + 1}</span>
                </div>

                {/* Title & Business Introduction */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#F2EFE8]">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-[#B65B3C] mt-1 font-semibold">
                    {project.subtitle}
                  </p>
                  <p className="text-sm text-[#D7D0C5] mt-3 leading-relaxed">
                    "{project.tagline}"
                  </p>
                </div>

                {/* The Challenge & The Approach in Hinglish */}
                <div className="space-y-4 pt-4 border-t border-[#242424]/60 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-[#9B978F] uppercase block mb-1 font-bold">
                      ASLI CHALLENGE // BOTTLENECK
                    </span>
                    <p className="text-[#D7D0C5] leading-relaxed">
                      {project.problem.statedBottleneck}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#B65B3C] uppercase block mb-1 font-bold">
                      AYUUWORKS KA APPROACH // SOLUTION
                    </span>
                    <p className="text-[#F2EFE8] leading-relaxed">
                      {project.thinking.coreInsight}
                    </p>
                  </div>
                </div>

                {/* Key Metric / Learning */}
                <div className="p-3.5 rounded-sm bg-[#111111] border border-[#242424] text-xs text-[#9B978F]">
                  <span className="text-[10px] font-mono text-[#F2EFE8] uppercase block mb-1 font-bold">
                    COMMERCIAL RESULT // KEY TAKEAWAY
                  </span>
                  <p className="text-xs text-[#D7D0C5] leading-snug">
                    {project.thinking.approach[0] || 'Clear positioning multiplies the commercial power of every touchpoint.'}
                  </p>
                </div>
              </div>

              {/* Actions: Try It & Apply to Your Business */}
              <div className="pt-6 mt-6 border-t border-[#242424] flex items-center justify-between gap-3 flex-wrap">
                <button
                  onClick={() => handleOpenCaseStudy(project)}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="px-4 py-2.5 rounded-sm bg-[#F2EFE8] hover:bg-[#B65B3C] text-[#111111] hover:text-[#F2EFE8] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-black/40"
                >
                  <span>LIVE CASE STUDY DEKHO</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={scrollToEnquiry}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="text-xs font-mono text-[#9B978F] hover:text-[#B65B3C] transition-colors cursor-pointer"
                >
                  APPLY TO YOUR BRAND →
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

