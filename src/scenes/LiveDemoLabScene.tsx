import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { Smartphone, Monitor, Check, Shield, ZoomIn, ArrowRight } from 'lucide-react';

export const LiveDemoLabScene: React.FC = () => {
  const { session, interactDemo } = useAWE();
  const [activeDemo, setActiveDemo] = useState<'website' | 'brand' | 'showroom' | 'social' | 'concierge'>('website');

  // Website Demo States
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [densityMode, setDensityMode] = useState<'editorial' | 'compact'>('editorial');

  // Brand Transformation States
  const [brandStyle, setBrandStyle] = useState<'ayuuworks' | 'traditional'>('ayuuworks');

  // Showroom States
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Concierge Funnel States
  const [conciergeStep, setConciergeStep] = useState<1 | 2 | 3>(1);
  const [conciergeData, setConciergeData] = useState({ date: 'November 2026', occasion: 'Bridal Celebration' });

  const handleSelectDemo = (demo: any) => {
    setActiveDemo(demo);
    interactDemo(demo);
  };

  return (
    <section id="live-lab" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111]">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <span>LABORATORY · 07</span>
          <span>·</span>
          <span>FUNCTIONAL PROTOTYPES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          DON'T JUST LOOK.<br />TRY IT.
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          Test real interface systems, typography scaling, macro craft loupes and conversion funnels. Every control operates live.
        </p>
      </div>

      {/* Demo Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#141414] border border-[#242424] rounded max-w-4xl mb-8">
        {[
          { id: 'website', label: '01 / INTERACTIVE WEBSITE' },
          { id: 'brand', label: '02 / BRAND TRANSFORMATION' },
          { id: 'showroom', label: '03 / DIGITAL SHOWROOM' },
          { id: 'social', label: '04 / 9-GRID SOCIAL SYSTEM' },
          { id: 'concierge', label: '05 / CONCIERGE FUNNEL' },
        ].map((d) => (
          <button
            key={d.id}
            onClick={() => handleSelectDemo(d.id as any)}
            className={`px-4 py-2 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeDemo === d.id
                ? 'bg-[#F2EFE8] text-[#111111] font-bold shadow-sm'
                : 'text-[#9B978F] hover:text-[#F2EFE8] hover:bg-[#1c1c1c]'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* DEMO 01: Interactive Website System */}
      {activeDemo === 'website' && (
        <div className="p-6 md:p-8 bg-[#141414] border border-[#242424] rounded space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#242424] pb-4">
            <div>
              <span className="text-xs font-mono text-[#B65B3C] uppercase">LAYOUT ARCHITECTURE</span>
              <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">
                Toggle viewport framing and layout density in real time.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`px-3 py-1.5 text-xs rounded border flex items-center gap-1.5 cursor-pointer ${
                  deviceMode === 'desktop' ? 'border-[#B65B3C] text-[#F2EFE8] bg-[#1a1816]' : 'border-[#242424] text-[#9B978F]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop (16:9)</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`px-3 py-1.5 text-xs rounded border flex items-center gap-1.5 cursor-pointer ${
                  deviceMode === 'mobile' ? 'border-[#B65B3C] text-[#F2EFE8] bg-[#1a1816]' : 'border-[#242424] text-[#9B978F]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile (9:16)</span>
              </button>
            </div>
          </div>

          {/* Interactive Frame Simulator */}
          <div className="flex justify-center bg-[#0d0d0d] p-6 rounded border border-[#242424] overflow-hidden">
            <div
              className={`transition-all duration-500 rounded border border-[#242424] bg-[#111111] overflow-hidden ${
                deviceMode === 'mobile' ? 'w-72 h-96' : 'w-full max-w-2xl h-80'
              }`}
            >
              {/* Simulated Browser Bar */}
              <div className="px-3 py-1.5 bg-[#181818] border-b border-[#242424] flex items-center justify-between text-[10px] font-mono text-[#9B978F]">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#242424]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#242424]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#242424]"></span>
                </div>
                <span>https://ayuuworks.com/flagship</span>
              </div>

              {/* Simulated Content */}
              <div className="p-6 space-y-4">
                <span className="text-[10px] font-mono text-[#B65B3C] uppercase tracking-widest">
                  AYUUWORKS PROTOTYPE
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-display text-[#F2EFE8] leading-tight">
                  UNCOMPROMISING PRECISION IN EVERY PIXEL.
                </h4>
                <p className="text-xs text-[#9B978F] leading-relaxed line-clamp-3">
                  A bespoke digital flagship balances generous whitespace, razor-sharp typography hierarchy, and sub-100ms response times.
                </p>
                <div className="pt-2 flex gap-3">
                  <span className="px-3 py-1.5 text-[10px] font-mono uppercase bg-[#F2EFE8] text-[#111111] font-bold rounded">
                    EXPLORE COLLECTION
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEMO 02: Brand Transformation */}
      {activeDemo === 'brand' && (
        <div className="p-6 md:p-8 bg-[#141414] border border-[#242424] rounded space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#242424] pb-4">
            <div>
              <span className="text-xs font-mono text-[#B65B3C] uppercase">PERCEPTION ENGINE</span>
              <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">
                Toggle between commodity marketing and AyuuWorks editorial direction.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setBrandStyle('traditional')}
                className={`px-3 py-1.5 text-xs rounded border cursor-pointer ${
                  brandStyle === 'traditional' ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8]' : 'border-[#242424] text-[#9B978F]'
                }`}
              >
                Commodity Template
              </button>
              <button
                onClick={() => setBrandStyle('ayuuworks')}
                className={`px-3 py-1.5 text-xs rounded border cursor-pointer ${
                  brandStyle === 'ayuuworks' ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8]' : 'border-[#242424] text-[#9B978F]'
                }`}
              >
                AyuuWorks Editorial
              </button>
            </div>
          </div>

          <div
            className={`p-8 rounded border transition-all duration-500 ${
              brandStyle === 'ayuuworks'
                ? 'bg-[#111111] border-[#B65B3C] text-[#F2EFE8]'
                : 'bg-[#1e1b18] border-[#383838] text-yellow-100'
            }`}
          >
            <div className="max-w-xl mx-auto space-y-4 text-center">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#B65B3C]">
                {brandStyle === 'ayuuworks' ? 'EST. 1892 · ROYAL PALACE RETREAT' : 'SPECIAL DISCOUNT SALE TODAY!!'}
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#F2EFE8]">
                {session.businessName || 'THE GRAND HAVELI ESTATE'}
              </h3>

              <p className="text-xs sm:text-sm text-[#9B978F] leading-relaxed max-w-md mx-auto">
                {brandStyle === 'ayuuworks'
                  ? 'A private royal heritage destination dedicated to bespoke hospitality, experiential dining, and architectural serenity.'
                  : 'Call us now for 20% off on all weekend bookings! Hurry up, limited rooms left near highway.'}
              </p>

              <div className="pt-2">
                <span className="inline-block px-5 py-2 text-xs font-mono uppercase rounded bg-[#F2EFE8] text-[#111111] font-bold">
                  {brandStyle === 'ayuuworks' ? 'EXPLORE ARCHIVE' : 'CALL NOW: 9876543210'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEMO 03: Digital Showroom Loupe */}
      {activeDemo === 'showroom' && (
        <div className="p-6 md:p-8 bg-[#141414] border border-[#242424] rounded space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#242424] pb-4">
            <div>
              <span className="text-xs font-mono text-[#B65B3C] uppercase">TACTILE CRAFT INSPECTOR</span>
              <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">
                Simulate high-resolution hallmark verification and macro filigree zoom.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 4].map((z) => (
                <button
                  key={z}
                  onClick={() => setZoomLevel(z)}
                  className={`px-3 py-1 text-xs rounded border cursor-pointer ${
                    zoomLevel === z ? 'border-[#B65B3C] text-[#B65B3C] bg-[#1a1816]' : 'border-[#242424] text-[#9B978F]'
                  }`}
                >
                  {z}x Loupe
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-64 md:h-72 bg-[#0c0c0c] border border-[#242424] rounded flex items-center justify-center overflow-hidden">
            <div
              className="transition-transform duration-500 ease-out text-center p-6"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#242424] via-[#333333] to-[#B65B3C] shadow-lg flex items-center justify-center border-2 border-[#111111]">
                <Shield className="w-8 h-8 text-[#F2EFE8]" />
              </div>
              <p className="text-xs font-mono font-bold text-[#B65B3C] mt-3">
                BIS 916 HALLMARK · CERTIFIED 22KT
              </p>
              <p className="text-[10px] font-mono text-[#9B978F]">ARCHIVE REF: AYU-GH-892</p>
            </div>

            <div className="absolute bottom-3 left-3 bg-[#111111]/90 px-3 py-1 rounded border border-[#242424] text-[11px] font-mono text-[#9B978F]">
              ZOOM: {zoomLevel}x · TACTILE RESOLUTION 4K
            </div>
          </div>
        </div>
      )}

      {/* DEMO 04: Social Creative 9-Grid */}
      {activeDemo === 'social' && (
        <div className="p-6 md:p-8 bg-[#141414] border border-[#242424] rounded space-y-6">
          <div className="border-b border-[#242424] pb-4">
            <span className="text-xs font-mono text-[#B65B3C] uppercase">THE 9-GRID EDITORIAL FORMULA</span>
            <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">
              Arranging social touchpoints as an editorial lookbook instead of random sales flyers.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
            {[
              { type: 'ARCHIVE', label: 'Raw Gold Pouring Video' },
              { type: 'PORTRAIT', label: 'Bridal Polki Editorial' },
              { type: 'QUOTE', label: '"Trust is not Discounted"' },
              { type: 'HERITAGE', label: 'Third-Gen Karigar Portrait' },
              { type: 'FLAGSHIP', label: 'Showroom Chandelier Walk' },
              { type: 'DETAILS', label: 'Emerald Setting Macro' },
              { type: 'CONCIERGE', label: 'Private Viewing Slots Open' },
              { type: 'TROUSSEAU', label: 'Matching Choker & Nath' },
              { type: 'LEGACY', label: '45-Year Hallmark Promise' },
            ].map((cell, idx) => (
              <div
                key={idx}
                className="aspect-square bg-[#111111] border border-[#242424] rounded p-2 flex flex-col justify-between hover:border-[#B65B3C] transition-colors"
              >
                <span className="text-[8px] font-mono text-[#B65B3C]">{cell.type}</span>
                <p className="text-[9px] font-bold text-[#D7D0C5] leading-tight">{cell.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DEMO 05: Concierge Inquiry Funnel */}
      {activeDemo === 'concierge' && (
        <div className="p-6 md:p-8 bg-[#141414] border border-[#242424] rounded space-y-6">
          <div className="border-b border-[#242424] pb-4">
            <span className="text-xs font-mono text-[#B65B3C] uppercase">FRICTIONLESS CONCIERGE FUNNEL</span>
            <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">
              A 2-step direct VIP scheduling simulation with zero cognitive friction.
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            {conciergeStep === 1 ? (
              <div className="space-y-4 p-5 rounded border border-[#242424] bg-[#111111]">
                <span className="text-xs font-mono text-[#B65B3C]">STEP 01 / OCCASION TIMELINE</span>
                <div>
                  <label className="text-xs text-[#9B978F] block mb-1">Target Occasion Month</label>
                  <select
                    value={conciergeData.date}
                    onChange={(e) => setConciergeData({ ...conciergeData, date: e.target.value })}
                    className="w-full p-2.5 rounded bg-[#181818] border border-[#242424] text-xs text-[#F2EFE8]"
                  >
                    <option>November 2026</option>
                    <option>December 2026</option>
                    <option>Early 2027</option>
                  </select>
                </div>
                <button
                  onClick={() => setConciergeStep(2)}
                  className="w-full py-2.5 rounded bg-[#F2EFE8] text-[#111111] text-xs font-semibold uppercase hover:bg-[#B65B3C] hover:text-[#F2EFE8] transition-colors"
                >
                  CONTINUE TO VIP CONCIERGE →
                </button>
              </div>
            ) : (
              <div className="space-y-4 p-5 rounded border border-[#B65B3C] bg-[#161413] text-center">
                <span className="text-xs font-mono text-[#B65B3C]">STEP 02 / CONFIRMED PRIORITY</span>
                <p className="text-sm font-bold text-[#F2EFE8]">
                  Private Viewing Request Prepared
                </p>
                <p className="text-xs text-[#9B978F]">
                  Selected: {conciergeData.occasion} · {conciergeData.date}
                </p>
                <button
                  onClick={() => setConciergeStep(1)}
                  className="text-xs font-mono text-[#9B978F] hover:text-[#F2EFE8] underline"
                >
                  ← Reset Demo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
