import { useState } from 'react';
import ModuleLayout from '../components/ModuleLayout';
import { Activity, AlertCircle, Search, Brain } from 'lucide-react';

const Delirium = () => {
  const [selectedFeature, setSelectedFeature] = useState<'delirium' | 'psychosis' | null>(null);

  const differentiatingFeatures = [
    {
      feature: 'Onset',
      delirium: 'Acute (hours to days)',
      psychosis: 'Subacute to chronic (days to weeks)',
      weight: 'high'
    },
    {
      feature: 'Course',
      delirium: 'Fluctuating (worse at night)',
      psychosis: 'More stable',
      weight: 'high'
    },
    {
      feature: 'Attention',
      delirium: 'Impaired (hallmark feature)',
      psychosis: 'Usually intact',
      weight: 'critical'
    },
    {
      feature: 'Consciousness',
      delirium: 'Altered (clouded)',
      psychosis: 'Clear',
      weight: 'critical'
    },
    {
      feature: 'Hallucinations',
      delirium: 'Visual > auditory',
      psychosis: 'Auditory > visual',
      weight: 'moderate'
    },
    {
      feature: 'Delusions',
      delirium: 'Poorly formed, transient',
      psychosis: 'Well-formed, persistent',
      weight: 'moderate'
    },
    {
      feature: 'Psychomotor',
      delirium: 'Hypoactive, hyperactive, or mixed',
      psychosis: 'Variable but organized',
      weight: 'moderate'
    },
    {
      feature: 'Reversibility',
      delirium: 'Often reversible with treatment',
      psychosis: 'May require ongoing treatment',
      weight: 'moderate'
    }
  ];

  return (
    <ModuleLayout
      title="Delirium vs Primary Psychiatric Illness"
      description="Critical differentiation between medical and psychiatric causes of altered mental status"
    >
      <div className="space-y-6">
        {/* Overview */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Delirium is a medical emergency that can be life-threatening if the underlying cause is not identified
            and treated. It is often misdiagnosed as primary psychosis, leading to delayed treatment.
          </p>
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-4">
            <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
              Critical Rule:
            </p>
            <p className="text-red-700 dark:text-red-300">
              Always assume altered mental status is delirium (medical) until proven otherwise.
              Missing delirium can be fatal; mistaking psychosis for delirium delays psychiatric treatment but is safer.
            </p>
          </div>
        </div>

        {/* Interactive Comparison */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="text-purple-500" />
            Distinguishing Features
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Click features to highlight delirium or psychosis patterns
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                  <th className="text-left p-3">Feature</th>
                  <th className="text-left p-3 bg-orange-50 dark:bg-orange-900/20">Delirium</th>
                  <th className="text-left p-3 bg-blue-50 dark:bg-blue-900/20">Primary Psychosis</th>
                  <th className="text-center p-3">Importance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {differentiatingFeatures.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-3 font-semibold">{item.feature}</td>
                    <td
                      className={`p-3 cursor-pointer transition-colors ${
                        selectedFeature === 'delirium'
                          ? 'bg-orange-100 dark:bg-orange-900/30'
                          : 'bg-orange-50/50 dark:bg-orange-900/10'
                      }`}
                      onClick={() => setSelectedFeature('delirium')}
                    >
                      {item.delirium}
                    </td>
                    <td
                      className={`p-3 cursor-pointer transition-colors ${
                        selectedFeature === 'psychosis'
                          ? 'bg-blue-100 dark:bg-blue-900/30'
                          : 'bg-blue-50/50 dark:bg-blue-900/10'
                      }`}
                      onClick={() => setSelectedFeature('psychosis')}
                    >
                      {item.psychosis}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.weight === 'critical'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          : item.weight === 'high'
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                      }`}>
                        {item.weight}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delirium Workup */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Search className="text-green-500" />
            Delirium Workup: Common Causes
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Use mnemonic: <strong>I WATCH DEATH</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Common Causes:</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600 dark:text-primary-400">I</span>
                  <span><strong>Infection</strong> - UTI, pneumonia, sepsis, meningitis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600 dark:text-primary-400">W</span>
                  <span><strong>Withdrawal</strong> - Alcohol, benzodiazepines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600 dark:text-primary-400">A</span>
                  <span><strong>Acute metabolic</strong> - Electrolytes, glucose, liver, kidney</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600 dark:text-primary-400">T</span>
                  <span><strong>Toxins/Drugs</strong> - Anticholinergics, opioids, benzos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600 dark:text-primary-400">C</span>
                  <span><strong>CNS pathology</strong> - Stroke, seizure, tumor, trauma</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600 dark:text-primary-400">H</span>
                  <span><strong>Hypoxia</strong> - Respiratory, cardiac causes</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Additional Causes:</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600 dark:text-primary-400">D</span>
                  <span><strong>Deficiencies</strong> - B12, thiamine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600 dark:text-primary-400">E</span>
                  <span><strong>Endocrine</strong> - Thyroid, adrenal, glucose</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600 dark:text-primary-400">A</span>
                  <span><strong>Acute vascular</strong> - MI, PE, shock</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600 dark:text-primary-400">T</span>
                  <span><strong>Trauma/Pain</strong> - Head injury, severe pain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600 dark:text-primary-400">H</span>
                  <span><strong>Heavy metals</strong> - Lead, mercury (rare)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Essential Labs & Studies */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="text-blue-500" />
            Essential Diagnostic Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                First-Line Labs:
              </h3>
              <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Complete blood count (CBC)</li>
                <li>• Comprehensive metabolic panel (CMP)</li>
                <li>• Glucose (fingerstick immediately)</li>
                <li>• Urinalysis and culture</li>
                <li>• Chest X-ray</li>
                <li>• ECG</li>
                <li>• Urine drug screen</li>
                <li>• Blood alcohol level</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">
                Additional (As Indicated):
              </h3>
              <ul className="text-sm space-y-1 text-purple-700 dark:text-purple-300">
                <li>• Thyroid function tests (TSH)</li>
                <li>• B12, folate levels</li>
                <li>• Ammonia (liver disease)</li>
                <li>• CT or MRI brain</li>
                <li>• Lumbar puncture (if meningitis/encephalitis suspected)</li>
                <li>• EEG (if seizures suspected)</li>
                <li>• Blood cultures (if sepsis suspected)</li>
                <li>• Arterial blood gas (if hypoxia)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Management */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="text-orange-500" />
            Management Principles
          </h2>
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-600">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                1. Treat Underlying Cause
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                This is the most important intervention. Symptomatic treatment alone is insufficient.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-600">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                2. Non-Pharmacologic Interventions (First-Line)
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Reorientation (clocks, calendars, familiar objects)</li>
                <li>• Normalize sleep-wake cycle (lights during day, dark at night)</li>
                <li>• Minimize environmental stimulation</li>
                <li>• Early mobilization when safe</li>
                <li>• Sensory aids (glasses, hearing aids)</li>
                <li>• Consistent staffing and family presence</li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-600">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                3. Pharmacologic Management (Use Judiciously)
              </h3>
              <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                <p className="font-semibold">Use only for severe agitation posing danger:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Low-dose antipsychotics (haloperidol, quetiapine)</li>
                  <li>• Avoid benzodiazepines (except alcohol/benzo withdrawal)</li>
                  <li>• Avoid anticholinergic medications</li>
                  <li>• Check QTc before haloperidol</li>
                </ul>
                <p className="text-xs mt-2 text-yellow-600 dark:text-yellow-400">
                  Note: Medications can worsen delirium and should be used sparingly
                </p>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-600">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                4. Prevent Complications
              </h3>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                <li>• Fall precautions (bed alarms, low bed)</li>
                <li>• DVT prophylaxis</li>
                <li>• Skin care (pressure ulcer prevention)</li>
                <li>• Hydration and nutrition</li>
                <li>• Minimize use of physical restraints (can worsen delirium)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Special Populations */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Special Considerations</h2>
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Elderly Patients:</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Higher risk for delirium. Medications, infections, and metabolic disturbances are common triggers.
                Hypoactive delirium often missed ("quiet" patient).
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">ICU Delirium:</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Very common in ICU. Use CAM-ICU assessment tool. Minimize sedation when possible.
                Early mobilization and reduced noise can help.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Substance Withdrawal:</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Alcohol and benzodiazepine withdrawal can cause delirium. In these cases, benzodiazepines
                are appropriate treatment (symptom-triggered protocols).
              </p>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="card bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600">
          <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Delirium is a medical emergency requiring identification of underlying cause</li>
            <li>• Fluctuating attention and consciousness are hallmark features</li>
            <li>• Always assume altered mental status is delirium until proven otherwise</li>
            <li>• Visual hallucinations are more common in delirium; auditory in psychosis</li>
            <li>• Non-pharmacologic interventions are first-line treatment</li>
            <li>• Avoid benzodiazepines except in alcohol/benzodiazepine withdrawal</li>
            <li>• Hypoactive delirium is often missed but equally dangerous</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
};

export default Delirium;
