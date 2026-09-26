import React from 'react';
import { useAWE } from '../awe/context';
import { AlertCircle, ArrowRight } from 'lucide-react';

export const ChallengeModal: React.FC = () => {
  const { challengeModal, closeChallenge } = useAWE();

  if (!challengeModal || !challengeModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-lg w-full bg-[#141414] border border-[#B65B3C] rounded shadow-2xl p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#242424] pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B65B3C]">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>STRATEGIC INTERVENTION</span>
          </div>
          <button
            onClick={closeChallenge}
            className="text-xs font-mono text-[#9B978F] hover:text-[#F2EFE8] cursor-pointer"
          >
            ✕ DISMISS
          </button>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-[#9B978F] uppercase block">
            YOUR STATED PREMISE
          </span>
          <p className="text-sm font-semibold text-[#F2EFE8]">
            "{challengeModal.title}"
          </p>
          <h3 className="text-2xl font-bold font-display text-[#F2EFE8] pt-2">
            ARE YOU SURE?
          </h3>
        </div>

        {/* Teardown */}
        <div className="space-y-3 p-4 bg-[#111111] rounded border border-[#242424] text-xs">
          <div>
            <span className="font-mono text-[#9B978F] uppercase text-[10px] block">
              CONVENTIONAL ASSUMPTION:
            </span>
            <p className="text-[#D7D0C5] mt-0.5">
              "{challengeModal.assumption}"
            </p>
          </div>
          <div className="pt-2 border-t border-[#242424]">
            <span className="font-mono text-[#B65B3C] uppercase text-[10px] block font-bold">
              THE COMMERCIAL REALITY:
            </span>
            <p className="text-[#F2EFE8] font-bold mt-0.5">
              "{challengeModal.reality}"
            </p>
          </div>
        </div>

        <p className="text-xs text-[#9B978F] leading-relaxed">
          {challengeModal.explanation}
        </p>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#242424]">
          <button
            onClick={closeChallenge}
            className="px-4 py-2 rounded border border-[#242424] text-xs font-mono text-[#9B978F] hover:text-[#F2EFE8] cursor-pointer"
          >
            CONTINUE ANYWAY
          </button>
          <button
            onClick={closeChallenge}
            className="px-4 py-2 rounded bg-[#F2EFE8] text-[#111111] text-xs font-mono font-bold hover:bg-[#B65B3C] hover:text-[#F2EFE8] transition-colors cursor-pointer"
          >
            RE-EXAMINE APPROACH
          </button>
        </div>
      </div>
    </div>
  );
};
