import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ClipboardCheck, Clock, Layers, Stethoscope, Wrench } from 'lucide-react';
import { MODULES } from '../content/modules';
import { QUESTIONS, questionsFor } from '../content/questions';
import { CASES } from '../content/cases';
import { useProgress } from '../lib/progress';
import { moduleMastery } from '../lib/progress-core';
import { MODULE_ACCENT, MODULE_ICON } from '../components/moduleMeta';
import { Page, PageHeader } from '../components/Layout';
import { ProgressRing } from '../components/ui';
import { allCards } from '../content/flashcards';

const QUICK_TOOLS = [
  { id: 'agitation', label: 'Agitation regimens' },
  { id: 'cssrs', label: 'C-SSRS screen' },
  { id: 'ciwa', label: 'CIWA-Ar' },
  { id: 'hunter', label: 'Hunter criteria' },
  { id: 'four-at', label: '4AT delirium' },
  { id: 'capacity', label: 'Capacity' },
];

const SEQUENCE = ['Safety', 'Physiology', 'Medical vs psychiatric', 'Intoxication / withdrawal', 'Stabilize behavior', 'Risk & capacity', 'Disposition'];

export default function Home() {
  const { state } = useProgress();
  const masteries = MODULES.map((m) => moduleMastery(state, questionsFor(m.id).map((q) => q.id)));
  const completed = MODULES.filter((m) => state.modules[m.id]?.completed).length;
  const answered = QUESTIONS.filter((q) => state.questions[q.id]).length;
  const correctLast = QUESTIONS.filter((q) => state.questions[q.id]?.last).length;
  const overall = correctLast / QUESTIONS.length;
  const casesDone = CASES.filter((c) => state.cases[c.id]).length;
  const now = Date.now();
  const due = allCards().filter((c) => (state.cards[c.id]?.due ?? 0) <= now).length;
  const nextModule = MODULES.find((m) => !state.modules[m.id]?.completed) ?? MODULES[0];
  const started = answered > 0 || completed > 0;

  return (
    <Page wide>
      <PageHeader eyebrow="Evidence reviewed November 2026" title="Master psychiatric emergencies">
        Twelve focused modules, validated bedside instruments, decision cases and spaced retrieval — built on current guidelines (ACEP 2024,
        APA 2025, ASAM, BAP 2023, NICE, SCCM 2025) and the trials behind them.
      </PageHeader>

      {/* Progress / continue */}
      <section className="mb-8 grid gap-4 lg:grid-cols-3">
        <div className="card flex flex-col justify-between gap-4 bg-gradient-to-br from-sky-600 to-indigo-700 text-white dark:border-transparent lg:col-span-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-sky-100">{started ? 'Continue' : 'Start here'}</p>
            <p className="mt-1 text-2xl font-extrabold">{nextModule.title}</p>
            <p className="mt-1 text-sky-100">{nextModule.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to={nextModule.path} className="btn bg-white text-sky-800 hover:bg-sky-50">
              {started ? 'Resume' : 'Begin module 1'} <ArrowRight size={16} />
            </Link>
            <Link to="/cases" className="btn border border-white/40 text-white hover:bg-white/10">
              <Stethoscope size={16} /> Jump into a case
            </Link>
          </div>
        </div>
        <div className="card grid grid-cols-2 gap-4">
          <Stat label="Overall mastery" value={`${Math.round(overall * 100)}%`} sub={`${answered}/${QUESTIONS.length} questions tried`} ring={overall} />
          <Stat label="Modules done" value={`${completed}/${MODULES.length}`} />
          <Stat label="Cases solved" value={`${casesDone}/${CASES.length}`} />
          <Stat label="Cards due" value={String(due)} link="/flashcards" />
        </div>
      </section>

      {/* Universal sequence */}
      <section className="mb-8">
        <h2 className="h2 mb-3">One sequence for every behavioral emergency</h2>
        <ol className="flex flex-wrap gap-2">
          {SEQUENCE.map((s, i) => (
            <li key={s} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 text-sm font-medium dark:border-ink-700 dark:bg-ink-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-xs font-bold text-white dark:bg-sky-500 dark:text-ink-950">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </section>

      {/* Learning path */}
      <section className="mb-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="h2">Learning path</h2>
          <span className="text-sm muted">≈{MODULES.reduce((s, m) => s + m.minutes, 0)} minutes total</span>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {MODULES.map((m, i) => {
            const Icon = MODULE_ICON[m.id];
            const mastery = masteries[i];
            const done = !!state.modules[m.id]?.completed;
            return (
              <li key={m.id}>
                <Link to={m.path} className="card group flex h-full items-start gap-4 !p-4 transition-shadow hover:shadow-md">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${MODULE_ACCENT[m.id]}`}>
                    <Icon size={22} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-xs font-semibold muted">
                      {i + 1} · <Clock size={11} aria-hidden /> {m.minutes} min
                      {done && <CheckCircle2 size={13} className="text-emerald-500" aria-label="completed" />}
                    </span>
                    <span className="block font-bold leading-snug group-hover:text-sky-700 dark:group-hover:text-sky-300">{m.title}</span>
                    <span className="mt-1 line-clamp-2 block text-sm muted">{m.tagline}</span>
                  </span>
                  <span className="shrink-0" title="Mastery">
                    <ProgressRing value={mastery.score} size={38} label={`Mastery ${Math.round(mastery.score * 100)}%`} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Practice */}
      <section className="mb-8 grid gap-3 md:grid-cols-3">
        <PracticeCard to="/cases" icon={Stethoscope} title={`${CASES.length} decision cases`} text="Evolving vignettes with consequences, feedback at every step, and a debrief." />
        <PracticeCard to="/quiz" icon={ClipboardCheck} title={`${QUESTIONS.length}-question bank`} text="Practice or exam mode, by module, with a missed-question review loop." />
        <PracticeCard to="/flashcards" icon={Layers} title={`${allCards().length} spaced-repetition cards`} text="Leitner scheduling brings back what you’re about to forget." />
      </section>

      {/* Tools */}
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="h2">Bedside instruments</h2>
          <Link to="/tools" className="text-sm font-semibold text-sky-700 hover:underline dark:text-sky-300">
            All tools →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_TOOLS.map((t) => (
            <Link key={t.id} to={`/tools/${t.id}`} className="btn-ghost">
              <Wrench size={15} /> {t.label}
            </Link>
          ))}
        </div>
      </section>
    </Page>
  );
}

function Stat({ label, value, sub, ring, link }: { label: string; value: string; sub?: string; ring?: number; link?: string }) {
  const body = (
    <>
      <span className="text-xs font-semibold uppercase tracking-wide muted">{label}</span>
      <span className="mt-1 flex items-center gap-2">
        {ring !== undefined && <ProgressRing value={ring} size={34} />}
        <span className="text-2xl font-extrabold tabular-nums">{value}</span>
      </span>
      {sub && <span className="text-xs muted">{sub}</span>}
    </>
  );
  return link ? (
    <Link to={link} className="flex flex-col hover:opacity-80">
      {body}
    </Link>
  ) : (
    <div className="flex flex-col">{body}</div>
  );
}

function PracticeCard({ to, icon: Icon, title, text }: { to: string; icon: typeof Layers; title: string; text: string }) {
  return (
    <Link to={to} className="card group flex gap-3 transition-shadow hover:shadow-md">
      <Icon className="mt-0.5 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden />
      <span>
        <span className="block font-bold group-hover:text-sky-700 dark:group-hover:text-sky-300">{title}</span>
        <span className="text-sm muted">{text}</span>
      </span>
    </Link>
  );
}
