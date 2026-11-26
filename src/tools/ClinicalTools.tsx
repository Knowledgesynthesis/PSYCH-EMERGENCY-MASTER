import { useState } from 'react';
import { Copy, RotateCcw, Check as CheckIcon } from 'lucide-react';
import { Bullets, Callout, Check, ResultPanel, toneStyles } from '../components/ui';
import { AGITATION_PLANS, extrip, hunter, RED_FLAGS, type AgitationCause, type HunterInput } from './logic';
import { BARS_LEVELS } from './instrument';

// ---------------------------------------------------------------------------
const HUNTER_FIELDS: { k: keyof HunterInput; label: string }[] = [
  { k: 'spontaneousClonus', label: 'Spontaneous clonus' },
  { k: 'inducibleClonus', label: 'Inducible clonus (ankle — sustained beats)' },
  { k: 'ocularClonus', label: 'Ocular clonus (slow horizontal "ping-pong" eye movements)' },
  { k: 'agitation', label: 'Agitation' },
  { k: 'diaphoresis', label: 'Diaphoresis' },
  { k: 'tremor', label: 'Tremor' },
  { k: 'hyperreflexia', label: 'Hyperreflexia' },
  { k: 'hypertonia', label: 'Hypertonia (often lower limbs > upper)' },
  { k: 'tempOver38', label: 'Temperature >38 °C' },
];

const emptyHunter: HunterInput = {
  serotonergic: false,
  spontaneousClonus: false,
  inducibleClonus: false,
  ocularClonus: false,
  agitation: false,
  diaphoresis: false,
  tremor: false,
  hyperreflexia: false,
  hypertonia: false,
  tempOver38: false,
};

export function HunterTool() {
  const [v, setV] = useState<HunterInput>(emptyHunter);
  const r = hunter(v);
  const any = HUNTER_FIELDS.some((f) => v[f.k]);
  return (
    <div className="space-y-3">
      <p className="text-sm muted">Examine the legs: clonus and hyperreflexia are usually most obvious in the lower limbs.</p>
      <Check checked={v.serotonergic} onChange={(c) => setV((s) => ({ ...s, serotonergic: c }))}>
        <strong>Exposure to a serotonergic agent</strong> (required — SSRI/SNRI, MAOI incl. linezolid & methylene blue, tramadol, meperidine,
        methadone, fentanyl, dextromethorphan, lithium, MDMA, St John&apos;s wort…)
      </Check>
      <div className="grid gap-1.5 sm:grid-cols-2">
        {HUNTER_FIELDS.map((f) => (
          <Check key={f.k} checked={v[f.k]} onChange={(c) => setV((s) => ({ ...s, [f.k]: c }))}>
            {f.label}
          </Check>
        ))}
      </div>
      {(any || v.serotonergic) &&
        (r.met ? (
          <ResultPanel tone="danger" heading="Meets Hunter criteria for serotonin toxicity">
            Rule satisfied: <strong>{r.rule}</strong>. Stop all serotonergic drugs, give benzodiazepines, consider cyproheptadine; temperature
            &gt;41 °C or rising rigidity → sedation, paralysis with a non-depolarizing agent and intubation.
          </ResultPanel>
        ) : (
          <ResultPanel tone="warning" heading={v.serotonergic ? 'Hunter criteria not met' : 'Hunter criteria require serotonergic exposure'}>
            {v.serotonergic
              ? 'Does not meet a decision rule. Re-examine for clonus (it can be masked by severe rigidity) and consider NMS, anticholinergic toxicity, sympathomimetics, malignant catatonia, infection.'
              : 'Without a serotonergic agent the rules do not apply — consider other causes of hyperthermia and neuromuscular excitation.'}
          </ResultPanel>
        ))}
      <div className="flex justify-between gap-3">
        <p className="text-xs muted">Hunter criteria: sensitivity 84%, specificity 97% vs. toxicologist diagnosis (Dunkley 2003); more accurate than Sternbach.</p>
        <button type="button" className="btn-ghost shrink-0" onClick={() => setV(emptyHunter)}>
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function ExtripTool() {
  const [level, setLevel] = useState('');
  const [f, setF] = useState({
    impairedKidney: false,
    decreasedConsciousness: false,
    seizures: false,
    dysrhythmia: false,
    confusion: false,
    slowClearance: false,
  });
  const num = level.trim() === '' ? undefined : Number(level);
  const r = extrip({ level: Number.isFinite(num) ? num : undefined, ...f });
  const fields: { k: keyof typeof f; label: string }[] = [
    { k: 'impairedKidney', label: 'Impaired kidney function (eGFR <45 or AKI)' },
    { k: 'decreasedConsciousness', label: 'Decreased level of consciousness' },
    { k: 'seizures', label: 'Seizures' },
    { k: 'dysrhythmia', label: 'Life-threatening dysrhythmia' },
    { k: 'confusion', label: 'Significant confusion' },
    { k: 'slowClearance', label: 'Expected >36 h to reach <1.0 mEq/L with optimal management' },
  ];
  const tone = r.verdict === 'recommended' ? 'danger' : r.verdict === 'suggested' ? 'warning' : 'success';
  return (
    <div className="space-y-3">
      <label className="block max-w-xs">
        <span className="text-sm font-semibold">Serum lithium (mEq/L = mmol/L)</span>
        <input inputMode="decimal" className="input mt-1" placeholder="e.g. 3.2" value={level} onChange={(e) => setLevel(e.target.value)} />
      </label>
      <div className="grid gap-1.5 sm:grid-cols-2">
        {fields.map((x) => (
          <Check key={x.k} checked={f[x.k]} onChange={(c) => setF((s) => ({ ...s, [x.k]: c }))}>
            {x.label}
          </Check>
        ))}
      </div>
      <ResultPanel tone={tone} heading={`Extracorporeal removal (hemodialysis): ${r.verdict}`}>
        {r.reasons.length > 0 ? (
          <Bullets items={r.reasons} />
        ) : (
          <p>No EXTRIP criterion met. Stop lithium, give isotonic fluids, avoid NSAIDs/ACE-I/ARBs/thiazides, whole-bowel irrigation for large sustained-release ingestions, and repeat levels every 2–6 h.</p>
        )}
        {r.verdict !== 'not indicated' && (
          <p className="mt-2">Intermittent hemodialysis is preferred; continue until level &lt;1.0 mEq/L or clinical recovery, and recheck for rebound 6–12 h after.</p>
        )}
      </ResultPanel>
      <p className="text-xs muted">
        EXTRIP workgroup (Decker 2015). Chronic toxicity causes more neurotoxicity at lower levels than acute overdose; treat the patient, not
        just the number.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
type Ability = 'intact' | 'impaired' | 'unclear';
const ABILITIES: { id: string; name: string; ask: string }[] = [
  { id: 'choice', name: 'Communicate a choice', ask: '"Have you decided what you want to do?" — stable over time?' },
  { id: 'understand', name: 'Understand the information', ask: '"Tell me in your own words what is wrong, what we recommend, and the risks and benefits."' },
  { id: 'appreciate', name: 'Appreciate how it applies to them', ask: '"What do you think will happen if you are not treated? Why do you think we recommend this?"' },
  { id: 'reason', name: 'Reason with the information', ask: '"How did you weigh the options? Why is that choice better for you?"' },
];

export function CapacityTool() {
  const [decision, setDecision] = useState('');
  const [risk, setRisk] = useState<'low' | 'moderate' | 'high'>('high');
  const [a, setA] = useState<Record<string, Ability | undefined>>({});
  const { copied, copy } = useCopyLocal();
  const values = ABILITIES.map((x) => a[x.id]);
  const done = values.every(Boolean);
  const impaired = ABILITIES.filter((x) => a[x.id] === 'impaired');
  const unclear = ABILITIES.filter((x) => a[x.id] === 'unclear');
  const verdict = !done
    ? null
    : impaired.length
      ? 'lacks'
      : unclear.length
        ? risk === 'low'
          ? 'has'
          : 'indeterminate'
        : 'has';
  const text = [
    `CAPACITY ASSESSMENT — decision: ${decision || '[specify]'}`,
    `Stakes of the decision: ${risk}`,
    ...ABILITIES.map((x) => `${x.name}: ${a[x.id] ?? 'not assessed'}`),
    `Conclusion: patient ${verdict === 'has' ? 'HAS' : verdict === 'lacks' ? 'LACKS' : 'has INDETERMINATE'} capacity for this specific decision at this time.`,
    'Reversible contributors addressed (delirium, intoxication, pain, language/hearing): [document]',
    'Plan: [surrogate per local law / honor informed choice / reassess at ___]',
  ].join('\n');
  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-sm font-semibold">The specific decision</span>
        <input className="input mt-1" placeholder="e.g., refusing CT head after a fall on anticoagulation" value={decision} onChange={(e) => setDecision(e.target.value)} />
      </label>
      <div>
        <span className="text-sm font-semibold">Stakes (sliding scale)</span>
        <div className="mt-1 grid grid-cols-3 gap-1.5">
          {(['low', 'moderate', 'high'] as const).map((r) => (
            <button key={r} type="button" aria-pressed={risk === r} onClick={() => setRisk(r)} className={`option ${risk === r ? 'option-selected' : 'option-idle'} !py-2 text-center !text-sm capitalize`}>
              {r}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs muted">Higher stakes (refusing effective, life-saving care) demand clearer evidence of each ability.</p>
      </div>
      {ABILITIES.map((x) => (
        <div key={x.id} className="rounded-xl border border-slate-200 p-3 dark:border-ink-700">
          <div className="text-sm font-semibold">{x.name}</div>
          <div className="mb-2 text-xs italic muted">{x.ask}</div>
          <div className="grid grid-cols-3 gap-1.5">
            {(['intact', 'impaired', 'unclear'] as Ability[]).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={a[x.id] === v}
                onClick={() => setA((s) => ({ ...s, [x.id]: v }))}
                className={`option !py-1.5 text-center !text-sm capitalize ${a[x.id] === v ? (v === 'impaired' ? 'option-wrong' : v === 'intact' ? 'option-correct' : 'option-selected') : 'option-idle'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      ))}
      {verdict && (
        <ResultPanel
          tone={verdict === 'has' ? 'success' : verdict === 'lacks' ? 'danger' : 'warning'}
          heading={verdict === 'has' ? 'Has capacity for this decision' : verdict === 'lacks' ? 'Lacks capacity for this decision' : 'Indeterminate — gather more'}
        >
          {verdict === 'lacks' && `Impaired: ${impaired.map((x) => x.name.toLowerCase()).join(', ')}. Treat reversible causes, use a surrogate per local law, act in best interests in an emergency, reassess.`}
          {verdict === 'has' && 'A capacitated refusal must be respected even if unwise. Document the discussion, offer alternatives, leave the door open.'}
          {verdict === 'indeterminate' && 'For a high-stakes decision, unclear abilities are not enough. Optimize communication, treat confounders, re-interview, consider psychiatry or a structured tool (ACE, MacCAT-T).'}
        </ResultPanel>
      )}
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-primary" onClick={() => copy(text)}>
          {copied ? <CheckIcon size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy note template'}
        </button>
        <button type="button" className="btn-ghost" onClick={() => { setA({}); setDecision(''); }}>
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}

function useCopyLocal() {
  const [copied, setCopied] = useState(false);
  return {
    copied,
    copy: async (t: string) => {
      try {
        await navigator.clipboard.writeText(t);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        /* ignore */
      }
    },
  };
}

// ---------------------------------------------------------------------------
export function AgitationTool() {
  const [cause, setCause] = useState<AgitationCause>('undifferentiated');
  const plan = AGITATION_PLANS.find((p) => p.cause === cause)!;
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-semibold">Most likely driver</p>
        <div className="flex flex-wrap gap-1.5">
          {AGITATION_PLANS.map((p) => (
            <button
              key={p.cause}
              type="button"
              aria-pressed={cause === p.cause}
              onClick={() => setCause(p.cause)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                cause === p.cause
                  ? 'border-sky-600 bg-sky-600 text-white dark:border-sky-400 dark:bg-sky-500 dark:text-ink-950'
                  : 'border-slate-300 bg-white hover:border-sky-400 dark:border-ink-700 dark:bg-ink-850'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>
      <div aria-live="polite" className="space-y-4">
        <Callout tone={plan.tone} title={plan.title}>
          {plan.principle}
        </Callout>
        <div className="grid gap-3 md:grid-cols-2">
          <RegimenList title="Cooperative — offer oral/SL first" items={plan.cooperative} />
          <RegimenList title="Severe / imminent danger" items={plan.severe} />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className={`rounded-xl border p-3 text-sm ${toneStyles.danger.box}`}>
          <p className={`mb-1 font-semibold ${toneStyles.danger.title}`}>Avoid</p>
          <div className={toneStyles.danger.text}>
            <Bullets items={plan.avoid} />
          </div>
        </div>
        <div className={`rounded-xl border p-3 text-sm ${toneStyles.neutral.box}`}>
          <p className={`mb-1 font-semibold ${toneStyles.neutral.title}`}>Monitor</p>
          <div className={toneStyles.neutral.text}>
            <Bullets items={plan.monitor} />
          </div>
        </div>
      </div>
      <p className="text-xs muted">Adult doses; reduce ~50% for frail or older adults. Check local formulary and protocol.</p>
    </div>
  );
}

function RegimenList({ title, items }: { title: string; items: { label: string; detail: string }[] }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3 dark:border-ink-700">
      <p className="mb-2 text-sm font-semibold">{title}</p>
      <ul className="space-y-2">
        {items.map((r) => (
          <li key={r.label} className="text-sm">
            <span className="font-semibold text-sky-800 dark:text-sky-300">{r.label}</span>
            <span className="block muted">{r.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function BarsTool() {
  const [s, setS] = useState<number | null>(null);
  const level = BARS_LEVELS.find((l) => l.score === s);
  return (
    <div className="space-y-3">
      <p className="text-sm muted">Behavioural Activity Rating Scale — rate what you see. Target after tranquilization: 4 (quiet and awake).</p>
      <div className="space-y-1.5" role="radiogroup" aria-label="BARS level">
        {BARS_LEVELS.map((l) => (
          <button
            key={l.score}
            type="button"
            role="radio"
            aria-checked={s === l.score}
            onClick={() => setS(l.score)}
            className={`option flex items-center gap-3 !py-2 ${s === l.score ? 'option-selected' : 'option-idle'}`}
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${toneStyles[l.tone].bar}`}>{l.score}</span>
            <span className="text-sm">{l.label}</span>
          </button>
        ))}
      </div>
      {level && (
        <ResultPanel tone={level.tone} heading={`BARS ${level.score}`}>
          {level.action}
        </ResultPanel>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
export function RedFlagsTool() {
  const [on, setOn] = useState<string[]>([]);
  const hits = RED_FLAGS.filter((f) => on.includes(f.id));
  return (
    <div className="space-y-3">
      <p className="text-sm muted">Tick everything present. Any one flag means a medical cause must be actively excluded before attributing symptoms to a primary psychiatric disorder.</p>
      <div className="grid gap-1.5 md:grid-cols-2">
        {RED_FLAGS.map((f) => (
          <Check key={f.id} checked={on.includes(f.id)} onChange={(c) => setOn((s) => (c ? [...s, f.id] : s.filter((x) => x !== f.id)))}>
            {f.label}
          </Check>
        ))}
      </div>
      {hits.length > 0 ? (
        <ResultPanel tone="danger" heading={`${hits.length} red flag${hits.length > 1 ? 's' : ''} — targeted medical workup`}>
          <ul className="space-y-1.5">
            {hits.map((h) => (
              <li key={h.id}>
                <strong>{h.label.split(' (')[0]}:</strong> {h.workup}
              </li>
            ))}
          </ul>
        </ResultPanel>
      ) : (
        <ResultPanel tone="success" heading="No red flags selected">
          In an alert, cooperative patient with normal vital signs, a known psychiatric history and a non-contributory history and exam, routine
          labs rarely change management (ACEP 2017/2023). Test what the history and exam point to — plus glucose, and pregnancy test when relevant.
        </ResultPanel>
      )}
    </div>
  );
}
