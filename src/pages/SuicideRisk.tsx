import { useState } from 'react';
import ModuleLayout from '../components/ModuleLayout';
import { AlertTriangle, Shield, CheckCircle } from 'lucide-react';

const SuicideRisk = () => {
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);

  const riskFactors = [
    'Previous suicide attempt',
    'Active suicidal ideation with plan',
    'Access to lethal means',
    'Recent significant loss',
    'Substance use disorder',
    'Psychiatric diagnosis',
    'Social isolation',
    'Chronic pain or medical illness',
    'Impulsivity',
    'Recent discharge from psychiatric care'
  ];

  const protectiveFactors = [
    'Strong social support',
    'Engagement in treatment',
    'Sense of responsibility to family',
    'Religious or cultural beliefs',
    'Problem-solving skills',
    'Future orientation'
  ];

  const toggleFactor = (factor: string) => {
    setSelectedFactors(prev =>
      prev.includes(factor)
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  const getRiskLevel = () => {
    const riskCount = selectedFactors.filter(f => riskFactors.includes(f)).length;
    if (riskCount >= 5) return { level: 'High', color: 'text-red-600 dark:text-red-400' };
    if (riskCount >= 3) return { level: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400' };
    return { level: 'Lower', color: 'text-green-600 dark:text-green-400' };
  };

  const risk = getRiskLevel();

  return (
    <ModuleLayout
      title="Suicide & Homicide Risk Assessment"
      description="Structured approach to evaluating risk and implementing safety measures"
    >
      <div className="space-y-6">
        {/* Overview */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Suicide risk assessment requires systematic evaluation of risk factors, protective factors,
            and current mental state. The goal is to determine immediate safety needs and appropriate level of care.
          </p>
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-4">
            <p className="font-semibold text-red-800 dark:text-red-200">
              High-Risk Indicators Requiring Immediate Action:
            </p>
            <ul className="list-disc list-inside mt-2 text-red-700 dark:text-red-300 space-y-1">
              <li>Active suicidal ideation with specific plan and intent</li>
              <li>Recent attempt with high lethality</li>
              <li>Access to lethal means</li>
              <li>Severe hopelessness or psychosis</li>
              <li>Agitation with impulsivity</li>
            </ul>
          </div>
        </div>

        {/* Interactive Risk Calculator */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-orange-500" />
            Interactive Risk Assessment Tool
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Educational tool only - not for clinical decision-making
          </p>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-500" />
              Risk Factors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {riskFactors.map(factor => (
                <button
                  key={factor}
                  onClick={() => toggleFactor(factor)}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    selectedFactors.includes(factor)
                      ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500'
                      : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent'
                  }`}
                >
                  {factor}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Shield size={20} className="text-green-500" />
              Protective Factors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {protectiveFactors.map(factor => (
                <button
                  key={factor}
                  onClick={() => toggleFactor(factor)}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    selectedFactors.includes(factor)
                      ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                      : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent'
                  }`}
                >
                  {factor}
                </button>
              ))}
            </div>
          </div>

          {selectedFactors.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="font-semibold mb-2">
                Educational Risk Category: <span className={risk.color}>{risk.level}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This educational tool is for learning purposes only and should not replace clinical judgment.
              </p>
            </div>
          )}
        </div>

        {/* Safety Measures */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Safety Measures</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={20} />
                Environmental Precautions
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-6">
                <li>Remove access to lethal means (firearms, medications, ligatures)</li>
                <li>Continuous observation if high risk</li>
                <li>Safe room without hazardous objects</li>
                <li>Close monitoring during transitions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Safety Planning Components</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-6">
                <li>Warning signs recognition</li>
                <li>Internal coping strategies</li>
                <li>Social contacts for distraction</li>
                <li>Family members for support</li>
                <li>Professional contacts and crisis numbers</li>
                <li>Means restriction</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disposition */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Disposition Considerations</h2>
          <div className="space-y-3">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Inpatient Psychiatric Care
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                High risk, unable to maintain safety, lacks support, impaired decision-making capacity
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Intensive Outpatient or Partial Hospitalization
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Moderate risk, some support, able to contract for safety, requires close follow-up
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Outpatient with Safety Plan
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Lower risk, good support, engaged in treatment, protective factors present
              </p>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="card bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600">
          <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Risk assessment is continuous, not a single-time evaluation</li>
            <li>• Direct questioning about suicidal thoughts does not increase risk</li>
            <li>• Access to lethal means is a critical modifiable risk factor</li>
            <li>• Collaborative safety planning is more effective than "no-harm contracts"</li>
            <li>• Capacity to refuse treatment must be carefully evaluated in high-risk situations</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
};

export default SuicideRisk;
