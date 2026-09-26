import React from 'react';
import { Compass, Code2, Layers, MapPin, ArrowRight, Terminal, Crosshair, Sparkles } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

export const AboutScene: React.FC = () => {
  return (
    <section id="about-section" className="relative py-28 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111]">
      {/* Header in Hinglish with AAA Game HUD Tag */}
      <div className="max-w-3xl mb-16 gsap-reveal-target">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <Terminal className="w-3.5 h-3.5 text-[#B65B3C]" />
          <span>FOUNDER & STUDIO · 12 // EDITORIAL ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          ABOUT AYUUWORKS.<br />
          <span className="text-[#D7D0C5]">HUM KYA HAIN AUR KYUN HAIN.</span>
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          Hum strategy, bespoke design, cutting-edge technology, cinematic content aur high-performance execution ko un businesses ke liye combine karte hain jo aam aur boring lagna bardasht nahi kar sakte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Founder Section in Hinglish with AAA Game HUD */}
        <div className="lg:col-span-6 hud-bracket p-8 md:p-10 rounded-sm border border-[#242424] bg-[#141414] space-y-6 shadow-2xl">
          <div className="border-b border-[#242424] pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#B65B3C] tracking-widest font-bold">
                STUDIO FOUNDER // CREATIVE TECHNOLOGIST
              </span>
              <span className="text-[10px] font-mono text-[#9B978F] bg-[#111111] px-2 py-0.5 border border-[#242424] rounded-sm">
                ACTIVE COMMAND
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold font-display text-[#F2EFE8] mt-2">
              AYUSH MISHRA
            </h3>
            <p className="text-xs font-mono text-[#D7D0C5] mt-1">
              Founder & Systems Architect
            </p>
          </div>

          {/* Core Quote in Hinglish */}
          <blockquote className="text-lg sm:text-xl font-display font-medium text-[#F2EFE8] italic leading-relaxed border-l-2 border-[#B65B3C] pl-4 my-4 bg-[#161514] p-3 rounded-sm">
            "Main wahan kaam karta hoon jahan business strategy, luxury design, code aur visual storytelling aapas mein milti hain."
          </blockquote>

          <div className="space-y-4 text-xs sm:text-sm text-[#D7D0C5] leading-relaxed">
            <p>
              "Zyadatar Indian luxury aur heritage businesses ek fatal 'Translation Gap' se suffer karte hain: offline product 10/10 hota hai, craft world-class hoti hai — par digital screen par template website dekh ke customer value ko downgrade kar deta hai."
            </p>
            <p className="text-[#9B978F]">
              "AyuuWorks isi gap ko khatam karne ke liye banaya gaya hai. Hum brands ki positioning ko sharp karte hain, bespoke digital flagships engineer karte hain aur aisa commercial system banate hain jisse aapka business notice hona, samajh aana aur yaad rehna aasan ho jaye."
            </p>
          </div>

          <div className="pt-4 border-t border-[#242424] flex items-center justify-between text-xs text-[#9B978F] font-mono">
            <span className="text-[#B65B3C] font-bold">INDEPENDENT CREATIVE LAB</span>
            <span>LUCKNOW · VARANASI · NCR</span>
          </div>
        </div>

        {/* Studio Tenets / Principles in Hinglish */}
        <div className="lg:col-span-6 space-y-4">
          <div className="hud-bracket p-6 rounded-sm border border-[#242424] bg-[#141414] space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#B65B3C] uppercase font-bold">01 // RESTRAINT OVER NOISE</span>
            </div>
            <h4 className="text-base font-bold text-[#F2EFE8]">
              Design Jo Silent Authority Command Kare
            </h4>
            <p className="text-xs text-[#9B978F] leading-relaxed">
              Hum saste gimmicks, bhare hue cluttered templates aur fleeting internet trends ke peechhe nahi bhaagte. True luxury authority architectural spacing, disciplined typography aur breathing room se paida hoti hai.
            </p>
          </div>

          <div className="hud-bracket p-6 rounded-sm border border-[#242424] bg-[#141414] space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#B65B3C] uppercase font-bold">02 // STRATEGY BEFORE CODE</span>
            </div>
            <h4 className="text-base font-bold text-[#F2EFE8]">
              Technology Commercial Clarity Ke Liye Hoti Hai
            </h4>
            <p className="text-xs text-[#9B978F] leading-relaxed">
              Hum ek line code ya design pixel tab tak touch nahi karte jab tak humein yeh crystal clear na ho ki buyer kaun hai, unhe convince karne ke liye kya dekhna zaroori hai, aur current business mein paise kahan leak ho rahe hain.
            </p>
          </div>

          <div className="hud-bracket p-6 rounded-sm border border-[#242424] bg-[#141414] space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#B65B3C] uppercase font-bold">03 // ONE UNIFIED BRAIN</span>
            </div>
            <h4 className="text-base font-bold text-[#F2EFE8]">
              Alag Alag Freelancers Aur Vendors Ka Headache Khatam
            </h4>
            <p className="text-xs text-[#9B978F] leading-relaxed">
              Ek taraf web developer, doosri taraf video editor, teesri taraf ad agency — sab aapas mein coordinate karne mein founder ka waqt barbaad hota hai. AyuuWorks brand, code, motion aur conversion ko ek single cohesive engine mein lock karta hai.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
