import React, { useCallback, useEffect, useRef, useState } from 'react';

export type SoundMode = 'QUIET' | 'AMBIENT' | 'CINEMATIC';

type SoundEvent = 'paper' | 'evidence' | 'clue' | 'pin' | 'brain' | 'caseClosed' | 'media';

interface SoundEngine {
  context: AudioContext;
  master: GainNode;
}

let engine: SoundEngine | null = null;

const getEngine = (): SoundEngine | null => {
  if (typeof window === 'undefined') return null;
  const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtor) return null;
  if (!engine) {
    const context = new AudioCtor();
    const master = context.createGain();
    master.gain.value = 0.055;
    master.connect(context.destination);
    engine = { context, master };
  }
  return engine;
};

const resume = async () => {
  const active = getEngine();
  if (active?.context.state === 'suspended') await active.context.resume();
  return active;
};

const tone = (frequency: number, duration: number, type: OscillatorType, volume = 0.08, delay = 0) => {
  const active = getEngine();
  if (!active) return;
  const { context, master } = active;
  const now = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(volume, 0.001), now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain);
  gain.connect(master);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.03);
};

const noise = (duration: number, volume = 0.04) => {
  const active = getEngine();
  if (!active) return;
  const { context, master } = active;
  const buffer = context.createBuffer(1, context.sampleRate * duration, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const source = context.createBufferSource();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1800;
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  source.start();
};

export const playCasebookSound = async (event: SoundEvent, mode: SoundMode = 'QUIET') => {
  if (mode === 'QUIET' && event === 'paper') return;
  const active = await resume();
  if (!active) return;

  switch (event) {
    case 'paper':
      noise(0.16, 0.025);
      break;
    case 'evidence':
      tone(310, 0.09, 'sine', 0.035);
      tone(465, 0.12, 'sine', 0.025, 0.045);
      break;
    case 'clue':
      tone(430, 0.09, 'triangle', 0.045);
      tone(645, 0.18, 'triangle', 0.03, 0.07);
      break;
    case 'pin':
      tone(520, 0.07, 'square', 0.025);
      break;
    case 'brain':
      tone(220, 0.24, 'sine', 0.035);
      tone(330, 0.3, 'sine', 0.025, 0.12);
      break;
    case 'caseClosed':
      tone(330, 0.12, 'triangle', 0.035);
      tone(440, 0.16, 'triangle', 0.035, 0.08);
      tone(660, 0.28, 'sine', 0.025, 0.17);
      break;
    case 'media':
      tone(185, 0.1, 'sine', 0.025);
      break;
    default:
      break;
  }

  if (mode === 'CINEMATIC' && event !== 'paper') noise(0.08, 0.008);
};

interface SoundControlProps { mode: SoundMode; onModeChange: (mode: SoundMode) => void; }

export const SoundControl: React.FC<SoundControlProps> = ({ mode, onModeChange }) => (
  <div className="fixed bottom-5 left-5 z-40 flex items-center gap-1 border border-[#111111]/20 bg-[#F2EFE8] p-1 shadow-lg" aria-label="Casebook sound mode">
    {(['QUIET', 'AMBIENT', 'CINEMATIC'] as SoundMode[]).map((item) => (
      <button
        key={item}
        onClick={async () => { await resume(); onModeChange(item); }}
        className={`px-2.5 py-2 text-[8px] font-semibold tracking-[0.12em] transition-colors ${mode === item ? 'bg-[#111111] text-[#F2EFE8]' : 'text-[#5b574f] hover:bg-[#ebe7df]'}`}
        aria-pressed={mode === item}
      >
        {item}
      </button>
    ))}
  </div>
);

export const useCasebookSound = (mode: SoundMode) => {
  const previous = useRef(mode);
  useEffect(() => { previous.current = mode; }, [mode]);
  return useCallback((event: SoundEvent) => playCasebookSound(event, mode), [mode]);
};
