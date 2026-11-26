import type { Module } from '../types';
import { pubmed } from '../refs';

export const toxicity: Module = {
  id: 'toxicity',
  path: '/toxicity',
  title: 'Psychotropic Toxicity & Adverse Drug Emergencies',
  short: 'Toxicity',
  tagline: 'The medicines we prescribe cause some of the most dangerous emergencies our patients have.',
  minutes: 16,
  objectives: [
    'Manage lithium toxicity and apply EXTRIP dialysis criteria.',
    'Recognize tricyclic cardiotoxicity and treat it with sodium bicarbonate.',
    'Diagnose anticholinergic toxicity and use physostigmine safely.',
    'Recognize clozapine emergencies, torsades, valproate hyperammonemia and other high-stakes reactions.',
  ],
  bottomLine: [
    '**Lithium**: chronic toxicity is more dangerous at lower levels than acute overdose. Fluids, stop interacting drugs, dialysis by EXTRIP criteria. Charcoal does not bind lithium.',
    '**TCA overdose**: QRS >100 ms predicts seizures, >160 ms ventricular arrhythmias → sodium bicarbonate 1–2 mEq/kg IV boluses.',
    '**Anticholinergic delirium**: physostigmine controls agitation and delirium better than supportive care alone — avoid it if the QRS is wide.',
    '**Clozapine**: myocarditis (first 4–8 weeks), severe neutropenia, potentially fatal constipation/ileus, seizures, and rebound syndromes when stopped abruptly.',
    '**Torsades**: magnesium 2 g IV; stop QT-prolonging drugs; correct K⁺ and Mg²⁺.',
    '**Every intentional overdose gets acetaminophen and salicylate levels and an ECG.**',
  ],
  sections: [
    {
      id: 'lithium',
      title: 'Lithium toxicity',
      blocks: [
        {
          type: 'table',
          headers: ['Pattern', 'Setting', 'Features'],
          rows: [
            ['Acute', 'Overdose in a lithium-naïve person', 'GI first (vomiting, diarrhea); neurotoxicity later — high early levels before lithium enters the brain'],
            ['Acute-on-chronic', 'Overdose while on lithium', 'GI and neurologic; most dangerous'],
            ['Chronic', 'Dehydration, AKI, new NSAID/ACE-I/ARB/thiazide, low-salt diet, intercurrent illness', 'Neurologic: coarse tremor, ataxia, dysarthria, confusion, myoclonus, seizures, coma; nephrogenic DI; possible permanent cerebellar damage'],
          ],
        },
        {
          type: 'list',
          items: [
            'Therapeutic 0.6–1.2 mEq/L (12-h trough). Toxicity becomes likely above ~1.5 — but **treat the patient, not the number**.',
            'Stop lithium; isotonic saline to restore volume (watch sodium in nephrogenic DI); stop interacting drugs.',
            'Whole-bowel irrigation for large sustained-release ingestions; activated charcoal does not bind lithium.',
            'Repeat levels every 2–6 h (sustained-release preparations peak late); ECG for bradycardia, QT prolongation, T-wave changes.',
          ],
        },
        { type: 'tool', tool: 'extrip' },
      ],
    },
    {
      id: 'tca',
      title: 'Tricyclic antidepressant overdose',
      blocks: [
        {
          type: 'text',
          text: 'TCAs block sodium channels (wide QRS, terminal R wave in aVR >3 mm, rightward terminal axis), muscarinic receptors (anticholinergic toxidrome) and α₁ receptors (hypotension), and cause seizures. Patients can look well and deteriorate abruptly within hours.',
        },
        {
          type: 'steps',
          steps: [
            { title: 'Serial ECGs', text: 'QRS >100 ms → seizure risk; QRS >160 ms → ventricular arrhythmia risk (Boehnert & Lovejoy 1985).' },
            { title: 'Sodium bicarbonate', text: '1–2 mEq/kg IV bolus for QRS >100 ms, ventricular arrhythmia or hypotension; repeat to narrow the QRS; target serum pH ~7.45–7.55.' },
            { title: 'Airway', text: 'Intubate early if consciousness falls; hyperventilate to maintain alkalemia.' },
            { title: 'Seizures', text: 'Benzodiazepines. Avoid phenytoin.' },
            { title: 'Avoid', text: 'Physostigmine, class IA/IC antiarrhythmics, flumazenil.' },
          ],
        },
        {
          type: 'text',
          text: 'Other sodium-channel blockers on psychiatric lists: **bupropion** (seizures, sometimes delayed with XL; QRS widening in large overdose), venlafaxine, lamotrigine, carbamazepine. Citalopram and escitalopram prolong QT.',
        },
      ],
    },
    {
      id: 'anticholinergic',
      title: 'Anticholinergic toxidrome',
      blocks: [
        {
          type: 'text',
          text: '**Hot as a hare, dry as a bone, red as a beet, blind as a bat, mad as a hatter, full as a flask** — plus absent bowel sounds and tachycardia. Causes: diphenhydramine, hydroxyzine, doxylamine, TCAs, benztropine, overdose of olanzapine/quetiapine/clozapine, cyclobenzaprine, scopolamine, jimsonweed.',
        },
        {
          type: 'steps',
          steps: [
            { title: 'Check the ECG first', text: 'Physostigmine is contraindicated with QRS widening (>100 ms), bradycardia or AV block, and in bronchospasm.' },
            { title: 'Physostigmine', text: '0.5–1 mg IV slowly over ≥2–5 min; repeat every 10–15 min to effect. Keep atropine at the bedside. Effect lasts 30–90 min — redose if delirium returns.' },
            { title: 'Supportive', text: 'Benzodiazepines for agitation if physostigmine is unavailable or contraindicated; bladder scan and catheter for retention; cooling.' },
          ],
        },
        {
          type: 'reveal',
          prompt: 'A 19-year-old is picking at the air, mumbling, flushed, dry, with a palpable bladder and HR 128. QRS 88 ms. Haloperidol?',
          answer: 'No — this is antimuscarinic delirium. With a narrow QRS, physostigmine is the treatment of choice (benzodiazepines if unavailable). Haloperidol adds anticholinergic burden and lowers seizure threshold. Catheterize the bladder.',
        },
      ],
    },
    {
      id: 'clozapine',
      title: 'Clozapine emergencies',
      blocks: [
        {
          type: 'cards',
          cards: [
            { title: 'Myocarditis', tone: 'danger', text: 'Mostly in the first 4–8 weeks: fever, tachycardia, chest pain, “flu.” Troponin and CRP weekly for the first 4 weeks (Ronaldson protocol); stop clozapine if confirmed.' },
            { title: 'Severe neutropenia', tone: 'danger', text: 'ANC <500/µL → stop, neutropenic precautions, hematology. FDA removed the REMS in 2025, but ANC monitoring per label continues. Duffy-null associated neutrophil count has different thresholds.' },
            { title: 'GI hypomotility', tone: 'danger', text: 'Constipation → ileus, ischemia, perforation; deaths exceed those from agranulocytosis in some series (FDA warning 2020). Ask about bowel habits; prescribe laxatives prophylactically.' },
            { title: 'Seizures & toxicity', tone: 'warning', text: 'Dose- and level-related. Stopping smoking (loss of CYP1A2 induction) or infection/inflammation can raise levels sharply.' },
            { title: 'Abrupt discontinuation', tone: 'warning', text: 'Cholinergic rebound, rebound psychosis, catatonia. After ≥48 h without doses, re-titrate from 12.5 mg.' },
            { title: 'Other', tone: 'neutral', text: 'Orthostasis and syncope, sialorrhea and aspiration pneumonia, atypical NMS, hyperglycemia/DKA.' },
          ],
        },
      ],
    },
    {
      id: 'qt',
      title: 'QT prolongation and torsades de pointes',
      blocks: [
        {
          type: 'cards',
          cards: [
            { title: 'Higher-risk drugs', tone: 'warning', items: ['IV haloperidol, droperidol (boxed warning), ziprasidone', 'Thioridazine, pimozide', 'Citalopram (FDA: max 40 mg/day; 20 mg if >60), escitalopram', 'Methadone, TCAs'] },
            { title: 'Risk multipliers', tone: 'warning', items: ['QTc >500 ms or rise >60 ms', 'Low K⁺ or Mg²⁺, bradycardia', 'Female sex, structural heart disease, congenital long QT', 'Multiple QT drugs, CYP inhibitors'] },
            { title: 'Torsades', tone: 'danger', items: ['Magnesium sulfate 2 g IV', 'Defibrillate if pulseless/unstable', 'Overdrive pacing or isoproterenol if recurrent', 'Keep K⁺ >4.0 and Mg²⁺ >2.0'] },
          ],
        },
      ],
    },
    {
      id: 'other',
      title: 'Other adverse-drug emergencies',
      blocks: [
        {
          type: 'table',
          headers: ['Drug', 'Emergency', 'Action'],
          rows: [
            ['Valproate', 'Hyperammonemic encephalopathy — even with normal liver tests and therapeutic levels', 'Check ammonia; stop valproate; L-carnitine; dialysis if severe'],
            ['Lamotrigine', 'SJS/TEN, mostly in the first 8 weeks; risk ↑ with valproate or fast titration', 'Stop at the first sign of a concerning rash'],
            ['Carbamazepine', 'Hyponatremia (SIADH); SJS (HLA-B*15:02); overdose with anticholinergic and cardiac effects', 'Sodium; stop for rash; supportive/decontamination'],
            ['Bupropion', 'Seizures (sometimes delayed with XL), QRS widening', 'Observe ≥24 h after XL overdose; benzodiazepines'],
            ['Trazodone, antipsychotics', 'Priapism >4 h', 'Urologic emergency'],
            ['Antipsychotics', 'Acute dystonia, laryngeal dystonia, akathisia', 'See Agitation module'],
          ],
        },
      ],
    },
  ],
  pitfalls: [
    'Reassurance because the lithium level is “only 2.1” in a confused, ataxic chronic user.',
    'Giving activated charcoal for isolated lithium ingestion.',
    'Missing QRS widening in a “sleepy” TCA overdose.',
    'Physostigmine with a wide QRS.',
    'Ignoring constipation in a patient on clozapine.',
    'Restarting clozapine at the old dose after ≥48 h off.',
  ],
  flashcards: [
    { front: 'EXTRIP: when is dialysis RECOMMENDED for lithium?', back: 'Li >4.0 mEq/L with impaired kidney function; or decreased consciousness, seizures, or life-threatening dysrhythmia at any level.' },
    { front: 'EXTRIP: when is dialysis SUGGESTED for lithium?', back: 'Li >5.0; significant confusion; or expected >36 h to reach <1.0 mEq/L.' },
    { front: 'Does activated charcoal bind lithium?', back: 'No — use whole-bowel irrigation for large sustained-release ingestions.' },
    { front: 'TCA overdose QRS thresholds?', back: '>100 ms: seizures; >160 ms: ventricular arrhythmias.' },
    { front: 'Treatment for TCA-induced QRS widening?', back: 'Sodium bicarbonate 1–2 mEq/kg IV boluses, repeated.' },
    { front: 'Contraindications to physostigmine?', back: 'QRS widening/TCA cardiotoxicity, bradycardia or AV block, bronchospasm.' },
    { front: 'Clozapine myocarditis: timing and monitoring?', back: 'First 4–8 weeks; troponin and CRP weekly for the first 4 weeks.' },
    { front: 'Restarting clozapine after ≥48 h of missed doses?', back: 'Re-titrate from 12.5 mg.' },
    { front: 'First-line treatment for torsades de pointes?', back: 'Magnesium sulfate 2 g IV.' },
  ],
  references: [
    { cite: 'Decker BS et al. Extracorporeal treatment for lithium poisoning: EXTRIP recommendations. Clin J Am Soc Nephrol 2015.', url: pubmed('Extracorporeal Treatment for Lithium Poisoning: Systematic Review and Recommendations from the EXTRIP Workgroup') },
    { cite: 'Boehnert MT, Lovejoy FH. QRS duration vs serum level in predicting seizures and arrhythmias after TCA overdose. N Engl J Med 1985.', url: pubmed('Value of the QRS duration versus the serum drug level in predicting seizures and ventricular arrhythmias after an acute overdose of tricyclic antidepressants') },
    { cite: 'Boley SP et al. Physostigmine is superior to non-antidote therapy in antimuscarinic delirium. Clin Toxicol 2019.', url: pubmed('Physostigmine is superior to non-antidote therapy in the management of antimuscarinic delirium') },
    { cite: 'Ronaldson KJ et al. A new monitoring protocol for clozapine-induced myocarditis. Aust N Z J Psychiatry 2011.', url: pubmed('A new monitoring protocol for clozapine-induced myocarditis based on an analysis of 75 cases and 94 controls') },
    { cite: 'Every-Palmer S et al. Clozapine-induced gastrointestinal hypomotility: 22-year pharmacovigilance study. CNS Drugs 2016.', url: pubmed('Clozapine-induced gastrointestinal hypomotility: a 22-year bi-national pharmacovigilance study') },
    { cite: 'FDA removes the REMS program for clozapine (2025).', url: 'https://www.fda.gov/drugs/drug-safety-and-availability/fda-removes-risk-evaluation-and-mitigation-strategy-rems-program-antipsychotic-drug-clozapine' },
    { cite: 'CredibleMeds — QTdrugs lists.', url: 'https://crediblemeds.org' },
  ],
};
