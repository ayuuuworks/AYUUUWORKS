import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Bookmark, Camera, FileText, Play, Search, Sparkles } from 'lucide-react';
import { caseFiles, caseFilters } from '../casebook/data/cases';

const evidence = [
  { label: 'EVIDENCE', title: 'REAL CAMPAIGNS', text: 'Ads, launches aur brand moments jo actually duniya ne dekhe.', icon: Camera },
  { label: 'FOOTAGE', title: 'VIDEO CLUES', text: 'Campaign films aur social moments. Play karo, phir clue dhoondo.', icon: Play },
  { label: 'INTERNET', title: 'MEMES & REACTIONS', text: 'Jahan public reaction khud story ka part ban jaata hai.', icon: Sparkles },
  { label: 'BRAIN NOTE', title: 'AYUUWORKS TAKE', text: 'Fact ke baad interpretation. Dono ko mix nahi karenge.', icon: FileText },
];

export const CasebookPage: React.FC = () => {
  const [filter, setFilter] = useState<(typeof caseFilters)[number]>('ALL');
  const [saved, setSaved] = useState<string[]>([]);

  const visibleCases = useMemo(
    () => filter === 'ALL' ? caseFiles : caseFiles.filter((item) => item.type === filter),
    [filter]
  );

  const toggleSaved = (id: string) => {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <main className="min-h-screen bg-[#F2EFE8] text-[#111111] pt-16">
      <section className="relative overflow-hidden border-b border-[#111111]/15 bg-[#F2EFE8]">
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <div className="relative mx-auto max-w-[1500px] px-5 py-8 md:px-10 md:py-12">
          <div className="flex items-center justify-between border-b border-[#111111]/20 pb-4 text-[10px] uppercase tracking-[0.24em]">
            <span>AYUUWORKS / THE CASEBOOK</span>
            <span>VOL. 01 / BUSINESS INTELLIGENCE DESK</span>
          </div>

          <div className="grid gap-8 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-end md:py-20">
            <div>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#B65B3C]">
                Special Investigation
              </p>
              <h1 className="max-w-5xl font-display text-[clamp(3rem,8vw,8.5rem)] font-semibold uppercase leading-[0.82] tracking-[-0.065em]">
                KUCH BRANDS<br />
                <span className="text-[#B65B3C]">DIKHNA</span> BAND<br />
                NAHI HOTE.
              </h1>
            </div>
            <div className="max-w-md border-l border-[#111111]/20 pl-6">
              <p className="text-xl leading-snug md:text-2xl">
                Kuch businesses famous hue. Kuch yaad reh gaye. Sawal ye hai...
                <strong> kyun?</strong>
              </p>
              <p className="mt-5 text-sm leading-7 text-[#4d4943]">
                Real campaigns, visual clues, internet culture aur AyuuWorks ki nazar.
                Case kholo. Evidence dekho. Pattern pakdo.
              </p>
              <div className="mt-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
                <span className="h-2 w-2 rounded-full bg-[#B65B3C]" />
                Investigation archive active
              </div>
            </div>
          </div>

          <div className="grid border-y border-[#111111]/20 md:grid-cols-4">
            {evidence.map(({ label, title, text, icon: Icon }) => (
              <div key={title} className="min-h-[190px] border-b border-[#111111]/15 p-5 md:border-b-0 md:border-r last:border-r-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#B65B3C]">{label}</span>
                  <Icon className="h-4 w-4 opacity-50" strokeWidth={1.5} />
                </div>
                <h2 className="mt-10 font-display text-lg font-semibold uppercase tracking-tight">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#5b574f]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-12 md:px-10 md:py-20">
        <div className="mb-8 flex flex-col gap-5 border-b border-[#111111]/20 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B65B3C]">Case Files</p>
            <h2 className="mt-2 font-display text-4xl font-semibold uppercase tracking-[-0.04em] md:text-6xl">
              OPEN INVESTIGATIONS
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {caseFilters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`border px-3 py-2 text-[10px] font-semibold tracking-[0.16em] transition-colors ${filter === item ? 'border-[#111111] bg-[#111111] text-[#F2EFE8]' : 'border-[#111111]/20 hover:border-[#B65B3C]'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
          {visibleCases.map((item, index) => {
            const isSaved = saved.includes(item.id);
            return (
              <article
                key={item.id}
                className={`mb-5 break-inside-avoid border border-[#111111]/15 bg-[#ebe7df] p-5 ${item.featured ? 'md:p-7' : ''}`}
              >
                <div className="flex items-center justify-between border-b border-[#111111]/15 pb-3">
                  <span className="font-mono text-[10px] tracking-[0.18em]">CASE / {item.number}</span>
                  <span className="text-[9px] font-semibold tracking-[0.16em] text-[#B65B3C]">{item.status}</span>
                </div>

                <div className={`my-5 relative overflow-hidden bg-[#22211f] ${index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-[16/10]' : 'aspect-square'}`}>
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: 'radial-gradient(circle at 30% 20%, #d7d0c5 0 1px, transparent 1px), linear-gradient(135deg, #242424, #111111)',
                    backgroundSize: '14px 14px, 100% 100%',
                  }} />
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.25em] text-[#D7D0C5]">MEDIA EVIDENCE / STAGE 01</p>
                      <p className="mt-3 font-display text-2xl font-semibold uppercase leading-none text-[#F2EFE8]">
                        REAL MEDIA<br />ENTERS NEXT.
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 border border-[#D7D0C5]/30 px-2 py-1 text-[8px] tracking-[0.18em] text-[#D7D0C5]">
                    PLACEHOLDER / NO FAKE ASSET
                  </div>
                </div>

                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#B65B3C]">{item.kicker}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold uppercase leading-[0.95] tracking-[-0.035em]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#4d4943]">{item.summary}</p>

                <div className="mt-6 border-l-2 border-[#B65B3C] bg-[#F2EFE8] p-4">
                  <p className="font-mono text-[9px] tracking-[0.18em] text-[#B65B3C]">CLUE</p>
                  <p className="mt-2 text-sm font-medium leading-6">{item.clue}</p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <button className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] hover:text-[#B65B3C]">
                    CASE KHOLO <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => toggleSaved(item.id)}
                    aria-label={isSaved ? 'Remove clue from caseboard' : 'Save clue to caseboard'}
                    className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] ${isSaved ? 'text-[#B65B3C]' : 'text-[#6c675e]'}`}
                  >
                    <Bookmark className="h-3.5 w-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                    {isSaved ? 'SAVED' : 'CASEBOARD MEIN DAALO'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-20 border-t border-[#111111]/20 pt-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#B65B3C]">AyuuWorks Brain</p>
              <h2 className="mt-3 max-w-4xl font-display text-4xl font-semibold uppercase leading-none tracking-[-0.05em] md:text-6xl">
                FACT PEHLE.<br />INTERPRETATION BAAD MEIN.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#514c45]">
                Casebook ka rule simple hai: jo documented hai usko fact bolenge.
                Jo hum infer karte hain, usko clearly AyuuWorks take bolenge.
              </p>
            </div>
            <div className="flex items-center gap-3 border border-[#111111]/20 px-4 py-3 text-[10px] uppercase tracking-[0.16em]">
              <Search className="h-4 w-4" />
              Evidence-first
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
