import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const services = [
  { id:'01', title:'Interior Design', kicker:'SPACE', text:'Spatial concepts, visual direction and presentation for environments that need to feel considered before someone walks through the door.' },
  { id:'02', title:'Graphic Design', kicker:'IDENTITY', text:'Visual systems, posters, brand assets and communication designed to make the business easier to recognise.' },
  { id:'03', title:'Cinematic Production', kicker:'CAPTURE', text:'Concept, direction, shoot planning and cinematic visual storytelling built around the message, not the trend.' },
  { id:'04', title:'Video Editing', kicker:'MOTION', text:'Pacing, sound, typography, transitions and finishing that turn raw footage into deliberate communication.' },
  { id:'05', title:'Meta Ads', kicker:'GROWTH', text:'Creative-led advertising systems where the visual idea, audience and message work together.' },
  { id:'06', title:'Instagram Management', kicker:'SOCIAL', text:'Content planning, publishing, creative direction and brand consistency for businesses building a stronger presence.' },
  { id:'07', title:'Social Media Creatives', kicker:'CONTENT', text:'Scroll-stopping posters, reels, stories and campaign assets designed as one visual language.' },
  { id:'08', title:'Catalog & Campaign Design', kicker:'CAMPAIGN', text:'Product and campaign communication that brings structure, hierarchy and a stronger commercial point of view.' },
];

export const ServicesPage: React.FC = () => (
  <main className="bg-[#111111] text-[#F2EFE8] pt-[72px]">
    <section className="px-6 py-28 border-b border-[#242424]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
        <p className="lg:col-span-3 text-xs uppercase tracking-[0.2em] text-[#B65B3C]">SERVICES / 01</p>
        <div className="lg:col-span-9">
          <h1 className="font-display text-5xl sm:text-7xl leading-[.92] tracking-[-.05em]">ONE STUDIO.<br/>MANY WAYS TO MOVE.</h1>
          <p className="mt-8 max-w-2xl text-[#9B978F] text-base sm:text-lg leading-relaxed">AyuuWorks brings creative, digital and growth capabilities together so the work can stay connected from first idea to final execution.</p>
        </div>
      </div>
    </section>
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto border-y border-[#242424]">
        {services.map((service) => (
          <article key={service.id} className="grid lg:grid-cols-12 gap-6 py-9 border-b border-[#242424] last:border-b-0 group">
            <span className="lg:col-span-1 text-xs text-[#6f6a62]">{service.id}</span>
            <div className="lg:col-span-3">
              <span className="text-[10px] tracking-[.2em] text-[#B65B3C]">{service.kicker}</span>
              <h2 className="font-display text-2xl sm:text-3xl mt-2">{service.title}</h2>
            </div>
            <p className="lg:col-span-6 text-sm sm:text-base text-[#9B978F] leading-relaxed max-w-xl">{service.text}</p>
            <div className="lg:col-span-2 lg:flex lg:justify-end">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] text-[#9B978F] group-hover:text-[#F2EFE8] transition-colors">Explore <ArrowUpRight size={14}/></span>
            </div>
          </article>
        ))}
      </div>
    </section>
    <section className="px-6 py-28 border-t border-[#242424]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
        <p className="lg:col-span-3 text-xs uppercase tracking-[.2em] text-[#B65B3C]">HOW THEY CONNECT</p>
        <div className="lg:col-span-9">
          <h2 className="font-display text-4xl sm:text-6xl tracking-[-.04em] max-w-4xl">THE OUTPUT CHANGES. THE SYSTEM STAYS CONNECTED.</h2>
          <p className="mt-7 max-w-2xl text-[#9B978F] leading-relaxed">A campaign can become a reel. A reel can become a social system. A digital experience can become the place where every piece finally makes sense.</p>
        </div>
      </div>
    </section>
  </main>
);
