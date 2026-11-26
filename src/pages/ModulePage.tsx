import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Circle, Clock, ExternalLink, Layers, ListChecks, Stethoscope, Target, Zap } from 'lucide-react';
import type { Module } from '../content/types';
import { MODULES, LAST_REVIEWED } from '../content/modules';
import { questionsFor } from '../content/questions';
import { CASES } from '../content/cases';
import { BlockView } from '../components/Blocks';
import QuizRunner from '../components/QuizRunner';
import { Bullets, ProgressRing } from '../components/ui';
import { MODULE_ACCENT, MODULE_ICON } from '../components/moduleMeta';
import { Page } from '../components/Layout';
import { useProgress } from '../lib/progress';
import { moduleMastery } from '../lib/progress-core';
import { rich } from '../lib/rich';

export default function ModulePage({ module }: { module: Module }) {
  const { state, visit, setCompleted } = useProgress();
  const [quizOpen, setQuizOpen] = useState(false);
  const idx = MODULES.findIndex((m) => m.id === module.id);
  const prev = MODULES[idx - 1];
  const next = MODULES[idx + 1];
  const questions = questionsFor(module.id);
  const mastery = moduleMastery(state, questions.map((q) => q.id));
  const completed = !!state.modules[module.id]?.completed;
  const cases = CASES.filter((c) => c.module === module.id);
  const Icon = MODULE_ICON[module.id];

  useEffect(() => {
    visit(module.id);
    document.title = `${module.title} · Psych Emergency Master`;
    setQuizOpen(false);
  }, [module.id, module.title, visit]);

  return (
    <Page>
      {/* Header */}
      <header className="mb-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          <span className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-white ${MODULE_ACCENT[module.id]}`}>
            <Icon size={16} aria-hidden />
          </span>
          Module {idx + 1} of {MODULES.length}
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{module.title}</h1>
            <p className="mt-2 max-w-3xl text-lg text-slate-600 dark:text-slate-400">{module.tagline}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs muted">
              <span className="inline-flex items-center gap-1">
                <Clock size={13} aria-hidden /> ~{module.minutes} min
              </span>
              <span>Evidence reviewed {LAST_REVIEWED}</span>
            </p>
          </div>
          <div className="hidden shrink-0 flex-col items-center sm:flex" title="Mastery: share of this module’s questions you last answered correctly">
            <ProgressRing value={mastery.score} size={56} label={`Mastery ${Math.round(mastery.score * 100)}%`} />
            <span className="mt-1 text-[11px] font-medium muted">mastery</span>
          </div>
        </div>
      </header>

      {/* Objectives + bottom line */}
      <div className="mb-6 grid gap-4 lg:grid-cols-5">
        <section className="card lg:col-span-2">
          <h2 className="mb-2 flex items-center gap-2 font-bold">
            <Target size={18} className="text-sky-600 dark:text-sky-400" aria-hidden /> You will be able to
          </h2>
          <Bullets items={module.objectives} className="text-sm text-slate-700 dark:text-slate-300" />
        </section>
        <section className="card border-sky-300 bg-gradient-to-br from-sky-50 to-indigo-50 dark:border-sky-500/30 dark:from-sky-500/10 dark:to-indigo-500/10 lg:col-span-3">
          <h2 className="mb-2 flex items-center gap-2 font-bold">
            <Zap size={18} className="text-amber-500" aria-hidden /> The bottom line
          </h2>
          <Bullets items={module.bottomLine} className="text-sm text-slate-800 dark:text-slate-200" />
        </section>
      </div>

      {/* Section index */}
      <nav aria-label="On this page" className="no-print mb-6 flex flex-wrap gap-2">
        {module.sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium hover:border-sky-500 hover:text-sky-700 dark:border-ink-700 dark:hover:border-sky-400 dark:hover:text-sky-300">
            {s.title}
          </a>
        ))}
        <a href="#check" className="rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white dark:bg-sky-500 dark:text-ink-950">
          Check yourself
        </a>
      </nav>

      {/* Sections */}
      <div className="space-y-6">
        {module.sections.map((section) => (
          <section key={section.id} id={section.id} className="card scroll-mt-20">
            <h2 className="h2 mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.blocks.map((block, i) => (
                <BlockView key={i} block={block} />
              ))}
            </div>
          </section>
        ))}

        <section className="card border-rose-300 dark:border-rose-500/40">
          <h2 className="h2 mb-3 flex items-center gap-2">
            <AlertTriangle className="text-rose-500" aria-hidden /> Pitfalls that hurt patients
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {module.pitfalls.map((p, i) => (
              <li key={i} className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-950 dark:bg-rose-500/10 dark:text-rose-100">
                {rich(p)}
              </li>
            ))}
          </ul>
        </section>

        {/* Knowledge check */}
        <section id="check" className="card scroll-mt-20">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="h2 flex items-center gap-2">
              <ListChecks className="text-sky-600 dark:text-sky-400" aria-hidden /> Check yourself
            </h2>
            <span className="text-sm muted">
              {mastery.correctLast}/{mastery.total} correct on last attempt
              {mastery.status === 'mastered' && ' · mastered'}
            </span>
          </div>
          {quizOpen ? (
            <QuizRunner questions={questions} showModule={false} onExit={() => setQuizOpen(false)} />
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="btn-primary" onClick={() => setQuizOpen(true)}>
                Start {questions.length} questions
              </button>
              <Link to={`/flashcards?module=${module.id}`} className="btn-ghost">
                <Layers size={16} /> {module.flashcards.length} flashcards
              </Link>
              {cases.map((c) => (
                <Link key={c.id} to={`/cases/${c.id}`} className="btn-ghost">
                  <Stethoscope size={16} /> Case: {c.title}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* References */}
        <section className="card">
          <h2 className="h2 mb-3">Key evidence</h2>
          <ol className="space-y-2 text-sm">
            {module.references.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="w-5 shrink-0 text-right tabular-nums muted">{i + 1}.</span>
                <a href={r.url} target="_blank" rel="noreferrer noopener" className="text-slate-700 hover:text-sky-700 hover:underline dark:text-slate-300 dark:hover:text-sky-300">
                  {r.cite}
                  <ExternalLink size={12} className="ml-1 inline opacity-60" aria-hidden />
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Complete + navigation */}
      <div className="no-print mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setCompleted(module.id, !completed)}
          className={completed ? 'btn bg-emerald-600 text-white hover:bg-emerald-700' : 'btn-ghost'}
          aria-pressed={completed}
        >
          {completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
          {completed ? 'Completed' : 'Mark module complete'}
        </button>
        <div className="flex gap-2">
          {prev && (
            <Link to={prev.path} className="btn-ghost flex-1 sm:flex-none">
              <ChevronLeft size={16} /> {prev.short}
            </Link>
          )}
          {next && (
            <Link to={next.path} className="btn-primary flex-1 sm:flex-none">
              {next.short} <ChevronRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </Page>
  );
}
