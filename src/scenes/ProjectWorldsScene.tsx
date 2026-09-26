import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { PROJECTS, ProjectItem } from '../data/projects';
import { ArrowUpRight, Sparkles, Building, Utensils, Compass, HeartHandshake } from 'lucide-react';

export const ProjectWorldsScene: React.FC = () => {
  const { session, openProjectModal, trackEvent, isReducedMotion } = useAWE();

  // Adaptive recommendation based on session exploration (Section 23)
  const sortedProjects = [...PROJECTS].sort((a, b) => {
    const userInd = (session.industry || '').toLowerCase();
    const aMatch = a.industry.toLowerCase().includes(userInd.split(' ')[0]) || (session.diagnosis?.recommended_project === a.id);
    const bMatch = b.industry.toLowerCase().includes(userInd.split(' ')[0]) || (session.diagnosis?.recommended_project === b.id);
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  const handleOpenCaseStudy = (project: ProjectItem) => {
    trackEvent('project_opened', { projectId: project.id, projectTitle: project.title });
    openProjectModal(project.id);
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById('enquiry-experience');
    if (el) {
      el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section id="projects-section" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111]">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <span>PORTFOLIO · 06</span>
          <span>·</span>
          <span>EDITORIAL CASE STUDIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          SELECTED COMMISSIONS.
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          We don't create websites as static brochures. We build living business flagships engineered to command market authority.
        </p>

        {/* Section 23: Adaptive Case Study Recommendation */}
        <div className="mt-6 p-4 rounded border border-[#242424] bg-[#161616] text-xs text-[#D7D0C5] flex items-start gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B65B3C] mt-1 shrink-0"></span>
          <div>
            <span className="font-mono text-[#F2EFE8] uppercase font-bold">NOTE ON RELEVANCE: </span>
            Based on what you explored in <strong className="text-[#F2EFE8]">{session.industry || 'business'}</strong>, this project may be relevant to your context.
          </div>
        </div>
      </div>

      {/* Projects Grid: 2-Column Editorial Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedProjects.map((project, idx) => {
          const isTopMatch = idx === 0;

          return (
            <article
              key={project.id}
              className={`p-6 sm:p-8 rounded border transition-all flex flex-col justify-between relative ${
                isTopMatch
                  ? 'border-[#B65B3C]/60 bg-[#161514]'
                  : 'border-[#242424] bg-[#141414] hover:border-[#383838]'
              }`}
            >
              {isTopMatch && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 bg-[#B65B3C] text-[#F2EFE8] text-[10px] font-mono tracking-wider uppercase rounded shadow-sm">
                  RELEVANT CASE STUDY
                </div>
              )}

              <div className="space-y-6">
                {/* Meta Bar */}
                <div className="flex items-center justify-between border-b border-[#242424] pb-3 text-xs font-mono text-[#9B978F]">
                  <span className="uppercase">{project.industry}</span>
                  <span>CASE / 0{idx + 1}</span>
                </div>

                {/* Title & Business Introduction (Section 22: The Business) */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#F2EFE8]">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-[#B65B3C] mt-1">
                    {project.subtitle}
                  </p>
                  <p className="text-sm text-[#D7D0C5] mt-3 leading-relaxed">
                    "{project.tagline}"
                  </p>
                </div>

                {/* Section 22: The Challenge & The Approach */}
                <div className="space-y-4 pt-4 border-t border-[#242424]/60 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-[#9B978F] uppercase block mb-1">
                      THE CHALLENGE
                    </span>
                    <p className="text-[#D7D0C5] leading-relaxed">
                      {project.problem.statedBottleneck}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#B65B3C] uppercase block mb-1">
                      THE APPROACH
                    </span>
                    <p className="text-[#F2EFE8] leading-relaxed">
                      {project.thinking.coreInsight}
                    </p>
                  </div>
                </div>

                {/* Section 22: What We Learned */}
                <div className="p-3.5 rounded bg-[#111111] border border-[#242424] text-xs text-[#9B978F]">
                  <span className="text-[10px] font-mono text-[#F2EFE8] uppercase block mb-1">
                    WHAT WE LEARNED
                  </span>
                  <p className="text-xs text-[#D7D0C5] leading-snug">
                    {project.thinking.approach[0] || 'Clear positioning multiplies the commercial power of every touchpoint.'}
                  </p>
                </div>
              </div>

              {/* Actions: Try It & Apply to Your Business (Section 22) */}
              <div className="pt-6 mt-6 border-t border-[#242424] flex items-center justify-between gap-3">
                <button
                  onClick={() => handleOpenCaseStudy(project)}
                  className="px-4 py-2.5 rounded bg-[#F2EFE8] hover:bg-[#B65B3C] text-[#111111] hover:text-[#F2EFE8] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>TRY IT INTERACTIVELY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={scrollToEnquiry}
                  className="text-xs font-mono text-[#9B978F] hover:text-[#B65B3C] transition-colors cursor-pointer"
                >
                  COULD THIS APPLY TO YOU? →
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
