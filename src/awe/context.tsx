import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AWESessionData, AWEState, BusinessSystem, AWESessionEvent, AWEDiagnosis } from './types';
import { fetchAWEDiagnosis, getLocalDeterministicDiagnosis } from '../services/aweService';

interface AWEContextValue {
  session: AWESessionData;
  setIndustry: (industry: string) => void;
  setBusinessName: (name: string) => void;
  setProblem: (problemId: string, text: string, category: BusinessSystem) => void;
  setFollowUpAnswer: (questionId: string, answer: string) => void;
  exploreProject: (projectId: string) => void;
  exploreService: (service: string) => void;
  interactDemo: (demoId: string) => void;
  setActiveSystem: (system: BusinessSystem) => void;
  trackEvent: (eventName: AWESessionEvent['event'], meta?: Record<string, any>) => void;
  runDiagnosis: () => Promise<void>;
  getAdaptiveCTA: () => { label: string; action: () => void; hint: string };
  isReducedMotion: boolean;
  toggleReducedMotion: () => void;
  isAudioActive: boolean;
  toggleAudio: () => void;
  challengeModal: { isOpen: boolean; title: string; assumption: string; reality: string; explanation: string } | null;
  openChallenge: (data: { title: string; assumption: string; reality: string; explanation: string }) => void;
  closeChallenge: () => void;
  activeProjectModal: string | null;
  openProjectModal: (projectId: string) => void;
  closeProjectModal: () => void;
  isNavOpen: boolean;
  setIsNavOpen: (open: boolean) => void;
  language: 'hinglish' | 'english';
  setLanguage: (lang: 'hinglish' | 'english') => void;
  toggleLanguage: () => void;
}

const defaultSession: AWESessionData = {
  state: 'DISCOVERY',
  industry: 'Jewellery',
  businessName: '',
  primaryProblem: 'Brand utna premium nahi lagta.',
  problemCategory: 'perception',
  goals: ['High-Trust Enquiries', 'Premium Perception'],
  followUpAnswers: {},
  exploredProjects: [],
  exploredServices: [],
  activeSystem: 'perception',
  diagnosis: null,
  isLoadingDiagnosis: false,
  events: [],
  startedAt: Date.now(),
  interactiveDemoScore: 0,
};

const AWEContext = createContext<AWEContextValue | undefined>(undefined);

export function AWEProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AWESessionData>(() => {
    return {
      ...defaultSession,
      diagnosis: getLocalDeterministicDiagnosis('Jewellery', 'Brand utna premium nahi lagta.', ''),
    };
  });

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [challengeModal, setChallengeModal] = useState<{
    isOpen: boolean;
    title: string;
    assumption: string;
    reality: string;
    explanation: string;
  } | null>(null);
  const [activeProjectModal, setActiveProjectModal] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [language, setLanguage] = useState<'hinglish' | 'english'>('hinglish');

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => (prev === 'hinglish' ? 'english' : 'hinglish'));
  }, []);

  // Audio synthesizer via Web Audio API for subtle cinematic feedback without external audio files
  const playSubtleTone = useCallback((freq = 440, type: OscillatorType = 'sine', duration = 0.15) => {
    if (!isAudioActive || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext policy handled gracefully
    }
  }, [isAudioActive]);

  const toggleReducedMotion = () => setIsReducedMotion(prev => !prev);
  const toggleAudio = () => {
    setIsAudioActive(prev => {
      const next = !prev;
      if (next) playSubtleTone(520, 'sine', 0.2);
      return next;
    });
  };

  const trackEvent = useCallback((event: AWESessionEvent['event'], meta?: Record<string, any>) => {
    setSession(prev => {
      const updatedEvents = [...prev.events, { event, timestamp: Date.now(), meta }];
      // Compute state progression
      let nextState: AWEState = prev.state;
      const eventCount = updatedEvents.length;

      if (eventCount >= 1 && nextState === 'DISCOVERY') {
        nextState = 'CURIOUS';
      }
      if (updatedEvents.some(e => e.event === 'problem_selected')) {
        nextState = 'EXPLORING';
      }
      if (prev.exploredProjects.length >= 1 || prev.interactiveDemoScore >= 1) {
        nextState = 'INTERESTED';
      }
      if (prev.exploredProjects.length >= 2 && prev.interactiveDemoScore >= 2) {
        nextState = 'DEEP-DIVE';
      }
      if (updatedEvents.some(e => e.event === 'cta_clicked' && e.meta?.target === 'enquiry')) {
        nextState = 'PROJECT-READY';
      }

      return {
        ...prev,
        state: nextState,
        events: updatedEvents,
      };
    });
  }, []);

  const setIndustry = useCallback((industry: string) => {
    playSubtleTone(480, 'triangle', 0.12);
    setSession(prev => ({
      ...prev,
      industry,
      diagnosis: getLocalDeterministicDiagnosis(industry, prev.primaryProblem, prev.businessName),
    }));
    trackEvent('industry_selected', { industry });
  }, [trackEvent, playSubtleTone]);

  const setBusinessName = useCallback((name: string) => {
    setSession(prev => ({
      ...prev,
      businessName: name,
    }));
  }, []);

  const setProblem = useCallback((problemId: string, text: string, category: BusinessSystem) => {
    playSubtleTone(420, 'triangle', 0.15);
    setSession(prev => ({
      ...prev,
      primaryProblem: text,
      problemCategory: category,
      activeSystem: category,
      diagnosis: getLocalDeterministicDiagnosis(prev.industry, text, prev.businessName),
    }));
    trackEvent('problem_selected', { problemId, text, category });
  }, [trackEvent, playSubtleTone]);

  const setFollowUpAnswer = useCallback((questionId: string, answer: string) => {
    playSubtleTone(560, 'sine', 0.1);
    setSession(prev => ({
      ...prev,
      followUpAnswers: {
        ...prev.followUpAnswers,
        [questionId]: answer,
      },
    }));
    trackEvent('question_answered', { questionId, answer });
  }, [trackEvent, playSubtleTone]);

  const exploreProject = useCallback((projectId: string) => {
    playSubtleTone(640, 'sine', 0.12);
    setSession(prev => {
      const exists = prev.exploredProjects.includes(projectId);
      const nextProjects = exists ? prev.exploredProjects : [...prev.exploredProjects, projectId];
      return {
        ...prev,
        exploredProjects: nextProjects,
      };
    });
    trackEvent('project_opened', { projectId });
  }, [trackEvent, playSubtleTone]);

  const exploreService = useCallback((service: string) => {
    setSession(prev => {
      const exists = prev.exploredServices.includes(service);
      const nextServices = exists ? prev.exploredServices : [...prev.exploredServices, service];
      return {
        ...prev,
        exploredServices: nextServices,
      };
    });
    trackEvent('service_explored', { service });
  }, [trackEvent]);

  const interactDemo = useCallback((demoId: string) => {
    playSubtleTone(720, 'sine', 0.08);
    setSession(prev => ({
      ...prev,
      interactiveDemoScore: prev.interactiveDemoScore + 1,
    }));
    trackEvent('demo_interacted', { demoId });
  }, [trackEvent, playSubtleTone]);

  const setActiveSystem = useCallback((system: BusinessSystem) => {
    playSubtleTone(500, 'triangle', 0.1);
    setSession(prev => ({
      ...prev,
      activeSystem: system,
    }));
  }, [playSubtleTone]);

  const runDiagnosis = useCallback(async () => {
    setSession(prev => ({ ...prev, isLoadingDiagnosis: true }));
    try {
      const res = await fetchAWEDiagnosis({
        industry: session.industry,
        primaryProblem: session.primaryProblem,
        businessName: session.businessName,
        goals: session.goals,
        exploredProjects: session.exploredProjects,
        interactions: session.events,
      });
      setSession(prev => ({
        ...prev,
        diagnosis: res,
        isLoadingDiagnosis: false,
      }));
    } catch {
      setSession(prev => ({
        ...prev,
        diagnosis: getLocalDeterministicDiagnosis(prev.industry, prev.primaryProblem, prev.businessName),
        isLoadingDiagnosis: false,
      }));
    }
  }, [session.industry, session.primaryProblem, session.businessName, session.goals, session.exploredProjects, session.events]);

  const openChallenge = useCallback((data: { title: string; assumption: string; reality: string; explanation: string }) => {
    playSubtleTone(360, 'sawtooth', 0.2);
    setChallengeModal({ ...data, isOpen: true });
    trackEvent('why_opened', { title: data.title });
  }, [trackEvent, playSubtleTone]);

  const closeChallenge = useCallback(() => {
    setChallengeModal(null);
  }, []);

  const openProjectModal = useCallback((projectId: string) => {
    exploreProject(projectId);
    setActiveProjectModal(projectId);
  }, [exploreProject]);

  const closeProjectModal = useCallback(() => {
    setActiveProjectModal(null);
  }, []);

  const getAdaptiveCTA = useCallback(() => {
    const scrollToSection = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
      }
    };

    switch (session.state) {
      case 'PROJECT-READY':
        return {
          label: 'START A PROJECT',
          action: () => scrollToSection('enquiry-section'),
          hint: 'Your session brief is ready for AyuuWorks'
        };
      case 'DEEP-DIVE':
        return {
          label: 'BUILD MY STRATEGY',
          action: () => scrollToSection('strategy-report'),
          hint: 'Turn exploration insights into your roadmap'
        };
      case 'INTERESTED':
        return {
          label: "LET'S TALK ABOUT YOUR BUSINESS",
          action: () => scrollToSection('enquiry-section'),
          hint: 'Direct conversation based on your diagnosis'
        };
      case 'EXPLORING':
        return {
          label: 'SEE HOW WE THINK',
          action: () => scrollToSection('business-engine'),
          hint: 'Test your bottleneck in our 4-system engine'
        };
      case 'CURIOUS':
      case 'DISCOVERY':
      default:
        return {
          label: 'EXPLORE THE WORK',
          action: () => scrollToSection('diagnostic-section'),
          hint: 'Begin the transparent diagnostic experience'
        };
    }
  }, [session.state, isReducedMotion]);

  return (
    <AWEContext.Provider
      value={{
        session,
        setIndustry,
        setBusinessName,
        setProblem,
        setFollowUpAnswer,
        exploreProject,
        exploreService,
        interactDemo,
        setActiveSystem,
        trackEvent,
        runDiagnosis,
        getAdaptiveCTA,
        isReducedMotion,
        toggleReducedMotion,
        isAudioActive,
        toggleAudio,
        challengeModal,
        openChallenge,
        closeChallenge,
        activeProjectModal,
        openProjectModal,
        closeProjectModal,
        isNavOpen,
        setIsNavOpen,
        language,
        setLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </AWEContext.Provider>
  );
}

export function useAWE(): AWEContextValue {
  const ctx = useContext(AWEContext);
  if (!ctx) {
    throw new Error('useAWE must be used within an AWEProvider');
  }
  return ctx;
}
