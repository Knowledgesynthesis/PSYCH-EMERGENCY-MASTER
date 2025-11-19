import ModuleLayout from '../components/ModuleLayout';
import { AlertTriangle, Shield, Zap } from 'lucide-react';

const Mania = () => {
  return (
    <ModuleLayout
      title="Severe Mania"
      description="Recognition and management of manic episodes requiring emergency intervention"
    >
      <div className="space-y-6">
        {/* Overview */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Severe mania represents a psychiatric emergency when accompanied by dangerous behaviors,
            psychosis, or severe impairment in judgment. Rapid stabilization is essential to prevent harm.
          </p>
          <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600 p-4">
            <p className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
              Core Features of Mania:
            </p>
            <ul className="list-disc list-inside text-orange-700 dark:text-orange-300 space-y-1">
              <li>Elevated, expansive, or irritable mood</li>
              <li>Increased energy and goal-directed activity</li>
              <li>Decreased need for sleep</li>
              <li>Grandiosity or inflated self-esteem</li>
              <li>More talkative than usual (pressured speech)</li>
              <li>Flight of ideas or racing thoughts</li>
              <li>Distractibility</li>
              <li>Increased risk-taking behaviors</li>
            </ul>
          </div>
        </div>

        {/* Emergency Indicators */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-red-500" />
            When Mania Becomes an Emergency
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3">Dangerous Behaviors</h3>
              <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Reckless driving, spending sprees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Sexual indiscretions with high-risk partners</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Aggressive or assaultive behavior</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Business decisions with severe consequences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Substance abuse (especially stimulants)</span>
                </li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3">Medical Complications</h3>
              <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Severe agitation or psychomotor acceleration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Exhaustion from lack of sleep</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Dehydration, poor nutrition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Psychotic features (delusions, hallucinations)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Catatonia (rare but severe)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Differential Diagnosis */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="text-yellow-500" />
            Mania Mimics - Rule Out:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Substance-Induced</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Stimulants (cocaine, meth)</li>
                <li>• Steroids</li>
                <li>• Antidepressants</li>
                <li>• Caffeine (excessive)</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Medical Conditions</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Hyperthyroidism</li>
                <li>• CNS lesions</li>
                <li>• Multiple sclerosis</li>
                <li>• HIV/AIDS</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Psychiatric</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• ADHD (severe)</li>
                <li>• Agitated depression</li>
                <li>• Personality disorder</li>
                <li>• Schizoaffective disorder</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Acute Management */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="text-green-500" />
            Acute Management Principles (Educational)
          </h2>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Environmental Strategies
              </h3>
              <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Low-stimulation environment (quiet, dimmed lights)</li>
                <li>• Consistent, calm staff interactions</li>
                <li>• Structured schedule with rest periods</li>
                <li>• Limit access to phones, internet (prevent impulsive decisions)</li>
                <li>• Monitor for exhaustion, dehydration</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Pharmacologic Options (Educational Only)</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                  <p className="font-semibold text-sm mb-1">Mood Stabilizers (Core Treatment):</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Lithium, valproate - may take days to weeks for full effect
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Note: Monitor levels, renal function (lithium), liver function (valproate)
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                  <p className="font-semibold text-sm mb-1">Antipsychotics (Acute Control):</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Olanzapine, risperidone, quetiapine, aripiprazole - faster symptom relief
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Note: Monitor for metabolic effects, EPS
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                  <p className="font-semibold text-sm mb-1">Benzodiazepines (Adjunctive):</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Lorazepam, clonazepam - for agitation, insomnia, initial stabilization
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Note: Risk of disinhibition in some patients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Populations */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Special Considerations</h2>
          <div className="space-y-3">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                First Manic Episode
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Requires thorough medical workup. Consider neuroimaging, comprehensive labs,
                substance screening. Family history crucial for diagnosis.
              </p>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-pink-800 dark:text-pink-200 mb-2">
                Pregnant Patients
              </h3>
              <p className="text-sm text-pink-700 dark:text-pink-300">
                Risk-benefit analysis essential. Avoid valproate (teratogenic). Consider ECT.
                Consult maternal-fetal medicine and psychiatry specialists.
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                Mixed Episodes
              </h3>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">
                Manic energy + depressed mood = very high suicide risk. Requires intensive monitoring.
                Avoid antidepressant monotherapy.
              </p>
            </div>
          </div>
        </div>

        {/* Disposition */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Disposition</h2>
          <div className="space-y-3">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-600">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Inpatient Psychiatric (Most Cases)
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                Severe impairment in judgment, dangerous behaviors, psychotic features, exhaustion,
                inability to care for self, first episode requiring workup
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-600">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Partial Hospitalization (Rare for Severe Mania)
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Only if symptoms mild-moderate, excellent support, able to sleep, no dangerous behaviors,
                immediate psychiatry follow-up
              </p>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="card bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600">
          <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Severe mania is a medical emergency requiring hospitalization</li>
            <li>• Always rule out stimulant intoxication and medical causes</li>
            <li>• Mixed episodes carry highest suicide risk</li>
            <li>• Combination therapy (mood stabilizer + antipsychotic) often most effective</li>
            <li>• Monitor for exhaustion, dehydration, and cardiovascular complications</li>
            <li>• First episode requires comprehensive medical workup</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
};

export default Mania;
