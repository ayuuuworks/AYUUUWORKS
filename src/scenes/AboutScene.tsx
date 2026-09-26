import React from 'react';
import { Compass, Code2, Layers, MapPin, ArrowRight } from 'lucide-react';

export const AboutScene: React.FC = () => {
  return (
    <section id="about-section" className="relative py-28 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111]">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <span>FOUNDER & STUDIO · 10</span>
          <span>·</span>
          <span>EDITORIAL FUTURE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          ABOUT AYUUWORKS.
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          We combine strategy, design, technology, content and digital execution for businesses that refuse to look ordinary.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Founder Section (Section 27 exact specification) */}
        <div className="lg:col-span-6 p-8 md:p-10 rounded border border-[#242424] bg-[#141414] space-y-6">
          <div className="border-b border-[#242424] pb-4">
            <span className="text-xs font-mono uppercase text-[#B65B3C] tracking-widest font-bold">
              STUDIO FOUNDER
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold font-display text-[#F2EFE8] mt-1">
              AYUSH MISHRA
            </h3>
            <p className="text-xs font-mono text-[#D7D0C5] mt-1">
              Founder / Creative Technologist
            </p>
          </div>

          {/* Section 27 Core Quote */}
          <blockquote className="text-lg sm:text-xl font-display font-medium text-[#F2EFE8] italic leading-relaxed border-l-2 border-[#B65B3C] pl-4 my-4">
            "I work where strategy, design, technology and storytelling meet."
          </blockquote>

          <div className="space-y-4 text-xs sm:text-sm text-[#D7D0C5] leading-relaxed">
            <p>
              "Most businesses suffer from a translation gap: world-class physical craftsmanship, hospitality or service, crippled by second-tier digital representation."
            </p>
            <p className="text-[#9B978F]">
              "AyuuWorks was created to solve that gap. We help clients clarify their positioning, build bespoke digital flagships, and engineer systems that make their business easier to notice, understand, and remember."
            </p>
          </div>

          <div className="pt-4 border-t border-[#242424] flex items-center justify-between text-xs text-[#9B978F] font-mono">
            <span>INDEPENDENT STUDIO</span>
            <span>LUCKNOW · VARANASI · NCR</span>
          </div>
        </div>

        {/* Studio Tenets / Principles */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded border border-[#242424] bg-[#141414] space-y-2">
            <span className="text-[10px] font-mono text-[#B65B3C] uppercase">01 / RESTRAINT OVER NOISE</span>
            <h4 className="text-base font-bold text-[#F2EFE8]">
              Design That Commands Silent Authority
            </h4>
            <p className="text-xs text-[#9B978F] leading-relaxed">
              We avoid flashy gimmicks, bloated templates, and trend-chasing. Premium perception is achieved through architectural composition, typographic discipline, and generous whitespace.
            </p>
          </div>

          <div className="p-6 rounded border border-[#242424] bg-[#141414] space-y-2">
            <span className="text-[10px] font-mono text-[#B65B3C] uppercase">02 / STRATEGY BEFORE CODE</span>
            <h4 className="text-base font-bold text-[#F2EFE8]">
              Technology Serving Commercial Clarity
            </h4>
            <p className="text-xs text-[#9B978F] leading-relaxed">
              We never write a line of code or design a screen until we understand who the buyer is, what they need to believe, and where attention currently leaks.
            </p>
          </div>

          <div className="p-6 rounded border border-[#242424] bg-[#141414] space-y-2">
            <span className="text-[10px] font-mono text-[#B65B3C] uppercase">03 / END-TO-END EXECUTION</span>
            <h4 className="text-base font-bold text-[#F2EFE8]">
              One Unified Creative Brain
            </h4>
            <p className="text-xs text-[#9B978F] leading-relaxed">
              Instead of juggling disconnected ad agencies, freelance web developers, and social media managers, AyuuWorks integrates brand, code, motion, and conversion into a singular business engine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
