import { describe, expect, it } from 'vitest';
import { asq, cssrs, extrip, hunter, safetLevel, type CssrsInput, type HunterInput } from '../tools/logic';

const H: HunterInput = {
  serotonergic: true,
  spontaneousClonus: false,
  inducibleClonus: false,
  ocularClonus: false,
  agitation: false,
  diaphoresis: false,
  tremor: false,
  hyperreflexia: false,
  hypertonia: false,
  tempOver38: false,
};

describe('Hunter serotonin toxicity criteria (Dunkley 2003)', () => {
  it('requires serotonergic exposure', () => {
    expect(hunter({ ...H, serotonergic: false, spontaneousClonus: true }).met).toBe(false);
  });
  it('spontaneous clonus alone is sufficient', () => {
    expect(hunter({ ...H, spontaneousClonus: true }).met).toBe(true);
  });
  it('inducible clonus needs agitation or diaphoresis', () => {
    expect(hunter({ ...H, inducibleClonus: true }).met).toBe(false);
    expect(hunter({ ...H, inducibleClonus: true, agitation: true }).met).toBe(true);
    expect(hunter({ ...H, inducibleClonus: true, diaphoresis: true }).met).toBe(true);
  });
  it('ocular clonus needs agitation or diaphoresis', () => {
    expect(hunter({ ...H, ocularClonus: true }).met).toBe(false);
    expect(hunter({ ...H, ocularClonus: true, diaphoresis: true }).met).toBe(true);
  });
  it('tremor requires hyperreflexia', () => {
    expect(hunter({ ...H, tremor: true }).met).toBe(false);
    expect(hunter({ ...H, hyperreflexia: true }).met).toBe(false);
    expect(hunter({ ...H, tremor: true, hyperreflexia: true }).met).toBe(true);
  });
  it('hypertonia rule needs fever AND ocular or inducible clonus', () => {
    expect(hunter({ ...H, hypertonia: true, tempOver38: true }).met).toBe(false);
    expect(hunter({ ...H, hypertonia: true, ocularClonus: true }).met).toBe(false);
    expect(hunter({ ...H, hypertonia: true, tempOver38: true, ocularClonus: true }).met).toBe(true);
  });
  it('agitation + diaphoresis + fever without neuromuscular signs is not serotonin toxicity', () => {
    expect(hunter({ ...H, agitation: true, diaphoresis: true, tempOver38: true }).met).toBe(false);
  });
});

const C: CssrsInput = { wishDead: false, thoughts: false, method: undefined, intent: undefined, plan: undefined, behaviorEver: false, behaviorRecent: undefined };

describe('C-SSRS screener triage', () => {
  it('all no = negative and complete', () => {
    expect(cssrs(C)).toMatchObject({ level: 'none', complete: true });
  });
  it('Q1 only = low', () => expect(cssrs({ ...C, wishDead: true }).level).toBe('low'));
  it('Q2 requires Q3–5 for completeness', () => {
    expect(cssrs({ ...C, thoughts: true }).complete).toBe(false);
    expect(cssrs({ ...C, thoughts: true, method: false, intent: false, plan: false }).complete).toBe(true);
  });
  it('method without intent = moderate', () => expect(cssrs({ ...C, thoughts: true, method: true, intent: false, plan: false }).level).toBe('moderate'));
  it('intent = high', () => expect(cssrs({ ...C, thoughts: true, method: false, intent: true, plan: false }).level).toBe('high'));
  it('plan = high', () => expect(cssrs({ ...C, thoughts: true, method: true, intent: false, plan: true }).level).toBe('high'));
  it('behavior within 3 months = high even without ideation', () => expect(cssrs({ ...C, behaviorEver: true, behaviorRecent: true }).level).toBe('high'));
  it('remote behavior = moderate', () => expect(cssrs({ ...C, behaviorEver: true, behaviorRecent: false }).level).toBe('moderate'));
  it('ignores stale Q3–5 answers when Q2 is no', () => {
    expect(cssrs({ ...C, thoughts: false, intent: true, plan: true }).level).toBe('none');
  });
});

describe('ASQ', () => {
  it('negative only when all four are answered no', () => {
    expect(asq({ q1: false, q2: false, q3: false, q4: false, q5: undefined })).toBe('negative');
    expect(asq({ q1: false, q2: undefined, q3: false, q4: false, q5: undefined })).toBe('incomplete');
  });
  it('any yes without acuity answer is incomplete', () => expect(asq({ q1: true, q2: false, q3: false, q4: false, q5: undefined })).toBe('incomplete'));
  it('non-acute vs acute positive', () => {
    expect(asq({ q1: true, q2: false, q3: false, q4: false, q5: false })).toBe('non-acute positive');
    expect(asq({ q1: false, q2: false, q3: false, q4: true, q5: true })).toBe('acute positive');
  });
  it('declining to answer counts as positive', () => expect(asq({ q1: undefined, q2: undefined, q3: undefined, q4: undefined, q5: false, declined: true })).toBe('non-acute positive'));
});

describe('SAFE-T level is driven by ideation/intent/behavior, not factor counts', () => {
  const base = { modifiers: [], protective: [] };
  it('intent → high', () => expect(safetLevel({ ...base, ideation: 'intent', behavior: 'none' }).level).toBe('high'));
  it('preparatory behavior → high even when ideation denied', () => expect(safetLevel({ ...base, ideation: 'none', behavior: 'preparatory' }).level).toBe('high'));
  it('recent attempt + active ideation → high', () => expect(safetLevel({ ...base, ideation: 'active', behavior: 'recent' }).level).toBe('high'));
  it('plan without intent → moderate', () => expect(safetLevel({ ...base, ideation: 'plan', behavior: 'none' }).level).toBe('moderate'));
  it('recent attempt without current ideation → moderate', () => expect(safetLevel({ ...base, ideation: 'none', behavior: 'recent' }).level).toBe('moderate'));
  it('passive ideation → low', () => expect(safetLevel({ ...base, ideation: 'passive', behavior: 'remote' }).level).toBe('low'));
  it('modifiers never change the computed level (clinician decides)', () => {
    const many = Array.from({ length: 10 }, (_, i) => `m${i}`);
    expect(safetLevel({ ideation: 'passive', behavior: 'none', modifiers: many, protective: [] }).level).toBe('low');
  });
});

describe('EXTRIP lithium criteria (Decker 2015)', () => {
  const none = { impairedKidney: false, decreasedConsciousness: false, seizures: false, dysrhythmia: false, confusion: false, slowClearance: false };
  it('>4.0 with impaired kidneys → recommended; exactly 4.0 is not', () => {
    expect(extrip({ ...none, level: 4.1, impairedKidney: true }).verdict).toBe('recommended');
    expect(extrip({ ...none, level: 4.0, impairedKidney: true }).verdict).toBe('not indicated');
  });
  it('>4.0 with normal kidneys is not "recommended" (but >5.0 is suggested)', () => {
    expect(extrip({ ...none, level: 4.5 }).verdict).toBe('not indicated');
    expect(extrip({ ...none, level: 5.1 }).verdict).toBe('suggested');
    expect(extrip({ ...none, level: 5.0 }).verdict).toBe('not indicated');
  });
  it('decreased consciousness, seizures or dysrhythmia → recommended at any level', () => {
    expect(extrip({ ...none, level: 1.8, decreasedConsciousness: true }).verdict).toBe('recommended');
    expect(extrip({ ...none, seizures: true }).verdict).toBe('recommended');
    expect(extrip({ ...none, dysrhythmia: true }).verdict).toBe('recommended');
  });
  it('confusion or slow clearance → suggested', () => {
    expect(extrip({ ...none, level: 2.6, impairedKidney: true, confusion: true }).verdict).toBe('suggested');
    expect(extrip({ ...none, slowClearance: true }).verdict).toBe('suggested');
  });
  it('missing level is handled', () => expect(extrip({ ...none }).verdict).toBe('not indicated'));
});
