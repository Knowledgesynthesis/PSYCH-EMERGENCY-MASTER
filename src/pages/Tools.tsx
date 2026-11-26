import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Wrench } from 'lucide-react';
import { TOOLS, toolById } from '../tools/registry';
import { MODULES, moduleById } from '../content/modules';
import { Page, PageHeader } from '../components/Layout';
import { MODULE_ICON } from '../components/moduleMeta';

export default function Tools() {
  const { toolId } = useParams();
  const tool = toolId ? toolById(toolId) : undefined;

  if (tool) {
    const mod = moduleById(tool.module);
    return (
      <Page>
        <Link to="/tools" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:underline dark:text-sky-300">
          <ArrowLeft size={15} /> All tools
        </Link>
        <PageHeader eyebrow="Bedside tool" title={tool.name}>
          {tool.purpose}
          {mod && (
            <>
              {' '}
              Background:{' '}
              <Link to={mod.path} className="font-semibold text-sky-700 hover:underline dark:text-sky-300">
                {mod.title}
              </Link>
              .
            </>
          )}
        </PageHeader>
        <div className="card">{tool.render()}</div>
      </Page>
    );
  }

  return (
    <Page wide>
      <PageHeader eyebrow="Reference" title="Bedside tools">
        Validated instruments and decision aids, scored exactly as published. Every one is also embedded in the module that teaches it.
      </PageHeader>
      <div className="space-y-6">
        {MODULES.filter((m) => TOOLS.some((t) => t.module === m.id)).map((m) => {
          const Icon = MODULE_ICON[m.id];
          return (
            <section key={m.id}>
              <h2 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider muted">
                <Icon size={16} aria-hidden /> {m.short}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {TOOLS.filter((t) => t.module === m.id).map((t) => (
                  <Link key={t.id} to={`/tools/${t.id}`} className="card group flex gap-3 !p-4 transition-shadow hover:shadow-md">
                    <Wrench size={18} className="mt-0.5 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden />
                    <span>
                      <span className="block font-bold group-hover:text-sky-700 dark:group-hover:text-sky-300">{t.name}</span>
                      <span className="text-sm muted">{t.purpose}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Page>
  );
}
