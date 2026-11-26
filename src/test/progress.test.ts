import { describe, expect, it } from 'vitest';
import { CARD_INTERVAL_DAYS, emptyProgress, markModule, moduleMastery, recordAnswer, recordCase, reviewCard, sanitize } from '../lib/progress-core';

describe('progress model', () => {
  it('sanitizes corrupt or foreign storage', () => {
    expect(sanitize(null)).toEqual(emptyProgress());
    expect(sanitize('garbage')).toEqual(emptyProgress());
    expect(sanitize({ version: 1, questions: { a: 1 } })).toEqual(emptyProgress());
    expect(sanitize({ version: 2, questions: [], modules: 'x' })).toEqual(emptyProgress());
  });

  it('records attempts and keeps the latest result', () => {
    let s = recordAnswer(emptyProgress(), 'q1', false, 1);
    s = recordAnswer(s, 'q1', true, 2);
    expect(s.questions.q1).toEqual({ attempts: 2, correct: 1, last: true, at: 2 });
  });

  it('mastery requires every question attempted and ≥80% latest-correct', () => {
    const ids = ['a', 'b', 'c', 'd', 'e'];
    let s = emptyProgress();
    expect(moduleMastery(s, ids).status).toBe('new');
    for (const id of ['a', 'b', 'c', 'd']) s = recordAnswer(s, id, true);
    expect(moduleMastery(s, ids).status).toBe('learning'); // 4/5 attempted
    s = recordAnswer(s, 'e', false);
    const m = moduleMastery(s, ids);
    expect(m.score).toBeCloseTo(0.8);
    expect(m.status).toBe('mastered');
    s = recordAnswer(s, 'a', false);
    expect(moduleMastery(s, ids).status).toBe('learning');
  });

  it('handles modules with no questions', () => {
    expect(moduleMastery(emptyProgress(), [])).toMatchObject({ score: 0, status: 'new' });
  });

  it('keeps the best case score', () => {
    let s = recordCase(emptyProgress(), 'c1', 3, 4);
    s = recordCase(s, 'c1', 1, 4);
    expect(s.cases.c1.best).toBe(3);
  });

  it('toggles module completion without losing the first timestamp', () => {
    let s = markModule(emptyProgress(), 'm', 'completed', true, 10);
    s = markModule(s, 'm', 'completed', true, 20);
    expect(s.modules.m.completed).toBe(10);
    s = markModule(s, 'm', 'completed', false);
    expect(s.modules.m.completed).toBeUndefined();
  });

  it('Leitner scheduling: promotes on success, resets on failure, caps at last box', () => {
    const DAY = 86_400_000;
    let s = reviewCard(emptyProgress(), 'x', true, 0);
    expect(s.cards.x).toEqual({ box: 1, due: CARD_INTERVAL_DAYS[1] * DAY });
    for (let i = 0; i < 10; i++) s = reviewCard(s, 'x', true, 0);
    expect(s.cards.x.box).toBe(CARD_INTERVAL_DAYS.length - 1);
    s = reviewCard(s, 'x', false, 5);
    expect(s.cards.x).toEqual({ box: 0, due: 5 });
  });
});
