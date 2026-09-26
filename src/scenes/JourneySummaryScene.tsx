import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { PROJECTS } from '../data/projects';
import { Copy, ArrowRight, Check, Terminal, Crosshair, Sparkles } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

export const JourneySummaryScene: React.FC = () => {
  const { session, isReducedMotion, trackEvent } = useAWE();
  const [copied, setCopied] = useState(false);

  const exploredProjectTitles = session.exploredProjects
    .map((id) => PROJECTS.find((p) => p.id === id)?.title)
    .filter(Boolean);

  const businessType = session.industry || 'Physical / Luxury Destination';
  const wantedToImprove = session.primaryProblem || 'Zyada luxury & premium lagna hai';
  const exploredText =
    exploredProjectTitles.length > 0
      ? exploredProjectTitles.join(', ')
      : 'Saanjh Weddings, The Grand Haveli, Rooh Gastronomy';

  const relevantCapability =
    session.diagnosis?.relevant_services?.[0] || 'Bespoke Brand Identity & Editorial Digital Flagship';

  const possibleOpportunity =
    session.diagnosis?.summary ||
    'Physical offline craftsmanship aur digital screen ke gap ko close karna taaki silent authority aur high-ticket pricing power mile.';

  const suggestedFirstStep =
    session.diagnosis?.next_action ||
    'Advertising pe ek rupya kharch karne se pehle apni digital flagship ko luxury buyer standards ke mutabiq audit karo.';

  const handleCopy = () => {
    soundEngine.playTargetLock();
    trackEvent('cta_clicked', { target: 'copy_journey_brief' });
    const text = `
AYUUWORKS TACTICAL BRIEF // HINGLISH TELEMETRY
------------------------------------------------
Business Type: ${businessType}
Business Name: ${session.businessName || 'Aapka Brand'}
Main Goal: ${wantedToImprove}
Explored Case Studies: ${exploredText}
Primary Capability: ${relevantCapability}
Strategic Opportunity: ${possibleOpportunity}
Tactical Next Step: ${suggestedFirstStep}
------------------------------------------------
*Generated live by AyuuWorks Experience Engine (AWE).
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTurnIntoProject = () => {
    soundEngine.playTelemetry();
    trackEvent('cta_clicked', { target: 'turn_into_real_project' });
    const el = document.getElementById('enquiry-experience');
    if (el) {
      el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="journey-summary"
      className="relative py-24 px-6 max-w-5xl mx-auto border-t border-[#242424] bg-[#111111]"
    >
      <div className="space-y-10">
        {/* Header in Hinglish with AAA Game HUD Tag */}
        <div className="border-b border-[#242424] pb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#B65B3C] uppercase mb-2">
              <Terminal className="w-3.5 h-3.5 text-[#B65B3C]" />
              <span>SESSION FOOTPRINT · 10 // TELEMETRY SUMMARY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
              AAPKI STRATEGY BRIEF.
            </h2>
            <p className="text-xs sm:text-sm text-[#9B978F] mt-1 font-mono">
              Aapke session exploration ke hisaab se live synthesis data compile ho chuka hai.
            </p>
          </div>

          <button
            onClick={handleCopy}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-4 py-2.5 rounded-sm border border-[#242424] bg-[#141414] hover:border-[#B65B3C] text-xs font-mono text-[#D7D0C5] hover:text-[#F2EFE8] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#B65B3C]" /> : <Copy className="w-3.5 h-3.5 text-[#9B978F]" />}
            <span>{copied ? 'BRIEF COPIED TO CLIPBOARD' : 'COPY TACTICAL BRIEF'}</span>
          </button>
        </div>

        {/* Structured Grid (AAA HUD Telemetry fields) */}
        <div className="hud-bracket p-6 sm:p-8 rounded-sm border border-[#242424] bg-[#141414] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Field 1: Business Type */}
            <div className="p-4 rounded-sm bg-[#0d0d0d] border border-[#242424]">
              <span className="font-mono text-[#9B978F] uppercase block mb-1 text-[10px]">
                01 // BUSINESS CATEGORY:
              </span>
              <p className="text-sm font-bold text-[#F2EFE8]">
                {businessType}
              </p>
            </div>

            {/* Field 2: Improvement Goal */}
            <div className="p-4 rounded-sm bg-[#0d0d0d] border border-[#242424]">
              <span className="font-mono text-[#9B978F] uppercase block mb-1 text-[10px]">
                02 // ASLI GOAL / BOTTLENECK:
              </span>
              <p className="text-sm font-bold text-[#F2EFE8]">
                {wantedToImprove}
              </p>
            </div>

            {/* Field 3: Explored Work */}
            <div className="p-4 rounded-sm bg-[#0d0d0d] border border-[#242424]">
              <span className="font-mono text-[#9B978F] uppercase block mb-1 text-[10px]">
                03 // CASE STUDIES EXPLORED:
              </span>
              <p className="text-xs text-[#D7D0C5] font-mono">
                {exploredText}
              </p>
            </div>

            {/* Field 4: Recommended Capability */}
            <div className="p-4 rounded-sm bg-[#0d0d0d] border border-[#242424]">
              <span className="font-mono text-[#B65B3C] uppercase block mb-1 text-[10px] font-bold">
                04 // RECOMMENDED DISCIPLINE:
              </span>
              <p className="text-xs font-bold text-[#F2EFE8]">
                {relevantCapability}
              </p>
            </div>
          </div>

          {/* Opportunity Statement */}
          <div className="p-5 rounded-sm bg-[#161514] border border-[#2e2a24] space-y-1">
            <span className="font-mono text-[10px] text-[#B65B3C] uppercase tracking-wider font-bold">
              STRATEGIC OPPORTUNITY IDENTIFIED
            </span>
            <p className="text-xs sm:text-sm text-[#F2EFE8] leading-relaxed">
              {possibleOpportunity}
            </p>
          </div>

          {/* First Step Suggestion */}
          <div className="p-5 rounded-sm bg-[#0d0d0d] border border-[#242424] space-y-1">
            <span className="font-mono text-[10px] text-[#9B978F] uppercase tracking-wider">
              TACTICAL IMMEDIATE ACTION
            </span>
            <p className="text-xs text-[#D7D0C5] leading-relaxed">
              {suggestedFirstStep}
            </p>
          </div>

          {/* Turn into Real Commission CTA */}
          <div className="pt-4 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#9B978F]">
              <Crosshair className="w-3.5 h-3.5 text-[#B65B3C]" />
              <span>IS STRATEGY KO LIVE MISSION MEIN CONVERT KARO</span>
            </div>

            <button
              onClick={handleTurnIntoProject}
              onMouseEnter={() => soundEngine.playHover()}
              className="w-full sm:w-auto px-6 py-3 rounded-sm bg-[#B65B3C] hover:bg-[#c96948] text-[#F2EFE8] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#B65B3C]/20"
            >
              <span>DIRECT PROJECT MEIN BADLO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
