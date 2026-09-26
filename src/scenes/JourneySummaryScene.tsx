import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { PROJECTS } from '../data/projects';
import { Copy, ArrowRight, Check } from 'lucide-react';

export const JourneySummaryScene: React.FC = () => {
  const { session, isReducedMotion, trackEvent } = useAWE();
  const [copied, setCopied] = useState(false);

  const exploredProjectTitles = session.exploredProjects
    .map((id) => PROJECTS.find((p) => p.id === id)?.title)
    .filter(Boolean);

  const businessType = session.industry || 'Business';
  const wantedToImprove = session.primaryProblem || 'Look more premium';
  const exploredText =
    exploredProjectTitles.length > 0
      ? exploredProjectTitles.join(', ')
      : 'Saanjh Weddings, The Grand Haveli, Rooh Gastronomy';

  const relevantCapability =
    session.diagnosis?.relevant_services?.[0] || 'Bespoke Brand Identity & Editorial Digital Flagship';

  const possibleOpportunity =
    session.diagnosis?.summary ||
    'Closing the gap between real physical craftsmanship and digital visual presentation to command silent premium authority.';

  const suggestedFirstStep =
    session.diagnosis?.next_action ||
    'Audit your digital flagship against luxury bridal and HNI buyer standards before spending on advertising.';

  const handleCopy = () => {
    trackEvent('cta_clicked', { target: 'copy_journey_brief' });
    const text = `
AYUUWORKS JOURNEY BRIEF
------------------------
Business Type: ${businessType}
Business Name: ${session.businessName || 'N/A'}
Wanted to Improve: ${wantedToImprove}
Explored: ${exploredText}
Relevant Capability: ${relevantCapability}
Possible Opportunity: ${possibleOpportunity}
Suggested First Step: ${suggestedFirstStep}
------------------------
*Starting hypothesis based on session exploration.
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTurnIntoProject = () => {
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
        {/* Header */}
        <div className="border-b border-[#242424] pb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-[#B65B3C] uppercase mb-2">
              SESSION FOOTPRINT · 08
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
              YOUR AYUUWORKS JOURNEY.
            </h2>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded border border-[#242424] hover:border-[#D7D0C5] text-xs font-mono text-[#D7D0C5] hover:text-[#F2EFE8] transition-colors flex items-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#B65B3C]" /> : <Copy className="w-3.5 h-3.5 text-[#9B978F]" />}
            <span>{copied ? 'BRIEF COPIED' : 'COPY SUMMARY BRIEF'}</span>
          </button>
        </div>

        {/* Structured Grid (Section 30 exact fields) */}
        <div className="p-8 rounded border border-[#242424] bg-[#141414] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Field 1: Business Type */}
            <div className="p-4 rounded bg-[#111111] border border-[#242424]">
              <span className="font-mono text-[#9B978F] uppercase block mb-1">
                BUSINESS TYPE:
              </span>
              <p className="text-sm font-bold text-[#F2EFE8]">
                {businessType}
              </p>
            </div>

            {/* Field 2: You Wanted to Improve */}
            <div className="p-4 rounded bg-[#111111] border border-[#242424]">
              <span className="font-mono text-[#9B978F] uppercase block mb-1">
                YOU WANTED TO IMPROVE:
              </span>
              <p className="text-sm font-bold text-[#F2EFE8]">
                "{wantedToImprove}"
              </p>
            </div>

            {/* Field 3: You Explored */}
            <div className="p-4 rounded bg-[#111111] border border-[#242424]">
              <span className="font-mono text-[#9B978F] uppercase block mb-1">
                YOU EXPLORED:
              </span>
              <p className="text-sm font-bold text-[#F2EFE8]">
                {exploredText}
              </p>
            </div>

            {/* Field 4: Relevant Capability */}
            <div className="p-4 rounded bg-[#111111] border border-[#242424]">
              <span className="font-mono text-[#9B978F] uppercase block mb-1">
                RELEVANT CAPABILITY:
              </span>
              <p className="text-sm font-bold text-[#B65B3C]">
                {relevantCapability}
              </p>
            </div>
          </div>

          {/* Field 5: Possible Opportunity */}
          <div className="p-4 rounded bg-[#111111] border border-[#242424] text-xs">
            <span className="font-mono text-[#9B978F] uppercase block mb-1">
              POSSIBLE OPPORTUNITY:
            </span>
            <p className="text-sm text-[#D7D0C5] leading-relaxed">
              {possibleOpportunity}
            </p>
          </div>

          {/* Field 6: Suggested First Step */}
          <div className="p-4 rounded bg-[#111111] border border-[#242424] text-xs">
            <span className="font-mono text-[#B65B3C] uppercase block mb-1">
              SUGGESTED FIRST STEP:
            </span>
            <p className="text-sm text-[#F2EFE8] leading-relaxed font-semibold">
              {suggestedFirstStep}
            </p>
          </div>

          {/* Disclaimer Quote */}
          <div className="pt-2 text-center">
            <p className="text-xs text-[#9B978F] italic max-w-xl mx-auto">
              "This is a starting hypothesis based on what you explored, not a formal business audit."
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="text-center pt-2">
          <button
            onClick={handleTurnIntoProject}
            className="px-8 py-4 rounded bg-[#F2EFE8] hover:bg-[#B65B3C] text-[#111111] hover:text-[#F2EFE8] font-display font-bold text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>TURN THIS INTO A REAL PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
