import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { BusinessSystem } from '../awe/types';
import { ArrowRight, Check, Compass, ChevronDown, ChevronUp, Sparkles, Shield, Eye, Target, Zap } from 'lucide-react';

const BUSINESS_TYPES = [
  { id: 'Product', label: 'Product', desc: 'Physical goods, artisanal creations or luxury items' },
  { id: 'Service', label: 'Service', desc: 'Consulting, high-end design, architecture or agency' },
  { id: 'Physical / Local Business', label: 'Physical / Local Business', desc: 'Showroom, salon, boutique hotel or fine restaurant' },
  { id: 'Digital Business', label: 'Digital Business', desc: 'E-commerce flagship, platform or software' },
  { id: 'Other', label: 'Other', desc: 'Bespoke venture or multi-category brand' },
];

const IMPROVEMENT_GOALS = [
  { id: 'Get noticed', label: 'Get noticed', system: 'attention' as BusinessSystem },
  { id: 'Look more premium', label: 'Look more premium', system: 'perception' as BusinessSystem },
  { id: 'Build trust', label: 'Build trust', system: 'trust' as BusinessSystem },
  { id: 'Get more enquiries', label: 'Get more enquiries', system: 'action' as BusinessSystem },
  { id: 'Improve website', label: 'Improve website', system: 'action' as BusinessSystem },
  { id: 'Improve social presence', label: 'Improve social presence', system: 'perception' as BusinessSystem },
  { id: 'Build stronger branding', label: 'Build stronger branding', system: 'perception' as BusinessSystem },
  { id: 'Launch something new', label: 'Launch something new', system: 'trust' as BusinessSystem },
  { id: "I'm not sure yet", label: "I'm not sure yet", system: 'attention' as BusinessSystem },
];

export const DiagnosticScene: React.FC = () => {
  const {
    session,
    setIndustry,
    setBusinessName,
    setProblem,
    runDiagnosis,
    trackEvent,
    isReducedMotion,
  } = useAWE();

  // Step 1: Type, Step 2: Goal, Step 3: Fast Summary, Step 4 (Optional): Deep Mode
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<string>('Physical / Local Business');
  const [selectedGoal, setSelectedGoal] = useState<string>('Look more premium');
  const [businessNameInput, setBusinessNameInput] = useState<string>(session.businessName || '');
  const [isDeepModeOpen, setIsDeepModeOpen] = useState<boolean>(false);
  const [deepAudienceTier, setDeepAudienceTier] = useState<string>('HNI / Luxury');
  const [deepCurrentFriction, setDeepCurrentFriction] = useState<string>('Our digital presence looks far cheaper than our actual physical standard');
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setIndustry(type);
    trackEvent('question_answered', { step: 'business_type', value: type });
    setCurrentStep(2);
  };

  const handleSelectGoal = (goalObj: typeof IMPROVEMENT_GOALS[0]) => {
    setSelectedGoal(goalObj.label);
    setProblem(goalObj.id, goalObj.label, goalObj.system);
    trackEvent('question_answered', { step: 'improvement_goal', value: goalObj.label });
    setCurrentStep(3);
  };

  const handleTriggerDeepDiagnosis = async () => {
    setIsDiagnosing(true);
    trackEvent('cta_clicked', { target: 'deep_mode_diagnose' });
    await runDiagnosis();
    setIsDiagnosing(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  // Fast mode hypothesis generation based on selected pair
  const getFastModeHypothesis = () => {
    const bName = businessNameInput.trim() || 'Your business';
    if (selectedGoal === 'Look more premium') {
      return {
        summary: `For ${bName}, the challenge is rarely product quality; it is a translation gap. The real craftsmanship of the physical operation does not reach the screen.`,
        suggestedFocus: 'PERCEPTION',
        investigateOrder: ['PERCEPTION', 'TRUST', 'ACTION', 'ATTENTION'],
        why: 'When prospective clients encounter low-contrast or template-like touchpoints, they subconsciously downgrade their price expectation before speaking with you.',
        capability: 'Bespoke Brand Identity & Editorial Digital Flagship',
        targetProject: 'the-grand-haveli',
      };
    }
    if (selectedGoal === 'Get more enquiries' || selectedGoal === 'Improve website') {
      return {
        summary: `People are discovering ${bName}, but abandoning before inquiring due to high cognitive friction and the absence of a high-trust concierge pathway.`,
        suggestedFocus: 'ACTION',
        investigateOrder: ['ACTION', 'TRUST', 'PERCEPTION', 'ATTENTION'],
        why: 'High-ticket buyers do not fill out cold 8-field forms. They seek prompt reassurance, clear occasion curation, and frictionless private contact.',
        capability: 'Conversion Experience Architecture & VIP Concierge Systems',
        targetProject: 'saanjh',
      };
    }
    if (selectedGoal === 'Get noticed' || selectedGoal === 'Improve social presence') {
      return {
        summary: `Visibility for ${bName} is diluted because communications blend into category noise rather than presenting a distinct, memorable editorial viewpoint.`,
        suggestedFocus: 'ATTENTION',
        investigateOrder: ['ATTENTION', 'PERCEPTION', 'TRUST', 'ACTION'],
        why: 'In modern markets, attention is not won by posting louder; it is earned by being culturally unmistakable and visually disciplined.',
        capability: 'Strategic Brand Positioning & 9-Grid Content Architecture',
        targetProject: 'veda-living',
      };
    }
    // Default
    return {
      summary: `Your challenge may not be visibility alone. The experience between first impression and enquiry may deserve closer attention.`,
      suggestedFocus: 'TRUST',
      investigateOrder: ['PERCEPTION', 'TRUST', 'ACTION', 'ATTENTION'],
      why: 'Clients must believe in your operational authority and standard before taking decisive action.',
      capability: 'Integrated Brand & Experience Architecture',
      targetProject: 'rooh-gastronomy',
    };
  };

  const fastHypothesis = getFastModeHypothesis();

  return (
    <section
      id="business-explorer"
      className="relative py-24 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111]"
    >
      <div id="diagnostic-section" className="hidden" />

      {/* Editorial Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <span>EXPLORER · 03</span>
          <span>·</span>
          <span>30–60 SECOND STRATEGIC ASSESSMENT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          SEE YOUR BUSINESS DIFFERENTLY.
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          Tell us about what you are building. We'll generate a cautious hypothesis about what might deserve attention first.
        </p>
      </div>

      {/* Progress Breadcrumb */}
      <div className="flex items-center gap-3 text-xs font-mono mb-8 border-b border-[#242424] pb-4">
        <button
          onClick={() => setCurrentStep(1)}
          className={`flex items-center gap-1.5 cursor-pointer ${
            currentStep === 1 ? 'text-[#F2EFE8] font-bold' : 'text-[#9B978F] hover:text-[#D7D0C5]'
          }`}
        >
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
            1
          </span>
          <span>BUSINESS TYPE</span>
        </button>

        <span className="text-[#242424]">/</span>

        <button
          onClick={() => setCurrentStep(2)}
          className={`flex items-center gap-1.5 cursor-pointer ${
            currentStep === 2 ? 'text-[#F2EFE8] font-bold' : 'text-[#9B978F] hover:text-[#D7D0C5]'
          }`}
        >
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
            2
          </span>
          <span>PRIMARY OBJECTIVE</span>
        </button>

        <span className="text-[#242424]">/</span>

        <button
          onClick={() => setCurrentStep(3)}
          className={`flex items-center gap-1.5 cursor-pointer ${
            currentStep === 3 ? 'text-[#B65B3C] font-bold' : 'text-[#9B978F] hover:text-[#D7D0C5]'
          }`}
        >
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
            3
          </span>
          <span>WHAT WE HEARD & SUGGEST</span>
        </button>
      </div>

      {/* STEP 01: WHAT KIND OF BUSINESS ARE YOU BUILDING? */}
      {currentStep === 1 && (
        <div className="space-y-6 max-w-3xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F2EFE8]">
              WHAT KIND OF BUSINESS ARE YOU BUILDING?
            </h3>
            <p className="text-xs text-[#9B978F] mt-1">
              Select the option that best reflects your current commercial operation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BUSINESS_TYPES.map((bt) => (
              <button
                key={bt.id}
                onClick={() => handleSelectType(bt.id)}
                className={`p-4 rounded border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedType === bt.id
                    ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8]'
                    : 'border-[#242424] bg-[#141414] text-[#D7D0C5] hover:border-[#383838]'
                }`}
              >
                <div className="font-bold text-sm sm:text-base font-display">{bt.label}</div>
                <div className="text-xs text-[#9B978F] mt-1">{bt.desc}</div>
              </button>
            ))}
          </div>

          {/* Optional Business Name */}
          <div className="pt-4 border-t border-[#242424] flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="text-xs font-mono text-[#9B978F] whitespace-nowrap">
              OPTIONAL BUSINESS NAME:
            </label>
            <input
              type="text"
              value={businessNameInput}
              onChange={(e) => {
                setBusinessNameInput(e.target.value);
                setBusinessName(e.target.value);
              }}
              placeholder="e.g. Royal Heritage Living"
              className="w-full max-w-sm px-3 py-2 bg-[#161616] border border-[#242424] rounded text-xs text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
            />
          </div>
        </div>
      )}

      {/* STEP 02: WHAT ARE YOU TRYING TO IMPROVE? */}
      {currentStep === 2 && (
        <div className="space-y-6 max-w-3xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F2EFE8]">
              WHAT ARE YOU TRYING TO IMPROVE?
            </h3>
            <p className="text-xs text-[#9B978F] mt-1">
              Select the primary friction or priority for your business right now.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {IMPROVEMENT_GOALS.map((goal) => (
              <button
                key={goal.id}
                onClick={() => handleSelectGoal(goal)}
                className={`p-4 rounded border text-left transition-all cursor-pointer ${
                  selectedGoal === goal.label
                    ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8]'
                    : 'border-[#242424] bg-[#141414] text-[#D7D0C5] hover:border-[#383838]'
                }`}
              >
                <span className="text-[10px] font-mono text-[#B65B3C] block mb-1">
                  [{goal.system.toUpperCase()}]
                </span>
                <span className="font-semibold text-sm font-display block">
                  {goal.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs font-mono text-[#9B978F] hover:text-[#F2EFE8] cursor-pointer"
            >
              ← CHANGE BUSINESS TYPE
            </button>
          </div>
        </div>
      )}

      {/* STEP 03: FAST MODE SUMMARY & STRATEGIC HYPOTHESIS */}
      {currentStep === 3 && (
        <div className="space-y-8 max-w-4xl">
          {/* Section 13: What We Heard */}
          <div className="p-6 rounded border border-[#242424] bg-[#141414] space-y-4">
            <div className="flex items-center justify-between border-b border-[#242424] pb-3">
              <span className="text-xs font-mono uppercase text-[#9B978F] tracking-widest">
                WHAT WE HEARD
              </span>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs font-mono text-[#B65B3C] hover:underline cursor-pointer"
              >
                EDIT INPUTS
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#9B978F] uppercase font-mono">BUSINESS TYPE</span>
                <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">{selectedType}</p>
                {businessNameInput && (
                  <p className="text-xs text-[#D7D0C5] font-mono mt-0.5">"{businessNameInput}"</p>
                )}
              </div>
              <div>
                <span className="text-[#9B978F] uppercase font-mono">PRIMARY OBJECTIVE</span>
                <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">"{selectedGoal}"</p>
              </div>
            </div>
          </div>

          {/* Section 13: What This May Suggest */}
          <div className="p-6 md:p-8 rounded border border-[#B65B3C]/50 bg-[#161413] space-y-4">
            <span className="text-xs font-mono uppercase text-[#B65B3C] tracking-widest font-bold">
              WHAT THIS MAY SUGGEST
            </span>
            <p className="text-lg md:text-xl font-bold font-display text-[#F2EFE8] leading-snug">
              {fastHypothesis.summary}
            </p>
            <p className="text-sm text-[#D7D0C5] leading-relaxed">
              {fastHypothesis.why}
            </p>
          </div>

          {/* Section 13: What We'd Investigate First */}
          <div className="p-6 rounded border border-[#242424] bg-[#141414] space-y-4">
            <span className="text-xs font-mono uppercase text-[#9B978F] tracking-widest">
              WHAT WE'D INVESTIGATE FIRST
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {['ATTENTION', 'PERCEPTION', 'TRUST', 'ACTION'].map((sys, idx) => {
                const isPrime = sys === fastHypothesis.suggestedFocus;
                return (
                  <div
                    key={sys}
                    className={`p-3.5 rounded border text-center ${
                      isPrime
                        ? 'border-[#B65B3C] bg-[#B65B3C]/10 text-[#F2EFE8]'
                        : 'border-[#242424] bg-[#111111] text-[#9B978F]'
                    }`}
                  >
                    <span className="text-[10px] font-mono block text-[#9B978F]">0{idx + 1}</span>
                    <span className={`text-xs font-bold font-display block mt-1 ${isPrime ? 'text-[#B65B3C]' : ''}`}>
                      {sys}
                    </span>
                    {isPrime && (
                      <span className="text-[9px] font-mono text-[#D7D0C5] uppercase block mt-1">
                        ★ PRIMARY LEVER
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-[#9B978F] pt-2">
              AyuuWorks maps your entire customer journey across these 4 interconnected systems rather than treating marketing in isolation.
            </p>
          </div>

          {/* Section 13: See How We'd Approach This */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded border border-[#242424] bg-[#161616]">
            <div>
              <span className="text-[10px] font-mono text-[#B65B3C] uppercase">RECOMMENDED CAPABILITY</span>
              <h4 className="text-base font-bold text-[#F2EFE8] mt-0.5">{fastHypothesis.capability}</h4>
              <p className="text-xs text-[#9B978F] mt-1">
                Explore our approach and relevant case study.
              </p>
            </div>

            <button
              onClick={() => scrollToSection('projects-section')}
              className="w-full sm:w-auto px-6 py-3 rounded bg-[#F2EFE8] hover:bg-[#B65B3C] text-[#111111] hover:text-[#F2EFE8] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>SEE HOW WE'D APPROACH THIS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Section 14: Deep Mode (Optional Expansion) */}
          <div className="pt-4 border-t border-[#242424]">
            <button
              onClick={() => setIsDeepModeOpen(!isDeepModeOpen)}
              className="flex items-center justify-between w-full p-4 rounded border border-[#242424] bg-[#141414] text-left hover:border-[#383838] transition-colors cursor-pointer"
            >
              <div>
                <span className="text-xs font-mono uppercase text-[#B65B3C] font-bold">
                  DEEP MODE · OPTIONAL
                </span>
                <h4 className="text-sm font-bold text-[#F2EFE8] mt-0.5">
                  WANT A DEEPER STRATEGIC PERSPECTIVE?
                </h4>
                <p className="text-xs text-[#9B978F]">
                  Answer 2 additional questions to run the full AWE diagnosis with customized validation tests.
                </p>
              </div>

              <div className="text-[#9B978F] ml-4">
                {isDeepModeOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {isDeepModeOpen && (
              <div className="mt-4 p-6 rounded border border-[#242424] bg-[#141414] space-y-6">
                <div>
                  <label className="text-xs font-mono text-[#D7D0C5] block mb-2">
                    WHAT IS YOUR TARGET CLIENT / BUYER TIER?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {['Mass Market / High Volume', 'Aspirational Middle-Class', 'HNI / Ultra-Luxury'].map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setDeepAudienceTier(tier)}
                        className={`p-3 rounded border text-xs text-left cursor-pointer transition-colors ${
                          deepAudienceTier === tier
                            ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8] font-bold'
                            : 'border-[#242424] text-[#9B978F] hover:text-[#F2EFE8]'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#D7D0C5] block mb-2">
                    WHERE DOES ATTENTION LEAK CURRENTLY?
                  </label>
                  <textarea
                    value={deepCurrentFriction}
                    onChange={(e) => setDeepCurrentFriction(e.target.value)}
                    rows={3}
                    className="w-full p-3 rounded bg-[#111111] border border-[#242424] text-xs text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
                    placeholder="Describe what feels broken or disconnected..."
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-[#9B978F]">
                    Powered by AWE's transparent reasoning layer. Never fabricated.
                  </p>

                  <button
                    onClick={handleTriggerDeepDiagnosis}
                    disabled={isDiagnosing}
                    className="w-full sm:w-auto px-6 py-3 rounded bg-[#B65B3C] hover:bg-[#a14f33] text-[#F2EFE8] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isDiagnosing ? (
                      <span>RUNNING STRATEGIC AUDIT...</span>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>GENERATE STRATEGY AUDIT</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Display Full Strategy Audit Output if generated */}
                {session.diagnosis && (
                  <div className="mt-6 pt-6 border-t border-[#242424] space-y-4">
                    <span className="text-xs font-mono uppercase text-[#B65B3C] tracking-widest font-bold">
                      AWE STRATEGIC AUDIT REPORT
                    </span>
                    <div className="p-4 rounded bg-[#111111] border border-[#242424] text-xs text-[#D7D0C5] space-y-2">
                      <p className="font-bold text-[#F2EFE8] text-sm">
                        {session.diagnosis.summary}
                      </p>
                      <p className="text-[#9B978F]">
                        {session.diagnosis.reasoning}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-4 rounded bg-[#111111] border border-[#242424] space-y-1">
                        <span className="font-mono text-[10px] text-[#B65B3C] uppercase block">
                          POSSIBLE BOTTLENECKS
                        </span>
                        <ul className="list-disc list-inside text-[#D7D0C5] space-y-1">
                          {session.diagnosis.possible_bottlenecks.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded bg-[#111111] border border-[#242424] space-y-1">
                        <span className="font-mono text-[10px] text-[#D7D0C5] uppercase block">
                          RECOMMENDED CORRECTIONS
                        </span>
                        <ul className="list-disc list-inside text-[#D7D0C5] space-y-1">
                          {session.diagnosis.recommended_corrections.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
