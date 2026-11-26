import { useState } from 'react';
import { Moon, Phone, RotateCcw, Sun } from 'lucide-react';
import { Page, PageHeader } from '../components/Layout';
import { useTheme } from '../lib/theme';
import { useProgress } from '../lib/progress';
import { LAST_REVIEWED, MODULES } from '../content/modules';
import { QUESTIONS } from '../content/questions';
import { CASES } from '../content/cases';
import { TOOLS } from '../tools/registry';

export default function About() {
  const { theme, setTheme } = useTheme();
  const { reset } = useProgress();
  const [confirming, setConfirming] = useState(false);

  return (
    <Page>
      <PageHeader eyebrow="About & settings" title="How this works" />

      <div className="space-y-5">
        <section className="card space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Designed for mastery</h2>
          <p>
            Each module opens with objectives and a 60-second bottom line, teaches through tables, steps and “think first” prompts, embeds the
            validated instrument you would use at the bedside, lists the pitfalls that harm patients, and ends with retrieval practice. Mastery
            is earned, not clicked: a module counts as mastered when you have answered all its questions and your latest attempts are ≥80% correct.
          </p>
          <p>
            Suggested loop: <strong>read a module → check yourself → run its case → review flashcards on the following days</strong>. Spaced
            retrieval beats re-reading.
          </p>
          <p className="muted">
            {MODULES.length} modules · {QUESTIONS.length} questions · {CASES.length} cases · {TOOLS.length} instruments. Works offline once loaded
            and can be installed as an app.
          </p>
        </section>

        <section className="card space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Evidence policy</h2>
          <p>
            Content was reviewed against current guidelines and primary trials in {LAST_REVIEWED}: ACEP clinical policies (2017 psychiatric patient;
            2024 severe agitation), Project BETA, the APA delirium guideline (2025), SCCM PADIS focused update (2025), ASAM alcohol withdrawal (2020)
            and the joint benzodiazepine tapering guideline (2025), BAP catatonia guideline (2023), NICE NG225 (2022), VA/DoD suicide guideline
            (2024), CANMAT/ISBD, EXTRIP, and FDA/CDC safety communications through 2026. Each module lists its key sources with links.
          </p>
          <p>
            Scores and instruments follow their original publications. Where evidence is thin (e.g., cyproheptadine, bromocriptine, dantrolene),
            the text says so. Doses are typical adult starting doses.
          </p>
        </section>

        <section className="card">
          <h2 className="mb-3 text-lg font-bold">Appearance</h2>
          <div className="grid max-w-sm grid-cols-2 gap-2">
            {(['light', 'dark'] as const).map((t) => (
              <button key={t} type="button" aria-pressed={theme === t} onClick={() => setTheme(t)} className={`option flex items-center justify-center gap-2 ${theme === t ? 'option-selected' : 'option-idle'}`}>
                {t === 'light' ? <Sun size={18} /> : <Moon size={18} />} <span className="capitalize">{t}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="mb-1 text-lg font-bold">Your progress</h2>
          <p className="mb-3 text-sm muted">Stored only on this device. Nothing is sent anywhere.</p>
          {confirming ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn bg-rose-600 text-white hover:bg-rose-700"
                onClick={() => {
                  reset();
                  setConfirming(false);
                }}
              >
                Yes, erase all progress
              </button>
              <button type="button" className="btn-ghost" onClick={() => setConfirming(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button type="button" className="btn-ghost" onClick={() => setConfirming(true)}>
              <RotateCcw size={16} /> Reset progress
            </button>
          )}
        </section>

        <section className="card border-rose-300 dark:border-rose-500/40">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
            <Phone size={18} className="text-rose-500" aria-hidden /> Crisis resources (US)
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>988 Suicide & Crisis Lifeline</strong> — call or text 988, or chat at 988lifeline.org. Veterans: press 1. Spanish: press 2.
            </li>
            <li>
              <strong>Crisis Text Line</strong> — text HOME to 741741.
            </li>
            <li>
              <strong>The Trevor Project</strong> (LGBTQ+ youth) — 1-866-488-7386.
            </li>
            <li>
              <strong>Emergency</strong> — 911. Outside the US: findahelpline.com.
            </li>
          </ul>
        </section>

        <p className="text-center text-xs muted">
          Psych Emergency Master v2.0 · evidence reviewed {LAST_REVIEWED} · for clinician education; verify doses and follow local law and protocol.
        </p>
      </div>
    </Page>
  );
}
