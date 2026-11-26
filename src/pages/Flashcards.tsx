import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, RotateCcw, Repeat } from 'lucide-react';
import { MODULES } from '../content/modules';
import { allCards, type DeckCard } from '../content/flashcards';
import { Page, PageHeader } from '../components/Layout';
import { useProgress } from '../lib/progress';
import { CARD_INTERVAL_DAYS } from '../lib/progress-core';
import { shuffle } from '../lib/shuffle';

export default function Flashcards() {
  const { state } = useProgress();
  const [params, setParams] = useSearchParams();
  const moduleFilter = params.get('module') ?? 'all';
  const [includeAll, setIncludeAll] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  const cards = allCards().filter((c) => moduleFilter === 'all' || c.module === moduleFilter);
  const now = Date.now();
  const dueCards = cards.filter((c) => (state.cards[c.id]?.due ?? 0) <= now);
  const learned = cards.filter((c) => (state.cards[c.id]?.box ?? 0) >= 3).length;

  return (
    <Page>
      <PageHeader eyebrow="Practice" title="Flashcards">
        Spaced repetition (Leitner): cards you know return after 1, 3, 7, 16, then 35 days; cards you miss return in this session.
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select
          className="input !w-auto"
          value={moduleFilter}
          onChange={(e) => setParams(e.target.value === 'all' ? {} : { module: e.target.value })}
          aria-label="Filter by module"
        >
          <option value="all">All modules ({allCards().length})</option>
          {MODULES.map((m) => (
            <option key={m.id} value={m.id}>
              {m.short} ({m.flashcards.length})
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="h-4 w-4 accent-sky-600" checked={includeAll} onChange={(e) => setIncludeAll(e.target.checked)} />
          Include cards not yet due
        </label>
        <span className="text-sm muted sm:ml-auto">
          {dueCards.length} due · {learned}/{cards.length} learned
        </span>
      </div>

      <Session
        key={`${moduleFilter}|${includeAll}|${sessionKey}`}
        deck={includeAll ? cards : dueCards}
        total={cards.length}
        onReviewAll={() => {
          setIncludeAll(true);
          setSessionKey((k) => k + 1);
        }}
      />
    </Page>
  );
}

/** Queue is frozen when the session starts; “Again” sends the card to the back. */
function Session({ deck, total, onReviewAll }: { deck: DeckCard[]; total: number; onReviewAll: () => void }) {
  const { state, review } = useProgress();
  const [queue, setQueue] = useState<DeckCard[]>(() => shuffle(deck));
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const current = queue[0];

  const grade = (knew: boolean) => {
    review(current.id, knew);
    setReviewed((r) => r + 1);
    setFlipped(false);
    setQueue((q) => (knew ? q.slice(1) : [...q.slice(1), q[0]]));
  };

  if (!current) {
    return (
      <div className="card text-center">
        <p className="text-lg font-bold">{reviewed > 0 ? 'Session complete.' : 'Nothing due right now.'}</p>
        <p className="mt-1 text-sm muted">Come back later, or review cards that aren’t due yet.</p>
        <button type="button" className="btn-primary mt-4" onClick={onReviewAll}>
          <RotateCcw size={16} /> Review all {total}
        </button>
      </div>
    );
  }

  const box = state.cards[current.id]?.box ?? 0;
  const nextDays = CARD_INTERVAL_DAYS[Math.min(box + 1, CARD_INTERVAL_DAYS.length - 1)];

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="card flex min-h-[240px] w-full flex-col items-center justify-center text-center transition-shadow hover:shadow-md"
        aria-label={`Flashcard: ${flipped ? current.back : current.front}. Tap to flip.`}
      >
        <span className="mb-3 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          {MODULES.find((m) => m.id === current.module)?.short} · {flipped ? 'Answer' : 'Question'}
        </span>
        <span className={`max-w-2xl text-lg leading-relaxed sm:text-xl ${flipped ? '' : 'font-semibold'}`}>{flipped ? current.back : current.front}</span>
        {!flipped && <span className="mt-4 text-xs muted">Recall the answer, then tap to check</span>}
      </button>
      {flipped ? (
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="btn border-2 border-rose-300 bg-rose-50 text-rose-800 hover:bg-rose-100 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200"
            onClick={() => grade(false)}
          >
            <Repeat size={16} /> Again
          </button>
          <button
            type="button"
            className="btn border-2 border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200"
            onClick={() => grade(true)}
          >
            <Check size={16} /> Knew it · {nextDays} d
          </button>
        </div>
      ) : (
        <button type="button" className="btn-primary w-full" onClick={() => setFlipped(true)}>
          Show answer
        </button>
      )}
      <p className="text-center text-xs muted">
        {queue.length} left · {reviewed} reviewed this session
      </p>
    </div>
  );
}
