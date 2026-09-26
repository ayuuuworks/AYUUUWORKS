import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAWE } from '../awe/context';
import {
  Compass,
  Lightbulb,
  Code2,
  Rocket,
  Layers,
  Camera,
  TrendingUp,
  Terminal,
  Crosshair,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Radio,
  Zap,
} from 'lucide-react';
import { soundEngine } from '../services/soundEngine';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { getTranslations } from '../data/translations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type StageId = 'See' | 'Think' | 'Build' | 'Move';

interface StageData {
  id: StageId;
  puepLetter: 'P' | 'U' | 'E' | 'P';
  puepWord: string;
  index: string;
  icon: typeof Compass;
  vector: string;
  coord: string;
  hinglish: {
    title: string;
    tagline: string;
    detail: string;
    focusPoint: string;
    deliverables: string[];
    metrics: string;
    badge: string;
  };
  english: {
    title: string;
    tagline: string;
    detail: string;
    focusPoint: string;
    deliverables: string[];
    metrics: string;
    badge: string;
  };
}

const STAGES: StageData[] = [
  {
    id: 'See',
    puepLetter: 'P',
    puepWord: 'PROBLEM',
    index: '01',
    icon: Compass,
    vector: 'DIAGNOSIS_RADAR',
    coord: 'SEC_01 // X:104 Y:42',
    hinglish: {
      title: 'See',
      tagline: 'Reality Gap aur silent friction pakadna.',
      detail:
        'Hum audit karte hain aapka real business operation: craft, founder vision, aur screen par aate-aate customer trust kahan break ho raha hai. Silent bottlenecks ko scan karna.',
      focusPoint: 'Code ya design chhoone se pehle silent friction bottlenecks eliminate karna.',
      deliverables: ['Diagnostic Friction Audit', 'Reality Gap Mapping', 'Silent Leak Isolation'],
      metrics: 'SCAN FIDELITY: 100% // BOTTLENECKS: ISOLATED',
      badge: 'FIRST CONTACT',
    },
    english: {
      title: 'See',
      tagline: 'Isolating reality gaps and silent friction.',
      detail:
        'We audit your core commercial operations: authentic craft, founder vision, and precisely where customer trust fractures between reality and the digital interface.',
      focusPoint: 'Eliminating silent operational friction before touching code or pixels.',
      deliverables: ['Diagnostic Friction Audit', 'Reality Gap Mapping', 'Silent Leak Isolation'],
      metrics: 'SCAN FIDELITY: 100% // BOTTLENECKS: ISOLATED',
      badge: 'FIRST CONTACT',
    },
  },
  {
    id: 'Think',
    puepLetter: 'U',
    puepWord: 'UNDERSTAND',
    index: '02',
    icon: Lightbulb,
    vector: 'STRATEGY_SYNAPSE',
    coord: 'SEC_02 // X:248 Y:86',
    hinglish: {
      title: 'Think',
      tagline: 'Strategic leverage aur positioning architect karna.',
      detail:
        'Hum category analysis karte hain, narrative ko ultra-sharp banate hain, aur aisi positioning architect karte hain jisse aapka brand category mein impossible to ignore ho.',
      focusPoint: 'Clutter se alag hoke undisputed high-ticket authority establish karna.',
      deliverables: ['Strategic Blueprint', 'Value Proposition Architecture', 'Category Moat Plan'],
      metrics: 'LEVERAGE VECTOR: 3.4X // PRICING POWER: UNLOCKED',
      badge: 'COGNITIVE ANCHOR',
    },
    english: {
      title: 'Think',
      tagline: 'Architecting category authority and strategic leverage.',
      detail:
        'We dissect competitive landscapes, sharpen core narratives, and engineer unmistakable positioning that elevates your brand beyond commoditization.',
      focusPoint: 'Cutting through category noise to command undisputed high-ticket pricing power.',
      deliverables: ['Strategic Blueprint', 'Value Proposition Architecture', 'Category Moat Plan'],
      metrics: 'LEVERAGE VECTOR: 3.4X // PRICING POWER: UNLOCKED',
      badge: 'COGNITIVE ANCHOR',
    },
  },
  {
    id: 'Build',
    puepLetter: 'E',
    puepWord: 'EXECUTE',
    index: '03',
    icon: Code2,
    vector: 'TACTICAL_FLAGSHIP',
    coord: 'SEC_03 // X:412 Y:55',
    hinglish: {
      title: 'Build',
      tagline: 'AAA-grade digital flagship engineer karna.',
      detail:
        'Hum build karte hain bespoke digital experiences, tactile design systems, cinematic video assets aur high-speed commercial conversion interfaces.',
      focusPoint: 'Zero generic templates, 60fps tactile interactions aur bulletproof code.',
      deliverables: ['Bespoke Flagship Web', '60FPS Tactile Interactions', 'Cinematic Brand Film'],
      metrics: 'FRAME RATE: 60FPS // ASSET FIDELITY: AAA GRADE',
      badge: 'PRODUCTION LOCK',
    },
    english: {
      title: 'Build',
      tagline: 'Engineering bespoke AAA-grade digital flagships.',
      detail:
        'We build custom digital flagships, tactile micro-interactions, editorial film assets, and high-velocity commercial conversion engines.',
      focusPoint: 'Zero generic templates, fluid 60fps tactile feedback, and resilient code architecture.',
      deliverables: ['Bespoke Flagship Web', '60FPS Tactile Interactions', 'Cinematic Brand Film'],
      metrics: 'FRAME RATE: 60FPS // ASSET FIDELITY: AAA GRADE',
      badge: 'PRODUCTION LOCK',
    },
  },
  {
    id: 'Move',
    puepLetter: 'P',
    puepWord: 'PROVE',
    index: '04',
    icon: Rocket,
    vector: 'COMMERCIAL_PROOF',
    coord: 'SEC_04 // X:590 Y:92',
    hinglish: {
      title: 'Move',
      tagline: 'Commercial momentum aur compounding authority deliver karna.',
      detail:
        'Hum deployment karte hain high-intent customer touchpoints pe: editorial campaigns, acquisition systems aur compounding brand prestige.',
      focusPoint: 'Measurable commercial results, elevated enquiries aur timeless brand recall.',
      deliverables: ['High-Intent Acquisition Engine', 'Editorial Distribution Launch', 'Compounding Prestige System'],
      metrics: 'CONVERSION DELTA: +240% // MOMENTUM: SUSTAINED',
      badge: 'MISSION PROVEN',
    },
    english: {
      title: 'Move',
      tagline: 'Deploying high-intent customer momentum and commercial proof.',
      detail:
        'We launch across verified customer touchpoints: editorial distribution campaigns, acquisition funnels, and compounding commercial prestige.',
      focusPoint: 'Measurable commercial uplift, elevated high-value enquiries, and enduring brand prestige.',
      deliverables: ['High-Intent Acquisition Engine', 'Editorial Distribution Launch', 'Compounding Prestige System'],
      metrics: 'CONVERSION DELTA: +240% // MOMENTUM: SUSTAINED',
      badge: 'MISSION PROVEN',
    },
  },
];

const SERVICE_GROUPS = [
  {
    category: 'BUILD',
    sub: 'DIGITAL FLAGSHIPS',
    icon: Code2,
    hinglish: {
      lead: 'Digital experiences jo memory aur conversion dono deliver karein.',
      items: ['Bespoke Websites', '3D Interactive Flagships', 'High-Speed Web Apps'],
    },
    english: {
      lead: 'Digital flagships engineered for cultural memory and commercial conversion.',
      items: ['Bespoke Websites', '3D Interactive Flagships', 'High-Speed Web Applications'],
    },
  },
  {
    category: 'CREATE',
    sub: 'BRAND SYSTEMS',
    icon: Layers,
    hinglish: {
      lead: 'Visual identities jo silent authority aur respect command karein.',
      items: ['Brand Identity Systems', 'Graphic Architecture', 'Campaign Art Direction', 'Digital Catalogues'],
    },
    english: {
      lead: 'Visual identities that command silent authority and instant distinction.',
      items: ['Brand Identity Systems', 'Graphic Architecture', 'Campaign Art Direction', 'Digital Catalogues'],
    },
  },
  {
    category: 'CAPTURE',
    sub: 'CINEMATIC ASSETS',
    icon: Camera,
    hinglish: {
      lead: 'Atmospheric visual production jo authentic craft ko screen par laye.',
      items: ['Cinematic Brand Films', 'Editorial Photography', 'Sound & Motion Graphics'],
    },
    english: {
      lead: 'Atmospheric visual production capturing authentic founder craft on screen.',
      items: ['Cinematic Brand Films', 'Editorial Photography', 'Sound & Motion Graphics'],
    },
  },
  {
    category: 'GROW',
    sub: 'DISTRIBUTION ENGINES',
    icon: TrendingUp,
    hinglish: {
      lead: 'Editorial distribution systems customer acquisition ke liye.',
      items: ['Content Systems', 'Creative Strategy', 'High-Intent Meta Ads', 'Conversion Funnels'],
    },
    english: {
      lead: 'Editorial distribution systems built for customer acquisition at scale.',
      items: ['Content Systems', 'Creative Strategy', 'High-Intent Paid Acquisition', 'Conversion Funnels'],
    },
  },
];

export const PUEPFrameworkScene: React.FC = () => {
  const { trackEvent, isReducedMotion, language } = useAWE();
  const [activeStageId, setActiveStageId] = useState<StageId>('See');
  const [isPlayingFlow, setIsPlayingFlow] = useState<boolean>(false);
  const [flowProgress, setFlowProgress] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const frameworkGridRef = useRef<HTMLDivElement>(null);
  const serviceGridRef = useRef<HTMLDivElement>(null);
  const conduitSvgRef = useRef<SVGSVGElement>(null);
  const activeDetailRef = useRef<HTMLDivElement>(null);
  const flowTimerRef = useRef<number | null>(null);

  const activeIndex = STAGES.findIndex((s) => s.id === activeStageId);
  const currentStage = STAGES[activeIndex] || STAGES[0];
  const isHinglish = language === 'hinglish';
  const stageCopy = isHinglish ? currentStage.hinglish : currentStage.english;
  const t = getTranslations(language);

  const handleSelectStage = (id: StageId) => {
    soundEngine.playTargetLock();
    setActiveStageId(id);
    trackEvent('service_explored', { method_step: id });

    // GSAP micro-punch on active telemetry detail change
    if (activeDetailRef.current && !isReducedMotion) {
      gsap.fromTo(
        activeDetailRef.current,
        { opacity: 0.6, y: 8, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' }
      );
    }
  };

  const handleNextStage = () => {
    const nextIdx = (activeIndex + 1) % STAGES.length;
    handleSelectStage(STAGES[nextIdx].id);
  };

  const handlePrevStage = () => {
    const prevIdx = (activeIndex - 1 + STAGES.length) % STAGES.length;
    handleSelectStage(STAGES[prevIdx].id);
  };

  // Connected Flow Simulation (Auto-Play cycle through See -> Think -> Build -> Move)
  useEffect(() => {
    if (!isPlayingFlow) {
      if (flowTimerRef.current) clearInterval(flowTimerRef.current);
      setFlowProgress(0);
      return;
    }

    const stepDuration = 3200; // 3.2s per stage
    const interval = 50;
    let elapsed = 0;

    flowTimerRef.current = window.setInterval(() => {
      elapsed += interval;
      const progressPercent = Math.min((elapsed / stepDuration) * 100, 100);
      setFlowProgress(progressPercent);

      if (elapsed >= stepDuration) {
        elapsed = 0;
        setActiveStageId((prev) => {
          const currentIdx = STAGES.findIndex((s) => s.id === prev);
          const nextIdx = (currentIdx + 1) % STAGES.length;
          soundEngine.playHover();
          return STAGES[nextIdx].id;
        });
      }
    }, interval);

    return () => {
      if (flowTimerRef.current) clearInterval(flowTimerRef.current);
    };
  }, [isPlayingFlow]);

  // GSAP Timeline-based Motion Graphics for Connected Cinematic Flow ('See, Think, Build, Move')
  useEffect(() => {
    if (isReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Create master GSAP timeline driven by ScrollTrigger with power3.out easing throughout
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Header elements sequential entrance with power3.out
      masterTl.fromTo(
        '.puep-reveal-header',
        {
          opacity: 0,
          y: 40,
          filter: 'blur(6px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.12,
        }
      );

      // 2. Baseline Conduit rail illumination
      masterTl.fromTo(
        '.conduit-base-track',
        {
          opacity: 0,
          scaleX: 0,
          transformOrigin: 'left center',
        },
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.25'
      );

      // 3. Connected Cinematic Flow: Choreographing See -> Think -> Build -> Move sequentially
      // --- STAGE 01: SEE (Problem) ---
      masterTl.addLabel('stage_see', '-=0.1');
      masterTl.fromTo(
        '[data-stage-card="see"]',
        {
          opacity: 0,
          y: 55,
          scale: 0.95,
          filter: 'blur(5px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.65,
          ease: 'power3.out',
        },
        'stage_see'
      );
      masterTl.fromTo(
        '[data-node="see"]',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' },
        'stage_see+=0.15'
      );
      masterTl.fromTo(
        '#conduit-seg-0',
        { strokeDashoffset: 260 },
        { strokeDashoffset: 0, duration: 0.55, ease: 'power3.out' },
        'stage_see+=0.25'
      );

      // --- STAGE 02: THINK (Understand) ---
      masterTl.addLabel('stage_think', '-=0.15');
      masterTl.fromTo(
        '[data-stage-card="think"]',
        {
          opacity: 0,
          y: 55,
          scale: 0.95,
          filter: 'blur(5px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.65,
          ease: 'power3.out',
        },
        'stage_think'
      );
      masterTl.fromTo(
        '[data-node="think"]',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' },
        'stage_think+=0.15'
      );
      masterTl.fromTo(
        '#conduit-seg-1',
        { strokeDashoffset: 260 },
        { strokeDashoffset: 0, duration: 0.55, ease: 'power3.out' },
        'stage_think+=0.25'
      );

      // --- STAGE 03: BUILD (Execute) ---
      masterTl.addLabel('stage_build', '-=0.15');
      masterTl.fromTo(
        '[data-stage-card="build"]',
        {
          opacity: 0,
          y: 55,
          scale: 0.95,
          filter: 'blur(5px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.65,
          ease: 'power3.out',
        },
        'stage_build'
      );
      masterTl.fromTo(
        '[data-node="build"]',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' },
        'stage_build+=0.15'
      );
      masterTl.fromTo(
        '#conduit-seg-2',
        { strokeDashoffset: 260 },
        { strokeDashoffset: 0, duration: 0.55, ease: 'power3.out' },
        'stage_build+=0.25'
      );

      // --- STAGE 04: MOVE (Prove) ---
      masterTl.addLabel('stage_move', '-=0.15');
      masterTl.fromTo(
        '[data-stage-card="move"]',
        {
          opacity: 0,
          y: 55,
          scale: 0.95,
          filter: 'blur(5px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.65,
          ease: 'power3.out',
        },
        'stage_move'
      );
      masterTl.fromTo(
        '[data-node="move"]',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' },
        'stage_move+=0.15'
      );
      masterTl.fromTo(
        '.conduit-photon-particle',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out' },
        'stage_move+=0.25'
      );

      // 4. Telemetry Deck sequential entrance
      masterTl.fromTo(
        '.puep-telemetry-deck',
        {
          opacity: 0,
          y: 35,
          scale: 0.98,
          filter: 'blur(4px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.1'
      );

      // 5. Service Architecture Cards Staggered reveal
      const serviceCards = gsap.utils.toArray<HTMLElement>('.service-arch-card', serviceGridRef.current);
      if (serviceCards.length > 0) {
        masterTl.fromTo(
          serviceCards,
          {
            opacity: 0,
            y: 40,
            filter: 'blur(4px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.12,
          },
          '-=0.2'
        );
      }
    }, sectionRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="method-section"
      className="relative py-24 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111] overflow-hidden"
    >
      {/* Background Subtle Tactical Grid Matrix */}
      <div className="absolute inset-0 bg-editorial-grid opacity-25 pointer-events-none" />

      {/* TOP HEADER: AAA Tactical Telemetry + Language Switcher Component */}
      <div className="puep-reveal-header hud-bracket mb-10 p-3.5 sm:p-4 rounded-sm border border-[#2b2722] bg-[#141414]/90 backdrop-blur-md flex items-center justify-between flex-wrap gap-4 relative z-20 shadow-xl">
        {/* Left Telemetry Ticker */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#B65B3C] text-[11px] font-mono font-bold tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>SYS.METHOD // 05</span>
          </div>
          <span className="hidden sm:inline text-[#383838]">|</span>
          <span className="hidden sm:inline text-[11px] font-mono text-[#9B978F]">
            FLOW: <span className="text-[#F2EFE8]">SEE → THINK → BUILD → MOVE</span>
          </span>
          <span className="hidden md:inline px-1.5 py-0.5 text-[9px] font-mono rounded bg-[#1c1a17] text-[#B65B3C] border border-[#B65B3C]/30">
            60FPS TIMELINE
          </span>
        </div>

        {/* Center / Right: Dedicated Language Switcher Component */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#9B978F] uppercase tracking-wider hidden sm:inline mr-1">
            LANGUAGE:
          </span>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main Framework Section Header */}
      <div className="puep-reveal-header max-w-3xl mb-12 relative z-10">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <Terminal className="w-3.5 h-3.5 text-[#B65B3C]" />
          <span>{t.puep.sectionTag}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          {t.puep.title}{' '}
          <span className="text-[#9B978F] block text-2xl sm:text-3xl font-mono font-medium mt-1">
            {t.puep.subtitle}
          </span>
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          {t.puep.description}
        </p>
      </div>

      {/* CONNECTED CONDUIT VISUAL FLOW (GSAP Timeline Animated Energy Highway) */}
      <div className="relative mb-6">
        {/* Desktop Connected Energy Highway (SVG) */}
        <div className="hidden lg:block relative w-full h-12 mb-2 pointer-events-none z-10">
          <svg
            ref={conduitSvgRef}
            className="w-full h-full overflow-visible"
            viewBox="0 0 1000 48"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="conduit-grad-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B65B3C" stopOpacity="0.5" />
                <stop offset="35%" stopColor="#B65B3C" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#D7D0C5" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#B65B3C" stopOpacity="1" />
              </linearGradient>
              <filter id="puep-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base tactical conduit track */}
            <path
              className="conduit-base-track"
              d="M 125 24 L 375 24 L 625 24 L 875 24"
              stroke="#242424"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />

            {/* Segment 0: See -> Think (x: 125 to 375) */}
            <path
              id="conduit-seg-0"
              d="M 125 24 L 375 24"
              stroke="url(#conduit-grad-glow)"
              strokeWidth="2.5"
              strokeDasharray="260"
              strokeDashoffset="0"
              filter="url(#puep-glow)"
              fill="none"
            />

            {/* Segment 1: Think -> Build (x: 375 to 625) */}
            <path
              id="conduit-seg-1"
              d="M 375 24 L 625 24"
              stroke="url(#conduit-grad-glow)"
              strokeWidth="2.5"
              strokeDasharray="260"
              strokeDashoffset="0"
              filter="url(#puep-glow)"
              fill="none"
            />

            {/* Segment 2: Build -> Move (x: 625 to 875) */}
            <path
              id="conduit-seg-2"
              d="M 625 24 L 875 24"
              stroke="url(#conduit-grad-glow)"
              strokeWidth="2.5"
              strokeDasharray="260"
              strokeDashoffset="0"
              filter="url(#puep-glow)"
              fill="none"
            />

            {/* 4 Connected Nodes on the Highway */}
            {STAGES.map((s, idx) => {
              const cx = 125 + idx * 250;
              const isActive = s.id === activeStageId;
              return (
                <g key={s.id} data-node={s.id.toLowerCase()} className="transition-transform duration-300">
                  {/* Outer pulse beacon when active */}
                  {isActive && (
                    <circle
                      cx={cx}
                      cy="24"
                      r="14"
                      fill="none"
                      stroke="#B65B3C"
                      strokeWidth="1.5"
                      className="animate-ping opacity-60"
                    />
                  )}
                  <circle
                    cx={cx}
                    cy="24"
                    r={isActive ? '7' : '5'}
                    fill={isActive ? '#B65B3C' : '#1e1e1e'}
                    stroke={isActive ? '#F2EFE8' : '#383838'}
                    strokeWidth="2"
                    filter={isActive ? 'url(#puep-glow)' : undefined}
                  />
                  {isActive && <circle cx={cx} cy="24" r="2.5" fill="#FFFFFF" />}
                </g>
              );
            })}
          </svg>

          {/* Traveling Photon/Energy Particle along the Conduit */}
          <div
            className="conduit-photon-particle absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#B65B3C] shadow-lg shadow-[#B65B3C] transition-all duration-700 ease-out pointer-events-none"
            style={{
              left: `calc(${12.5 + activeIndex * 25}% - 6px)`,
              boxShadow: '0 0 12px #B65B3C, 0 0 24px #B65B3C',
            }}
          >
            <div className="w-full h-full rounded-full bg-white animate-ping opacity-75" />
          </div>
        </div>

        {/* 4 Connected Framework Stage Cards (SEE, THINK, BUILD, MOVE) */}
        <div
          ref={frameworkGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10"
        >
          {STAGES.map((step, idx) => {
            const Icon = step.icon;
            const isActive = step.id === activeStageId;
            const copy = isHinglish ? step.hinglish : step.english;

            return (
              <button
                key={step.id}
                data-stage-card={step.id.toLowerCase()}
                onClick={() => handleSelectStage(step.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`puep-stage-card hud-bracket group p-6 rounded-sm border text-left cursor-pointer flex flex-col justify-between min-h-[300px] relative transition-all duration-300 ${
                  isActive
                    ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8] shadow-xl shadow-[#B65B3C]/15 ring-1 ring-[#B65B3C]/50'
                    : 'border-[#242424] bg-[#141414] text-[#D7D0C5] hover:border-[#383838] hover:bg-[#181818]'
                }`}
              >
                {/* Active Indicator Top Light Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
                    isActive ? 'bg-[#B65B3C] shadow-[0_0_8px_#B65B3C]' : 'bg-transparent group-hover:bg-[#383838]'
                  }`}
                />

                {/* Top Section */}
                <div>
                  {/* Stage Meta & PUEP Designation */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-7 h-7 rounded-xs text-xs font-mono font-bold flex items-center justify-center border transition-colors ${
                          isActive
                            ? 'bg-[#B65B3C] text-[#F2EFE8] border-[#B65B3C]'
                            : 'bg-[#242424] text-[#F2EFE8] border-[#383838]'
                        }`}
                      >
                        {step.puepLetter}
                      </span>
                      <div>
                        <span className="text-[10px] font-mono text-[#9B978F] block leading-none">
                          STAGE {step.index}
                        </span>
                        <span className="text-[9px] font-mono text-[#9B978F]/70 tracking-tight">
                          PUEP · {step.puepWord}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-xs bg-[#201e1b] text-[#9B978F] border border-[#2b2722]">
                        {copy.badge}
                      </span>
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#B65B3C]' : 'text-[#9B978F] group-hover:text-[#F2EFE8]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Stage Name: SEE, THINK, BUILD, MOVE */}
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-black font-display tracking-tight text-[#F2EFE8]">
                      {copy.title}
                    </h3>
                    <span className="text-xs font-mono text-[#9B978F]">({step.puepWord})</span>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs font-mono text-[#B65B3C] mt-1.5 font-semibold leading-snug">
                    {copy.tagline}
                  </p>
                </div>

                {/* Body Details */}
                <div className="my-4">
                  <p className="text-xs text-[#9B978F] leading-relaxed line-clamp-3">
                    {copy.detail}
                  </p>
                </div>

                {/* Bottom Vector Coordinate & Flow Anchor */}
                <div className="pt-3 border-t border-[#242424]/80 flex items-center justify-between text-[10px] font-mono text-[#9B978F]">
                  <span className="flex items-center gap-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-[#B65B3C] animate-pulse' : 'bg-[#404040]'
                      }`}
                    />
                    <span>{step.vector}</span>
                  </span>
                  <span className={isActive ? 'text-[#B65B3C] font-bold' : ''}>
                    {isActive ? (isHinglish ? '● ACTIVE FLOW' : '● ACTIVE PROTOCOL') : `LINK 0${idx + 1}`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE FLOW CONTROLS & DEEP-DIVE TELEMETRY DECK (AAA Game HUD) */}
      <div
        ref={activeDetailRef}
        className="puep-telemetry-deck hud-bracket p-5 sm:p-6 mb-20 rounded-sm border border-[#2e2a24] bg-[#141414]/95 shadow-2xl relative"
      >
        {/* Top Control Bar: Autoplay Flow + Stage Step Navigation */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 mb-5 border-b border-[#242424]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-xs text-[10px] font-mono font-bold bg-[#B65B3C]/20 text-[#B65B3C] border border-[#B65B3C]/40 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[#B65B3C]" />
              <span>
                {isHinglish
                  ? `STAGE · 0${activeIndex + 1} // ${currentStage.hinglish.title.toUpperCase()} PROTOCOL`
                  : `STAGE · 0${activeIndex + 1} // ${currentStage.english.title.toUpperCase()} PROTOCOL`}
              </span>
            </span>

            {/* Audio frequency visualizer bars */}
            <div className="hidden sm:flex items-center gap-0.5 h-3.5 px-2">
              <span className="w-1 bg-[#B65B3C] rounded-none animate-pulse h-3" />
              <span className="w-1 bg-[#B65B3C]/70 rounded-none animate-pulse h-2" />
              <span className="w-1 bg-[#B65B3C] rounded-none animate-pulse h-4" />
              <span className="w-1 bg-[#B65B3C]/60 rounded-none animate-pulse h-1.5" />
              <span className="w-1 bg-[#B65B3C] rounded-none animate-pulse h-3.5" />
            </div>

            <span className="text-[11px] font-mono text-[#9B978F] hidden md:inline">
              {currentStage.coord}
            </span>
          </div>

          {/* Flow Sequencer Controls */}
          <div className="flex items-center gap-2">
            {/* Auto-Flow Toggle */}
            <button
              onClick={() => {
                soundEngine.playClick();
                setIsPlayingFlow((p) => !p);
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-xs border cursor-pointer flex items-center gap-1.5 transition-colors ${
                isPlayingFlow
                  ? 'border-[#B65B3C] bg-[#B65B3C]/20 text-[#F2EFE8]'
                  : 'border-[#383838] bg-[#1a1a1a] text-[#9B978F] hover:text-[#F2EFE8]'
              }`}
              title={isPlayingFlow ? 'Pause automated flow' : 'Play automated connected flow'}
            >
              {isPlayingFlow ? <Pause className="w-3 h-3 text-[#B65B3C]" /> : <Play className="w-3 h-3" />}
              <span>{isPlayingFlow ? t.puep.autorunPause : t.puep.autorunPlay}</span>
            </button>

            {/* Prev Stage */}
            <button
              onClick={handlePrevStage}
              onMouseEnter={() => soundEngine.playHover()}
              className="p-1.5 rounded-xs border border-[#383838] bg-[#1a1a1a] text-[#9B978F] hover:text-[#F2EFE8] cursor-pointer"
              title="Previous stage"
              aria-label="Previous stage"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Next Stage */}
            <button
              onClick={handleNextStage}
              onMouseEnter={() => soundEngine.playHover()}
              className="p-1.5 rounded-xs border border-[#383838] bg-[#1a1a1a] text-[#9B978F] hover:text-[#F2EFE8] cursor-pointer"
              title="Next stage"
              aria-label="Next stage"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Flow Progress bar when Auto-Play is running */}
        {isPlayingFlow && (
          <div className="w-full bg-[#202020] h-1 mb-4 rounded-full overflow-hidden">
            <div
              className="bg-[#B65B3C] h-full transition-all duration-75 ease-linear"
              style={{ width: `${flowProgress}%` }}
            />
          </div>
        )}

        {/* Telemetry Inspection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Col 1: Strategic Focus Core */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#B65B3C] uppercase tracking-wider block">
              // 01. MANDATORY FOCUS POINT
            </span>
            <p className="text-sm text-[#F2EFE8] font-medium leading-relaxed">
              {stageCopy.focusPoint}
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-mono text-[#9B978F] block">
                {stageCopy.metrics}
              </span>
            </div>
          </div>

          {/* Col 2: Tactical Deliverables Verified */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#9B978F] uppercase tracking-wider block">
              {isHinglish ? '// 02. PRODUCED DELIVERABLES' : '// 02. VERIFIED DELIVERABLES'}
            </span>
            <div className="space-y-1.5">
              {stageCopy.deliverables.map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-[#D7D0C5] font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B65B3C] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Next Flow Propagator Button */}
          <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#242424] md:pl-6 pt-4 md:pt-0">
            <div>
              <span className="text-[10px] font-mono text-[#9B978F] uppercase tracking-wider block mb-1">
                // 03. PIPELINE PROPAGATION
              </span>
              <p className="text-xs text-[#9B978F] leading-relaxed">
                {isHinglish
                  ? `Ye stage output seamlessly agle stage (${
                      STAGES[(activeIndex + 1) % STAGES.length].hinglish.title
                    }) mein feed karta hai.`
                  : `This stage data seamlessly seeds the next discipline (${
                      STAGES[(activeIndex + 1) % STAGES.length].english.title
                    }).`}
              </p>
            </div>

            <button
              onClick={handleNextStage}
              onMouseEnter={() => soundEngine.playHover()}
              className="mt-4 px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase text-[#111111] bg-[#F2EFE8] hover:bg-[#B65B3C] hover:text-[#F2EFE8] transition-all rounded-xs cursor-pointer flex items-center justify-between gap-2 shadow-lg shadow-[#B65B3C]/10"
            >
              <span>
                {isHinglish
                  ? `ADVANCE TO ${STAGES[(activeIndex + 1) % STAGES.length].hinglish.title.toUpperCase()}`
                  : `ADVANCE TO ${STAGES[(activeIndex + 1) % STAGES.length].english.title.toUpperCase()}`}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Part 2: Service Architecture with Full Language Capability */}
      <div className="pt-12 border-t border-[#242424] relative z-10">
        <div className="puep-reveal-header max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#9B978F] uppercase mb-2">
            <Crosshair className="w-3.5 h-3.5 text-[#B65B3C]" />
            <span>{t.puep.capabilitiesTag}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#F2EFE8]">
            {t.puep.capabilitiesTitle}
          </h3>
          <p className="text-xs sm:text-sm text-[#9B978F] mt-1">
            {t.puep.capabilitiesSub}
          </p>
        </div>

        <div ref={serviceGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICE_GROUPS.map((grp) => {
            const Icon = grp.icon;
            const copy = isHinglish ? grp.hinglish : grp.english;

            return (
              <div
                key={grp.category}
                className="service-arch-card hud-bracket-stone p-6 rounded-sm border border-[#242424] bg-[#141414] hover:border-[#383838] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-[#B65B3C]" />
                    <div>
                      <h4 className="text-lg font-bold font-display text-[#F2EFE8]">
                        {grp.category}
                      </h4>
                      <span className="text-[9px] font-mono text-[#9B978F] block">
                        {grp.sub}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#9B978F] mb-6 leading-relaxed">
                    {copy.lead}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#242424]/60 space-y-2">
                  {copy.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-[#D7D0C5] font-mono">
                      <span className="w-1.5 h-1.5 rounded-none bg-[#B65B3C]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
