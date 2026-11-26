/** Pure progress model (persisted in localStorage). Kept React-free so it can be unit tested. */

export interface QuestionStat {
  attempts: number;
  correct: number;
  /** Was the most recent attempt correct? */
  last: boolean;
  at: number;
}

export interface CaseStat {
  best: number;
  total: number;
  at: number;
}

export interface CardStat {
  box: number;
  due: number;
}

export interface ProgressState {
  version: 2;
  modules: Record<string, { visited?: number; completed?: number }>;
  questions: Record<string, QuestionStat>;
  cases: Record<string, CaseStat>;
  cards: Record<string, CardStat>;
}

export const emptyProgress = (): ProgressState => ({
  version: 2,
  modules: {},
  questions: {},
  cases: {},
  cards: {},
});

export function sanitize(raw: unknown): ProgressState {
  const base = emptyProgress();
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<ProgressState>;
  if (r.version !== 2) return base;
  return {
    version: 2,
    modules: isRecord(r.modules) ? r.modules : {},
    questions: isRecord(r.questions) ? r.questions : {},
    cases: isRecord(r.cases) ? r.cases : {},
    cards: isRecord(r.cards) ? r.cards : {},
  };
}

function isRecord(v: unknown): v is Record<string, never> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

export function recordAnswer(s: ProgressState, id: string, correct: boolean, now = Date.now()): ProgressState {
  const prev = s.questions[id] ?? { attempts: 0, correct: 0, last: false, at: 0 };
  return {
    ...s,
    questions: {
      ...s.questions,
      [id]: { attempts: prev.attempts + 1, correct: prev.correct + (correct ? 1 : 0), last: correct, at: now },
    },
  };
}

export function recordCase(s: ProgressState, id: string, score: number, total: number, now = Date.now()): ProgressState {
  const prev = s.cases[id];
  const best = prev ? Math.max(prev.best, score) : score;
  return { ...s, cases: { ...s.cases, [id]: { best, total, at: now } } };
}

export function markModule(
  s: ProgressState,
  id: string,
  field: 'visited' | 'completed',
  on = true,
  now = Date.now(),
): ProgressState {
  const prev = s.modules[id] ?? {};
  const next = { ...prev };
  if (on) next[field] = prev[field] ?? now;
  else delete next[field];
  return { ...s, modules: { ...s.modules, [id]: next } };
}

/** Leitner intervals in days for boxes 0..5. */
export const CARD_INTERVAL_DAYS = [0, 1, 3, 7, 16, 35];
const DAY = 86_400_000;

export function reviewCard(s: ProgressState, id: string, knewIt: boolean, now = Date.now()): ProgressState {
  const prev = s.cards[id] ?? { box: 0, due: 0 };
  const box = knewIt ? Math.min(prev.box + 1, CARD_INTERVAL_DAYS.length - 1) : 0;
  const due = now + CARD_INTERVAL_DAYS[box] * DAY;
  return { ...s, cards: { ...s.cards, [id]: { box, due } } };
}

export interface Mastery {
  total: number;
  attempted: number;
  correctLast: number;
  /** 0..1 share of the module's questions whose latest attempt was correct. */
  score: number;
  status: 'new' | 'learning' | 'mastered';
}

export const MASTERY_THRESHOLD = 0.8;

export function moduleMastery(s: ProgressState, questionIds: string[]): Mastery {
  const total = questionIds.length;
  let attempted = 0;
  let correctLast = 0;
  for (const id of questionIds) {
    const q = s.questions[id];
    if (!q) continue;
    attempted++;
    if (q.last) correctLast++;
  }
  const score = total ? correctLast / total : 0;
  const status = attempted === 0 ? 'new' : attempted === total && score >= MASTERY_THRESHOLD ? 'mastered' : 'learning';
  return { total, attempted, correctLast, score, status };
}
