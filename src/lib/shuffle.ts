/** Fisher–Yates shuffle returning a new array. */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** A permutation of option indices, so the stored answer index stays valid. */
export function optionOrder(count: number, random: () => number = Math.random): number[] {
  return shuffle(
    Array.from({ length: count }, (_, i) => i),
    random,
  );
}
