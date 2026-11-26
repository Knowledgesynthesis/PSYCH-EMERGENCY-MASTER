import type { ClinicalCase } from './types';

export const CASES: ClinicalCase[] = [
  {
    id: 'stimulant',
    title: 'The man punching the wall',
    module: 'agitation',
    setting: 'Emergency department, 02:10',
    vignette:
      'Police bring a 32-year-old man after he smashed a store window. He is pacing, shouting that “they” are following him, and suspicious of staff. Triage got only a heart rate of 126 before he pulled off the monitor.',
    steps: [
      {
        prompt: 'What do you do first?',
        options: [
          { text: 'Haloperidol 5 mg IM immediately', correct: false, feedback: 'Medication may be needed soon, but you don’t yet know the cause, the vitals or whether he will take something voluntarily.' },
          { text: 'Make the scene safe, start verbal de-escalation, and get temperature, glucose and SpO₂ as soon as safely possible', correct: true, feedback: 'Safety, then physiology. One calm voice, offer choices (“a tablet to help you feel less on edge?”), and find out whether he is hyperthermic or hypoglycemic.' },
          { text: 'Take a full psychiatric history', correct: false, feedback: 'Not possible or safe yet. Stabilize first.' },
          { text: 'Four-point restraints before anything else', correct: false, feedback: 'Restraint is a last resort after less restrictive measures fail — and struggling in restraints is dangerous if this is stimulant toxicity.' },
        ],
      },
      {
        update: 'T 38.6 °C, HR 128, BP 172/104, sweating, pupils 7 mm. He refuses oral medication and punches the wall again.',
        prompt: 'Which medication now?',
        options: [
          { text: 'Midazolam 5 mg IM, repeated to effect (± an antipsychotic)', correct: true, feedback: 'Sympathomimetic toxidrome (sweating, mydriasis, tachycardia, hypertension, hyperthermia). Benzodiazepines treat agitation and the sympathetic storm; an antipsychotic is a reasonable adjunct.' },
          { text: 'Metoprolol 5 mg IV for the tachycardia', correct: false, feedback: 'β-blockers don’t treat the cause and are discouraged in acute stimulant intoxication with chest pain. Sedate with benzodiazepines first.' },
          { text: 'Haloperidol 5 mg IM alone, redosed in 10 minutes', correct: false, feedback: 'Haloperidol alone is slower and doesn’t address sympathetic drive; redosing at 10 min stacks doses before the first has worked.' },
          { text: 'Physical restraint without medication', correct: false, feedback: 'Prolonged struggle against restraint drives hyperthermia, acidosis and arrest. If restraint is needed, medicate at the same time.' },
        ],
      },
      {
        update: 'After two doses he is calm (BARS 3). Temperature is now 39.8 °C.',
        prompt: 'Next priority?',
        options: [
          { text: 'Acetaminophen and recheck in an hour', correct: false, feedback: 'The heat is from muscle activity and sympathetic drive, not a hypothalamic set point — antipyretics won’t help.' },
          { text: 'Active cooling; check CK, potassium, creatinine and ECG; continuous monitoring', correct: true, feedback: 'Hyperthermia is what kills in stimulant toxicity. Cool aggressively and look for rhabdomyolysis and arrhythmia.' },
          { text: 'Discharge now that he is calm', correct: false, feedback: 'He is hyperthermic and still intoxicated.' },
          { text: 'Dantrolene', correct: false, feedback: 'Not indicated for sympathomimetic hyperthermia; physical cooling and sedation are the treatment.' },
        ],
      },
      {
        update: 'CK 9,800 U/L, creatinine 1.4 mg/dL. Urine positive for amphetamines. Six hours later he is cool but still mildly paranoid.',
        prompt: 'Disposition?',
        options: [
          { text: 'Psychiatric admission for new schizophrenia', correct: false, feedback: 'Too early to diagnose a primary psychosis — stimulant psychosis usually clears over days. He also needs medical treatment.' },
          { text: 'Medical observation/admission for rhabdomyolysis with IV fluids; reassess the psychosis and suicide/violence risk as intoxication clears; offer substance treatment', correct: true, feedback: 'Treat the medical problem, then reassess mentally once sober. Contingency management has the best evidence for stimulant use disorder.' },
          { text: 'Discharge with an outpatient referral', correct: false, feedback: 'Rhabdomyolysis with rising creatinine needs treatment and monitoring.' },
          { text: 'Involuntary hold for danger to others', correct: false, feedback: 'The danger was driven by intoxication; reassess when sober before considering a hold.' },
        ],
      },
    ],
    debrief: [
      'Safety and physiology come before diagnosis: temperature and glucose are part of de-escalation.',
      'Sweating + mydriasis + tachycardia + hyperthermia = sympathomimetic. Benzodiazepines first; antipsychotics are safe adjuncts.',
      'Hyperthermia and rhabdomyolysis are the killers; cool aggressively and avoid prolonged restraint.',
      'Stimulant psychosis is a diagnosis you confirm by watching it clear.',
    ],
  },
  {
    id: 'delirium-case',
    title: 'Not herself',
    module: 'delirium',
    setting: 'Emergency department, from a care home',
    vignette:
      'A 78-year-old woman with mild Alzheimer disease is sent in for “acting strange” for 2 days. Usually chatty and oriented to person and place, she is now drowsy by day, picks at her clothes, and was shouting at night. T 38.4 °C, HR 104, RR 24, SpO₂ 91% on air.',
    steps: [
      {
        prompt: 'Most likely diagnosis?',
        options: [
          { text: 'Progression of dementia', correct: false, feedback: 'Dementia progresses over months to years. A 2-day change is acute.' },
          { text: 'Delirium, probably from an acute medical illness', correct: true, feedback: 'Acute change, fluctuation, drowsiness and abnormal vital signs — delirium superimposed on dementia.' },
          { text: 'Late-onset schizophrenia', correct: false, feedback: 'Not with fever, hypoxia, drowsiness and a 2-day onset.' },
          { text: 'Sundowning — reassure the family', correct: false, feedback: '“Sundowning” is not a diagnosis that explains fever and hypoxia.' },
        ],
      },
      {
        prompt: 'Which bedside finding best confirms delirium?',
        options: [
          { text: 'She cannot name the months backwards past November and drifts off mid-task', correct: true, feedback: 'Inattention is the core feature. The 4AT here: alertness abnormal (4) + acute change (4) already ≥4.' },
          { text: 'She does not recognize her daughter', correct: false, feedback: 'Recognition problems occur in dementia too; they don’t distinguish delirium.' },
          { text: 'She has visual hallucinations', correct: false, feedback: 'Supportive but not specific; inattention is the defining feature.' },
          { text: 'Her MMSE is 18', correct: false, feedback: 'A single cognitive score can’t separate delirium from dementia without baseline and attention testing.' },
        ],
      },
      {
        prompt: 'Initial workup?',
        options: [
          { text: 'Urinalysis only; treat any bacteria found', correct: false, feedback: 'Bacteriuria is common and often asymptomatic in older adults — it should not end the search.' },
          { text: 'Glucose, CBC, electrolytes with calcium, renal and liver function, chest film, cultures, urinalysis, ECG and a medication review', correct: true, feedback: 'With fever, tachypnea and hypoxia, pneumonia is likely — but a systematic search finds additional contributors (drugs, sodium, retention).' },
          { text: 'CT head only', correct: false, feedback: 'Imaging alone misses the commonest causes. CT is for focal signs, falls or anticoagulation.' },
          { text: 'Psychiatric consultation first', correct: false, feedback: 'This is a medical emergency first.' },
        ],
      },
      {
        update: 'Chest film: right lower lobe pneumonia. Urine: bacteriuria. Antibiotics and oxygen are started. At 02:00 she is pulling at her IV and striking at staff despite her daughter at the bedside, reorientation and her glasses.',
        prompt: 'Best medication, if any?',
        options: [
          { text: 'Haloperidol 0.25–0.5 mg (or low-dose quetiapine), reassessing need daily', correct: true, feedback: 'Non-drug measures failed and she is at risk of harm — the APA 2025 indication. Lowest dose, shortest time. (Check she has no Parkinsonism or Lewy body features.)' },
          { text: 'Lorazepam 1 mg IV', correct: false, feedback: 'Benzodiazepines worsen and prolong delirium; reserve them for withdrawal, seizures or catatonia.' },
          { text: 'Diphenhydramine 50 mg IV to help her sleep', correct: false, feedback: 'Anticholinergics are deliriogenic (Beers Criteria).' },
          { text: 'Haloperidol 5 mg IM', correct: false, feedback: 'Roughly 10–20 times the appropriate dose for a frail older adult.' },
        ],
      },
    ],
    debrief: [
      'Acute change + inattention = delirium, even on top of dementia. Ask family about baseline.',
      'Search systematically; a positive urinalysis does not end the workup.',
      'Non-drug care is the treatment; medicate only for distress or danger, at tiny doses, and never with benzodiazepines or anticholinergics unless specifically indicated.',
    ],
  },
  {
    id: 'suicide-case',
    title: '“I can’t take it anymore”',
    module: 'suicide',
    setting: 'Emergency department',
    vignette:
      'A 45-year-old man says he “can’t take it anymore.” Recently divorced and laid off. He lives alone. No prior psychiatric treatment.',
    steps: [
      {
        prompt: 'How do you start?',
        options: [
          { text: 'Validated screen (C-SSRS), then a structured assessment in private', correct: true, feedback: 'Ask directly — it does not increase risk. A screen opens the assessment; it doesn’t replace it.' },
          { text: 'Discharge with an outpatient referral — he has no history', correct: false, feedback: 'No history is not low risk. Middle-aged men living alone after losses are a high-risk group.' },
          { text: 'Automatic involuntary admission', correct: false, feedback: 'Assess first; disposition follows the formulation.' },
          { text: 'Avoid asking about suicide to prevent planting the idea', correct: false, feedback: 'Asking does not plant the idea (Dazzi 2014).' },
        ],
      },
      {
        update: 'C-SSRS: wished he were dead (yes), thoughts of killing himself (yes), thought about method (“shooting myself”) (yes), intent (no), plan (no), lifetime behavior (no).',
        prompt: 'C-SSRS triage level?',
        options: [
          { text: 'Low', correct: false, feedback: 'Method without intent (Q3) raises it.' },
          { text: 'Moderate', correct: true, feedback: 'Q3 = moderate. Intent, plan with intent, or recent behavior would make it high.' },
          { text: 'High', correct: false, feedback: 'Not yet on the screen — but keep assessing.' },
          { text: 'Negative', correct: false, feedback: 'He has active ideation.' },
        ],
      },
      {
        prompt: 'The most important next question?',
        options: [
          { text: '“Do you have access to a gun?”', correct: true, feedback: 'He named shooting as his method. Firearm attempts are ~90% fatal — access changes everything.' },
          { text: '“Is there a family history of depression?”', correct: false, feedback: 'Useful later, but it doesn’t change today’s safety plan.' },
          { text: '“Are you religious?”', correct: false, feedback: 'Reasons for living matter, but means access is the priority.' },
          { text: '“Do you promise not to hurt yourself?”', correct: false, feedback: 'No-suicide contracts have no evidence of benefit.' },
        ],
      },
      {
        update: 'He keeps a handgun at home. His sister arrives: he has been drinking heavily, gave her his dog last week “to look after,” and texted “you’ll all be better off.”',
        prompt: 'Disposition?',
        options: [
          { text: 'Discharge with a safety plan — he denied intent', correct: false, feedback: 'Collateral shows preparatory behavior (giving away the dog) and a farewell message. That outweighs his denial.' },
          { text: 'Psychiatric admission now (involuntary if he refuses and criteria are met), with continuous observation until transfer', correct: true, feedback: 'Preparatory behavior + method + firearm access + intoxication = high risk (SAFE-T).' },
          { text: 'Observe until sober, then discharge', correct: false, feedback: 'Sobriety won’t erase the preparatory acts or the firearm.' },
          { text: 'No-suicide contract and crisis line number', correct: false, feedback: 'Neither has outcome evidence.' },
        ],
      },
      {
        update: 'He agrees to voluntary admission.',
        prompt: 'What else should happen before he eventually goes home?',
        options: [
          { text: 'Nothing — the inpatient team will handle it', correct: false, feedback: 'Means counseling with family can start now and the post-discharge period is the highest-risk window.' },
          { text: 'Lethal-means counseling with his sister (firearm stored off-site, verified), a collaborative safety plan, and follow-up within 24–72 h of discharge plus caring contacts', correct: true, feedback: 'These are the interventions with outcome evidence (SPI + follow-up, ED-SAFE, means restriction).' },
          { text: 'Return the gun at discharge if he feels better', correct: false, feedback: 'Risk is highest in the first weeks after discharge.' },
          { text: 'A 3-month supply of a tricyclic antidepressant', correct: false, feedback: 'TCAs are lethal in overdose; prescribe limited quantities of safer drugs.' },
        ],
      },
    ],
    debrief: [
      'Screen, then assess — and always ask about firearms when a method is named.',
      'Collateral evidence of preparatory behavior outweighs a denial.',
      'Disposition flows from ideation, intent and behavior; protective factors shape the plan.',
      'Means counseling, a safety plan and contact within 24–72 h of discharge are the evidence-based core.',
    ],
  },
  {
    id: 'violence-case',
    title: 'The neighbor is poisoning the water',
    module: 'violence',
    setting: 'Psychiatric emergency service',
    vignette:
      'A 35-year-old man with schizophrenia stopped his medication 2 months ago. He says his neighbor is poisoning his water and that voices tell him to “handle it.” He is sober.',
    steps: [
      {
        prompt: 'Which information matters most right now?',
        options: [
          { text: 'Target, plan, intent, weapons access, past violence, and whether he will obey the voices', correct: true, feedback: 'Assess violence the way you assess suicide: specifics.' },
          { text: 'Childhood developmental milestones', correct: false, feedback: 'Not relevant to the immediate risk.' },
          { text: 'Family history of schizophrenia', correct: false, feedback: 'Doesn’t change today’s safety plan.' },
          { text: 'His insurance status', correct: false, feedback: 'Never a reason to delay a risk assessment.' },
        ],
      },
      {
        update: 'He has a hunting knife at home and says he will “deal with” the neighbor tonight. On the unit he is irritable, loud and verbally threatening staff, but oriented.',
        prompt: 'His Brøset score and your response?',
        options: [
          { text: '3 — very high 24-h risk: immediate preventive measures (offer oral medication, staffing, low-stimulation room, security aware)', correct: true, feedback: 'Irritable + boisterous + verbal threats = 3.' },
          { text: '1 — small risk: routine observation', correct: false, feedback: 'Three items are present.' },
          { text: '0 — he is oriented', correct: false, feedback: 'Orientation is only one of six items.' },
          { text: 'Brøset doesn’t apply to psychosis', correct: false, feedback: 'It applies to inpatients with any diagnosis.' },
        ],
      },
      {
        prompt: 'He refuses admission. Next?',
        options: [
          { text: 'Involuntary hold: danger to others due to mental illness; consider protective duties toward the neighbor', correct: true, feedback: 'Illness-driven, specific, imminent threat with a weapon and a named target.' },
          { text: 'Discharge — he has capacity to refuse', correct: false, feedback: 'Commitment is about danger from mental illness, not capacity.' },
          { text: 'Call police to arrest him for the threat', correct: false, feedback: 'His threat is driven by treatable psychosis; hospitalization addresses it.' },
          { text: 'Document only', correct: false, feedback: 'A serious threat to an identifiable person demands action.' },
        ],
      },
      {
        update: 'He is admitted involuntarily and restarted on his antipsychotic.',
        prompt: 'Does the duty to protect still matter?',
        options: [
          { text: 'No — it ended with admission', correct: false, feedback: 'The threat is contained for now, not resolved.' },
          { text: 'Hospitalization addresses the immediate threat; reassess before discharge and warn/notify per local law if the threat persists; address weapon access with family', correct: true, feedback: 'Duty to protect is satisfied by reasonable protective action — and re-arises if risk persists at discharge.' },
          { text: 'Warn every neighbor on the street', correct: false, feedback: 'Disclosure should be limited to what is needed to protect the identifiable person.' },
          { text: 'Only if he threatens again in writing', correct: false, feedback: 'No such requirement: a credible threat already triggers protective duties.' },
        ],
      },
    ],
    debrief: [
      'Ask specifics: target, plan, means, intent, past violence, command compliance.',
      'Brøset gives a shared, short-term risk language; act on ≥1, urgently on ≥3.',
      'Capacity and commitment are different questions.',
      'Hospitalization is a protective action; reassess and protect again at discharge.',
    ],
  },
  {
    id: 'alcohol-case',
    title: 'The hip fracture who drinks',
    module: 'substances',
    setting: 'Orthopedic ward',
    vignette:
      'A 52-year-old man is admitted with a hip fracture. He drinks ~1 L of vodka daily, had a withdrawal seizure 2 years ago and once had “the shakes and saw spiders.” Last drink 6 hours ago. CIWA-Ar 3 now.',
    steps: [
      {
        prompt: 'At admission, what is the plan?',
        options: [
          { text: 'Wait until CIWA-Ar ≥10 before giving anything', correct: false, feedback: 'He is high risk (PAWSS ≥4 with prior seizure and probable DTs): CIWA-Ar detects withdrawal only once it starts.' },
          { text: 'PAWSS-guided prophylaxis with a GABAergic agent, thiamine, and close monitoring', correct: true, feedback: 'Prophylaxis prevents complicated withdrawal in people predicted to develop it.' },
          { text: 'Clonidine only', correct: false, feedback: 'Masks autonomic signs without preventing seizures or DTs.' },
          { text: 'Haloperidol at night', correct: false, feedback: 'Antipsychotics alone lower the seizure threshold and mask progression.' },
        ],
      },
      {
        update: 'Prophylaxis was not ordered. At 30 hours: CIWA-Ar 22, tactile hallucinations, HR 122, BP 168/98, sweating, still oriented.',
        prompt: 'Management?',
        options: [
          { text: 'Escalating benzodiazepine doses (e.g., diazepam IV every 5–10 min) titrated to light somnolence', correct: true, feedback: 'Severe withdrawal: front-load and titrate; large cumulative doses may be needed.' },
          { text: 'Haloperidol for the hallucinations', correct: false, feedback: 'Treats the symptom, not the withdrawal, and lowers seizure threshold.' },
          { text: 'Dexmedetomidine alone', correct: false, feedback: 'It controls autonomic signs but does not prevent seizures or DTs.' },
          { text: 'Observe — he is oriented', correct: false, feedback: 'CIWA-Ar ≥19 is severe and needs aggressive treatment.' },
        ],
      },
      {
        update: 'At 60 hours, despite 200 mg diazepam over 6 hours: disoriented, T 38.4 °C, HR 140, fluctuating attention.',
        prompt: 'Next?',
        options: [
          { text: 'ICU; add phenobarbital (or propofol if intubated); search for infection and other causes', correct: true, feedback: 'Resistant withdrawal/DTs need ICU care and adjuncts. Fever may be withdrawal — or pneumonia or a wound infection.' },
          { text: 'Stop benzodiazepines — he’s had too much', correct: false, feedback: 'Under-treatment of DTs is what kills.' },
          { text: 'Haloperidol 10 mg IV', correct: false, feedback: 'Not a treatment for withdrawal.' },
          { text: 'Physical restraint and wait', correct: false, feedback: 'Restraint worsens hyperthermia and injury risk.' },
        ],
      },
      {
        update: 'On recovery you note horizontal nystagmus and an unsteady, wide-based gait.',
        prompt: 'What does he need?',
        options: [
          { text: 'High-dose IV thiamine (200–500 mg three times daily) for suspected Wernicke encephalopathy', correct: true, feedback: 'Caine criteria: dietary deficiency + eye signs + cerebellar dysfunction (+ altered mental state).' },
          { text: 'Oral thiamine 100 mg daily', correct: false, feedback: 'Oral absorption is poor in heavy drinkers and the dose is far too low for suspected Wernicke.' },
          { text: 'MRI before treatment', correct: false, feedback: 'Treat clinically; do not delay for imaging.' },
          { text: 'Nothing — it’s alcohol-related ataxia', correct: false, feedback: 'Untreated Wernicke progresses to Korsakoff syndrome.' },
        ],
      },
    ],
    debrief: [
      'Predict with PAWSS; prevent in high-risk patients — don’t wait for CIWA-Ar to climb.',
      'Severe withdrawal needs front-loaded, titrated GABAergic therapy; dexmedetomidine and antipsychotics are adjuncts at most.',
      'Resistant withdrawal → ICU, phenobarbital — and look for infection.',
      'Wernicke is a clinical diagnosis (Caine criteria) treated with high-dose IV thiamine.',
    ],
  },
  {
    id: 'opioid-case',
    title: 'Found down',
    module: 'substances',
    setting: 'Emergency department',
    vignette: 'EMS brings a 29-year-old woman found unresponsive in a restroom. RR 4, SpO₂ 78%, pupils pinpoint. Bystanders gave nothing.',
    steps: [
      {
        prompt: 'First action?',
        options: [
          { text: 'Bag-mask ventilation with oxygen, then naloxone titrated to breathing', correct: true, feedback: 'Hypoxia kills. Ventilate while giving small, repeated naloxone doses.' },
          { text: 'Naloxone 4 mg IV bolus, then restrain in case she wakes angry', correct: false, feedback: 'Large boluses precipitate severe withdrawal, vomiting and aspiration; ventilation comes first.' },
          { text: 'Flumazenil', correct: false, feedback: 'Risks seizures in benzodiazepine-dependent patients and doesn’t treat opioid toxicity.' },
          { text: 'Wait for a drug screen', correct: false, feedback: 'Treat the apnea now.' },
        ],
      },
      {
        update: 'After 0.4 mg IV twice she breathes 14/min, SpO₂ 95%, but stays drowsy; HR 52. Local supply often contains xylazine.',
        prompt: 'Next?',
        options: [
          { text: 'More naloxone until she is fully awake', correct: false, feedback: 'Breathing is adequate. Xylazine sedation is not reversed by naloxone; more naloxone only causes withdrawal.' },
          { text: 'Supportive monitoring; airway positioning; check glucose', correct: true, feedback: 'Treat ventilation, not consciousness.' },
          { text: 'Flumazenil', correct: false, feedback: 'Flumazenil does not reverse opioids or α₂ sedatives and can precipitate seizures in benzodiazepine-dependent patients.' },
          { text: 'Intubate now', correct: false, feedback: 'Not needed while she protects her airway and ventilates adequately; keep monitoring.' },
        ],
      },
      {
        update: 'Two hours later she is awake, yawning, sweating, restless. COWS 13. She asks for help to stop using.',
        prompt: 'Best action?',
        options: [
          { text: 'Give a list of treatment programs', correct: false, feedback: 'Referral alone is far less effective than starting treatment now.' },
          { text: 'Start buprenorphine 8–16 mg SL now; bridge prescription, naloxone kit, follow-up appointment', correct: true, feedback: 'No X-waiver since 2023. ED initiation roughly doubles engagement in treatment.' },
          { text: 'Prescribe methadone tablets', correct: false, feedback: 'Methadone for OUD is dispensed only through opioid treatment programs (or the 72-hour rule).' },
          { text: 'Wait until she has been abstinent for a week', correct: false, feedback: 'She is in withdrawal now — the ideal time to start.' },
        ],
      },
      {
        update: 'Forty-five minutes after 8 mg buprenorphine, COWS rises from 13 to 15. She feels worse.',
        prompt: 'Interpretation?',
        options: [
          { text: 'Most likely under-treatment — give additional buprenorphine', correct: true, feedback: 'A small rise after a first dose is usually incomplete coverage; precipitated withdrawal was <1% in a large fentanyl-era ED trial.' },
          { text: 'Precipitated withdrawal — stop buprenorphine permanently', correct: false, feedback: 'Even true precipitated withdrawal is treated with more buprenorphine plus symptomatic care.' },
          { text: 'Give naloxone', correct: false, feedback: 'Naloxone would precipitate far worse withdrawal; the fix is more buprenorphine.' },
          { text: 'Discharge as is', correct: false, feedback: 'Treat the withdrawal first or she is likely to use again soon.' },
        ],
      },
    ],
    debrief: [
      'Ventilate, then titrate naloxone to breathing.',
      'Persistent sedation with adequate ventilation may be xylazine, medetomidine or co-ingestants — not a naloxone deficiency.',
      'Every opioid overdose is a chance to start buprenorphine and hand out naloxone.',
      'Worsening after a first buprenorphine dose is usually solved with more buprenorphine.',
    ],
  },
  {
    id: 'nms-case',
    title: 'Rigid and burning up',
    module: 'ss-nms',
    setting: 'Inpatient psychiatry → ICU',
    vignette:
      'A 31-year-old man with schizophrenia was given haloperidol decanoate 4 days ago and oral haloperidol was rapidly increased. Today he is mute and stiff. T 39.8 °C, BP swinging 150/95 → 105/60, HR 124, diaphoretic. CK 18,000 U/L. Reflexes are reduced; no clonus.',
    steps: [
      {
        prompt: 'Most likely diagnosis?',
        options: [
          { text: 'Neuroleptic malignant syndrome', correct: true, feedback: 'D2 antagonist exposure + rigidity + hyperthermia + mental status change + autonomic lability + high CK. Consensus score is well above 74.' },
          { text: 'Serotonin syndrome', correct: false, feedback: 'No serotonergic exposure, no clonus, reduced reflexes.' },
          { text: 'Viral illness', correct: false, feedback: 'Doesn’t explain rigidity and a CK of 18,000.' },
          { text: 'Worsening psychosis', correct: false, feedback: 'Fever, rigidity and CK say this is medical.' },
        ],
      },
      {
        prompt: 'First actions?',
        options: [
          { text: 'Stop all dopamine antagonists (including PRN antiemetics), ICU, IV fluids, active cooling, lorazepam, VTE prophylaxis', correct: true, feedback: 'Remove the cause and support. Check for PRN metoclopramide or prochlorperazine orders too.' },
          { text: 'Cyproheptadine', correct: false, feedback: 'That is for serotonin syndrome.' },
          { text: 'Switch to olanzapine', correct: false, feedback: 'Any D2 antagonist can perpetuate NMS.' },
          { text: 'Acetaminophen and observe', correct: false, feedback: 'Antipyretics don’t address muscular heat production.' },
        ],
      },
      {
        update: 'After 24 hours of supportive care and lorazepam, rigidity persists and T is 40.6 °C.',
        prompt: 'Next?',
        options: [
          { text: 'Add bromocriptine and/or dantrolene; plan ECT if refractory', correct: true, feedback: 'For moderate–severe NMS; evidence comes from case series. ECT also treats residual catatonia.' },
          { text: 'Restart haloperidol at a lower dose', correct: false, feedback: 'Never while NMS is active.' },
          { text: 'Stop lorazepam', correct: false, feedback: 'Benzodiazepines help; continue.' },
          { text: 'Physical restraint for agitation', correct: false, feedback: 'Worsens heat production and injury.' },
        ],
      },
      {
        update: 'NMS resolves over 9 days. Two weeks later, paranoia is returning.',
        prompt: 'How do you restart antipsychotic treatment?',
        options: [
          { text: 'Haloperidol decanoate again for adherence', correct: false, feedback: 'High-potency depot is the highest-risk choice after NMS.' },
          { text: 'After ≥2 weeks of resolution: a lower-potency or different-class oral agent at a low dose, slow titration, hydration, monitoring of temperature and CK', correct: true, feedback: 'Recurrence occurs in up to ~30% of rechallenges; these steps reduce it.' },
          { text: 'Never use antipsychotics again', correct: false, feedback: 'Most patients can be rechallenged safely with precautions.' },
          { text: 'Restart at the previous full dose immediately', correct: false, feedback: 'Rapid titration is a risk factor.' },
        ],
      },
    ],
    debrief: [
      'Rigidity + hyperthermia + altered consciousness + autonomic lability + high CK after a D2 blocker = NMS.',
      'Stop every dopamine antagonist — including antiemetics — and support in the ICU.',
      'Bromocriptine/dantrolene for moderate–severe cases; ECT if refractory.',
      'Rechallenge after ≥2 weeks, low and slow, with a different or lower-potency agent.',
    ],
  },
  {
    id: 'catatonia-case',
    title: 'Mute and still',
    module: 'catatonia',
    setting: 'Emergency department',
    vignette:
      'A 26-year-old woman with bipolar disorder has stopped speaking, eating and drinking over 3 days. She stares, holds odd postures for long periods, and resists when her arm is moved. HR 112, T 37.9 °C.',
    steps: [
      {
        prompt: 'Bush–Francis screen is positive. Next?',
        options: [
          { text: 'Haloperidol 5 mg IM for presumed psychosis', correct: false, feedback: 'Antipsychotics can precipitate NMS/malignant catatonia.' },
          { text: 'Lorazepam challenge (1–2 mg IV) with before-and-after signs', correct: true, feedback: 'Diagnostic and therapeutic. Record the signs first.' },
          { text: 'Observation only', correct: false, feedback: 'She isn’t eating or drinking; this needs treatment.' },
          { text: 'CT head only', correct: false, feedback: 'Imaging may be part of the workup but doesn’t treat or confirm catatonia.' },
        ],
      },
      {
        update: 'Five minutes after 2 mg IV lorazepam she says a few words and her posture relaxes — over half of her signs have improved.',
        prompt: 'Plan?',
        options: [
          { text: 'Scheduled lorazepam titrated daily, hold antipsychotics, IV fluids and nutrition, VTE prophylaxis, and a medical workup (EEG, MRI, consider LP)', correct: true, feedback: 'A positive challenge supports catatonia; the workup looks for medical causes (e.g., anti-NMDAR encephalitis in a young woman).' },
          { text: 'A single dose is enough — discharge', correct: false, feedback: 'Catatonia relapses without scheduled treatment.' },
          { text: 'Start haloperidol now that she is talking', correct: false, feedback: 'Still risky during acute catatonia.' },
          { text: 'Switch to diphenhydramine', correct: false, feedback: 'Anticholinergics have no role in catatonia and add delirium risk; continue scheduled lorazepam.' },
        ],
      },
      {
        update: 'Day 3: only partial response. T 39.0 °C, BP swinging 170/100 → 120/70, CK 6,000 U/L, increasing rigidity.',
        prompt: 'Next?',
        options: [
          { text: 'Malignant catatonia — ICU and urgent bilateral ECT', correct: true, feedback: 'Partial response within 48–72 h in malignant catatonia → ECT, daily if needed (BAP).' },
          { text: 'Add haloperidol for agitation', correct: false, feedback: 'Antipsychotics during acute catatonia can precipitate NMS/malignant catatonia.' },
          { text: 'Continue the same lorazepam dose for 2 weeks', correct: false, feedback: 'Malignant catatonia can be fatal; escalate now.' },
          { text: 'Dantrolene alone', correct: false, feedback: 'Supportive at most; ECT is the definitive treatment.' },
        ],
      },
    ],
    debrief: [
      'Look for catatonia in anyone mute, immobile, staring or refusing food — and examine for it.',
      'Lorazepam challenge first; hold antipsychotics.',
      'Feed, hydrate and anticoagulate — complications kill.',
      'Malignant features or inadequate response → ECT without delay.',
    ],
  },
  {
    id: 'postpartum-case',
    title: 'Day six',
    module: 'mania',
    setting: 'Obstetric triage',
    vignette:
      'A 31-year-old is 6 days postpartum. Her partner says she hasn’t slept for three nights, seems confused at times, and insists the baby “isn’t really ours.” She has a history of a depressive episode at 22.',
    steps: [
      {
        prompt: 'Most likely diagnosis?',
        options: [
          { text: 'Baby blues', correct: false, feedback: 'Blues are mild, self-limited tearfulness — not psychosis or confusion.' },
          { text: 'Postpartum psychosis', correct: true, feedback: 'Onset within 2 weeks, insomnia, fluctuating confusion, delusions about the baby.' },
          { text: 'Normal sleep deprivation', correct: false, feedback: 'Doesn’t explain delusions.' },
          { text: 'Postpartum depression', correct: false, feedback: 'Psychosis and confusion make this an emergency, not depression.' },
        ],
      },
      {
        prompt: 'Immediate safety step?',
        options: [
          { text: 'Never leave her alone with the baby; ask directly about thoughts of harming herself or the baby; urgent psychiatric assessment', correct: true, feedback: 'Suicide and infanticide are real risks.' },
          { text: 'Send her home to rest with her partner', correct: false, feedback: 'Too dangerous: postpartum psychosis fluctuates rapidly and carries risk of suicide and infanticide.' },
          { text: 'Separate mother and baby permanently', correct: false, feedback: 'Supervised contact — ideally in a mother–baby unit — supports recovery and bonding.' },
          { text: 'Prescribe a hypnotic and review next week', correct: false, feedback: 'This is an emergency, and sedating a possibly delirious or eclamptic patient without assessment is unsafe.' },
        ],
      },
      {
        prompt: 'Which mimics must be excluded?',
        options: [
          { text: 'BP and urine protein (preeclampsia), sodium, thyroid, infection; imaging if headache, seizures or focal signs (cerebral venous thrombosis)', correct: true, feedback: 'Postpartum confusion has medical causes that are emergencies in their own right.' },
          { text: 'None — the diagnosis is clinical', correct: false, feedback: 'Always exclude medical causes.' },
          { text: 'Genetic testing', correct: false, feedback: 'Not useful acutely and does not exclude any emergency mimic.' },
          { text: 'Only a urine drug screen', correct: false, feedback: 'Too narrow: preeclampsia, infection, thyroiditis, hyponatremia and venous sinus thrombosis would all be missed.' },
        ],
      },
      {
        prompt: 'Treatment and setting?',
        options: [
          { text: 'Admission (mother–baby unit if available), antipsychotic ± lithium, ECT if severe or refractory; individualized breastfeeding advice', correct: true, feedback: 'Lithium has strong evidence in postpartum psychosis; ECT works fast.' },
          { text: 'Outpatient sertraline', correct: false, feedback: 'Antidepressant alone can worsen mania/mixed states.' },
          { text: 'Valproate', correct: false, feedback: 'Poor choice in someone of reproductive age; not first-line here.' },
          { text: 'Watchful waiting', correct: false, feedback: 'Risk is too high: postpartum psychosis can deteriorate within hours.' },
        ],
      },
    ],
    debrief: [
      'New confusion, insomnia and psychosis in the first postpartum weeks = postpartum psychosis until proven otherwise.',
      'Protect mother and baby; exclude preeclampsia, infection, thyroid and sodium disorders, CVT.',
      'Admit — ideally to a mother–baby unit; antipsychotic ± lithium; ECT for severe cases.',
      'In bipolar disorder, plan prophylaxis before delivery (relapse ~66% → ~23%).',
    ],
  },
  {
    id: 'lithium-case',
    title: 'The tremor that got worse',
    module: 'toxicity',
    setting: 'Emergency department',
    vignette:
      'A 71-year-old woman has taken lithium for 20 years. Her new doctor started hydrochlorothiazide and ibuprofen for knee pain 2 weeks ago; she has had diarrhea for 3 days. Now: coarse tremor, ataxia, slurred speech, confusion. Li 2.8 mEq/L; creatinine 2.1 mg/dL (baseline 1.0).',
    steps: [
      {
        prompt: 'What kind of toxicity is this?',
        options: [
          { text: 'Chronic lithium toxicity — neurotoxicity at a “moderate” level', correct: true, feedback: 'Slow accumulation (thiazide, NSAID, dehydration, AKI) means lithium is already in the brain — dangerous even below 4.0.' },
          { text: 'Acute overdose — level will fall quickly', correct: false, feedback: 'No overdose; this is accumulation.' },
          { text: 'Not toxicity — level is under 4.0', correct: false, feedback: 'Treat the patient, not the number.' },
          { text: 'Stroke unrelated to lithium', correct: false, feedback: 'Possible in theory, but the picture and level fit lithium toxicity.' },
        ],
      },
      {
        prompt: 'Initial management?',
        options: [
          { text: 'Stop lithium, thiazide and NSAID; isotonic IV fluids; serial lithium, sodium and creatinine; ECG; nephrology involved early', correct: true, feedback: 'Restore volume and remove the causes of accumulation.' },
          { text: 'Activated charcoal', correct: false, feedback: 'Charcoal does not bind lithium.' },
          { text: 'Haloperidol for confusion', correct: false, feedback: 'Doesn’t address the cause and increases neurotoxicity risk.' },
          { text: 'Reassure and recheck tomorrow', correct: false, feedback: 'She is neurotoxic with AKI.' },
        ],
      },
      {
        prompt: 'EXTRIP classification now (confused but responsive)?',
        options: [
          { text: 'Not indicated', correct: false, feedback: 'Significant confusion meets a “suggested” criterion.' },
          { text: 'Suggested', correct: true, feedback: 'Confusion = suggested. “Recommended” needs Li >4.0 with impaired kidneys, decreased consciousness, seizures or a life-threatening dysrhythmia.' },
          { text: 'Recommended', correct: false, feedback: 'Not yet — her level is <4.0 and she is responsive.' },
          { text: 'Contraindicated', correct: false, feedback: 'Dialysis is not contraindicated here — the question is whether EXTRIP criteria are met.' },
        ],
      },
      {
        update: 'Six hours later she is stuporous and responds only to pain.',
        prompt: 'Now?',
        options: [
          { text: 'Hemodialysis now (recommended); recheck levels for rebound after', correct: true, feedback: 'Decreased consciousness makes dialysis recommended at any level.' },
          { text: 'Continue fluids only', correct: false, feedback: 'Deterioration on optimal therapy — escalate.' },
          { text: 'Whole-bowel irrigation', correct: false, feedback: 'No ingestion to remove.' },
          { text: 'Physostigmine', correct: false, feedback: 'Physostigmine treats antimuscarinic toxicity; it has no role in lithium poisoning.' },
        ],
      },
    ],
    debrief: [
      'Thiazides, NSAIDs, ACE inhibitors/ARBs and dehydration push lithium up — review every new prescription.',
      'Chronic toxicity is neurotoxic at lower levels than acute overdose.',
      'EXTRIP: decreased consciousness, seizures or dysrhythmia → dialysis at any level.',
    ],
  },
  {
    id: 'capacity-case',
    title: '“My dog needs feeding”',
    module: 'capacity',
    setting: 'Emergency department',
    vignette:
      'A 67-year-old on apixaban fell and struck his head. Blood alcohol 180 mg/dL, GCS 14, a scalp laceration. He wants to leave before his CT because his dog hasn’t been fed.',
    steps: [
      {
        prompt: 'What determines whether he may leave?',
        options: [
          { text: 'His capacity for this specific decision, judged against high stakes', correct: true, feedback: 'Refusing a CT after head injury on an anticoagulant is high-stakes: you need clear evidence of every ability.' },
          { text: 'His blood alcohol — above the legal driving limit means no capacity', correct: false, feedback: 'Intoxication can impair capacity, but no number decides it.' },
          { text: 'He is an adult, so he may always leave', correct: false, feedback: 'Only if he has capacity.' },
          { text: 'A psychiatry consult is mandatory', correct: false, feedback: 'Any treating clinician can assess capacity.' },
        ],
      },
      {
        update: 'He repeats back that you are worried about bleeding in his brain, but says: “That can’t happen to me. Blood thinners don’t affect me.”',
        prompt: 'Which ability is impaired?',
        options: [
          { text: 'Communicating a choice', correct: false, feedback: 'His choice is clear and stable.' },
          { text: 'Understanding', correct: false, feedback: 'He can paraphrase the information.' },
          { text: 'Appreciation', correct: true, feedback: 'He understands the facts but does not apply them to himself.' },
          { text: 'None', correct: false, feedback: 'Appreciation is impaired.' },
        ],
      },
      {
        prompt: 'Best management?',
        options: [
          { text: 'Address the reason (arrange for a neighbor to feed the dog), re-explain; if he still refuses and lacks capacity, obtain the CT under the emergency exception using the least restrictive means', correct: true, feedback: 'Solving the real problem often ends the refusal. If not, emergency treatment in his best interest is justified.' },
          { text: 'Have him sign an AMA form and let him go', correct: false, feedback: 'He lacks capacity for this decision; an AMA form is meaningless.' },
          { text: 'Sedate and restrain immediately', correct: false, feedback: 'Try less restrictive measures first.' },
          { text: 'Call the police', correct: false, feedback: 'Not a law-enforcement matter.' },
        ],
      },
      {
        update: 'The CT is normal. Six hours later he is sober, understands and appreciates the risks, and wants to go home rather than stay for observation.',
        prompt: 'Now?',
        options: [
          { text: 'Respect the decision; give head-injury return precautions, document the capacity assessment and informed refusal, invite him back', correct: true, feedback: 'Capacity has returned; a capacitated refusal must be respected.' },
          { text: 'Hold him for observation anyway', correct: false, feedback: 'No legal basis now: he has regained capacity and has no illness-driven danger.' },
          { text: 'Withhold discharge instructions because he is leaving AMA', correct: false, feedback: 'He still deserves a usable plan.' },
          { text: 'Commit him to psychiatry', correct: false, feedback: 'No mental illness-driven danger.' },
        ],
      },
    ],
    debrief: [
      'Capacity is decision- and time-specific; the stakes set the bar.',
      'Fix the reason behind the refusal — it is often practical.',
      'When capacity is lacking and harm is imminent, the emergency exception applies; reassess as the cause (intoxication) resolves.',
    ],
  },
];
