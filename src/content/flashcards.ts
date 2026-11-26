import { MODULES } from './modules';

export interface DeckCard {
  id: string;
  module: string;
  front: string;
  back: string;
}

let cache: DeckCard[] | null = null;

/** Stable ids (`module:index`) so spaced-repetition history survives content edits that append cards. */
export function allCards(): DeckCard[] {
  cache ??= MODULES.flatMap((m) => m.flashcards.map((c, i) => ({ id: `${m.id}:${i}`, module: m.id, ...c })));
  return cache;
}
