import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Bookmark, Check, ExternalLink, Image as ImageIcon, X } from 'lucide-react';
import { caseFiles } from '../data/cases';

const tags = ['ALL', 'LUXURY', 'MINIMAL', 'BOLD', 'DESI', 'CINEMATIC', 'EDITORIAL', 'PLAYFUL', 'PREMIUM', 'LOCAL'] as const;
type Tag = typeof tags[number];

const visualMap: Record<string, Tag[]> = {
  'cred-indiranagar': ['BOLD', 'PLAYFUL', 'DESI', 'CINEMATIC'],
  'nike-just-do-it': ['BOLD', 'CINEMATIC', 'EDITORIAL', 'PREMIUM'],
  'zomato-ad-system': ['PLAYFUL', 'BOLD', 'LOCAL'],
  'netflix-shift': ['MINIMAL', 'CINEMATIC', 'EDITORIAL', 'PREMIUM'],
};

export interface InspirationItem {
  id: string;
  caseId: string;
  caseNumber: string;
  title: string;
  kind: string;
  tags: Tag[];
  sourceName: string;
  sourceUrl: string;
  note: string;
}

const items: InspirationItem[] = caseFiles.flatMap((item) =>
  item.media
    .filter((media) => Boolean(media.sourceUrl))
    .map((media, index) => ({
      id: item.id + '-' + index,
      caseId: item.id,
      caseNumber: item.number,
      title: media.title,
      kind: media.kind,
      tags: visualMap[item.id] || ['EDITORIAL'],
      sourceName: media.sourceName,
      sourceUrl: media.sourceUrl as string,
      note: media.description,
    }))
);

interface VisualDiscoveryProps {
  savedIds: string[];
  onSave: (item: InspirationItem) => void;
  onClose?: () => void;
}

export const VisualDiscovery: React.FC<VisualDiscoveryProps> = ({ savedIds, onSave, onClose }) => {
  const [tag, setTag] = useState<Tag>('ALL');
  const [selected, setSelected] = useState<InspirationItem | null>(null);
  const filtered = useMemo(() => tag === 'ALL' ? items : items.filter((item) => item.tags.includes(tag)), [tag]);

  return (
    <section className="border-t border-[#111111]/20 bg-[#ebe7df]">
      <div className="mx-auto max-w-[1500px] px-5 py-12 md:px-10 md:py-20">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#B65B3C]">VISUAL DISCOVERY / 09</p>
            <h2 className="mt-3 font-display text-5xl font-semibold uppercase leading-[0.86] tracking-[-0.055em] md:text-7xl">DEKHO.<br />CONNECT KARO.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[#514c45]">Pinterest jaisa visual wandering, but with a research trail. Ek reference pasand aaya? Dekho kis case se aaya, source kya hai, aur uske peeche ka clue kya hai.</p>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {tags.map((item) => (
            <button key={item} onClick={() => setTag(item)} className={`shrink-0 border px-3 py-2 text-[9px] font-semibold tracking-[0.15em] ${tag === item ? 'border-[#111111] bg-[#111111] text-[#F2EFE8]' : 'border-[#111111]/20 hover:border-[#B65B3C]'}`}>
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8 columns-2 gap-3 md:columns-3 xl:columns-4">
          {filtered.map((item, index) => {
            const saved = savedIds.includes(item.id);
            return (
              <article key={item.id} className="mb-3 break-inside-avoid border border-[#111111]/15 bg-[#F2EFE8]">
                <button onClick={() => setSelected(item)} className={`relative block w-full text-left ${index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-[4/3]' : 'aspect-square'} bg-[#22211f] p-5 text-[#F2EFE8] hover:bg-[#2a2926]`}>
                  <ImageIcon className="h-5 w-5 opacity-60" strokeWidth={1.2} />
                  <div className="absolute inset-x-5 bottom-5">
                    <p className="font-mono text-[8px] tracking-[0.16em] text-[#B65B3C]">{item.kind} / CASE {item.caseNumber}</p>
                    <p className="mt-2 font-display text-xl font-semibold uppercase leading-none">{item.title}</p>
                  </div>
                </button>
                <div className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((t) => <span key={t} className="border border-[#111111]/10 px-1.5 py-1 text-[7px] uppercase tracking-[0.1em]">{t}</span>)}
                  </div>
                  <button onClick={() => onSave(item)} className={`mt-3 inline-flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.13em] ${saved ? 'text-[#B65B3C]' : ''}`}>
                    <Bookmark className="h-3 w-3" fill={saved ? 'currentColor' : 'none'} /> {saved ? 'SAVED TO CASEBOARD' : 'SAVE CLUE'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {selected && (
          <div className="fixed inset-0 z-[90] grid place-items-center bg-[#111111]/90 p-5" role="dialog" aria-modal="true">
            <div className="w-full max-w-2xl border border-[#F2EFE8]/15 bg-[#F2EFE8] text-[#111111]">
              <div className="flex items-center justify-between border-b border-[#111111]/15 p-5">
                <div><p className="font-mono text-[8px] tracking-[0.18em] text-[#B65B3C]">VISUAL CLUE / CASE {selected.caseNumber}</p><h3 className="mt-2 font-display text-2xl font-semibold uppercase">{selected.title}</h3></div>
                <button onClick={() => setSelected(null)} aria-label="Close visual clue" className="border border-[#111111]/15 p-2"><X className="h-4 w-4" /></button>
              </div>
              <div className="p-6">
                <div className="border-l-2 border-[#B65B3C] bg-[#ebe7df] p-5">
                  <p className="font-mono text-[8px] tracking-[0.16em] text-[#B65B3C]">WHY IT'S HERE</p>
                  <p className="mt-2 text-sm leading-6">{selected.note}</p>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="border border-[#111111]/15 p-4"><p className="font-mono text-[8px] tracking-[0.14em]">VISUAL LANGUAGE</p><p className="mt-2 text-sm">{selected.tags.join(' · ')}</p></div>
                  <div className="border border-[#111111]/15 p-4"><p className="font-mono text-[8px] tracking-[0.14em]">SOURCE</p><p className="mt-2 text-sm">{selected.sourceName}</p></div>
                </div>
                <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#B65B3C]">OPEN SOURCE <ExternalLink className="h-3.5 w-3.5" /></a>
                <div className="mt-6 flex items-center justify-between border-t border-[#111111]/15 pt-4">
                  <span className="text-[9px] uppercase tracking-[0.12em]">CASEBOARD = YOUR VISUAL TRAIL</span>
                  <button onClick={() => { onSave(selected); setSelected(null); }} className="inline-flex items-center gap-2 border border-[#111111] px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em]"><Check className="h-3.5 w-3.5" /> SAVE</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {onClose && <button onClick={onClose} className="mt-8 text-[9px] uppercase tracking-[0.15em] text-[#6b665d]">Close discovery</button>}
      </div>
    </section>
  );
};
