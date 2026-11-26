import { useState } from 'react';
import { Copy, Printer, RotateCcw, Check as CheckIcon } from 'lucide-react';
import { Bullets, Check, ResultPanel, YesNoToggle } from '../components/ui';
import {
  asq,
  cssrs,
  safetLevel,
  SAFET_ACTIONS,
  type AsqInput,
  type Behavior,
  type CssrsInput,
  type Ideation,
} from './logic';
import type { Tone } from '../content/types';

const levelTone: Record<string, Tone> = { none: 'success', low: 'warning', moderate: 'danger', high: 'danger' };

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };
  return { copied, copy };
}

function QRow({ n, q, value, onChange }: { n: string; q: string; value: boolean | undefined; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-3 dark:border-ink-700">
      <p className="text-sm">
        <span className="mr-1 font-semibold text-sky-700 dark:text-sky-300">{n}</span> {q}
      </p>
      <YesNoToggle value={value} onChange={onChange} />
    </div>
  );
}

// ---------------------------------------------------------------------------
export function CssrsTool() {
  const empty: CssrsInput = {
    wishDead: undefined,
    thoughts: undefined,
    method: undefined,
    intent: undefined,
    plan: undefined,
    behaviorEver: undefined,
    behaviorRecent: undefined,
  };
  const [a, setA] = useState<CssrsInput>(empty);
  const set = (k: keyof CssrsInput) => (v: boolean) => setA((s) => ({ ...s, [k]: v }));
  const r = cssrs(a);
  const actions: Record<string, string> = {
    none: 'Screen negative. Ask again if the presentation changes; screening is not a one-time event.',
    low: 'Low acute risk on screen: complete a brief suicide safety assessment, safety plan, give 988, behavioral-health referral.',
    moderate: 'Moderate: behavioral-health evaluation before discharge; consider safety precautions while waiting; lethal-means counseling.',
    high: 'High: immediate safety precautions (continuous observation, remove belongings/means), urgent behavioral-health evaluation; patient should not leave until evaluated.',
  };
  return (
    <div className="space-y-3">
      <p className="text-sm muted">Ask exactly as written, in a private setting. Questions 1–5 cover the past month.</p>
      <QRow n="1" q="Have you wished you were dead or wished you could go to sleep and not wake up?" value={a.wishDead} onChange={set('wishDead')} />
      <QRow n="2" q="Have you actually had any thoughts of killing yourself?" value={a.thoughts} onChange={set('thoughts')} />
      {a.thoughts && (
        <div className="space-y-3 border-l-4 border-sky-300 pl-3 dark:border-sky-700">
          <QRow n="3" q='Have you been thinking about how you might do this? (e.g., "I thought about taking an overdose but never made a specific plan")' value={a.method} onChange={set('method')} />
          <QRow n="4" q="Have you had these thoughts and had some intention of acting on them?" value={a.intent} onChange={set('intent')} />
          <QRow n="5" q="Have you started to work out or worked out the details of how to kill yourself? Do you intend to carry out this plan?" value={a.plan} onChange={set('plan')} />
        </div>
      )}
      <QRow
        n="6"
        q="Have you ever done anything, started to do anything, or prepared to do anything to end your life? (collected pills, obtained a gun, gave away valuables, wrote a will or note, held a gun but changed your mind, cut yourself, tried to hang yourself…)"
        value={a.behaviorEver}
        onChange={set('behaviorEver')}
      />
      {a.behaviorEver && <QRow n="6b" q="Was this within the past 3 months?" value={a.behaviorRecent} onChange={set('behaviorRecent')} />}
      {(r.complete || r.level !== 'none') && (
        <ResultPanel
          tone={levelTone[r.level]}
          heading={`${r.level === 'none' ? 'Negative screen' : `${r.level[0].toUpperCase()}${r.level.slice(1)} risk`}${r.complete ? '' : ' (incomplete)'}`}
        >
          <p>{actions[r.level]}</p>
          {r.drivers.length > 0 && <p className="mt-1 text-xs opacity-80">Driven by: {r.drivers.join('; ')}</p>}
        </ResultPanel>
      )}
      <div className="flex justify-between gap-3">
        <p className="text-xs muted">C-SSRS Screen Version (Columbia Lighthouse Project). A screen triggers assessment; it does not predict who will die by suicide.</p>
        <button type="button" className="btn-ghost shrink-0" onClick={() => setA(empty)}>
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function AsqTool() {
  const empty: AsqInput = { q1: undefined, q2: undefined, q3: undefined, q4: undefined, q5: undefined };
  const [a, setA] = useState<AsqInput>(empty);
  const set = (k: keyof AsqInput) => (v: boolean) => setA((s) => ({ ...s, [k]: v }));
  const r = asq(a);
  const anyYes = [a.q1, a.q2, a.q3, a.q4].some(Boolean);
  const out: Record<string, { tone: Tone; text: string }> = {
    negative: { tone: 'success', text: 'Negative screen. No intervention needed beyond routine care (clinical judgment can always override).' },
    'non-acute positive': {
      tone: 'warning',
      text: 'Non-acute positive: potential risk. A brief suicide safety assessment is required before the patient leaves; not necessarily safe-room level precautions.',
    },
    'acute positive': {
      tone: 'danger',
      text: 'Acute positive: imminent risk. Immediate safety precautions; patient cannot leave until a full mental health evaluation is completed.',
    },
  };
  return (
    <div className="space-y-3">
      <p className="text-sm muted">For ages 10–24 in medical settings (also validated in adult medical inpatients). Refusing to answer counts as a positive.</p>
      <QRow n="1" q="In the past few weeks, have you wished you were dead?" value={a.q1} onChange={set('q1')} />
      <QRow n="2" q="In the past few weeks, have you felt that you or your family would be better off if you were dead?" value={a.q2} onChange={set('q2')} />
      <QRow n="3" q="In the past week, have you been having thoughts about killing yourself?" value={a.q3} onChange={set('q3')} />
      <QRow n="4" q="Have you ever tried to kill yourself? (If yes: how? when?)" value={a.q4} onChange={set('q4')} />
      {anyYes && <QRow n="5" q="Are you having thoughts of killing yourself right now?" value={a.q5} onChange={set('q5')} />}
      {r !== 'incomplete' && (
        <ResultPanel tone={out[r].tone} heading={r[0].toUpperCase() + r.slice(1)}>
          {out[r].text}
        </ResultPanel>
      )}
      <div className="flex justify-between gap-3">
        <p className="text-xs muted">Ask Suicide-Screening Questions (NIMH). Sensitivity ≈97% in pediatric ED validation (Horowitz 2012).</p>
        <button type="button" className="btn-ghost shrink-0" onClick={() => setA(empty)}>
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
const IDEATION: { v: Ideation; label: string }[] = [
  { v: 'none', label: 'Denies suicidal thoughts' },
  { v: 'passive', label: 'Thoughts of death / wish to be dead' },
  { v: 'active', label: 'Active thoughts, no method or plan' },
  { v: 'plan', label: 'Method or plan, no intent' },
  { v: 'intent', label: 'Intent to act (with or without plan)' },
];
const BEHAVIOR: { v: Behavior; label: string }[] = [
  { v: 'none', label: 'No suicidal behavior ever' },
  { v: 'remote', label: 'Attempt >3 months ago' },
  { v: 'recent', label: 'Attempt, aborted or interrupted attempt ≤3 months' },
  { v: 'preparatory', label: 'Preparatory acts or rehearsal (bought means, wrote note)' },
  { v: 'current', label: 'Attempt at this presentation' },
];
const MODIFIERS = [
  'Firearm or stockpiled lethal means accessible',
  'Severe agitation, panic, or global insomnia',
  'Intoxicated now or heavy substance use',
  'Psychosis — command hallucinations or delusional guilt',
  'Severe hopelessness or perceived burdensomeness',
  'Recent loss, humiliation, legal or financial crisis',
  'Discharged from psychiatric care in last 3 months',
  'Lives alone / no one to monitor',
  'Unable or unwilling to engage in safety planning',
  'Collateral contradicts the patient\'s account',
];
const PROTECTIVE = [
  'Engaged in treatment; trusts the team',
  'Reasons for living (children, faith, goals)',
  'Supportive person who will stay and remove means',
  'Can identify coping strategies and help-seeking',
  'Future-oriented plans',
];

export function SafetTool() {
  const [ideation, setIdeation] = useState<Ideation>('none');
  const [behavior, setBehavior] = useState<Behavior>('none');
  const [mods, setMods] = useState<string[]>([]);
  const [prot, setProt] = useState<string[]>([]);
  const { copied, copy } = useCopy();
  const toggle = (list: string[], set: (v: string[]) => void, item: string) =>
    set(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  const { level, why } = safetLevel({ ideation, behavior, modifiers: mods, protective: prot });
  const text = [
    'SUICIDE RISK FORMULATION (SAFE-T)',
    `Ideation: ${IDEATION.find((x) => x.v === ideation)?.label}`,
    `Behavior: ${BEHAVIOR.find((x) => x.v === behavior)?.label}`,
    `Acute modifiers: ${mods.length ? mods.join('; ') : 'none identified'}`,
    `Protective factors: ${prot.length ? prot.join('; ') : 'none identified'}`,
    `Clinical risk level: ${level.toUpperCase()} — ${why}${mods.length ? ' (modifiers present; level reviewed and adjusted by clinical judgment)' : ''}`,
    'Plan:',
    ...SAFET_ACTIONS[level].map((a) => `- ${a}`),
    '- Collaborative safety plan completed; lethal-means counseling documented; 988 provided',
  ].join('\n');

  return (
    <div className="space-y-4">
      <p className="text-sm muted">
        SAFE-T sets the level from <strong>ideation, intent and behavior</strong>. Risk factors and protective factors shape the
        plan — they are not added up into a score, because factor counts do not predict suicide.
      </p>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">1 · Ideation (worst in past month)</legend>
        <div className="grid gap-1.5 sm:grid-cols-2">
          {IDEATION.map((o) => (
            <button key={o.v} type="button" aria-pressed={ideation === o.v} onClick={() => setIdeation(o.v)} className={`option ${ideation === o.v ? 'option-selected' : 'option-idle'} !py-2 !text-sm`}>
              {o.label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">2 · Suicidal behavior</legend>
        <div className="grid gap-1.5 sm:grid-cols-2">
          {BEHAVIOR.map((o) => (
            <button key={o.v} type="button" aria-pressed={behavior === o.v} onClick={() => setBehavior(o.v)} className={`option ${behavior === o.v ? 'option-selected' : 'option-idle'} !py-2 !text-sm`}>
              {o.label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">3 · Acute modifiers (raise concern — may justify a higher level)</legend>
        <div className="grid gap-1.5 sm:grid-cols-2">
          {MODIFIERS.map((m) => (
            <Check key={m} checked={mods.includes(m)} onChange={() => toggle(mods, setMods, m)}>
              {m}
            </Check>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">4 · Protective factors (useful for the plan; weak against high acute risk)</legend>
        <div className="grid gap-1.5 sm:grid-cols-2">
          {PROTECTIVE.map((m) => (
            <Check key={m} checked={prot.includes(m)} onChange={() => toggle(prot, setProt, m)}>
              {m}
            </Check>
          ))}
        </div>
      </fieldset>
      <ResultPanel tone={level === 'low' ? 'warning' : 'danger'} heading={`SAFE-T level: ${level.toUpperCase()}`}>
        <p className="mb-2">{why}.</p>
        <Bullets items={SAFET_ACTIONS[level]} />
        {mods.length > 0 && level !== 'high' && (
          <p className="mt-2 font-medium">
            {mods.length} acute modifier{mods.length > 1 ? 's' : ''} present — decide explicitly whether they move this patient up a level, and document why.
          </p>
        )}
      </ResultPanel>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-primary" onClick={() => copy(text)}>
          {copied ? <CheckIcon size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy formulation'}
        </button>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => {
            setIdeation('none');
            setBehavior('none');
            setMods([]);
            setProt([]);
          }}
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
const PLAN_STEPS = [
  { id: 'warning', title: '1. Warning signs', hint: 'Thoughts, images, moods, situations or behaviors that signal a crisis is starting — in the patient\'s own words.' },
  { id: 'coping', title: '2. Internal coping strategies', hint: 'Things I can do on my own to take my mind off problems (walk, music, shower, prayer).' },
  { id: 'distraction', title: '3. People and places that provide distraction', hint: 'Names/places — not for discussing the crisis, just for company.' },
  { id: 'help', title: '4. People I can ask for help', hint: 'Names and phone numbers of people the patient would actually call.' },
  { id: 'pros', title: '5. Professionals and crisis services', hint: 'Clinician name and number; 988 (call, text or chat); local emergency department; 911.' },
  { id: 'means', title: '6. Making the environment safe', hint: 'Concrete steps for each method: who will store the firearm off-site, lock up or dispose of medications, by when.' },
  { id: 'reason', title: 'The one thing most important to me / worth living for', hint: '' },
];

export function SafetyPlanTool() {
  const [v, setV] = useState<Record<string, string>>({ pros: '988 Suicide & Crisis Lifeline — call or text 988, or chat at 988lifeline.org\n' });
  const { copied, copy } = useCopy();
  const text = PLAN_STEPS.map((s) => `${s.title}\n${v[s.id]?.trim() || '—'}`).join('\n\n');
  return (
    <div className="space-y-3">
      <p className="text-sm muted">
        Stanley–Brown Safety Planning Intervention. Write it <em>with</em> the patient, in their words, then print or photograph it. Nothing
        typed here is stored.
      </p>
      {PLAN_STEPS.map((s) => (
        <label key={s.id} className="block">
          <span className="text-sm font-semibold">{s.title}</span>
          {s.hint && <span className="block text-xs muted">{s.hint}</span>}
          <textarea
            className="input mt-1 min-h-[72px]"
            value={v[s.id] ?? ''}
            onChange={(e) => setV((x) => ({ ...x, [s.id]: e.target.value }))}
          />
        </label>
      ))}
      <div className="no-print flex flex-wrap gap-2">
        <button type="button" className="btn-primary" onClick={() => window.print()}>
          <Printer size={16} /> Print
        </button>
        <button type="button" className="btn-ghost" onClick={() => copy(text)}>
          {copied ? <CheckIcon size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy text'}
        </button>
        <button type="button" className="btn-ghost" onClick={() => setV({})}>
          <RotateCcw size={16} /> Clear
        </button>
      </div>
    </div>
  );
}
