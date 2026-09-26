import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { ArrowRight, ChevronRight, Crosshair, Terminal } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

interface CuriosityCard {
  id: string;
  question: string;
  subtext: string;
  insight: string;
  system: 'ATTENTION' | 'PERCEPTION' | 'TRUST' | 'ACTION';
}

const CURIOSITY_QUESTIONS: CuriosityCard[] = [
  {
    id: 'seeing',
    question: 'LOG AAPKO DEKH TOH RAHE HAIN, PAR YAAD KYUN NAHI REH RAHE?',
    subtext: 'Aapke business mein craft, quality aur dedication hai. Par screen par kya deliver ho raha hai?',
    insight: 'Zyadatar businesses ek silent translation loss se suffer karte hain: Reality mein 10/10 offline operation, par online 3/10 generic template. Jab aapka digital presence aam lagta hai, toh customer maan leta hai ki aapka product bhi ordinary hoga.',
    system: 'PERCEPTION',
  },
  {
    id: 'remembered',
    question: 'KUCH HI BRANDS LOGON KE DIMAAG MEIN GHAR KYUN KARTE HAIN?',
    subtext: 'Dozens of competitors ads par lakho kharch karte hain, par yaad sirf ek ya do hi rehte hain.',
    insight: 'Yaad rehna ad frequency se nahi, distinctiveness aur sharp positioning se hota hai. Jo brands ek bold, clear stance lete hain woh landmark ban jaate hain; jo sabko khush karne nikalte hain woh invisible background noise ban jaate hain.',
    system: 'ATTENTION',
  },
  {
    id: 'beautiful-fail',
    question: 'SUNDAR WEBSITE BHI CONVERT KYUN NAHI KARTI?',
    subtext: 'High-end aesthetic awards, par sales aur revenue zero.',
    insight: 'Website chahe kitni bhi fancy animations wali ho, agar visitor pehle 5 seconds mein yeh nahi samjha ki aap kya solve karte ho, kiske liye ho, aur kyun believe karein — toh woh bina enquiry kare tab close karke nikal jaata hai.',
    system: 'ACTION',
  },
  {
    id: 'attention-disappear',
    question: 'ATTENTION KAHAN GAYAB HO JAATI HAI?',
    subtext: '10,000 log profile ya landing page par aate hain, par enquiry sirf 5 aati hain.',
    insight: 'Attention humesha joints pe leak hoti hai: Ad aur website ke tone ka mismatch, lamba boring form, ya strong social proof ka gayab hona. Hum is friction point ko systematically map karke eliminate karte hain.',
    system: 'ACTION',
  },
  {
    id: 'before-choosing',
    question: 'CUSTOMER KISI AUR KO CHUNNE SE PEHLE KYA SOCHTA HAI?',
    subtext: 'Ek high-intent client ke dimaag ka internal dialogue call karne se pehle.',
    insight: 'Poochne se pehle ki "Rate kya hai?", client sochta hai: "Kya yeh log mere standard ko samajhte hain? Kya inka kaam durable hai? Risk toh nahi hai?" Trust pehle build hota hai, transaction baad mein hoti hai.',
    system: 'TRUST',
  },
  {
    id: 'fix-first',
    question: 'AGAR AAJ APNE BUSINESS KO FIX KARNA HO, TOH PEHLE KYA THEEK KAROGE?',
    subtext: 'Aur Meta ads run karein? Naya logo banayein? Ya core positioning ko re-architect karein?',
    insight: 'Zyadatar founders sirf surface symptom theek karte hain (ads badhana) jabki main issue brand conviction aur perception mein hota hai. Foundation theek kar do, har aage ka rupee 5x return deta hai.',
    system: 'PERCEPTION',
  },
];

export const CuriosityScene: React.FC = () => {
  const { trackEvent, isReducedMotion } = useAWE();
  const [activeQuestion, setActiveQuestion] = useState<string>(CURIOSITY_QUESTIONS[0].id);

  const selected = CURIOSITY_QUESTIONS.find((q) => q.id === activeQuestion) || CURIOSITY_QUESTIONS[0];

  const handleSelect = (id: string, q: string) => {
    soundEngine.playClick();
    setActiveQuestion(id);
    trackEvent('question_answered', { questionId: id, question: q });
  };

  const jumpToExplorer = () => {
    soundEngine.playTargetLock();
    trackEvent('cta_clicked', { target: 'curiosity_to_explorer' });
    const el = document.getElementById('business-explorer');
    if (el) {
      el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section id="curiosity-section" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111]">
      {/* Tactical HUD Header in Hinglish */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <Terminal className="w-3.5 h-3.5 text-[#B65B3C]" />
          <span>PERSPECTIVE · 02 // CURIOSITY MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          WO SAWAL JO ASLI BOTTLENECK KO SAAMNE LAATE HAIN.
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          Curiosity hi strategy ki shuruat hai. Ek sawal select karo aur dekho AyuuWorks digital business friction ko kaise diagnose karta hai.
        </p>
      </div>

      {/* Interactive Two-Column Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Questions List (AAA Game HUD cards) */}
        <div className="lg:col-span-7 space-y-3">
          {CURIOSITY_QUESTIONS.map((item) => {
            const isActive = item.id === activeQuestion;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id, item.question)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`hud-bracket w-full text-left p-5 rounded-sm border transition-[border-color,background-color] duration-200 flex items-start justify-between gap-4 cursor-pointer ${
                  isActive
                    ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8] shadow-md shadow-[#B65B3C]/10'
                    : 'border-[#242424] bg-[#141414] text-[#D7D0C5] hover:border-[#383838] hover:bg-[#181818]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#B65B3C] font-bold">
                      [{item.system} PROTOCOL]
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-display tracking-tight text-[#F2EFE8]">
                    {item.question}
                  </h3>
                  <p className="text-xs text-[#9B978F] mt-1 leading-snug">
                    {item.subtext}
                  </p>
                </div>

                <div className={`mt-1 transition-transform ${isActive ? 'text-[#B65B3C] translate-x-1' : 'text-[#9B978F]'}`}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Strategic Insight Panel (Tactical HUD Terminal) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="hud-bracket p-6 md:p-8 rounded-sm border border-[#2e2a24] bg-[#161616] space-y-6 shadow-2xl shadow-black/80">
            <div className="flex items-center justify-between border-b border-[#242424] pb-4">
              <span className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#B65B3C] tracking-widest font-bold">
                <Crosshair className="w-3.5 h-3.5" />
                <span>STUDIO INTEL PERSPECTIVE</span>
              </span>
              <span className="text-xs font-mono text-[#9B978F]">
                SYS // {selected.system}
              </span>
            </div>

            <div>
              <h4 className="text-xl font-bold font-display text-[#F2EFE8] leading-snug">
                {selected.question}
              </h4>
              <p className="text-sm text-[#D7D0C5] mt-4 leading-relaxed font-sans">
                {selected.insight}
              </p>
            </div>

            <div className="pt-4 border-t border-[#242424]">
              <p className="text-xs font-mono text-[#9B978F] mb-3">
                Aapke apne business mein yeh issue kahan attack kar raha hai?
              </p>
              <button
                onClick={jumpToExplorer}
                onMouseEnter={() => soundEngine.playHover()}
                className="w-full py-3.5 px-4 rounded-sm bg-[#F2EFE8] hover:bg-[#B65B3C] text-[#111111] hover:text-[#F2EFE8] font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-black/40"
              >
                <span>APNA BUSINESS AUDIT START KARO</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

