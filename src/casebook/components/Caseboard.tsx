import React from 'react';
import { Link2, Pin, Trash2, X } from 'lucide-react';

export interface SavedClue {
  id: string;
  caseId: string;
  caseNumber: string;
  caseTitle: string;
  clue: string;
}

interface CaseboardProps {
  clues: SavedClue[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

export const Caseboard: React.FC<CaseboardProps> = ({ clues, onRemove, onClose }) => {
  const connected = clues.length >= 2;

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-[#111111]/95 p-4 md:p-8" role="dialog" aria-modal="true" aria-label="AyuuWorks Caseboard">
      <div className="mx-auto min-h-[80vh] max-w-7xl border border-[#F2EFE8]/15 bg-[#F2EFE8] text-[#111111]">
        <header className="flex items-center justify-between border-b border-[#111111]/15 p-5 md:p-7">
          <div>
            <p className="font-mono text-[9px] tracking-[0.22em] text-[#B65B3C]">AYUUWORKS / CASEBOARD</p>
            <h2 className="mt-2 font-display text-4xl font-semibold uppercase tracking-[-0.05em] md:text-6xl">YOUR CLUES.</h2>
          </div>
          <button onClick={onClose} aria-label="Close Caseboard" className="border border-[#111111]/15 p-2 hover:border-[#B65B3C]"><X className="h-4 w-4" /></button>
        </header>

        <div className="p-5 md:p-8">
          {clues.length === 0 ? (
            <div className="grid min-h-[45vh] place-items-center border border-dashed border-[#111111]/20 p-8 text-center">
              <div>
                <Pin className="mx-auto h-8 w-8 opacity-40" />
                <p className="mt-5 font-display text-2xl font-semibold uppercase">CASEBOARD ABHI KHAALI HAI.</p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#5b574f]">Case kholo, clues discover karo, phir unhe yahan pin karo. Board tumhare investigation trail ko remember karega.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-end justify-between border-b border-[#111111]/15 pb-4">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] text-[#B65B3C]">PINNED EVIDENCE</p>
                  <p className="mt-2 text-sm text-[#5b574f]">{clues.length} clue{clues.length === 1 ? '' : 's'} collected.</p>
                </div>
                {connected && <div className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#B65B3C]"><Link2 className="h-4 w-4" /> Pattern Found</div>}
              </div>

              <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
                {clues.map((item, index) => (
                  <article key={item.id} className="mb-5 break-inside-avoid border border-[#111111]/15 bg-[#ebe7df] p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] tracking-[0.18em] text-[#B65B3C]">CLUE / {String(index + 1).padStart(2, '0')}</span>
                      <button onClick={() => onRemove(item.id)} aria-label="Remove clue" className="opacity-50 hover:text-[#B65B3C] hover:opacity-100"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                    <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.16em] text-[#6c675e]">CASE / {item.caseNumber}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold uppercase leading-tight">{item.caseTitle}</h3>
                    <div className="mt-5 border-l-2 border-[#B65B3C] bg-[#F2EFE8] p-4">
                      <p className="text-sm leading-6">{item.clue}</p>
                    </div>
                  </article>
                ))}
              </div>

              {connected && (
                <div className="mt-8 border border-[#B65B3C] bg-[#111111] p-6 text-[#F2EFE8] md:p-8">
                  <p className="font-mono text-[9px] tracking-[0.2em] text-[#B65B3C]">BRAIN PREVIEW</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold uppercase tracking-[-0.03em]">ALAG CASES. EK QUESTION.</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D7D0C5]">Tumne multiple cases se clues collect kiye hain. Stage 05 mein Brain in collected clues ke beech meaningful patterns surface karega. Abhi koi score ya forced verdict nahi.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
