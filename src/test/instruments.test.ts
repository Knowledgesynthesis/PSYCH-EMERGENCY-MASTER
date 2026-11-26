import { describe, expect, it } from 'vitest';
import { BFCSI, BROSET, CIWA, COWS, FOUR_AT, maxScore, NMS, PAWSS, scoreInstrument, type InstrumentDef } from '../tools/instrument';

const ALL: [InstrumentDef, number, number][] = [
  // [definition, published max, item count]
  [CIWA, 67, 10],
  [COWS, 48, 11],
  [PAWSS, 10, 10],
  [BROSET, 6, 6],
  [BFCSI, 14, 14],
  [FOUR_AT, 12, 4],
  [NMS, 100, 8],
];

describe.each(ALL)('$id instrument', (def, max, count) => {
  it('matches the published maximum and item count', () => {
    expect(maxScore(def)).toBe(max);
    expect(def.items).toHaveLength(count);
  });
  it('has unique item ids and unique option scores per item', () => {
    expect(new Set(def.items.map((i) => i.id)).size).toBe(def.items.length);
    for (const item of def.items) expect(new Set(item.options.map((o) => o.score)).size).toBe(item.options.length);
  });
  it('bands cover 0..max contiguously with no gaps or overlaps', () => {
    const sorted = [...def.bands].sort((a, b) => a.min - b.min);
    expect(sorted[0].min).toBe(0);
    expect(sorted[sorted.length - 1].max).toBeGreaterThanOrEqual(max);
    for (let i = 1; i < sorted.length; i++) expect(sorted[i].min).toBe(sorted[i - 1].max + 1);
  });
  it('every reachable score maps to exactly one band', () => {
    for (let s = 0; s <= max; s++) expect(def.bands.filter((b) => s >= b.min && s <= b.max)).toHaveLength(1);
  });
  it('reports completeness correctly', () => {
    const partial = scoreInstrument(def, { [def.items[0].id]: def.items[0].options[0].score });
    expect(partial.complete).toBe(def.items.length === 1);
    const full = scoreInstrument(def, Object.fromEntries(def.items.map((i) => [i.id, Math.max(...i.options.map((o) => o.score))])));
    expect(full.complete).toBe(true);
    expect(full.total).toBe(max);
  });
});

describe('published thresholds', () => {
  const band = (def: InstrumentDef, score: number) => def.bands.find((b) => score >= b.min && score <= b.max)!.label;
  it('CIWA-Ar: <10 mild, 10–18 moderate, ≥19 severe (ASAM 2020)', () => {
    expect(band(CIWA, 9)).toMatch(/Mild/);
    expect(band(CIWA, 10)).toMatch(/Moderate/);
    expect(band(CIWA, 18)).toMatch(/Moderate/);
    expect(band(CIWA, 19)).toMatch(/Severe/);
  });
  it('COWS: 5–12 mild, 13–24 moderate, 25–36 moderately severe, >36 severe', () => {
    expect(band(COWS, 5)).toMatch(/^Mild/);
    expect(band(COWS, 13)).toMatch(/^Moderate \(/);
    expect(band(COWS, 25)).toMatch(/Moderately severe/);
    expect(band(COWS, 37)).toMatch(/^Severe/);
  });
  it('PAWSS ≥4 = high risk', () => {
    expect(band(PAWSS, 3)).toMatch(/Low/);
    expect(band(PAWSS, 4)).toMatch(/High/);
  });
  it('Brøset: 0 small, 1–2 moderate, ≥3 very high', () => {
    expect(band(BROSET, 0)).toMatch(/Small/);
    expect(band(BROSET, 2)).toMatch(/Moderate/);
    expect(band(BROSET, 3)).toMatch(/Very high/);
  });
  it('BFCSI ≥2 = screen positive', () => {
    expect(band(BFCSI, 1)).toMatch(/negative/);
    expect(band(BFCSI, 2)).toMatch(/positive/);
  });
  it('4AT: 0 unlikely, 1–3 cognitive impairment, ≥4 possible delirium', () => {
    expect(band(FOUR_AT, 0)).toMatch(/unlikely/);
    expect(band(FOUR_AT, 3)).toMatch(/cognitive/);
    expect(band(FOUR_AT, 4)).toMatch(/delirium/);
  });
  it('NMS consensus: ≥74 consistent with NMS (Gurrera 2017)', () => {
    expect(band(NMS, 73)).toMatch(/Below/);
    expect(band(NMS, 74)).toMatch(/Consistent/);
  });
  it('NMS weights match the Delphi priority points', () => {
    const w = Object.fromEntries(NMS.items.map((i) => [i.id, i.options[1].score]));
    expect(w).toEqual({ exposure: 20, hyperthermia: 18, rigidity: 17, mental: 13, ck: 10, sns: 10, negative: 7, hypermetabolism: 5 });
  });
});
