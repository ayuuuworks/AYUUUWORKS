import React from 'react';

export const PlaceholderPage: React.FC<{ title: string; eyebrow: string; description: string; cta?: string }> = ({ title, eyebrow, description, cta }) => (
  <main className="min-h-screen bg-[#111111] text-[#F2EFE8] pt-[72px] px-6">
    <section className="max-w-7xl mx-auto min-h-[78vh] flex items-center">
      <div className="max-w-4xl">
        <p className="text-xs uppercase tracking-[.2em] text-[#B65B3C]">{eyebrow}</p>
        <h1 className="font-display text-5xl sm:text-7xl leading-[.92] tracking-[-.05em] mt-5">{title}</h1>
        <p className="mt-8 max-w-2xl text-[#9B978F] text-base sm:text-lg leading-relaxed">{description}</p>
        {cta && <a href="/start-a-project" className="inline-block mt-9 bg-[#F2EFE8] text-[#111111] px-5 py-4 text-xs uppercase tracking-[.16em]">{cta}</a>}
      </div>
    </section>
  </main>
);
