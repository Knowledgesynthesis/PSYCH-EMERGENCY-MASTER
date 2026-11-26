import type { ReactNode } from 'react';
import type { ToolId } from '../content/types';
import InstrumentTool from './InstrumentTool';
import { BFCSI, BROSET, CIWA, COWS, FOUR_AT, NMS, PAWSS } from './instrument';
import { AsqTool, CssrsTool, SafetTool, SafetyPlanTool } from './RiskTools';
import { AgitationTool, BarsTool, CapacityTool, ExtripTool, HunterTool, RedFlagsTool } from './ClinicalTools';

export interface ToolMeta {
  id: ToolId;
  name: string;
  purpose: string;
  module: string;
  render: () => ReactNode;
}

export const TOOLS: ToolMeta[] = [
  { id: 'red-flags', name: 'Medical red-flag screen', purpose: 'When must a medical cause be excluded first — and which tests?', module: 'approach', render: () => <RedFlagsTool /> },
  { id: 'agitation', name: 'Agitation regimen selector', purpose: 'Drug choice and doses by the likely driver of agitation.', module: 'agitation', render: () => <AgitationTool /> },
  { id: 'bars', name: 'BARS', purpose: 'Rate agitation/sedation and titrate to a calm, awake patient.', module: 'agitation', render: () => <BarsTool /> },
  { id: 'cssrs', name: 'C-SSRS screener', purpose: 'Columbia six-question suicide screen with triage level.', module: 'suicide', render: () => <CssrsTool /> },
  { id: 'asq', name: 'ASQ', purpose: 'NIMH youth suicide screen (ages 10–24).', module: 'suicide', render: () => <AsqTool /> },
  { id: 'safet', name: 'SAFE-T formulation', purpose: 'Build a risk formulation and plan — no factor counting.', module: 'suicide', render: () => <SafetTool /> },
  { id: 'safety-plan', name: 'Safety plan builder', purpose: 'Stanley–Brown six-step plan, printable.', module: 'suicide', render: () => <SafetyPlanTool /> },
  { id: 'broset', name: 'Brøset Violence Checklist', purpose: 'Six behaviors that predict violence in the next 24 h.', module: 'violence', render: () => <InstrumentTool def={BROSET} /> },
  { id: 'pawss', name: 'PAWSS', purpose: 'Who will develop seizures or DTs?', module: 'substances', render: () => <InstrumentTool def={PAWSS} /> },
  { id: 'ciwa', name: 'CIWA-Ar', purpose: 'Alcohol withdrawal severity for symptom-triggered dosing.', module: 'substances', render: () => <InstrumentTool def={CIWA} /> },
  { id: 'cows', name: 'COWS', purpose: 'Opioid withdrawal severity and buprenorphine timing.', module: 'substances', render: () => <InstrumentTool def={COWS} /> },
  { id: 'hunter', name: 'Hunter criteria', purpose: 'Serotonin toxicity decision rules.', module: 'ss-nms', render: () => <HunterTool /> },
  { id: 'nms', name: 'NMS consensus score', purpose: 'International expert criteria with validated cutoff.', module: 'ss-nms', render: () => <InstrumentTool def={NMS} /> },
  { id: 'bfcsi', name: 'Bush–Francis screen', purpose: '14-sign catatonia screen.', module: 'catatonia', render: () => <InstrumentTool def={BFCSI} /> },
  { id: 'four-at', name: '4AT', purpose: '2-minute delirium screen, no training needed.', module: 'delirium', render: () => <InstrumentTool def={FOUR_AT} /> },
  { id: 'extrip', name: 'Lithium: dialysis criteria', purpose: 'EXTRIP indications for extracorporeal removal.', module: 'toxicity', render: () => <ExtripTool /> },
  { id: 'capacity', name: 'Capacity assessment', purpose: 'Four abilities, sliding scale, note template.', module: 'capacity', render: () => <CapacityTool /> },
];

export const toolById = (id: string) => TOOLS.find((t) => t.id === id);
