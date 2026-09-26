import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { Smartphone, Monitor, Check, Shield, ZoomIn, ArrowRight, Terminal, Crosshair, Play } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

export const LiveDemoLabScene: React.FC = () => {
  const { session, interactDemo } = useAWE();
  const [activeDemo, setActiveDemo] = useState<'website' | 'brand' | 'showroom' | 'social' | 'concierge'>('website');

  // Website Demo States
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  // Brand Transformation States
  const [brandStyle, setBrandStyle] = useState<'ayuuworks' | 'traditional'>('ayuuworks');

  // Showroom States
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Concierge Funnel States
  const [conciergeStep, setConciergeStep] = useState<1 | 2 | 3>(1);
  const [conciergeData, setConciergeData] = useState({ date: 'November 2026', occasion: 'Royal Destination Wedding' });

  const handleSelectDemo = (demo: any) => {
    soundEngine.playTargetLock();
    setActiveDemo(demo);
    interactDemo(demo);
  };

  return (
    <section id="live-lab" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111]">
      {/* Header in Hinglish with AAA Game HUD label */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <Terminal className="w-3.5 h-3.5 text-[#B65B3C]" />
          <span>LABORATORY · 07 // LIVE PLAYABLE PROTOTYPES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          DEKH KE NAHI.<br />CHALA KE DEKHO.
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          Yahan koi static image ya fake video mockup nahi hai. Har control live operates karta hai: Viewport scale, brand transformation, macro lens aur VIP conversion funnel.
        </p>
      </div>

      {/* Demo Selector Tabs (AAA Game HUD selector) */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#141414] border border-[#242424] rounded-sm max-w-4xl mb-8">
        {[
          { id: 'website', label: '01 / INTERACTIVE FLAGSHIP' },
          { id: 'brand', label: '02 / BRAND TRANSFORMATION' },
          { id: 'showroom', label: '03 / DIGITAL SHOWROOM' },
          { id: 'social', label: '04 / 9-GRID SOCIAL SYSTEM' },
          { id: 'concierge', label: '05 / VIP CONCIERGE FUNNEL' },
        ].map((d) => (
          <button
            key={d.id}
            onClick={() => handleSelectDemo(d.id as any)}
            onMouseEnter={() => soundEngine.playHover()}
            className={`px-4 py-2 rounded-sm text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeDemo === d.id
                ? 'bg-[#F2EFE8] text-[#111111] font-bold shadow-md shadow-[#B65B3C]/10'
                : 'text-[#9B978F] hover:text-[#F2EFE8] hover:bg-[#1c1c1c]'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* DEMO 01: Interactive Website System */}
      {activeDemo === 'website' && (
        <div className="hud-bracket p-6 md:p-8 bg-[#141414] border border-[#242424] rounded-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#242424] pb-4">
            <div>
              <span className="text-xs font-mono text-[#B65B3C] uppercase font-bold">VIEWPORT ENGINE // REAL-TIME RESPONSIVENESS</span>
              <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">
                Toggle framing aur layout density real time mein test karo.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setDeviceMode('desktop');
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-sm border flex items-center gap-1.5 cursor-pointer ${
                  deviceMode === 'desktop' ? 'border-[#B65B3C] text-[#F2EFE8] bg-[#1a1816]' : 'border-[#242424] text-[#9B978F]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop (16:9)</span>
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setDeviceMode('mobile');
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-sm border flex items-center gap-1.5 cursor-pointer ${
                  deviceMode === 'mobile' ? 'border-[#B65B3C] text-[#F2EFE8] bg-[#1a1816]' : 'border-[#242424] text-[#9B978F]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile (9:16)</span>
              </button>
            </div>
          </div>

          {/* Interactive Frame Simulator */}
          <div className="flex justify-center bg-[#0d0d0d] p-6 rounded-sm border border-[#242424] overflow-hidden">
            <div
              className={`transition-all duration-500 rounded-sm border border-[#242424] bg-[#111111] overflow-hidden ${
                deviceMode === 'mobile' ? 'w-72 h-96' : 'w-full max-w-2xl h-80'
              }`}
            >
              {/* Simulated Browser Bar */}
              <div className="px-3 py-1.5 bg-[#181818] border-b border-[#242424] flex items-center justify-between text-[10px] font-mono text-[#9B978F]">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B65B3C]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#242424]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#242424]"></span>
                </div>
                <span>https://ayuuworks.com/flagship</span>
              </div>

              {/* Simulated Content */}
              <div className="p-6 space-y-4">
                <span className="text-[10px] font-mono text-[#B65B3C] uppercase tracking-widest font-bold">
                  AYUUWORKS PROTOTYPE ENGINE
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-display text-[#F2EFE8] leading-tight">
                  HAR EK PIXEL MEIN UNCOMPROMISING PRECISION.
                </h4>
                <p className="text-xs text-[#9B978F] leading-relaxed line-clamp-3">
                  Bespoke digital flagships generous whitespace, razor-sharp typography hierarchy aur sub-100ms response time ke saath deliver kiye jaate hain.
                </p>
                <div className="pt-2 flex gap-3">
                  <span className="px-3 py-1.5 text-[10px] font-mono uppercase bg-[#F2EFE8] text-[#111111] font-bold rounded-sm">
                    EXPLORE WORLD →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEMO 02: Brand Transformation */}
      {activeDemo === 'brand' && (
        <div className="hud-bracket p-6 md:p-8 bg-[#141414] border border-[#242424] rounded-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#242424] pb-4">
            <div>
              <span className="text-xs font-mono text-[#B65B3C] uppercase font-bold">IDENTITY ARCHITECTURE // BEFORE VS AFTER</span>
              <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">
                Dekho kaise positioning ek ordinary brand ko category landmark bana deti hai.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setBrandStyle('traditional');
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-sm border cursor-pointer ${
                  brandStyle === 'traditional' ? 'border-[#B65B3C] text-[#F2EFE8] bg-[#1a1816]' : 'border-[#242424] text-[#9B978F]'
                }`}
              >
                AAM AGENCY TEMPLATE
              </button>
              <button
                onClick={() => {
                  soundEngine.playTargetLock();
                  setBrandStyle('ayuuworks');
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-sm border cursor-pointer ${
                  brandStyle === 'ayuuworks' ? 'border-[#B65B3C] text-[#F2EFE8] bg-[#1a1816]' : 'border-[#242424] text-[#9B978F]'
                }`}
              >
                AYUUWORKS EDITORIAL
              </button>
            </div>
          </div>

          <div className="p-8 rounded-sm border border-[#242424] flex items-center justify-center min-h-[240px] bg-[#0d0d0d]">
            {brandStyle === 'traditional' ? (
              <div className="text-center space-y-3 max-w-md">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  GENERIC TEMPLATE STYLE
                </span>
                <h4 className="text-2xl font-bold text-slate-200">
                  Best Luxury Services & 100% Guaranteed Satisfaction!
                </h4>
                <p className="text-xs text-slate-400">
                  Call today for free consultation and discount coupons.
                </p>
                <button className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs rounded-full">
                  Click Here Now!
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4 max-w-md">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#B65B3C] font-bold">
                  AYUUWORKS EDITORIAL ARCHITECTURE
                </span>
                <h4 className="text-3xl font-black font-display text-[#F2EFE8] tracking-tight">
                  BUILT FOR MEMORY.
                </h4>
                <p className="text-xs text-[#D7D0C5] leading-relaxed">
                  Jab quality mein dum hota hai, toh shor machane ki zaroorat nahi padti. Silent authority earns high-ticket conviction.
                </p>
                <div className="pt-2">
                  <span className="px-5 py-2 border border-[#B65B3C] text-[#F2EFE8] font-mono text-xs uppercase font-bold tracking-wider rounded-sm">
                    ENTER THE ARCHIVE →
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DEMO 03: Digital Showroom */}
      {activeDemo === 'showroom' && (
        <div className="hud-bracket p-6 md:p-8 bg-[#141414] border border-[#242424] rounded-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#242424] pb-4">
            <div>
              <span className="text-xs font-mono text-[#B65B3C] uppercase font-bold">MACRO CRAFT LOUPE // PHYSICAL PROVENANCE</span>
              <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">
                Physical details ko digital screen par zoom in karke test karo.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 4].map((z) => (
                <button
                  key={z}
                  onClick={() => {
                    soundEngine.playClick();
                    setZoomLevel(z);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono rounded-sm border cursor-pointer ${
                    zoomLevel === z ? 'border-[#B65B3C] text-[#F2EFE8] bg-[#1a1816]' : 'border-[#242424] text-[#9B978F]'
                  }`}
                >
                  {z}x Zoom
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 rounded-sm border border-[#242424] bg-[#0d0d0d] flex items-center justify-center overflow-hidden relative">
            <div
              className="transition-transform duration-500 ease-out text-center p-6"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <div className="w-16 h-16 mx-auto mb-2 rounded-full border-2 border-[#B65B3C] flex items-center justify-center">
                <span className="text-xs font-mono font-bold text-[#F2EFE8]">1892</span>
              </div>
              <h5 className="text-sm font-bold font-display text-[#F2EFE8]">HAND-CARVED PALACE MASONRY</h5>
              <p className="text-[10px] text-[#9B978F] font-mono mt-1">24k Gold leaf detailing & tactile sandstone</p>
            </div>

            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#9B978F] bg-[#141414]/90 px-2 py-1 border border-[#242424] rounded-sm">
              OPTICAL LOUPE: {zoomLevel}X ACTIVE
            </div>
          </div>
        </div>
      )}

      {/* DEMO 04: 9-Grid Social System */}
      {activeDemo === 'social' && (
        <div className="hud-bracket p-6 md:p-8 bg-[#141414] border border-[#242424] rounded-sm space-y-6">
          <div className="border-b border-[#242424] pb-4">
            <span className="text-xs font-mono text-[#B65B3C] uppercase font-bold">EDITORIAL GRID ARCHITECTURE // SOCIAL AUTHORITY</span>
            <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">
              Random daily posting band karo. Ek deliberate 9-grid signature aesthetic build karo.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto p-4 bg-[#0d0d0d] rounded-sm border border-[#242424]">
            {[
              'THE MANIFESTO', 'ARCHITECTURAL DEPTH', 'THE FOUNDER',
              'CRAFT ARCHIVE', 'STATEMENT EDITORIAL', 'MATERIAL DETAIL',
              'CLIENT TRANSFORMATION', 'THE BLUEPRINT', 'START THE CHAPTER'
            ].map((title, i) => (
              <div
                key={i}
                className="aspect-square bg-[#161616] border border-[#242424] p-2 flex flex-col justify-between text-left hover:border-[#B65B3C] transition-colors cursor-pointer group"
              >
                <span className="text-[8px] font-mono text-[#9B978F] group-hover:text-[#B65B3C]">0{i + 1}</span>
                <p className="text-[9px] font-bold text-[#D7D0C5] leading-tight group-hover:text-white">{title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DEMO 05: Concierge Funnel */}
      {activeDemo === 'concierge' && (
        <div className="hud-bracket p-6 md:p-8 bg-[#141414] border border-[#242424] rounded-sm space-y-6">
          <div className="border-b border-[#242424] pb-4">
            <span className="text-xs font-mono text-[#B65B3C] uppercase font-bold">HIGH-TICKET VIP CONCIERGE FUNNEL</span>
            <p className="text-sm font-bold text-[#F2EFE8] mt-0.5">
              Cold forms hatao. Private, high-intent qualification pathway deliver karo.
            </p>
          </div>

          <div className="max-w-md mx-auto p-6 bg-[#0d0d0d] border border-[#242424] rounded-sm space-y-4">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#9B978F] border-b border-[#242424] pb-2">
              <span>STEP {conciergeStep} OF 3</span>
              <span className="text-[#B65B3C]">VIP CONCIERGE</span>
            </div>

            {conciergeStep === 1 && (
              <div className="space-y-3">
                <label className="text-xs font-mono text-[#F2EFE8] block">Select Your Occasion:</label>
                {['Royal Destination Wedding', 'Private Heritage Retreat', 'Fine Culinary Residency'].map((occ) => (
                  <button
                    key={occ}
                    onClick={() => {
                      soundEngine.playClick();
                      setConciergeData({ ...conciergeData, occasion: occ });
                      setConciergeStep(2);
                    }}
                    className={`w-full p-3 rounded-sm border text-xs text-left cursor-pointer transition-colors ${
                      conciergeData.occasion === occ ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8]' : 'border-[#242424] text-[#9B978F] hover:text-[#F2EFE8]'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            )}

            {conciergeStep === 2 && (
              <div className="space-y-3">
                <label className="text-xs font-mono text-[#F2EFE8] block">Preferred Timeline:</label>
                {['Q4 2026', 'Early 2027', 'Immediate Confidential'].map((dt) => (
                  <button
                    key={dt}
                    onClick={() => {
                      soundEngine.playTargetLock();
                      setConciergeData({ ...conciergeData, date: dt });
                      setConciergeStep(3);
                    }}
                    className="w-full p-3 rounded-sm border border-[#242424] text-xs text-left text-[#D7D0C5] hover:border-[#B65B3C] hover:text-[#F2EFE8] cursor-pointer"
                  >
                    {dt}
                  </button>
                ))}
              </div>
            )}

            {conciergeStep === 3 && (
              <div className="space-y-3 text-center py-4">
                <div className="w-10 h-10 rounded-full bg-[#B65B3C]/20 border border-[#B65B3C] mx-auto flex items-center justify-center text-[#B65B3C]">
                  ✓
                </div>
                <h5 className="text-sm font-bold text-[#F2EFE8]">PRIVATE CURATION READY</h5>
                <p className="text-xs text-[#9B978F]">
                  Selected: {conciergeData.occasion} ({conciergeData.date})
                </p>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setConciergeStep(1);
                  }}
                  className="text-[10px] font-mono text-[#B65B3C] underline cursor-pointer"
                >
                  Restart Demo Funnel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
