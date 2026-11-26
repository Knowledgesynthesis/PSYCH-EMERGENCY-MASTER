import type { Module } from '../types';
import { pubmed } from '../refs';

export const ssnms: Module = {
  id: 'ss-nms',
  path: '/serotonin-nms',
  title: 'Serotonin Syndrome, NMS & Hyperthermic Mimics',
  short: 'SS vs NMS',
  tagline: 'Clonus says serotonin; rigidity says dopamine blockade. Both say: stop the drug and cool.',
  minutes: 15,
  objectives: [
    'Diagnose serotonin toxicity with the Hunter criteria.',
    'Diagnose NMS with the international consensus criteria.',
    'Differentiate SS, NMS, anticholinergic, sympathomimetic, malignant hyperthermia and malignant catatonia at the bedside.',
    'Treat each — and know when (not) to restart the offending drug.',
  ],
  bottomLine: [
    '**Serotonin syndrome**: hours after a serotonergic change; clonus (inducible, ocular, spontaneous), hyperreflexia, tremor, agitation, diaphoresis, diarrhea, mydriasis. Most cases settle within ~24 h of stopping the drug.',
    '**NMS**: days after starting or increasing a dopamine antagonist (or stopping a dopamine agonist); lead-pipe rigidity, hyperthermia, altered consciousness, autonomic lability, high CK; resolves over 1–2 weeks (longer with depots).',
    '**Hyperthermia is what kills** — and antipyretics don’t work (the heat is muscular). Cool physically; sedate, paralyze and intubate if temperature exceeds ~41 °C.',
    '**Anticholinergic toxicity**: dry, hot, flushed skin, absent bowel sounds, urinary retention — normal reflexes and tone.',
    '**Hidden culprits**: linezolid, methylene blue, tramadol, dextromethorphan (SS); metoclopramide, prochlorperazine, promethazine, levodopa withdrawal (NMS).',
  ],
  sections: [
    {
      id: 'compare',
      title: 'Bedside differentiation',
      blocks: [
        {
          type: 'table',
          headers: ['', 'Serotonin syndrome', 'NMS', 'Anticholinergic', 'Sympathomimetic', 'Malignant hyperthermia'],
          rows: [
            ['Trigger', 'Serotonergic start, increase, interaction or overdose', 'D2 antagonist start/increase; dopamine-agonist withdrawal', 'Antimuscarinics (diphenhydramine, TCAs, benztropine…)', 'Cocaine, amphetamines, cathinones', 'Volatile anesthetics, succinylcholine'],
            ['Onset', 'Hours (most within 6–24 h)', '1–3 days; usually first 2 weeks', 'Hours', 'Minutes–hours', 'Minutes–hours of anesthesia'],
            ['Neuromuscular', 'Clonus, hyperreflexia, tremor — legs > arms', 'Lead-pipe rigidity, bradykinesia; reflexes normal/↓', 'Normal (myoclonus possible)', 'Tremor; tone normal', 'Masseter then generalized rigidity'],
            ['Mental status', 'Agitation, hypervigilance', 'Stupor, mutism, confusion', 'Agitated delirium, mumbling, picking', 'Agitation, paranoia', 'Anesthetized'],
            ['Skin', 'Diaphoretic', 'Diaphoretic, pale', '**Dry**, hot, flushed', 'Diaphoretic', 'Mottled, sweaty'],
            ['Pupils', 'Mydriasis', 'Normal', 'Mydriasis (sluggish)', 'Mydriasis', 'Normal'],
            ['Bowel sounds', 'Hyperactive, diarrhea', 'Normal or ↓', 'Absent', 'Normal or ↑', 'Normal'],
            ['Key labs', 'CK ↑ when severe', 'CK markedly ↑, leukocytosis, low serum iron', '—', 'CK ↑', '↑ end-tidal CO₂, K⁺ ↑, CK ↑'],
            ['Resolves', '~24 h after stopping (longer with MAOIs, fluoxetine)', '7–10 days oral; 2–4 weeks depot', 'Hours–days', 'Hours', 'With dantrolene'],
            ['Specific therapy', 'Benzodiazepines, cyproheptadine', 'Benzodiazepines, bromocriptine, dantrolene, ECT', 'Physostigmine', 'Benzodiazepines, cooling', 'Dantrolene'],
          ],
        },
        {
          type: 'text',
          text: '**Malignant catatonia** looks like NMS but catatonic signs come first, and it can occur without any antipsychotic. Treat as in the Catatonia module.',
        },
        {
          type: 'reveal',
          prompt: 'Eight hours after linezolid is added to sertraline: T 39.5 °C, agitation, ankle clonus, diarrhea. Diagnosis — and why linezolid?',
          answer: 'Serotonin syndrome (Hunter: inducible clonus + agitation). Linezolid is a weak, reversible MAO inhibitor — as is methylene blue — and interacts with SSRIs.',
        },
      ],
    },
    {
      id: 'ss',
      title: 'Serotonin syndrome',
      blocks: [
        { type: 'tool', tool: 'hunter' },
        {
          type: 'steps',
          steps: [
            { title: 'Stop every serotonergic drug', text: 'Including “hidden” ones: tramadol, meperidine, methadone, fentanyl, dextromethorphan, linezolid, methylene blue, lithium, triptans (low risk), St John’s wort, MDMA.' },
            { title: 'Support', text: 'IV fluids, cardiac monitoring, cooling.' },
            { title: 'Benzodiazepines', text: 'For agitation, tremor and hypertension. Avoid physical restraint — isometric contraction drives hyperthermia and lactic acidosis.' },
            { title: 'Cyproheptadine (5-HT2A antagonist, oral/NG only)', text: '12 mg, then 2 mg every 2 h while symptoms continue; maintenance 8 mg every 6 h. Evidence is limited.' },
            { title: 'Severe (temperature >41 °C, rising rigidity)', text: 'Immediate sedation, paralysis with a **non-depolarizing** agent (avoid succinylcholine), intubation, active cooling. Antipyretics do not help.' },
            { title: 'Avoid', text: 'Propranolol (masks tachycardia, hypotension), bromocriptine and dantrolene (may worsen SS), chlorpromazine (hypotension; NMS if the diagnosis is wrong).' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Prevention',
          items: [
            'Wait **14 days** after stopping an MAOI before starting another serotonergic drug, and **5 weeks** after fluoxetine before starting an MAOI.',
            'Avoid linezolid and methylene blue with serotonergic drugs when alternatives exist (FDA warnings); if unavoidable, stop the serotonergic drug and monitor closely.',
          ],
        },
      ],
    },
    {
      id: 'nms',
      title: 'Neuroleptic malignant syndrome',
      blocks: [
        { type: 'tool', tool: 'nms' },
        {
          type: 'text',
          text: 'Incidence roughly 0.01–0.02% of antipsychotic-treated patients; mortality now about 5–10%. **Risk factors**: dehydration, agitation and restraint, high-potency first-generation drugs, rapid titration, IM or high doses, depots, catatonia, prior NMS, low serum iron, lithium co-treatment. **Atypical NMS** with SGAs or clozapine may have less rigidity and lower temperatures. Non-psychiatric D2 blockers — **metoclopramide, prochlorperazine, promethazine, droperidol** — and abrupt **levodopa withdrawal** cause it too.',
        },
        {
          type: 'steps',
          steps: [
            { title: 'Stop all dopamine antagonists', text: 'Including antiemetics. Restart any withdrawn dopaminergic drug.' },
            { title: 'ICU-level support', text: 'Aggressive fluids, cooling, electrolytes, VTE prophylaxis; monitor CK, potassium and creatinine (rhabdomyolysis → AKI).' },
            { title: 'Mild', text: 'Lorazepam 1–2 mg IV every 4–6 h plus supportive care.' },
            { title: 'Moderate–severe', text: 'Bromocriptine 2.5 mg PO/NG every 8 h, titrated (up to ~40 mg/day), and/or dantrolene 1–2.5 mg/kg IV (up to 10 mg/kg/day) for severe rigidity and hyperthermia; amantadine is an alternative. Evidence is from case series.' },
            { title: 'Refractory', text: 'ECT — also treats residual catatonia.' },
            { title: 'Rechallenge', text: 'Wait **≥2 weeks** after full resolution; use a lower-potency or different-class drug at a low dose with slow titration and hydration. Recurrence occurs in up to ~30%.' },
          ],
        },
      ],
    },
    {
      id: 'other',
      title: 'Other hyperthermic emergencies',
      blocks: [
        {
          type: 'cards',
          cards: [
            { title: 'Malignant hyperthermia', tone: 'danger', text: 'Stop volatile agents, dantrolene 2.5 mg/kg IV repeated to effect, cool, treat hyperkalemia.' },
            { title: 'Heat stroke', tone: 'warning', text: 'Antipsychotics, anticholinergics and lithium impair thermoregulation — psychiatric patients die in heat waves. Cold-water immersion.' },
            { title: 'Also consider', tone: 'info', text: 'Sepsis and meningitis, thyroid storm, alcohol/sedative withdrawal, sympathomimetic toxicity, malignant catatonia.' },
          ],
        },
      ],
    },
  ],
  pitfalls: [
    'Missing clonus because only the arms were examined.',
    'Treating the fever with acetaminophen and waiting.',
    'Giving bromocriptine for SS or cyproheptadine for NMS because no diagnosis was committed to.',
    'Forgetting metoclopramide, prochlorperazine and promethazine as causes of NMS.',
    'Intubating a rhabdomyolytic patient with succinylcholine.',
    'Restarting the antipsychotic within days of NMS resolving.',
  ],
  flashcards: [
    { front: 'Hunter criteria decision rules?', back: 'With serotonergic exposure: spontaneous clonus; inducible clonus + agitation or diaphoresis; ocular clonus + agitation or diaphoresis; tremor + hyperreflexia; hypertonia + T >38 °C + ocular or inducible clonus.' },
    { front: 'Cyproheptadine regimen in serotonin syndrome?', back: '12 mg, then 2 mg every 2 h while symptomatic; maintenance 8 mg every 6 h (oral/NG).' },
    { front: 'NMS international consensus score cutoff?', back: '≥74 of 100 priority points.' },
    { front: 'Typical onset of NMS?', back: 'Within days of starting or increasing a D2 antagonist — usually in the first 2 weeks.' },
    { front: 'Why do antipyretics fail in SS and NMS?', back: 'The heat comes from muscle activity, not a raised hypothalamic set point.' },
    { front: 'Anticholinergic vs sympathomimetic toxidrome — key difference?', back: 'Skin: dry in anticholinergic, sweaty in sympathomimetic. Bowel sounds absent in anticholinergic.' },
    { front: 'How long to wait before an antipsychotic rechallenge after NMS?', back: '≥2 weeks after resolution; low dose, low potency, slow titration.' },
    { front: 'MAO inhibitors hiding in hospitals?', back: 'Linezolid and methylene blue.' },
  ],
  references: [
    { cite: 'Dunkley EJC et al. The Hunter Serotonin Toxicity Criteria. QJM 2003.', url: pubmed('The Hunter Serotonin Toxicity Criteria: simple and accurate diagnostic decision rules for serotonin toxicity') },
    { cite: 'Boyer EW, Shannon M. The serotonin syndrome. N Engl J Med 2005.', url: pubmed('Boyer EW Shannon M The serotonin syndrome N Engl J Med 2005') },
    { cite: 'Gurrera RJ et al. An international consensus study of NMS diagnostic criteria using the Delphi method. J Clin Psychiatry 2011.', url: pubmed('An international consensus study of neuroleptic malignant syndrome diagnostic criteria using the Delphi method') },
    { cite: 'Gurrera RJ et al. A validation study of the international consensus diagnostic criteria for NMS. J Clin Psychopharmacol 2017.', url: pubmed('A Validation Study of the International Consensus Diagnostic Criteria for Neuroleptic Malignant Syndrome') },
    { cite: 'Strawn JR, Keck PE, Caroff SN. Neuroleptic malignant syndrome. Am J Psychiatry 2007.', url: pubmed('Strawn Keck Caroff Neuroleptic malignant syndrome Am J Psychiatry 2007') },
  ],
};
