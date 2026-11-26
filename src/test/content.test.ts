import { describe, expect, it } from 'vitest';
import { MODULES } from '../content/modules';
import { QUESTIONS } from '../content/questions';
import { CASES } from '../content/cases';
import { GLOSSARY } from '../content/glossary';
import { allCards } from '../content/flashcards';
import type { Block } from '../content/types';
import { TOOLS } from '../tools/registry';
import { BROSET, FOUR_AT, scoreInstrument } from '../tools/instrument';
import { cssrs, extrip } from '../tools/logic';
import { optionOrder } from '../lib/shuffle';

const moduleIds = new Set(MODULES.map((m) => m.id));

function allText(): string {
  const blocks = (b: Block): string => JSON.stringify(b);
  return [
    ...MODULES.flatMap((m) => [m.title, m.tagline, ...m.objectives, ...m.bottomLine, ...m.pitfalls, ...m.sections.flatMap((s) => s.blocks.map(blocks)), JSON.stringify(m.flashcards)]),
    JSON.stringify(QUESTIONS),
    JSON.stringify(CASES),
    JSON.stringify(GLOSSARY),
  ].join('\n');
}

describe('modules', () => {
  it('have unique ids and paths', () => {
    expect(moduleIds.size).toBe(MODULES.length);
    expect(new Set(MODULES.map((m) => m.path)).size).toBe(MODULES.length);
  });

  it.each(MODULES.map((m) => [m.id, m] as const))('%s is complete', (_, m) => {
    expect(m.objectives.length).toBeGreaterThanOrEqual(3);
    expect(m.bottomLine.length).toBeGreaterThanOrEqual(4);
    expect(m.sections.length).toBeGreaterThanOrEqual(3);
    expect(m.pitfalls.length).toBeGreaterThanOrEqual(4);
    expect(m.flashcards.length).toBeGreaterThanOrEqual(6);
    expect(m.references.length).toBeGreaterThanOrEqual(4);
    expect(new Set(m.sections.map((s) => s.id)).size).toBe(m.sections.length);
    for (const s of m.sections) expect(s.blocks.length).toBeGreaterThan(0);
    for (const r of m.references) expect(r.url).toMatch(/^https:\/\//);
  });

  it('embed only tools that exist, and every tool is embedded somewhere', () => {
    const toolIds = new Set(TOOLS.map((t) => t.id));
    const embedded = new Set<string>();
    for (const m of MODULES) for (const s of m.sections) for (const b of s.blocks) if (b.type === 'tool') {
      expect(toolIds.has(b.tool)).toBe(true);
      embedded.add(b.tool);
    }
    expect([...toolIds].filter((t) => !embedded.has(t))).toEqual([]);
  });

  it('tools point at existing modules', () => {
    for (const t of TOOLS) expect(moduleIds.has(t.module)).toBe(true);
  });

  it('balanced emphasis markers in all rich text', () => {
    for (const m of MODULES) {
      const strings = [...m.bottomLine, ...m.pitfalls, ...m.sections.flatMap((s) => s.blocks.flatMap((b) => JSON.stringify(b).match(/"(?:[^"\\]|\\.)*"/g) ?? []))];
      for (const str of strings) expect((str.match(/\*\*/g) ?? []).length % 2, `${m.id}: ${str}`).toBe(0);
    }
  });
});

describe('question bank', () => {
  it('has unique ids', () => expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length));

  it.each(QUESTIONS.map((q) => [q.id, q] as const))('%s is well-formed', (_, q) => {
    expect(moduleIds.has(q.module)).toBe(true);
    expect(q.options.length).toBeGreaterThanOrEqual(3);
    expect(q.answer).toBeGreaterThanOrEqual(0);
    expect(q.answer).toBeLessThan(q.options.length);
    expect(new Set(q.options).size).toBe(q.options.length);
    expect(q.explanation.length).toBeGreaterThan(40);
    // Options are shuffled at display time, so positional answers would break.
    for (const o of q.options) expect(o).not.toMatch(/(all|none|both) of the above/i);
  });

  it('covers every module with at least 6 questions', () => {
    for (const m of MODULES) expect(QUESTIONS.filter((q) => q.module === m.id).length, m.id).toBeGreaterThanOrEqual(6);
  });

  it('display shuffling is a true permutation, so authored answer position is never revealed', () => {
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const seenFirst = new Set<number>();
    for (let i = 0; i < 200; i++) {
      const order = optionOrder(4, rand);
      expect([...order].sort()).toEqual([0, 1, 2, 3]);
      seenFirst.add(order[0]);
    }
    expect(seenFirst.size).toBe(4);
  });
});

describe('cases', () => {
  it('have unique ids and valid modules', () => {
    expect(new Set(CASES.map((c) => c.id)).size).toBe(CASES.length);
    for (const c of CASES) expect(moduleIds.has(c.module)).toBe(true);
  });
  it.each(CASES.map((c) => [c.id, c] as const))('%s: every step has exactly one correct option and feedback for all', (_, c) => {
    expect(c.steps.length).toBeGreaterThanOrEqual(3);
    expect(c.debrief.length).toBeGreaterThanOrEqual(3);
    for (const s of c.steps) {
      expect(s.options.length).toBeGreaterThanOrEqual(3);
      expect(s.options.filter((o) => o.correct)).toHaveLength(1);
      for (const o of s.options) expect(o.feedback.length).toBeGreaterThan(10);
    }
  });
});

describe('glossary & flashcards', () => {
  it('glossary terms are unique and linked to real modules', () => {
    expect(new Set(GLOSSARY.map((g) => g.term.toLowerCase())).size).toBe(GLOSSARY.length);
    for (const g of GLOSSARY) if (g.module) expect(moduleIds.has(g.module)).toBe(true);
  });
  it('flashcard ids are unique', () => {
    const ids = allCards().map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('cross-checks: content agrees with the scoring engines', () => {
  const q = (id: string) => QUESTIONS.find((x) => x.id === id)!;

  it('suicide-2 (C-SSRS Q1–3 yes) answer matches the triage engine', () => {
    const r = cssrs({ wishDead: true, thoughts: true, method: true, intent: false, plan: false, behaviorEver: false, behaviorRecent: undefined });
    expect(q('suicide-2').options[q('suicide-2').answer].toLowerCase()).toBe(r.level);
  });

  it('suicide-3 (behavior 2 months ago) matches the triage engine', () => {
    const r = cssrs({ wishDead: false, thoughts: false, method: undefined, intent: undefined, plan: undefined, behaviorEver: true, behaviorRecent: true });
    expect(q('suicide-3').options[q('suicide-3').answer].toLowerCase()).toBe(r.level);
  });

  it('delirium-2 (4AT = 0+2+1+4) matches the instrument', () => {
    const r = scoreInstrument(FOUR_AT, { alertness: 0, amt4: 2, attention: 1, acute: 4 });
    expect(r.total).toBe(7);
    expect(r.band?.label).toMatch(/Possible delirium/);
    expect(q('delirium-2').options[q('delirium-2').answer]).toMatch(/Score 7 — possible delirium/);
  });

  it('violence-3 (irritable + boisterous + verbal threats) matches Brøset', () => {
    const r = scoreInstrument(BROSET, { confused: 0, irritable: 1, boisterous: 1, verbal: 1, physical: 0, objects: 0 });
    expect(r.total).toBe(3);
    expect(q('violence-3').options[q('violence-3').answer]).toMatch(/^3/);
  });

  it('toxicity-1 and the lithium case agree with EXTRIP', () => {
    const r = extrip({ level: 2.6, impairedKidney: true, decreasedConsciousness: false, seizures: false, dysrhythmia: false, confusion: true, slowClearance: false });
    expect(r.verdict).toBe('suggested');
    expect(q('toxicity-1').options[q('toxicity-1').answer].toLowerCase()).toMatch(/^suggested/);
    const lithiumCase = CASES.find((c) => c.id === 'lithium-case')!;
    expect(lithiumCase.steps[2].options.find((o) => o.correct)!.text.toLowerCase()).toBe('suggested');
  });
});

describe('outdated or unsafe phrasing is gone', () => {
  const text = allText();
  it.each([
    [/National Suicide Prevention Lifeline/i, 'renamed 988 Suicide & Crisis Lifeline in 2022'],
    [/Text "?HELLO"? to 741741/i, 'Crisis Text Line uses HOME'],
    [/able to contract for safety/i, 'no-suicide contracts have no evidence'],
    [/educational purposes only/i, 'disclaimers reduced to a single footer line'],
    [/(?<!no )X-waiver (is )?required/i, 'X-waiver eliminated 2023'],
    [/thiamine before glucose/i, 'never delay glucose for thiamine'],
  ])('%s is absent (%s)', (pattern) => {
    expect(text).not.toMatch(pattern);
  });

  it('“mixed episode” appears only when teaching the DSM-5 change (or as the wrong distractor)', () => {
    const hits = [...text.matchAll(/mixed episode/gi)].map((m) => text.slice(Math.max(0, m.index! - 60), m.index! + 60));
    expect(hits.length).toBeGreaterThan(0);
    for (const h of hits) expect(h, h).toMatch(/replace|DSM-IV|low suicide risk|label wording/i);
  });
});
