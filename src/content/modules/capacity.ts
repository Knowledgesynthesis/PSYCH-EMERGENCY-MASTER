import type { Module } from '../types';
import { pubmed } from '../refs';

export const capacity: Module = {
  id: 'capacity',
  path: '/capacity',
  title: 'Capacity, Consent & Disposition',
  short: 'Capacity',
  tagline: 'Capacity is decision-specific; commitment is about danger; disposition is the least restrictive safe option.',
  minutes: 14,
  objectives: [
    'Assess decision-making capacity with the four abilities and a sliding scale.',
    'Distinguish capacity, competence, civil commitment and involuntary medication.',
    'Handle patients leaving against medical advice and the emergency exception.',
    'Choose and document a disposition.',
  ],
  bottomLine: [
    '**Four abilities (Appelbaum): communicate a choice, understand, appreciate, reason.** Any treating clinician can assess capacity; psychiatry helps in hard cases.',
    '**Capacity is specific to a decision and a moment.** A psychiatric diagnosis or involuntary status does not by itself remove it.',
    '**Capacity ≠ commitment.** Commitment requires mental illness plus danger to self or others or grave disability (jurisdiction-specific). A patient can have capacity yet meet commitment criteria — and vice versa.',
    '**Emergency exception**: when delay would cause serious harm and capacity is lacking, treat in the patient’s best interest, then document.',
    '**A capacitated patient may refuse — even unwisely.** Document, offer alternatives, invite them back.',
  ],
  sections: [
    {
      id: 'abilities',
      title: 'The four abilities',
      blocks: [
        {
          type: 'table',
          headers: ['Ability', 'How to test', 'Typical impairments'],
          rows: [
            ['Communicate a choice', '“What would you like to do?” Is the choice stable?', 'Mutism, severe ambivalence, fluctuating delirium'],
            ['Understand', 'Teach-back: condition, options, risks and benefits in their words', 'Cognitive impairment, intoxication, delirium, language barrier (use an interpreter)'],
            ['Appreciate', '“Why do you think we recommend this? What will happen if you go home?”', 'Delusions about illness or treatment, denial in mania, nihilism in severe depression, anosognosia'],
            ['Reason', '“How did you weigh the options? Why is that better for you?”', 'Thought disorder, depressive distortion (“I don’t deserve treatment”), mania'],
          ],
        },
        { type: 'tool', tool: 'capacity' },
        {
          type: 'text',
          text: 'Structured aids: the **Aid to Capacity Evaluation (ACE)** has the best support among brief bedside tools (Sessums 2011); the **MacCAT-T** is the structured reference standard.',
        },
      ],
    },
    {
      id: 'sliding',
      title: 'The sliding scale',
      blocks: [
        {
          type: 'cards',
          cards: [
            { title: 'Low stakes', tone: 'success', text: 'Accepting an effective, low-risk treatment (antibiotics for pneumonia): basic understanding is enough.' },
            { title: 'Balanced', tone: 'warning', text: 'Choosing between reasonable options with real trade-offs: good understanding and reasoning.' },
            { title: 'High stakes', tone: 'danger', text: 'Refusing effective, life-saving treatment: the clearest evidence of every ability.' },
          ],
        },
        {
          type: 'text',
          text: 'The sliding scale changes **how much evidence of the abilities you need**, proportional to the consequences — not which answer is acceptable.',
        },
        {
          type: 'reveal',
          prompt: 'A man with schizophrenia refuses appendectomy: “I know it’s appendicitis and I could die. My brother died in surgery and I’m terrified. I’d rather try antibiotics.” Capacity?',
          answer: 'Likely yes: he understands, appreciates, reasons from a coherent fear and values, and his choice is stable. The diagnosis does not remove capacity. Antibiotics-first is an evidence-based option for many with uncomplicated appendicitis (CODA trial) — negotiate, document, and keep surgery available.',
        },
      ],
    },
    {
      id: 'distinctions',
      title: 'Capacity, competence, commitment',
      blocks: [
        {
          type: 'table',
          headers: ['Concept', 'Decided by', 'Standard'],
          rows: [
            ['Capacity', 'Treating clinician', 'Four abilities, for a specific decision, at a specific time'],
            ['Competence', 'Court', 'Legal finding (guardianship, competence to stand trial) — global or limited'],
            ['Civil commitment / emergency hold', 'Clinician initiates; court reviews', 'Mental illness + danger to self/others or grave disability. Initial emergency holds range from about 1 to 10+ days depending on the state'],
            ['Involuntary medication', 'Separate legal process in most US states (e.g., Rogers, Riese hearings) except emergencies', 'Being committed does not equal consent to medication'],
          ],
        },
      ],
    },
    {
      id: 'ama',
      title: 'Leaving against medical advice',
      blocks: [
        {
          type: 'steps',
          steps: [
            { title: 'Assess capacity for this decision', text: 'With the stakes in mind (sliding scale).' },
            { title: 'Find out why — and fix what you can', text: 'Pain, waiting, child care, fear, nicotine withdrawal (offer replacement), a pet at home.' },
            { title: 'Offer the next-best plan', text: 'Partial treatment, prescriptions, a scheduled return or clinic visit. Harm reduction beats nothing.' },
            { title: 'Lacks capacity and at risk of serious harm', text: 'Detain and treat under the emergency doctrine or a hold, per local law; use the least restrictive means.' },
            { title: 'Has capacity', text: 'Respect the choice; still give discharge instructions and prescriptions; invite them back any time.' },
            { title: 'Document', text: 'Capacity assessment, the informed-refusal discussion, alternatives offered. An AMA form alone protects little.' },
          ],
        },
      ],
    },
    {
      id: 'dispo',
      title: 'Disposition',
      blocks: [
        {
          type: 'table',
          headers: ['Setting', 'Indications', 'Before they go'],
          rows: [
            ['Inpatient psychiatry (voluntary or involuntary)', 'Imminent danger to self/others, grave disability, severe psychosis, mania or catatonia not manageable elsewhere', 'Medically stable, medication reconciliation, risk formulation and handoff'],
            ['Medical admission + psychiatry consult', 'Delirium, overdose needing monitoring, NMS/SS, catatonia with medical complications, severe withdrawal, unstable eating disorder', '1:1 observation if suicidal; ligature-safe room where possible'],
            ['Crisis stabilization / 23-h observation / EmPATH unit', 'Risk likely to settle within ~24 h — intoxication, situational crisis', 'Reassess when sober and with collateral'],
            ['Partial hospital / intensive outpatient', 'Moderate symptoms, safe at home, needs daily structure', 'Start date and transport'],
            ['Outpatient', 'Lower risk, engaged, safe environment', 'Safety plan, means counseling, appointment within 7 days (ideally 24–72 h), 988'],
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Documentation that protects patients — and you',
          text: 'The risk formulation; why this is the least restrictive safe setting; collateral obtained; capacity where relevant; means counseling and safety plan; follow-up arranged; return instructions.',
        },
      ],
    },
    {
      id: 'surrogates',
      title: 'Emergency exception and surrogates',
      blocks: [
        {
          type: 'text',
          text: 'When delay would cause serious harm and the patient lacks capacity, consent is implied for necessary emergency treatment. Otherwise follow advance directives — including **psychiatric advance directives** — then surrogates in the order set by local law. Re-check capacity as reversible causes (delirium, intoxication, pain, hypoxia) resolve.',
        },
      ],
    },
  ],
  pitfalls: [
    'Assessing capacity “globally” instead of for the specific decision.',
    'Equating disagreement with incapacity — or agreement with capacity.',
    'Assuming an involuntarily held patient can neither consent nor refuse anything.',
    'Relying on an AMA form instead of a documented discussion.',
    'Concluding incapacity before treating reversible causes or using an interpreter.',
  ],
  flashcards: [
    { front: 'Four abilities of decision-making capacity?', back: 'Communicate a choice, understand, appreciate, reason.' },
    { front: 'Who determines competence?', back: 'A court.' },
    { front: 'Can a committed patient refuse medication?', back: 'Generally yes outside emergencies — involuntary medication needs a separate legal process in most US states.' },
    { front: 'Typical civil commitment criteria?', back: 'Mental illness plus danger to self, danger to others, or grave disability.' },
    { front: 'What does the sliding scale change?', back: 'How much evidence of the abilities is required, in proportion to the stakes.' },
    { front: 'Best-supported brief bedside capacity tool?', back: 'Aid to Capacity Evaluation (ACE) — Sessums 2011.' },
    { front: 'Most important element of an AMA discharge?', back: 'A documented capacity assessment and informed-refusal discussion, plus a usable plan and an invitation to return.' },
  ],
  references: [
    { cite: 'Appelbaum PS. Assessment of patients’ competence to consent to treatment. N Engl J Med 2007.', url: pubmed("Assessment of patients' competence to consent to treatment") },
    { cite: 'Sessums LL et al. Does this patient have medical decision-making capacity? JAMA 2011.', url: pubmed('Does this patient have medical decision-making capacity?') },
    { cite: 'Drane JF. The many faces of competency. Hastings Cent Rep 1985.', url: pubmed('The many faces of competency') },
    { cite: 'CODA Collaborative. A randomized trial comparing antibiotics with appendectomy for appendicitis. N Engl J Med 2020.', url: pubmed('A Randomized Trial Comparing Antibiotics with Appendectomy for Appendicitis') },
    { cite: 'EMTALA, 42 U.S.C. §1395dd.', url: 'https://www.law.cornell.edu/uscode/text/42/1395dd' },
  ],
};
