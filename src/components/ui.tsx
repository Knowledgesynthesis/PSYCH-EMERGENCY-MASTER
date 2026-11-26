import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, OctagonAlert, CircleDot } from 'lucide-react';
import type { Tone } from '../content/types';
import { rich } from '../lib/rich';

export const toneStyles: Record<Tone, { box: string; title: string; text: string; chip: string; bar: string }> = {
  danger: {
    box: 'border-rose-300 bg-rose-50 dark:border-rose-500/40 dark:bg-rose-500/10',
    title: 'text-rose-900 dark:text-rose-200',
    text: 'text-rose-900/90 dark:text-rose-100/90',
    chip: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-200',
    bar: 'bg-rose-500',
  },
  warning: {
    box: 'border-amber-300 bg-amber-50 dark:border-amber-500/40 dark:bg-amber-500/10',
    title: 'text-amber-900 dark:text-amber-200',
    text: 'text-amber-900/90 dark:text-amber-100/90',
    chip: 'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200',
    bar: 'bg-amber-500',
  },
  info: {
    box: 'border-sky-300 bg-sky-50 dark:border-sky-500/40 dark:bg-sky-500/10',
    title: 'text-sky-900 dark:text-sky-200',
    text: 'text-sky-900/90 dark:text-sky-100/90',
    chip: 'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-200',
    bar: 'bg-sky-500',
  },
  success: {
    box: 'border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10',
    title: 'text-emerald-900 dark:text-emerald-200',
    text: 'text-emerald-900/90 dark:text-emerald-100/90',
    chip: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-200',
    bar: 'bg-emerald-500',
  },
  neutral: {
    box: 'border-slate-200 bg-slate-50 dark:border-ink-700 dark:bg-ink-850',
    title: 'text-slate-900 dark:text-slate-100',
    text: 'text-slate-700 dark:text-slate-300',
    chip: 'bg-slate-200 text-slate-800 dark:bg-ink-700 dark:text-slate-200',
    bar: 'bg-slate-400',
  },
};

const toneIcon: Record<Tone, typeof Info> = {
  danger: OctagonAlert,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2,
  neutral: CircleDot,
};

export function Callout({
  tone,
  title,
  children,
  className = '',
}: {
  tone: Tone;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const s = toneStyles[tone];
  const Icon = toneIcon[tone];
  return (
    <div className={`rounded-xl border p-4 ${s.box} ${className}`}>
      {title && (
        <p className={`mb-1 flex items-start gap-2 font-semibold ${s.title}`}>
          <Icon size={18} className="mt-0.5 shrink-0" aria-hidden />
          <span>{title}</span>
        </p>
      )}
      <div className={`text-sm leading-relaxed ${s.text} ${title ? 'pl-[26px]' : ''}`}>{children}</div>
    </div>
  );
}

export function Bullets({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-1.5 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />
          <span>{rich(item)}</span>
        </li>
      ))}
    </ul>
  );
}

export function Chip({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`chip ${toneStyles[tone].chip}`}>{children}</span>;
}

/** Accessible yes/no segmented control. */
export function YesNoToggle({
  value,
  onChange,
  labels = ['No', 'Yes'],
}: {
  value: boolean | undefined;
  onChange: (v: boolean) => void;
  labels?: [string, string];
}) {
  return (
    <div className="inline-flex shrink-0 overflow-hidden rounded-lg border border-slate-300 dark:border-ink-700" role="group">
      {[false, true].map((v) => {
        const on = value === v;
        return (
          <button
            key={String(v)}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(v)}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              on
                ? v
                  ? 'bg-rose-600 text-white dark:bg-rose-500'
                  : 'bg-slate-700 text-white dark:bg-slate-300 dark:text-ink-950'
                : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-ink-850 dark:text-slate-300 dark:hover:bg-ink-800'
            }`}
          >
            {v ? labels[1] : labels[0]}
          </button>
        );
      })}
    </div>
  );
}

export function Check({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
        checked
          ? 'border-sky-500 bg-sky-50 dark:border-sky-400 dark:bg-sky-500/10'
          : 'border-slate-200 bg-white hover:border-slate-300 dark:border-ink-700 dark:bg-ink-850 dark:hover:border-ink-700'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-sky-600"
      />
      <span>{children}</span>
    </label>
  );
}

export function ProgressRing({ value, size = 44, label }: { value: number; size?: number; label?: string }) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label ?? `${Math.round(pct * 100)}%`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={5} className="stroke-slate-200 dark:stroke-ink-700" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className={pct >= 0.8 ? 'stroke-emerald-500' : 'stroke-sky-500'}
      />
      <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" className="fill-current text-[11px] font-semibold">
        {Math.round(pct * 100)}
      </text>
    </svg>
  );
}

export function ResultPanel({
  tone,
  heading,
  children,
}: {
  tone: Tone;
  heading: ReactNode;
  children?: ReactNode;
}) {
  const s = toneStyles[tone];
  return (
    <div className={`animate-fade-in rounded-xl border-2 p-4 ${s.box}`} aria-live="polite">
      <div className={`text-base font-bold ${s.title}`}>{heading}</div>
      {children && <div className={`mt-1.5 text-sm leading-relaxed ${s.text}`}>{children}</div>}
    </div>
  );
}
