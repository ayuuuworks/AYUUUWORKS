import React from 'react';
import { useAWE } from '../awe/context';
import { Languages } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

interface LanguageSwitcherProps {
  className?: string;
  showIcon?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  showIcon = true,
}) => {
  const { language, setLanguage } = useAWE();
  const isHinglish = language === 'hinglish';

  const handleSelectLanguage = (newLang: 'hinglish' | 'english') => {
    if (newLang !== language) {
      soundEngine.playClick();
      setLanguage(newLang);
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-0.5 rounded border border-[#2e2a24] bg-[#141414] font-mono ${className}`}
      role="group"
      aria-label="Language selection toggle"
    >
      {showIcon && (
        <span className="hidden lg:flex items-center pl-1.5 pr-0.5 text-[#9B978F]" title="Language Selection">
          <Languages className="w-3.5 h-3.5 text-[#B65B3C]" />
        </span>
      )}

      {/* Hinglish Button */}
      <button
        type="button"
        onClick={() => handleSelectLanguage('hinglish')}
        onMouseEnter={() => soundEngine.playHover()}
        aria-pressed={isHinglish}
        className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-1 ${
          isHinglish
            ? 'bg-[#B65B3C] text-[#F2EFE8] shadow-sm shadow-[#B65B3C]/20 border border-[#B65B3C]/60'
            : 'text-[#9B978F] hover:text-[#F2EFE8] hover:bg-[#1a1a1a]'
        }`}
      >
        {isHinglish && <span className="w-1.5 h-1.5 rounded-full bg-[#F2EFE8] animate-pulse" />}
        <span>HINGLISH</span>
      </button>

      {/* English Button */}
      <button
        type="button"
        onClick={() => handleSelectLanguage('english')}
        onMouseEnter={() => soundEngine.playHover()}
        aria-pressed={!isHinglish}
        className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-1 ${
          !isHinglish
            ? 'bg-[#B65B3C] text-[#F2EFE8] shadow-sm shadow-[#B65B3C]/20 border border-[#B65B3C]/60'
            : 'text-[#9B978F] hover:text-[#F2EFE8] hover:bg-[#1a1a1a]'
        }`}
      >
        {!isHinglish && <span className="w-1.5 h-1.5 rounded-full bg-[#F2EFE8] animate-pulse" />}
        <span>ENGLISH</span>
      </button>
    </div>
  );
};
