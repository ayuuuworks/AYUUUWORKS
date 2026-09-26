import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { ArrowRight, ChevronRight, HelpCircle } from 'lucide-react';

interface CuriosityCard {
  id: string;
  question: string;
  subtext: string;
  insight: string;
  system: 'ATTENTION' | 'PERCEPTION' | 'TRUST' | 'ACTION';
}

const CURIOSITY_QUESTIONS: CuriosityCard[] = [
  {
    id: 'seeing',
    question: 'WHAT ARE PEOPLE ACTUALLY SEEING?',
    subtext: 'Your business has craftsmanship, heritage and dedication. But what reaches the screen?',
    insight: 'Most businesses suffer from a translation loss: a 10/10 physical operation that looks like a 3/10 template online. When digital touchpoints look generic, customers assume the service is generic too.',
    system: 'PERCEPTION',
  },
  {
    id: 'remembered',
    question: 'WHY DO SOME BUSINESSES GET REMEMBERED?',
    subtext: 'While dozens of competitors spend on ads, only one or two stay in customer conversations.',
    insight: 'Memory is built on distinctiveness and emotional clarity, not ad frequency. Businesses that take a definitive editorial stance become landmarks; those that try to appeal to everyone become invisible wallpaper.',
    system: 'ATTENTION',
  },
  {
    id: 'beautiful-fail',
    question: 'WHY CAN A BEAUTIFUL WEBSITE STILL FAIL?',
    subtext: 'High visual aesthetics with near-zero business impact.',
    insight: 'A website can have stunning animations and awards, but if the visitor cannot immediately understand what you do, who it is for, and why they should believe you within 5 seconds, they leave without taking action.',
    system: 'ACTION',
  },
  {
    id: 'attention-disappear',
    question: 'WHERE DOES ATTENTION DISAPPEAR?',
    subtext: 'You get 1,000 visitors to your profile or page, but only 2 enquiries.',
    insight: 'Attention leaks at the joints: the gap between an ad and the landing page, the friction of an impersonal lead form, or the absence of transparent trust signals. We map this friction as a continuous business engine.',
    system: 'ACTION',
  },
  {
    id: 'before-choosing',
    question: 'WHAT HAPPENS BEFORE SOMEONE CHOOSES YOU?',
    subtext: 'The quiet internal dialogue a prospective client has before making contact.',
    insight: 'Before asking "How much does it cost?", clients ask: "Are they safe? Will they understand my standard? Have they solved this before?" Trust must be established before conversion can occur.',
    system: 'TRUST',
  },
  {
    id: 'fix-first',
    question: 'WHAT WOULD YOU FIX FIRST?',
    subtext: 'More ads? A new logo? A social agency? Or the core positioning?',
    insight: 'Most owners fix the loudest symptom (e.g. running more Meta ads) instead of the foundational bottleneck (unclear positioning or unrefined touchpoints). Fixing the foundation multiplies every future rupee spent.',
    system: 'PERCEPTION',
  },
];

export const CuriosityScene: React.FC = () => {
  const { trackEvent, isReducedMotion } = useAWE();
  const [activeQuestion, setActiveQuestion] = useState<string>(CURIOSITY_QUESTIONS[0].id);

  const selected = CURIOSITY_QUESTIONS.find((q) => q.id === activeQuestion) || CURIOSITY_QUESTIONS[0];

  const handleSelect = (id: string, q: string) => {
    setActiveQuestion(id);
    trackEvent('question_answered', { questionId: id, question: q });
  };

  const jumpToExplorer = () => {
    trackEvent('cta_clicked', { target: 'curiosity_to_explorer' });
    const el = document.getElementById('business-explorer');
    if (el) {
      el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section id="curiosity-section" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111]">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <span>PERSPECTIVE · 02</span>
          <span>·</span>
          <span>CURIOSITY WITH UTILITY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          QUESTIONS THAT REVEAL THE BOTTLENECK.
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          Curiosity is the beginning of strategy. Select a question to see how AyuuWorks examines digital business problems.
        </p>
      </div>

      {/* Interactive Two-Column Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Questions List */}
        <div className="lg:col-span-7 space-y-3">
          {CURIOSITY_QUESTIONS.map((item) => {
            const isActive = item.id === activeQuestion;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id, item.question)}
                className={`w-full text-left p-5 rounded border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                  isActive
                    ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8] shadow-sm'
                    : 'border-[#242424] bg-[#141414] text-[#D7D0C5] hover:border-[#383838] hover:text-[#F2EFE8]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#B65B3C]">
                      [{item.system}]
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-display tracking-tight">
                    {item.question}
                  </h3>
                  <p className="text-xs text-[#9B978F] mt-1 leading-snug">
                    {item.subtext}
                  </p>
                </div>

                <div className={`mt-1 transition-transform ${isActive ? 'text-[#B65B3C] translate-x-1' : 'text-[#9B978F]'}`}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Strategic Insight Panel */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="p-6 md:p-8 rounded border border-[#242424] bg-[#161616] space-y-6">
            <div className="flex items-center justify-between border-b border-[#242424] pb-4">
              <span className="text-xs font-mono uppercase text-[#B65B3C] tracking-widest">
                THE STUDIO PERSPECTIVE
              </span>
              <span className="text-xs font-mono text-[#9B978F]">
                SYSTEM / {selected.system}
              </span>
            </div>

            <div>
              <h4 className="text-xl font-bold font-display text-[#F2EFE8] leading-snug">
                {selected.question}
              </h4>
              <p className="text-sm text-[#D7D0C5] mt-4 leading-relaxed font-sans">
                {selected.insight}
              </p>
            </div>

            <div className="pt-4 border-t border-[#242424]">
              <p className="text-xs text-[#9B978F] mb-3">
                How does this apply to your own business situation?
              </p>
              <button
                onClick={jumpToExplorer}
                className="w-full py-3 px-4 rounded bg-[#F2EFE8] hover:bg-[#B65B3C] text-[#111111] hover:text-[#F2EFE8] font-display font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>EXPLORE YOUR BUSINESS OPPORTUNITY</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
