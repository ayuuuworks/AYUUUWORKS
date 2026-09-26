import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { Send, Check, ArrowRight, ArrowDown, Terminal, Crosshair, Sparkles } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

export const EnquiryExperienceScene: React.FC = () => {
  const { session, trackEvent, isReducedMotion } = useAWE();

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessName: session.businessName || '',
    businessType: session.industry || 'Physical / Luxury Destination',
    mainChallenge: session.primaryProblem || 'Zyada luxury & premium lagna hai',
    helpNeeded: session.diagnosis?.relevant_services?.[0] || 'Brand Identity & Flagship Website',
    budgetRange: 'Rs 2.5L – Rs 5L',
    timeline: 'Agley 1–2 mahine mein',
    contact: '',
    additionalContext: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playTargetLock();
    trackEvent('cta_clicked', { target: 'submit_project_brief', ...formData });
    setSubmitted(true);
  };

  const scrollToExplorer = () => {
    soundEngine.playClick();
    const el = document.getElementById('business-explorer');
    if (el) {
      el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="enquiry-experience"
      className="relative py-28 px-6 max-w-5xl mx-auto border-t border-[#242424] bg-[#111111]"
    >
      <div id="enquiry-section" className="hidden" />

      {/* Final Call to Action in Hinglish */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-center gap-2 text-[11px] font-mono tracking-widest text-[#B65B3C] uppercase">
          <Terminal className="w-3.5 h-3.5 text-[#B65B3C]" />
          <span>INITIATE · 11 // TACTICAL COMMISSION</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display text-[#F2EFE8] tracking-tight leading-[0.98]">
          AB AAPKE BUSINESS KO<br />
          <span className="text-[#D7D0C5]">KYA BANNA CHAHIYE?</span>
        </h2>

        <p className="text-base sm:text-lg text-[#9B978F] max-w-xl mx-auto leading-relaxed pt-2">
          Hum har quarter bohot limited high-ticket projects lete hain taaki har brand ko uncompromised strategic focus, custom design aur deep engineering mil sake.
        </p>

        {/* Primary and Secondary CTA Buttons */}
        {!formOpen && !submitted && (
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                soundEngine.playTargetLock();
                setFormOpen(true);
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="w-full sm:w-auto px-8 py-4 rounded-sm bg-[#F2EFE8] hover:bg-[#B65B3C] text-[#111111] hover:text-[#F2EFE8] font-mono font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-[#B65B3C]/10"
            >
              COMMISSION INITIATE KARO →
            </button>

            <button
              onClick={scrollToExplorer}
              onMouseEnter={() => soundEngine.playHover()}
              className="w-full sm:w-auto px-6 py-4 rounded-sm bg-[#161616] hover:bg-[#202020] text-[#D7D0C5] hover:text-[#F2EFE8] border border-[#242424] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              BUSINESS EXPLORE KARO
            </button>
          </div>
        )}
      </div>

      {/* Business Brief Form in Hinglish with AAA Game HUD Bracket */}
      {formOpen && !submitted && (
        <div className="hud-bracket mt-14 p-8 sm:p-10 rounded-sm border border-[#242424] bg-[#141414] max-w-3xl mx-auto space-y-8 animate-fadeIn shadow-2xl">
          <div className="border-b border-[#242424] pb-4 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase text-[#B65B3C] font-bold">
                COMMISSION BRIEF ARCHITECTURE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F2EFE8] mt-1">
                APNE VISION & OPPORTUNITY KE BAARE MEIN BATAO.
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#9B978F] bg-[#111111] px-2 py-1 border border-[#242424] rounded-sm">
              PRE-FILLED VIA SESSION
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  AAPKA NAAM *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jaise: Ayush Mishra"
                  className="w-full p-3 rounded-sm bg-[#0d0d0d] border border-[#242424] text-sm text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  BRAND / COMPANY KA NAAM *
                </label>
                <input
                  required
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Jaise: The Grand Haveli"
                  className="w-full p-3 rounded-sm bg-[#0d0d0d] border border-[#242424] text-sm text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  BUSINESS CATEGORY
                </label>
                <input
                  type="text"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full p-3 rounded-sm bg-[#0d0d0d] border border-[#242424] text-sm text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  KAHAN SABSE BADI PROBLEM HAI?
                </label>
                <input
                  type="text"
                  value={formData.mainChallenge}
                  onChange={(e) => setFormData({ ...formData, mainChallenge: e.target.value })}
                  className="w-full p-3 rounded-sm bg-[#0d0d0d] border border-[#242424] text-sm text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  BUDGET BRACKET
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full p-3 rounded-sm bg-[#0d0d0d] border border-[#242424] text-xs font-mono text-[#F2EFE8] focus:border-[#B65B3C] outline-none cursor-pointer"
                >
                  <option>Rs 1.5L – Rs 2.5L (Starter Elevation)</option>
                  <option>Rs 2.5L – Rs 5L (Flagship System)</option>
                  <option>Rs 5L – Rs 10L+ (Full Multi-discipline)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-[#9B978F] block mb-1">
                  EXPECTED LAUNCH TIMELINE
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full p-3 rounded-sm bg-[#0d0d0d] border border-[#242424] text-xs font-mono text-[#F2EFE8] focus:border-[#B65B3C] outline-none cursor-pointer"
                >
                  <option>Agley 3–4 hafton mein (Urgent)</option>
                  <option>Agley 1–2 mahine mein (Standard)</option>
                  <option>Q4 / Next Quarter ke liye planning</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#9B978F] block mb-1">
                WHATSAPP / PHONE YA EMAIL *
              </label>
              <input
                required
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="+91 98765 43210 ya founder@domain.com"
                className="w-full p-3 rounded-sm bg-[#0d0d0d] border border-[#242424] text-sm text-[#F2EFE8] focus:border-[#B65B3C] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#9B978F] block mb-1">
                KOI AUR ZAROORI BAAT JO HUMEIN PEHLE SE JAANNI CHAHIYE?
              </label>
              <textarea
                rows={3}
                value={formData.additionalContext}
                onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
                placeholder="Current website URL, offline reach, target customer profile, ya jo bhi dimaag mein chal raha ho..."
                className="w-full p-3 rounded-sm bg-[#0d0d0d] border border-[#242424] text-xs text-[#F2EFE8] focus:border-[#B65B3C] outline-none resize-none"
              />
            </div>

            <div className="pt-4 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] font-mono text-[#9B978F]">
                CONFIDENTIAL & DIRECTLY REVIEWED BY AYUSH MISHRA
              </span>

              <button
                type="submit"
                onMouseEnter={() => soundEngine.playHover()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-[#B65B3C] hover:bg-[#c96948] text-[#F2EFE8] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#B65B3C]/20"
              >
                <span>BRIEF TRANSMIT KARO</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Confirmation State in Hinglish */}
      {submitted && (
        <div className="hud-bracket mt-14 p-10 rounded-sm border border-[#B65B3C] bg-[#161413] max-w-xl mx-auto text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-[#B65B3C]/20 border border-[#B65B3C] flex items-center justify-center mx-auto text-[#B65B3C]">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-display text-[#F2EFE8]">
            COMMISSION BRIEF TRANSMITTED.
          </h3>
          <p className="text-sm text-[#D7D0C5] leading-relaxed">
            Shukriya {formData.name || 'Founder'}. Aapka brief Ayush Mishra ke direct desk tak pahunch chuka hai. Hum agle 24 ghante ke andar aapse connect karenge.
          </p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1 bg-[#111111] border border-[#242424] text-[10px] font-mono text-[#9B978F]">
              PRIORITY QUEUE ID // AYU-{Math.floor(1000 + Math.random() * 9000)}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
