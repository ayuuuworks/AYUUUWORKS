import React, { useState } from 'react';
import { useAWE } from '../awe/context';
import { Menu, X, Eye, Volume2, VolumeX, Radio } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';
import { LanguageSwitcher } from './LanguageSwitcher';
import { getTranslations } from '../data/translations';

export const Navigation: React.FC = () => {
  const { isReducedMotion, toggleReducedMotion, trackEvent, language } = useAWE();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(soundEngine.isEnabled());
  const t = getTranslations(language);

  const handleToggleSound = () => {
    const next = soundEngine.toggle();
    setSoundActive(next);
  };

  const scrollTo = (id: string, label: string) => {
    soundEngine.playClick();
    trackEvent('cta_clicked', { target: `nav_${label.toLowerCase()}` });
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/92 backdrop-blur-md border-b border-[#242424] transition-all">
      {/* Top Tactical Telemetry Ticker (AAA Game HUD) */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-[#141414] border-b border-[#242424] text-[10px] font-mono text-[#9B978F]/80">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#B65B3C]">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>SYS.LIVE</span>
          </span>
          <span className="text-[#383838]">|</span>
          <span>SECTOR: 01 // AYUUWORKS_CORE</span>
          <span className="text-[#383838]">|</span>
          <span>MISSION: BUSINESS_DOMINANCE</span>
        </div>
        <div className="flex items-center gap-4 text-[#9B978F]">
          <span>PING: 14MS</span>
          <span>FPS: 60</span>
          <span>LAT: 28.6139°N</span>
          <span className="text-[#B65B3C]">STATUS: READY TO DEPLOY</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Wordmark with AAA Game HUD Tag */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            soundEngine.playClick();
            window.scrollTo({ top: 0, behavior: isReducedMotion ? 'auto' : 'smooth' });
          }}
          onMouseEnter={() => soundEngine.playHover()}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="text-base font-bold tracking-tight text-[#F2EFE8] font-display group-hover:text-[#B65B3C] transition-colors whitespace-nowrap">
            AYUUWORKS
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#1d1b18] text-[#B65B3C] border border-[#B65B3C]/40 rounded">
            v3.2
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono tracking-wider text-[#9B978F]">
          <button
            onClick={() => scrollTo('projects-section', 'work')}
            onMouseEnter={() => soundEngine.playHover()}
            className="hover:text-[#F2EFE8] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>{t.nav.work}</span>
            <span className="text-[10px] text-[#9B978F]/50">{t.nav.workSub}</span>
          </button>
          <button
            onClick={() => scrollTo('business-explorer', 'explore')}
            onMouseEnter={() => soundEngine.playHover()}
            className="hover:text-[#F2EFE8] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>{t.nav.audit}</span>
            <span className="text-[10px] text-[#9B978F]/50">{t.nav.auditSub}</span>
          </button>
          <button
            onClick={() => scrollTo('method-section', 'method')}
            onMouseEnter={() => soundEngine.playHover()}
            className="hover:text-[#F2EFE8] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>{t.nav.method}</span>
            <span className="text-[10px] text-[#9B978F]/50">{t.nav.methodSub}</span>
          </button>
          <button
            onClick={() => scrollTo('about-section', 'about')}
            onMouseEnter={() => soundEngine.playHover()}
            className="hover:text-[#F2EFE8] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>{t.nav.founder}</span>
            <span className="text-[10px] text-[#9B978F]/50">{t.nav.founderSub}</span>
          </button>
        </nav>

        {/* Right Action: Language Switcher + Sound FX toggle + Accessibility toggle + MISSION START */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dedicated Header Language Switcher Component */}
          <LanguageSwitcher />

          {/* Sound FX Toggle */}
          <button
            onClick={handleToggleSound}
            title={soundActive ? 'Sound FX On (Mute)' : 'Sound FX Off (Unmute)'}
            className={`p-2 text-xs rounded transition-colors border border-[#242424] cursor-pointer flex items-center gap-1.5 ${
              soundActive
                ? 'text-[#B65B3C] border-[#B65B3C]/50 bg-[#1d1b18]'
                : 'text-[#9B978F] hover:text-[#F2EFE8]'
            }`}
            aria-label="Toggle AAA sound FX"
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[10px] font-mono">{soundActive ? t.nav.sfxOn : t.nav.sfxOff}</span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={toggleReducedMotion}
            title={isReducedMotion ? 'Enable smooth transitions' : 'Reduce motion'}
            className={`p-2 text-xs rounded transition-colors border border-[#242424] cursor-pointer ${
              isReducedMotion ? 'text-[#B65B3C] border-[#B65B3C]/50' : 'text-[#9B978F] hover:text-[#F2EFE8]'
            }`}
            aria-label="Toggle reduced motion"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {/* Mission Start CTA */}
          <button
            onClick={() => scrollTo('enquiry-experience', 'start')}
            onMouseEnter={() => soundEngine.playHover()}
            className="hud-bracket px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase text-[#111111] bg-[#F2EFE8] hover:bg-[#B65B3C] hover:text-[#F2EFE8] transition-all rounded-sm cursor-pointer shadow-lg shadow-[#B65B3C]/10 flex items-center gap-1.5"
          >
            <span>{t.nav.missionLaunch}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher showIcon={false} />

          <button
            onClick={handleToggleSound}
            className={`p-1.5 text-xs rounded border border-[#242424] ${
              soundActive ? 'text-[#B65B3C] border-[#B65B3C]/50' : 'text-[#9B978F]'
            }`}
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => scrollTo('enquiry-experience', 'start')}
            className="px-3 py-1.5 text-xs font-mono font-bold uppercase text-[#111111] bg-[#F2EFE8] rounded-sm"
          >
            START
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#9B978F] hover:text-[#F2EFE8] border border-[#242424] rounded"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#242424] bg-[#141414] p-6 space-y-4">
          <div className="pb-3 border-b border-[#242424]">
            <LanguageSwitcher />
          </div>
          <button
            onClick={() => scrollTo('projects-section', 'work')}
            className="block w-full text-left py-2 text-sm font-mono text-[#D7D0C5] hover:text-[#B65B3C]"
          >
            01 / {t.nav.work} {t.nav.workSub}
          </button>
          <button
            onClick={() => scrollTo('business-explorer', 'explore')}
            className="block w-full text-left py-2 text-sm font-mono text-[#D7D0C5] hover:text-[#B65B3C]"
          >
            02 / {t.nav.audit} {t.nav.auditSub}
          </button>
          <button
            onClick={() => scrollTo('method-section', 'method')}
            className="block w-full text-left py-2 text-sm font-mono text-[#D7D0C5] hover:text-[#B65B3C]"
          >
            03 / {t.nav.method} {t.nav.methodSub}
          </button>
          <button
            onClick={() => scrollTo('about-section', 'about')}
            className="block w-full text-left py-2 text-sm font-mono text-[#D7D0C5] hover:text-[#B65B3C]"
          >
            04 / {t.nav.founder} {t.nav.founderSub}
          </button>
        </div>
      )}
    </header>
  );
};

