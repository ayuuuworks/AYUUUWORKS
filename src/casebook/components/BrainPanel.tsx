import React from 'react';
import { Brain, Link2, Sparkles, X } from 'lucide-react';
import { SavedClue } from './Caseboard';

interface BrainPanelProps {
  clues: SavedClue[];
  onClose: () => void;
}

const normalize = (value: string) => value.toLowerCase();

const getSignals = (clues: SavedClue[]) => {
  const text = normalize(clues.map((item) => item.clue + ' ' + item.caseTitle).join(' '));
  const signals: { label: string; detail: string; evidence: string }[] = [];

  if (/voice|tone|personality|language/.test(text)) {
    signals.push({
      label: 'VOICE IS DOING WORK',
      detail: 'Multiple clues point toward language and tone being part of how a brand becomes recognizable.',
      evidence: 'Detected from saved clues mentioning voice, tone, personality or language.',
    });
  }
  if (/attention|conversation|share|internet|social/.test(text)) {
    signals.push({
      label: 'ATTENTION IS PART OF THE SYSTEM',
      detail: 'Your saved trail repeatedly touches the gap between publishing something and giving people a reason to talk about it.',
      evidence: 'Detected from saved clues mentioning attention, conversation, sharing, internet or social behaviour.',
    });
  }
  if (/identity|point of view|product|brand/.test(text)) {
    signals.push({
      label: 'PRODUCT IS NOT THE WHOLE STORY',
      detail: 'The collected clues suggest looking at the meaning around an offer, not only the offer itself.',
      evidence: 'Detected from saved clues mentioning identity, point of view, product or brand.',
    });
  }
  if (/customer|habit|behaviour|business model/.test(text)) {
    signals.push({
      label: 'CUSTOMER BEHAVIOUR MATTERS',
      detail: 'Your trail contains clues about changing customer behaviour and the systems built around it.',
      evidence: 'Detected from saved clues mentioning customers, habits, behaviour or business models.',
    });
  }

  return signals.slice(0, 3);
};

export const BrainPanel: React.FC<BrainPanelProps> = ({ clues, onClose }) => {
  const signals = getSignals(clues);

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-[#111111]/95 p-4 md:p-8" role="dialog" aria-modal="true" aria-label="AyuuWorks Brain">
      <div className="mx-auto max-w-6xl border border-[#F2EFE8]/15 bg-[#F2EFE8] text-[#111111]">
        <header className="flex items-center justify-between border-b border-[#111111]/15 p-5 md:p-7">
          <div className="flex items-start gap-4">
            <div className="border border-[#B65B3C] p-3"><Brain className="h-5 w-5 text-[#B65B3C]" /></div>
            <div>
              <p className="font-mono text-[9px] tracking-[0.22em] text-[#B65B3C]">AYUUWORKS / BRAIN</p>
              <h2 className="mt-2 font-display text-4xl font-semibold uppercase tracking-[-0.05em] md:text-6xl">WE NOTICED SOMETHING.</h2>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close Brain" className="border border-[#111111]/15 p-2 hover:border-[#B65B3C]"><X className="h-4 w-4" /></button>
        </header>

        <div className="grid gap-10 p-5 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <aside>
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#B65B3C]">WHAT WE KNOW</p>
            <p className="mt-4 text-sm leading-6 text-[#514c45]">You saved {clues.length} clue{clues.length === 1 ? '' : 's'} from {new Set(clues.map((item) => item.caseId)).size} case{new Set(clues.map((item) => item.caseId)).size === 1 ? '' : 's'}.</p>
            <div className="mt-6 space-y-2">
              {clues.map((clue) => <div key={clue.id} className="border border-[#111111]/15 bg-[#ebe7df] p-3"><p className="font-mono text-[8px] tracking-[0.16em] text-[#6c675e]">CASE / {clue.caseNumber}</p><p className="mt-1 text-xs leading-5">{clue.clue}</p></div>)}
            </div>
          </aside>

          <section>
            <div className="border border-[#111111]/15 bg-[#ebe7df] p-5 md:p-7">
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-[#B65B3C]"><Sparkles className="h-3.5 w-3.5" /> PATTERN LAYER</div>
              {signals.length ? (
                <div className="mt-6 space-y-4">
                  {signals.map((signal) => (
                    <article key={signal.label} className="border-l-2 border-[#B65B3C] bg-[#F2EFE8] p-4">
                      <h3 className="font-display text-xl font-semibold uppercase">{signal.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#514c45]">{signal.detail}</p>
                      <p className="mt-3 font-mono text-[8px] uppercase leading-5 tracking-[0.12em] text-[#7b756c]">{signal.evidence}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-6 border border-dashed border-[#111111]/20 p-6">
                  <p className="font-display text-2xl font-semibold uppercase">NOT ENOUGH SIGNAL YET.</p>
                  <p className="mt-3 text-sm leading-6 text-[#514c45]">Brain ko abhi strong pattern dikh nahi raha. More clues collect karo. Guess karna investigation nahi hai.</p>
                </div>
              )}
            </div>

            <div className="mt-6 border border-[#B65B3C] bg-[#111111] p-6 text-[#F2EFE8]">
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-[#B65B3C]"><Link2 className="h-3.5 w-3.5" /> BRAIN RULE</div>
              <p className="mt-4 font-display text-2xl font-semibold uppercase">NO SCORE. NO FAKE CERTAINTY.</p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D7D0C5]">These are observations generated from the clues you chose to save. They are not objective verdicts, campaign results or a diagnosis of your business.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
