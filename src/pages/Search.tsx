import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, FileText, Layers, Search as SearchIcon, Wrench } from 'lucide-react';
import { MODULES } from '../content/modules';
import { GLOSSARY } from '../content/glossary';
import { TOOLS } from '../tools/registry';
import type { Block } from '../content/types';
import { plain } from '../lib/rich';
import { Page, PageHeader } from '../components/Layout';

interface Hit {
  kind: 'section' | 'tool' | 'term' | 'card';
  title: string;
  snippet: string;
  to: string;
  context: string;
}

function blockText(b: Block): string {
  switch (b.type) {
    case 'text':
      return b.text;
    case 'list':
      return b.items.join(' ');
    case 'callout':
      return [b.title, b.text ?? '', ...(b.items ?? [])].join(' ');
    case 'table':
      return [...b.headers, ...b.rows.flat()].join(' ');
    case 'cards':
      return b.cards.map((c) => [c.title, c.text ?? '', ...(c.items ?? [])].join(' ')).join(' ');
    case 'steps':
      return b.steps.map((s) => [s.title, s.text ?? '', ...(s.items ?? [])].join(' ')).join(' ');
    case 'drugs':
      return b.rows.map((r) => `${r.drug} ${r.dose} ${r.notes}`).join(' ');
    case 'reveal':
      return `${b.prompt} ${b.answer}`;
    case 'tool':
      return '';
  }
}

const INDEX: (Hit & { haystack: string })[] = [
  ...MODULES.flatMap((m) => [
    { kind: 'section' as const, title: m.title, snippet: m.tagline, to: m.path, context: 'Module', haystack: plain([m.title, m.tagline, ...m.bottomLine, ...m.objectives, ...m.pitfalls].join(' ')) },
    ...m.sections.map((s) => {
      const text = plain(s.blocks.map(blockText).join(' '));
      return { kind: 'section' as const, title: s.title, snippet: text, to: `${m.path}#${s.id}`, context: m.short, haystack: `${s.title} ${text}` };
    }),
    ...m.flashcards.map((c) => ({ kind: 'card' as const, title: c.front, snippet: c.back, to: `/flashcards?module=${m.id}`, context: m.short, haystack: `${c.front} ${c.back}` })),
  ]),
  ...TOOLS.map((t) => ({ kind: 'tool' as const, title: t.name, snippet: t.purpose, to: `/tools/${t.id}`, context: 'Tool', haystack: `${t.name} ${t.purpose}` })),
  ...GLOSSARY.map((g) => ({ kind: 'term' as const, title: g.term, snippet: g.definition, to: '/glossary', context: 'Glossary', haystack: `${g.term} ${g.definition}` })),
];

const ICONS = { section: FileText, tool: Wrench, term: BookOpen, card: Layers };

function excerpt(text: string, needle: string): string {
  const i = text.toLowerCase().indexOf(needle);
  if (i < 0 || text.length <= 160) return text.slice(0, 160) + (text.length > 160 ? '…' : '');
  const start = Math.max(0, i - 60);
  return (start > 0 ? '…' : '') + text.slice(start, start + 160) + '…';
}

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    if (!terms.length) return [];
    return INDEX.map((h) => {
      const hay = h.haystack.toLowerCase();
      if (!terms.every((t) => hay.includes(t))) return null;
      const score = terms.reduce((s, t) => s + (h.title.toLowerCase().includes(t) ? 5 : 0) + (hay.split(t).length - 1), 0);
      return { ...h, score, snippet: excerpt(plain(h.snippet), terms[0]) };
    })
      .filter((h): h is NonNullable<typeof h> => h !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40);
  }, [q]);

  return (
    <Page>
      <PageHeader eyebrow="Reference" title="Search" />
      <label className="relative mb-5 block">
        <span className="sr-only">Search everything</span>
        <SearchIcon size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
        <input
          autoFocus
          className="input !py-3 !pl-10 text-base"
          placeholder="e.g. droperidol, clonus, lithium dialysis, Tarasoff"
          value={q}
          onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
        />
      </label>
      {q && <p className="mb-3 text-sm muted">{results.length ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'No results.'}</p>}
      <ul className="space-y-2">
        {results.map((r, i) => {
          const Icon = ICONS[r.kind];
          return (
            <li key={i}>
              <Link to={r.to} className="card flex gap-3 !p-4 transition-shadow hover:shadow-md">
                <Icon size={18} className="mt-0.5 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden />
                <span className="min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-wide muted">{r.context}</span>
                  <span className="block font-semibold">{r.title}</span>
                  <span className="block text-sm muted">{r.snippet}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
