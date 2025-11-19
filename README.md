# Psych Emergency Master

An interactive, mobile-first educational web application for psychiatric emergency management. Designed for medical students, residents, and frontline clinicians.

## Features

- **8 Core Modules**: Comprehensive coverage of psychiatric emergencies
  - Suicide & Homicide Risk Assessment
  - Acute Agitation Management
  - Substance-Related Emergencies
  - Psychosis & Mania Crises
  - Catatonia & Severe Depression
  - Serotonin Syndrome vs NMS Differentiation
  - Delirium vs Primary Psychiatric Illness
  - Capacity Assessment & Disposition

- **Interactive Learning Tools**:
  - Risk calculators and assessment tools
  - Interactive symptom comparators
  - Decision tree navigators
  - Branching case scenarios

- **Assessment & Practice**:
  - Comprehensive quiz questions with detailed rationales
  - Interactive case simulations
  - Immediate feedback on clinical decisions

- **Additional Features**:
  - Searchable glossary of essential terminology
  - Dark mode support
  - Mobile-first responsive design
  - Offline capability (service worker)

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PSYCH-EMERGENCY-MASTER
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
PSYCH-EMERGENCY-MASTER/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navigation.tsx   # App navigation
│   │   └── ModuleLayout.tsx # Layout for module pages
│   ├── contexts/            # React contexts
│   │   └── ThemeContext.tsx # Dark mode theme management
│   ├── pages/               # Route pages
│   │   ├── Home.tsx         # Dashboard with module cards
│   │   ├── SuicideRisk.tsx  # Suicide risk module
│   │   ├── Agitation.tsx    # Agitation management
│   │   ├── Substances.tsx   # Substance emergencies
│   │   ├── Psychosis.tsx    # Psychosis & mania
│   │   ├── Mania.tsx        # Severe mania
│   │   ├── Catatonia.tsx    # Catatonia & depression
│   │   ├── SerotoninNMS.tsx # Serotonin vs NMS
│   │   ├── Delirium.tsx     # Delirium differentiation
│   │   ├── Capacity.tsx     # Capacity & disposition
│   │   ├── Cases.tsx        # Interactive cases
│   │   ├── Assessment.tsx   # Quiz/assessment
│   │   ├── Glossary.tsx     # Medical terminology
│   │   └── Settings.tsx     # App settings
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
│   ├── sw.js               # Service worker
│   └── manifest.json       # PWA manifest
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind config
└── vite.config.ts          # Vite config
```

## Key Features by Module

### Suicide & Homicide Risk
- Interactive risk factor assessment tool
- Safety planning components
- Disposition guidelines

### Acute Agitation
- Verbal de-escalation framework
- Pharmacologic management options
- Medical workup considerations

### Substance-Related Emergencies
- Timeline visualizations for withdrawal/intoxication
- Substance-specific management protocols
- Red flag identification

### Serotonin Syndrome vs NMS
- Interactive symptom comparator
- Side-by-side feature comparison
- Emergency management protocols

### Delirium vs Primary Psychiatric Illness
- Differential diagnosis framework
- I WATCH DEATH mnemonic
- Medical workup guidelines

### Capacity Assessment
- Four elements evaluation tool
- Sliding scale explanation
- Disposition decision trees

## Educational Disclaimers

**IMPORTANT**: This application is for educational purposes only and should not be used for clinical decision-making. All content is designed for learning and should not replace:
- Professional medical advice
- Clinical judgment
- Institutional protocols
- Current evidence-based guidelines

All patient scenarios are entirely fictional and created for educational purposes.

## Contributing

This is an educational project. If you'd like to contribute improvements or additional content, please ensure all content is:
- Evidence-based and referenced
- Educational in nature
- Not providing direct clinical guidance
- Appropriately disclaimed

## License

This project is created for educational purposes.

## Emergency Resources

**If you or someone you know is experiencing a psychiatric emergency:**

- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text "HELLO" to 741741
- **Emergency Services**: 911

## Acknowledgments

Content is based on clinical guidelines from:
- American Psychiatric Association (APA)
- American College of Emergency Physicians (ACEP)
- SAMHSA
- Current emergency psychiatry literature

---

**Version**: 1.0.0
**For Educational Use Only**
