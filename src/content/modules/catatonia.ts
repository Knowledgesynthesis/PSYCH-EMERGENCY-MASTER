import type { Module } from '../types';
import { pubmed } from '../refs';

export const catatonia: Module = {
  id: 'catatonia',
  path: '/catatonia',
  title: 'Catatonia & Severe Depression',
  short: 'Catatonia',
  tagline: 'Look for it, challenge with lorazepam, hold antipsychotics, and call for ECT early if it is malignant.',
  minutes: 14,
  objectives: [
    'Examine for catatonia with the Bush–Francis method and apply DSM-5-TR criteria.',
    'Run a lorazepam challenge and a treatment course.',
    'Recognize malignant catatonia and its overlap with NMS.',
    'Manage severe depression with food refusal or psychosis.',
  ],
  bottomLine: [
    '**Catatonia is common (~9% of psychiatric inpatients; Solmi 2018) and under-recognized**; a substantial minority have a medical or neurological cause.',
    '**DSM-5-TR: ≥3 of 12 signs.** Screen with the **Bush–Francis instrument (≥2 of 14)**.',
    '**Lorazepam challenge**: 1–2 mg IV; a ≥50% reduction in signs (at 5 min IV, 15 min IM, 30 min PO) supports the diagnosis (BAP 2023).',
    '**Lorazepam first (most respond); ECT if response is partial or absent — within 48–72 h in malignant catatonia.**',
    '**Avoid antipsychotics during acute catatonia** — they can precipitate NMS/malignant catatonia.',
    '**Complications kill**: dehydration, VTE/PE, aspiration, pressure injury, contractures, rhabdomyolysis.',
  ],
  sections: [
    {
      id: 'signs',
      title: 'Recognize the signs',
      blocks: [
        {
          type: 'table',
          headers: ['DSM-5-TR sign', 'Definition'],
          rows: [
            ['Stupor', 'No psychomotor activity; not actively relating to the environment'],
            ['Catalepsy', 'Passive induction of a posture held against gravity'],
            ['Waxy flexibility', 'Slight, even resistance to positioning by the examiner'],
            ['Mutism', 'No or very little verbal response (exclude aphasia)'],
            ['Negativism', 'Opposition or no response to instructions or external stimuli'],
            ['Posturing', 'Spontaneous, active maintenance of a posture against gravity'],
            ['Mannerism', 'Odd caricature of normal actions'],
            ['Stereotypy', 'Repetitive, abnormally frequent, non-goal-directed movements'],
            ['Agitation', 'Not influenced by external stimuli'],
            ['Grimacing', 'Odd facial expressions'],
            ['Echolalia', 'Mimicking another’s speech'],
            ['Echopraxia', 'Mimicking another’s movements'],
          ],
        },
        {
          type: 'steps',
          steps: [
            { title: 'Observe', text: 'While trying to engage in conversation: posture, staring, mutism, stereotypy.' },
            { title: 'Scratch your head exaggeratedly', text: 'Watch for echopraxia.' },
            { title: 'Move the arm', text: 'Check for cogwheeling (suggests EPS), rigidity, waxy flexibility; reposition and see if the posture is held (catalepsy).' },
            { title: 'Test for automatic obedience and ambitendency', text: 'Ask the patient not to let you raise the arm, then apply light pressure (mitgehen); extend your hand saying “Don’t shake my hand” (ambitendency).' },
            { title: 'Check the grasp reflex and the chart', text: 'Oral intake, vitals, incidents, nursing observations — signs fluctuate.' },
          ],
        },
        { type: 'tool', tool: 'bfcsi' },
      ],
    },
    {
      id: 'causes',
      title: 'Find the cause',
      blocks: [
        {
          type: 'cards',
          cards: [
            { title: 'Psychiatric', tone: 'info', items: ['Mood disorders (most common)', 'Schizophrenia spectrum', 'Autism and neurodevelopmental disorders', 'Severe trauma-related states'] },
            { title: 'Medical / neurologic', tone: 'danger', items: ['Anti-NMDAR and other autoimmune encephalitis', 'Nonconvulsive status epilepticus', 'CNS infection, stroke, structural lesions', 'SLE, hepatic or renal encephalopathy, hyponatremia, hypercalcemia', 'Wernicke encephalopathy, B12 deficiency'] },
            { title: 'Drug-related', tone: 'warning', items: ['Antipsychotics (NMS ≈ drug-induced malignant catatonia)', 'Benzodiazepine withdrawal', 'Clozapine withdrawal', 'Corticosteroids, disulfiram, ketamine/PCP'] },
          ],
        },
        {
          type: 'text',
          text: '**Workup**: vitals with temperature and BP lability, CBC, CMP with calcium, CK, serum iron (low iron is associated with NMS), TSH, B12, toxicology, urinalysis; **EEG** to exclude nonconvulsive status; **MRI**; **LP with autoimmune panel** when any medical or neurologic feature is present.',
        },
      ],
    },
    {
      id: 'treat',
      title: 'Lorazepam challenge and treatment',
      blocks: [
        {
          type: 'steps',
          steps: [
            { title: 'Baseline', text: 'Record a Bush–Francis score and the specific signs.' },
            { title: 'Challenge', text: 'Lorazepam 1–2 mg IV (or IM/PO).' },
            { title: 'Reassess', text: 'At 5 min (IV), 15 min (IM) or 30 min (PO). A ≥50% reduction in signs supports catatonia. A further dose may be given; a negative challenge does not exclude catatonia.' },
            { title: 'Treat', text: 'Scheduled lorazepam (e.g., 1–2 mg every 6–8 h), titrated daily to response. Doses above the licensed maximum are sometimes needed and usually tolerated — monitor sedation and breathing.' },
            { title: 'Escalate', text: 'Partial or no response after several days — or 48–72 h in malignant catatonia → bilateral ECT (at least twice weekly; daily in malignant catatonia).' },
            { title: 'Adjuncts', text: 'NMDA antagonists (amantadine, memantine) have weaker evidence.' },
            { title: 'After resolution', text: 'Taper benzodiazepines slowly; treat the underlying disorder.' },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Antipsychotics and withdrawal-triggered catatonia',
          items: [
            'Avoid antipsychotics during acute catatonia. If psychosis needs treatment once catatonia resolves, use a lower-potency or partial agonist cautiously under benzodiazepine cover.',
            '**Clozapine withdrawal** catatonia → restart clozapine (ECT if needed). **Benzodiazepine withdrawal** catatonia → restart the benzodiazepine (BAP 2023).',
          ],
        },
        {
          type: 'reveal',
          prompt: 'Mute, immobile 40-year-old with depression; you are asked to “start haloperidol for psychosis.” What do you do?',
          answer: 'Screen for catatonia first (Bush–Francis), hold the antipsychotic, check CK, temperature and BP, and give a lorazepam challenge. Haloperidol in catatonia risks NMS/malignant catatonia.',
        },
      ],
    },
    {
      id: 'malignant',
      title: 'Malignant catatonia vs NMS',
      blocks: [
        {
          type: 'text',
          text: 'Malignant catatonia adds fever, autonomic instability, rigidity, altered consciousness and rising CK to catatonic signs and can be fatal. NMS is widely regarded as a drug-induced form of malignant catatonia; they differ mainly in trigger and in whether catatonic signs came first. Management converges.',
        },
        {
          type: 'list',
          items: [
            'ICU-level care; stop all dopamine antagonists.',
            'IV fluids, active cooling, VTE prophylaxis, monitor CK, potassium and renal function.',
            'IV lorazepam at adequate doses.',
            'Early bilateral ECT if not clearly improving within 48–72 h.',
          ],
        },
      ],
    },
    {
      id: 'supportive',
      title: 'Supportive care prevents death',
      blocks: [
        {
          type: 'list',
          items: [
            'Hydration and nutrition — nasogastric feeding if not eating; watch for refeeding syndrome.',
            '**VTE prophylaxis** — immobile catatonic patients have high rates of DVT and pulmonary embolism.',
            'Aspiration precautions; pressure-area care; range-of-motion to prevent contractures.',
            'Check for urinary retention and constipation.',
          ],
        },
      ],
    },
    {
      id: 'depression',
      title: 'Severe depression with food refusal or psychosis',
      blocks: [
        {
          type: 'cards',
          cards: [
            { title: 'Emergency signs', tone: 'danger', items: ['Not eating or drinking (AKI, hypernatremia)', 'Nihilistic or guilty delusions', 'High suicide risk', 'Catatonic features', 'Rapid weight loss, especially in older adults'] },
            { title: 'Treatment', tone: 'success', items: ['Inpatient care', '**ECT**: the fastest and most effective treatment for psychotic depression, food refusal, catatonic depression and high suicide risk', 'Psychotic depression: antidepressant + antipsychotic (STOP-PD: sertraline + olanzapine)'] },
            { title: 'Rapid-acting options', tone: 'info', items: ['IV ketamine reduces suicidal ideation within hours; durability is limited', 'Esketamine nasal spray: FDA-approved for MDD with acute suicidal ideation (2020, with an oral antidepressant); monotherapy for TRD (2025)'] },
          ],
        },
      ],
    },
  ],
  pitfalls: [
    'Labeling a mute, immobile patient “uncooperative” or “negative symptoms.”',
    'Giving haloperidol to a catatonic patient.',
    'Stopping after one negative lorazepam challenge.',
    'Under-dosing lorazepam for fear of sedation in a patient who tolerates it.',
    'Forgetting VTE prophylaxis and nutrition.',
    'Abruptly stopping clozapine or benzodiazepines.',
  ],
  flashcards: [
    { front: 'DSM-5-TR threshold for catatonia?', back: '≥3 of 12 signs.' },
    { front: 'Bush–Francis screening threshold?', back: '≥2 of the first 14 items → complete the full BFCRS.' },
    { front: 'Lorazepam challenge: dose and positive result?', back: '1–2 mg IV; ≥50% reduction in signs (5 min IV, 15 min IM, 30 min PO).' },
    { front: 'First-line treatment of catatonia?', back: 'Lorazepam; ECT if response is inadequate.' },
    { front: 'When is ECT urgent?', back: 'Malignant catatonia not clearly responding to lorazepam within 48–72 h.' },
    { front: 'Drug class to avoid in acute catatonia?', back: 'Antipsychotics, especially high-potency D2 antagonists.' },
    { front: 'Catatonia after abruptly stopping clozapine?', back: 'Restart clozapine (ECT if needed).' },
    { front: 'Most effective treatment for psychotic depression with food refusal?', back: 'ECT.' },
  ],
  references: [
    { cite: 'Rogers JP et al. Evidence-based consensus guidelines for the management of catatonia: British Association for Psychopharmacology. J Psychopharmacol 2023.', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10101189/' },
    { cite: 'Bush G et al. Catatonia I: rating scale and standardized examination. Acta Psychiatr Scand 1996.', url: pubmed('Catatonia. I. Rating scale and standardized examination') },
    { cite: 'Solmi M et al. Prevalence of catatonia and its moderators: meta-analysis. Schizophr Bull 2018.', url: pubmed('Prevalence of Catatonia and Its Moderators in Clinical Samples: Results from a Meta-analysis and Meta-regression Analysis') },
    { cite: 'Meyers BS et al. Olanzapine plus sertraline for psychotic depression (STOP-PD). Arch Gen Psychiatry 2009.', url: pubmed('A double-blind randomized controlled trial of olanzapine plus sertraline vs olanzapine plus placebo for psychotic depression') },
    { cite: 'Wilkinson ST et al. Single-dose IV ketamine and suicidal ideation: individual participant data meta-analysis. Am J Psychiatry 2018.', url: pubmed('The Effect of a Single Dose of Intravenous Ketamine on Suicidal Ideation: A Systematic Review and Individual Participant Data Meta-Analysis') },
  ],
};
