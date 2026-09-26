import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Bookmark, Camera, FileText, Play, Search, Sparkles, Check, LockKeyhole, X } from 'lucide-react';
import { caseFiles, caseFilters } from '../casebook/data/cases';
import { MediaEvidence } from '../casebook/components/MediaEvidence';
import { MediaLightbox } from '../casebook/components/MediaLightbox';
import { Caseboard, SavedClue } from '../casebook/components/Caseboard';
import { BrainPanel } from '../casebook/components/BrainPanel';
import { BusinessExplorer } from '../casebook/components/BusinessExplorer';
import { SoundControl, SoundMode, useCasebookSound } from '../casebook/sound';

const evidence = [
  { label: 'EVIDENCE', title: 'REAL CAMPAIGNS', text: 'Ads, launches aur brand moments jo actually duniya ne dekhe.', icon: Camera },
  { label: 'FOOTAGE', title: 'VIDEO CLUES', text: 'Campaign films aur social moments. Play karo, phir clue dhoondo.', icon: Play },
  { label: 'INTERNET', title: 'MEMES & REACTIONS', text: 'Jahan public reaction khud story ka part ban jaata hai.', icon: Sparkles },
  { label: 'BRAIN NOTE', title: 'AYUUWORKS TAKE', text: 'Fact ke baad interpretation. Dono ko mix nahi karenge.', icon: FileText },
];

export const CasebookPage: React.FC = () => {
  const [filter, setFilter] = useState<(typeof caseFilters)[number]>('ALL');
  const [saved, setSaved] = useState<SavedClue[]>(() => {
    try { return JSON.parse(localStorage.getItem('ayuuworks-caseboard') || '[]'); } catch { return []; }
  });
  const [activeMedia, setActiveMedia] = useState<import('../casebook/data/cases').CaseMedia | null>(null);
  const [activeCase, setActiveCase] = useState<(typeof caseFiles)[number] | null>(null);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [caseboardOpen, setCaseboardOpen] = useState(false);
  const [brainOpen, setBrainOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [soundMode, setSoundMode] = useState<SoundMode>(() => (localStorage.getItem('ayuuworks-casebook-sound') as SoundMode) || 'QUIET');
  const playSound = useCasebookSound(soundMode);


  const visibleCases = useMemo(
    () => filter === 'ALL' ? caseFiles : caseFiles.filter((item) => item.type === filter),
    [filter]
  );

  const reveal = (key: string) => { playSound('clue'); setRevealed((current) => current.includes(key) ? current : [...current, key]); };

  const saveDiscoveredClue = (caseItem: (typeof caseFiles)[number], clue: string, index: number) => {
    const entry: SavedClue = { id: caseItem.id + '-discovered-' + index, caseId: caseItem.id, caseNumber: caseItem.number, caseTitle: caseItem.title, clue };
    playSound('pin');
    setSaved((current) => current.some((item) => item.id === entry.id) ? current : [...current, entry]);
  };

  const toggleSaved = (id: string) => {
    const item = caseFiles.find((entry) => entry.id === id);
    if (!item) return;
    const clue: SavedClue = { id: item.id + '-main-clue', caseId: item.id, caseNumber: item.number, caseTitle: item.title, clue: item.clue };
    playSound('pin');
    setSaved((current) => current.some((entry) => entry.id === clue.id) ? current.filter((entry) => entry.id !== clue.id) : [...current, clue]);
  };

  React.useEffect(() => { localStorage.setItem('ayuuworks-caseboard', JSON.stringify(saved)); }, [saved]);
  React.useEffect(() => { localStorage.setItem('ayuuworks-casebook-sound', soundMode); }, [soundMode]);
  React.useEffect(() => { const open = () => setCaseboardOpen(true); window.addEventListener('open-caseboard', open); return () => window.removeEventListener('open-caseboard', open); }, []);

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
            const isSaved = saved.some((entry) => entry.caseId === item.id);
            return (
              <article
                key={item.id}
                className={`mb-5 break-inside-avoid border border-[#111111]/15 bg-[#ebe7df] p-5 ${item.featured ? 'md:p-7' : ''}`}
              >
                <div className="flex items-center justify-between border-b border-[#111111]/15 pb-3">
                  <span className="font-mono text-[10px] tracking-[0.18em]">CASE / {item.number}</span>
                  <span className="text-[9px] font-semibold tracking-[0.16em] text-[#B65B3C]">{item.status}</span>
                </div>

                <div className="my-5 grid gap-3">
                  {item.media.slice(0, 2).map((media) => (
                    <button key={media.title} onClick={() => { playSound('media'); setActiveMedia(media); }} className="text-left" aria-label={`Open ${media.title}`}>
                      <MediaEvidence media={media} compact />
                    </button>
                  ))}
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
                  <button onClick={() => { setActiveCase(item); setRevealed([]); }} className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] hover:text-[#B65B3C]">
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
          <div className="mt-10 border border-[#111111]/20 bg-[#111111] p-6 text-[#F2EFE8] md:p-8">
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#B65B3C]">NEXT INVESTIGATION</p>
            <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="font-display text-3xl font-semibold uppercase tracking-[-0.04em] md:text-5xl">AB YEHI LENS APNE BUSINESS PE LAGAO.</h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D7D0C5]">Casebook se nikle clues ko apne business context mein test karo. 30 seconds. No score.</p>
              </div>
              <button onClick={() => setExplorerOpen(true)} className="inline-flex shrink-0 items-center justify-center gap-3 border border-[#B65B3C] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] hover:bg-[#B65B3C]">OPEN MY CASE <ArrowUpRight className="h-4 w-4" /></button>
            </div>
          </div>
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
      {activeMedia && <MediaLightbox media={activeMedia} onClose={() => setActiveMedia(null)} />}
      {explorerOpen && <BusinessExplorer savedClues={saved.length} onClose={() => setExplorerOpen(false)} />}
      {brainOpen && <BrainPanel clues={saved} onClose={() => setBrainOpen(false)} />}
      {caseboardOpen && <Caseboard clues={saved} onRemove={(id) => setSaved((current) => current.filter((item) => item.id !== id))} onClose={() => setCaseboardOpen(false)} />}
      <SoundControl mode={soundMode} onModeChange={(mode) => { setSoundMode(mode); playSound('paper'); }} />
      <button onClick={() => { playSound('brain'); setBrainOpen(true); }} className="fixed bottom-5 right-[150px] z-40 inline-flex items-center gap-2 border border-[#B65B3C] bg-[#111111] px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#F2EFE8] shadow-lg hover:bg-[#B65B3C]"><Sparkles className="h-3.5 w-3.5" /> BRAIN</button>
      <button onClick={() => window.dispatchEvent(new Event("open-caseboard"))} className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 border border-[#111111]/20 bg-[#F2EFE8] px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] shadow-lg hover:border-[#B65B3C]"><Bookmark className="h-3.5 w-3.5" fill={saved.length ? "currentColor" : "none"} /> CASEBOARD {saved.length ? ` / ${saved.length}` : ""}</button>
      {activeCase && (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-[#111111]/95 p-4 md:p-8" role="dialog" aria-modal="true">
          <div className="mx-auto max-w-6xl border border-[#F2EFE8]/15 bg-[#F2EFE8] text-[#111111]">
            <div className="flex items-center justify-between border-b border-[#111111]/15 p-4 md:p-6">
              <div>
                <p className="font-mono text-[9px] tracking-[0.22em] text-[#B65B3C]">CASE / {activeCase.number} / INVESTIGATION DESK</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em]">{activeCase.field}</p>
              </div>
              <button onClick={() => setActiveCase(null)} aria-label="Close case" className="border border-[#111111]/15 p-2 hover:border-[#B65B3C]"><X className="h-4 w-4" /></button>
            </div>
            <div className="grid gap-10 p-5 md:grid-cols-[1fr_0.8fr] md:p-10">
              <div>
                <p className="font-mono text-[9px] tracking-[0.2em] text-[#B65B3C]">CASE FILE</p>
                <h2 className="mt-3 font-display text-4xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">{activeCase.title}</h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#514c45]">{activeCase.summary}</p>
                <div className="mt-10">
                  <p className="font-mono text-[9px] tracking-[0.2em] text-[#B65B3C]">EVIDENCE</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {activeCase.media.map((media) => (
                      <button key={media.title} onClick={() => setActiveMedia(media)} className="text-left"><MediaEvidence media={media} compact /></button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-l border-[#111111]/15 pl-0 md:pl-8">
                <p className="font-mono text-[9px] tracking-[0.2em] text-[#B65B3C]">INVESTIGATION</p>
                <p className="mt-3 text-sm leading-6 text-[#5b574f]">Pehle facts. Phir clues. Phir sawaal. Verdict nahi, understanding.</p>
                <div className="mt-7 space-y-3">
                  {activeCase.investigation.facts.map((fact, i) => (
                    <div key={fact} className="border border-[#111111]/15 bg-[#ebe7df] p-4">
                      <p className="font-mono text-[8px] tracking-[0.16em] text-[#6b665d]">FACT / 0{i + 1}</p>
                      <p className="mt-2 text-sm leading-6">{fact}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-7">
                  <p className="font-mono text-[9px] tracking-[0.2em] text-[#B65B3C]">CLUES</p>
                  <div className="mt-3 space-y-2">
                    {activeCase.investigation.clues.map((clue, i) => {
                      const key = activeCase.id + '-clue-' + i;
                      const open = revealed.includes(key);
                      return (
                        <button key={key} onClick={() => reveal(key)} className="w-full border border-[#111111]/15 p-4 text-left hover:border-[#B65B3C]">
                          <div className="flex items-center gap-3">
                            {open ? <Check className="h-4 w-4 text-[#B65B3C]" /> : <LockKeyhole className="h-4 w-4 opacity-50" />}
                            <span className="font-mono text-[9px] tracking-[0.16em]">CLUE / 0{i + 1}</span>
                          </div>
                          {open ? <><p className="mt-3 text-sm leading-6">{clue}</p><span onClick={(event) => { event.stopPropagation(); saveDiscoveredClue(activeCase, clue, i); }} className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#B65B3C]">SAVE THIS CLUE →</span></> : <p className="mt-3 text-xs uppercase tracking-[0.12em] text-[#6b665d]">Click karke clue kholo</p>}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-7 border-l-2 border-[#B65B3C] bg-[#ebe7df] p-5">
                  <p className="font-mono text-[9px] tracking-[0.18em] text-[#B65B3C]">QUESTIONS TO INVESTIGATE</p>
                  <div className="mt-3 space-y-3">
                    {activeCase.investigation.questions.map((question) => <p key={question} className="text-sm leading-6">“{question}”</p>)}
                  </div>
                </div>
                {activeCase.investigation.clues.every((_, i) => revealed.includes(activeCase.id + '-clue-' + i)) && (
                  <div className="mt-7 border border-[#B65B3C] bg-[#111111] p-5 text-[#F2EFE8]">
                    <p className="font-mono text-[9px] tracking-[0.18em] text-[#B65B3C]">CASE STATUS</p>
                    <p className="mt-2 font-display text-2xl font-semibold uppercase">CLUES CONNECTED.</p>
                    <p className="mt-3 text-sm leading-6 text-[#D7D0C5]">{activeCase.investigation.takeaway}</p>
                    <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-[#9B978F]">AYUUWORKS INTERPRETATION / NOT A FACTUAL CLAIM</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
