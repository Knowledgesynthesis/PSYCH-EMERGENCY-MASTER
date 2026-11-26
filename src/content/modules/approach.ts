import type { Module } from '../types';
import { pubmed } from '../refs';

export const approach: Module = {
  id: 'approach',
  path: '/approach',
  title: 'The Emergency Approach & Medical Assessment',
  short: 'Approach',
  tagline: 'Safety → physiology → medical vs psychiatric → substances → behavior → risk & capacity → disposition.',
  minutes: 12,
  objectives: [
    'Apply one seven-step sequence to any behavioral emergency.',
    'Recognize the red flags that require a medical cause to be excluded first.',
    'Order evidence-based — not reflexive — testing for “medical clearance.”',
    'Know what EMTALA and HIPAA allow and require in psychiatric emergencies.',
  ],
  bottomLine: [
    '**Safety first, then physiology**: vital signs including temperature, fingerstick glucose and SpO₂ come before any psychiatric label.',
    '**Medical mimics cluster** in first presentations, older adults, abnormal vitals, and anyone who is inattentive or drowsy.',
    '**In alert, cooperative adults with normal vitals, a known psychiatric history and a non-contributory exam, routine labs rarely change management** (ACEP; AAEP). Test what the history and exam point to.',
    '**Urine drug screens rarely change ED management** and miss fentanyl on many panels, synthetic cannabinoids, cathinones, xylazine and medetomidine.',
    '**Begin psychiatric evaluation of intoxicated patients when cognition allows — not at an arbitrary blood alcohol level.**',
  ],
  sections: [
    {
      id: 'sequence',
      title: 'The seven-step sequence',
      blocks: [
        {
          type: 'steps',
          steps: [
            { title: 'Scene and staff safety', text: 'Clear exits, enough trained staff, belongings searched per policy, ligature and sharp hazards removed. Never interview a threatening patient alone or with them between you and the door.' },
            { title: 'Immediate physiology', text: 'ABCs, full vital signs with temperature, fingerstick glucose, SpO₂. Treat hypoglycemia, hypoxia and hyperthermia now — they are lethal and reversible.' },
            { title: 'Medical vs psychiatric', text: 'Attention and level of consciousness, orientation, focused neuro exam, toxidrome signs (pupils, skin, bowel sounds, clonus, rigidity). Any red flag → targeted medical workup.' },
            { title: 'Intoxication and withdrawal', text: 'What, how much, when last. Predict withdrawal (PAWSS) and score it (CIWA-Ar, COWS). Reassess mental state and risk once clinically sober.' },
            { title: 'Stabilize behavior', text: 'Verbal de-escalation first, oral medication offered early, parenteral medication chosen by cause, restraint only as a last resort.' },
            { title: 'Risk and capacity', text: 'Suicide and violence risk formulation; capacity for the specific decisions being made (treatment, leaving).' },
            { title: 'Disposition', text: 'The least restrictive setting that is safe, with the reasoning, collateral and follow-up documented.' },
          ],
        },
      ],
    },
    {
      id: 'red-flags',
      title: 'Red flags for a medical cause',
      blocks: [
        {
          type: 'text',
          text: 'Psychiatric symptoms are a final common pathway for infection, metabolic derangement, intoxication, seizures, structural brain disease and autoimmune encephalitis. **Diagnostic overshadowing** — attributing new symptoms to a known psychiatric diagnosis — is a recurring cause of missed sepsis, subdural hematoma, DKA and encephalitis.',
        },
        { type: 'tool', tool: 'red-flags' },
        {
          type: 'reveal',
          prompt: 'A 52-year-old with no psychiatric history has 3 days of paranoia and seeing insects on the walls. HR 118, T 38.2 °C. Primary psychosis?',
          answer: 'No. Four red flags: first onset after 40, visual hallucinations, abrupt onset, abnormal vitals. Treat as delirium or encephalitis until proven otherwise: glucose, CBC, electrolytes with calcium, renal/hepatic function, UA, chest film, toxicology, ECG, CT/MRI, and a low threshold for LP. Ask about alcohol — this could be withdrawal.',
        },
      ],
    },
    {
      id: 'clearance',
      title: '“Medical clearance”: what the evidence supports',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Prefer “focused medical assessment”',
          text: '“Clearance” implies a certainty no test provides. The real question is: **is there an acute medical problem that explains this presentation or needs treatment first?** ACEP’s 2023 policy statement rejects automatic, perfunctory testing of every psychiatric patient as a condition of transfer.',
        },
        {
          type: 'table',
          headers: ['Test', 'Indicated when', 'Pearls'],
          rows: [
            ['Fingerstick glucose', 'Everyone with altered behavior', 'Fast, cheap, treatable.'],
            ['Pregnancy test', 'Anyone who could be pregnant', 'Changes medication choice and disposition.'],
            ['CBC, electrolytes, renal and hepatic function', 'Abnormal vitals, age >~45, medical comorbidity, eating disorder, new onset, inattention', 'Low yield in alert patients with known illness and normal exam.'],
            ['Acetaminophen + salicylate levels, ECG', 'Any intentional ingestion or self-harm', 'Early acetaminophen poisoning is silent and treatable.'],
            ['ECG', 'Overdose, QT-prolonging drugs, stimulants, syncope, chest pain, high-dose or combined antipsychotics', 'Look at QTc, QRS (sodium-channel blockers), rate, rhythm.'],
            ['CK, potassium, creatinine', 'Prolonged struggle or restraint, stimulants, suspected NMS/serotonin syndrome/catatonia', 'Rhabdomyolysis can follow a few hours of agitation.'],
            ['Lithium, valproate, carbamazepine levels', 'Patients on these drugs with toxicity signs, nonadherence, or intercurrent illness', 'Interpret with timing of last dose.'],
            ['Urine drug screen', 'Only when the result would change management', 'Immunoassay: presumptive; many false positives and negatives.'],
            ['CT head', 'Focal signs, trauma, anticoagulation, new cognitive change in older adults, failure to improve as intoxication clears', 'MRI is more sensitive for encephalitis, demyelination and small strokes.'],
            ['LP, EEG, MRI', 'Fever + altered mental status, immunocompromise, suspected encephalitis, nonconvulsive seizures, catatonia with medical features', 'Do not let a psychiatric history delay an LP.'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Intoxicated patients',
          text: 'Start the psychiatric evaluation when the patient’s **cognition** allows them to participate — not at a specific blood alcohol concentration (ACEP). Reassess suicidal statements once sober; retraction is common and itself needs assessment.',
        },
      ],
    },
    {
      id: 'legal',
      title: 'Legal anchors: EMTALA, HIPAA, boarding',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'EMTALA',
              tone: 'info',
              items: [
                'Every ED patient gets a medical screening exam and stabilizing treatment for an emergency medical condition — **danger to self or others is one**.',
                'Transfer only when stabilized, or with certification that benefits outweigh risks and an accepting facility.',
                'Facilities with specialized psychiatric capability must accept appropriate transfers when they have capacity.',
              ],
            },
            {
              title: 'HIPAA and collateral',
              tone: 'success',
              items: [
                '**Listening** to family, outpatient clinicians or police never breaches confidentiality.',
                'Disclosure without consent is permitted to prevent a **serious and imminent threat** to a person or the public (45 CFR 164.512(j)).',
                'With a patient who lacks capacity, share what is needed with involved family in the patient’s interest.',
              ],
            },
            {
              title: 'Boarding is treatment time',
              tone: 'warning',
              items: [
                'Long ED stays increase agitation, restraint and adverse events.',
                'Resume home medications, start indicated treatment, offer food, sleep, nicotine replacement.',
                'Reassess risk, vitals and mental status every shift — “cleared” is not permanent.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'uds',
      title: 'Urine drug screens: know the limits',
      blocks: [
        {
          type: 'list',
          items: [
            '**Presumptive class tests**: positive ≠ intoxicated (THC metabolites persist days–weeks; cocaine metabolite 2–4 days).',
            '**Common misses**: fentanyl (unless specifically tested), synthetic cannabinoids, cathinones, many benzodiazepines (clonazepam, lorazepam), xylazine, medetomidine, nitazenes, gabapentin, GHB.',
            '**False-positive amphetamine**: bupropion, labetalol, trazodone, pseudoephedrine. **False-positive PCP**: dextromethorphan, venlafaxine, diphenhydramine, tramadol.',
            'Confirm with mass spectrometry when the result has consequences (custody, transplant, employment).',
          ],
        },
      ],
    },
  ],
  pitfalls: [
    'Diagnostic overshadowing: a known schizophrenia diagnosis does not protect against sepsis, subdural hematoma or DKA.',
    'Stopping at a positive drug screen — it does not explain fever, focal signs or persistent confusion.',
    'Assessing suicide risk while the patient is intoxicated and discharging on that basis.',
    'Treating “medically cleared” as permanent during a long boarding stay.',
    'Skipping acetaminophen and salicylate levels in “just an antidepressant overdose.”',
  ],
  flashcards: [
    { front: 'First bedside test in any patient with altered behavior?', back: 'Fingerstick glucose — with full vital signs including temperature and SpO₂.' },
    { front: 'When should psychiatric evaluation of an intoxicated patient begin?', back: 'When cognition allows participation — based on clinical sobriety, not a specific blood alcohol level (ACEP).' },
    { front: 'Name six red flags for a medical cause of psychiatric symptoms.', back: 'Abnormal vitals; inattention/fluctuating consciousness; first onset after ~40–45; abrupt onset; focal neuro signs, headache or head trauma; visual/tactile/olfactory hallucinations; toxidrome; new medication; immunocompromise.' },
    { front: 'Labs required after any intentional ingestion?', back: 'Acetaminophen and salicylate levels plus an ECG.' },
    { front: 'What does EMTALA require for a suicidal ED patient?', back: 'A medical screening exam and stabilization (or an appropriate transfer) — psychiatric danger is an emergency medical condition.' },
    { front: 'HIPAA provision allowing disclosure to prevent harm?', back: '45 CFR 164.512(j): to prevent or lessen a serious and imminent threat to a person or the public.' },
    { front: 'Common causes of a false-positive amphetamine immunoassay?', back: 'Bupropion, labetalol, trazodone, pseudoephedrine — confirm with mass spectrometry if it matters.' },
  ],
  references: [
    { cite: 'Nazarian DJ et al. ACEP Clinical Policy: Critical issues in the diagnosis and management of the adult psychiatric patient in the ED. Ann Emerg Med 2017.', url: pubmed('Clinical Policy: Critical Issues in the Diagnosis and Management of the Adult Psychiatric Patient in the Emergency Department') },
    { cite: 'ACEP Policy Statement: Adult psychiatric emergencies (revised April 2023).', url: 'https://www.acep.org/patient-care/policy-statements/adult-psychiatric-emergencies' },
    { cite: 'Wilson MP et al. AAEP Task Force on Medical Clearance of Adult Psychiatric Patients, Parts I–II. West J Emerg Med 2017.', url: pubmed('American Association for Emergency Psychiatry Task Force on Medical Clearance of Adult Psychiatric Patients') },
    { cite: 'Medical screening of adult psychiatric patients presenting to the emergency department. Ann Emerg Med 2026.', url: 'https://pubmed.ncbi.nlm.nih.gov/42233919/' },
    { cite: 'EMTALA, 42 U.S.C. §1395dd.', url: 'https://www.law.cornell.edu/uscode/text/42/1395dd' },
    { cite: 'HIPAA Privacy Rule, 45 CFR 164.512(j) — uses and disclosures to avert a serious threat.', url: 'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.512' },
  ],
};
