import { useState } from 'react';
import ModuleLayout from '../components/ModuleLayout';
import { Thermometer, AlertTriangle, ArrowLeftRight } from 'lucide-react';

const SerotoninNMS = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const symptoms = {
    serotonin: [
      { name: 'Hyperreflexia', key: 'hyperreflexia' },
      { name: 'Clonus (especially lower extremities)', key: 'clonus' },
      { name: 'Agitation/Restlessness', key: 'agitation_s' },
      { name: 'Mydriasis (dilated pupils)', key: 'mydriasis' },
      { name: 'Diaphoresis', key: 'diaphoresis_s' },
      { name: 'Tremor', key: 'tremor_s' },
      { name: 'Diarrhea', key: 'diarrhea' },
      { name: 'Hyperthermia', key: 'hyperthermia_s' }
    ],
    nms: [
      { name: 'Lead-pipe rigidity', key: 'rigidity' },
      { name: 'Bradyreflexia/Normal reflexes', key: 'bradyreflexia' },
      { name: 'Altered mental status', key: 'ams_nms' },
      { name: 'Fever', key: 'fever_nms' },
      { name: 'Diaphoresis', key: 'diaphoresis_n' },
      { name: 'Autonomic instability', key: 'autonomic_n' },
      { name: 'Elevated CK', key: 'ck' },
      { name: 'Slow onset (days)', key: 'slow_onset' }
    ]
  };

  const toggleSymptom = (key: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const getAssessment = () => {
    const serotoninCount = symptoms.serotonin.filter(s => selectedSymptoms.includes(s.key)).length;
    const nmsCount = symptoms.nms.filter(s => selectedSymptoms.includes(s.key)).length;

    if (serotoninCount === 0 && nmsCount === 0) return null;

    if (serotoninCount > nmsCount) {
      return {
        diagnosis: 'More consistent with Serotonin Syndrome',
        color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-600 text-blue-800 dark:text-blue-200'
      };
    } else if (nmsCount > serotoninCount) {
      return {
        diagnosis: 'More consistent with Neuroleptic Malignant Syndrome',
        color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-600 text-purple-800 dark:text-purple-200'
      };
    } else {
      return {
        diagnosis: 'Unclear - consider both diagnoses',
        color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-600 text-yellow-800 dark:text-yellow-200'
      };
    }
  };

  const assessment = getAssessment();

  return (
    <ModuleLayout
      title="Serotonin Syndrome vs Neuroleptic Malignant Syndrome"
      description="Critical differentiation between two life-threatening medication-induced emergencies"
    >
      <div className="space-y-6">
        {/* Overview */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Both serotonin syndrome and NMS are potentially life-threatening conditions that can present similarly.
            Accurate differentiation is crucial because management differs significantly.
          </p>
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-4">
            <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
              Critical Point:
            </p>
            <p className="text-red-700 dark:text-red-300">
              The KEY distinguishing features are neuromuscular findings: hyperreflexia and clonus
              suggest serotonin syndrome, while rigidity and bradyreflexia suggest NMS.
            </p>
          </div>
        </div>

        {/* Interactive Comparator */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <ArrowLeftRight className="text-blue-500" />
            Interactive Symptom Comparator
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select symptoms to see which syndrome they suggest (educational tool only)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <Thermometer className="text-blue-500" />
                Serotonin Syndrome Features
              </h3>
              <div className="space-y-2">
                {symptoms.serotonin.map(symptom => (
                  <button
                    key={symptom.key}
                    onClick={() => toggleSymptom(symptom.key)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedSymptoms.includes(symptom.key)
                        ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                        : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {symptom.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-300 flex items-center gap-2">
                <Thermometer className="text-purple-500" />
                NMS Features
              </h3>
              <div className="space-y-2">
                {symptoms.nms.map(symptom => (
                  <button
                    key={symptom.key}
                    onClick={() => toggleSymptom(symptom.key)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedSymptoms.includes(symptom.key)
                        ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500'
                        : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {symptom.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {assessment && (
            <div className={`mt-6 p-4 rounded-lg border-l-4 ${assessment.color}`}>
              <p className="font-semibold">{assessment.diagnosis}</p>
              <p className="text-sm mt-1">
                This is an educational tool only - clinical judgment and full assessment required
              </p>
            </div>
          )}
        </div>

        {/* Side-by-Side Comparison */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Detailed Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                  <th className="text-left p-3">Feature</th>
                  <th className="text-left p-3 bg-blue-50 dark:bg-blue-900/20">Serotonin Syndrome</th>
                  <th className="text-left p-3 bg-purple-50 dark:bg-purple-900/20">NMS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="p-3 font-semibold">Onset</td>
                  <td className="p-3 bg-blue-50/50 dark:bg-blue-900/10">Hours (rapid)</td>
                  <td className="p-3 bg-purple-50/50 dark:bg-purple-900/10">Days to weeks (gradual)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Reflexes</td>
                  <td className="p-3 bg-blue-50/50 dark:bg-blue-900/10">Hyperreflexia ++</td>
                  <td className="p-3 bg-purple-50/50 dark:bg-purple-900/10">Normal or decreased</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Muscle Tone</td>
                  <td className="p-3 bg-blue-50/50 dark:bg-blue-900/10">Normal or increased, tremor</td>
                  <td className="p-3 bg-purple-50/50 dark:bg-purple-900/10">Lead-pipe rigidity</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Clonus</td>
                  <td className="p-3 bg-blue-50/50 dark:bg-blue-900/10">Present (especially ankles)</td>
                  <td className="p-3 bg-purple-50/50 dark:bg-purple-900/10">Absent</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Causative Agent</td>
                  <td className="p-3 bg-blue-50/50 dark:bg-blue-900/10">Serotonergic drugs (SSRIs, MAOIs, tramadol, etc.)</td>
                  <td className="p-3 bg-purple-50/50 dark:bg-purple-900/10">Antipsychotics (especially high-potency typical)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Temperature</td>
                  <td className="p-3 bg-blue-50/50 dark:bg-blue-900/10">Usually &lt;41°C (105.8°F)</td>
                  <td className="p-3 bg-purple-50/50 dark:bg-purple-900/10">Often &gt;41°C (105.8°F)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">CK Level</td>
                  <td className="p-3 bg-blue-50/50 dark:bg-blue-900/10">Normal or mildly elevated</td>
                  <td className="p-3 bg-purple-50/50 dark:bg-purple-900/10">Markedly elevated</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Course</td>
                  <td className="p-3 bg-blue-50/50 dark:bg-blue-900/10">Resolves in 24-72h after stopping drugs</td>
                  <td className="p-3 bg-purple-50/50 dark:bg-purple-900/10">May take weeks to resolve</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Management */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-orange-500" />
            Emergency Management (Educational)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-600">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Serotonin Syndrome</h3>
              <ol className="text-sm space-y-2 text-blue-700 dark:text-blue-300">
                <li className="flex gap-2">
                  <span className="font-semibold">1.</span>
                  <span>Stop all serotonergic agents immediately</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">2.</span>
                  <span>Supportive care: IV fluids, cooling for hyperthermia</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">3.</span>
                  <span>Benzodiazepines for agitation</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">4.</span>
                  <span>Consider cyproheptadine (serotonin antagonist) for severe cases</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">5.</span>
                  <span>AVOID antipsychotics (can worsen)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">6.</span>
                  <span>Monitor vital signs, temperature closely</span>
                </li>
              </ol>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-600">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">Neuroleptic Malignant Syndrome</h3>
              <ol className="text-sm space-y-2 text-purple-700 dark:text-purple-300">
                <li className="flex gap-2">
                  <span className="font-semibold">1.</span>
                  <span>Stop all antipsychotics immediately</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">2.</span>
                  <span>ICU-level supportive care</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">3.</span>
                  <span>Aggressive cooling, IV hydration</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">4.</span>
                  <span>Bromocriptine or dantrolene for severe cases</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">5.</span>
                  <span>Benzodiazepines for rigidity</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">6.</span>
                  <span>Monitor CK, renal function (rhabdomyolysis risk)</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Prevention */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Prevention & Risk Factors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Serotonin Syndrome Prevention:</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Avoid combining serotonergic agents</li>
                <li>• 2-week washout after stopping MAOIs</li>
                <li>• 5-week washout after stopping fluoxetine before MAOI</li>
                <li>• Educate patients about OTC medications (dextromethorphan, St. John's wort)</li>
                <li>• Start low, go slow with dose increases</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">NMS Risk Factors:</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Rapid dose escalation of antipsychotics</li>
                <li>• High-potency typical antipsychotics</li>
                <li>• Dehydration, exhaustion</li>
                <li>• IM administration</li>
                <li>• Young males at higher risk</li>
                <li>• Previous episode of NMS</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="card bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600">
          <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Both are life-threatening and require immediate intervention</li>
            <li>• Hyperreflexia and clonus = serotonin syndrome; Rigidity and bradyreflexia = NMS</li>
            <li>• Serotonin syndrome develops rapidly (hours); NMS develops gradually (days)</li>
            <li>• Stop offending agent immediately in both cases</li>
            <li>• Serotonin syndrome usually resolves in 24-72 hours; NMS may take weeks</li>
            <li>• When in doubt, treat both aggressively and consult toxicology/critical care</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
};

export default SerotoninNMS;
