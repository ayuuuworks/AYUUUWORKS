import React from 'react';
import { ExternalLink, Image as ImageIcon, Play, Newspaper, MessageCircle, Monitor } from 'lucide-react';
import type { CaseMedia } from '../data/cases';

const icons = { IMAGE: ImageIcon, VIDEO: Play, MEME: MessageCircle, SCREENSHOT: Monitor, PRESS: Newspaper };

export const MediaEvidence: React.FC<{ media: CaseMedia; compact?: boolean }> = ({ media, compact = false }) => {
  const Icon = icons[media.kind];

  return (
    <div className="group border border-[#111111]/15 bg-[#ebe7df] overflow-hidden">
      <div className={`relative ${compact ? 'aspect-[16/9]' : 'aspect-[4/3]'} bg-[#22211f]`}>
        {media.imageUrl ? (
          <img src={media.imageUrl} alt={media.title} className="h-full w-full object-cover grayscale-[0.1] transition-transform duration-500 group-hover:scale-[1.02]" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <div>
              <Icon className="mx-auto h-7 w-7 text-[#D7D0C5]" strokeWidth={1.2} />
              <p className="mt-4 font-mono text-[9px] tracking-[0.18em] text-[#D7D0C5]">{media.kind} / MEDIA SLOT</p>
              <p className="mt-2 max-w-xs font-display text-lg font-semibold uppercase leading-none text-[#F2EFE8]">
                {media.usage === 'REPLACE' ? 'AUTHORIZED MEDIA NEEDED' : media.title}
              </p>
            </div>
          </div>
        )}
        <span className="absolute left-3 top-3 border border-[#F2EFE8]/30 bg-[#111111]/75 px-2 py-1 font-mono text-[8px] tracking-[0.16em] text-[#F2EFE8]">
          {media.label}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-lg font-semibold uppercase leading-tight">{media.title}</p>
            <p className="mt-2 text-xs leading-5 text-[#5b574f]">{media.description}</p>
          </div>
          {media.sourceUrl && (
            <a href={media.sourceUrl} target="_blank" rel="noreferrer" aria-label={`Open source for ${media.title}`} className="shrink-0">
              <ExternalLink className="h-4 w-4 text-[#B65B3C]" />
            </a>
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#111111]/10 pt-3 text-[8px] uppercase tracking-[0.14em] text-[#716c63]">
          <span>Source: {media.sourceName}</span>
          <span>{media.evidenceStatus === 'VERIFIED' ? 'VERIFIED SOURCE' : media.evidenceStatus === 'SECONDARY' ? 'SECONDARY SOURCE' : 'ASSET NEEDED'}</span>
        </div>
      </div>
    </div>
  );
};
