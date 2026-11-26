import type { Module } from '../types';
import { approach } from './approach';
import { agitation } from './agitation';
import { suicide } from './suicide';
import { violence } from './violence';
import { substances } from './substances';
import { psychosis } from './psychosis';
import { mania } from './mania';
import { catatonia } from './catatonia';
import { ssnms } from './ssnms';
import { delirium } from './delirium';
import { toxicity } from './toxicity';
import { capacity } from './capacity';

/** Ordered as a learning path: framework first, then by frequency and lethality. */
export const MODULES: Module[] = [
  approach,
  agitation,
  suicide,
  violence,
  substances,
  delirium,
  psychosis,
  mania,
  catatonia,
  ssnms,
  toxicity,
  capacity,
];

export const moduleById = (id: string) => MODULES.find((m) => m.id === id);

export const LAST_REVIEWED = 'November 2026';
