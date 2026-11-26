import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { scoreInstrument, type InstrumentDef } from './instrument';
import { ResultPanel, YesNoToggle } from '../components/ui';

export default function InstrumentTool({ def }: { def: InstrumentDef }) {
  const [answers, setAnswers] = useState<Record<string, number | undefined>>({});
  const result = scoreInstrument(def, answers);
  const set = (id: string, v: number) => setAnswers((a) => ({ ...a, [id]: v }));

  return (
    <div className="space-y-4">
      <p className="text-sm muted">{def.intro}</p>
      <ol className="space-y-3">
        {def.items.map((item) => {
          const value = answers[item.id];
          const yes = item.options[1]?.score ?? 1;
          const numeric = !def.binary && (item.options.length > 5 || item.options.every((o) => /^\d+( —|$)/.test(o.label)));
          const selected = item.options.find((o) => o.score === value);
          return (
            <li key={item.id} className="rounded-xl border border-slate-200 p-3 dark:border-ink-700">
              {def.binary ? (
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm">
                    {item.label}
                    {yes > 1 && <span className="ml-1.5 text-xs font-semibold text-sky-700 dark:text-sky-300">+{yes}</span>}
                  </div>
                  <YesNoToggle value={value === undefined ? undefined : value > 0} onChange={(v) => set(item.id, v ? yes : 0)} />
                </div>
              ) : (
                <>
                  <div className="mb-2 text-sm font-medium">{item.label}</div>
                  {item.hint && <div className="mb-2 text-xs italic muted">{item.hint}</div>}
                  {numeric ? (
                    <>
                      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={item.label}>
                        {item.options.map((o) => (
                          <button
                            key={o.score}
                            type="button"
                            role="radio"
                            aria-checked={value === o.score}
                            aria-label={o.label}
                            onClick={() => set(item.id, o.score)}
                            className={`h-9 w-9 rounded-lg border text-sm font-semibold transition-colors ${
                              value === o.score
                                ? 'border-sky-600 bg-sky-600 text-white dark:border-sky-400 dark:bg-sky-500 dark:text-ink-950'
                                : 'border-slate-300 bg-white hover:border-sky-400 dark:border-ink-700 dark:bg-ink-850'
                            }`}
                          >
                            {o.score}
                          </button>
                        ))}
                      </div>
                      <p className="mt-2 text-xs muted">
                        {selected
                          ? selected.label
                          : item.options
                              .filter((o) => o.label.includes('—'))
                              .map((o) => o.label)
                              .join(' · ')}
                      </p>
                    </>
                  ) : (
                    <div className="grid gap-1.5 sm:grid-cols-2" role="radiogroup" aria-label={item.label}>
                      {item.options.map((o) => (
                        <button
                          key={o.score}
                          type="button"
                          role="radio"
                          aria-checked={value === o.score}
                          onClick={() => set(item.id, o.score)}
                          className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                            value === o.score
                              ? 'border-sky-500 bg-sky-50 dark:border-sky-400 dark:bg-sky-500/10'
                              : 'border-slate-200 bg-white hover:border-sky-300 dark:border-ink-700 dark:bg-ink-850'
                          }`}
                        >
                          <span className="w-5 shrink-0 font-semibold tabular-nums">{o.score}</span>
                          <span>{o.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>

      {/* Sticky running score: opaque backing so content scrolling beneath stays out of view; clears the mobile tab bar. */}
      <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-10 lg:bottom-3">
        {result.band && result.answered > 0 ? (
          <div className="rounded-xl bg-white shadow-lg shadow-slate-900/10 dark:bg-ink-900 dark:shadow-black/40">
          <ResultPanel
            tone={result.band.tone}
            heading={
              <span className="flex flex-wrap items-baseline justify-between gap-2">
                <span>
                  Score {result.total} / {result.max} · {result.band.label}
                </span>
                {!result.complete && (
                  <span className="text-xs font-medium opacity-80">
                    {result.answered}/{def.items.length} items scored — provisional
                  </span>
                )}
              </span>
            }
          >
            {result.band.advice}
          </ResultPanel>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs muted">{def.footnote}</p>
        <button type="button" className="btn-ghost" onClick={() => setAnswers({})}>
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}
