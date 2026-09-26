import { AWEDiagnosis, BusinessSystem } from '../awe/types';
import { generateDeterministicStrategicHypothesis, DiagnosticInput } from './deterministicFallbackService';

export { generateDeterministicStrategicHypothesis };
export type { DiagnosticInput };

export async function fetchAWEDiagnosis(payload: {
  industry: string;
  primaryProblem: string;
  businessName?: string;
  goals?: string[];
  exploredProjects?: string[];
  interactions?: any[];
}): Promise<AWEDiagnosis> {
  try {
    const res = await fetch('/api/awe/diagnose', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return {
      ...data,
      generatedAt: Date.now(),
      isAiEnhanced: true,
    };
  } catch (err) {
    console.warn('AWE API or Gemini unavailable, applying deterministic fallback logic:', err);
    return getLocalDeterministicDiagnosis(
      payload.industry,
      payload.primaryProblem,
      payload.businessName,
      payload.goals,
      payload.exploredProjects,
      payload.interactions
    );
  }
}

export function getLocalDeterministicDiagnosis(
  industry: string,
  primaryProblem: string,
  businessName?: string,
  goals?: string[],
  exploredProjects?: string[],
  interactions?: any[]
): AWEDiagnosis {
  return generateDeterministicStrategicHypothesis({
    industry,
    primaryProblem,
    businessName,
    goals,
    exploredProjects,
    interactions,
  });
}
