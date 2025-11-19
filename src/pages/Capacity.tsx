import ModuleLayout from '../components/ModuleLayout';
import { AlertCircle, Scale, FileText, Brain } from 'lucide-react';

const Capacity = () => {
  return (
    <ModuleLayout
      title="Capacity Assessment & Disposition"
      description="Decision-making capacity evaluation and emergency psychiatric disposition"
    >
      <div className="space-y-6">
        {/* Overview */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Capacity assessment determines whether a patient can make informed decisions about their treatment.
            It is decision-specific, can fluctuate, and is distinct from competency (a legal determination).
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4">
            <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Important Distinctions:
            </p>
            <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-1">
              <li><strong>Capacity:</strong> Clinical assessment by physician; decision-specific</li>
              <li><strong>Competency:</strong> Legal determination by court; global status</li>
              <li><strong>Voluntary:</strong> Patient agrees to treatment</li>
              <li><strong>Involuntary:</strong> Treatment over objection (requires legal process)</li>
            </ul>
          </div>
        </div>

        {/* Four Elements of Capacity */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="text-purple-500" />
            Four Elements of Decision-Making Capacity
          </h2>
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-600">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white font-semibold">
                  1
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    Understanding
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                    Can the patient understand the information provided about their condition and treatment options?
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 italic">
                    Ask: "Can you tell me in your own words what I just explained about your condition?"
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-600">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-semibold">
                  2
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Appreciation
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                    Can the patient appreciate how this information applies to their specific situation?
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 italic">
                    Ask: "What do you believe is wrong with you? Do you think treatment could help you?"
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-600">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-semibold">
                  3
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Reasoning
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                    Can the patient reason through the risks and benefits to arrive at a decision?
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 italic">
                    Ask: "How did you decide on this option? What makes this choice better for you than the alternatives?"
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-600">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-semibold">
                  4
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                    Expressing a Choice
                  </h3>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                    Can the patient clearly communicate a consistent choice?
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 italic">
                    Ask: "What have you decided? Can you tell me your choice again?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sliding Scale */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Scale className="text-blue-500" />
            Sliding Scale of Capacity
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The threshold for capacity varies based on the risk-benefit ratio of the decision:
          </p>
          <div className="space-y-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Low-Risk, High-Benefit Decision → Lower threshold for capacity
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Example: Accepting antibiotics for bacterial infection. Even minimal understanding may suffice.
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Balanced Risk-Benefit → Moderate threshold
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Example: Elective surgery with standard risks. Requires good understanding and reasoning.
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                High-Risk or Refusing Life-Saving Treatment → Higher threshold
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                Example: Refusing treatment for life-threatening condition. Requires excellent understanding,
                appreciation, and reasoning.
              </p>
            </div>
          </div>
        </div>

        {/* Factors Impairing Capacity */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="text-orange-500" />
            Common Factors Impairing Capacity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Medical</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Delirium</li>
                <li>• Dementia</li>
                <li>• Intellectual disability</li>
                <li>• Traumatic brain injury</li>
                <li>• Stroke</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Psychiatric</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Psychosis</li>
                <li>• Severe depression</li>
                <li>• Mania</li>
                <li>• Severe anxiety</li>
                <li>• Anorexia nervosa</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Substance-Related</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Intoxication</li>
                <li>• Withdrawal</li>
                <li>• Substance-induced psychosis</li>
                <li>• Chronic use effects</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> Having a psychiatric diagnosis does NOT automatically mean lack of capacity.
              Each decision must be assessed individually.
            </p>
          </div>
        </div>

        {/* Disposition */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="text-green-500" />
            Emergency Psychiatric Disposition
          </h2>
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-600">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Inpatient Psychiatric Hospitalization
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-2">Indications:</p>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1 ml-4">
                <li>• Imminent danger to self or others</li>
                <li>• Grave disability (unable to care for basic needs)</li>
                <li>• Psychosis with impaired safety awareness</li>
                <li>• Severe mood disorder with suicidal ideation</li>
                <li>• Need for medication stabilization with close monitoring</li>
                <li>• Failed outpatient treatment with clinical deterioration</li>
              </ul>
              <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 rounded">
                <p className="text-xs text-red-800 dark:text-red-200">
                  <strong>Voluntary vs Involuntary:</strong> If patient has capacity and accepts admission → voluntary.
                  If patient lacks capacity or refuses despite meeting criteria → involuntary hold may be necessary
                  (specific laws vary by jurisdiction).
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-600">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Partial Hospitalization / Intensive Outpatient
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">Indications:</p>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 ml-4">
                <li>• Moderate symptoms requiring intensive treatment</li>
                <li>• Step-down from inpatient care</li>
                <li>• Supportive home environment</li>
                <li>• No immediate safety concerns</li>
                <li>• Able to contract for safety</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-600">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Outpatient Treatment
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300 mb-2">Indications:</p>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1 ml-4">
                <li>• Stable symptoms</li>
                <li>• No acute safety concerns</li>
                <li>• Good insight and treatment engagement</li>
                <li>• Adequate support system</li>
                <li>• Reliable follow-up planned (within 1-7 days for higher acuity)</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-600">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Medical Hospitalization with Psychiatry Consult
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">When:</p>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 ml-4">
                <li>• Active medical issues requiring hospitalization</li>
                <li>• Delirium (treat medical cause)</li>
                <li>• Severe substance withdrawal</li>
                <li>• Psychiatric symptoms secondary to medical condition</li>
                <li>• Medically unstable (unable to clear for psychiatric transfer)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Involuntary Hold Basics */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Involuntary Evaluation (Educational Overview)</h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 p-4 mb-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Important:</strong> Specific laws vary significantly by state/country. This is a general
              educational overview only, not legal guidance.
            </p>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Typical Criteria (General):</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Danger to self (suicidal, self-harm)</li>
                <li>• Danger to others (homicidal, violent)</li>
                <li>• Grave disability (unable to provide food, shelter, clothing for self)</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Typical Process:</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>1. Emergency evaluation (ED physician, psychiatrist)</li>
                <li>2. Involuntary hold placed (usually 24-72 hours initially)</li>
                <li>3. Transfer to psychiatric facility</li>
                <li>4. Psychiatric evaluation within specified timeframe</li>
                <li>5. Court hearing if extended hold needed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="card bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600">
          <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Capacity is decision-specific and can fluctuate</li>
            <li>• Assess all four elements: Understanding, Appreciation, Reasoning, Expressing Choice</li>
            <li>• Threshold for capacity varies with risk-benefit ratio of decision</li>
            <li>• Having psychiatric diagnosis ≠ lacking capacity</li>
            <li>• Document capacity assessment thoroughly in medical record</li>
            <li>• Involuntary treatment requires meeting specific legal criteria</li>
            <li>• Safety concerns may necessitate treatment over objection with proper legal process</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
};

export default Capacity;
