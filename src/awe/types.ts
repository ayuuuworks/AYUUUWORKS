export type AWEState =
  | 'DISCOVERY'
  | 'CURIOUS'
  | 'EXPLORING'
  | 'INTERESTED'
  | 'DEEP-DIVE'
  | 'PROJECT-READY';

export type BusinessSystem = 'attention' | 'perception' | 'trust' | 'action';

export interface AWESessionEvent {
  event:
    | 'industry_selected'
    | 'problem_selected'
    | 'goal_selected'
    | 'question_answered'
    | 'project_opened'
    | 'demo_interacted'
    | 'service_explored'
    | 'why_opened'
    | 'section_viewed'
    | 'cta_clicked'
    | 'scroll_depth'
    | 'time_on_section';
  timestamp: number;
  meta?: Record<string, any>;
}

export interface AWEDiagnosis {
  summary: string;
  possible_bottlenecks: string[];
  recommended_corrections: string[];
  recommended_tests: string[];
  reasoning: string;
  confidence: 'low' | 'medium' | 'high';
  relevant_services: string[];
  recommended_project: string;
  next_action: string;
  generatedAt: number;
  isAiEnhanced?: boolean;
}

export interface AWESessionData {
  state: AWEState;
  industry: string;
  businessName: string;
  primaryProblem: string;
  problemCategory: BusinessSystem;
  goals: string[];
  followUpAnswers: Record<string, string>;
  exploredProjects: string[];
  exploredServices: string[];
  activeSystem: BusinessSystem;
  diagnosis: AWEDiagnosis | null;
  isLoadingDiagnosis: boolean;
  events: AWESessionEvent[];
  startedAt: number;
  interactiveDemoScore: number;
}
