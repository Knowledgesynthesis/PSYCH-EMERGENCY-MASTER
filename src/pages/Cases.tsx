import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Award, CheckCircle2, ChevronRight, ClipboardList, RotateCcw, XCircle } from 'lucide-react';
import { CASES } from '../content/cases';
import { moduleById } from '../content/modules';
import type { ClinicalCase } from '../content/types';
import { Page, PageHeader } from '../components/Layout';
import { Bullets, Chip } from '../components/ui';
import { useProgress } from '../lib/progress';
import { optionOrder } from '../lib/shuffle';

export default function Cases() {
  const { caseId } = useParams();
  const selected = CASES.find((c) => c.id === caseId);
  if (caseId && selected) return <CaseRunner key={selected.id} c={selected} />;
  return <CaseList />;
}

function CaseList() {
  const { state } = useProgress();
  return (
    <Page wide>
      <PageHeader eyebrow="Practice" title="Decision cases">
        Each case unfolds as you decide. Wrong turns show you the consequence and let you try again; your score counts first attempts only.
      </PageHeader>
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {CASES.map((c) => {
          const mod = moduleById(c.module);
          const stat = state.cases[c.id];
          return (
            <li key={c.id}>
              <Link to={`/cases/${c.id}`} className="card group flex h-full flex-col gap-3 !p-4 transition-shadow hover:shadow-md">
                <span className="flex items-center justify-between gap-2">
                  {mod && <Chip tone="info">{mod.short}</Chip>}
                  {stat ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <Award size={14} aria-hidden /> Best {stat.best}/{stat.total}
                    </span>
                  ) : (
                    <span className="text-xs muted">{c.steps.length} decisions</span>
                  )}
                </span>
                <span className="font-bold group-hover:text-sky-700 dark:group-hover:text-sky-300">{c.title}</span>
                <span className="line-clamp-3 text-sm muted">{c.vignette}</span>
                <span className="mt-auto inline-flex items-center text-sm font-semibold text-sky-700 dark:text-sky-300">
                  {stat ? 'Replay' : 'Start'} <ChevronRight size={16} aria-hidden />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}

type StepResult = { firstTry: boolean; tried: number[] };

function CaseRunner({ c }: { c: ClinicalCase }) {
  const { finishCase } = useProgress();
  const [round, setRound] = useState(0);
  // Re-shuffle options on each replay so position can't be memorized.
  const orders = useMemo(() => c.steps.map((s) => optionOrder(s.options.length)), [c, round]);
  const [stepIdx, setStepIdx] = useState(0);
  const [results, setResults] = useState<StepResult[]>([]);
  const [finished, setFinished] = useState(false);
  const mod = moduleById(c.module);

  const step = c.steps[stepIdx];
  const result = results[stepIdx] ?? { firstTry: false, tried: [] };
  const solved = result.tried.some((i) => step.options[i].correct);
  const score = results.filter((r) => r.firstTry).length;

  const choose = (opt: number) => {
    if (solved || result.tried.includes(opt)) return;
    const tried = [...result.tried, opt];
    const next = [...results];
    next[stepIdx] = { firstTry: result.tried.length === 0 && step.options[opt].correct, tried };
    setResults(next);
  };

  const advance = () => {
    if (stepIdx < c.steps.length - 1) {
      setStepIdx(stepIdx + 1);
      return;
    }
    finishCase(c.id, score, c.steps.length);
    setFinished(true);
  };

  const restart = () => {
    setRound((r) => r + 1);
    setStepIdx(0);
    setResults([]);
    setFinished(false);
  };

  const updates = c.steps.slice(0, stepIdx + 1).map((s, i) => ({ i, text: s.update })).filter((u) => u.text);

  return (
    <Page>
      <Link to="/cases" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:underline dark:text-sky-300">
        ← All cases
      </Link>
      <PageHeader eyebrow={mod ? `Case · ${mod.title}` : 'Case'} title={c.title} />

      <section className="card mb-4 border-sky-300 dark:border-sky-500/30">
        <p className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
          <ClipboardList size={14} aria-hidden /> {c.setting}
        </p>
        <p className="leading-relaxed">{c.vignette}</p>
        {updates.length > 0 && (
          <ol className="mt-3 space-y-2 border-l-2 border-amber-400 pl-3">
            {updates.map((u) => (
              <li key={u.i} className="animate-fade-in text-sm">
                <span className="mr-1 font-semibold text-amber-700 dark:text-amber-300">Update:</span>
                {u.text}
              </li>
            ))}
          </ol>
        )}
      </section>

      {finished ? (
        <section className="card animate-fade-in">
          <div className="mb-4 text-center">
            <p className="text-4xl font-black tabular-nums text-sky-600 dark:text-sky-400">
              {score}/{c.steps.length}
            </p>
            <p className="text-sm muted">decisions correct on the first attempt</p>
          </div>
          <h2 className="mb-2 font-bold">Debrief</h2>
          <Bullets items={c.debrief} className="text-sm text-slate-700 dark:text-slate-300" />
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" className="btn-primary" onClick={restart}>
              <RotateCcw size={16} /> Replay
            </button>
            {mod && (
              <Link to={mod.path} className="btn-ghost">
                Review {mod.short}
              </Link>
            )}
            <Link to="/cases" className="btn-ghost">
              Next case
            </Link>
          </div>
        </section>
      ) : (
        <section className="card">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium muted">
              Decision {stepIdx + 1} of {c.steps.length}
            </span>
            <span className="flex gap-1" aria-hidden>
              {c.steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-6 rounded-full ${
                    i < stepIdx ? (results[i]?.firstTry ? 'bg-emerald-500' : 'bg-amber-500') : i === stepIdx ? 'bg-sky-500' : 'bg-slate-200 dark:bg-ink-700'
                  }`}
                />
              ))}
            </span>
          </div>
          <p className="mb-4 text-lg font-semibold">{step.prompt}</p>
          <div className="space-y-2">
            {orders[stepIdx].map((oi) => {
              const o = step.options[oi];
              const tried = result.tried.includes(oi);
              const cls = tried ? (o.correct ? 'option-correct' : 'option-wrong') : solved ? 'option-dim' : 'option-idle';
              return (
                <div key={oi}>
                  <button type="button" onClick={() => choose(oi)} disabled={solved || tried} className={`option flex items-start gap-3 ${cls}`}>
                    <span className="flex-1">{o.text}</span>
                    {tried && (o.correct ? <CheckCircle2 size={20} className="shrink-0 text-emerald-600" aria-label="correct" /> : <XCircle size={20} className="shrink-0 text-rose-600" aria-label="incorrect" />)}
                  </button>
                  {tried && (
                    <p
                      className={`animate-fade-in mt-1.5 rounded-lg px-3 py-2 text-sm ${
                        o.correct ? 'bg-emerald-50 text-emerald-950 dark:bg-emerald-500/10 dark:text-emerald-100' : 'bg-rose-50 text-rose-950 dark:bg-rose-500/10 dark:text-rose-100'
                      }`}
                      aria-live="polite"
                    >
                      {o.feedback}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {!solved && result.tried.length > 0 && <p className="mt-3 text-sm font-medium text-amber-700 dark:text-amber-300">Try another option.</p>}
          {solved && (
            <div className="mt-4 flex justify-end">
              <button type="button" className="btn-primary" onClick={advance}>
                {stepIdx < c.steps.length - 1 ? 'Continue' : 'Finish & debrief'} <ChevronRight size={16} />
              </button>
            </div>
          )}
        </section>
      )}
    </Page>
  );
}
