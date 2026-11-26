import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Lightbulb, Maximize2, Wrench } from 'lucide-react';
import type { Block } from '../content/types';
import { rich } from '../lib/rich';
import { toolById } from '../tools/registry';
import { Bullets, Callout, toneStyles } from './ui';

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'text':
      return <p className="leading-relaxed text-slate-700 dark:text-slate-300">{rich(block.text)}</p>;

    case 'list':
      return block.ordered ? (
        <ol className="list-decimal space-y-1.5 pl-5 text-slate-700 dark:text-slate-300">
          {block.items.map((item, i) => (
            <li key={i}>{rich(item)}</li>
          ))}
        </ol>
      ) : (
        <Bullets items={block.items} className="text-slate-700 dark:text-slate-300" />
      );

    case 'callout':
      return (
        <Callout tone={block.tone} title={block.title}>
          {block.text && <p>{rich(block.text)}</p>}
          {block.items && <Bullets items={block.items} className={block.text ? 'mt-2' : ''} />}
        </Callout>
      );

    case 'table': {
      const wide = block.headers.length > 3;
      return (
        <div>
          {wide && <p className="mb-1 text-xs muted sm:hidden">Swipe the table sideways →</p>}
          <figure className="overflow-x-auto rounded-xl border border-slate-200 dark:border-ink-700">
          {block.caption && <figcaption className="px-3 pt-2 text-xs font-semibold muted">{block.caption}</figcaption>}
          <table className={wide ? 'min-w-[760px]' : 'min-w-[560px]'}>
            <thead className="bg-slate-50 dark:bg-ink-850">
              <tr>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={`px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400 ${i === 0 ? 'sticky left-0 z-[1] bg-slate-50 dark:bg-ink-850' : ''}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-ink-700">
              {block.rows.map((row, r) => (
                <tr key={r} className="align-top">
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row" className="sticky left-0 z-[1] bg-white px-3 py-2 text-left font-semibold shadow-[1px_0_0_0_rgb(226_232_240)] dark:bg-ink-900 dark:shadow-[1px_0_0_0_#2a3757]">
                        {rich(cell)}
                      </th>
                    ) : (
                      <td key={c} className="px-3 py-2 text-slate-700 dark:text-slate-300">
                        {rich(cell)}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          </figure>
        </div>
      );
    }

    case 'cards':
      return (
        <div className={`grid gap-3 ${block.cards.length >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {block.cards.map((card, i) => {
            const s = toneStyles[card.tone ?? 'neutral'];
            return (
              <div key={i} className={`rounded-xl border p-4 ${s.box}`}>
                <h4 className={`mb-1.5 font-semibold ${s.title}`}>{card.title}</h4>
                <div className={`text-sm leading-relaxed ${s.text}`}>
                  {card.text && <p>{rich(card.text)}</p>}
                  {card.items && <Bullets items={card.items} className={card.text ? 'mt-2' : ''} />}
                </div>
              </div>
            );
          })}
        </div>
      );

    case 'steps':
      return (
        <ol className="relative space-y-3">
          {block.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white dark:bg-sky-500 dark:text-ink-950">
                {i + 1}
              </span>
              <div className="pt-0.5">
                <p className="font-semibold">{step.title}</p>
                {step.text && <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{rich(step.text)}</p>}
                {step.items && <Bullets items={step.items} className="mt-1 text-sm text-slate-700 dark:text-slate-300" />}
              </div>
            </li>
          ))}
        </ol>
      );

    case 'drugs':
      return (
        <figure className="space-y-2">
          {block.caption && <figcaption className="text-sm font-semibold">{block.caption}</figcaption>}
          <div className="grid gap-2">
            {block.rows.map((row) => (
              <div key={row.drug} className="grid gap-x-4 gap-y-0.5 rounded-xl border border-slate-200 p-3 text-sm dark:border-ink-700 sm:grid-cols-[10rem_1fr]">
                <div className="font-semibold text-sky-800 dark:text-sky-300">{row.drug}</div>
                <div>
                  <span className="font-medium">{row.dose}</span>
                  {row.onset && <span className="ml-2 text-xs muted">onset {row.onset}</span>}
                  <p className="text-slate-600 dark:text-slate-400">{rich(row.notes)}</p>
                </div>
              </div>
            ))}
          </div>
        </figure>
      );

    case 'tool': {
      const tool = toolById(block.tool);
      if (!tool) return null;
      return (
        <section className="rounded-2xl border-2 border-sky-200 bg-sky-50/40 p-4 dark:border-sky-500/30 dark:bg-sky-500/5 sm:p-5" aria-label={tool.name}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h4 className="flex items-center gap-2 font-bold">
              <Wrench size={18} className="text-sky-600 dark:text-sky-400" aria-hidden />
              {tool.name}
              <span className="text-sm font-normal muted">— {tool.purpose}</span>
            </h4>
            <Link to={`/tools/${tool.id}`} className="inline-flex items-center gap-1 text-xs font-medium text-sky-700 hover:underline dark:text-sky-300">
              <Maximize2 size={14} /> Open on its own
            </Link>
          </div>
          {tool.render()}
        </section>
      );
    }

    case 'reveal':
      return <Reveal prompt={block.prompt} answer={block.answer} />;
  }
}

function Reveal({ prompt, answer }: { prompt: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-violet-300 bg-violet-50 p-4 dark:border-violet-500/40 dark:bg-violet-500/10">
      <p className="mb-2 flex items-start gap-2 font-semibold text-violet-900 dark:text-violet-200">
        <Lightbulb size={18} className="mt-0.5 shrink-0" aria-hidden />
        <span>
          <span className="mr-1 text-xs font-bold uppercase tracking-wide">Think first</span> {prompt}
        </span>
      </p>
      {open ? (
        <p className="animate-fade-in pl-[26px] text-sm leading-relaxed text-violet-900/90 dark:text-violet-100/90">{rich(answer)}</p>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="ml-[26px] inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-violet-700">
          <Eye size={15} /> Commit to an answer, then reveal
        </button>
      )}
    </div>
  );
}
