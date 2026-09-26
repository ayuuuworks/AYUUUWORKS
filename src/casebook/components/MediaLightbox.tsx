import React from 'react';
import { ExternalLink, X } from 'lucide-react';
import type { CaseMedia } from '../data/cases';

export const MediaLightbox: React.FC<{ media: CaseMedia; onClose: () => void }> = ({ media, onClose }) => (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#111111]/95 p-5" role="dialog" aria-modal="true" aria-label={media.title}>
    <button onClick={onClose} aria-label="Close media" className="absolute right-5 top-5 border border-[#F2EFE8]/20 p-3 text-[#F2EFE8] hover:border-[#B65B3C]">
      <X className="h-5 w-5" />
    </button>
    <div className="w-full max-w-5xl">
      {media.embedUrl ? (
        <div className="aspect-video overflow-hidden bg-black">
          <iframe src={media.embedUrl} title={media.title} className="h-full w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        </div>
      ) : media.imageUrl ? (
        <img src={media.imageUrl} alt={media.title} className="max-h-[75vh] w-full object-contain" />
      ) : (
        <div className="border border-[#F2EFE8]/20 bg-[#242424] p-12 text-center text-[#F2EFE8]">
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#B65B3C]">MEDIA SLOT</p>
          <h2 className="mt-3 font-display text-3xl font-semibold uppercase">{media.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#D7D0C5]">{media.description}</p>
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#D7D0C5]">
        <span>{media.credit}</span>
        {media.sourceUrl && <a href={media.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#F2EFE8] hover:text-[#B65B3C]">OPEN ORIGINAL <ExternalLink className="h-3.5 w-3.5" /></a>}
      </div>
    </div>
  </div>
);
