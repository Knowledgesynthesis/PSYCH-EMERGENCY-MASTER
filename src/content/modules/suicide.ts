import type { Module } from '../types';
import { pubmed, scholar } from '../refs';

export const suicide: Module = {
  id: 'suicide',
  path: '/suicide-risk',
  title: 'Suicide Risk: Screen, Assess, Formulate, Act',
  short: 'Suicide',
  tagline: 'Ask directly. Formulate — don’t predict. Every patient leaves with a safety plan and means counseling.',
  minutes: 18,
  objectives: [
    'Screen with a validated instrument (C-SSRS, ASQ) and know what a positive screen triggers.',
    'Build a SAFE-T formulation from ideation, intent, behavior, modifiers and protective factors.',
    'Deliver the brief interventions with outcome evidence: safety planning, lethal-means counseling, follow-up contacts.',
    'Choose and document a disposition.',
  ],
  bottomLine: [
    '**Asking about suicide does not plant the idea or raise risk** (Dazzi 2014 meta-analysis).',
    '**Risk tools and “low/medium/high” labels cannot predict who will die** — most suicides occur in people classified as lower risk (Large 2016). NICE NG225: do not use them to decide who gets treatment or who is discharged.',
    '**Brief interventions work**: safety planning + follow-up calls cut suicidal behavior ~45% (Stanley 2018); screening + safety planning + phone contacts cut attempts ~20% (ED-SAFE).',
    '**Firearms account for over half of US suicide deaths and ~90% of firearm attempts are fatal** — ask about access every time and act on it.',
    '**The days after an ED visit or psychiatric discharge are the highest-risk period** — arrange contact within 24–72 h.',
    '**No-suicide contracts have no evidence of benefit.** Replace them with a collaborative safety plan.',
  ],
  sections: [
    {
      id: 'screen',
      title: 'Screen with a validated tool',
      blocks: [
        {
          type: 'text',
          text: 'The Joint Commission (NPSG 15.01.01) requires validated screening for patients whose primary complaint is behavioral health (all patients in psychiatric hospitals) and an evidence-based assessment for anyone who screens positive. A screen is the start of an assessment, never the end of one.',
        },
        { type: 'tool', tool: 'cssrs' },
        { type: 'tool', tool: 'asq' },
      ],
    },
    {
      id: 'assess',
      title: 'Assess: what actually carries information',
      blocks: [
        {
          type: 'cards',
          cards: [
            { title: 'Ideation', tone: 'warning', text: 'Frequency, duration, intensity, controllability; passive vs active. “Have you thought about how?”' },
            { title: 'Intent and plan', tone: 'danger', text: 'Intent is the strongest acute signal. Method, timing, place, access, rehearsal — and what has stopped them so far.' },
            { title: 'Behavior', tone: 'danger', text: 'Past attempts (the strongest long-term predictor), aborted or interrupted attempts, preparatory acts: buying a gun, stockpiling pills, writing notes, giving things away.' },
            { title: 'Acute modifiers', tone: 'warning', text: 'Agitation, global insomnia, intoxication, psychosis, hopelessness, recent loss or humiliation, recent discharge, access to lethal means.' },
            { title: 'Protective factors', tone: 'success', text: 'Reasons for living, connectedness, children, engagement in care. They shape the plan; they do not cancel acute risk.' },
            { title: 'Collateral', tone: 'info', text: 'Family, outpatient clinician, police, records. Receiving information never breaches confidentiality.' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Interview techniques that get honest answers',
          items: [
            '**Normalize**: “Many people going through this think about ending their life. Have you?”',
            '**Gentle assumption**: “How often this week have you thought about killing yourself?”',
            '**Behavioral incident**: walk step by step through the most recent crisis — what happened next?',
            '**Ask about the worst point** in the past month, not just “now.”',
          ],
        },
        {
          type: 'reveal',
          prompt: 'A patient denies suicidal ideation. Their partner says they bought a gun last week and gave away the dog. How do you weigh this?',
          answer: 'Collateral evidence of preparatory behavior outweighs a denial. Treat as high risk: keep the patient safe, re-interview with the information, involve the partner in removing the firearm, and complete a psychiatric evaluation before any discharge.',
        },
      ],
    },
    {
      id: 'formulate',
      title: 'Formulate — don’t predict',
      blocks: [
        {
          type: 'text',
          text: 'Separate **risk status** (compared with the population — chronic factors that do not change) from **risk state** (compared with this person’s own baseline, now). List the **modifiable** drivers and the **foreseeable changes** that would raise risk — discharge, relapse, a court date, an anniversary — then plan for each.',
        },
        { type: 'tool', tool: 'safet' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'NICE NG225 (2022), self-harm',
          text: 'Do not use risk assessment tools and scales to predict future suicide or repetition of self-harm, and do not use global low/medium/high stratification to decide who is offered treatment or who is discharged. Assess needs and risks to plan care.',
        },
      ],
    },
    {
      id: 'intervene',
      title: 'Interventions with outcome evidence',
      blocks: [
        {
          type: 'table',
          headers: ['Intervention', 'Evidence', 'How'],
          rows: [
            ['Safety Planning Intervention + follow-up calls', '45% fewer suicidal behaviors over 6 months; ~2× outpatient engagement (Stanley 2018, VA EDs)', 'Six steps, written with the patient in their words; at least two follow-up calls.'],
            ['Lethal-means counseling', 'Firearm attempts are ~90% fatal vs <5% for most other methods (Conner 2019); means restriction lowers method-specific and often overall suicide rates', 'Ask about firearms and medication stockpiles; arrange temporary off-site storage with a trusted person, gun shop or police; lock and limit medications; extreme risk protection orders where available.'],
            ['Follow-up / caring contacts', 'ED-SAFE: screening + safety plan + phone contacts → ~20% relative reduction in attempts (Miller 2017)', 'Warm handoff; first contact within 24–72 h; brief caring messages for months.'],
            ['Suicide-specific psychotherapy', 'CBT for suicide prevention, DBT (recurrent self-harm), CAMS — recommended in VA/DoD 2024', 'Refer at disposition; not an ED intervention but part of the plan.'],
            ['Medication', 'Clozapine for suicidality in schizophrenia; lithium in mood disorders (mixed trial data). Ketamine rapidly reduces ideation for days but has not been shown to reduce suicide deaths', 'Treat the underlying disorder; prescribe limited quantities of lethal drugs (e.g., TCAs).'],
          ],
        },
        { type: 'tool', tool: 'safety-plan' },
      ],
    },
    {
      id: 'dispo',
      title: 'Disposition',
      blocks: [
        {
          type: 'table',
          headers: ['Setting', 'Typical indications', 'Before they go'],
          rows: [
            ['Inpatient psychiatry', 'Intent; preparatory behavior; recent serious attempt with persistent ideation; command hallucinations to self-harm; cannot engage in a safety plan; no safe environment', 'Continuous observation until transfer; involuntary hold if refusing and legal criteria met.'],
            ['Observation / crisis unit / partial hospital', 'Moderate risk with an uncertain trajectory; intoxication clearing; collateral pending', 'Reassess when sober and with collateral.'],
            ['Home with intensive follow-up', 'Low–moderate risk, engaged, means secured (verified by a third party), supportive person present', 'Safety plan, means counseling, appointment within 24–72 h, caring contacts, 988.'],
          ],
        },
        {
          type: 'callout',
          tone: 'danger',
          title: 'Verify, don’t assume, means removal',
          text: '“My brother will take the gun” is a plan, not a fact. Where possible, speak to the person who will hold the firearm and confirm it has left the home before discharge.',
        },
      ],
    },
    {
      id: 'groups',
      title: 'Higher-risk groups and moments',
      blocks: [
        {
          type: 'list',
          items: [
            'The first week and month after psychiatric discharge — the highest-risk period (Chung 2017).',
            'Middle-aged and older men; veterans (988 then press 1 for the Veterans Crisis Line).',
            'Youth: screen with the ASQ; ask about bullying, online harms, and access to means at home.',
            'LGBTQ+ youth: 988’s dedicated “Press 3” LGBTQ+ youth line ended in July 2025; the general 988 line and The Trevor Project (1-866-488-7386) remain available.',
            'People with chronic pain, recent incarceration, job loss, or a new serious diagnosis.',
            'Perinatal patients — mental health conditions, including suicide and overdose, are the leading cause of pregnancy-related death in the US (CDC Maternal Mortality Review Committees).',
            'Anyone with a prior attempt, especially a recent or high-lethality one.',
          ],
        },
      ],
    },
  ],
  pitfalls: [
    'Using a count of risk factors, or a single scale score, to decide disposition.',
    'Accepting “I’m fine now” after a serious attempt without collateral.',
    'Asking about firearms but doing nothing with the answer.',
    'Relying on a no-suicide contract.',
    'Assessing — and discharging — while the patient is intoxicated.',
    'Discharging without a dated follow-up: the days after discharge are the riskiest.',
  ],
  flashcards: [
    { front: 'Does asking about suicide increase risk?', back: 'No (Dazzi 2014 meta-analysis).' },
    { front: 'C-SSRS screener answers that indicate HIGH risk?', back: 'Intent (Q4), plan with intent (Q5), or suicidal behavior within the past 3 months (Q6).' },
    { front: 'Six steps of the Stanley–Brown safety plan?', back: 'Warning signs; internal coping; people/places for distraction; people to ask for help; professionals and crisis lines; making the environment safe.' },
    { front: 'Effect of safety planning + follow-up calls (Stanley 2018)?', back: '~45% fewer suicidal behaviors over 6 months and about double the outpatient engagement.' },
    { front: 'Case fatality of firearm suicide attempts?', back: 'About 90%.' },
    { front: 'Why not use low/medium/high labels to decide discharge?', back: 'Poor predictive value — most suicides occur in “low-risk” patients. Use a formulation to plan care (NICE NG225).' },
    { front: 'ASQ: yes to any of Q1–4 but no to Q5?', back: 'Non-acute positive — brief suicide safety assessment before the patient leaves.' },
    { front: 'When is the highest-risk period after psychiatric discharge?', back: 'The first week and first month.' },
  ],
  references: [
    { cite: 'NICE NG225. Self-harm: assessment, management and preventing recurrence (2022).', url: 'https://www.nice.org.uk/guidance/ng225' },
    { cite: 'VA/DoD Clinical Practice Guideline for the Assessment and Management of Patients at Risk for Suicide (2024).', url: 'https://www.healthquality.va.gov/guidelines/MH/srb/' },
    { cite: 'SAMHSA. SAFE-T: Suicide Assessment Five-step Evaluation and Triage.', url: scholar('SAFE-T Suicide Assessment Five-step Evaluation and Triage SAMHSA pocket card') },
    { cite: 'Posner K et al. The Columbia-Suicide Severity Rating Scale: initial validity and internal consistency findings. Am J Psychiatry 2011.', url: pubmed('The Columbia-Suicide Severity Rating Scale: initial validity and internal consistency findings from three multisite studies with adolescents and adults') },
    { cite: 'Horowitz LM et al. Ask Suicide-Screening Questions (ASQ) for the pediatric ED. Arch Pediatr Adolesc Med 2012.', url: pubmed('Ask Suicide-Screening Questions (ASQ): a brief instrument for the pediatric emergency department') },
    { cite: 'Stanley B et al. Safety Planning Intervention with follow-up vs usual care of suicidal patients in the ED. JAMA Psychiatry 2018.', url: pubmed('Comparison of the Safety Planning Intervention With Follow-up vs Usual Care of Suicidal Patients Treated in the Emergency Department') },
    { cite: 'Miller IW et al. Suicide prevention in an ED population: the ED-SAFE study. JAMA Psychiatry 2017.', url: pubmed('Suicide Prevention in an Emergency Department Population: The ED-SAFE Study') },
    { cite: 'Large M et al. Meta-analysis of suicide risk assessment among psychiatric patients. PLoS One 2016.', url: pubmed('Meta-Analysis of Longitudinal Cohort Studies of Suicide Risk Assessment among Psychiatric Patients: Heterogeneity in Results and Lack of Improvement over Time') },
    { cite: 'Chung DT et al. Suicide rates after discharge from psychiatric facilities. JAMA Psychiatry 2017.', url: pubmed('Suicide Rates After Discharge From Psychiatric Facilities: A Systematic Review and Meta-analysis') },
    { cite: 'Conner A et al. Suicide case-fatality rates in the United States, 2007–2014. Ann Intern Med 2019.', url: pubmed('Suicide Case-Fatality Rates in the United States, 2007 to 2014') },
    { cite: 'Dazzi T et al. Does asking about suicide induce suicidal ideation? Psychol Med 2014.', url: pubmed('Does asking about suicide and related behaviours induce suicidal ideation? What is the evidence?') },
    { cite: 'NPR. 988 Lifeline’s Press 3 option for LGBTQ+ youth ends (July 2025).', url: 'https://www.npr.org/2025/07/16/nx-s1-5467516/trump-administration-ends-988-lifelines-press-3-option-for-lgbtq-teens' },
  ],
};
