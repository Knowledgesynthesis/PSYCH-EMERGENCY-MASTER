import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  emptyProgress,
  markModule,
  recordAnswer,
  recordCase,
  reviewCard,
  sanitize,
  type ProgressState,
} from './progress-core';
import { readJSON, writeJSON } from './storage';

const KEY = 'pem.progress';

interface ProgressApi {
  state: ProgressState;
  answer: (questionId: string, correct: boolean) => void;
  finishCase: (caseId: string, score: number, total: number) => void;
  visit: (moduleId: string) => void;
  setCompleted: (moduleId: string, on: boolean) => void;
  review: (cardId: string, knewIt: boolean) => void;
  reset: () => void;
}

const Ctx = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => sanitize(readJSON(KEY, null)));

  useEffect(() => writeJSON(KEY, state), [state]);

  const answer = useCallback((id: string, ok: boolean) => setState((s) => recordAnswer(s, id, ok)), []);
  const finishCase = useCallback(
    (id: string, score: number, total: number) => setState((s) => recordCase(s, id, score, total)),
    [],
  );
  const visit = useCallback(
    (id: string) => setState((s) => (s.modules[id]?.visited ? s : markModule(s, id, 'visited'))),
    [],
  );
  const setCompleted = useCallback((id: string, on: boolean) => setState((s) => markModule(s, id, 'completed', on)), []);
  const review = useCallback((id: string, ok: boolean) => setState((s) => reviewCard(s, id, ok)), []);
  const reset = useCallback(() => setState(emptyProgress()), []);

  const api = useMemo(
    () => ({ state, answer, finishCase, visit, setCompleted, review, reset }),
    [state, answer, finishCase, visit, setCompleted, review, reset],
  );
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>');
  return ctx;
}
