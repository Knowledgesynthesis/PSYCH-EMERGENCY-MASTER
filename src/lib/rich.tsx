import { Fragment, type ReactNode } from 'react';

/** Renders **bold** segments; everything else is plain text (no HTML injection). */
export function rich(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-slate-900 dark:text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Plain-text version for search indexing. */
export function plain(text: string): string {
  return text.replace(/\*\*/g, '');
}
