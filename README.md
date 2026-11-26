# Psych Emergency Master

Evidence-based, interactive training in psychiatric emergencies for medical students, residents and frontline clinicians.

**Live:** https://psych-emergency-master.vercel.app · Works offline and installs as an app (PWA). Evidence reviewed **November 2026**.

## What's inside

| | |
|---|---|
| **12 modules** (learning path) | Emergency approach & medical assessment · Agitation & rapid tranquilization · Suicide risk · Violence risk & duty to protect · Intoxication & withdrawal · Delirium · Psychosis · Severe mania & postpartum psychosis · Catatonia & severe depression · Serotonin syndrome vs NMS · Psychotropic toxicity · Capacity & disposition |
| **17 bedside instruments** | Medical red-flag screen, agitation regimen selector, BARS, C-SSRS screener, ASQ, SAFE-T formulation, Stanley–Brown safety plan, Brøset, PAWSS, CIWA-Ar, COWS, Hunter criteria, NMS consensus score, Bush–Francis screen, 4AT, EXTRIP lithium, capacity assessment |
| **11 decision cases** | Evolving vignettes with consequences at every step, first-attempt scoring and a debrief |
| **96-question bank** | Practice (immediate feedback) or exam mode, filter by module, unseen/missed review loops, option order shuffled per attempt |
| **92 spaced-repetition flashcards** | Leitner scheduling (1/3/7/16/35 days) |
| **Glossary & search** | 80 linked terms; full-text search across modules, tools, cards and glossary |

Each module follows the same learning design: objectives → 60-second bottom line → teaching sections with embedded instruments and "think first" active-recall prompts → pitfalls that harm patients → knowledge check → key evidence with links. Mastery is earned: a module is *mastered* when every question has been attempted and ≥80% of latest answers are correct. Progress is stored only in the browser.

## Evidence base

Content is aligned with current guidance and the trials behind it, including: ACEP clinical policies (2017 psychiatric patient; 2024 severe agitation), ACEP 2023 policy statement on medical screening, Project BETA, APA delirium guideline (2025), SCCM PADIS focused update (2025), ASAM alcohol withdrawal (2020), Joint Benzodiazepine Tapering Guideline (2025), BAP catatonia guideline (2023), NICE NG225 (2022), VA/DoD suicide CPG (2024), CANMAT/ISBD, EXTRIP, CMS restraint rules (42 CFR 482.13), and FDA/CDC communications through 2026 (clozapine REMS removal, medetomidine, Igalmi at-home approval, milsaperidone). Every module lists its sources.

## Development

Requires Node ≥ 20.19.

```bash
npm ci
npm run dev        # http://localhost:3000
npm test           # 223 tests: scoring rules, content integrity, progress model
npm run build      # type-check + production build (dist/) with service worker
npm run preview
```

`npm run icons` regenerates the PWA icons from `public/favicon.svg` (needs Playwright with Chromium installed).

### Architecture

```
src/
  content/          Typed clinical content (single source of truth)
    modules/        One file per module: sections built from blocks
    questions.ts    Question bank          cases.ts     Decision cases
    glossary.ts     Glossary               flashcards.ts  Deck builder
  tools/            Instruments: pure scoring (instrument.ts, logic.ts) + UI
  components/       Layout, block renderer, quiz runner, UI primitives
  pages/            Routes (lazy-loaded)
  lib/              Progress model (pure + React context), theme, storage
  test/             Vitest suites
```

Content is data, rendered by one block engine, so adding a section, table, drug list, tool or recall prompt needs no new UI code. Scoring logic is React-free and unit-tested against the published rules; content tests enforce structure and cross-check worked examples in questions and cases against the scoring engines.

### Deployment

Vercel builds `main` automatically (`vercel.json`: Vite framework, SPA rewrites so deep links work, immutable caching for hashed assets, no-cache for the service worker).

## Crisis resources (US)

988 Suicide & Crisis Lifeline — call or text **988** · Crisis Text Line — text **HOME** to **741741** · Emergency — **911**

---

For clinician education. Verify doses against local formularies and follow local law and protocol.
