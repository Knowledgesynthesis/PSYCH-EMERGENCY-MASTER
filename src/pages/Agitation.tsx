import { useState } from 'react';
import ModuleLayout from '../components/ModuleLayout';
import { MessageCircle, Pill, Shield, AlertCircle } from 'lucide-react';

const Agitation = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  const deescalationSteps = [
    { step: 'Ensure Safety', details: 'Maintain safe distance, clear exit path, remove dangerous objects, call for help if needed' },
    { step: 'Calm Environment', details: 'Reduce stimulation, lower lights, minimize noise, limit number of people present' },
    { step: 'Respectful Approach', details: 'Introduce yourself, explain your role, maintain non-threatening body language' },
    { step: 'Listen Actively', details: 'Allow patient to express concerns, validate feelings, avoid arguing or contradicting' },
    { step: 'Offer Choices', details: 'Provide options when possible, collaborative problem-solving, maintain patient autonomy' },
    { step: 'Set Clear Limits', details: 'Explain acceptable behavior, state consequences calmly, be consistent' }
  ];

  const medications = [
    {
      name: 'Oral Medications (First-line)',
      options: ['Lorazepam', 'Olanzapine', 'Risperidone'],
      notes: 'Preferred when patient cooperative; faster onset than previously thought'
    },
    {
      name: 'IM Medications (If oral refused)',
      options: ['Haloperidol + Lorazepam', 'Olanzapine IM', 'Ziprasidone IM'],
      notes: 'Use when verbal de-escalation fails and patient poses danger'
    }
  ];

  return (
    <ModuleLayout
      title="Acute Agitation & Behavioral Emergencies"
      description="De-escalation strategies and safe management of acute agitation"
    >
      <div className="space-y-6">
        {/* Overview */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Acute agitation requires rapid assessment of etiology and systematic approach to de-escalation.
            Safety is paramount for both patient and staff.
          </p>
          <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600 p-4">
            <p className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
              Differential Diagnosis of Agitation:
            </p>
            <ul className="list-disc list-inside text-orange-700 dark:text-orange-300 space-y-1">
              <li>Medical: Delirium, hypoxia, hypoglycemia, infection, seizure</li>
              <li>Substance: Intoxication (stimulants, alcohol) or withdrawal</li>
              <li>Psychiatric: Psychosis, mania, personality disorder</li>
              <li>Situational: Fear, pain, frustration</li>
            </ul>
          </div>
        </div>

        {/* De-escalation Pathway */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <MessageCircle className="text-blue-500" />
            Verbal De-escalation Framework
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Click each step to learn more
          </p>
          <div className="space-y-2">
            {deescalationSteps.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => setSelectedStrategy(selectedStrategy === item.step ? null : item.step)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedStrategy === item.step
                      ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-semibold text-sm">
                      {index + 1}
                    </span>
                    <span className="font-semibold">{item.step}</span>
                  </div>
                </button>
                {selectedStrategy === item.step && (
                  <div className="mt-2 ml-11 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">{item.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pharmacologic Management */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Pill className="text-purple-500" />
            Pharmacologic Management (Educational)
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            For educational purposes only - not clinical guidance
          </p>
          <div className="space-y-4">
            {medications.map((category, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {category.options.map((med, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                    >
                      {med}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{category.notes}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 p-4">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Important:</strong> Check QTc before using haloperidol or ziprasidone.
              Avoid benzodiazepines in delirium unless substance withdrawal suspected.
            </p>
          </div>
        </div>

        {/* Physical Restraints */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="text-red-500" />
            Physical Restraints (Last Resort)
          </h2>
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Use Only When:
              </p>
              <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-1">
                <li>Imminent danger to self or others</li>
                <li>Verbal de-escalation has failed</li>
                <li>Medications insufficient or not appropriate</li>
                <li>Least restrictive alternatives exhausted</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Safety Principles:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                <li>Adequate staff (minimum 5 trained personnel)</li>
                <li>Clear team leader and communication</li>
                <li>Monitor vital signs every 15 minutes</li>
                <li>Document thoroughly</li>
                <li>Regular reassessment for discontinuation</li>
                <li>Debrief with patient after episode</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Medical Workup */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="text-orange-500" />
            Medical Evaluation
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Always consider medical causes, especially with:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
              <p className="font-semibold mb-1">Red Flags</p>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Altered consciousness</li>
                <li>• Vital sign abnormalities</li>
                <li>• New-onset agitation (age &gt;40)</li>
                <li>• Abnormal neurologic exam</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
              <p className="font-semibold mb-1">Basic Workup</p>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Vital signs, glucose</li>
                <li>• Urine drug screen</li>
                <li>• Basic metabolic panel</li>
                <li>• Consider: CT head, infection workup</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="card bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600">
          <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Verbal de-escalation is first-line intervention</li>
            <li>• Always rule out medical causes (especially delirium)</li>
            <li>• Oral medications often as effective as IM with less trauma</li>
            <li>• Restraints are last resort with strict monitoring requirements</li>
            <li>• Combination therapy (antipsychotic + benzodiazepine) may be more effective than either alone</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
};

export default Agitation;
