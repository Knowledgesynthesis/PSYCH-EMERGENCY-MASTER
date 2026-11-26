import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BookOpen, ClipboardCheck, Home, Info, Layers, Menu, Moon, Search, Stethoscope, Sun, Wrench, X, CheckCircle2 } from 'lucide-react';
import { MODULES } from '../content/modules';
import { MODULE_ICON } from './moduleMeta';
import { useTheme } from '../lib/theme';
import { useProgress } from '../lib/progress';

const PRACTICE = [
  { to: '/cases', label: 'Cases', icon: Stethoscope },
  { to: '/quiz', label: 'Question bank', icon: ClipboardCheck },
  { to: '/flashcards', label: 'Flashcards', icon: Layers },
];
const REFERENCE = [
  { to: '/tools', label: 'Bedside tools', icon: Wrench },
  { to: '/glossary', label: 'Glossary', icon: BookOpen },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/about', label: 'About & settings', icon: Info },
];

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const { state } = useProgress();
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
      isActive
        ? 'bg-sky-100 font-semibold text-sky-900 dark:bg-sky-500/15 dark:text-sky-200'
        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-ink-850'
    }`;
  return (
    <nav className="space-y-6" aria-label="Main">
      <div>
        <NavLink to="/" end className={linkCls} onClick={onNavigate}>
          <Home size={18} aria-hidden /> Home
        </NavLink>
      </div>
      <div>
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Learning path</p>
        <ul className="space-y-0.5">
          {MODULES.map((m, i) => {
            const Icon = MODULE_ICON[m.id];
            const done = !!state.modules[m.id]?.completed;
            return (
              <li key={m.id}>
                <NavLink to={m.path} className={linkCls} onClick={onNavigate}>
                  <span className="w-4 text-right text-xs tabular-nums text-slate-400">{i + 1}</span>
                  <Icon size={16} aria-hidden />
                  <span className="flex-1 truncate">{m.short}</span>
                  {done && <CheckCircle2 size={15} className="text-emerald-500" aria-label="completed" />}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Practice</p>
        {PRACTICE.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={linkCls} onClick={onNavigate}>
            <Icon size={18} aria-hidden /> {label}
          </NavLink>
        ))}
      </div>
      <div>
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Reference</p>
        {REFERENCE.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={linkCls} onClick={onNavigate}>
            <Icon size={18} aria-hidden /> {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-ink-850"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Psych Emergency Master — home">
      <img src="/favicon.svg" alt="" width={30} height={30} className="rounded-lg" />
      <span className="leading-tight">
        <span className="block text-[15px] font-extrabold tracking-tight">Psych Emergency</span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">Master</span>
      </span>
    </Link>
  );
}

const MOBILE_TABS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/cases', label: 'Cases', icon: Stethoscope },
  { to: '/quiz', label: 'Quiz', icon: ClipboardCheck },
  { to: '/flashcards', label: 'Cards', icon: Layers },
  { to: '/tools', label: 'Tools', icon: Wrench },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setOpen(false);
    if (!hash) window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:shadow dark:focus:bg-ink-900">
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-slate-200 bg-white dark:border-ink-800 dark:bg-ink-900 lg:flex">
        <div className="flex items-center justify-between px-5 py-5">
          <Brand />
          <ThemeButton />
        </div>
        <div className="flex-1 overflow-y-auto px-3 pb-6">
          <NavContent />
        </div>
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-2.5 backdrop-blur dark:border-ink-800 dark:bg-ink-950/90 lg:hidden">
        <Brand />
        <div className="flex items-center gap-1">
          <Link to="/search" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-ink-850" aria-label="Search">
            <Search size={20} />
          </Link>
          <ThemeButton />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-ink-850"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 top-[57px] z-30 overflow-y-auto bg-white px-3 py-4 dark:bg-ink-950 lg:hidden">
          <NavContent onNavigate={() => setOpen(false)} />
        </div>
      )}

      <main id="main" className="pb-24 lg:ml-72 lg:pb-10">
        {children}
        <footer className="mx-auto mt-12 max-w-5xl border-t border-slate-200 px-4 pt-6 text-xs text-slate-500 dark:border-ink-800 sm:px-6">
          <p>
            For clinician education. Verify doses against local formularies and follow local law and protocol.{' '}
            <span className="whitespace-nowrap">In crisis in the US: call or text 988.</span>
          </p>
        </footer>
      </main>

      {/* Mobile tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur dark:border-ink-800 dark:bg-ink-950/95 lg:hidden" aria-label="Quick">
        {MOBILE_TABS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${isActive ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400'}`
            }
          >
            <Icon size={20} aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export function Page({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <div className={`mx-auto px-4 py-6 sm:px-6 sm:py-8 ${wide ? 'max-w-6xl' : 'max-w-5xl'}`}>{children}</div>;
}

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  useEffect(() => {
    document.title = `${title} · Psych Emergency Master`;
  }, [title]);
  return (
    <header className="mb-6">
      {eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">{eyebrow}</p>}
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
      {children && <div className="mt-2 max-w-3xl text-slate-600 dark:text-slate-400">{children}</div>}
    </header>
  );
}
