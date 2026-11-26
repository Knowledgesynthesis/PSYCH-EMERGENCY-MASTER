import type { Module } from '../types';
import { pubmed } from '../refs';

export const substances: Module = {
  id: 'substances',
  path: '/substances',
  title: 'Intoxication & Withdrawal',
  short: 'Substances',
  tagline: 'Predict who will seize, treat withdrawal early and hard, and start addiction treatment in the ED.',
  minutes: 22,
  objectives: [
    'Predict and stage alcohol withdrawal (PAWSS, CIWA-Ar) and treat with symptom-triggered GABAergic therapy.',
    'Recognize Wernicke encephalopathy and dose thiamine correctly.',
    'Reverse opioid overdose with titrated naloxone and start buprenorphine in the ED.',
    'Manage sympathomimetic toxicity and recognize new adulterants (xylazine, medetomidine, nitazenes).',
  ],
  bottomLine: [
    '**Alcohol and sedative withdrawal can kill. Opioid withdrawal rarely does — but untreated, it drives overdose after discharge.**',
    '**PAWSS ≥4 = high risk** of seizures or DTs → prophylaxis. **CIWA-Ar ≥10 → treat** (ASAM 2020); symptom-triggered dosing beats fixed schedules.',
    '**Give thiamine with glucose — but never delay glucose for hypoglycemia.** Suspected Wernicke needs high-dose IV thiamine.',
    '**Naloxone: titrate to breathing, not to waking.** Observe longer after methadone, extended-release or ingested opioids.',
    '**Start buprenorphine in the ED** — no X-waiver since January 2023; it roughly doubles treatment engagement. Send everyone home with naloxone.',
    '**Stimulant toxicity: benzodiazepines first, cool aggressively.**',
  ],
  sections: [
    {
      id: 'alcohol',
      title: 'Alcohol withdrawal',
      blocks: [
        {
          type: 'table',
          headers: ['Syndrome', 'Onset after last drink', 'Features'],
          rows: [
            ['Minor withdrawal', '6–36 h', 'Tremor, anxiety, sweating, nausea, insomnia, tachycardia; sensorium clear.'],
            ['Withdrawal seizures', '6–48 h (peak ~24 h)', 'Generalized tonic–clonic, single or brief cluster. Focal seizures or status → look for another cause.'],
            ['Alcoholic hallucinosis', '12–48 h', 'Visual, tactile or auditory hallucinations with a **clear sensorium** — not DTs.'],
            ['Delirium tremens', '48–96 h; lasts up to ~5 days', 'Delirium, hallucinations, severe autonomic hyperactivity, fever. Mortality ~1–4% with modern treatment; higher when missed.'],
          ],
        },
        { type: 'tool', tool: 'pawss' },
        { type: 'tool', tool: 'ciwa' },
        {
          type: 'steps',
          steps: [
            { title: 'Choose the strategy', text: 'Symptom-triggered benzodiazepines guided by CIWA-Ar (less drug, shorter treatment) when the patient can communicate; front-loading or fixed schedules for high-risk patients or those who cannot report symptoms.' },
            { title: 'Choose the drug', text: 'Long-acting agents (diazepam, chlordiazepoxide) self-taper and reduce seizures. Lorazepam or oxazepam in advanced liver disease or frailty.' },
            { title: 'Phenobarbital', text: 'Acceptable alternative or adjunct when clinicians are experienced (ASAM 2020); a single 10 mg/kg IV ED dose added to lorazepam reduced ICU admission (Rosenson 2013).' },
            { title: 'Refractory withdrawal', text: 'Escalating doses without control → ICU, phenobarbital, propofol if intubated. Dexmedetomidine treats autonomic signs but does **not** prevent seizures or DTs — never alone.' },
            { title: 'Avoid', text: 'Antipsychotic monotherapy (lowers seizure threshold, masks progression); β-blockers or clonidine alone (mask signs).' },
            { title: 'Before discharge', text: 'Outpatient management only if mild, PAWSS <4, no prior seizures/DTs, no serious comorbidity, a sober supporter and follow-up (carbamazepine or gabapentin are options). Offer naltrexone or acamprosate.' },
          ],
        },
        {
          type: 'callout',
          tone: 'danger',
          title: 'Wernicke encephalopathy',
          items: [
            'The classic triad (confusion, ophthalmoplegia/nystagmus, ataxia) is present in a minority — use the **Caine criteria: 2 of 4** — dietary deficiency, eye signs, cerebellar dysfunction, altered mental state or mild memory impairment.',
            'Suspected WE: **thiamine 200–500 mg IV three times daily** for 3–5 days; prophylaxis 100–250 mg daily in at-risk patients.',
            'Give thiamine with or before glucose when possible — **never delay treatment of hypoglycemia** to wait for thiamine.',
            'Replace magnesium (thiamine-dependent enzymes need it).',
          ],
        },
      ],
    },
    {
      id: 'sedatives',
      title: 'Benzodiazepine and other sedative withdrawal',
      blocks: [
        {
          type: 'text',
          text: 'Onset depends on half-life: **1–2 days** for short-acting agents (alprazolam, lorazepam), up to **a week or more** for long-acting agents (diazepam, clonazepam). Seizures and delirium occur. Acute management is **re-stabilization** with a benzodiazepine (or phenobarbital), followed by a slow outpatient taper.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Joint Clinical Practice Guideline on Benzodiazepine Tapering (ASAM + 9 societies, 2025)',
          items: [
            'Do not stop abruptly in physically dependent patients.',
            'Start with **5–10% reductions of the daily dose every 2–4 weeks**, individualized.',
            'Slow or pause if withdrawal emerges; offer psychosocial support.',
          ],
        },
        {
          type: 'cards',
          cards: [
            { title: 'GHB / GBL withdrawal', tone: 'danger', text: 'Onset within hours; severe, fluctuating delirium, often benzodiazepine-resistant → high-dose benzodiazepines, phenobarbital; baclofen has been used.' },
            { title: 'Baclofen withdrawal', tone: 'danger', text: 'Intrathecal pump failure or abrupt oral stop: itch, hyperthermia, rigidity, seizures — mimics NMS or sepsis. Restore baclofen.' },
            { title: 'Gabapentinoid withdrawal', tone: 'warning', text: 'Agitation, confusion, autonomic signs, seizures after high-dose use. Restart and taper.' },
          ],
        },
      ],
    },
    {
      id: 'opioids',
      title: 'Opioids: overdose, withdrawal, buprenorphine',
      blocks: [
        {
          type: 'steps',
          steps: [
            { title: 'Ventilate first', text: 'Airway positioning and bag-mask ventilation with oxygen. Hypoxia — not the opioid — kills.' },
            { title: 'Titrate naloxone to breathing', text: 'Goal: respiratory rate ≥10–12 and adequate SpO₂, not full arousal. E.g., 0.04–0.4 mg IV, repeated and escalated every 2–3 min; 4 mg intranasal or 0.4–2 mg IM when no IV. Big boluses in dependent patients precipitate vomiting, aspiration and agitation.' },
            { title: 'Potent synthetics', text: 'Fentanyl analogues and nitazenes may need repeated doses. Infusion (≈⅔ of the effective bolus dose per hour) for long-acting opioids or recurrent depression.' },
            { title: 'Know what naloxone won’t reverse', text: 'Xylazine and medetomidine (α₂ sedatives), benzodiazepines, alcohol. A patient who is sedated but breathing adequately does not need more naloxone.' },
            { title: 'Observe appropriately', text: 'IV heroin/fentanyl: discharge at ~1 h is reasonable if the St Paul’s criteria are met — mobilizes as usual, SpO₂ >92%, RR 10–20, HR 50–100, T 35–37.5 °C, GCS 15. Methadone, extended-release, oral ingestions or infusion: much longer observation or admission.' },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Nalmefene',
          text: 'Nasal (2023) and autoinjector (2024) nalmefene last longer than naloxone — useful against recurrence, but can cause prolonged, severe precipitated withdrawal in dependent patients.',
        },
        { type: 'tool', tool: 'cows' },
        {
          type: 'callout',
          tone: 'success',
          title: 'Start buprenorphine in the ED',
          items: [
            'The DATA X-waiver was eliminated in January 2023 — any clinician with a Schedule III DEA registration can prescribe.',
            'ED initiation: 78% engaged in treatment at 30 days vs 37–45% with referral or brief intervention (D’Onofrio 2015).',
            'Start in withdrawal (COWS ≥8; many fentanyl-era protocols use ≥12–13) with 8–16 mg SL; high-dose starts up to 24–32 mg on day 1 are well tolerated in ED studies.',
            'Precipitated withdrawal was <1% in a 1,200-patient multisite ED trial where most used fentanyl (D’Onofrio 2023). Worsening after a first dose is usually under-treatment — give more.',
            'Alternatives: low-dose (“micro”) initiation overlapping a full agonist; extended-release injectable buprenorphine. The DEA “72-hour rule” allows dispensing up to a 3-day supply of methadone or buprenorphine while arranging care.',
            'Discharge with naloxone, a bridge prescription, a clinic appointment and harm-reduction supplies (fentanyl test strips).',
          ],
        },
        {
          type: 'cards',
          cards: [
            { title: 'Xylazine (“tranq”)', tone: 'warning', text: 'Veterinary α₂ agonist mixed into fentanyl. Prolonged sedation, bradycardia, severe necrotic wounds. Not reversed by naloxone — give naloxone for respiratory depression anyway (fentanyl is almost always present) and support ventilation.' },
            { title: 'Medetomidine (2024–2026)', tone: 'danger', text: 'More potent α₂ agonist adulterant, almost always with fentanyl; CDC-reported detections rose from 247 (2023) to 8,233 (2025). Withdrawal is severe — marked hypertension, tachycardia, agitation, tremor, vomiting — responds poorly to opioids, benzodiazepines and clonidine, and well to a **dexmedetomidine infusion**, often in the ICU.' },
            { title: 'Nitazenes', tone: 'warning', text: 'Benzimidazole opioids, some more potent than fentanyl, not detected by standard fentanyl tests. Expect multiple naloxone doses and prolonged observation.' },
          ],
        },
      ],
    },
    {
      id: 'stimulants',
      title: 'Stimulants and sympathomimetics',
      blocks: [
        {
          type: 'cards',
          cards: [
            { title: 'Recognize', tone: 'warning', items: ['Agitation, paranoia, hypervigilance', 'Mydriasis, tachycardia, hypertension', '**Diaphoresis** (dry skin → think anticholinergic)', 'Hyperthermia, seizures'] },
            { title: 'What kills', tone: 'danger', items: ['Hyperthermia and rhabdomyolysis', 'ACS, aortic dissection, intracranial hemorrhage', 'Arrhythmia; cocaine → wide QRS', 'Hyponatremia (MDMA)'] },
            {
              title: 'Treat',
              tone: 'success',
              items: [
                'Benzodiazepines, titrated to calm, HR and BP',
                'Antipsychotic adjunct for persistent psychosis — safe and effective (Connors 2019)',
                'Cool aggressively if >39 °C; ice-water immersion for severe hyperthermia',
                'Hypertension: benzodiazepines → nitrates, phentolamine or CCB; avoid β-blockers in acute intoxication with chest pain (ACC/AHA Class III)',
                'Sodium bicarbonate for cocaine-induced wide-complex tachycardia',
              ],
            },
          ],
        },
        {
          type: 'text',
          text: 'Stimulant-induced psychosis usually resolves within days of abstinence; persistence beyond ~1 month suggests a primary psychotic disorder. For stimulant use disorder, **contingency management** has the strongest evidence; no medication is FDA-approved.',
        },
      ],
    },
    {
      id: 'others',
      title: 'Other intoxications you will see',
      blocks: [
        {
          type: 'table',
          headers: ['Substance', 'Clues', 'Management'],
          rows: [
            ['Cannabis (high-potency, edibles)', 'Anxiety, paranoia, tachycardia; children with edibles → lethargy. Cannabinoid hyperemesis: cyclic vomiting relieved by hot showers', 'Reassurance, benzodiazepine. Hyperemesis: haloperidol or droperidol, topical capsaicin; cessation is the cure'],
            ['Synthetic cannabinoids (“K2/spice”)', 'Severe agitation, psychosis, seizures, AKI; not on drug screens', 'Benzodiazepines, supportive care'],
            ['Synthetic cathinones (“bath salts”)', 'Extreme sympathomimetic agitation, hyperthermia', 'As stimulants'],
            ['PCP / ketamine', 'Dissociation, nystagmus (vertical with PCP), analgesia, unpredictable violence', 'Low stimulation, benzodiazepines'],
            ['Hallucinogens (LSD, psilocybin)', 'Perceptual change, panic; physiologically mild', 'Quiet space, reassurance, benzodiazepine if needed'],
            ['GHB', 'Abrupt coma with rapid awakening, bradycardia, vomiting', 'Airway support; expect severe withdrawal in daily users'],
            ['Anticholinergics (diphenhydramine)', 'Delirium, dry flushed skin, mydriasis, retention, absent bowel sounds', 'See Psychotropic Toxicity — physostigmine'],
          ],
        },
      ],
    },
  ],
  pitfalls: [
    'Treating alcohol withdrawal with antipsychotics alone.',
    'Using CIWA-Ar in a patient who cannot communicate or whose symptoms have another cause.',
    'Discharging after naloxone without a naloxone kit or a buprenorphine offer.',
    'Pushing 2 mg IV naloxone into a breathing, opioid-dependent patient.',
    'Missing hypoglycemia, head injury or co-ingestion in someone who is “just drunk.”',
    'Chasing persistent sedation with more naloxone when xylazine, medetomidine or benzodiazepines are the cause.',
  ],
  flashcards: [
    { front: 'Onset of alcohol withdrawal seizures?', back: '6–48 h after the last drink, peak ~24 h.' },
    { front: 'Alcoholic hallucinosis vs delirium tremens?', back: 'Hallucinosis: hallucinations with a clear sensorium at 12–48 h. DTs: delirium + autonomic hyperactivity at 48–96 h.' },
    { front: 'PAWSS cutoff for high risk?', back: '≥4 — high risk of seizures/DTs.' },
    { front: 'CIWA-Ar threshold for pharmacotherapy (ASAM 2020)?', back: '≥10 (moderate, 10–18); ≥19 severe.' },
    { front: 'Caine criteria for Wernicke encephalopathy?', back: '2 of 4: dietary deficiency, eye signs, cerebellar dysfunction, altered mental state/mild memory impairment.' },
    { front: 'Naloxone endpoint?', back: 'Adequate ventilation (RR ≥10–12, SpO₂) — not full arousal.' },
    { front: 'St Paul’s early-discharge criteria 1 h after naloxone?', back: 'Mobilizes as usual, SpO₂ >92%, RR 10–20, HR 50–100, T 35–37.5 °C, GCS 15.' },
    { front: 'Is an X-waiver needed to prescribe buprenorphine?', back: 'No — eliminated January 2023.' },
    { front: 'Treatment of medetomidine withdrawal?', back: 'Dexmedetomidine infusion (often ICU); poor response to opioids, benzodiazepines, clonidine.' },
    { front: 'Initial benzodiazepine taper rate (2025 joint guideline)?', back: '5–10% of the daily dose every 2–4 weeks, individualized; slow or pause for withdrawal.' },
  ],
  references: [
    { cite: 'ASAM Clinical Practice Guideline on Alcohol Withdrawal Management (2020).', url: 'https://www.asam.org/quality-care/clinical-guidelines/alcohol-withdrawal-management-guideline' },
    { cite: 'Maldonado JR et al. Prospective validation of the PAWSS in medically ill inpatients. Alcohol 2015.', url: pubmed('Prospective Validation Study of the Prediction of Alcohol Withdrawal Severity Scale (PAWSS) in Medically Ill Inpatients') },
    { cite: 'Sullivan JT et al. Assessment of alcohol withdrawal: the revised CIWA-Ar. Br J Addict 1989.', url: pubmed('Assessment of alcohol withdrawal: the revised clinical institute withdrawal assessment for alcohol scale (CIWA-Ar)') },
    { cite: 'Rosenson J et al. Phenobarbital for acute alcohol withdrawal: RCT. J Emerg Med 2013.', url: pubmed('Phenobarbital for acute alcohol withdrawal: a prospective randomized double-blind placebo-controlled study') },
    { cite: 'Caine D et al. Operational criteria for identification of Wernicke’s encephalopathy. J Neurol Neurosurg Psychiatry 1997.', url: pubmed("Operational criteria for the classification of chronic alcoholics: identification of Wernicke's encephalopathy") },
    { cite: 'Joint Clinical Practice Guideline on Benzodiazepine Tapering. J Gen Intern Med 2025.', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12463801/' },
    { cite: 'Wesson DR, Ling W. The Clinical Opiate Withdrawal Scale (COWS). J Psychoactive Drugs 2003.', url: pubmed('The Clinical Opiate Withdrawal Scale (COWS)') },
    { cite: 'Christenson J et al. Early discharge of patients with presumed opioid overdose. Acad Emerg Med 2000.', url: pubmed('Early discharge of patients with presumed opioid overdose: development of a clinical prediction rule') },
    { cite: 'D’Onofrio G et al. ED-initiated buprenorphine/naloxone for opioid dependence: RCT. JAMA 2015.', url: pubmed('Emergency department-initiated buprenorphine/naloxone treatment for opioid dependence: a randomized clinical trial') },
    { cite: 'D’Onofrio G et al. Incidence of precipitated withdrawal in ED-initiated buprenorphine in the fentanyl era. JAMA Netw Open 2023.', url: pubmed('Incidence of Precipitated Withdrawal During a Multisite Emergency Department-Initiated Buprenorphine Clinical Trial in the Era of Fentanyl') },
    { cite: 'SAMHSA. Waiver elimination (MAT Act), 2023.', url: 'https://www.samhsa.gov/medications-substance-use-disorders/waiver-elimination-mat-act' },
    { cite: 'CDC HAN-00527 (Apr 2026). Medetomidine in the U.S. illegal fentanyl supply increasing risk for overdose and severe withdrawal syndrome.', url: 'https://www.cdc.gov/han/php/notices/han00527.html' },
    { cite: 'MMWR. Severe medetomidine withdrawal syndrome — Pittsburgh, Oct 2024–Mar 2025.', url: 'https://www.cdc.gov/mmwr/volumes/74/wr/mm7415a3.htm' },
    { cite: 'Connors NJ et al. Antipsychotics for the treatment of sympathomimetic toxicity: systematic review. Am J Emerg Med 2019.', url: pubmed('Antipsychotics for the treatment of sympathomimetic toxicity: A systematic review') },
  ],
};
