import ModuleLayout from '../components/ModuleLayout';
import { Brain, AlertTriangle, Shield, Activity } from 'lucide-react';

const Psychosis = () => {
  return (
    <ModuleLayout
      title="Psychosis & Mania Crises"
      description="Management of psychotic emergencies with danger to self or others"
    >
      <div className="space-y-6">
        {/* Overview */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Psychotic emergencies require rapid assessment of danger, ruling out medical causes,
            and appropriate stabilization. The goal is safety while preserving dignity and therapeutic alliance.
          </p>
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-4">
            <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
              Emergency Indicators:
            </p>
            <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-1">
              <li>Command hallucinations to harm self or others</li>
              <li>Paranoid delusions with plans to act</li>
              <li>Severe disorganization preventing self-care</li>
              <li>Agitation or aggression driven by psychosis</li>
              <li>Inability to care for basic needs</li>
            </ul>
          </div>
        </div>

        {/* Danger Assessment */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-orange-500" />
            Danger Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3">High-Risk Features</h3>
              <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Command hallucinations (especially to harm)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Persecutory delusions with identified "persecutor"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Severe agitation or impulsivity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>History of violence when psychotic</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Substance use + psychosis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Lack of insight or treatment refusal</span>
                </li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Assessment Questions</h3>
              <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>"Are you hearing voices? What do they say?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>"Do you feel someone is trying to harm you?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>"Have you thought about hurting yourself or others?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>"Are you able to keep yourself safe?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>"What substances have you used recently?"</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Medical Rule-Outs */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="text-blue-500" />
            Medical Causes to Rule Out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-sm">Metabolic/Endocrine</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Hypoglycemia</li>
                <li>• Thyroid disorder</li>
                <li>• Cushing's syndrome</li>
                <li>• Hypercalcemia</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-sm">Neurologic</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Delirium</li>
                <li>• Seizure (postictal, complex partial)</li>
                <li>• CNS infection</li>
                <li>• Brain tumor</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-sm">Substance-Related</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Stimulant intoxication</li>
                <li>• Alcohol withdrawal</li>
                <li>• Anticholinergic toxicity</li>
                <li>• Steroid-induced</li>
              </ul>
            </div>
          </div>
        </div>

        {/* First-Episode Psychosis */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="text-purple-500" />
            First-Episode Psychosis Red Flags
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            First-episode psychosis requires thorough medical workup to rule out secondary causes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Required Workup</h3>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>• Comprehensive metabolic panel</li>
                <li>• CBC with differential</li>
                <li>• Thyroid function tests</li>
                <li>• Urine drug screen</li>
                <li>• HIV, RPR (syphilis screening)</li>
                <li>• Consider: CT/MRI brain, EEG, LP if indicated</li>
              </ul>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Special Considerations</h3>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>• Age of onset (unusual if &lt;15 or &gt;40)</li>
                <li>• Acute vs insidious onset</li>
                <li>• Family history of psychosis</li>
                <li>• Prodromal symptoms</li>
                <li>• Neurologic signs present?</li>
                <li>• Cognitive impairment severity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Acute Management */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="text-green-500" />
            Acute Stabilization (Educational)
          </h2>
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Environmental Management
              </h3>
              <ul className="text-sm space-y-1 text-green-700 dark:text-green-300">
                <li>• Calm, structured environment with low stimulation</li>
                <li>• Remove potential weapons or dangerous objects</li>
                <li>• 1:1 observation if high risk</li>
                <li>• Consistent, predictable staff interactions</li>
                <li>• Clear, simple communication</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Pharmacologic Options (Educational Only)</h3>
              <div className="space-y-2">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                  <p className="font-semibold text-sm mb-1">First-Line (Oral preferred):</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Second-generation antipsychotics (risperidone, olanzapine, quetiapine)
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                  <p className="font-semibold text-sm mb-1">For Acute Agitation:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Antipsychotic ± benzodiazepine (combination may be more effective)
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                  <p className="font-semibold text-sm mb-1">Monitoring:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Vital signs, EPS, QTc if using typical antipsychotics or high doses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disposition */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Disposition Considerations</h2>
          <div className="space-y-3">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-600">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Inpatient Psychiatric</h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                Danger to self/others, severe disorganization, inability to care for self, first episode requiring workup
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-600">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Partial Hospitalization</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Stable enough for home overnight, supportive environment, close follow-up arranged
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-600">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Outpatient</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                No danger, good insight, medication adherent, strong support system, reliable follow-up
              </p>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="card bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600">
          <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Always assess for command hallucinations and their content</li>
            <li>• Rule out medical causes, especially in first-episode or atypical presentations</li>
            <li>• Stimulant intoxication can be indistinguishable from primary psychosis</li>
            <li>• Second-generation antipsychotics generally preferred (fewer EPS)</li>
            <li>• Therapeutic alliance is crucial even in acute settings</li>
            <li>• Safety takes precedence over autonomy when danger is present</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
};

export default Psychosis;
