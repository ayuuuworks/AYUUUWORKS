/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AWEProvider, useAWE } from './awe/context';
import { Navigation } from './components/Navigation';
import { OpeningScene } from './scenes/OpeningScene';
import { CuriosityScene } from './scenes/CuriosityScene';
import { DiagnosticScene } from './scenes/DiagnosticScene';
import { BusinessEngineScene } from './scenes/BusinessEngineScene';
import { PUEPFrameworkScene } from './scenes/PUEPFrameworkScene';
import { StrategicContrastsScene } from './scenes/StrategicContrastsScene';
import { ProjectWorldsScene } from './scenes/ProjectWorldsScene';
import { LiveDemoLabScene } from './scenes/LiveDemoLabScene';
import { MirrorMomentScene } from './scenes/MirrorMomentScene';
import { JourneySummaryScene } from './scenes/JourneySummaryScene';
import { EnquiryExperienceScene } from './scenes/EnquiryExperienceScene';
import { AboutScene } from './scenes/AboutScene';
import { Footer } from './components/Footer';
import { ChallengeModal } from './components/ChallengeModal';
import { ProjectModal } from './components/ProjectModal';
import { Terminal, Crosshair, Radio } from 'lucide-react';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

function MainExperience() {
  const mainRef = useRef<HTMLElement>(null);
  const { isReducedMotion } = useAWE();

  useEffect(() => {
    if (!mainRef.current || isReducedMotion) return;

    // Use GSAP context for safe cleanup in React StrictMode
    const ctx = gsap.context(() => {
      // 1. Section-level entrance animations
      const sections = gsap.utils.toArray<HTMLElement>('.gsap-scene-section');

      sections.forEach((section) => {
        const targets = section.querySelectorAll('.gsap-reveal-target');
        const animatedElements = targets.length > 0 ? targets : [section];

        gsap.fromTo(
          animatedElements,
          {
            opacity: 0,
            y: 35,
            filter: 'blur(3px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.0,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 2. Parallax Layer 01: 3D background elements
      const bg3dLayers = gsap.utils.toArray<HTMLElement>(
        '#opening-scene canvas, #business-engine canvas'
      );
      bg3dLayers.forEach((layer) => {
        const parentSection = layer.closest('section') || layer.parentElement;
        if (!parentSection) return;

        gsap.fromTo(
          layer,
          { yPercent: -6 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: parentSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      });

      // 3. Parallax Layer 02: Editorial headers
      const midgroundHeaders = gsap.utils.toArray<HTMLElement>(
        '.gsap-scene-section h2, .gsap-scene-section h1'
      );
      midgroundHeaders.forEach((el) => {
        const parentSection = el.closest('section') || el.parentElement;
        if (!parentSection) return;

        gsap.fromTo(
          el,
          { y: 12 },
          {
            y: -16,
            ease: 'none',
            scrollTrigger: {
              trigger: parentSection,
              start: 'top 85%',
              end: 'bottom 15%',
              scrub: 1.0,
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <main ref={mainRef} className="flex-1 w-full overflow-x-hidden">
      {/* 01. HERO: Opening Statement & Three Entry Paths */}
      <section className="gsap-scene-section relative">
        <OpeningScene />
      </section>

      {/* 02. CURIOSITY: Utility-Driven Perspective Questions */}
      <section className="gsap-scene-section relative">
        <CuriosityScene />
      </section>

      {/* 03. EXPLORER: 30-60s Business Explorer (Fast Mode & Deep Mode) */}
      <section className="gsap-scene-section relative">
        <DiagnosticScene />
      </section>

      {/* 04. ENGINE: Attention → Perception → Trust → Action */}
      <section className="gsap-scene-section relative">
        <BusinessEngineScene />
      </section>

      {/* 05. METHOD: See, Think, Build, Move + Service Architecture (PUEP) */}
      <section className="gsap-scene-section relative">
        <PUEPFrameworkScene />
      </section>

      {/* 06. INSIGHT: The Strategic Reality & Contrasts */}
      <section className="gsap-scene-section relative">
        <StrategicContrastsScene />
      </section>

      {/* 07. PROOF: Selected Editorial Commissions & Case Studies */}
      <section className="gsap-scene-section relative">
        <ProjectWorldsScene />
      </section>

      {/* 08. INTERACTION: Live Demo Lab ("Don't Just Look. Try It.") */}
      <section className="gsap-scene-section relative">
        <LiveDemoLabScene />
      </section>

      {/* 09. MIRROR: The Mirror Moment */}
      <section className="gsap-scene-section relative">
        <MirrorMomentScene />
      </section>

      {/* 10. SUMMARY: Your AyuuWorks Journey Session Footprint */}
      <section className="gsap-scene-section relative">
        <JourneySummaryScene />
      </section>

      {/* 11. ACTION: Commission Brief ("What Should Your Business Become Next?") */}
      <section className="gsap-scene-section relative">
        <EnquiryExperienceScene />
      </section>

      {/* 12. FOUNDER: Ayush Mishra & Studio Principles */}
      <section className="gsap-scene-section relative">
        <AboutScene />
      </section>
    </main>
  );
}

export default function App() {
  return (
    <AWEProvider>
      <div className="min-h-screen bg-[#111111] text-[#F2EFE8] flex flex-col font-sans selection:bg-[#B65B3C] selection:text-[#F2EFE8] relative">
        {/* Subtle AAA Game Scanline Overlay */}
        <div className="scanlines-overlay fixed inset-0 z-30 pointer-events-none opacity-20" />

        {/* Tactical Viewport Corner Brackets (AAA Game HUD) */}
        <div className="fixed top-20 left-4 z-40 pointer-events-none hidden xl:flex flex-col gap-1 text-[9px] font-mono text-[#9B978F]/60">
          <div className="flex items-center gap-1.5 text-[#B65B3C]">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            <span>SYS.AWE // ONLINE</span>
          </div>
          <span>GRID: TACTICAL_60FPS</span>
        </div>

        <div className="fixed top-20 right-4 z-40 pointer-events-none hidden xl:flex flex-col items-end gap-1 text-[9px] font-mono text-[#9B978F]/60">
          <span>AUDIO ENGINE: READY</span>
          <span className="text-[#B65B3C]">DISCIPLINE: AAA_MOTION</span>
        </div>

        {/* Editorial Navigation */}
        <Navigation />

        {/* Animated Main Content */}
        <MainExperience />

        {/* Minimal Studio Footer */}
        <Footer />

        {/* Overlays */}
        <ChallengeModal />
        <ProjectModal />
      </div>
    </AWEProvider>
  );
}
