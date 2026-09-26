import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { Sparkles, Eye, Clock, ShieldAlert, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

export const StrategicContrastsScene: React.FC = () => {
  const { session, interactDemo, isReducedMotion } = useAWE();
  const [activeTab, setActiveTab] = useState<'dream' | 'fear' | 'urgency' | 'reputation'>('dream');
  const [dreamSlider, setDreamSlider] = useState<number>(50);

  const handleSliderChange = (val: number) => {
    setDreamSlider(val);
    interactDemo('dream_slider');
  };

  return (
    <section className="relative py-24 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111]">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <span>INSIGHT · 05</span>
          <span>·</span>
          <span>THE STRATEGIC REALITY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          THE PERCEPTION GAP.
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          Four commercial realities about premium business positioning that most founders discover only after wasting marketing budgets.
        </p>
      </div>

      {/* Controller */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#141414] border border-[#242424] rounded max-w-2xl mb-8">
        {[
          { id: 'dream', label: '01 / THE ELEVATION', sub: 'What could be' },
          { id: 'fear', label: '02 / OPPORTUNITY COST', sub: 'The hidden leak' },
          { id: 'urgency', label: '03 / TIME DECAY', sub: 'The cost of waiting' },
          { id: 'reputation', label: '04 / SILENT PERCEPTION', sub: 'The first 5 seconds' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 min-w-[130px] py-2 px-3 rounded text-xs font-mono transition-all text-center cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#F2EFE8] text-[#111111] font-bold shadow-sm'
                : 'text-[#9B978F] hover:text-[#F2EFE8] hover:bg-[#1a1a1a]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 01: THE ELEVATION (Interactive Reveal Slider) */}
      {activeTab === 'dream' && (
        <div className="p-6 md:p-8 bg-[#141414] border border-[#242424] rounded space-y-6">
          <div className="border-b border-[#242424] pb-4">
            <span className="text-xs font-mono uppercase text-[#B65B3C] font-bold">
              WHAT IF YOUR BUSINESS LOOKED AS REFINED AS IT ACTUALLY IS?
            </span>
            <p className="text-sm text-[#D7D0C5] mt-1">
              Drag the tactile comparison slider below to see how ordinary commercial presence elevates into an editorial flagship.
            </p>
          </div>

          {/* Interactive Comparison Split */}
          <div className="relative rounded border border-[#242424] overflow-hidden min-h-[260px] bg-[#111111]">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Left Side: Unrefined */}
              <div
                className="p-6 md:p-8 bg-[#121212] border-b md:border-b-0 md:border-r border-[#242424] flex flex-col justify-between"
                style={{ opacity: 1 - dreamSlider / 140 }}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#9B978F] block mb-1">
                    STATUS QUO / ORDINARY COMMODITY
                  </span>
                  <h4 className="text-lg font-bold font-display text-[#9B978F]">
                    Inconsistent Social Flyers & Cluttered Template
                  </h4>
                  <ul className="mt-4 space-y-2 text-xs text-[#9B978F]">
                    <li>• Constant price haggling on WhatsApp and phone calls</li>
                    <li>• Portfolio looks like an unstructured phone camera album</li>
                    <li>• Ad spend leaks with zero brand recall</li>
                  </ul>
                </div>
                <div className="text-[11px] font-mono text-[#9B978F] pt-4">
                  PERCEIVED VALUE: LOW-TIER COMMODITY
                </div>
              </div>

              {/* Right Side: AyuuWorks Editorial */}
              <div
                className="p-6 md:p-8 bg-[#161514] flex flex-col justify-between"
                style={{ opacity: 0.3 + dreamSlider / 140 }}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#B65B3C] block mb-1 font-bold">
                    AYUUWORKS ELEVATION / EDITORIAL FLAGSHIP
                  </span>
                  <h4 className="text-lg font-bold font-display text-[#F2EFE8]">
                    Museum-Grade Archive & Silent Category Authority
                  </h4>
                  <ul className="mt-4 space-y-2 text-xs text-[#D7D0C5]">
                    <li>• High-net-worth clients arrive pre-sold with zero haggling</li>
                    <li>• Tactile digital lookbook categorized by ceremony and craft</li>
                    <li>• Frictionless 2-step VIP concierge reservation system</li>
                  </ul>
                </div>
                <div className="text-[11px] font-mono text-[#B65B3C] pt-4 font-bold">
                  PERCEIVED VALUE: BENCHMARK REGIONAL LEADER
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Slider Input */}
          <div className="pt-2 flex items-center gap-4">
            <span className="text-xs font-mono text-[#9B978F]">Ordinary</span>
            <input
              type="range"
              min="0"
              max="100"
              value={dreamSlider}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="flex-1 accent-[#B65B3C] cursor-pointer"
            />
            <span className="text-xs font-mono text-[#B65B3C] font-bold">AyuuWorks Editorial ({dreamSlider}%)</span>
          </div>
        </div>
      )}

      {/* TAB 02: OPPORTUNITY COST */}
      {activeTab === 'fear' && (
        <div className="p-6 md:p-8 bg-[#141414] border border-[#242424] rounded space-y-4">
          <span className="text-xs font-mono uppercase text-[#B65B3C] font-bold">
            THE INVISIBLE LEAKAGE
          </span>
          <h4 className="text-xl font-bold font-display text-[#F2EFE8]">
            The most expensive customer is the one who never contacted you.
          </h4>
          <p className="text-sm text-[#D7D0C5] leading-relaxed max-w-2xl">
            When high-value clients evaluate who to trust for their wedding, jewelry heirloom, or commercial project, they quietly review 3 to 4 options on their phones at midnight. If your website looks neglected or amateurish, they silently close the tab. You never receive their enquiry. You never know they existed.
          </p>
        </div>
      )}

      {/* TAB 03: TIME DECAY */}
      {activeTab === 'urgency' && (
        <div className="p-6 md:p-8 bg-[#141414] border border-[#242424] rounded space-y-4">
          <span className="text-xs font-mono uppercase text-[#B65B3C] font-bold">
            WAITING IS AN ACTIVE CHOICE
          </span>
          <h4 className="text-xl font-bold font-display text-[#F2EFE8]">
            Competitors with inferior craft are capturing your market.
          </h4>
          <p className="text-sm text-[#D7D0C5] leading-relaxed max-w-2xl">
            In every regional market, the window to define the benchmark position is short. Once a competitor claims the digital high-ground with superior brand storytelling and customer experience, reclaiming leadership costs ten times more.
          </p>
        </div>
      )}

      {/* TAB 04: SILENT PERCEPTION */}
      {activeTab === 'reputation' && (
        <div className="p-6 md:p-8 bg-[#141414] border border-[#242424] rounded space-y-4">
          <span className="text-xs font-mono uppercase text-[#B65B3C] font-bold">
            THE FIRST FIVE SECONDS
          </span>
          <h4 className="text-xl font-bold font-display text-[#F2EFE8]">
            Reputation is communicated before a single word is read.
          </h4>
          <p className="text-sm text-[#D7D0C5] leading-relaxed max-w-2xl">
            Typography weight, whitespace balance, color restraint, and interface velocity speak directly to the viewer's subconscious. Discerning buyers immediately recognize care and precision — or the lack of it.
          </p>
        </div>
      )}
    </section>
  );
};
