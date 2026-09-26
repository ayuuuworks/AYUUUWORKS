import React from 'react';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { OpeningScene } from '../scenes/OpeningScene';

const services = [
  ['BUILD', 'Digital experiences, websites and interactive interfaces.'],
  ['CREATE', 'Graphic design, campaigns, catalogues and brand systems.'],
  ['CAPTURE', 'Cinematic production, photography, editing and motion.'],
  ['GROW', 'Instagram management, creative strategy and Meta advertising.'],
];

const process = [
  ['01', 'SEE', 'Understand the business, audience and opportunity.'],
  ['02', 'THINK', 'Find the clearest idea worth building around.'],
  ['03', 'BUILD', 'Turn the idea into design, content and digital experiences.'],
  ['04', 'MOVE', 'Launch, learn and keep improving what people see.'],
];

export const HomePage: React.FC = () => {
  return (
    <main className="bg-[#111111] text-[#F2EFE8]">
      <section className="relative min-h-screen overflow-hidden">
        <OpeningScene />
        <div className="absolute inset-x-0 bottom-10 z-10 px-6 pointer-events-none">
          <div className="mx-auto max-w-7xl flex items-end justify-between gap-8">
            <p className="max-w-sm text-sm leading-relaxed text-[#9B978F]">
              We make businesses easier to notice, understand and remember.
            </p>
            <a
              href="#what-we-do"
              className="pointer-events-auto hidden sm:inline-flex items-center gap-2 border border-[#3a3732] px-4 py-3 text-xs uppercase tracking-[0.18em] hover:border-[#B65B3C] hover:text-[#B65B3C] transition-colors"
            >
              Explore <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <section id="what-we-do" className="border-t border-[#242424] px-6 py-28">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#B65B3C]">01 / WHAT WE DO</p>
          </div>
          <div className="lg:col-span-8">
            <h1 className="font-display text-4xl sm:text-6xl leading-[0.98] tracking-[-0.04em] max-w-4xl">
              GOOD BUSINESS DESERVES TO BE SEEN.
            </h1>
            <p className="mt-8 max-w-2xl text-base sm:text-lg text-[#9B978F] leading-relaxed">
              AyuuWorks brings strategy, design, technology, content and growth together under one creative system.
              The goal is simple: make the right thing easier for the right people to notice and remember.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#242424] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-8 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#B65B3C]">02 / SELECTED WORK</p>
              <h2 className="font-display text-3xl sm:text-5xl mt-3 tracking-[-0.035em]">WORK WITH A REASON.</h2>
            </div>
            <a href="#work" className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#9B978F] hover:text-[#F2EFE8]">
              View work <ArrowUpRight size={14} />
            </a>
          </div>

          <div id="work" className="grid md:grid-cols-3 gap-px bg-[#242424] border border-[#242424]">
            {[
              ['DIGITAL', 'Websites & digital experiences', 'Selected projects will be presented here with context, execution and proof.'],
              ['CAMPAIGN', 'Creative & visual systems', 'Campaigns, social creatives and catalogue work shown as working systems, not image dumps.'],
              ['CINEMATIC', 'Film, motion & content', 'Production work focused on storytelling, pacing, visual direction and editing.'],
            ].map(([label, title, text]) => (
              <article key={label} className="bg-[#111111] min-h-72 p-7 sm:p-9 flex flex-col justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#B65B3C]">{label}</span>
                <div>
                  <h3 className="font-display text-2xl tracking-[-0.025em]">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#9B978F]">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#242424] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B65B3C]">03 / SERVICES</p>
          <div className="mt-10 divide-y divide-[#242424] border-y border-[#242424]">
            {services.map(([name, description], index) => (
              <div key={name} className="grid md:grid-cols-12 gap-6 py-7">
                <span className="md:col-span-2 text-xs text-[#9B978F]">0{index + 1}</span>
                <h3 className="md:col-span-3 font-display text-2xl">{name}</h3>
                <p className="md:col-span-7 text-sm text-[#9B978F] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#242424] px-6 py-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#B65B3C]">04 / PROCESS</p>
            <h2 className="font-display text-3xl sm:text-5xl mt-4 tracking-[-0.035em]">SEE → THINK → BUILD → MOVE.</h2>
          </div>
          <div className="lg:col-span-8 divide-y divide-[#242424] border-y border-[#242424]">
            {process.map(([number, title, description]) => (
              <div key={number} className="grid grid-cols-[48px_110px_1fr] gap-4 py-6 items-start">
                <span className="text-xs text-[#9B978F]">{number}</span>
                <strong className="font-display tracking-wide">{title}</strong>
                <p className="text-sm text-[#9B978F] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#242424] px-6 py-32">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#B65B3C]">05 / NEXT</p>
            <h2 className="font-display text-5xl sm:text-7xl leading-[0.92] tracking-[-0.05em] mt-4">
              WHAT SHOULD YOUR BUSINESS BECOME NEXT?
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-stretch">
            <a href="/start-a-project" className="inline-flex justify-between items-center bg-[#F2EFE8] text-[#111111] px-5 py-4 text-xs uppercase tracking-[0.16em] hover:bg-[#B65B3C] hover:text-[#F2EFE8] transition-colors">
              Start a project <ArrowUpRight size={16} />
            </a>
            <a href="/work" className="inline-flex justify-between items-center border border-[#3a3732] px-5 py-4 text-xs uppercase tracking-[0.16em] hover:border-[#F2EFE8] transition-colors">
              Explore work <Play size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-[#242424] px-6 py-20">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#9B978F]">
            <Sparkles size={14} className="text-[#B65B3C]" />
            AWE remains underneath the experience, not in front of it.
          </div>
          <span className="text-xs text-[#5f5b54]">AYUUWORKS / EXPERIENCE ENGINE</span>
        </div>
      </section>
    </main>
  );
};
