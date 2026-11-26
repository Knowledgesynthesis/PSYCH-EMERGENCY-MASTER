import { useMemo, useState } from 'react';
import { Play } from 'lucide-react';
import { MODULES } from '../content/modules';
import { QUESTIONS, questionsFor } from '../content/questions';
import type { Question } from '../content/types';
import QuizRunner, { type QuizMode } from '../components/QuizRunner';
import { Page, PageHeader } from '../components/Layout';
import { ProgressRing } from '../components/ui';
import { useProgress } from '../lib/progress';
import { moduleMastery } from '../lib/progress-core';
import { shuffle } from '../lib/shuffle';

type Source = 'all' | 'missed' | 'new';

export default function Quiz() {
  const { state } = useProgress();
  const [selected, setSelected] = useState<string[]>(MODULES.map((m) => m.id));
  const [mode, setMode] = useState<QuizMode>('practice');
  const [source, setSource] = useState<Source>('all');
  const [count, setCount] = useState(20);
  const [session, setSession] = useState<Question[] | null>(null);

  const pool = useMemo(() => {
    return QUESTIONS.filter((q) => selected.includes(q.module)).filter((q) => {
      const s = state.questions[q.id];
      if (source === 'missed') return s && !s.last;
      if (source === 'new') return !s;
      return true;
    });
  }, [selected, source, state.questions]);

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  if (session) {
    return (
      <Page>
        <PageHeader eyebrow={mode === 'exam' ? 'Exam mode' : 'Practice mode'} title="Question bank" />
        <div className="card">
          <QuizRunner questions={session} mode={mode} onExit={() => setSession(null)} />
        </div>
      </Page>
    );
  }

  return (
    <Page wide>
      <PageHeader eyebrow="Practice" title="Question bank">
        {QUESTIONS.length} vignette-based questions. Practice mode explains every answer immediately; exam mode holds feedback until you submit.
        Your latest answer to each question drives module mastery (≥80% = mastered).
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="card lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold">Modules</h2>
            <div className="flex gap-2 text-xs">
              <button type="button" className="font-semibold text-sky-700 hover:underline dark:text-sky-300" onClick={() => setSelected(MODULES.map((m) => m.id))}>
                All
              </button>
              <button type="button" className="font-semibold text-sky-700 hover:underline dark:text-sky-300" onClick={() => setSelected([])}>
                None
              </button>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {MODULES.map((m) => {
              const mastery = moduleMastery(state, questionsFor(m.id).map((q) => q.id));
              const on = selected.includes(m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(m.id)}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                    on ? 'border-sky-500 bg-sky-50 dark:border-sky-400 dark:bg-sky-500/10' : 'border-slate-200 opacity-70 hover:opacity-100 dark:border-ink-700'
                  }`}
                >
                  <ProgressRing value={mastery.score} size={32} />
                  <span className="flex-1">
                    <span className="block font-semibold">{m.short}</span>
                    <span className="text-xs muted">
                      {mastery.attempted}/{mastery.total} tried{mastery.status === 'mastered' ? ' · mastered' : ''}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="card space-y-4">
          <Seg label="Mode" value={mode} onChange={setMode} options={[{ v: 'practice', l: 'Practice' }, { v: 'exam', l: 'Exam' }]} />
          <Seg label="Questions" value={source} onChange={setSource} options={[{ v: 'all', l: 'All' }, { v: 'new', l: 'Unseen' }, { v: 'missed', l: 'Missed' }]} />
          <Seg label="Length" value={count} onChange={setCount} options={[{ v: 10, l: '10' }, { v: 20, l: '20' }, { v: 999, l: 'All' }]} />
          <button type="button" className="btn-primary w-full" disabled={pool.length === 0} onClick={() => setSession(shuffle(pool).slice(0, count))}>
            <Play size={16} /> Start {Math.min(count, pool.length)} question{Math.min(count, pool.length) === 1 ? '' : 's'}
          </button>
          {pool.length === 0 && <p className="text-center text-xs muted">No questions in this selection{source === 'missed' ? ' — nothing missed yet' : ''}.</p>}
        </section>
      </div>
    </Page>
  );
}

function Seg<T extends string | number>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { v: T; l: string }[] }) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold">{label}</p>
      <div className="grid gap-1 rounded-xl bg-slate-100 p-1 dark:bg-ink-850" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((o) => (
          <button
            key={String(o.v)}
            type="button"
            aria-pressed={value === o.v}
            onClick={() => onChange(o.v)}
            className={`rounded-lg py-1.5 text-sm font-medium transition-colors ${value === o.v ? 'bg-white shadow-sm dark:bg-ink-700' : 'text-slate-600 dark:text-slate-400'}`}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}
