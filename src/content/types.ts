export type Tone = 'danger' | 'warning' | 'info' | 'success' | 'neutral';

export type ToolId =
  | 'red-flags'
  | 'agitation'
  | 'bars'
  | 'cssrs'
  | 'asq'
  | 'safet'
  | 'safety-plan'
  | 'broset'
  | 'pawss'
  | 'ciwa'
  | 'cows'
  | 'hunter'
  | 'nms'
  | 'bfcsi'
  | 'four-at'
  | 'extrip'
  | 'capacity';

/** Text fields support **bold** inline emphasis. */
export type Block =
  | { type: 'text'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'callout'; tone: Tone; title: string; text?: string; items?: string[] }
  | { type: 'table'; headers: string[]; rows: string[][]; caption?: string }
  | { type: 'cards'; cards: { title: string; tone?: Tone; text?: string; items?: string[] }[] }
  | { type: 'steps'; steps: { title: string; text?: string; items?: string[] }[] }
  | {
      type: 'drugs';
      caption?: string;
      rows: { drug: string; dose: string; onset?: string; notes: string }[];
    }
  | { type: 'tool'; tool: ToolId }
  /** Active-recall prompt: learner commits to an answer before revealing it. */
  | { type: 'reveal'; prompt: string; answer: string };

export interface Section {
  id: string;
  title: string;
  blocks: Block[];
}

export interface Reference {
  cite: string;
  url: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface Module {
  id: string;
  path: string;
  title: string;
  short: string;
  tagline: string;
  minutes: number;
  objectives: string[];
  /** The 60-second version. */
  bottomLine: string[];
  sections: Section[];
  pitfalls: string[];
  flashcards: Flashcard[];
  references: Reference[];
}

export interface Question {
  id: string;
  module: string;
  stem: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface CaseOption {
  text: string;
  correct: boolean;
  feedback: string;
}

export interface CaseStep {
  /** New information revealed at this step (vitals, results, events). */
  update?: string;
  prompt: string;
  options: CaseOption[];
}

export interface ClinicalCase {
  id: string;
  title: string;
  module: string;
  setting: string;
  vignette: string;
  steps: CaseStep[];
  debrief: string[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  module?: string;
}
