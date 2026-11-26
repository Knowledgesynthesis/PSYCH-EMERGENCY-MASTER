import type { Module } from '../types';
import { pubmed } from '../refs';

export const agitation: Module = {
  id: 'agitation',
  path: '/agitation',
  title: 'Acute Agitation & Rapid Tranquilization',
  short: 'Agitation',
  tagline: 'De-escalate first, medicate by cause, restrain last — and never prone.',
  minutes: 16,
  objectives: [
    'Use the ten Project BETA domains of verbal de-escalation.',
    'Choose medication by the likely driver of agitation, at correct doses.',
    'Apply federal restraint and seclusion rules and avoid lethal restraint positions.',
    'Recognize and treat acute dystonia and akathisia.',
  ],
  bottomLine: [
    '**Most agitated patients settle with verbal de-escalation and an offered oral medication.** Oral is as effective as IM for patients who will take it.',
    '**Severe agitation (ACEP 2024): droperidol + midazolam, or an atypical antipsychotic + midazolam, act fastest.** Haloperidol ± lorazepam works but is slower.',
    '**Match the drug to the cause**: benzodiazepines for stimulants and withdrawal; avoid them in delirium and alcohol intoxication.',
    '**Restraint is a last resort: time-limited, continuously observed, never prone, never weight on the back or neck.**',
    '**“Excited delirium” is no longer an accepted diagnosis.** Say “hyperactive delirium with severe agitation” — then find the cause.',
  ],
  sections: [
    {
      id: 'recognize',
      title: 'Recognize early, rate it, look for the cause',
      blocks: [
        {
          type: 'text',
          text: 'Agitation escalates predictably: anxiety → irritability and pacing → loud, demanding, threatening → violence. Interventions are most effective early. Rate behavior objectively so the team shares one language and can titrate medication.',
        },
        { type: 'tool', tool: 'bars' },
        {
          type: 'cards',
          cards: [
            { title: 'Medical', tone: 'danger', items: ['Hypoglycemia, hypoxia, sepsis', 'Head injury, seizure/postictal state, stroke', 'Thyroid storm, hyperthermia', 'Pain, urinary retention, constipation (older adults)'] },
            { title: 'Substance', tone: 'warning', items: ['Stimulants, cathinones, synthetic cannabinoids, PCP', 'Alcohol intoxication or withdrawal', 'Sedative/GHB withdrawal', 'Anticholinergic toxicity'] },
            { title: 'Psychiatric', tone: 'info', items: ['Psychosis, mania', 'Personality-disorder crisis', 'Autism / intellectual disability with distress', 'Acute stress, fear, unmet needs'] },
            { title: 'Iatrogenic', tone: 'neutral', items: ['Akathisia from antipsychotics', 'Paradoxical benzodiazepine reaction', 'Corticosteroids', 'Serotonin syndrome'] },
          ],
        },
      ],
    },
    {
      id: 'deescalate',
      title: 'Verbal de-escalation: the ten BETA domains',
      blocks: [
        {
          type: 'steps',
          steps: [
            { title: 'Respect personal space', text: 'Two arm-lengths; both of you have a way out; do not block the door.' },
            { title: 'Do not be provocative', text: 'Calm face, hands visible and open, body angled, no prolonged staring, not towering.' },
            { title: 'Establish verbal contact', text: 'One person speaks. Introduce yourself and your role; orient the patient.' },
            { title: 'Be concise', text: 'Short sentences, simple words; repeat key messages.' },
            { title: 'Identify wants and feelings', text: '“What do you need right now?” — food, a phone call, a blanket, to understand what happens next.' },
            { title: 'Listen closely', text: 'Paraphrase back: “Let me make sure I’ve got this right…”' },
            { title: 'Agree or agree to disagree', text: 'Find something true to agree with; you do not have to agree with delusions.' },
            { title: 'Set clear limits', text: 'Violence is not acceptable. State consequences calmly as facts, not threats.' },
            { title: 'Offer choices and optimism', text: '“Would a tablet or a dissolving wafer help you feel more in control?” Medication framed as help, not punishment.' },
            { title: 'Debrief', text: 'With the patient and the staff after any coercive event.' },
          ],
        },
        {
          type: 'reveal',
          prompt: 'A patient shouts: “I want to leave NOW!” What do you say?',
          answer: '“You really want to get out of here — I get it. Help me understand what’s going on so we can get you out as fast as safely possible. Can we sit for two minutes?” Acknowledge the want, agree with what’s true, offer a path and a choice. Avoid “calm down” and threats.',
        },
      ],
    },
    {
      id: 'meds',
      title: 'Medication: choose by driver',
      blocks: [
        { type: 'tool', tool: 'agitation' },
        {
          type: 'drugs',
          caption: 'Key agents (adult doses; roughly halve for frail/older adults)',
          rows: [
            { drug: 'Olanzapine', dose: '5–10 mg PO/ODT; 10 mg IM (2.5–5 mg older adults)', onset: 'IM 15–30 min', notes: 'Avoid IM with parenteral benzodiazepines in intoxicated/hypoxic patients; orthostasis.' },
            { drug: 'Droperidol', dose: '5–10 mg IM/IV', onset: 'IM 10–20 min', notes: 'Boxed QT warning, yet large ED series show clinically important QT events are rare (Calver 2015). ECG once safe.' },
            { drug: 'Midazolam', dose: '5 mg IM/IV (2.5 mg older adults)', onset: 'IM 5–15 min', notes: 'Fastest; respiratory depression. Use in combination; not as sole agent if one drug only (ACEP).' },
            { drug: 'Haloperidol', dose: '5 mg PO/IM (0.25–1 mg older adults)', onset: 'IM 30–60 min', notes: 'Dystonia risk — pair with promethazine or diphenhydramine unless delirium. QT with IV/high doses.' },
            { drug: 'Lorazepam', dose: '1–2 mg PO/IM/IV', onset: 'IM 15–30+ min', notes: 'Treatment of choice in withdrawal and stimulants; avoid in delirium and alcohol intoxication.' },
            { drug: 'Ziprasidone', dose: '10–20 mg IM (max 40 mg/day)', onset: 'IM 15–30 min', notes: 'Slower than droperidol/olanzapine in head-to-head ED data; QT.' },
            { drug: 'Ketamine', dose: '4–5 mg/kg IM; 1–2 mg/kg IV', onset: '2–5 min', notes: 'Extreme, immediately dangerous agitation only; laryngospasm, hypersalivation, emergence reactions, higher intubation rates.' },
            { drug: 'Dexmedetomidine SL (Igalmi)', dose: '120 mcg (mild–moderate) / 180 mcg (severe); optional 60/90 mcg repeats ×2, ≥2 h apart (max 240/360 mcg/day); 120 mcg if ≥65 y', onset: '~20–30 min', notes: 'Cooperative adults with schizophrenia/bipolar agitation. Hold repeats if SBP <90, DBP <60, HR <60 or orthostatic. At-home use (120 mcg, max one dose per 12 h) approved Nov 2026.' },
            { drug: 'Loxapine inhaled', dose: '10 mg once in 24 h', onset: '~10 min', notes: 'REMS: only where bronchospasm can be managed; contraindicated in asthma/COPD.' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'What the trials show',
          items: [
            'Droperidol and olanzapine sedate faster than haloperidol or ziprasidone (Klein 2018, 737 ED patients).',
            'Adding promethazine to IM haloperidol reduces acute dystonia (TREC trials, Huf 2007).',
            'Prehospital ketamine sedates faster than haloperidol but with more complications and intubations (Cole 2016).',
          ],
        },
      ],
    },
    {
      id: 'restraint',
      title: 'Restraint and seclusion',
      blocks: [
        {
          type: 'callout',
          tone: 'danger',
          title: 'Restraint deaths are preventable',
          text: 'Prone restraint, weight on the back or neck, hobble/“hog-tie” positions and prolonged struggle cause asphyxia and cardiac arrest — especially with stimulants, hyperthermia and obesity. Restrain **supine or on the side with the head raised**, assign one person to watch the airway and face continuously, and release at the earliest possible moment.',
        },
        {
          type: 'list',
          items: [
            'Only when less restrictive measures have failed and harm is imminent — never for convenience, coercion or punishment.',
            '**Federal rule (CMS 42 CFR 482.13)**: physician/licensed practitioner order; for violent or self-destructive behavior, orders last up to **4 h for adults, 2 h for ages 9–17, 1 h under 9**, renewed only after reassessment; no PRN or standing orders.',
            '**Face-to-face evaluation within 1 hour** of initiation.',
            'Simultaneous restraint and seclusion requires continuous in-person or audio-video monitoring.',
            'Monitor vitals, circulation, airway, hydration, toileting and skin; give medication at the same time so restraint is brief.',
            'Plan before approach: trained team (commonly five — one per limb plus a leader at the head), one voice.',
            'Debrief patient and staff; document indication, alternatives tried, monitoring and release.',
          ],
        },
      ],
    },
    {
      id: 'eps',
      title: 'Treat the side effects you cause',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'Acute dystonia',
              tone: 'danger',
              text: 'Hours–days after high-potency D2 blockers; young men highest risk. Torticollis, oculogyric crisis, trismus — laryngeal dystonia is an airway emergency.',
              items: ['Benztropine 1–2 mg IV/IM or diphenhydramine 50 mg IV/IM', 'Repeat in 15–30 min if needed', 'Continue oral anticholinergic 24–72 h'],
            },
            {
              title: 'Akathisia',
              tone: 'warning',
              text: 'Inner restlessness, pacing, cannot sit — easily misread as worsening agitation; linked to aggression and suicidality.',
              items: ['Reduce or stop the antipsychotic', 'Propranolol 10–20 mg 2–3×/day, mirtazapine 15 mg at night, or a benzodiazepine', 'Do not add more antipsychotic'],
            },
            {
              title: 'Oversedation / hypotension',
              tone: 'neutral',
              items: ['Recovery position, airway support, SpO₂ ± capnography', 'IV fluids for hypotension', 'Higher risk with olanzapine + benzodiazepine and with dexmedetomidine'],
            },
            {
              title: 'QT prolongation',
              tone: 'info',
              items: ['ECG once safe after droperidol, IV haloperidol, ziprasidone or combinations', 'Torsades: magnesium 2 g IV; correct K⁺ and Mg²⁺'],
            },
          ],
        },
      ],
    },
    {
      id: 'terminology',
      title: 'Why “excited delirium” was retired',
      blocks: [
        {
          type: 'text',
          text: 'The APA (2020) and AMA (2021) rejected “excited delirium” as a diagnosis, and in 2023 ACEP withdrew its 2009 white paper. The label had no agreed criteria and was used to explain deaths after restraint. The physiology it described is real: **hyperactive delirium with severe agitation** demands rapid sedation, cooling, and a search for the cause — stimulant toxicity, withdrawal, hyperthermia, hypoglycemia, infection, head injury, psychosis.',
        },
      ],
    },
  ],
  pitfalls: [
    'Giving more antipsychotic for “worsening agitation” that is actually akathisia.',
    'Benzodiazepines in older adults with delirium (paradoxical agitation, longer delirium).',
    'Prone restraint, or restraint without someone watching the airway.',
    'Re-dosing IM haloperidol at 10 minutes — it hasn’t had time to work; stacking causes oversedation and QT problems.',
    'Forgetting glucose and temperature in the “psychiatric” agitated patient.',
    'IM olanzapine plus a parenteral benzodiazepine in an alcohol-intoxicated patient.',
  ],
  flashcards: [
    { front: 'ACEP 2024: fastest regimen for severe ED agitation?', back: 'Droperidol + midazolam, or an atypical antipsychotic (e.g., olanzapine) + midazolam.' },
    { front: 'If only one drug can be given for severe agitation, which to avoid as monotherapy?', back: 'Midazolam alone — prefer droperidol or an atypical antipsychotic (ACEP 2024).' },
    { front: 'CMS restraint order limits for violent behavior?', back: '4 h adults, 2 h ages 9–17, 1 h under 9; face-to-face evaluation within 1 h; no PRN orders.' },
    { front: 'Pacing, “jumping out of my skin” 2 days after starting haloperidol?', back: 'Akathisia: reduce/stop antipsychotic; propranolol, mirtazapine, or a benzodiazepine.' },
    { front: 'Treatment of acute dystonia?', back: 'Benztropine 1–2 mg IV/IM or diphenhydramine 50 mg IV/IM; continue orally 24–72 h.' },
    { front: 'First-line drug class for stimulant-induced agitation?', back: 'Benzodiazepines; antipsychotics are effective adjuncts.' },
    { front: 'Why add promethazine to IM haloperidol?', back: 'Fewer acute dystonic reactions plus added sedation (TREC trials).' },
    { front: 'BARS target after rapid tranquilization?', back: '4 — quiet and awake.' },
  ],
  references: [
    { cite: 'ACEP Clinical Policy: Critical issues in the evaluation and management of adult out-of-hospital or ED patients presenting with severe agitation. Ann Emerg Med 2024.', url: 'https://www.acep.org/patient-care/clinical-policies/severe-agitation' },
    { cite: 'Richmond JS et al. Verbal de-escalation of the agitated patient: Project BETA De-escalation Workgroup. West J Emerg Med 2012.', url: pubmed('Verbal de-escalation of the agitated patient: consensus statement of the American Association for Emergency Psychiatry Project BETA De-escalation Workgroup') },
    { cite: 'Wilson MP et al. The psychopharmacology of agitation: Project BETA Psychopharmacology Workgroup. West J Emerg Med 2012.', url: pubmed('The psychopharmacology of agitation: consensus statement of the american association for emergency psychiatry project Beta psychopharmacology workgroup') },
    { cite: 'Klein LR et al. Intramuscular midazolam, olanzapine, ziprasidone, or haloperidol for acute agitation in the ED. Ann Emerg Med 2018.', url: pubmed('Intramuscular Midazolam, Olanzapine, Ziprasidone, or Haloperidol for Treating Acute Agitation in the Emergency Department') },
    { cite: 'Isbister GK et al. Droperidol vs midazolam for violence and acute behavioral disturbance: the DORM study. Ann Emerg Med 2010.', url: pubmed('Randomized controlled trial of intramuscular droperidol versus midazolam for violence and acute behavioral disturbance: the DORM study') },
    { cite: 'Calver L et al. Safety and effectiveness of droperidol for sedation of acute behavioral disturbance in the ED. Ann Emerg Med 2015.', url: pubmed('The Safety and Effectiveness of Droperidol for Sedation of Acute Behavioral Disturbance in the Emergency Department') },
    { cite: 'Huf G et al. IM haloperidol vs haloperidol plus promethazine (TREC-Brazil). BMJ 2007.', url: pubmed('Rapid tranquillisation in psychiatric emergency settings in Brazil: pragmatic randomised controlled trial of intramuscular haloperidol versus intramuscular haloperidol plus promethazine') },
    { cite: 'Cole JB et al. Ketamine vs haloperidol for severe prehospital agitation. Clin Toxicol 2016.', url: pubmed('A prospective study of ketamine versus haloperidol for severe prehospital agitation') },
    { cite: 'Preskorn SH et al. Sublingual dexmedetomidine vs placebo for agitation in bipolar disorder (SERENITY II). JAMA 2022.', url: pubmed('Effect of Sublingual Dexmedetomidine vs Placebo on Acute Agitation Associated With Bipolar Disorder') },
    { cite: 'FDA approves at-home use of Igalmi for agitation in schizophrenia and bipolar disorder (Nov 2026).', url: 'https://www.psychiatrictimes.com/view/fda-approves-igalmi-for-agitation-associated-with-schizophrenia-schizoaffective-disorder-or-bipolar-i-or-ii-disorder' },
    { cite: 'CMS Conditions of Participation: Patient’s rights — restraint or seclusion, 42 CFR 482.13(e)–(g).', url: 'https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-G/part-482/subpart-B/section-482.13' },
    { cite: 'ACEP Task Force Report on Hyperactive Delirium with Severe Agitation in Emergency Settings (2021).', url: 'https://www.acep.org/siteassets/new-pdfs/education/acep-task-force-report-on-hyperactive-delirium-final.pdf' },
  ],
};
