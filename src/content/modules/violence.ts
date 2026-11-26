import type { Module } from '../types';
import { pubmed, scholar } from '../refs';

export const violence: Module = {
  id: 'violence',
  path: '/violence',
  title: 'Violence Risk & Duty to Protect',
  short: 'Violence',
  tagline: 'Past violence predicts future violence; intoxication, threats and a target make it now.',
  minutes: 12,
  objectives: [
    'Assess homicidal and violent ideation with the same rigor as suicidal ideation.',
    'Separate static from dynamic risk factors and use a short-term tool (Brøset).',
    'Know the options when a patient threatens an identifiable person (duty to protect).',
    'Keep staff safe and choose a disposition that fits the driver of violence.',
  ],
  bottomLine: [
    '**Most people with mental illness are never violent** and are more often victims than perpetrators.',
    '**Substance use is the biggest modifiable driver**: in schizophrenia, violence risk is ~2× baseline without and ~9× with comorbid substance misuse (Fazel 2009).',
    '**Strongest predictor: past violence.** Dynamic drivers now: intoxication, hostility, persecutory delusions with anger, nonadherence, a specific target, access to weapons.',
    '**Ask directly**: who, how, weapons, intent, timeline, preparatory steps, what has stopped them.',
    '**A serious threat against an identifiable person triggers protective action** — treatment, hospitalization, weapons removal, warning the person and/or police — as your jurisdiction’s law allows or requires.',
  ],
  sections: [
    {
      id: 'ask',
      title: 'Ask about violence directly',
      blocks: [
        {
          type: 'list',
          items: [
            '“Have you had thoughts of hurting anyone? Who?”',
            '“Have you thought about how you would do it? Do you have access to a gun or other weapons?”',
            '“Have you done anything to prepare — followed them, looked up where they are?”',
            '“How close have you come? What has stopped you?”',
            '“Have you hurt anyone before? What happened, and what were you using at the time?”',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Take these seriously',
          items: [
            'Conditional threats (“If he shows up again, I’ll kill him”).',
            'Grievance with fixation on a person or institution, research into the target, leakage to others — the “pathway to violence.”',
            'Threats with suicidal ideation (homicide–suicide, especially in intimate-partner conflict).',
          ],
        },
      ],
    },
    {
      id: 'factors',
      title: 'Risk factors that carry weight',
      blocks: [
        {
          type: 'table',
          headers: ['Domain', 'Factors'],
          rows: [
            ['Historical (static)', 'Past violence (strongest), early-onset violence, prior supervision failure, childhood maltreatment, young age, male sex'],
            ['Clinical (dynamic)', 'Intoxication or substance use disorder; psychosis with hostility, persecutory delusions or perceived threat; irritable mania; impulsivity; poor insight; nonadherence'],
            ['Situational', 'Identified target, access to weapons, recent loss, humiliation or grievance, ongoing conflict with the target, recent victimization, unstable housing'],
            ['Protective', 'Engagement in treatment, stable relationships and housing, sobriety, adherence'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Command hallucinations',
          text: 'Ask what the voices say **and** whether the patient will obey. Compliance with harmful commands is more likely when the voice is believed to be powerful or is identified, and when delusions support the command.',
        },
        {
          type: 'reveal',
          prompt: 'Calm, cooperative 30-year-old with schizophrenia says the voices tell him to hurt his landlord, “but I ignore them.” No violence history, sober. Discharge?',
          answer: 'Not yet. Ask about the landlord (conflict? eviction?), whether he believes the voices, past compliance, weapons, and get collateral. A calm demeanor is not a risk assessment. If there is a credible threat toward an identifiable person, protective duties apply.',
        },
      ],
    },
    {
      id: 'short-term',
      title: 'Short-term prediction on the unit',
      blocks: [
        { type: 'tool', tool: 'broset' },
        {
          type: 'text',
          text: 'The **DASA** (Dynamic Appraisal of Situational Aggression) is a validated alternative for next-day inpatient risk. For longer-term risk, **structured professional judgment** (e.g., HCR-20 V3) outperforms unstructured clinical opinion; it requires training and is a formulation, not a score.',
        },
      ],
    },
    {
      id: 'protect',
      title: 'Duty to protect (Tarasoff and successors)',
      blocks: [
        {
          type: 'text',
          text: 'In **Tarasoff v. Regents of the University of California (1976)**, the California Supreme Court held that a therapist who determines — or reasonably should determine — that a patient presents a serious danger of violence to another has a duty to use reasonable care to protect the intended victim. US states now vary: a **mandatory** duty, a **permissive** right to disclose, or **no** statutory duty. Triggers usually require a serious threat of physical violence against a reasonably identifiable victim.',
        },
        {
          type: 'steps',
          steps: [
            { title: 'Intensify treatment', text: 'Address the driver: sobriety, antipsychotic, mood stabilization, conflict resolution.' },
            { title: 'Hospitalize', text: 'Voluntary or involuntary when danger is due to mental illness and meets legal criteria.' },
            { title: 'Remove weapons access', text: 'With family or police; extreme risk protection orders where available.' },
            { title: 'Warn and/or notify', text: 'The intended victim and/or law enforcement, as your jurisdiction allows or requires.' },
            { title: 'Consult and document', text: 'A colleague, risk management or legal counsel; record the facts, your reasoning and the actions taken, contemporaneously.' },
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'HIPAA permits it',
          text: 'Disclosure is permitted when you believe in good faith it is necessary to prevent or lessen a serious and imminent threat to a person or the public (45 CFR 164.512(j)).',
        },
      ],
    },
    {
      id: 'staff',
      title: 'Staff safety and disposition',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'Staff safety',
              tone: 'warning',
              items: [
                'Never interview a threatening patient alone, or with them between you and the door.',
                'Remove lanyards, pens, scissors; search belongings per policy.',
                'Know the code word, panic button and security plan; leave early rather than late.',
                'Report and debrief every assault — workplace violence is common and under-reported in healthcare.',
              ],
            },
            {
              title: 'Disposition by driver',
              tone: 'info',
              items: [
                '**Illness-driven, imminent** → psychiatric admission (involuntary if needed).',
                '**Intoxication-driven** → observe until sober, then reassess.',
                '**Instrumental/criminal violence without treatable illness** → law-enforcement matter; hospitalization is not a containment tool.',
                '**Low risk, no target or plan, weapons secured** → discharge with follow-up and documented reasoning.',
              ],
            },
          ],
        },
      ],
    },
  ],
  pitfalls: [
    'Not asking about violence because the complaint is “depression.”',
    'Dismissing vague or conditional threats.',
    'Assuming psychosis equals dangerousness (stigma) — or that a calm patient is safe.',
    'Forgetting weapons: ask about firearms at home and in the car.',
    'Not documenting why you did — or did not — warn or hospitalize.',
  ],
  flashcards: [
    { front: 'Strongest single predictor of future violence?', back: 'Past violence.' },
    { front: 'Largest modifiable driver of violence risk in psychosis?', back: 'Substance use (Fazel 2009: ~2× risk without, ~9× with comorbid substance misuse).' },
    { front: 'Brøset Violence Checklist items?', back: 'Confused, irritable, boisterous, verbal threats, physical threats, attacking objects.' },
    { front: 'Brøset score ≥3?', back: 'Very high risk of violence within 24 h — immediate preventive measures and a team plan.' },
    { front: 'What did Tarasoff (1976) establish?', back: 'A duty to use reasonable care to protect an identifiable victim from a patient’s serious threat of violence (now varies by jurisdiction).' },
    { front: 'HIPAA provision permitting disclosure to prevent harm?', back: '45 CFR 164.512(j) — serious and imminent threat.' },
  ],
  references: [
    { cite: 'Fazel S et al. Schizophrenia and violence: systematic review and meta-analysis. PLoS Med 2009.', url: pubmed('Schizophrenia and violence: systematic review and meta-analysis') },
    { cite: 'Witt K et al. Risk factors for violence in psychosis: meta-regression of 110 studies. PLoS One 2013.', url: pubmed('Risk factors for violence in psychosis: systematic review and meta-regression analysis of 110 studies') },
    { cite: 'Almvik R et al. The Brøset Violence Checklist: sensitivity, specificity, and interrater reliability. J Interpers Violence 2000.', url: pubmed('The Broset Violence Checklist: sensitivity, specificity, and interrater reliability') },
    { cite: 'Ogloff JRP, Daffern M. The Dynamic Appraisal of Situational Aggression. Behav Sci Law 2006.', url: pubmed('The dynamic appraisal of situational aggression: an instrument to assess risk for imminent aggression in psychiatric inpatients') },
    { cite: 'Tarasoff v. Regents of the University of California, 17 Cal.3d 425 (1976).', url: scholar('Tarasoff v. Regents of the University of California 17 Cal.3d 425 1976') },
    { cite: 'HIPAA Privacy Rule, 45 CFR 164.512(j).', url: 'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.512' },
  ],
};
