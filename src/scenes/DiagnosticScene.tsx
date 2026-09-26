import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { BusinessSystem } from '../awe/types';
import { ArrowRight, Check, Compass, ChevronDown, ChevronUp, Sparkles, Shield, Eye, Target, Zap, Crosshair, Terminal } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

const BUSINESS_TYPES = [
  { id: 'Product', label: 'Product (D2C / Physical Luxury)', desc: 'Handcrafted jewellery, luxury fashion, artisanal creations' },
  { id: 'Service', label: 'Service (High-Ticket Consulting)', desc: 'Architects, bespoke consultants, elite agency ya firm' },
  { id: 'Physical / Local Business', label: 'Physical / Luxury Destination', desc: 'Heritage hotel, palace resort, fine dining club ya flagship showroom' },
  { id: 'Digital Business', label: 'Digital Brand / Platform', desc: 'E-commerce flagship store, proprietary tech ya platform' },
  { id: 'Other', label: 'Disruptive Venture / Other', desc: 'Multi-category empire ya unique luxury concept' },
];

const IMPROVEMENT_GOALS = [
  { id: 'Get noticed', label: 'Market mein notice hona hai', desc: 'Competitors ke shor se alag nikalna hai', system: 'attention' as BusinessSystem },
  { id: 'Look more premium', label: 'Zyada luxury & premium lagna hai', desc: 'Offline standard screen par reflect nahi ho raha', system: 'perception' as BusinessSystem },
  { id: 'Build trust', label: 'High-ticket clients ka trust jeetna hai', desc: 'Doubt khatam karke direct conversion chahiye', system: 'trust' as BusinessSystem },
  { id: 'Get more enquiries', label: 'Zyada qualified leads & bookings chahiye', desc: 'Visitors aate hain par convert nahi hote', system: 'action' as BusinessSystem },
  { id: 'Improve website', label: 'Website ko modern flagship banana hai', desc: 'Purani template wali feel hatani hai', system: 'action' as BusinessSystem },
  { id: 'Improve social presence', label: 'Social content ko brand asset banana hai', desc: 'Generic reels nahi, signature aesthetic chahiye', system: 'perception' as BusinessSystem },
  { id: 'Build stronger branding', label: 'Timeless brand identity khadi karni hai', desc: 'Jo category ka landmark ban sake', system: 'perception' as BusinessSystem },
  { id: 'Launch something new', label: 'Naya product ya venture launch karna hai', desc: 'Pehle din se authority ke saath market mein aana hai', system: 'trust' as BusinessSystem },
  { id: "I'm not sure yet", label: "Abhi exact bottleneck clear nahi hai", desc: 'Ek objective expert audit chahiye', system: 'attention' as BusinessSystem },
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
  const [selectedGoal, setSelectedGoal] = useState<string>('Zyada luxury & premium lagna hai');
  const [businessNameInput, setBusinessNameInput] = useState<string>(session.businessName || '');
  const [isDeepModeOpen, setIsDeepModeOpen] = useState<boolean>(false);
  const [deepAudienceTier, setDeepAudienceTier] = useState<string>('HNI / Ultra-Luxury');
  const [deepCurrentFriction, setDeepCurrentFriction] = useState<string>('Hamara physical standard bohot elite hai, par digital screen par template jaisa dikhta hai');
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);

  const handleSelectType = (type: string) => {
    soundEngine.playClick();
    setSelectedType(type);
    setIndustry(type);
    trackEvent('question_answered', { step: 'business_type', value: type });
    setCurrentStep(2);
  };

  const handleSelectGoal = (goalObj: typeof IMPROVEMENT_GOALS[0]) => {
    soundEngine.playTargetLock();
    setSelectedGoal(goalObj.label);
    setProblem(goalObj.id, goalObj.label, goalObj.system);
    trackEvent('question_answered', { step: 'improvement_goal', value: goalObj.label });
    setCurrentStep(3);
  };

  const handleTriggerDeepDiagnosis = async () => {
    soundEngine.playTelemetry();
    setIsDiagnosing(true);
    trackEvent('cta_clicked', { target: 'deep_mode_diagnose' });
    await runDiagnosis();
    setIsDiagnosing(false);
  };

  const scrollToSection = (id: string) => {
    soundEngine.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  // Fast mode hypothesis generation in Hinglish
  const getFastModeHypothesis = () => {
    const bName = businessNameInput.trim() || 'Aapka Brand';
    if (selectedGoal.includes('premium') || selectedGoal.includes('branding')) {
      return {
        summary: `${bName} ke liye challenge product quality ka nahi hai — asli dikkat translation gap ki hai. Aapki real offline craftsmanship screen par deliver nahi ho pa rahi.`,
        suggestedFocus: 'PERCEPTION',
        investigateOrder: ['PERCEPTION', 'TRUST', 'ACTION', 'ATTENTION'],
        why: 'Jab high-net-worth clients generic ya low-contrast visual dekhte hain, woh aapse baat karne se pehle hi aapki value subconscious level par downgrade kar dete hain.',
        capability: 'Bespoke Brand Identity & Editorial Digital Flagship',
        targetProject: 'the-grand-haveli',
      };
    }
    if (selectedGoal.includes('enquiries') || selectedGoal.includes('website')) {
      return {
        summary: `Log ${bName} ko discover toh kar rahe hain, par booking ya enquiry karne se pehle bounce ho jaate hain kyunki checkout/inquiry flow mein high-trust concierge missing hai.`,
        suggestedFocus: 'ACTION',
        investigateOrder: ['ACTION', 'TRUST', 'PERCEPTION', 'ATTENTION'],
        why: 'Luxury aur high-ticket buyers 10-field boring form nahi bharte. Unhe turant premium reassurance, custom curation aur effortless direct contact chahiye.',
        capability: 'Conversion Experience Architecture & VIP Booking Engines',
        targetProject: 'saanjh',
      };
    }
    if (selectedGoal.includes('notice') || selectedGoal.includes('social')) {
      return {
        summary: `${bName} ki visibility isliye dilute ho rahi hai kyunki messaging category noise mein mix ho jaati hai, bina kisi unmistakable signature editorial viewpoint ke.`,
        suggestedFocus: 'ATTENTION',
        investigateOrder: ['ATTENTION', 'PERCEPTION', 'TRUST', 'ACTION'],
        why: 'Aaj ke cluttered market mein attention zor se chillane se nahi, cultural distinctiveness aur disciplined aesthetics se earn ki jaati hai.',
        capability: 'Strategic Brand Positioning & 9-Grid Content Architecture',
        targetProject: 'veda-living',
      };
    }
    // Default
    return {
      summary: `Aapka challenge sirf visibility ka nahi hai. Pehle impression aur enquiry ke beech ka jo experience hai, usse immediate attention chahiye.`,
      suggestedFocus: 'TRUST',
      investigateOrder: ['PERCEPTION', 'TRUST', 'ACTION', 'ATTENTION'],
      why: 'Clients ko aapki authority aur prestige par 100% believe hona chahiye tabhi woh high-value transaction initiate karenge.',
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

      {/* AAA Game Tactical Header in Hinglish */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <Crosshair className="w-3.5 h-3.5 text-[#B65B3C]" />
          <span>EXPLORER · 03 // 30–60 SEC TACTICAL AUDIT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          APNE BUSINESS KO NAYE LENS SE DEKHO.
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          Batao aap kis tarah ka business build kar rahe ho. Hum generate karenge ek sharp strategic hypothesis ki sabse pehle kahan dhyan dena zaroori hai.
        </p>
      </div>

      {/* Progress Breadcrumb (AAA Tactical HUD Tracker) */}
      <div className="flex items-center gap-3 text-xs font-mono mb-8 border-b border-[#242424] pb-4">
        <button
          onClick={() => {
            soundEngine.playClick();
            setCurrentStep(1);
          }}
          className={`flex items-center gap-1.5 cursor-pointer ${
            currentStep === 1 ? 'text-[#F2EFE8] font-bold' : 'text-[#9B978F] hover:text-[#D7D0C5]'
          }`}
        >
          <span className="w-5 h-5 rounded-sm border border-current flex items-center justify-center text-[10px]">
            01
          </span>
          <span>BUSINESS TYPE</span>
        </button>

        <span className="text-[#383838]">/</span>

        <button
          onClick={() => {
            soundEngine.playClick();
            setCurrentStep(2);
          }}
          className={`flex items-center gap-1.5 cursor-pointer ${
            currentStep === 2 ? 'text-[#F2EFE8] font-bold' : 'text-[#9B978F] hover:text-[#D7D0C5]'
          }`}
        >
          <span className="w-5 h-5 rounded-sm border border-current flex items-center justify-center text-[10px]">
            02
          </span>
          <span>ASLI GOAL</span>
        </button>

        <span className="text-[#383838]">/</span>

        <button
          onClick={() => {
            soundEngine.playClick();
            setCurrentStep(3);
          }}
          className={`flex items-center gap-1.5 cursor-pointer ${
            currentStep === 3 ? 'text-[#B65B3C] font-bold' : 'text-[#9B978F] hover:text-[#D7D0C5]'
          }`}
        >
          <span className="w-5 h-5 rounded-sm border border-current flex items-center justify-center text-[10px]">
            03
          </span>
          <span>STRATEGIC HYPOTHESIS</span>
        </button>
      </div>

      {/* STEP 01: KIS TYPE KA BUSINESS BUILD KAR RAHE HO? */}
      {currentStep === 1 && (
        <div className="space-y-6 max-w-3xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F2EFE8]">
              KIS TYPE KA BUSINESS BUILD KAR RAHE HO?
            </h3>
            <p className="text-xs text-[#9B978F] mt-1">
              Select karo jo aapke current commercial model se sabse zyada match karta hai.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BUSINESS_TYPES.map((bt) => (
              <button
                key={bt.id}
                onClick={() => handleSelectType(bt.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`hud-bracket p-4 rounded-sm border text-left transition-[border-color,background-color] duration-200 cursor-pointer flex flex-col justify-between ${
                  selectedType === bt.id
                    ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8]'
                    : 'border-[#242424] bg-[#141414] text-[#D7D0C5] hover:border-[#383838] hover:bg-[#181818]'
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
              BRAND / BUSINESS KA NAAM (OPTIONAL):
            </label>
            <input
              type="text"
              value={businessNameInput}
              onChange={(e) => {
                setBusinessNameInput(e.target.value);
                setBusinessName(e.target.value);
              }}
              placeholder="e.g. Saanjh Weddings ya Rooh Club"
              className="w-full max-w-sm px-3 py-2 bg-[#161616] border border-[#242424] rounded text-xs text-[#F2EFE8] focus:border-[#B65B3C] outline-none font-mono"
            />
          </div>
        </div>
      )}

      {/* STEP 02: SABSE BADA BOTTLENECK KAHAN ATKA HAI? */}
      {currentStep === 2 && (
        <div className="space-y-6 max-w-3xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F2EFE8]">
              SABSE BADA DARD YA OBJECTIVE KAHAN HAI?
            </h3>
            <p className="text-xs text-[#9B978F] mt-1">
              Select karo jo aapke business ki sabse badi current priority hai.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {IMPROVEMENT_GOALS.map((goal) => (
              <button
                key={goal.id}
                onClick={() => handleSelectGoal(goal)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`hud-bracket p-4 rounded-sm border text-left transition-[border-color,background-color] duration-200 cursor-pointer ${
                  selectedGoal === goal.label
                    ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8]'
                    : 'border-[#242424] bg-[#141414] text-[#D7D0C5] hover:border-[#383838] hover:bg-[#181818]'
                }`}
              >
                <span className="text-[10px] font-mono text-[#B65B3C] block mb-1">
                  [{goal.system.toUpperCase()} LEVER]
                </span>
                <span className="font-semibold text-sm font-display block text-[#F2EFE8]">
                  {goal.label}
                </span>
                <span className="text-[11px] text-[#9B978F] block mt-1 leading-snug">
                  {goal.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={() => {
                soundEngine.playClick();
                setCurrentStep(1);
              }}
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
          <div className="hud-bracket p-6 rounded-sm border border-[#242424] bg-[#141414] space-y-4">
            <div className="flex items-center justify-between border-b border-[#242424] pb-3">
              <span className="text-xs font-mono uppercase text-[#9B978F] tracking-widest font-bold">
                HUMNE KYA NOTICE KIYA // TACTICAL SUMMARY
              </span>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setCurrentStep(1);
                }}
                className="text-xs font-mono text-[#B65B3C] hover:underline cursor-pointer"
              >
                EDIT INPUTS
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-[#9B978F] uppercase">BUSINESS CATEGORY</span>
                <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">{selectedType}</p>
                {businessNameInput && (
                  <p className="text-xs text-[#B65B3C] mt-0.5">"{businessNameInput}"</p>
                )}
              </div>
              <div>
                <span className="text-[#9B978F] uppercase">CURRENT BOTTLENECK</span>
                <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">"{selectedGoal}"</p>
              </div>
            </div>
          </div>

          {/* Section 13: What This May Suggest */}
          <div className="hud-bracket p-6 md:p-8 rounded-sm border border-[#B65B3C]/60 bg-[#171513] space-y-4 shadow-xl shadow-[#B65B3C]/5">
            <span className="text-xs font-mono uppercase text-[#B65B3C] tracking-widest font-bold flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5" />
              <span>BOTTLENECK KA ASLI ROOT CAUSE // HYPOTHESIS</span>
            </span>
            <p className="text-lg md:text-xl font-bold font-display text-[#F2EFE8] leading-snug">
              {fastHypothesis.summary}
            </p>
            <p className="text-sm text-[#D7D0C5] leading-relaxed">
              {fastHypothesis.why}
            </p>
          </div>

          {/* Section 13: What We'd Investigate First */}
          <div className="hud-bracket p-6 rounded-sm border border-[#242424] bg-[#141414] space-y-4">
            <span className="text-xs font-mono uppercase text-[#9B978F] tracking-widest font-bold">
              PEHLE KYA INVESTIGATE HOGA // 4-STAGE BATTLE PLAN
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {['ATTENTION', 'PERCEPTION', 'TRUST', 'ACTION'].map((sys, idx) => {
                const isPrime = sys === fastHypothesis.suggestedFocus;
                return (
                  <div
                    key={sys}
                    className={`p-3.5 rounded-sm border text-center transition-all ${
                      isPrime
                        ? 'border-[#B65B3C] bg-[#B65B3C]/15 text-[#F2EFE8] shadow-md shadow-[#B65B3C]/10'
                        : 'border-[#242424] bg-[#111111] text-[#9B978F]'
                    }`}
                  >
                    <span className="text-[10px] font-mono block text-[#9B978F]">0{idx + 1} / STAGE</span>
                    <span className={`text-xs font-bold font-display block mt-1 ${isPrime ? 'text-[#B65B3C]' : ''}`}>
                      {sys}
                    </span>
                    {isPrime && (
                      <span className="text-[9px] font-mono text-[#D7D0C5] uppercase block mt-1 font-bold">
                        ★ PRIMARY LEVER
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-[#9B978F] pt-2">
              AyuuWorks aapki customer journey ko in 4 interconnected systems ke through fix karta hai — marketing ko isolated tukdo mein baantne ki jagah.
            </p>
          </div>

          {/* Section 13: See How We'd Approach This */}
          <div className="hud-bracket flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-sm border border-[#242424] bg-[#161616]">
            <div>
              <span className="text-[10px] font-mono text-[#B65B3C] uppercase font-bold">RECOMMENDED STRATEGY CAPABILITY</span>
              <h4 className="text-base font-bold font-display text-[#F2EFE8] mt-0.5">{fastHypothesis.capability}</h4>
              <p className="text-xs text-[#9B978F] mt-1">
                Dekho humne similar luxury brands ke liye isse kaise execute kiya.
              </p>
            </div>

            <button
              onClick={() => scrollToSection('projects-section')}
              onMouseEnter={() => soundEngine.playHover()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-sm bg-[#F2EFE8] hover:bg-[#B65B3C] text-[#111111] hover:text-[#F2EFE8] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-lg shadow-black/50"
            >
              <span>DEKHO HUM KAISE EXECUTE KARTE HAIN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Section 14: Deep Mode (Optional Expansion) */}
          <div className="pt-4 border-t border-[#242424]">
            <button
              onClick={() => {
                soundEngine.playClick();
                setIsDeepModeOpen(!isDeepModeOpen);
              }}
              className="hud-bracket flex items-center justify-between w-full p-4 rounded-sm border border-[#242424] bg-[#141414] text-left hover:border-[#383838] transition-colors cursor-pointer"
            >
              <div>
                <span className="text-xs font-mono uppercase text-[#B65B3C] font-bold">
                  DEEP MODE // ADVANCED STRATEGY AUDIT (OPTIONAL)
                </span>
                <h4 className="text-sm font-bold font-display text-[#F2EFE8] mt-0.5">
                  KYA AAPKO DEEPER STRATEGIC PERSPECTIVE CHAHIYE?
                </h4>
                <p className="text-xs text-[#9B978F]">
                  2 additional questions ka jawab do aur pura AWE strategic reasoning report unlock karo.
                </p>
              </div>

              <div className="text-[#9B978F] ml-4">
                {isDeepModeOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {isDeepModeOpen && (
              <div className="mt-4 p-6 rounded-sm border border-[#242424] bg-[#141414] space-y-6">
                <div>
                  <label className="text-xs font-mono text-[#D7D0C5] block mb-2 uppercase font-bold">
                    AAPKA TARGET CLIENT / AUDIENCE TIER KYA HAI?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {['Mass Market / High Volume', 'Aspirational Middle-Class', 'HNI / Ultra-Luxury'].map((tier) => (
                      <button
                        key={tier}
                        onClick={() => {
                          soundEngine.playClick();
                          setDeepAudienceTier(tier);
                        }}
                        className={`p-3 rounded-sm border text-xs text-left cursor-pointer transition-colors ${
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
                  <label className="text-xs font-mono text-[#D7D0C5] block mb-2 uppercase font-bold">
                    ATTENTION YA CONVERSION KAHAN LEAK HO RAHA HAI?
                  </label>
                  <textarea
                    value={deepCurrentFriction}
                    onChange={(e) => setDeepCurrentFriction(e.target.value)}
                    rows={3}
                    className="w-full p-3 rounded-sm bg-[#111111] border border-[#242424] text-xs text-[#F2EFE8] focus:border-[#B65B3C] outline-none font-mono"
                    placeholder="Batao kahan disconnect mehsoos ho raha hai..."
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs font-mono text-[#9B978F]">
                    Powered by AWE Reasoning Engine. 100% deterministic & verifiable.
                  </p>

                  <button
                    onClick={handleTriggerDeepDiagnosis}
                    disabled={isDiagnosing}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-sm bg-[#B65B3C] hover:bg-[#a14f33] text-[#F2EFE8] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#B65B3C]/20"
                  >
                    {isDiagnosing ? (
                      <span>RUNNING STRATEGIC AUDIT...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>GENERATE FULL STRATEGY AUDIT</span>
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
                    <div className="p-4 rounded-sm bg-[#111111] border border-[#242424] text-xs text-[#D7D0C5] space-y-2">
                      <p className="font-bold text-[#F2EFE8] text-sm">
                        {session.diagnosis.summary}
                      </p>
                      <p className="text-[#9B978F]">
                        {session.diagnosis.reasoning}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-4 rounded-sm bg-[#111111] border border-[#242424] space-y-1">
                        <span className="font-mono text-[10px] text-[#B65B3C] uppercase block font-bold">
                          IDENTIFIED BOTTLENECKS
                        </span>
                        <ul className="list-disc list-inside text-[#D7D0C5] space-y-1">
                          {session.diagnosis.possible_bottlenecks.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-sm bg-[#111111] border border-[#242424] space-y-1">
                        <span className="font-mono text-[10px] text-[#D7D0C5] uppercase block font-bold">
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

