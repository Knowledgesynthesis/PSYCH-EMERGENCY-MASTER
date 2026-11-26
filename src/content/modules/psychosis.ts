import type { Module } from '../types';
import { pubmed } from '../refs';

export const psychosis: Module = {
  id: 'psychosis',
  path: '/psychosis',
  title: 'Psychosis: First Episode, Danger & Medical Mimics',
  short: 'Psychosis',
  tagline: 'Rule out the mimics, assess the danger, start low with antipsychotic-naïve patients.',
  minutes: 14,
  objectives: [
    'Identify features that point to secondary (medical or substance-induced) psychosis.',
    'Order a focused first-episode workup and recognize autoimmune encephalitis.',
    'Assess danger from command hallucinations and persecutory delusions.',
    'Start antipsychotic treatment safely in antipsychotic-naïve patients.',
  ],
  bottomLine: [
    '**Secondary psychosis clues**: onset after ~40, abrupt onset, visual/olfactory/tactile hallucinations, abnormal vitals, fluctuating consciousness, neurologic signs, seizures, recent drug change.',
    '**Anti-NMDA receptor encephalitis**: young patient with new psychosis plus seizures, dyskinesias, catatonia, autonomic instability or reduced consciousness → MRI, EEG, CSF antibodies.',
    '**Danger lies in content, conviction and capacity to act** — ask what the voices say and whether the patient will obey.',
    '**Antipsychotic-naïve patients need lower doses** and are prone to dystonia: e.g., risperidone 1–2 mg or olanzapine 5–10 mg.',
    '**Clozapine REMS was removed by the FDA in 2025**, but ANC monitoring stays in the label.',
    '**Refer every first episode to coordinated specialty care** — it improves engagement and quality of life.',
  ],
  sections: [
    {
      id: 'mimics',
      title: 'Primary or secondary?',
      blocks: [
        {
          type: 'table',
          headers: ['Feature', 'Favors primary psychosis', 'Favors secondary psychosis'],
          rows: [
            ['Age at onset', 'Teens to early 30s', 'First episode after ~40, or prepubertal'],
            ['Tempo', 'Prodrome over weeks–months', 'Hours to days'],
            ['Hallucinations', 'Auditory', 'Visual, tactile, olfactory'],
            ['Attention / consciousness', 'Clear', 'Inattentive, drowsy, fluctuating'],
            ['Exam', 'Normal vitals and neuro exam', 'Fever, tachycardia, focal signs, seizures, dyskinesias, catatonia'],
            ['Context', 'Family history, prior episodes', 'Drugs, steroids, HIV, autoimmune disease, cancer, recent infection'],
          ],
        },
        {
          type: 'cards',
          cards: [
            { title: 'Substances & medications', tone: 'warning', items: ['Stimulants, high-potency cannabis, synthetic cannabinoids, hallucinogens', 'Alcohol withdrawal / hallucinosis', 'Corticosteroids, levodopa and dopamine agonists, anticholinergics', 'Isoniazid, mefloquine, efavirenz, interferon'] },
            { title: 'Neurologic', tone: 'danger', items: ['Temporal-lobe epilepsy, postictal psychosis', 'Stroke, tumor, traumatic brain injury', 'Multiple sclerosis, Huntington disease', 'Dementia with Lewy bodies'] },
            { title: 'Infectious & autoimmune', tone: 'danger', items: ['HSV encephalitis, HIV, neurosyphilis', 'Anti-NMDAR and other autoimmune encephalitis', 'Systemic lupus, Hashimoto encephalopathy'] },
            { title: 'Metabolic & endocrine', tone: 'info', items: ['Hypo-/hyperthyroidism, Cushing syndrome', 'Hypercalcemia, hypo-/hyperglycemia', 'B12 deficiency, hepatic or uremic encephalopathy', 'Wilson disease (young), porphyria'] },
          ],
        },
        {
          type: 'reveal',
          prompt: 'A 23-year-old woman develops paranoia over a week, then has a seizure, orofacial dyskinesias and labile blood pressure. What must you exclude?',
          answer: 'Anti-NMDA receptor encephalitis: MRI, EEG, LP with CSF NMDAR antibodies, and pelvic imaging for ovarian teratoma. Avoid high-potency antipsychotics — these patients are prone to NMS-like reactions and catatonia.',
        },
      ],
    },
    {
      id: 'workup',
      title: 'First-episode workup',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'Everyone',
              tone: 'info',
              items: [
                'Vitals, neuro exam, cognitive screen',
                'Glucose, CBC, electrolytes with calcium, renal and hepatic function, TSH',
                'HIV and syphilis serology; toxicology; pregnancy test',
                'Metabolic baseline before antipsychotics: weight/BMI, HbA1c or glucose, lipids; ECG if cardiac risk',
              ],
            },
            {
              title: 'When indicated',
              tone: 'warning',
              items: [
                'MRI brain: neurologic signs, atypical features, late onset, cognitive decline',
                'EEG: episodic symptoms, fluctuating consciousness, suspected seizures',
                'LP with autoimmune panel: encephalitis features (above)',
                'B12/folate, ceruloplasmin (young with liver or movement signs), ANA',
              ],
            },
          ],
        },
        {
          type: 'text',
          text: 'Routine neuroimaging in first-episode psychosis without neurologic or atypical features rarely changes management, but a low threshold is reasonable because missed lesions are consequential.',
        },
      ],
    },
    {
      id: 'danger',
      title: 'Assessing danger in psychosis',
      blocks: [
        {
          type: 'cards',
          cards: [
            { title: 'Command hallucinations', tone: 'danger', text: 'Content, frequency, past compliance, belief in the voice’s power, ability to resist. Compliance is more likely when the voice is perceived as powerful and delusions support it.' },
            { title: 'Persecutory delusions', tone: 'danger', text: 'Anger, fear and plans for “defensive” action (“I’ll get him before he gets me”) raise risk. Identify the perceived persecutor.' },
            { title: 'Self-harm', tone: 'warning', text: 'Suicide risk is highest early in illness, after discharge, and when insight brings hopelessness (post-psychotic depression).' },
            { title: 'Self-neglect', tone: 'warning', text: 'Unable to obtain food, shelter or needed medical care — “grave disability” in many jurisdictions.' },
            { title: 'Substance use', tone: 'warning', text: 'Multiplies violence risk; the largest modifiable factor.' },
          ],
        },
      ],
    },
    {
      id: 'treat',
      title: 'Acute treatment',
      blocks: [
        {
          type: 'text',
          text: 'A calm, low-stimulation space, consistent staff and plain explanations reduce the need for coercion. Offer oral medication; for agitation follow the Agitation module. Ask what has helped before and respect a preferred agent when it is reasonable.',
        },
        {
          type: 'drugs',
          caption: 'Starting doses for antipsychotic-naïve adults',
          rows: [
            { drug: 'Risperidone', dose: '1–2 mg/day, titrate to 2–4 mg', notes: 'EPS and prolactin rise at higher doses.' },
            { drug: 'Olanzapine', dose: '5–10 mg/day', notes: 'Sedating; marked weight gain and metabolic effects.' },
            { drug: 'Aripiprazole', dose: '5–10 mg/day', notes: 'Akathisia; less sedation and metabolic burden.' },
            { drug: 'Quetiapine', dose: 'Titrate from 50–100 mg toward 300–600 mg/day', notes: 'Sedation, orthostasis; minimal EPS.' },
            { drug: 'Haloperidol', dose: '2–5 mg/day', notes: 'High dystonia risk in young, naïve patients; avoid high doses.' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'What changed recently',
          items: [
            '**Clozapine** — for treatment-resistant schizophrenia (two failed adequate trials) and persistent suicidality. The FDA eliminated the Clozapine REMS (effective June 2025); prescribers should still monitor ANC per the label. Emergencies are covered in Psychotropic Toxicity.',
            '**Xanomeline–trospium (Cobenfy, FDA 2024)** — the first antipsychotic that does not block D2 receptors: no EPS or prolactin rise; nausea, constipation and urinary retention. Not an emergency drug.',
            '**Long-acting injectables** reduce relapse and rehospitalization and are an option from early in the illness.',
          ],
        },
      ],
    },
    {
      id: 'dispo',
      title: 'Disposition',
      blocks: [
        {
          type: 'cards',
          cards: [
            { title: 'Inpatient', tone: 'danger', text: 'Danger to self or others, grave disability, catatonia, inability to cooperate with a necessary workup, no safe environment.' },
            { title: 'Crisis / observation', tone: 'warning', text: 'Substance-induced psychosis expected to clear; collateral pending; first dose of medication with reassessment.' },
            { title: 'Outpatient with early intervention', tone: 'success', text: 'Safe, supported, engaged; referral to coordinated specialty care within days; family involved; relapse plan.' },
          ],
        },
      ],
    },
  ],
  pitfalls: [
    'Diagnosing schizophrenia in a febrile, inattentive patient.',
    'High-dose haloperidol in an antipsychotic-naïve young man (dystonia, NMS).',
    'Missing catatonia in a “quiet, withdrawn” patient — then giving antipsychotics.',
    'Dismissing voices telling the patient to harm someone because they “seem calm.”',
    'Starting antipsychotics without a pregnancy test and metabolic baseline.',
  ],
  flashcards: [
    { front: 'Hallucination types that suggest secondary psychosis?', back: 'Visual, tactile, olfactory.' },
    { front: 'Clues to anti-NMDAR encephalitis?', back: 'New psychosis + seizures, dyskinesias, catatonia, autonomic instability or reduced consciousness; often young women (ovarian teratoma).' },
    { front: 'Starting risperidone dose in an antipsychotic-naïve adult?', back: '1–2 mg/day.' },
    { front: 'Clozapine REMS status?', back: 'Eliminated by FDA (effective June 2025); ANC monitoring still recommended per label.' },
    { front: 'Indications for clozapine?', back: 'Treatment-resistant schizophrenia; persistent suicidality in schizophrenia or schizoaffective disorder.' },
    { front: 'Mechanism that makes xanomeline–trospium different?', back: 'Muscarinic (M1/M4) agonist with a peripheral antagonist — no D2 blockade, so no EPS or prolactin rise.' },
    { front: 'Baseline tests before an antipsychotic?', back: 'Weight/BMI, glucose or HbA1c, lipids, pregnancy test; ECG if cardiac risk; prolactin if symptomatic.' },
  ],
  references: [
    { cite: 'Keepers GA et al. APA Practice Guideline for the Treatment of Patients With Schizophrenia, 3rd ed. Am J Psychiatry 2020.', url: pubmed('The American Psychiatric Association Practice Guideline for the Treatment of Patients With Schizophrenia') },
    { cite: 'Graus F et al. A clinical approach to diagnosis of autoimmune encephalitis. Lancet Neurol 2016.', url: pubmed('A clinical approach to diagnosis of autoimmune encephalitis') },
    { cite: 'FDA removes the REMS program for clozapine (2025).', url: 'https://www.fda.gov/drugs/drug-safety-and-availability/fda-removes-risk-evaluation-and-mitigation-strategy-rems-program-antipsychotic-drug-clozapine' },
    { cite: 'FDA approves drug with new mechanism of action for schizophrenia (xanomeline–trospium), 2024.', url: 'https://www.fda.gov/news-events/press-announcements/fda-approves-drug-new-mechanism-action-treatment-schizophrenia' },
    { cite: 'Kane JM et al. Comprehensive vs usual community care for first-episode psychosis (RAISE-ETP). Am J Psychiatry 2016.', url: pubmed('Comprehensive Versus Usual Community Care for First-Episode Psychosis: 2-Year Outcomes From the NIMH RAISE Early Treatment Program') },
    { cite: 'Fazel S et al. Schizophrenia and violence: systematic review and meta-analysis. PLoS Med 2009.', url: pubmed('Schizophrenia and violence: systematic review and meta-analysis') },
  ],
};
