import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { Sparkles, Eye, Clock, ShieldAlert, ArrowRight, CheckCircle, XCircle, Terminal, Crosshair } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

export const StrategicContrastsScene: React.FC = () => {
  const { session, interactDemo, isReducedMotion } = useAWE();
  const [activeTab, setActiveTab] = useState<'dream' | 'fear' | 'urgency' | 'reputation'>('dream');
  const [dreamSlider, setDreamSlider] = useState<number>(50);

  const handleSliderChange = (val: number) => {
    setDreamSlider(val);
    interactDemo('dream_slider');
  };

  const handleTabChange = (tab: 'dream' | 'fear' | 'urgency' | 'reputation') => {
    soundEngine.playTargetLock();
    setActiveTab(tab);
  };

  return (
    <section className="relative py-24 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111]">
      {/* Header in Hinglish with AAA Game HUD Tag */}
      <div className="max-w-3xl mb-12 gsap-reveal-target">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <Terminal className="w-3.5 h-3.5 text-[#B65B3C]" />
          <span>INSIGHT · 05 // THE STRATEGIC REALITY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          THE PERCEPTION GAP.<br />
          <span className="text-[#D7D0C5]">ASLIAT AUR SCREEN KA FAASLA.</span>
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          Premium business positioning ke chaar hard-hitting sach, jo zyadatar founders tab realise karte hain jab marketing budgets barbaad ho chuke hote hain.
        </p>
      </div>

      {/* AAA Game HUD Controller Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#141414] border border-[#242424] rounded-sm max-w-3xl mb-8">
        {[
          { id: 'dream', label: '01 / THE ELEVATION', sub: 'Aapka potential' },
          { id: 'fear', label: '02 / OPPORTUNITY COST', sub: 'Chhupa hua leakage' },
          { id: 'urgency', label: '03 / TIME DECAY', sub: 'Wait karne ka damage' },
          { id: 'reputation', label: '04 / SILENT PERCEPTION', sub: 'Pehle 5 seconds' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as any)}
            onMouseEnter={() => soundEngine.playHover()}
            className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-sm text-xs font-mono tracking-wider transition-all text-center cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#F2EFE8] text-[#111111] font-bold shadow-md shadow-[#B65B3C]/10'
                : 'text-[#9B978F] hover:text-[#F2EFE8] hover:bg-[#1a1a1a]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 01: THE ELEVATION (Interactive Reveal Slider in Hinglish) */}
      {activeTab === 'dream' && (
        <div className="hud-bracket p-6 md:p-8 bg-[#141414] border border-[#242424] rounded-sm space-y-6">
          <div className="border-b border-[#242424] pb-4">
            <span className="text-xs font-mono uppercase text-[#B65B3C] font-bold">
              KASAM SE, AGAR AAPKA BUSINESS UTNA HI REFINED DIKHTA JITNA ASAL MEIN HAI?
            </span>
            <p className="text-sm text-[#D7D0C5] mt-1">
              Neeche diye interactive slider ko drag karo aur dekho kaise ek aam local business editorial flagship mein convert hota hai.
            </p>
          </div>

          {/* Interactive Comparison Split */}
          <div className="relative rounded-sm border border-[#242424] overflow-hidden min-h-[260px] bg-[#0d0d0d]">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Left Side: Unrefined */}
              <div
                className="p-6 md:p-8 bg-[#121212] border-b md:border-b-0 md:border-r border-[#242424] flex flex-col justify-between"
                style={{ opacity: 1 - dreamSlider / 140 }}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#9B978F] block mb-1">
                    STATUS QUO // AAM COMMODITY MARKET
                  </span>
                  <h4 className="text-lg font-bold font-display text-[#9B978F]">
                    Inconsistent Social Flyers & Cluttered Template
                  </h4>
                  <ul className="mt-4 space-y-2 text-xs text-[#9B978F]">
                    <li>• WhatsApp aur phone par customer lagatar discount maangte hain</li>
                    <li>• Portfolio dekh ke lagta hai jaise kisi ne raw phone camera photos daal di hon</li>
                    <li>• Ad spend pe hazaron lagte hain, lekin brand recall zero rehti hai</li>
                  </ul>
                </div>
                <div className="text-[11px] font-mono text-[#9B978F] pt-4 border-t border-[#242424]/60">
                  PERCEIVED VALUE: LOW-TIER COMMODITY (PRICE WAR)
                </div>
              </div>

              {/* Right Side: AyuuWorks Editorial */}
              <div
                className="p-6 md:p-8 bg-[#161514] flex flex-col justify-between"
                style={{ opacity: 0.3 + dreamSlider / 140 }}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#B65B3C] block mb-1 font-bold">
                    AYUUWORKS ELEVATION // EDITORIAL FLAGSHIP
                  </span>
                  <h4 className="text-lg font-bold font-display text-[#F2EFE8]">
                    Museum-Grade Archive & Silent Category Authority
                  </h4>
                  <ul className="mt-4 space-y-2 text-xs text-[#D7D0C5]">
                    <li>• High-net-worth clients bina bargaining ke pehle se convinced aate hain</li>
                    <li>• Tactile digital lookbook jo heritage, craft aur ceremony ko screen par utare</li>
                    <li>• Frictionless 2-step VIP concierge jo qualified buyers ko seamlessly close kare</li>
                  </ul>
                </div>
                <div className="text-[11px] font-mono text-[#B65B3C] pt-4 font-bold border-t border-[#242424]/60">
                  PERCEIVED VALUE: BENCHMARK REGIONAL LEADER (PRICING POWER)
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Slider Input */}
          <div className="pt-2 flex items-center gap-4">
            <span className="text-xs font-mono text-[#9B978F]">Aam Commodity (0%)</span>
            <input
              type="range"
              min="0"
              max="100"
              value={dreamSlider}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="flex-1 accent-[#B65B3C] cursor-pointer h-2 bg-[#242424] rounded-none"
            />
            <span className="text-xs font-mono text-[#B65B3C] font-bold">AyuuWorks Editorial ({dreamSlider}%)</span>
          </div>
        </div>
      )}

      {/* TAB 02: OPPORTUNITY COST in Hinglish */}
      {activeTab === 'fear' && (
        <div className="hud-bracket p-6 md:p-8 bg-[#141414] border border-[#242424] rounded-sm space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#B65B3C]" />
            <span className="text-xs font-mono uppercase text-[#B65B3C] font-bold">
              THE INVISIBLE LEAKAGE // CHHUPA HUA NUKSAAN
            </span>
          </div>
          <h4 className="text-xl sm:text-2xl font-bold font-display text-[#F2EFE8]">
            Sabse mehenga customer woh hai jo aapse bina contact kiye nikal gaya.
          </h4>
          <p className="text-sm text-[#D7D0C5] leading-relaxed max-w-3xl">
            Jab koi HNI ya ultra-luxury buyer shaadi, jewellery ya premium real-estate ke liye options dhoondhta hai, toh woh raat ko apne phone par 3-4 brands silently scroll karta hai. Agar aapki digital presence outdated, generic ya amatuerish lagti hai — toh woh tab chupchaap close kar deta hai. Na enquiry aayi, na call aaya. Aapko pata bhi nahi chala ki kitne laakh ka client haath se chala gaya.
          </p>
          <div className="pt-4 border-t border-[#242424] flex items-center gap-2 text-xs font-mono text-[#9B978F]">
            <Crosshair className="w-3.5 h-3.5 text-[#B65B3C]" />
            <span>DIAGNOSIS: POOR DIGITAL PRESENCE SILENTLY KILLS 70% HIGH-INTENT LEADS</span>
          </div>
        </div>
      )}

      {/* TAB 03: TIME DECAY in Hinglish */}
      {activeTab === 'urgency' && (
        <div className="hud-bracket p-6 md:p-8 bg-[#141414] border border-[#242424] rounded-sm space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#B65B3C]" />
            <span className="text-xs font-mono uppercase text-[#B65B3C] font-bold">
              WAIT KARNA EK ACTIVE EXPENSIVE CHOICE HAI
            </span>
          </div>
          <h4 className="text-xl sm:text-2xl font-bold font-display text-[#F2EFE8]">
            Kamzor craft wale competitors aapka market capture kar rahe hain.
          </h4>
          <p className="text-sm text-[#D7D0C5] leading-relaxed max-w-3xl">
            Har regional aur national market mein category benchmark banne ka ek limited window hota hai. Jab koi competitor behtar visual storytelling, superior website aur smooth digital experience ke saath market mein claim kar leta hai, toh baad mein unhe overtake karna 10 guna zyada mehenga aur mushkil ho jaata hai.
          </p>
          <div className="pt-4 border-t border-[#242424] flex items-center gap-2 text-xs font-mono text-[#9B978F]">
            <Crosshair className="w-3.5 h-3.5 text-[#B65B3C]" />
            <span>SPEED OF REPOSITIONING DECIDES WHO OWNS THE CATEGORY</span>
          </div>
        </div>
      )}

      {/* TAB 04: SILENT PERCEPTION in Hinglish */}
      {activeTab === 'reputation' && (
        <div className="hud-bracket p-6 md:p-8 bg-[#141414] border border-[#242424] rounded-sm space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#B65B3C]" />
            <span className="text-xs font-mono uppercase text-[#B65B3C] font-bold">
              PEHLE 5 SECONDS MEIN FAISLA HO JAATA HAI
            </span>
          </div>
          <h4 className="text-xl sm:text-2xl font-bold font-display text-[#F2EFE8]">
            Brand ki aukaat pehla lafz padhne se pehle communicate ho jaati hai.
          </h4>
          <p className="text-sm text-[#D7D0C5] leading-relaxed max-w-3xl">
            Typography ka wazan, screen ka balance, colors ki maturity aur speed seedhe buyer ke subconscious mind se baat karte hain. Classy aur discerning buyers pehle glance mein hi dekh lete hain ki kaam mein kitni precision hai — ya kitna compromised shortcut liya gaya hai.
          </p>
          <div className="pt-4 border-t border-[#242424] flex items-center gap-2 text-xs font-mono text-[#9B978F]">
            <Crosshair className="w-3.5 h-3.5 text-[#B65B3C]" />
            <span>AUTHORITY IS NON-VERBAL. IT IS FELT BEFORE IT IS UNDERSTOOD.</span>
          </div>
        </div>
      )}
    </section>
  );
};
