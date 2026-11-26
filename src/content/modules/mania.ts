import type { Module } from '../types';
import { pubmed } from '../refs';

export const mania: Module = {
  id: 'mania',
  path: '/mania',
  title: 'Severe Mania & Postpartum Psychosis',
  short: 'Mania',
  tagline: 'Exclude stimulants and steroids, protect sleep and finances, start an antimanic agent today.',
  minutes: 14,
  objectives: [
    'Recognize mania, mixed features and their emergencies.',
    'Exclude secondary mania.',
    'Choose first-line acute pharmacotherapy with the right baseline tests.',
    'Treat postpartum psychosis as an emergency and handle reproductive-safety issues.',
  ],
  bottomLine: [
    '**Mania = abnormally elevated or irritable mood + increased energy for ≥1 week** (any duration if hospitalized), with ≥3 DIGFAST features (≥4 if only irritable).',
    '**Emergencies**: dangerous impulsivity, aggression, psychosis, exhaustion/dehydration, **mixed features** (high suicide risk), catatonia.',
    '**First-line (CANMAT/ISBD)**: lithium, divalproex, quetiapine, aripiprazole, risperidone, paliperidone, asenapine, cariprazine; combine an SGA with lithium/divalproex when severe. **Stop antidepressants.**',
    '**Valproate is a major teratogen** (~10% malformations, 30–40% neurodevelopmental disorders) — avoid in anyone who could become pregnant unless there is no alternative.',
    '**Postpartum psychosis** (1–2 per 1,000 births, usually within 2 weeks) carries suicide and infanticide risk → urgent admission, ideally to a mother–baby unit.',
  ],
  sections: [
    {
      id: 'recognize',
      title: 'Recognize mania',
      blocks: [
        {
          type: 'table',
          headers: ['DIGFAST', 'Looks like'],
          rows: [
            ['Distractibility', 'Attention pulled by trivial stimuli'],
            ['Impulsivity / indiscretion', 'Spending sprees, risky sex, reckless driving, business ventures'],
            ['Grandiosity', 'Inflated self-esteem → grandiose delusions'],
            ['Flight of ideas', 'Racing thoughts, rapid topic shifts with loose links'],
            ['Activity ↑', 'Goal-directed activity or psychomotor agitation'],
            ['Sleep need ↓', 'Feels rested after 3 hours — different from insomnia'],
            ['Talkativeness', 'Pressured, hard to interrupt'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Terminology update',
          text: 'DSM-5 replaced the DSM-IV “mixed episode” with the specifier **“with mixed features”** (≥3 opposite-pole symptoms during a manic, hypomanic or depressive episode). Mixed presentations carry high suicide risk and worsen with antidepressants.',
        },
        {
          type: 'reveal',
          prompt: 'Does a full manic episode that starts on an SSRI count toward bipolar I?',
          answer: 'Yes, if the full manic syndrome persists beyond the physiological effect of the antidepressant (DSM-5-TR). Symptoms confined to the drug’s effect are substance/medication-induced.',
        },
      ],
    },
    {
      id: 'secondary',
      title: 'Exclude secondary mania',
      blocks: [
        {
          type: 'cards',
          cards: [
            { title: 'Drugs', tone: 'warning', items: ['Stimulants, cocaine', 'Corticosteroids, anabolic steroids', 'Levodopa, dopamine agonists', 'Antidepressants'] },
            { title: 'Medical', tone: 'danger', items: ['Hyperthyroidism, Cushing syndrome', 'HIV, neurosyphilis, anti-NMDAR encephalitis', 'Right-hemisphere stroke, TBI, tumor, MS', 'Frontotemporal dementia'] },
            { title: 'Red flags', tone: 'danger', items: ['First episode after ~40–50', 'No personal or family mood history', 'Neurologic signs or cognitive decline', 'Atypical course or poor response'] },
          ],
        },
        {
          type: 'list',
          items: [
            'All: TSH, CMP, CBC, toxicology, pregnancy test; HIV/syphilis if at risk; MRI if neurologic signs or late onset.',
            'Before lithium: creatinine/eGFR, TSH, calcium; ECG if >40 or cardiac disease.',
            'Before valproate: liver tests, CBC with platelets, pregnancy test.',
          ],
        },
      ],
    },
    {
      id: 'treat',
      title: 'Acute treatment',
      blocks: [
        {
          type: 'drugs',
          caption: 'Acute mania (adult)',
          rows: [
            { drug: 'Lithium', dose: 'e.g., 300 mg 2–3×/day; target 0.8–1.2 mEq/L (12-h trough) in acute mania', onset: '1–2 weeks', notes: 'First-line; strongest anti-suicidal evidence in bipolar disorder. Toxicity with dehydration, NSAIDs, ACE-I/ARBs, thiazides.' },
            { drug: 'Divalproex', dose: 'Loading 20–30 mg/kg/day; target 50–125 µg/mL', onset: 'Days', notes: 'Hepatotoxicity, pancreatitis, thrombocytopenia, hyperammonemia. Major teratogen.' },
            { drug: 'Quetiapine', dose: 'Titrate to 400–800 mg/day', notes: 'Sedation, orthostasis.' },
            { drug: 'Aripiprazole', dose: '15–30 mg/day', notes: 'Akathisia; low metabolic burden.' },
            { drug: 'Risperidone', dose: '2–6 mg/day', notes: 'EPS, prolactin.' },
            { drug: 'Olanzapine', dose: '10–20 mg/day', notes: 'Highly effective; second-line in CANMAT because of metabolic effects.' },
            { drug: 'Haloperidol', dose: '5–10 mg/day', notes: 'Second-line; EPS.' },
          ],
        },
        {
          type: 'list',
          items: [
            '**Severe mania**: an SGA plus lithium or divalproex. Benzodiazepines short-term for agitation and sleep.',
            '**Stop** antidepressants and stimulants.',
            '**ECT** is highly effective for severe or refractory mania, mixed states, catatonia, and in pregnancy.',
            '**Environment**: low stimulation, protect sleep (sleep restoration is therapeutic), help the patient defer major financial and relationship decisions; involve family; consider financial safeguards.',
            '**New (FDA, Feb 2026)**: milsaperidone (Bysanti), an active metabolite of iloperidone, labeled for “acute manic or mixed episodes” (label wording) of bipolar I and for schizophrenia; its place relative to established agents is not yet defined.',
          ],
        },
      ],
    },
    {
      id: 'reproductive',
      title: 'Valproate, lithium and pregnancy',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'Valproate',
              tone: 'danger',
              items: [
                '~10% risk of major malformations and 30–40% risk of neurodevelopmental disorders with in-utero exposure.',
                'UK MHRA (Jan 2024): do not start in anyone under 55 unless two specialists document no alternative; men already on valproate no longer need two-specialist sign-off (Feb 2025).',
                'Requires a pregnancy-prevention program in anyone who could become pregnant.',
              ],
            },
            {
              title: 'Lithium',
              tone: 'warning',
              items: [
                'First-trimester exposure modestly raises cardiac malformation risk (adjusted RR ~1.65; Patorno 2017) — Ebstein anomaly is rarer than once feared.',
                'Often the best option for severe bipolar disorder in pregnancy: fetal echocardiography, frequent levels (clearance rises in pregnancy), plan for delivery and recheck postpartum.',
              ],
            },
            {
              title: 'Antipsychotics & ECT',
              tone: 'success',
              items: ['Reasonable reproductive-safety data (e.g., quetiapine, olanzapine, aripiprazole, haloperidol); monitor for gestational diabetes.', 'ECT is safe and effective in pregnancy.'],
            },
          ],
        },
      ],
    },
    {
      id: 'postpartum',
      title: 'Postpartum psychosis',
      blocks: [
        {
          type: 'callout',
          tone: 'danger',
          title: 'A psychiatric emergency',
          text: 'Onset usually within 2 weeks of delivery, often in the first days: rapidly fluctuating confusion, mania or mixed states, delusions (often about the baby), severe insomnia. Risk of suicide and infanticide. Admit urgently — ideally a mother–baby unit — and never leave mother and baby alone until assessed.',
        },
        {
          type: 'list',
          items: [
            'Incidence 1–2 per 1,000 deliveries; strongly linked to bipolar disorder.',
            'Postpartum relapse in bipolar disorder: ~66% without prophylaxis vs ~23% with it (Wesseloo 2016) → plan prophylaxis before delivery.',
            'Exclude mimics: preeclampsia/eclampsia, sepsis, thyroiditis, hyponatremia, cerebral venous thrombosis, autoimmune encephalitis, substance withdrawal.',
            'Treatment: antipsychotic ± lithium (lithium has the strongest evidence for remission and relapse prevention); ECT for severe or refractory cases. Breastfeeding decisions are individualized (lithium needs infant monitoring).',
            'Distinguish from postpartum depression and “baby blues” — postpartum depression has its own treatments (e.g., zuranolone, FDA 2023).',
          ],
        },
      ],
    },
  ],
  pitfalls: [
    'Missing stimulant- or steroid-induced mania.',
    'Continuing an antidepressant through mania or mixed features.',
    'Starting valproate in someone who could become pregnant without counselling and contraception.',
    'Starting lithium without renal/thyroid baseline or without checking for NSAIDs, ACE inhibitors or thiazides.',
    'Discharging a postpartum patient with new confusion, insomnia or psychotic symptoms.',
    'Sedating mania without starting an antimanic agent.',
  ],
  flashcards: [
    { front: 'DIGFAST?', back: 'Distractibility, Impulsivity/indiscretion, Grandiosity, Flight of ideas, Activity ↑, Sleep need ↓, Talkativeness.' },
    { front: 'Minimum duration for a manic episode?', back: '1 week — or any duration if hospitalization is required.' },
    { front: 'DSM-5 replacement for “mixed episode”?', back: 'The “with mixed features” specifier.' },
    { front: 'Lithium target level in acute mania?', back: '0.8–1.2 mEq/L (12-hour trough).' },
    { front: 'Valproate in-utero risks?', back: '~10% major malformations; 30–40% neurodevelopmental disorders.' },
    { front: 'Typical onset of postpartum psychosis?', back: 'Within 2 weeks of delivery, often the first days.' },
    { front: 'Postpartum relapse in bipolar disorder, with vs without prophylaxis?', back: '~23% vs ~66% (Wesseloo 2016).' },
  ],
  references: [
    { cite: 'Yatham LN et al. CANMAT and ISBD 2018 guidelines for bipolar disorder. Bipolar Disord 2018.', url: pubmed('Canadian Network for Mood and Anxiety Treatments (CANMAT) and International Society for Bipolar Disorders (ISBD) 2018 guidelines for the management of patients with bipolar disorder') },
    { cite: 'Patorno E et al. Lithium use in pregnancy and the risk of cardiac malformations. N Engl J Med 2017.', url: pubmed('Lithium Use in Pregnancy and the Risk of Cardiac Malformations') },
    { cite: 'Wesseloo R et al. Risk of postpartum relapse in bipolar disorder and postpartum psychosis: meta-analysis. Am J Psychiatry 2016.', url: pubmed('Risk of Postpartum Relapse in Bipolar Disorder and Postpartum Psychosis: A Systematic Review and Meta-Analysis') },
    { cite: 'Bergink V et al. Postpartum psychosis: madness, mania, and melancholia in motherhood. Am J Psychiatry 2016.', url: pubmed('Postpartum Psychosis: Madness, Mania, and Melancholia in Motherhood') },
    { cite: 'MHRA. New valproate safety measures (Jan 2024; update Feb 2025).', url: 'https://www.gov.uk/government/news/new-valproate-safety-measures-apply-from-31-january' },
    { cite: 'FDA approval of milsaperidone (Bysanti), Feb 2026.', url: 'https://www.psychiatrictimes.com/view/fda-approves-bysanti-for-treatment-of-bipolar-1-disorder-and-schizophrenia' },
  ],
};
