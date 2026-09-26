import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, Bookmark, Check, ExternalLink, Eye, Filter, Play, Plus, Search, Volume2, VolumeX, X } from 'lucide-react';
import { caseFiles, caseFilters, type CaseFile, type CaseMedia } from '../casebook/data/cases';
import { MediaEvidence } from '../casebook/components/MediaEvidence';
import { MediaLightbox } from '../casebook/components/MediaLightbox';
import { Caseboard, type SavedClue } from '../casebook/components/Caseboard';
import { BrainPanel } from '../casebook/components/BrainPanel';
import { BusinessExplorer } from '../casebook/components/BusinessExplorer';
import { VisualDiscovery, type InspirationItem } from '../casebook/components/VisualDiscovery';
import { SoundControl, type SoundMode, useCasebookSound } from '../casebook/sound';

const ink = '#111111';
const paper = '#F2EFE8';
const stone = '#E8E3DA';
const orange = '#B65B3C';

const saveClue = (item: CaseFile, clue: string, id: string): SavedClue => ({
  id,
  caseId: item.id,
  caseNumber: item.number,
  caseTitle: item.title,
  clue,
});

export const CasebookPage: React.FC = () => {
  const [filter, setFilter] = useState<(typeof caseFilters)[number]>('ALL');
  const [activeCase, setActiveCase] = useState<CaseFile | null>(null);
  const [activeMedia, setActiveMedia] = useState<CaseMedia | null>(null);
  const [saved, setSaved] = useState<SavedClue[]>(() => {
    try { return JSON.parse(localStorage.getItem('ayuuworks-caseboard') || '[]'); } catch { return []; }
  });
  const [visualSaved, setVisualSaved] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('ayuuworks-visual-trail') || '[]'); } catch { return []; }
  });
  const [caseboardOpen, setCaseboardOpen] = useState(false);
  const [brainOpen, setBrainOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [soundMode, setSoundMode] = useState<SoundMode>(() => (localStorage.getItem('ayuuworks-casebook-sound') as SoundMode) || 'QUIET');
  const [projectBriefOpen, setProjectBriefOpen] = useState(false);
  const [projectContext, setProjectContext] = useState({ businessType: '', businessName: '' });
  const playSound = useCasebookSound(soundMode);

  const featured = caseFiles.find((item) => item.featured) || caseFiles[0];
  const visibleCases = useMemo(
    () => filter === 'ALL' ? caseFiles : caseFiles.filter((item) => item.type === filter),
    [filter]
  );

  useEffect(() => { localStorage.setItem('ayuuworks-caseboard', JSON.stringify(saved)); }, [saved]);
  useEffect(() => { localStorage.setItem('ayuuworks-visual-trail', JSON.stringify(visualSaved)); }, [visualSaved]);
  useEffect(() => { localStorage.setItem('ayuuworks-casebook-sound', soundMode); }, [soundMode]);

  useEffect(() => {
    const open = () => setCaseboardOpen(true);
    window.addEventListener('open-caseboard', open);
    return () => window.removeEventListener('open-caseboard', open);
  }, []);

  const pin = (item: CaseFile, clue = item.clue, id = item.id + '-main-clue') => {
    playSound('pin');
    setSaved((current) => current.some((entry) => entry.id === id)
      ? current.filter((entry) => entry.id !== id)
      : [...current, saveClue(item, clue, id)]);
  };

  const startProject = (payload: { businessType: string; businessName: string }) => {
    setProjectContext(payload);
    setExplorerOpen(false);
    setProjectBriefOpen(true);
    playSound('evidence');
  };

  const handoffProject = () => {
    localStorage.setItem('ayuuworks-project-handoff', JSON.stringify({
      ...projectContext,
      savedClues: saved.length,
      visualReferences: visualSaved.length,
      timestamp: new Date().toISOString()
    }));
    window.location.href = '/#enquiry-experience';
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F2EFE8] text-[#111111]">
      <section className="relative min-h-[92vh] overflow-hidden bg-[#111111] text-[#F2EFE8]">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: 'radial-gradient(circle at 72% 30%, rgba(182,91,60,.55), transparent 27%), radial-gradient(circle at 20% 80%, rgba(255,255,255,.12), transparent 24%), linear-gradient(125deg, transparent 0 48%, rgba(255,255,255,.05) 48% 48.2%, transparent 48.2%)'
        }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,.05),rgba(17,17,17,.72)_82%,#111_100%)]" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-[1600px] flex-col px-5 pb-8 pt-28 md:px-10 md:pt-36">
          <div className="flex items-center justify-between border-b border-[#F2EFE8]/15 pb-4 font-mono text-[9px] uppercase tracking-[0.22em] text-[#D7D0C5]">
            <span>AYUUWORKS / CASEBOOK</span>
            <span>VOL. 01 / {caseFiles.length} CASES</span>
          </div>

          <div className="flex flex-1 flex-col justify-center py-16 md:grid md:grid-cols-[1.1fr_.9fr] md:items-end md:gap-12">
            <div>
              <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#B65B3C]">
                <span className="h-px w-10 bg-[#B65B3C]" /> CASE FILES / REAL WORLD
              </p>
              <h1 className="max-w-6xl font-display text-[clamp(4rem,10.5vw,11rem)] font-semibold uppercase leading-[.78] tracking-[-.075em]">
                LOOK AT<br /><span className="text-[#B65B3C]">WHAT</span><br />STICKS.
              </h1>
            </div>
            <div className="max-w-xl pb-2">
              <p className="font-display text-3xl leading-[.98] md:text-5xl">Business ke cases. Marketing ke clues. Internet ki kahaniyan.</p>
              <p className="mt-6 max-w-lg text-sm leading-7 text-[#C9C2B8]">
                Famous campaigns ko sirf dekhna nahi. Unke andar woh decision dhoondhna hai jo attention, memory ya behaviour ko change karta hai.
              </p>
              <button onClick={() => document.getElementById('open-investigations')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 inline-flex items-center gap-3 border border-[#F2EFE8]/25 px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] transition hover:border-[#B65B3C] hover:bg-[#B65B3C]">
                OPEN THE FILES <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid border-t border-[#F2EFE8]/15 pt-4 text-[9px] uppercase tracking-[0.17em] text-[#A9A29A] md:grid-cols-3">
            <span>REAL SOURCES</span><span className="hidden md:block">NO INVENTED RESULTS</span><span className="md:text-right">FACT → CLUE → INTERPRETATION</span>
          </div>
        </div>
      </section>

      <section id="open-investigations" className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-10 border-b border-[#111111]/15 pb-12 md:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] text-[#B65B3C]">FEATURED / CASE {featured.number}</p>
            <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[.84] tracking-[-.06em] md:text-8xl">THE CASE<br />THAT OPENS<br />THE BOOK.</h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-[#514c45]">{featured.summary}</p>
          </div>

          <button onClick={() => { playSound('media'); setActiveCase(featured); }} className="group relative min-h-[520px] overflow-hidden bg-[#171716] text-left md:min-h-[650px]">
            <div className="absolute inset-0 opacity-80" style={{
              backgroundImage: 'radial-gradient(circle at 72% 28%, rgba(182,91,60,.85), transparent 19%), radial-gradient(circle at 24% 72%, rgba(242,239,232,.13), transparent 24%), linear-gradient(135deg,#2a2825,#111 55%,#3a241d)'
            }} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(0,0,0,.88)_100%)]" />
            <div className="absolute left-6 top-6 flex items-center gap-3 text-[#F2EFE8]">
              <span className="border border-[#F2EFE8]/25 bg-[#111]/50 px-3 py-2 font-mono text-[8px] tracking-[.18em]">CASE / {featured.number}</span>
              <span className="border border-[#B65B3C] bg-[#B65B3C]/15 px-3 py-2 font-mono text-[8px] tracking-[.18em]">{featured.status}</span>
            </div>
            <div className="absolute inset-x-7 bottom-8">
              <p className="font-mono text-[9px] tracking-[.2em] text-[#B65B3C]">{featured.kicker}</p>
              <h3 className="mt-4 max-w-4xl font-display text-4xl font-semibold uppercase leading-[.84] tracking-[-.045em] text-[#F2EFE8] md:text-7xl">{featured.title}</h3>
              <div className="mt-7 flex items-center justify-between border-t border-[#F2EFE8]/20 pt-4">
                <span className="text-[9px] uppercase tracking-[.15em] text-[#C9C2B8]">OPEN INVESTIGATION</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F2EFE8]/25 transition group-hover:bg-[#B65B3C]"><ArrowRight className="h-4 w-4" /></span>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-[9px] tracking-[.25em] text-[#B65B3C]">THE ARCHIVE</p>
            <h2 className="mt-3 font-display text-5xl font-semibold uppercase tracking-[-.055em] md:text-7xl">OPEN INVESTIGATIONS.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {caseFilters.map((item) => (
              <button key={item} onClick={() => setFilter(item)} className={'border px-3 py-2 text-[9px] font-semibold tracking-[.15em] transition ' + (filter === item ? 'border-[#111] bg-[#111] text-[#F2EFE8]' : 'border-[#111]/15 hover:border-[#B65B3C]')}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-px border border-[#111111]/15 bg-[#111111]/15 md:grid-cols-2 xl:grid-cols-4">
          {visibleCases.map((item, index) => {
            const isPinned = saved.some((entry) => entry.id === item.id + '-main-clue');
            return (
              <article key={item.id} className="group bg-[#F2EFE8] p-5 transition hover:bg-[#E8E3DA] md:p-6">
                <div className="flex items-center justify-between font-mono text-[8px] tracking-[.16em]">
                  <span>CASE / {item.number}</span><span className="text-[#B65B3C]">{item.year}</span>
                </div>
                <div className="relative mt-5 aspect-[4/3] overflow-hidden bg-[#22211F]">
                  <div className="absolute inset-0" style={{ backgroundImage: index % 2 ? 'radial-gradient(circle at 75% 25%,rgba(182,91,60,.75),transparent 22%),linear-gradient(145deg,#34312c,#111)' : 'linear-gradient(125deg,#111 20%,#6b3b2d 100%)' }} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(0,0,0,.7))]" />
                  <div className="absolute inset-x-4 bottom-4">
                    <span className="font-mono text-[8px] tracking-[.16em] text-[#D7D0C5]">{item.field}</span>
                  </div>
                </div>
                <p className="mt-6 font-mono text-[8px] tracking-[.18em] text-[#B65B3C]">{item.kicker}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold uppercase leading-[.9] tracking-[-.035em]">{item.title}</h3>
                <p className="mt-4 text-xs leading-6 text-[#5B574F]">{item.summary}</p>
                <div className="mt-6 flex items-center justify-between border-t border-[#111]/10 pt-4">
                  <button onClick={() => { playSound('clue'); setActiveCase(item); }} className="text-[9px] font-semibold uppercase tracking-[.15em] hover:text-[#B65B3C]">OPEN CASE <ArrowRight className="ml-1 inline h-3 w-3" /></button>
                  <button onClick={() => pin(item)} aria-label="Save clue" className={'flex items-center gap-1.5 text-[8px] uppercase tracking-[.12em] ' + (isPinned ? 'text-[#B65B3C]' : 'text-[#6B665D]')}>
                    <Bookmark className="h-3.5 w-3.5" fill={isPinned ? 'currentColor' : 'none'} /> {isPinned ? 'PINNED' : 'PIN'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#111111] px-5 py-24 text-[#F2EFE8] md:px-10 md:py-36">
        <div className="absolute right-[-8%] top-[-15%] h-[480px] w-[480px] rounded-full border border-[#B65B3C]/25" />
        <div className="absolute right-[2%] top-[-4%] h-[330px] w-[330px] rounded-full border border-[#F2EFE8]/10" />
        <div className="relative mx-auto grid max-w-[1500px] gap-12 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <div>
            <p className="font-mono text-[9px] tracking-[.25em] text-[#B65B3C]">THE RULE</p>
            <h2 className="mt-5 font-display text-6xl font-semibold uppercase leading-[.8] tracking-[-.06em] md:text-9xl">DON'T<br />JUST<br /><span className="text-[#B65B3C]">LOOK.</span></h2>
          </div>
          <div>
            <p className="max-w-2xl font-display text-3xl leading-[1] md:text-5xl">Ask what made the idea travel.</p>
            <div className="mt-10 grid gap-px bg-[#F2EFE8]/15 md:grid-cols-3">
              {[
                ['01', 'FACT', 'What actually happened?'],
                ['02', 'CLUE', 'What detail keeps showing up?'],
                ['03', 'TAKE', 'What can we learn without pretending certainty?']
              ].map(([n, title, text]) => (
                <div key={n} className="bg-[#111] p-5">
                  <span className="font-mono text-[8px] text-[#B65B3C]">{n}</span>
                  <h3 className="mt-10 font-display text-xl uppercase">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#A9A29A]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <VisualDiscovery savedIds={visualSaved} onSave={(item: InspirationItem) => {
        playSound('pin');
        setVisualSaved((current) => current.includes(item.id) ? current : [...current, item.id]);
      }} />

      <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-10 border-y border-[#111]/15 py-10 md:grid-cols-[1fr_.75fr] md:items-center">
          <div>
            <p className="font-mono text-[9px] tracking-[.25em] text-[#B65B3C]">YOUR TRAIL / {saved.length} CLUES</p>
            <h2 className="mt-4 max-w-4xl font-display text-5xl font-semibold uppercase leading-[.84] tracking-[-.055em] md:text-8xl">NOW MAKE<br />THE CONNECTION.</h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#514c45]">
              Casebook ka point answers dena nahi tha. Point tha tumhe notice karna sikhana. Ab apne business par wahi lens lagao.
            </p>
          </div>
          <div className="grid gap-2">
            <button onClick={() => setCaseboardOpen(true)} className="flex items-center justify-between border border-[#111]/15 bg-[#E8E3DA] p-5 text-left transition hover:border-[#B65B3C]">
              <span><span className="block font-mono text-[8px] text-[#B65B3C]">YOUR CLUES</span><span className="mt-2 block font-display text-2xl uppercase">OPEN CASEBOARD</span></span>
              <Bookmark className="h-5 w-5" />
            </button>
            <button onClick={() => setBrainOpen(true)} disabled={saved.length < 2} className="flex items-center justify-between border border-[#111]/15 p-5 text-left transition enabled:hover:border-[#B65B3C] disabled:cursor-not-allowed disabled:opacity-40">
              <span><span className="block font-mono text-[8px] text-[#B65B3C]">PATTERN LAYER</span><span className="mt-2 block font-display text-2xl uppercase">SEE WHAT CONNECTS</span></span>
              <Search className="h-5 w-5" />
            </button>
            <button onClick={() => setExplorerOpen(true)} className="flex items-center justify-between bg-[#B65B3C] p-5 text-left text-[#F2EFE8] transition hover:bg-[#9F4D31]">
              <span><span className="block font-mono text-[8px] text-[#F2EFE8]/70">NEXT / YOUR BUSINESS</span><span className="mt-2 block font-display text-2xl uppercase">LOOK AT YOUR BUSINESS</span></span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2">
        <SoundControl mode={soundMode} onChange={setSoundMode} />
        <button onClick={() => setCaseboardOpen(true)} className="flex items-center gap-2 border border-[#111]/15 bg-[#F2EFE8]/90 px-3 py-2 text-[8px] font-semibold uppercase tracking-[.14em] backdrop-blur-md">
          <Bookmark className="h-3 w-3" /> {saved.length} CLUES
        </button>
      </div>

      {activeCase && (
        <CaseModal
          item={activeCase}
          saved={saved}
          onPin={(clue, id) => pin(activeCase, clue, id)}
          onMedia={(media) => { playSound('media'); setActiveMedia(media); }}
          onClose={() => setActiveCase(null)}
        />
      )}

      {activeMedia && <MediaLightbox media={activeMedia} onClose={() => setActiveMedia(null)} />}
      {caseboardOpen && <Caseboard clues={saved} onRemove={(id) => setSaved((current) => current.filter((item) => item.id !== id))} onClose={() => setCaseboardOpen(false)} />}
      {brainOpen && <BrainPanel clues={saved} onClose={() => setBrainOpen(false)} />}
      {explorerOpen && <BusinessExplorer onClose={() => setExplorerOpen(false)} savedClues={saved.length} onStartProject={startProject} />}

      {projectBriefOpen && (
        <div className="fixed inset-0 z-[110] grid place-items-center bg-[#111]/90 p-5" role="dialog" aria-modal="true">
          <div className="w-full max-w-2xl border border-[#F2EFE8]/15 bg-[#F2EFE8] p-6 text-[#111] md:p-9">
            <div className="flex items-start justify-between">
              <div><p className="font-mono text-[9px] tracking-[.2em] text-[#B65B3C]">CASEBOOK → PROJECT</p><h2 className="mt-3 font-display text-4xl uppercase leading-[.85] md:text-6xl">YOUR TRAIL<br />IS READY.</h2></div>
              <button onClick={() => setProjectBriefOpen(false)} className="border border-[#111]/15 p-2"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <Stat label="CLUES" value={String(saved.length)} />
              <Stat label="VISUALS" value={String(visualSaved.length)} />
              <Stat label="BUSINESS" value={projectContext.businessName || projectContext.businessType} />
            </div>
            <div className="mt-6 border-l-2 border-[#B65B3C] bg-[#E8E3DA] p-5 text-sm leading-6">Investigation trail saved. Next step: turn the questions into a real project conversation.</div>
            <button onClick={handoffProject} className="mt-6 flex w-full items-center justify-between bg-[#111] p-5 text-[#F2EFE8]"><span className="font-mono text-[9px] tracking-[.16em]">CONTINUE TO PROJECT BRIEF</span><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      )}
    </main>
  );
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="border border-[#111]/15 p-4"><p className="font-mono text-[8px] tracking-[.16em] text-[#B65B3C]">{label}</p><p className="mt-2 truncate font-display text-2xl uppercase">{value}</p></div>
);

const CaseModal: React.FC<{
  item: CaseFile;
  saved: SavedClue[];
  onPin: (clue: string, id: string) => void;
  onMedia: (media: CaseMedia) => void;
  onClose: () => void;
}> = ({ item, saved, onPin, onMedia, onClose }) => {
  const [tab, setTab] = useState<'story' | 'evidence' | 'investigation'>('story');
  const pinnedMain = saved.some((entry) => entry.id === item.id + '-main-clue');

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#111]/95 p-4 md:p-8" role="dialog" aria-modal="true">
      <div className="mx-auto max-w-7xl overflow-hidden border border-[#F2EFE8]/15 bg-[#F2EFE8] text-[#111]">
        <header className="flex items-center justify-between border-b border-[#111]/15 p-5 md:p-7">
          <div><p className="font-mono text-[9px] tracking-[.2em] text-[#B65B3C]">CASE / {item.number} · {item.field}</p><h2 className="mt-2 max-w-5xl font-display text-4xl font-semibold uppercase leading-[.86] tracking-[-.045em] md:text-6xl">{item.title}</h2></div>
          <button onClick={onClose} className="shrink-0 border border-[#111]/15 p-2"><X className="h-4 w-4" /></button>
        </header>

        <div className="grid gap-0 lg:grid-cols-[1.25fr_.75fr]">
          <div className="border-b border-[#111]/15 p-5 md:p-8 lg:border-b-0 lg:border-r">
            <div className="relative min-h-[380px] overflow-hidden bg-[#181817] md:min-h-[540px]">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 75% 25%,rgba(182,91,60,.72),transparent 22%),linear-gradient(145deg,#332f2b,#111 65%)' }} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(0,0,0,.78))]" />
              <div className="absolute inset-x-6 bottom-6 text-[#F2EFE8]">
                <p className="font-mono text-[8px] tracking-[.2em] text-[#B65B3C]">{item.kicker}</p>
                <p className="mt-3 max-w-3xl font-display text-4xl uppercase leading-[.85] md:text-6xl">{item.title}</p>
              </div>
            </div>
            <div className="mt-5 flex gap-1 overflow-x-auto border-b border-[#111]/15">
              {(['story','evidence','investigation'] as const).map((key) => <button key={key} onClick={() => setTab(key)} className={'shrink-0 px-4 py-3 font-mono text-[8px] tracking-[.15em] ' + (tab === key ? 'border-b-2 border-[#B65B3C] text-[#B65B3C]' : 'text-[#6B665D]')}>{key.toUpperCase()}</button>)}
            </div>

            {tab === 'story' && <div className="pt-6"><p className="text-base leading-8">{item.summary}</p><div className="mt-8 border-l-2 border-[#B65B3C] bg-[#E8E3DA] p-5"><p className="font-mono text-[8px] tracking-[.17em] text-[#B65B3C]">THE CLUE</p><p className="mt-3 font-display text-2xl uppercase leading-tight">{item.clue}</p></div></div>}

            {tab === 'evidence' && <div className="grid gap-4 pt-6 md:grid-cols-2">{item.media.map((media, index) => <button key={media.title + index} onClick={() => onMedia(media)} className="text-left"><MediaEvidence media={media} /></button>)}</div>}

            {tab === 'investigation' && (
              <div className="grid gap-8 pt-6 md:grid-cols-2">
                <InfoList title="FACTS" items={item.investigation.facts} />
                <InfoList title="CLUES" items={item.investigation.clues} accent />
                <InfoList title="QUESTIONS" items={item.investigation.questions} />
                <div className="border border-[#B65B3C] bg-[#111] p-5 text-[#F2EFE8]"><p className="font-mono text-[8px] tracking-[.18em] text-[#B65B3C]">TAKEAWAY</p><p className="mt-3 font-display text-xl uppercase leading-tight">{item.investigation.takeaway}</p><p className="mt-4 text-[10px] leading-5 text-[#A9A29A]">AyuuWorks interpretation, not a factual claim.</p></div>
              </div>
            )}
          </div>

          <aside className="p-5 md:p-8">
            <div className="border-b border-[#111]/15 pb-6">
              <p className="font-mono text-[8px] tracking-[.18em] text-[#B65B3C]">RESEARCH TRAIL</p>
              <div className="mt-4 space-y-2">{item.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="flex items-center justify-between border border-[#111]/10 p-3 text-[9px] uppercase tracking-[.08em] hover:border-[#B65B3C]"><span>{source.type} / {source.name}</span><ExternalLink className="h-3 w-3 shrink-0 text-[#B65B3C]" /></a>)}</div>
            </div>
            <div className="pt-6">
              <p className="font-mono text-[8px] tracking-[.18em] text-[#B65B3C]">PIN THIS CLUE</p>
              <p className="mt-3 text-sm leading-6 text-[#514c45]">Keep this idea. When two or more clues connect, the Caseboard can surface a pattern.</p>
              <button onClick={() => onPin(item.clue, item.id + '-main-clue')} className={'mt-5 flex w-full items-center justify-between border p-4 text-[9px] font-semibold uppercase tracking-[.15em] ' + (pinnedMain ? 'border-[#B65B3C] bg-[#B65B3C]/10 text-[#B65B3C]' : 'border-[#111]/15 hover:border-[#B65B3C]')}><span>{pinnedMain ? 'CLUE PINNED' : 'PIN CLUE'}</span>{pinnedMain ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}</button>
            </div>
            <div className="mt-8 border-t border-[#111]/15 pt-6">
              <p className="font-mono text-[8px] tracking-[.18em] text-[#6B665D]">CASE STATUS</p>
              <div className="mt-3 flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-[#B65B3C]" /><span className="font-display text-xl uppercase">{item.status}</span></div>
              <p className="mt-2 text-xs leading-5 text-[#6B665D]">{item.year} · {item.region}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const InfoList: React.FC<{ title: string; items: string[]; accent?: boolean }> = ({ title, items, accent }) => (
  <div><p className={'font-mono text-[8px] tracking-[.18em] ' + (accent ? 'text-[#B65B3C]' : 'text-[#6B665D]')}>{title}</p><div className="mt-3 space-y-2">{items.map((text, index) => <div key={index} className="border-l border-[#111]/15 bg-[#E8E3DA] p-4 text-sm leading-6">{text}</div>)}</div></div>
);
