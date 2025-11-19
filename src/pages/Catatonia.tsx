import ModuleLayout from '../components/ModuleLayout';
import { Users, AlertTriangle, Activity, ThermometerSun } from 'lucide-react';

const Catatonia = () => {
  return (
    <ModuleLayout
      title="Catatonia & Severe Depression"
      description="Recognition and emergency management of catatonia and severe depressive states"
    >
      <div className="space-y-6">
        {/* Overview */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Catatonia is a neuropsychiatric syndrome that can be life-threatening.
            It requires prompt recognition and treatment. Catatonia can occur in many psychiatric
            and medical conditions.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4">
            <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Key Point:
            </p>
            <p className="text-blue-700 dark:text-blue-300">
              Catatonia is not a diagnosis - it's a syndrome that requires identification of the underlying cause
              (psychiatric, medical, or substance-related).
            </p>
          </div>
        </div>

        {/* Clinical Features */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Users className="text-purple-500" />
            Clinical Features of Catatonia
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            At least 3 of the following features suggest catatonia:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Motor Signs</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Stupor:</strong> Minimal response to stimuli</li>
                <li>• <strong>Catalepsy:</strong> Passive induction of posture</li>
                <li>• <strong>Waxy flexibility:</strong> Slight resistance to positioning</li>
                <li>• <strong>Posturing:</strong> Spontaneous active maintenance of posture</li>
                <li>• <strong>Rigidity:</strong> Maintenance of rigid posture against efforts to move</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Behavioral Signs</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Mutism:</strong> No or very little verbal response</li>
                <li>• <strong>Negativism:</strong> Opposition to instructions</li>
                <li>• <strong>Mannerisms:</strong> Odd caricatures of normal actions</li>
                <li>• <strong>Stereotypy:</strong> Repetitive, non-goal-directed movements</li>
                <li>• <strong>Echolalia/Echopraxia:</strong> Mimicking speech/actions</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Other Features</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Grimacing:</strong> Maintenance of odd facial expressions</li>
                <li>• <strong>Mitgehen:</strong> "Going with" - exaggerated cooperation</li>
                <li>• <strong>Gegenhalten:</strong> Resistance proportional to pressure applied</li>
                <li>• <strong>Ambitendency:</strong> Stuck in indecisive movement</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Excited Catatonia</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Extreme psychomotor agitation</li>
                <li>• Purposeless, non-goal-directed activity</li>
                <li>• Can rapidly escalate to malignant catatonia</li>
                <li>• High risk for exhaustion, injury</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Malignant Catatonia */}
        <div className="card bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-red-800 dark:text-red-200">
            <ThermometerSun className="text-red-600" />
            Malignant Catatonia - MEDICAL EMERGENCY
          </h2>
          <p className="text-red-700 dark:text-red-300 mb-4">
            Life-threatening complication requiring immediate intervention:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Features:</h3>
              <ul className="text-sm space-y-1 text-red-700 dark:text-red-300">
                <li>• Fever (&gt;38°C / 100.4°F)</li>
                <li>• Autonomic instability (BP, HR fluctuations)</li>
                <li>• Altered consciousness</li>
                <li>• Rigidity</li>
                <li>• Elevated CK (rhabdomyolysis)</li>
                <li>• Leukocytosis</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Immediate Actions:</h3>
              <ul className="text-sm space-y-1 text-red-700 dark:text-red-300">
                <li>• ICU-level care</li>
                <li>• Aggressive cooling for hyperthermia</li>
                <li>• IV fluids</li>
                <li>• Benzodiazepines (high-dose lorazepam)</li>
                <li>• Consider ECT (most effective treatment)</li>
                <li>• Monitor CK, renal function</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Differential Diagnosis */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="text-blue-500" />
            Underlying Causes to Investigate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-sm">Psychiatric</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Mood disorders (most common)</li>
                <li>• Schizophrenia spectrum</li>
                <li>• Autism spectrum</li>
                <li>• PTSD</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-sm">Medical</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Anti-NMDA receptor encephalitis</li>
                <li>• Autoimmune encephalitis</li>
                <li>• Paraneoplastic syndromes</li>
                <li>• CNS infections</li>
                <li>• Metabolic disorders</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-sm">Substance/Medication</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Antipsychotic withdrawal</li>
                <li>• Benzodiazepine withdrawal</li>
                <li>• Neuroleptic malignant syndrome</li>
                <li>• NMDA antagonists (PCP, ketamine)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Workup */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-orange-500" />
            Diagnostic Workup
          </h2>
          <div className="space-y-3">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Laboratory Studies:</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                CBC, CMP, CK, LFTs, TSH, urine drug screen, blood cultures if febrile
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Imaging:</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                CT or MRI brain (rule out structural lesions)
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Special Studies (if indicated):</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                EEG (non-convulsive seizures), LP (encephalitis, meningitis),
                Autoimmune encephalitis panel (anti-NMDA, others)
              </p>
            </div>
          </div>
        </div>

        {/* Treatment */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Treatment (Educational)</h2>
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-600">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                First-Line: Benzodiazepines
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                Lorazepam 1-2mg IV/IM, may repeat every 4-6 hours. Often requires high doses.
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Lorazepam challenge: Improvement within 1-2 hours supports catatonia diagnosis
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-600">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                ECT (Electroconvulsive Therapy)
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                Most effective treatment, especially for malignant catatonia or when benzodiazepines fail
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Often shows rapid improvement (within days)
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-600">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Supportive Care
              </h3>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• IV hydration and nutrition</li>
                <li>• DVT prophylaxis (immobility)</li>
                <li>• Monitor vital signs, I/Os</li>
                <li>• Prevent aspiration</li>
                <li>• Treat underlying cause</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Severe Depression */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Severe Depression with Vegetative Features</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Severe depression can present with profound psychomotor retardation mimicking catatonia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Emergency Indicators:</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Inability to eat or drink</li>
                <li>• Severe psychomotor retardation</li>
                <li>• Failure to thrive</li>
                <li>• Active suicidal ideation with plan</li>
                <li>• Psychotic features</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Management:</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Inpatient hospitalization</li>
                <li>• Monitor nutrition, hydration</li>
                <li>• Suicide precautions</li>
                <li>• Consider ECT (very effective)</li>
                <li>• Antidepressants + antipsychotics if psychotic</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="card bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600">
          <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Catatonia requires at least 3 characteristic features for diagnosis</li>
            <li>• Malignant catatonia is life-threatening and requires ICU-level care</li>
            <li>• Benzodiazepines (especially lorazepam) are first-line treatment</li>
            <li>• ECT is most effective treatment, especially for severe cases</li>
            <li>• Always investigate underlying cause (medical, psychiatric, substance)</li>
            <li>• Anti-NMDA receptor encephalitis should be considered in young patients</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
};

export default Catatonia;
