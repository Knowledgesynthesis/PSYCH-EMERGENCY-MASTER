import type { Tone } from '../content/types';

export interface InstrumentOption {
  score: number;
  label: string;
}

export interface InstrumentItem {
  id: string;
  label: string;
  hint?: string;
  options: InstrumentOption[];
}

export interface Band {
  min: number;
  max: number;
  label: string;
  tone: Tone;
  advice: string;
}

export interface InstrumentDef {
  id: string;
  name: string;
  intro: string;
  items: InstrumentItem[];
  bands: Band[];
  footnote: string;
  /** Render items as yes/no toggles instead of option lists. */
  binary?: boolean;
}

export interface InstrumentResult {
  total: number;
  max: number;
  answered: number;
  complete: boolean;
  band: Band | null;
}

export function maxScore(def: InstrumentDef): number {
  return def.items.reduce((sum, item) => sum + Math.max(...item.options.map((o) => o.score)), 0);
}

export function scoreInstrument(def: InstrumentDef, answers: Record<string, number | undefined>): InstrumentResult {
  let total = 0;
  let answered = 0;
  for (const item of def.items) {
    const v = answers[item.id];
    if (v === undefined) continue;
    answered++;
    total += v;
  }
  const complete = answered === def.items.length;
  const band = def.bands.find((b) => total >= b.min && total <= b.max) ?? null;
  return { total, max: maxScore(def), answered, complete, band };
}

const yesNo = (points = 1): InstrumentOption[] => [
  { score: 0, label: 'No' },
  { score: points, label: 'Yes' },
];

/** Builds a 0..max scale where only some levels have published anchors. */
function anchored(max: number, anchors: Record<number, string>): InstrumentOption[] {
  return Array.from({ length: max + 1 }, (_, n) => ({ score: n, label: anchors[n] ? `${n} — ${anchors[n]}` : `${n}` }));
}

// ---------------------------------------------------------------------------
// CIWA-Ar — Sullivan et al., Br J Addict 1989. Bands per ASAM 2020 guideline.
// ---------------------------------------------------------------------------
export const CIWA: InstrumentDef = {
  id: 'ciwa',
  name: 'CIWA-Ar (alcohol withdrawal severity)',
  intro:
    'Score what you observe and what the patient reports over the last few minutes. Use to monitor severity and trigger dosing — not to diagnose withdrawal. Requires a patient who can communicate.',
  items: [
    {
      id: 'nausea',
      label: 'Nausea / vomiting',
      hint: '"Do you feel sick to your stomach? Have you vomited?"',
      options: anchored(7, { 0: 'none', 1: 'mild nausea, no vomiting', 4: 'intermittent nausea with dry heaves', 7: 'constant nausea, frequent dry heaves and vomiting' }),
    },
    {
      id: 'tremor',
      label: 'Tremor (arms extended, fingers spread)',
      options: anchored(7, { 0: 'none', 1: 'not visible, can be felt fingertip to fingertip', 4: 'moderate, with arms extended', 7: 'severe, even with arms not extended' }),
    },
    {
      id: 'sweats',
      label: 'Paroxysmal sweats',
      options: anchored(7, { 0: 'none visible', 1: 'barely perceptible, palms moist', 4: 'beads of sweat on forehead', 7: 'drenching sweats' }),
    },
    {
      id: 'anxiety',
      label: 'Anxiety',
      hint: '"Do you feel nervous?"',
      options: anchored(7, { 0: 'at ease', 1: 'mildly anxious', 4: 'moderately anxious or guarded', 7: 'equivalent to acute panic' }),
    },
    {
      id: 'agitation',
      label: 'Agitation',
      options: anchored(7, { 0: 'normal activity', 1: 'somewhat more than normal', 4: 'moderately fidgety and restless', 7: 'paces or thrashes about constantly' }),
    },
    {
      id: 'tactile',
      label: 'Tactile disturbances',
      hint: '"Itching, pins and needles, burning, numbness, bugs crawling on or under your skin?"',
      options: anchored(7, { 0: 'none', 1: 'very mild', 2: 'mild', 3: 'moderate', 4: 'moderately severe hallucinations', 5: 'severe hallucinations', 6: 'extremely severe hallucinations', 7: 'continuous hallucinations' }),
    },
    {
      id: 'auditory',
      label: 'Auditory disturbances',
      hint: '"Are sounds harsh or frightening? Hearing things that aren\'t there?"',
      options: anchored(7, { 0: 'none', 1: 'very mild harshness', 2: 'mild harshness', 3: 'moderate harshness', 4: 'moderately severe hallucinations', 5: 'severe hallucinations', 6: 'extremely severe hallucinations', 7: 'continuous hallucinations' }),
    },
    {
      id: 'visual',
      label: 'Visual disturbances',
      hint: '"Is light too bright or colors different? Seeing things that aren\'t there?"',
      options: anchored(7, { 0: 'none', 1: 'very mild sensitivity', 2: 'mild sensitivity', 3: 'moderate sensitivity', 4: 'moderately severe hallucinations', 5: 'severe hallucinations', 6: 'extremely severe hallucinations', 7: 'continuous hallucinations' }),
    },
    {
      id: 'headache',
      label: 'Headache / fullness in head',
      options: anchored(7, { 0: 'none', 1: 'very mild', 2: 'mild', 3: 'moderate', 4: 'moderately severe', 5: 'severe', 6: 'very severe', 7: 'extremely severe' }),
    },
    {
      id: 'orientation',
      label: 'Orientation / clouding of sensorium',
      hint: '"What day is this? Where are you? Who am I?" + serial additions',
      options: anchored(4, {
        0: 'oriented, can do serial additions',
        1: 'cannot do serial additions or unsure of date',
        2: 'date off by ≤2 days',
        3: 'date off by >2 days',
        4: 'disoriented to place and/or person',
      }),
    },
  ],
  bands: [
    { min: 0, max: 9, label: 'Mild (<10)', tone: 'success', advice: 'Supportive care; reassess regularly. Treat anyway if high risk for complications (PAWSS ≥4, prior seizures/DTs).' },
    { min: 10, max: 18, label: 'Moderate (10–18)', tone: 'warning', advice: 'Pharmacotherapy indicated: symptom-triggered benzodiazepine (or phenobarbital where experienced). Reassess within 1 hour of each dose.' },
    { min: 19, max: 67, label: 'Severe (≥19)', tone: 'danger', advice: 'Aggressive GABAergic treatment, continuous monitoring; consider ICU and phenobarbital/adjuncts if escalating doses are needed.' },
  ],
  footnote:
    'Max 67. Thresholds from the ASAM 2020 Alcohol Withdrawal Management Guideline. β-blockers/clonidine mask signs. If the patient cannot report symptoms (delirium, intubation, language), use an objective sedation-agitation scale instead.',
};

// ---------------------------------------------------------------------------
// COWS — Wesson & Ling, J Psychoactive Drugs 2003.
// ---------------------------------------------------------------------------
export const COWS: InstrumentDef = {
  id: 'cows',
  name: 'COWS (opioid withdrawal severity)',
  intro: 'Observe for ~2 minutes; score only signs attributable to opioid withdrawal (not exercise, room temperature, or anxiety from another cause).',
  items: [
    { id: 'pulse', label: 'Resting pulse (after sitting 1 min)', options: [{ score: 0, label: '≤80' }, { score: 1, label: '81–100' }, { score: 2, label: '101–120' }, { score: 4, label: '>120' }] },
    { id: 'sweat', label: 'Sweating (past 30 min)', options: [{ score: 0, label: 'No chills/flushing' }, { score: 1, label: 'Subjective chills or flushing' }, { score: 2, label: 'Flushed or observable moistness on face' }, { score: 3, label: 'Beads of sweat on brow or face' }, { score: 4, label: 'Sweat streaming off face' }] },
    { id: 'restless', label: 'Restlessness', options: [{ score: 0, label: 'Able to sit still' }, { score: 1, label: 'Reports difficulty sitting still, but able to' }, { score: 3, label: 'Frequent shifting or extraneous movements' }, { score: 5, label: 'Unable to sit still for more than a few seconds' }] },
    { id: 'pupils', label: 'Pupil size', options: [{ score: 0, label: 'Pinned or normal for room light' }, { score: 1, label: 'Possibly larger than normal' }, { score: 2, label: 'Moderately dilated' }, { score: 5, label: 'So dilated only the iris rim is visible' }] },
    { id: 'aches', label: 'Bone or joint aches', options: [{ score: 0, label: 'Not present' }, { score: 1, label: 'Mild diffuse discomfort' }, { score: 2, label: 'Severe diffuse aching' }, { score: 4, label: 'Rubbing joints/muscles, unable to sit still' }] },
    { id: 'nose', label: 'Runny nose or tearing', options: [{ score: 0, label: 'Not present' }, { score: 1, label: 'Nasal stuffiness or moist eyes' }, { score: 2, label: 'Nose running or tearing' }, { score: 4, label: 'Constantly running or tears streaming' }] },
    { id: 'gi', label: 'GI upset (past 30 min)', options: [{ score: 0, label: 'None' }, { score: 1, label: 'Stomach cramps' }, { score: 2, label: 'Nausea or loose stool' }, { score: 3, label: 'Vomiting or diarrhea' }, { score: 5, label: 'Multiple episodes of vomiting/diarrhea' }] },
    { id: 'tremor', label: 'Tremor (outstretched hands)', options: [{ score: 0, label: 'None' }, { score: 1, label: 'Felt, not observed' }, { score: 2, label: 'Slight, observable' }, { score: 4, label: 'Gross tremor or twitching' }] },
    { id: 'yawn', label: 'Yawning', options: [{ score: 0, label: 'None' }, { score: 1, label: '1–2 times during assessment' }, { score: 2, label: '≥3 times during assessment' }, { score: 4, label: 'Several times per minute' }] },
    { id: 'anxiety', label: 'Anxiety or irritability', options: [{ score: 0, label: 'None' }, { score: 1, label: 'Reports increasing irritability/anxiety' }, { score: 2, label: 'Obviously irritable or anxious' }, { score: 4, label: 'So anxious that participation is difficult' }] },
    { id: 'goose', label: 'Gooseflesh skin', options: [{ score: 0, label: 'Smooth' }, { score: 3, label: 'Piloerection felt or hairs standing up' }, { score: 5, label: 'Prominent piloerection' }] },
  ],
  bands: [
    { min: 0, max: 4, label: 'No active withdrawal (<5)', tone: 'neutral', advice: 'Too early for standard buprenorphine start — risk of precipitated withdrawal. Consider low-dose initiation or reassess later.' },
    { min: 5, max: 12, label: 'Mild (5–12)', tone: 'success', advice: 'Standard buprenorphine start is reasonable once COWS ≥8 with objective signs; many fentanyl-era protocols prefer ≥12–13.' },
    { min: 13, max: 24, label: 'Moderate (13–24)', tone: 'warning', advice: 'Start buprenorphine (e.g., 8–16 mg SL; high-dose starts up to 24–32 mg on day 1 are well tolerated in ED studies). Reassess in 30–60 min.' },
    { min: 25, max: 36, label: 'Moderately severe (25–36)', tone: 'danger', advice: 'Treat now; screen for co-ingestants and medical complications (dehydration, electrolyte loss).' },
    { min: 37, max: 48, label: 'Severe (>36)', tone: 'danger', advice: 'Treat now; consider medical admission. Look for an alternative or co-existing process (e.g., medetomidine withdrawal: marked hypertension/tachycardia).' },
  ],
  footnote:
    'Max 48. Worsening after a first buprenorphine dose is usually under-treatment — give more buprenorphine. Precipitated withdrawal was <1% in a 1,200-patient multisite ED trial where most used fentanyl (D\'Onofrio 2023).',
};

// ---------------------------------------------------------------------------
// PAWSS — Maldonado et al., Alcohol Alcohol 2014; validation Alcohol 2015.
// ---------------------------------------------------------------------------
export const PAWSS: InstrumentDef = {
  id: 'pawss',
  name: 'PAWSS (risk of complicated alcohol withdrawal)',
  intro:
    'Threshold: use only if the patient drank in the last 30 days OR had a positive blood alcohol on arrival. Predicts seizures/DTs — the people who need prophylaxis and close monitoring.',
  binary: true,
  items: [
    { id: 'intox30', label: 'Intoxicated/drunk within the last 30 days', options: yesNo() },
    { id: 'rehab', label: 'Ever had alcohol-use-disorder treatment (inpatient, outpatient, or AA)', options: yesNo() },
    { id: 'prevAws', label: 'Any previous alcohol withdrawal (any severity)', options: yesNo() },
    { id: 'blackouts', label: 'Ever had blackouts', options: yesNo() },
    { id: 'seizures', label: 'Previous withdrawal seizures', options: yesNo() },
    { id: 'dts', label: 'Previous delirium tremens', options: yesNo() },
    { id: 'downers', label: 'Combined alcohol with benzodiazepines/barbiturates in last 90 days', options: yesNo() },
    { id: 'otherSub', label: 'Combined alcohol with any other substance in last 90 days', options: yesNo() },
    { id: 'bal', label: 'Blood alcohol >200 mg/dL on presentation', options: yesNo() },
    { id: 'autonomic', label: 'Autonomic hyperactivity now (HR >120, tremor, sweating, agitation, nausea)', options: yesNo() },
  ],
  bands: [
    { min: 0, max: 3, label: 'Low risk (0–3)', tone: 'success', advice: 'Monitor with CIWA-Ar; prophylaxis usually not needed.' },
    { min: 4, max: 10, label: 'High risk (≥4)', tone: 'danger', advice: 'High risk of seizures/DTs: start prophylactic GABAergic treatment, monitor closely, give thiamine, avoid outpatient withdrawal management.' },
  ],
  footnote: 'Max 10. In the validation cohort a score ≥4 had sensitivity 93% and specificity 99.5% for complicated withdrawal (Maldonado 2015).',
};

// ---------------------------------------------------------------------------
// Brøset Violence Checklist — Almvik et al., J Interpers Violence 2000.
// ---------------------------------------------------------------------------
export const BROSET: InstrumentDef = {
  id: 'broset',
  name: 'Brøset Violence Checklist (next-24-hour risk)',
  intro: 'Score each behavior as present if it is observed now and is unusual for this patient. Validated for short-term prediction of violence on inpatient units.',
  binary: true,
  items: [
    { id: 'confused', label: 'Confused — disoriented, unaware of time, place or person', options: yesNo() },
    { id: 'irritable', label: 'Irritable — easily annoyed or angered, intolerant of others', options: yesNo() },
    { id: 'boisterous', label: 'Boisterous — overtly loud or noisy (slamming doors, shouting)', options: yesNo() },
    { id: 'verbal', label: 'Verbal threats — outbursts intended to intimidate', options: yesNo() },
    { id: 'physical', label: 'Physical threats — clear intention to threaten (raised fist, aggressive posture)', options: yesNo() },
    { id: 'objects', label: 'Attacking objects — throwing, kicking, smashing', options: yesNo() },
  ],
  bands: [
    { min: 0, max: 0, label: 'Small risk (0)', tone: 'success', advice: 'Routine observation; rescore each shift or with any change.' },
    { min: 1, max: 2, label: 'Moderate risk (1–2)', tone: 'warning', advice: 'Take preventive measures now: de-escalation, reduce stimulation, offer oral medication, increase observation.' },
    { min: 3, max: 6, label: 'Very high risk (≥3)', tone: 'danger', advice: 'Immediate preventive measures and a team plan for managing violence (staffing, room safety, medication, security on standby).' },
  ],
  footnote: 'Max 6. Short-term (24 h) predictor only; it does not replace a structured professional judgment of longer-term risk.',
};

// ---------------------------------------------------------------------------
// Bush–Francis Catatonia Screening Instrument (items 1–14 of BFCRS) — Bush 1996.
// ---------------------------------------------------------------------------
export const BFCSI: InstrumentDef = {
  id: 'bfcsi',
  name: 'Bush–Francis Catatonia Screening Instrument',
  intro: 'Mark each sign present on examination. Use the standardized exam (observe, attempt conversation, scratch head exaggeratedly, check for cogwheeling, attempt to reposition, ask to extend arm, extend hand without instruction, check grasp reflex).',
  binary: true,
  items: [
    { id: 'excitement', label: 'Excitement — extreme hyperactivity, constant purposeless motor restlessness', options: yesNo() },
    { id: 'immobility', label: 'Immobility / stupor — extreme hypoactivity, minimal response to stimuli', options: yesNo() },
    { id: 'mutism', label: 'Mutism — verbally unresponsive or minimally responsive', options: yesNo() },
    { id: 'staring', label: 'Staring — fixed gaze, little scanning, decreased blinking', options: yesNo() },
    { id: 'posturing', label: 'Posturing / catalepsy — maintains postures, including mundane ones, for long periods', options: yesNo() },
    { id: 'grimacing', label: 'Grimacing — maintenance of odd facial expressions', options: yesNo() },
    { id: 'echo', label: 'Echopraxia / echolalia — mimicking examiner\'s movements or speech', options: yesNo() },
    { id: 'stereotypy', label: 'Stereotypy — repetitive, non-goal-directed motor activity', options: yesNo() },
    { id: 'mannerisms', label: 'Mannerisms — odd, purposeful movements (caricatures of mundane actions)', options: yesNo() },
    { id: 'verbigeration', label: 'Verbigeration — repetition of phrases or sentences', options: yesNo() },
    { id: 'rigidity', label: 'Rigidity — rigid position despite efforts to move (exclude cogwheeling/tremor)', options: yesNo() },
    { id: 'negativism', label: 'Negativism — apparently motiveless resistance to instructions or attempts to move', options: yesNo() },
    { id: 'waxy', label: 'Waxy flexibility — initial resistance before allowing repositioning', options: yesNo() },
    { id: 'withdrawal', label: 'Withdrawal — refuses to eat, drink, or make eye contact', options: yesNo() },
  ],
  bands: [
    { min: 0, max: 1, label: 'Screen negative (0–1)', tone: 'success', advice: 'Catatonia unlikely on this exam. Re-examine if presentation changes — signs fluctuate.' },
    { min: 2, max: 14, label: 'Screen positive (≥2)', tone: 'danger', advice: 'Complete the full 23-item BFCRS, check vitals/CK/iron, hold antipsychotics, and perform a lorazepam challenge.' },
  ],
  footnote: 'DSM-5-TR requires ≥3 of 12 signs for the specifier; the BFCSI (≥2 of 14) is the validated screening threshold.',
};

// ---------------------------------------------------------------------------
// 4AT — Bellelli 2014; validation Shenkin 2019, meta-analysis Tieges 2021.
// ---------------------------------------------------------------------------
export const FOUR_AT: InstrumentDef = {
  id: 'four-at',
  name: '4AT (rapid delirium screen)',
  intro: 'Takes <2 minutes, needs no training, and works in patients who cannot be fully tested (untestable items still score).',
  items: [
    {
      id: 'alertness',
      label: '1. Alertness',
      hint: 'Includes patients who are markedly drowsy or agitated/hyperactive. Observe; if asleep, try to wake with speech or a gentle touch.',
      options: [
        { score: 0, label: 'Normal (fully alert, not agitated) or mild sleepiness <10 s after waking' },
        { score: 4, label: 'Clearly abnormal' },
      ],
    },
    {
      id: 'amt4',
      label: '2. AMT4 — age, date of birth, place (name of hospital/building), current year',
      options: [
        { score: 0, label: 'No mistakes' },
        { score: 1, label: '1 mistake' },
        { score: 2, label: '≥2 mistakes or untestable' },
      ],
    },
    {
      id: 'attention',
      label: '3. Attention — "Name the months of the year backwards, starting at December"',
      options: [
        { score: 0, label: 'Achieves ≥7 months correctly' },
        { score: 1, label: 'Starts but scores <7 months, or refuses to start' },
        { score: 2, label: 'Untestable (cannot start because unwell, drowsy, inattentive)' },
      ],
    },
    {
      id: 'acute',
      label: '4. Acute change or fluctuating course',
      hint: 'Significant change or fluctuation in alertness, cognition or other mental function arising over the last 2 weeks and still present in the last 24 h.',
      options: [
        { score: 0, label: 'No' },
        { score: 4, label: 'Yes' },
      ],
    },
  ],
  bands: [
    { min: 0, max: 0, label: 'Delirium unlikely (0)', tone: 'success', advice: 'Delirium or severe cognitive impairment unlikely — but still possible if item 4 information is incomplete.' },
    { min: 1, max: 3, label: 'Possible cognitive impairment (1–3)', tone: 'warning', advice: 'Possible cognitive impairment; delirium is less likely but more detailed assessment is warranted.' },
    { min: 4, max: 12, label: 'Possible delirium (≥4)', tone: 'danger', advice: 'Possible delirium ± cognitive impairment: start a cause-directed workup now and use non-drug delirium measures.' },
  ],
  footnote: 'Pooled sensitivity ≈88% and specificity ≈88% for delirium in older adults (Tieges 2021 meta-analysis, 17 studies).',
};

// ---------------------------------------------------------------------------
// NMS international consensus criteria — Gurrera 2011; cutoff validated Gurrera 2017.
// ---------------------------------------------------------------------------
export const NMS: InstrumentDef = {
  id: 'nms',
  name: 'NMS International Consensus Criteria (priority-point score)',
  intro: 'Weighted criteria from a Delphi panel of 17 experts. Score each element only if present.',
  binary: true,
  items: [
    { id: 'exposure', label: 'Dopamine antagonist exposure, or dopamine-agonist withdrawal, within past 72 h', options: yesNo(20) },
    { id: 'hyperthermia', label: 'Hyperthermia >38.0 °C (oral) on ≥2 occasions', options: yesNo(18) },
    { id: 'rigidity', label: 'Rigidity', options: yesNo(17) },
    { id: 'mental', label: 'Mental status alteration (reduced or fluctuating consciousness)', options: yesNo(13) },
    { id: 'ck', label: 'CK elevation ≥4× upper limit of normal', options: yesNo(10) },
    {
      id: 'sns',
      label: 'Sympathetic lability — ≥2 of: BP ≥25% above baseline; BP fluctuation ≥20 mmHg diastolic or ≥25 mmHg systolic in 24 h; diaphoresis; urinary incontinence',
      options: yesNo(10),
    },
    { id: 'negative', label: 'Negative workup for infectious, toxic, metabolic, or neurologic causes', options: yesNo(7) },
    { id: 'hypermetabolism', label: 'Hypermetabolism — HR ≥25% and RR ≥50% above baseline', options: yesNo(5) },
  ],
  bands: [
    { min: 0, max: 73, label: 'Below diagnostic cutoff (<74)', tone: 'warning', advice: 'Does not reach the validated cutoff — but early or atypical NMS (e.g., on clozapine or other SGAs, with less rigidity) can score low. Keep reassessing and keep the dopamine antagonist on hold if NMS is still suspected.' },
    { min: 74, max: 100, label: 'Consistent with NMS (≥74)', tone: 'danger', advice: 'Stop all dopamine antagonists, cool, hydrate, ICU-level monitoring, benzodiazepines; consider bromocriptine/dantrolene for moderate–severe cases and ECT if refractory.' },
  ],
  footnote: 'Max 100. A cutoff of 74 gave the best agreement with expert diagnosis in the 2017 validation study.',
};

// ---------------------------------------------------------------------------
// BARS — Behavioural Activity Rating Scale (Swift 2002). Single-item.
// ---------------------------------------------------------------------------
export const BARS_LEVELS: { score: number; label: string; tone: Tone; action: string }[] = [
  { score: 1, label: 'Difficult or unable to rouse', tone: 'danger', action: 'Oversedated: airway, SpO₂/capnography, consider reversal of contributing agents; no further sedatives.' },
  { score: 2, label: 'Asleep, responds normally to verbal or physical contact', tone: 'warning', action: 'Sedated: continuous observation and vitals until awake.' },
  { score: 3, label: 'Drowsy, appears sedated', tone: 'neutral', action: 'Acceptable after tranquilization; monitor vitals and airway.' },
  { score: 4, label: 'Quiet and awake (normal level of activity)', tone: 'success', action: 'Target state. Proceed with assessment and offer food/drink/comfort.' },
  { score: 5, label: 'Overt activity (physical or verbal); calms with instructions', tone: 'warning', action: 'Verbal de-escalation; offer oral medication voluntarily.' },
  { score: 6, label: 'Extremely or continuously active; not requiring restraint', tone: 'danger', action: 'Offer oral/SL medication; prepare IM plan; reduce stimulation; staff in position.' },
  { score: 7, label: 'Violent; requires restraint', tone: 'danger', action: 'Immediate IM/IV tranquilization with team-based restraint if needed; continuous monitoring.' },
];
