import type { Tone } from '../content/types';

// ---------------------------------------------------------------------------
// Hunter Serotonin Toxicity Criteria — Dunkley et al., QJM 2003 (sens 84%, spec 97%).
// ---------------------------------------------------------------------------
export interface HunterInput {
  serotonergic: boolean;
  spontaneousClonus: boolean;
  inducibleClonus: boolean;
  ocularClonus: boolean;
  agitation: boolean;
  diaphoresis: boolean;
  tremor: boolean;
  hyperreflexia: boolean;
  hypertonia: boolean;
  tempOver38: boolean;
}

export interface HunterResult {
  met: boolean;
  rule: string | null;
}

export function hunter(i: HunterInput): HunterResult {
  if (!i.serotonergic) return { met: false, rule: null };
  const agitOrSweat = i.agitation || i.diaphoresis;
  if (i.spontaneousClonus) return { met: true, rule: 'Spontaneous clonus' };
  if (i.inducibleClonus && agitOrSweat) return { met: true, rule: 'Inducible clonus + agitation or diaphoresis' };
  if (i.ocularClonus && agitOrSweat) return { met: true, rule: 'Ocular clonus + agitation or diaphoresis' };
  if (i.tremor && i.hyperreflexia) return { met: true, rule: 'Tremor + hyperreflexia' };
  if (i.hypertonia && i.tempOver38 && (i.ocularClonus || i.inducibleClonus))
    return { met: true, rule: 'Hypertonia + temperature >38 °C + ocular or inducible clonus' };
  return { met: false, rule: null };
}

// ---------------------------------------------------------------------------
// C-SSRS Screen Version (recent) — Posner et al. 2011; triage per Columbia screener.
// ---------------------------------------------------------------------------
export type YesNo = boolean | undefined;

export interface CssrsInput {
  wishDead: YesNo; // Q1 past month
  thoughts: YesNo; // Q2 past month
  method: YesNo; // Q3 (only if Q2)
  intent: YesNo; // Q4 (only if Q2)
  plan: YesNo; // Q5 (only if Q2)
  behaviorEver: YesNo; // Q6 lifetime
  behaviorRecent: YesNo; // Q6b within past 3 months
}

export type RiskLevel = 'none' | 'low' | 'moderate' | 'high';

export function cssrs(i: CssrsInput): { level: RiskLevel; complete: boolean; drivers: string[] } {
  const drivers: string[] = [];
  const needsFollowUps = i.thoughts === true;
  const complete =
    i.wishDead !== undefined &&
    i.thoughts !== undefined &&
    (!needsFollowUps || (i.method !== undefined && i.intent !== undefined && i.plan !== undefined)) &&
    i.behaviorEver !== undefined &&
    (i.behaviorEver !== true || i.behaviorRecent !== undefined);

  let level: RiskLevel = 'none';
  const raise = (l: RiskLevel, why: string) => {
    drivers.push(why);
    const order: RiskLevel[] = ['none', 'low', 'moderate', 'high'];
    if (order.indexOf(l) > order.indexOf(level)) level = l;
  };
  if (i.wishDead) raise('low', 'Wish to be dead (Q1)');
  if (i.thoughts) raise('low', 'Non-specific active suicidal thoughts (Q2)');
  if (needsFollowUps && i.method) raise('moderate', 'Thoughts of method without intent (Q3)');
  if (needsFollowUps && i.intent) raise('high', 'Intent to act (Q4)');
  if (needsFollowUps && i.plan) raise('high', 'Plan with intent (Q5)');
  if (i.behaviorEver && i.behaviorRecent) raise('high', 'Suicidal behavior within past 3 months (Q6)');
  else if (i.behaviorEver && i.behaviorRecent === false) raise('moderate', 'Lifetime suicidal behavior >3 months ago (Q6)');
  return { level, complete, drivers };
}

// ---------------------------------------------------------------------------
// ASQ — Horowitz et al. 2012 (NIMH). Ages 10–24 in medical settings; also validated in adults.
// ---------------------------------------------------------------------------
export interface AsqInput {
  q1: YesNo;
  q2: YesNo;
  q3: YesNo;
  q4: YesNo;
  q5: YesNo; // acuity question, asked only if any of 1–4 is yes
  declined?: boolean;
}

export type AsqResult = 'incomplete' | 'negative' | 'non-acute positive' | 'acute positive';

export function asq(i: AsqInput): AsqResult {
  const base = [i.q1, i.q2, i.q3, i.q4];
  const anyYes = base.some((v) => v === true) || !!i.declined;
  if (!anyYes) return base.every((v) => v === false) ? 'negative' : 'incomplete';
  if (i.q5 === undefined) return 'incomplete';
  return i.q5 ? 'acute positive' : 'non-acute positive';
}

// ---------------------------------------------------------------------------
// SAFE-T formulation (SAMHSA). Level is driven by ideation/intent/behavior, NOT by
// counting risk factors — counts have poor predictive value (Large 2016; NICE NG225).
// ---------------------------------------------------------------------------
export type Ideation = 'none' | 'passive' | 'active' | 'plan' | 'intent';
export type Behavior = 'none' | 'remote' | 'recent' | 'preparatory' | 'current';

export interface SafetInput {
  ideation: Ideation;
  behavior: Behavior;
  modifiers: string[];
  protective: string[];
}

export function safetLevel(i: SafetInput): { level: Exclude<RiskLevel, 'none'>; why: string } {
  if (i.ideation === 'intent') return { level: 'high', why: 'Suicidal ideation with intent' };
  if (i.behavior === 'current') return { level: 'high', why: 'Suicide attempt at this presentation' };
  if (i.behavior === 'preparatory') return { level: 'high', why: 'Preparatory behavior or rehearsal' };
  if (i.behavior === 'recent' && (i.ideation === 'active' || i.ideation === 'plan'))
    return { level: 'high', why: 'Recent attempt with persistent active ideation' };
  if (i.ideation === 'plan') return { level: 'moderate', why: 'Ideation with plan/method but no intent or behavior' };
  if (i.behavior === 'recent') return { level: 'moderate', why: 'Attempt within the past 3 months' };
  return { level: 'low', why: 'Thoughts of death or non-specific ideation without plan, intent, or behavior' };
}

export const SAFET_ACTIONS: Record<'low' | 'moderate' | 'high', string[]> = {
  high: [
    'Psychiatric admission generally indicated unless a significant change reduces risk',
    'Suicide precautions: continuous observation, search belongings, ligature-safe room',
    'Do not leave alone; involuntary hold if refusing and criteria met',
  ],
  moderate: [
    'Admission may be necessary depending on modifiers and supports — decide explicitly and document why',
    'Collaborative safety plan + lethal-means counseling before any discharge',
    'Follow-up within 24–72 h (warm handoff), caring contacts, involve family with consent',
  ],
  low: [
    'Outpatient referral with symptom-targeted treatment',
    'Safety plan and lethal-means counseling still apply',
    'Give 988 (call/text/chat) and a dated follow-up appointment',
  ],
};

// ---------------------------------------------------------------------------
// EXTRIP lithium poisoning recommendations — Decker et al., CJASN 2015.
// ---------------------------------------------------------------------------
export interface ExtripInput {
  level?: number; // mEq/L (= mmol/L)
  impairedKidney: boolean;
  decreasedConsciousness: boolean;
  seizures: boolean;
  dysrhythmia: boolean;
  confusion: boolean;
  slowClearance: boolean; // expected >36 h to reach <1.0
}

export function extrip(i: ExtripInput): { verdict: 'recommended' | 'suggested' | 'not indicated'; reasons: string[] } {
  const rec: string[] = [];
  const sug: string[] = [];
  const lvl = i.level ?? 0;
  if (lvl > 4.0 && i.impairedKidney) rec.push('Level >4.0 mEq/L with impaired kidney function');
  if (i.decreasedConsciousness) rec.push('Decreased level of consciousness');
  if (i.seizures) rec.push('Seizures');
  if (i.dysrhythmia) rec.push('Life-threatening dysrhythmia');
  if (rec.length) return { verdict: 'recommended', reasons: rec };
  if (lvl > 5.0) sug.push('Level >5.0 mEq/L');
  if (i.confusion) sug.push('Significant confusion');
  if (i.slowClearance) sug.push('Expected time to reach <1.0 mEq/L with optimal management >36 h');
  if (sug.length) return { verdict: 'suggested', reasons: sug };
  return { verdict: 'not indicated', reasons: [] };
}

// ---------------------------------------------------------------------------
// Medical red flags before attributing symptoms to a primary psychiatric illness.
// ---------------------------------------------------------------------------
export interface RedFlag {
  id: string;
  label: string;
  workup: string;
}

export const RED_FLAGS: RedFlag[] = [
  { id: 'vitals', label: 'Abnormal vital signs (fever, HR >120, SBP >180 or <90, RR >24, SpO₂ <94%)', workup: 'Repeat vitals; CBC, BMP, lactate, cultures/UA/CXR as indicated; ECG' },
  { id: 'attention', label: 'Inattention, drowsiness, or fluctuating level of consciousness', workup: '4AT/CAM; delirium workup (glucose, electrolytes incl. Ca/Mg, renal/hepatic, UA, CXR, med review)' },
  { id: 'firstOnset', label: 'First psychiatric presentation after age ~40–45, or no prior psychiatric history', workup: 'TSH, B12, syphilis and HIV tests, calcium; low threshold for MRI/CT' },
  { id: 'acute', label: 'Abrupt onset over hours to days', workup: 'Treat as medical until proven otherwise: neuro exam, glucose, toxicology, imaging as indicated' },
  { id: 'neuro', label: 'Focal neurologic signs, new severe headache, seizure, or head trauma', workup: 'CT head (MRI when available), consider EEG, LP' },
  { id: 'hallucinations', label: 'Visual, tactile, or olfactory hallucinations', workup: 'Think delirium, intoxication/withdrawal, seizures, Lewy body disease, structural lesion' },
  { id: 'toxidrome', label: 'Toxidrome features (pupils, skin moisture, bowel sounds, clonus, rigidity)', workup: 'ECG (QRS/QTc), acetaminophen and salicylate levels, CK, poison center' },
  { id: 'meds', label: 'New/changed medication (steroids, anticholinergics, dopaminergics, opioids, antibiotics, interferon)', workup: 'Structured medication reconciliation; stop/adjust culprit' },
  { id: 'immuno', label: 'Immunocompromise, cancer, HIV, or autoimmune disease', workup: 'MRI with contrast, LP (incl. autoimmune encephalitis panel), infectious workup' },
  { id: 'catatonia', label: 'Catatonic signs, dyskinesias, or autonomic instability in new psychosis', workup: 'BFCSI; CK; consider anti-NMDAR encephalitis (CSF antibodies, MRI, EEG)' },
  { id: 'perinatal', label: 'Pregnant or within 6 weeks postpartum', workup: 'hCG; preeclampsia/eclampsia screen (BP, urine protein), thyroid, sodium; postpartum psychosis is an emergency' },
  { id: 'alcohol', label: 'Heavy alcohol use or malnutrition', workup: 'Empiric high-dose IV thiamine; Mg, phosphate; PAWSS; assess for Wernicke (eye signs, ataxia, confusion)' },
];

// ---------------------------------------------------------------------------
// Agitation regimens by etiology (adult doses unless stated).
// Sources: ACEP Clinical Policy on Severe Agitation (2024); Project BETA psychopharmacology
// workgroup (Wilson 2012); APA delirium guideline (2025); product labeling.
// ---------------------------------------------------------------------------
export type AgitationCause =
  | 'undifferentiated'
  | 'psychosis'
  | 'alcohol-intox'
  | 'withdrawal'
  | 'stimulant'
  | 'delirium'
  | 'dementia'
  | 'pregnancy';

export interface Regimen {
  label: string;
  detail: string;
}

export interface AgitationPlan {
  cause: AgitationCause;
  title: string;
  principle: string;
  cooperative: Regimen[];
  severe: Regimen[];
  avoid: string[];
  monitor: string[];
  tone: Tone;
}

export const AGITATION_PLANS: AgitationPlan[] = [
  {
    cause: 'undifferentiated',
    title: 'Undifferentiated / cause unclear',
    principle: 'Treat the danger while you look for the cause. Check glucose, SpO₂ and temperature as soon as safely possible.',
    cooperative: [
      { label: 'Olanzapine 5–10 mg ODT/PO', detail: 'or risperidone 2 mg PO/ODT. Oral = as effective as IM for patients who will accept it, and preserves alliance.' },
      { label: 'Lorazepam 1–2 mg PO', detail: 'when anxiety dominates or alcohol/sedative withdrawal is possible.' },
    ],
    severe: [
      { label: 'Droperidol 5–10 mg IM + midazolam 5 mg IM', detail: 'ACEP 2024: fastest, most effective combination for severe agitation in the ED.' },
      { label: 'Olanzapine 10 mg IM (± midazolam)', detail: 'Atypical + midazolam is the alternative combination. Avoid IM olanzapine with a parenteral benzodiazepine in alcohol-intoxicated or hypoxic patients.' },
      { label: 'Haloperidol 5 mg IM + lorazepam 2 mg IM', detail: 'Effective; slower. Add promethazine 25–50 mg or diphenhydramine 50 mg to reduce dystonia (TREC trials) unless delirium is suspected.' },
      { label: 'Ketamine 4–5 mg/kg IM (1–2 mg/kg IV)', detail: 'Reserve for extreme, immediately dangerous agitation when airway equipment and continuous monitoring are ready; higher intubation rates.' },
    ],
    avoid: [
      'Midazolam alone if you can only give one drug — prefer droperidol or an atypical (ACEP Level B)',
      'Prone or hobbled restraint; weight on the back or neck',
      'Delaying sedation of an immediately dangerous patient to obtain an ECG — get it once safe',
    ],
    monitor: ['BARS/RASS every 15 min until calm', 'SpO₂ ± capnography after parenteral sedation', 'ECG once safe if QT-prolonging drug given or cardiac risk'],
    tone: 'warning',
  },
  {
    cause: 'psychosis',
    title: 'Known psychosis or mania',
    principle: 'Prefer oral and the patient\'s own effective antipsychotic. Offer choices — it reduces coercion and restraint.',
    cooperative: [
      { label: 'Olanzapine 10 mg ODT or risperidone 2 mg PO', detail: 'Add lorazepam 1–2 mg PO if needed.' },
      { label: 'Dexmedetomidine SL film 120 mcg (mild–moderate) / 180 mcg (severe)', detail: 'Igalmi; labeled for schizophrenia/bipolar agitation; onset ~20–30 min; optional 60/90 mcg repeats up to twice, ≥2 h apart (120 mcg start if ≥65 y). Hold repeats for hypotension, bradycardia or orthostasis. At-home use approved Nov 2026.' },
      { label: 'Inhaled loxapine 10 mg', detail: 'Single dose/24 h; REMS — only where bronchospasm can be treated; contraindicated in asthma/COPD.' },
    ],
    severe: [
      { label: 'Olanzapine 10 mg IM or droperidol 5–10 mg IM ± midazolam', detail: 'Per ACEP 2024 combinations above.' },
      { label: 'Haloperidol 5 mg IM + lorazepam 2 mg IM', detail: '± promethazine/diphenhydramine to prevent acute dystonia (young men, antipsychotic-naïve at highest risk).' },
      { label: 'Ziprasidone 10–20 mg IM', detail: 'Effective but slower onset than droperidol/olanzapine in ED head-to-head data.' },
    ],
    avoid: ['Stacking multiple antipsychotics before the first has had time to work (~15–30 min IM)', 'Labeling akathisia as "agitation" — more antipsychotic makes it worse'],
    monitor: ['EPS (dystonia, akathisia) for 24 h', 'Orthostatic BP before standing', 'QTc if high doses or combinations'],
    tone: 'info',
  },
  {
    cause: 'alcohol-intox',
    title: 'Alcohol intoxication',
    principle: 'The danger is airway, hypoglycemia, head injury and co-ingestion — not just behavior.',
    cooperative: [{ label: 'Verbal de-escalation, food, quiet space', detail: 'Most intoxicated patients settle without drugs.' }],
    severe: [
      { label: 'Droperidol 5 mg IM or haloperidol 5 mg IM', detail: 'Butyrophenones avoid additive respiratory depression.' },
      { label: 'Benzodiazepine only if withdrawal coexists', detail: 'Benzodiazepine + alcohol = synergistic respiratory depression.' },
    ],
    avoid: ['Routine benzodiazepines', 'IM olanzapine combined with parenteral benzodiazepines', 'Discharging before reassessing for suicidality and head injury when sober'],
    monitor: ['Glucose', 'Airway position and SpO₂', 'Serial neuro checks; CT head for focal signs, trauma, or failure to improve as BAC falls'],
    tone: 'warning',
  },
  {
    cause: 'withdrawal',
    title: 'Alcohol or sedative withdrawal',
    principle: 'GABAergic drugs are the treatment, not just sedation. Front-load and titrate to calm.',
    cooperative: [
      { label: 'Diazepam 10–20 mg PO or chlordiazepoxide 50–100 mg PO', detail: 'Long-acting agents self-taper. Use lorazepam if significant liver disease or elderly.' },
    ],
    severe: [
      { label: 'Diazepam 10–20 mg IV q5–10 min or lorazepam 2–4 mg IV q15–20 min', detail: 'Titrate to light somnolence; large cumulative doses may be required.' },
      { label: 'Phenobarbital (per institutional protocol)', detail: 'ASAM 2020: acceptable alternative/adjunct by experienced clinicians; a single 10 mg/kg IV ED dose reduced ICU admission (Rosenson 2013).' },
    ],
    avoid: ['Antipsychotic monotherapy (lowers seizure threshold, masks progression)', 'Glucose-loading without thiamine — but never delay treating hypoglycemia'],
    monitor: ['CIWA-Ar (if communicative) or RASS', 'Respiratory status during escalating doses', 'Electrolytes, Mg, phosphate; thiamine'],
    tone: 'danger',
  },
  {
    cause: 'stimulant',
    title: 'Stimulant / sympathomimetic',
    principle: 'Benzodiazepines treat both the agitation and the sympathetic storm. Hyperthermia kills — cool aggressively.',
    cooperative: [{ label: 'Lorazepam 2 mg PO/SL or diazepam 10 mg PO', detail: 'Quiet, cool room.' }],
    severe: [
      { label: 'Midazolam 5 mg IM/IV or lorazepam 2 mg IV/IM, repeat to effect', detail: 'Titrate to calm, HR and BP control.' },
      { label: 'Add droperidol, olanzapine or haloperidol', detail: 'For persistent psychosis/agitation — antipsychotics are effective and safe in sympathomimetic toxicity (Connors 2019 review).' },
    ],
    avoid: [
      'Prolonged physical struggle or prone restraint (hyperthermia, acidosis, arrest)',
      'β-blockers during acute intoxication with chest pain (ACC/AHA Class III); use benzodiazepines, then nitrates/phentolamine/CCB',
    ],
    monitor: ['Core temperature; cool if >39 °C', 'CK, potassium, creatinine (rhabdomyolysis)', 'ECG; troponin if chest pain'],
    tone: 'danger',
  },
  {
    cause: 'delirium',
    title: 'Delirium / medical cause',
    principle: 'Fix the cause. Medication only for severe distress or danger after non-drug measures fail (APA 2025).',
    cooperative: [
      { label: 'Non-pharmacologic first', detail: 'Family at bedside, glasses/hearing aids, reorientation, treat pain, urinary retention and constipation, remove tethers.' },
      { label: 'Quetiapine 12.5–25 mg PO', detail: 'When oral is possible and sedation is wanted; least EPS.' },
    ],
    severe: [
      { label: 'Haloperidol 0.5–1 mg IV/IM (0.25–0.5 mg if frail/elderly)', detail: 'Repeat every 30–60 min to effect; reassess need daily.' },
      { label: 'Dexmedetomidine infusion (ICU)', detail: 'For agitated ICU delirium, e.g., preventing extubation (DahLIA trial).' },
    ],
    avoid: [
      'Benzodiazepines unless alcohol/sedative withdrawal or seizures (APA 2025)',
      'Anticholinergics (diphenhydramine, hydroxyzine, promethazine)',
      'Haloperidol and other D2 blockers in Parkinson disease or Lewy body dementia',
      'Antipsychotics to prevent or shorten delirium — no benefit (AID-ICU, MIND-USA)',
    ],
    monitor: ['4AT/CAM daily', 'QTc with IV haloperidol', 'Falls, aspiration, pressure injury'],
    tone: 'warning',
  },
  {
    cause: 'dementia',
    title: 'Older adult with dementia',
    principle: 'Most episodes have a trigger: pain, retention, constipation, infection, new drug, unmet need. Search before sedating.',
    cooperative: [{ label: 'Address trigger; calm, familiar approach', detail: 'Short simple sentences, one person speaking, avoid confrontation.' }],
    severe: [
      { label: 'Haloperidol 0.25–0.5 mg or olanzapine 2.5 mg or quetiapine 12.5–25 mg', detail: 'Lowest dose, shortest time. Antipsychotics carry a boxed warning for increased mortality in dementia.' },
    ],
    avoid: ['Benzodiazepines (falls, delirium, paradoxical agitation)', 'Anticholinergics', 'Physical restraint'],
    monitor: ['Delirium screen', 'Falls and aspiration risk', 'Brexpiprazole is labeled for chronic Alzheimer agitation — not an acute ED drug'],
    tone: 'info',
  },
  {
    cause: 'pregnancy',
    title: 'Pregnancy',
    principle: 'Untreated severe agitation endangers both patients. Use agents with the most experience and involve obstetrics.',
    cooperative: [{ label: 'Haloperidol 5 mg PO or lorazepam 1–2 mg PO', detail: 'Most reproductive-safety data.' }],
    severe: [{ label: 'Haloperidol 5 mg IM + diphenhydramine 50 mg IM (or lorazepam 2 mg IM)', detail: 'Diphenhydramine also prevents dystonia.' }],
    avoid: ['Supine restraint after ~20 weeks (aortocaval compression) — use left lateral tilt', 'Valproate', 'Delaying obstetric evaluation (consider eclampsia if hypertensive or seizing)'],
    monitor: ['Fetal monitoring if viable gestation', 'BP and urine protein (pre-eclampsia)', 'Neonatal team aware if near term'],
    tone: 'info',
  },
];
