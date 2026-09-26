import React, { useState } from 'react';
import { ArrowRight, Building2, Check, X } from 'lucide-react';

type BusinessType = 'PRODUCT' | 'SERVICE' | 'LOCAL' | 'DIGITAL';

interface ExplorerProps { onClose: () => void; savedClues: number; onStartProject?: (payload: { businessType: BusinessType; businessName: string }) => void; }

const options: { id: BusinessType; title: string; text: string }[] = [
  { id: 'PRODUCT', title: 'PRODUCT BUSINESS', text: 'Physical products, retail, D2C, fashion, jewellery, food products.' },
  { id: 'SERVICE', title: 'SERVICE BUSINESS', text: 'Agencies, consultants, studios, professionals, hospitality.' },
  { id: 'LOCAL', title: 'LOCAL BUSINESS', text: 'A place people visit: café, salon, store, gym, hotel, clinic.' },
  { id: 'DIGITAL', title: 'DIGITAL BUSINESS', text: 'Apps, software, platforms, creators and online-first products.' },
];

const hypotheses: Record<BusinessType, { title: string; body: string; questions: string[] }> = {
  PRODUCT: {
    title: 'PEOPLE MAY NEED A REASON TO CHOOSE YOU.',
    body: 'Product businesses can be compared quickly. Before changing the product itself, investigate how clearly the brand communicates why this product belongs in someone’s world.',
    questions: ['What makes your product recognizable before the name appears?', 'What happens between discovery and purchase?'],
  },
  SERVICE: {
    title: 'THE VALUE MAY BE CLEAR TO YOU, BUT NOT YET TO THE CUSTOMER.',
    body: 'Services are often harder to evaluate before purchase. Investigate how your digital presence turns expertise into something a customer can understand, trust and act on.',
    questions: ['Can a stranger explain what you do after 10 seconds?', 'What proof reduces hesitation?'],
  },
  LOCAL: {
    title: 'THE EXPERIENCE STARTS BEFORE THE DOOR.',
    body: 'For a local business, discovery, location, visual identity, reviews, content and the in-person experience can form one customer journey. Investigate where that journey loses momentum.',
    questions: ['What does someone see before deciding to visit?', 'Does the online experience match the real place?'],
  },
  DIGITAL: {
    title: 'THE PRODUCT MAY BE DIGITAL. THE TRUST JOURNEY IS NOT.',
    body: 'Digital businesses compete for attention and confidence in the same screen. Investigate the story, proof and experience surrounding the product, not only the interface.',
    questions: ['Why should someone trust this before trying it?', 'Where does curiosity turn into action?'],
  },
};

export const BusinessExplorer: React.FC<ExplorerProps> = ({ onClose, savedClues, onStartProject }) => {
  const [type, setType] = useState<BusinessType | null>(null);
  const [step, setStep] = useState<'intro' | 'type' | 'hypothesis'>('intro');
  const [name, setName] = useState('');

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#111111]/95 p-4 md:p-8" role="dialog" aria-modal="true" aria-label="Explore your business">
      <div className="mx-auto max-w-5xl border border-[#F2EFE8]/15 bg-[#F2EFE8] text-[#111111]">
        <header className="flex items-center justify-between border-b border-[#111111]/15 p-5 md:p-7">
          <div>
            <p className="font-mono text-[9px] tracking-[0.22em] text-[#B65B3C]">CASEBOOK / YOUR BUSINESS</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em]">AWE BUSINESS EXPLORER</p>
          </div>
          <button onClick={onClose} aria-label="Close explorer" className="border border-[#111111]/15 p-2 hover:border-[#B65B3C]"><X className="h-4 w-4" /></button>
        </header>

        <div className="p-5 md:p-10">
          {step === 'intro' && (
            <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
              <div>
                <p className="font-mono text-[9px] tracking-[0.22em] text-[#B65B3C]">DON'T DIAGNOSE. EXPLORE.</p>
                <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.88] tracking-[-0.06em] md:text-8xl">AB YEHI LENS APNE BUSINESS PE LAGAO.</h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#514c45]">Casebook se jo clues tumne collect kiye, unhe apne business ke context mein dekhte hain. 30 seconds. No score. No forced sales pitch.</p>
                <button onClick={() => setStep('type')} className="mt-8 inline-flex items-center gap-3 bg-[#111111] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F2EFE8] hover:bg-[#B65B3C]">START EXPLORING <ArrowRight className="h-4 w-4" /></button>
              </div>
              <div className="border border-[#111111]/15 bg-[#ebe7df] p-6">
                <Building2 className="h-6 w-6 text-[#B65B3C]" />
                <p className="mt-6 font-display text-2xl font-semibold uppercase">YOUR TRAIL</p>
                <p className="mt-2 text-sm leading-6 text-[#5b574f]">{savedClues} saved clue{savedClues === 1 ? '' : 's'} ready to bring into the investigation.</p>
              </div>
            </div>
          )}

          {step === 'type' && (
            <div>
              <p className="font-mono text-[9px] tracking-[0.22em] text-[#B65B3C]">01 / BUSINESS TYPE</p>
              <h2 className="mt-3 font-display text-4xl font-semibold uppercase tracking-[-0.04em] md:text-6xl">TUM KYA BUILD KAR RAHE HO?</h2>
              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {options.map((option) => (
                  <button key={option.id} onClick={() => { setType(option.id); setStep('hypothesis'); }} className="border border-[#111111]/15 p-5 text-left hover:border-[#B65B3C] hover:bg-[#ebe7df]">
                    <p className="font-mono text-[9px] tracking-[0.16em] text-[#B65B3C]">{option.id}</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold uppercase">{option.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5b574f]">{option.text}</p>
                  </button>
                ))}
              </div>
              <label className="mt-7 block">
                <span className="font-mono text-[9px] tracking-[0.16em] text-[#6b665d]">OPTIONAL / BUSINESS NAME</span>
                <input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Your Studio" className="mt-2 w-full border border-[#111111]/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-[#B65B3C]" />
              </label>
            </div>
          )}

          {step === 'hypothesis' && type && (
            <div className="max-w-4xl">
              <p className="font-mono text-[9px] tracking-[0.22em] text-[#B65B3C]">02 / FIRST HYPOTHESIS</p>
              <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">{name ? name + ': ' : ''}{hypotheses[type].title}</h2>
              <p className="mt-7 text-lg leading-8 text-[#514c45]">{hypotheses[type].body}</p>
              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {hypotheses[type].questions.map((question) => <div key={question} className="border-l-2 border-[#B65B3C] bg-[#ebe7df] p-5"><Check className="h-4 w-4 text-[#B65B3C]" /><p className="mt-3 text-sm leading-6">{question}</p></div>)}
              </div>
              <div className="mt-8 border border-[#B65B3C] bg-[#111111] p-6 text-[#F2EFE8]">
                <p className="font-mono text-[9px] tracking-[0.2em] text-[#B65B3C]">AYUUWORKS / WORKING HYPOTHESIS</p>
                <p className="mt-3 text-sm leading-6 text-[#D7D0C5]">This is a starting question, not a diagnosis. Real recommendations need real business context, customer evidence and a conversation.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
