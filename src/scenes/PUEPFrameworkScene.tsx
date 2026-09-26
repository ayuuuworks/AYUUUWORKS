import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAWE } from '../awe/context';
import { Compass, Lightbulb, Code2, Rocket, Layers, Camera, TrendingUp, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FrameworkStep {
  id: 'Problem' | 'Understand' | 'Execute' | 'Prove';
  letter: 'P' | 'U' | 'E';
  index: string;
  title: string;
  tagline: string;
  detail: string;
  focusPoint: string;
  icon: typeof Compass;
}

const FRAMEWORK_STEPS: FrameworkStep[] = [
  {
    id: 'Problem',
    letter: 'P',
    index: '01',
    title: 'Problem',
    tagline: 'Observe the friction & reality gap.',
    detail: 'We audit how your business truly operates: the craft, the founder conviction, and where customer perception breaks down on screen.',
    focusPoint: 'Uncovering the silent bottlenecks before touching design or code.',
    icon: Compass,
  },
  {
    id: 'Understand',
    letter: 'U',
    index: '02',
    title: 'Understand',
    tagline: 'Find the strategic leverage.',
    detail: 'We diagnose the market positioning, clarify the core value proposition, and define the distinct narrative that makes you impossible to ignore.',
    focusPoint: 'Architecting the strategic truth that commands premium authority.',
    icon: Lightbulb,
  },
  {
    id: 'Execute',
    letter: 'E',
    index: '03',
    title: 'Execute',
    tagline: 'Engineer the digital flagship.',
    detail: 'We build bespoke digital experiences, tactile design systems, cinematic visual production, and high-performance commercial interfaces.',
    focusPoint: 'Zero generic templates, flawless responsiveness, and tactile interactions.',
    icon: Code2,
  },
  {
    id: 'Prove',
    letter: 'P',
    index: '04',
    title: 'Prove',
    tagline: 'Demonstrate commercial impact.',
    detail: 'We deploy the experience into high-intent customer touchpoints: editorial campaigns, acquisition systems, and repeatable growth pathways.',
    focusPoint: 'Verifiable commercial results, elevated enquiries, and enduring memory.',
    icon: Rocket,
  },
];

const SERVICE_GROUPS = [
  {
    category: 'BUILD',
    icon: Code2,
    lead: 'Digital experiences engineered for performance and memory.',
    items: ['Websites', 'Digital experiences', 'Web development'],
  },
  {
    category: 'CREATE',
    icon: Layers,
    lead: 'Visual identities that command silent respect.',
    items: ['Brand identity', 'Graphic design', 'Campaigns', 'Catalogues'],
  },
  {
    category: 'CAPTURE',
    icon: Camera,
    lead: 'Atmospheric visual production capturing authentic craft.',
    items: ['Cinematic video', 'Photography', 'Editing', 'Motion'],
  },
  {
    category: 'GROW',
    icon: TrendingUp,
    lead: 'Editorial distribution systems built for customer acquisition.',
    items: ['Social media', 'Creative strategy', 'Meta advertising', 'Content systems'],
  },
];

export const PUEPFrameworkScene: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<'Problem' | 'Understand' | 'Execute' | 'Prove'>('Problem');
  const { trackEvent, isReducedMotion } = useAWE();

  const sectionRef = useRef<HTMLElement>(null);
  const frameworkGridRef = useRef<HTMLDivElement>(null);
  const serviceGridRef = useRef<HTMLDivElement>(null);

  const activeStep = FRAMEWORK_STEPS.find((s) => s.id === activeStepId) || FRAMEWORK_STEPS[0];

  const handleSelectStep = (id: 'Problem' | 'Understand' | 'Execute' | 'Prove') => {
    setActiveStepId(id);
    trackEvent('service_explored', { method_step: id });
  };

  useEffect(() => {
    if (isReducedMotion || !sectionRef.current) return;

    // Use GSAP context for safe cleanup in React StrictMode
    const ctx = gsap.context(() => {
      // 1. Staggered reveal for the four framework cards (Problem, Understand, Execute, Prove)
      const frameworkCards = gsap.utils.toArray<HTMLElement>('.puep-framework-card', frameworkGridRef.current);
      if (frameworkCards.length > 0) {
        gsap.fromTo(
          frameworkCards,
          {
            opacity: 0,
            y: 50,
            scale: 0.96,
            filter: 'blur(4px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.95,
            ease: 'power3.out',
            stagger: 0.14,
            scrollTrigger: {
              trigger: frameworkGridRef.current,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Staggered reveal for Service Architecture Cards
      const serviceCards = gsap.utils.toArray<HTMLElement>('.service-arch-card', serviceGridRef.current);
      if (serviceCards.length > 0) {
        gsap.fromTo(
          serviceCards,
          {
            opacity: 0,
            y: 45,
            scale: 0.97,
            filter: 'blur(4px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.95,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: serviceGridRef.current,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
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
      className="relative py-24 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111]"
    >
      {/* Editorial Header */}
      <div className="max-w-3xl mb-12 gsap-reveal-target">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <span>FRAMEWORK · 05</span>
          <span>·</span>
          <span>THE PUEP METHODOLOGY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          THE PUEP FRAMEWORK.
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          Strategy without execution is just talk. Execution without strategy is expensive noise. We link both into a disciplined four-stage method: Problem, Understand, Execute, Prove.
        </p>
      </div>

      {/* Part 1: Connected 4-Stage PUEP Framework Cards */}
      <div ref={frameworkGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {FRAMEWORK_STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = step.id === activeStepId;
          return (
            <button
              key={step.id}
              data-framework-card={step.id.toLowerCase()}
              onClick={() => handleSelectStep(step.id)}
              className={`puep-framework-card p-6 rounded border text-left cursor-pointer flex flex-col justify-between h-60 relative transition-[border-color,background-color,box-shadow] duration-200 ${
                isActive
                  ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8] shadow-lg shadow-[#B65B3C]/5'
                  : 'border-[#242424] bg-[#141414] text-[#D7D0C5] hover:border-[#383838] hover:bg-[#181818]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#242424] text-[#F2EFE8] text-[10px] font-mono font-bold flex items-center justify-center border border-[#383838]">
                      {step.letter}
                    </span>
                    <span className="text-[10px] font-mono text-[#9B978F]">{step.index} / STAGE</span>
                  </div>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#B65B3C]' : 'text-[#9B978F]'}`} />
                </div>
                <h3 className="text-xl font-black font-display tracking-tight text-[#F2EFE8]">
                  {step.title}
                </h3>
                <p className="text-xs font-mono text-[#B65B3C] mt-1">
                  {step.tagline}
                </p>
              </div>

              <p className="text-xs text-[#9B978F] leading-relaxed line-clamp-3">
                {step.detail}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Stage Callout */}
      <div className="p-4 mb-20 rounded border border-[#242424] bg-[#141414]/60 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#B65B3C]/20 text-[#B65B3C] border border-[#B65B3C]/30">
            ACTIVE STAGE · {activeStep.letter} / {activeStep.title.toUpperCase()}
          </span>
          <span className="text-xs text-[#D7D0C5]">
            {activeStep.focusPoint}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#9B978F]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#B65B3C]" />
          <span>Sequential progression</span>
        </div>
      </div>

      {/* Part 2: Service Architecture (Section 25) */}
      <div className="pt-12 border-t border-[#242424]">
        <div className="max-w-3xl mb-10 gsap-reveal-target">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#9B978F] uppercase mb-2">
            <span>CAPABILITIES</span>
            <span>·</span>
            <span>DISCIPLINED EXECUTION</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#F2EFE8]">
            SERVICE ARCHITECTURE.
          </h3>
          <p className="text-xs sm:text-sm text-[#9B978F] mt-1">
            Capabilities that support the strategic positioning, organized into four clean disciplines.
          </p>
        </div>

        <div ref={serviceGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICE_GROUPS.map((grp) => {
            const Icon = grp.icon;
            return (
              <div
                key={grp.category}
                className="service-arch-card p-6 rounded border border-[#242424] bg-[#141414] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-[#B65B3C]" />
                    <h4 className="text-lg font-bold font-display text-[#F2EFE8]">
                      {grp.category}
                    </h4>
                  </div>
                  <p className="text-xs text-[#9B978F] mb-6 leading-relaxed">
                    {grp.lead}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#242424]/60 space-y-2">
                  {grp.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-[#D7D0C5]">
                      <span className="w-1 h-1 rounded-full bg-[#B65B3C]"></span>
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
