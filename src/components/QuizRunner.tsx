import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, XCircle } from 'lucide-react';
import type { Question } from '../content/types';
import { moduleById } from '../content/modules';
import { optionOrder } from '../lib/shuffle';
import { useProgress } from '../lib/progress';
import { rich } from '../lib/rich';

export type QuizMode = 'practice' | 'exam';

interface Props {
  questions: Question[];
  mode?: QuizMode;
  onExit?: () => void;
  showModule?: boolean;
}

/**
 * Practice: immediate feedback and explanation after each answer.
 * Exam: no feedback until submission.
 * Option order is shuffled per attempt; the stored answer index stays canonical.
 */
export default function QuizRunner({ questions, mode = 'practice', onExit, showModule = true }: Props) {
  const [round, setRound] = useState(0);
  return <Attempt key={round} questions={questions} mode={mode} onExit={onExit} showModule={showModule} onRestart={() => setRound((r) => r + 1)} />;
}

function Attempt({ questions, mode, onExit, showModule, onRestart }: Required<Omit<Props, 'onExit'>> & { onExit?: () => void; onRestart: () => void }) {
  const { answer } = useProgress();
  const orders = useMemo(() => questions.map((q) => optionOrder(q.options.length)), [questions]);
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) return <p className="muted">No questions match this selection.</p>;

  if (finished) {
    return <Summary questions={questions} picks={picks} onRestart={onRestart} onExit={onExit} />;
  }

  const q = questions[index];
  const picked = picks[q.id];
  const revealed = mode === 'practice' && picked !== undefined;
  const isLast = index === questions.length - 1;
  const answered = Object.keys(picks).length;
  const mod = moduleById(q.module);

  const choose = (opt: number) => {
    if (revealed) return;
    setPicks((p) => ({ ...p, [q.id]: opt }));
    if (mode === 'practice') answer(q.id, opt === q.answer);
  };

  const finish = () => {
    if (mode === 'exam') for (const x of questions) if (picks[x.id] !== undefined) answer(x.id, picks[x.id] === x.answer);
    setFinished(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium muted">
          Question {index + 1} / {questions.length}
          {mode === 'exam' && ` · ${answered} answered`}
        </span>
        {showModule && mod && <span className="chip bg-slate-200 text-slate-800 dark:bg-ink-700 dark:text-slate-200">{mod.short}</span>}
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-ink-700" aria-hidden>
        <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
      </div>

      <p className="text-base font-semibold leading-relaxed sm:text-lg">{q.stem}</p>

      <div className="space-y-2" role="radiogroup" aria-label="Answer options">
        {orders[index].map((opt, i) => {
          const isPicked = picked === opt;
          const isAnswer = opt === q.answer;
          let cls = 'option-idle';
          if (revealed) cls = isAnswer ? 'option-correct' : isPicked ? 'option-wrong' : 'option-dim';
          else if (isPicked) cls = 'option-selected';
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={isPicked}
              disabled={revealed}
              onClick={() => choose(opt)}
              className={`option flex items-start gap-3 ${cls}`}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold opacity-70">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{q.options[opt]}</span>
              {revealed && isAnswer && <CheckCircle2 className="shrink-0 text-emerald-600 dark:text-emerald-400" size={20} aria-label="Correct answer" />}
              {revealed && isPicked && !isAnswer && <XCircle className="shrink-0 text-rose-600 dark:text-rose-400" size={20} aria-label="Your answer" />}
            </button>
          );
        })}
      </div>

      {revealed && <Explanation question={q} correct={picked === q.answer} />}

      <div className="flex items-center justify-between gap-3">
        <button type="button" className="btn-ghost" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          <ChevronLeft size={16} /> Back
        </button>
        {!isLast ? (
          <button type="button" className="btn-primary" disabled={mode === 'practice' && picked === undefined} onClick={() => setIndex((i) => i + 1)}>
            Next <ChevronRight size={16} />
          </button>
        ) : mode === 'exam' ? (
          <button type="button" className="btn-primary" onClick={finish}>
            Submit ({answered}/{questions.length})
          </button>
        ) : (
          <button type="button" className="btn-primary" disabled={picked === undefined} onClick={finish}>
            See results
          </button>
        )}
      </div>
    </div>
  );
}

function Explanation({ question, correct }: { question: Question; correct: boolean }) {
  const mod = moduleById(question.module);
  return (
    <div
      className={`animate-fade-in rounded-xl border p-4 text-sm leading-relaxed ${
        correct
          ? 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-100'
          : 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100'
      }`}
      aria-live="polite"
    >
      <p className="mb-1 font-bold">{correct ? 'Correct.' : 'Not quite.'}</p>
      <p>{rich(question.explanation)}</p>
      {mod && (
        <Link to={mod.path} className="mt-2 inline-block text-xs font-semibold underline">
          Review: {mod.title}
        </Link>
      )}
    </div>
  );
}

function Summary({
  questions,
  picks,
  onRestart,
  onExit,
}: {
  questions: Question[];
  picks: Record<string, number>;
  onRestart: () => void;
  onExit?: () => void;
}) {
  const [reviewing, setReviewing] = useState(true);
  const correct = questions.filter((q) => picks[q.id] === q.answer).length;
  const pct = Math.round((correct / questions.length) * 100);
  const missed = questions.filter((q) => picks[q.id] !== q.answer);
  const tone = pct >= 80 ? 'text-emerald-600 dark:text-emerald-400' : pct >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400';
  return (
    <div className="space-y-5">
      <div className="text-center" aria-live="polite">
        <p className={`text-5xl font-black tabular-nums ${tone}`}>{pct}%</p>
        <p className="mt-1 font-semibold">
          {correct} of {questions.length} correct
        </p>
        <p className="mt-1 text-sm muted">
          {pct >= 80 ? 'Mastery threshold (80%) reached for this set.' : 'Read the explanations for what you missed, then retry — retrieval practice is what makes it stick.'}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className="btn-primary" onClick={onRestart}>
          <RotateCcw size={16} /> Try again
        </button>
        {missed.length > 0 && (
          <button type="button" className="btn-ghost" onClick={() => setReviewing((r) => !r)}>
            {reviewing ? 'Hide' : 'Show'} {missed.length} missed
          </button>
        )}
        {onExit && (
          <button type="button" className="btn-ghost" onClick={onExit}>
            Done
          </button>
        )}
      </div>
      {reviewing && missed.length > 0 && (
        <ol className="space-y-3">
          {missed.map((q) => (
            <li key={q.id} className="rounded-xl border border-slate-200 p-4 text-sm dark:border-ink-700">
              <p className="mb-2 font-semibold">{q.stem}</p>
              <p className="text-rose-700 dark:text-rose-300">
                <XCircle size={14} className="mr-1 inline" aria-hidden />
                {picks[q.id] !== undefined ? `You: ${q.options[picks[q.id]]}` : 'Not answered'}
              </p>
              <p className="text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 size={14} className="mr-1 inline" aria-hidden /> Answer: {q.options[q.answer]}
              </p>
              <p className="mt-2 muted">{rich(q.explanation)}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
