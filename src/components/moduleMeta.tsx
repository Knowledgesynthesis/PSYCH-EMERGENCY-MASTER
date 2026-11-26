import {
  Activity,
  Brain,
  Compass,
  FlaskConical,
  LifeBuoy,
  PersonStanding,
  Pill,
  Scale,
  ShieldAlert,
  Thermometer,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export const MODULE_ICON: Record<string, LucideIcon> = {
  approach: Compass,
  agitation: Zap,
  suicide: LifeBuoy,
  violence: ShieldAlert,
  substances: Pill,
  delirium: Activity,
  psychosis: Brain,
  mania: TrendingUp,
  catatonia: PersonStanding,
  'ss-nms': Thermometer,
  toxicity: FlaskConical,
  capacity: Scale,
};

/** Accent gradient per module (decorative only; text never relies on it). */
export const MODULE_ACCENT: Record<string, string> = {
  approach: 'from-sky-500 to-indigo-500',
  agitation: 'from-orange-500 to-rose-500',
  suicide: 'from-rose-500 to-pink-500',
  violence: 'from-red-600 to-orange-500',
  substances: 'from-amber-500 to-yellow-500',
  delirium: 'from-cyan-500 to-sky-500',
  psychosis: 'from-violet-500 to-purple-500',
  mania: 'from-fuchsia-500 to-pink-500',
  catatonia: 'from-blue-500 to-indigo-500',
  'ss-nms': 'from-emerald-500 to-teal-500',
  toxicity: 'from-lime-500 to-emerald-500',
  capacity: 'from-indigo-500 to-violet-500',
};
