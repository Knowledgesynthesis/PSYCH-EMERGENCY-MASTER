import type { Module } from '../types';
import { pubmed } from '../refs';

export const delirium: Module = {
  id: 'delirium',
  path: '/delirium',
  title: 'Delirium vs Primary Psychiatric Illness',
  short: 'Delirium',
  tagline: 'Inattention + acute change = delirium until proven otherwise. Find the cause; drugs are not the treatment.',
  minutes: 15,
  objectives: [
    'Screen with the 4AT/CAM and distinguish delirium from psychosis, depression and dementia.',
    'Run a cause-directed workup.',
    'Apply the 2025 APA and SCCM guidance on medications.',
    'Recognize hypoactive delirium and prevent complications.',
  ],
  bottomLine: [
    '**Hallmark: an acute, fluctuating disturbance of attention and awareness** caused by a medical condition, drug, or withdrawal.',
    '**Missed in about 3 of 4 older ED patients who have it** (Han 2009) — hypoactive delirium most of all — and it predicts death and institutionalization.',
    '**Screen everyone at risk** with the 4AT (≥4 = possible delirium).',
    '**Treatment = find and fix causes + multicomponent non-drug care.**',
    '**APA 2025**: no benzodiazepines unless specifically indicated (e.g., alcohol/sedative withdrawal); antipsychotics only for severe distress or danger after non-drug measures — not to prevent or shorten delirium.',
    '**Avoid haloperidol and other potent D2 blockers in Parkinson disease and Lewy body dementia.**',
  ],
  sections: [
    {
      id: 'distinguish',
      title: 'Delirium, psychosis, dementia, depression',
      blocks: [
        {
          type: 'table',
          headers: ['', 'Delirium', 'Primary psychosis', 'Dementia', 'Depression'],
          rows: [
            ['Onset', 'Hours–days', 'Weeks–months prodrome', 'Months–years', 'Weeks'],
            ['Course', 'Fluctuating, worse at night', 'Persistent', 'Slowly progressive (Lewy body: fluctuates)', 'Persistent, diurnal variation'],
            ['Attention', '**Impaired — core feature**', 'Usually intact', 'Intact until late', 'Poor effort; usually intact'],
            ['Consciousness', 'Altered, clouded', 'Clear', 'Clear', 'Clear'],
            ['Hallucinations', 'Visual > auditory, poorly formed', 'Auditory, complex', 'Visual in Lewy body disease', 'Mood-congruent if psychotic'],
            ['Thinking', 'Disorganized, fragmented', 'Systematized delusions', 'Impoverished, word-finding', 'Slowed, negative'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Delirium on top of dementia',
          text: 'Common and easily missed. The key is **change from baseline** — ask family or carers: “Is this different from how they were last week?”',
        },
        {
          type: 'reveal',
          prompt: 'An 84-year-old is “sleeping a lot and not eating” two days after hip surgery. Depression?',
          answer: 'Hypoactive delirium is more likely: acute change, drowsiness, inattention. Do a 4AT (months backwards) and look for causes — opioids, anticholinergics, infection, urinary retention, constipation, hyponatremia, hypoxia, pain.',
        },
      ],
    },
    {
      id: 'screen',
      title: 'Screen',
      blocks: [
        { type: 'tool', tool: 'four-at' },
        {
          type: 'text',
          text: '**CAM algorithm**: (1) acute onset and fluctuating course **and** (2) inattention **and** either (3) disorganized thinking or (4) altered level of consciousness. Use the **CAM-ICU** for ventilated or nonverbal patients and the **bCAM** in the ED. Bedside inattention tests: months or days backwards, the “SAVEAHAART” letter test.',
        },
      ],
    },
    {
      id: 'causes',
      title: 'Find the cause: I WATCH DEATH',
      blocks: [
        {
          type: 'table',
          headers: ['Letter', 'Category', 'Examples'],
          rows: [
            ['I', 'Infection', 'Pneumonia, sepsis, meningitis/encephalitis, skin and soft tissue, UTI with symptoms'],
            ['W', 'Withdrawal', 'Alcohol, benzodiazepines, barbiturates, GHB, baclofen'],
            ['A', 'Acute metabolic', 'Sodium, calcium, glucose, uremia, hepatic encephalopathy (ammonia), acidosis, hypercapnia'],
            ['T', 'Trauma', 'Head injury, subdural hematoma, burns, fractures, pain'],
            ['C', 'CNS pathology', 'Stroke, seizure or nonconvulsive status, tumor, abscess'],
            ['H', 'Hypoxia', 'Respiratory failure, anemia, carbon monoxide, hypotension'],
            ['D', 'Deficiencies', 'Thiamine, B12, niacin'],
            ['E', 'Endocrine', 'Thyroid, adrenal, hypo-/hyperglycemia, parathyroid'],
            ['A', 'Acute vascular', 'Hypertensive encephalopathy, MI, shock'],
            ['T', 'Toxins / drugs', 'Anticholinergics, benzodiazepines, opioids, steroids, lithium, polypharmacy, illicit drugs'],
            ['H', 'Heavy metals', 'Lead, mercury (rare)'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'A positive urine culture is not a diagnosis',
          text: 'Asymptomatic bacteriuria is common in older adults. IDSA (2019) recommends looking for other causes and observing — not treating — when a delirious older patient has bacteriuria without urinary symptoms or systemic signs of infection. Don’t let a dipstick end the search.',
        },
        {
          type: 'text',
          text: 'Also look for **urinary retention, constipation, pain, sleep deprivation, sensory deprivation** (no glasses or hearing aids), **restraints and catheters** — common, fixable contributors.',
        },
      ],
    },
    {
      id: 'manage',
      title: 'Management',
      blocks: [
        {
          type: 'steps',
          steps: [
            { title: 'Treat causes and deprescribe', text: 'Stop or reduce deliriogenic drugs (AGS Beers Criteria 2023: anticholinergics, benzodiazepines, sedative-hypnotics, meperidine).' },
            { title: 'Multicomponent non-drug care', text: 'Reorientation, glasses and hearing aids, sleep protocol (light by day, dark and quiet at night), early mobilization, hydration and nutrition, family presence, pain control, no restraints or unnecessary catheters. The Hospital Elder Life Program cut incident delirium from 15% to 9.9% (Inouye 1999).' },
            { title: 'Medication only for severe distress or danger', text: 'After non-drug measures fail (APA 2025): haloperidol 0.25–1 mg or quetiapine 12.5–25 mg at the lowest effective dose; review daily and stop when no longer needed.' },
            { title: 'ICU', text: 'SCCM PADIS 2025: no recommendation for or against antipsychotics for delirium; dexmedetomidine over propofol for ventilated adults when light sedation or delirium reduction is the priority; enhanced mobilization.' },
            { title: 'Benzodiazepines', text: 'Avoid unless there is a specific indication — alcohol/sedative withdrawal, seizures, catatonia (APA 2025).' },
          ],
        },
        {
          type: 'callout',
          tone: 'danger',
          title: 'Parkinson disease and Lewy body dementia',
          text: 'Severe sensitivity to D2 blockade: rigidity, falls, NMS-like reactions, death. Avoid haloperidol, risperidone and olanzapine. If an antipsychotic is unavoidable, very low-dose quetiapine (or clozapine/pimavanserin with specialist input).',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Evidence check',
          text: 'Antipsychotics did not shorten delirium or improve survival in ICU trials (MIND-USA 2018; AID-ICU 2022). They treat distress and danger, not delirium itself.',
        },
      ],
    },
    {
      id: 'prevent',
      title: 'Prevent harm and plan ahead',
      blocks: [
        {
          type: 'list',
          items: [
            'Falls, aspiration, pressure injuries, dehydration, restraint injuries.',
            'Capacity is often impaired — reassess decisions as delirium clears.',
            'Delirium is linked to longer stays, institutionalization, long-term cognitive decline and mortality: tell families, and arrange cognitive follow-up.',
          ],
        },
      ],
    },
  ],
  pitfalls: [
    'Calling a fluctuating, inattentive older adult “psychotic” or “sundowning” without a workup.',
    'Treating asymptomatic bacteriuria and stopping the search.',
    'Lorazepam for agitation in delirium (unless withdrawal).',
    'Haloperidol in Lewy body dementia or Parkinson disease.',
    'Missing hypoactive delirium because the patient is “no trouble.”',
    'Restraints and urinary catheters that prolong delirium.',
  ],
  flashcards: [
    { front: 'CAM algorithm?', back: 'Acute onset/fluctuating course + inattention + (disorganized thinking OR altered level of consciousness).' },
    { front: '4AT items and cutoff?', back: 'Alertness; AMT4; months backwards; acute change/fluctuation. ≥4 = possible delirium.' },
    { front: 'Most common delirium subtype in older adults — and why it matters?', back: 'Hypoactive: easily missed and associated with worse outcomes.' },
    { front: 'APA 2025 on benzodiazepines in delirium?', back: 'Do not use unless specifically indicated (e.g., alcohol or sedative withdrawal).' },
    { front: 'Do antipsychotics shorten ICU delirium?', back: 'No (MIND-USA 2018, AID-ICU 2022). PADIS 2025 makes no recommendation for or against.' },
    { front: 'Antipsychotic to avoid in Lewy body dementia?', back: 'Haloperidol (and other potent D2 blockers).' },
    { front: 'Delirious older adult, bacteriuria, no urinary symptoms or fever — treat?', back: 'IDSA 2019: no — look for other causes and observe.' },
  ],
  references: [
    { cite: 'APA Practice Guideline for the Prevention and Treatment of Delirium. Am J Psychiatry 2025.', url: 'https://pubmed.ncbi.nlm.nih.gov/40887950/' },
    { cite: 'Lewis K et al. A focused update to the SCCM PADIS guidelines. Crit Care Med 2025.', url: 'https://sccm.org/clinical-resources/guidelines/guidelines/focused-update-padis-guideline' },
    { cite: 'NICE CG103. Delirium: prevention, diagnosis and management.', url: 'https://www.nice.org.uk/guidance/cg103' },
    { cite: 'Inouye SK et al. Clarifying confusion: the Confusion Assessment Method. Ann Intern Med 1990.', url: pubmed('Clarifying confusion: the confusion assessment method. A new method for detection of delirium') },
    { cite: 'Tieges Z et al. Diagnostic accuracy of the 4AT for delirium detection: systematic review and meta-analysis. Age Ageing 2021.', url: pubmed('Diagnostic accuracy of the 4AT for delirium detection in older adults: systematic review and meta-analysis') },
    { cite: 'Han JH et al. Delirium in older ED patients: recognition, risk factors, and psychomotor subtypes. Acad Emerg Med 2009.', url: pubmed('Delirium in older emergency department patients: recognition, risk factors, and psychomotor subtypes') },
    { cite: 'Inouye SK et al. A multicomponent intervention to prevent delirium in hospitalized older patients. N Engl J Med 1999.', url: pubmed('A multicomponent intervention to prevent delirium in hospitalized older patients') },
    { cite: 'Girard TD et al. Haloperidol and ziprasidone for delirium in critical illness (MIND-USA). N Engl J Med 2018.', url: pubmed('Haloperidol and Ziprasidone for Treatment of Delirium in Critical Illness') },
    { cite: 'Andersen-Ranberg NC et al. Haloperidol for delirium in ICU patients (AID-ICU). N Engl J Med 2022.', url: pubmed('Haloperidol for the Treatment of Delirium in ICU Patients') },
    { cite: 'AGS Beers Criteria® Update Expert Panel. 2023 update. J Am Geriatr Soc 2023.', url: pubmed('American Geriatrics Society 2023 updated AGS Beers Criteria for potentially inappropriate medication use in older adults') },
    { cite: 'Nicolle LE et al. IDSA guideline for asymptomatic bacteriuria: 2019 update. Clin Infect Dis 2019.', url: pubmed('Clinical Practice Guideline for the Management of Asymptomatic Bacteriuria: 2019 Update by the Infectious Diseases Society of America') },
  ],
};
