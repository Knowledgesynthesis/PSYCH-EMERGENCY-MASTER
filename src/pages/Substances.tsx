import { useState } from 'react';
import ModuleLayout from '../components/ModuleLayout';
import { Pill, AlertTriangle, Activity, TrendingUp } from 'lucide-react';

const Substances = () => {
  const [selectedSubstance, setSelectedSubstance] = useState('alcohol');

  const substances = {
    alcohol: {
      name: 'Alcohol Withdrawal',
      icon: '🍺',
      timeline: [
        { time: '6-12 hours', symptoms: 'Tremor, anxiety, nausea, insomnia', severity: 'Mild' },
        { time: '12-24 hours', symptoms: 'Hallucinations (visual, tactile, auditory)', severity: 'Moderate' },
        { time: '24-48 hours', symptoms: 'Withdrawal seizures (typically generalized tonic-clonic)', severity: 'Severe' },
        { time: '48-96 hours', symptoms: 'Delirium tremens (DTs): confusion, agitation, fever, autonomic instability', severity: 'Life-threatening' }
      ],
      management: [
        'Benzodiazepines (first-line): Symptom-triggered or fixed-schedule dosing',
        'CIWA-Ar protocol for assessment and dosing',
        'Thiamine before glucose (prevent Wernicke encephalopathy)',
        'Supportive care: IV fluids, electrolyte repletion (especially magnesium, potassium)',
        'Monitor for seizures and DTs'
      ],
      redFlags: ['Severe autonomic instability', 'Altered mental status', 'Seizures', 'Fever', 'Severe hypertension/tachycardia']
    },
    benzodiazepine: {
      name: 'Benzodiazepine Withdrawal',
      icon: '💊',
      timeline: [
        { time: '1-4 days (short-acting)', symptoms: 'Anxiety, insomnia, tremor', severity: 'Early' },
        { time: '5-10 days (long-acting)', symptoms: 'Peak symptoms: severe anxiety, agitation', severity: 'Peak' },
        { time: 'Up to weeks', symptoms: 'Seizures can occur late, perceptual disturbances', severity: 'Prolonged' }
      ],
      management: [
        'Gradual taper (10-25% every 1-2 weeks)',
        'Long-acting benzodiazepine substitution (e.g., diazepam, clonazepam)',
        'Inpatient monitoring for severe dependence',
        'Seizure precautions',
        'Avoid abrupt discontinuation'
      ],
      redFlags: ['Seizure activity', 'Severe hypertension', 'Psychosis', 'History of seizures', 'Delirium']
    },
    stimulant: {
      name: 'Stimulant Intoxication',
      icon: '⚡',
      timeline: [
        { time: 'Acute (minutes-hours)', symptoms: 'Euphoria, hypervigilance, agitation, paranoia', severity: 'Variable' },
        { time: 'Peak effects', symptoms: 'Severe agitation, psychosis, hyperthermia, seizures', severity: 'Severe' },
        { time: 'Crash (hours-days)', symptoms: 'Depression, fatigue, hypersomnia, increased appetite', severity: 'Withdrawal' }
      ],
      management: [
        'Benzodiazepines for agitation and cardiovascular effects',
        'Cooling measures for hyperthermia',
        'Antipsychotics (with caution - may lower seizure threshold)',
        'Cardiac monitoring',
        'Avoid beta-blockers (unopposed alpha stimulation)'
      ],
      redFlags: ['Chest pain/MI', 'Severe hypertension', 'Hyperthermia (&gt;40°C)', 'Seizures', 'Rhabdomyolysis', 'Psychosis with danger']
    },
    opioid: {
      name: 'Opioid Intoxication/Overdose',
      icon: '💉',
      timeline: [
        { time: 'Acute (minutes)', symptoms: 'Miosis, respiratory depression, decreased consciousness', severity: 'Critical' },
        { time: 'Without intervention', symptoms: 'Apnea, hypoxia, cardiac arrest', severity: 'Life-threatening' },
        { time: 'After naloxone', symptoms: 'Withdrawal symptoms, agitation, pain', severity: 'Iatrogenic withdrawal' }
      ],
      management: [
        'Airway management (positioning, bag-mask ventilation if needed)',
        'Naloxone administration: 0.4-2mg IV/IM/IN, repeat every 2-3 minutes',
        'Continuous monitoring (re-sedation possible, especially with long-acting opioids)',
        'Consider naloxone infusion for long-acting opioids',
        'Extended observation (minimum 4-6 hours after last naloxone dose)'
      ],
      redFlags: ['Respiratory rate &lt;10', 'Oxygen saturation &lt;90%', 'Unresponsive', 'Pulmonary edema', 'Coingestants (especially benzodiazepines)']
    }
  };

  const currentSubstance = substances[selectedSubstance as keyof typeof substances];

  return (
    <ModuleLayout
      title="Substance-Related Emergencies"
      description="Recognition and management of intoxication and withdrawal syndromes"
    >
      <div className="space-y-6">
        {/* Overview */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Substance-related emergencies require rapid identification of the substance, assessment of severity,
            and appropriate medical stabilization. Always consider polysubstance use.
          </p>
        </div>

        {/* Substance Selector */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Select Substance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(substances).map(([key, substance]) => (
              <button
                key={key}
                onClick={() => setSelectedSubstance(key)}
                className={`p-4 rounded-lg text-center transition-all ${
                  selectedSubstance === key
                    ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500 shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="text-3xl mb-2">{substance.icon}</div>
                <div className="text-sm font-semibold">{substance.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="text-blue-500" />
            {currentSubstance.name} Timeline
          </h2>
          <div className="space-y-3">
            {currentSubstance.timeline.map((stage, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-32">
                  <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg p-2 text-center text-sm font-semibold">
                    {stage.time}
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{stage.severity}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      stage.severity.includes('Life-threatening') || stage.severity === 'Critical'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        : stage.severity.includes('Severe')
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {stage.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stage.symptoms}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Management */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Pill className="text-green-500" />
            Management (Educational)
          </h2>
          <ul className="space-y-2">
            {currentSubstance.management.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Red Flags */}
        <div className="card bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-red-800 dark:text-red-200">
            <AlertTriangle className="text-red-600" />
            Red Flags Requiring Immediate Intervention
          </h2>
          <ul className="space-y-1">
            {currentSubstance.redFlags.map((flag, index) => (
              <li key={index} className="text-red-700 dark:text-red-300">
                • {flag}
              </li>
            ))}
          </ul>
        </div>

        {/* General Principles */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="text-purple-500" />
            General Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Assessment</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Detailed substance use history</li>
                <li>• Time of last use</li>
                <li>• Route and amount</li>
                <li>• Polysubstance screening</li>
                <li>• Vital signs and physical exam</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Monitoring</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Continuous vital signs</li>
                <li>• Cardiac monitoring if indicated</li>
                <li>• Frequent reassessment</li>
                <li>• Watch for complications</li>
                <li>• Extended observation period</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="card bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600">
          <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Always consider polysubstance use</li>
            <li>• Withdrawal can be life-threatening (alcohol, benzodiazepines)</li>
            <li>• Opioid overdose requires immediate airway management and naloxone</li>
            <li>• Stimulant intoxication can mimic primary psychiatric illness</li>
            <li>• Benzodiazepines are first-line for most withdrawal syndromes (except opioid)</li>
            <li>• Extended monitoring essential due to varying half-lives</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
};

export default Substances;
