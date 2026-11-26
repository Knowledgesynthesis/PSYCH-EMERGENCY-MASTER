import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { GLOSSARY } from '../content/glossary';
import { MODULES, moduleById } from '../content/modules';
import { Page, PageHeader } from '../components/Layout';

export default function Glossary() {
  const [q, setQ] = useState('');
  const [mod, setMod] = useState('all');

  const terms = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return GLOSSARY.filter((t) => (mod === 'all' || t.module === mod) && (!needle || `${t.term} ${t.definition}`.toLowerCase().includes(needle))).sort((a, b) =>
      a.term.replace(/[^a-z0-9]/gi, '').localeCompare(b.term.replace(/[^a-z0-9]/gi, ''), undefined, { sensitivity: 'base' }),
    );
  }, [q, mod]);

  return (
    <Page>
      <PageHeader eyebrow="Reference" title="Glossary">
        {GLOSSARY.length} terms, each linked to the module that teaches it.
      </PageHeader>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search terms</span>
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
          <input className="input !pl-10" placeholder="Search terms or definitions…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <select className="input sm:!w-56" value={mod} onChange={(e) => setMod(e.target.value)} aria-label="Filter by module">
          <option value="all">All modules</option>
          {MODULES.map((m) => (
            <option key={m.id} value={m.id}>
              {m.short}
            </option>
          ))}
        </select>
      </div>
      <p className="mb-3 text-sm muted">
        {terms.length} of {GLOSSARY.length}
      </p>
      {terms.length ? (
        <dl className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-ink-700 dark:border-ink-700 dark:bg-ink-900">
          {terms.map((t) => {
            const m = t.module ? moduleById(t.module) : undefined;
            return (
              <div key={t.term} className="px-4 py-3 sm:grid sm:grid-cols-[14rem_1fr] sm:gap-4">
                <dt className="font-semibold text-sky-800 dark:text-sky-300">{t.term}</dt>
                <dd className="text-sm text-slate-700 dark:text-slate-300">
                  {t.definition}
                  {m && (
                    <Link to={m.path} className="ml-2 whitespace-nowrap text-xs font-semibold text-sky-700 hover:underline dark:text-sky-300">
                      {m.short} →
                    </Link>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      ) : (
        <p className="card text-center muted">No matching terms.</p>
      )}
    </Page>
  );
}
