import { useState } from 'react';
import ModuleLayout from '../components/ModuleLayout';
import { FileText, ChevronRight, RotateCcw } from 'lucide-react';

interface CaseStep {
  question: string;
  options: {
    text: string;
    feedback: string;
    isCorrect?: boolean;
    next?: number;
  }[];
}

interface CaseScenario {
  id: string;
  title: string;
  category: string;
  presentation: string;
  steps: CaseStep[];
}

const cases: CaseScenario[] = [
  {
    id: 'case-1',
    title: 'Agitated Patient in ED',
    category: 'Agitation',
    presentation: 'A 32-year-old male is brought to the ED by police after causing a disturbance at a convenience store. He is pacing, shouting, and appears suspicious of staff. Vital signs: BP 145/92, HR 110, T 37.2°C, RR 20. Pupils are dilated.',
    steps: [
      {
        question: 'What is your first priority?',
        options: [
          {
            text: 'Administer haloperidol immediately',
            feedback: 'Not yet. Safety assessment and de-escalation should come first. You also need more information about potential substances.',
            next: 0
          },
          {
            text: 'Ensure safety and begin verbal de-escalation',
            feedback: 'Correct! Safety is always the first priority. Maintain adequate distance, ensure exit routes, and attempt calm, non-threatening communication.',
            isCorrect: true,
            next: 1
          },
          {
            text: 'Obtain detailed psychiatric history',
            feedback: 'Not practical when patient is agitated and potentially dangerous. Stabilize first, gather history later.',
            next: 0
          }
        ]
      },
      {
        question: 'The patient refuses to calm down and states "they\'re all trying to poison me." What should you consider?',
        options: [
          {
            text: 'This is clearly paranoid schizophrenia',
            feedback: 'Too early to diagnose. You must rule out medical and substance-induced causes first, especially given dilated pupils and tachycardia.',
            next: 1
          },
          {
            text: 'Order urine drug screen and consider stimulant intoxication',
            feedback: 'Excellent thinking! Dilated pupils, tachycardia, paranoia, and agitation are classic for stimulant intoxication (cocaine, methamphetamine). Medical workup is essential.',
            isCorrect: true,
            next: 2
          },
          {
            text: 'Apply physical restraints',
            feedback: 'Premature. You should exhaust verbal de-escalation and rule out medical causes. Restraints are a last resort.',
            next: 1
          }
        ]
      },
      {
        question: 'Urine drug screen returns positive for methamphetamine. Patient remains agitated. What is the best pharmacologic intervention?',
        options: [
          {
            text: 'Lorazepam (benzodiazepine)',
            feedback: 'Correct! Benzodiazepines are first-line for stimulant-induced agitation. They address both agitation and cardiovascular effects.',
            isCorrect: true,
            next: 3
          },
          {
            text: 'Haloperidol (typical antipsychotic)',
            feedback: 'Risky in stimulant intoxication - can lower seizure threshold. Benzodiazepines are safer and more effective.',
            next: 2
          },
          {
            text: 'Propranolol (beta-blocker)',
            feedback: 'Contraindicated! Beta-blockers can cause unopposed alpha-stimulation, worsening hypertension.',
            next: 2
          }
        ]
      },
      {
        question: 'After treatment, what disposition is most appropriate?',
        options: [
          {
            text: 'Discharge home once calm',
            feedback: 'Not safe yet. Patient needs observation for recurrent agitation (long half-life of methamphetamine) and assessment when sober.',
            next: 3
          },
          {
            text: 'Medical observation until sober, then psychiatric evaluation',
            feedback: 'Correct! Extended observation is needed. Once sober, assess for underlying psychiatric illness vs pure substance-induced psychosis. Provide substance use resources.',
            isCorrect: true,
            next: -1
          },
          {
            text: 'Immediate psychiatric admission',
            feedback: 'Premature. Need to determine if symptoms are substance-induced or represent primary psychiatric illness. Reassess when sober.',
            next: 3
          }
        ]
      }
    ]
  },
  {
    id: 'case-2',
    title: 'Confused Elderly Patient',
    category: 'Delirium',
    presentation: 'An 78-year-old woman with dementia is brought from nursing home for "acting strange." Normally pleasant, she is now confused, picking at her clothes, and doesn\'t recognize her daughter. Started 2 days ago. Vital signs: BP 118/72, HR 98, T 38.4°C, RR 22.',
    steps: [
      {
        question: 'What is the most likely diagnosis?',
        options: [
          {
            text: 'Worsening dementia',
            feedback: 'Unlikely. Dementia progresses slowly. Acute change suggests delirium superimposed on dementia.',
            next: 0
          },
          {
            text: 'Delirium (likely infectious cause given fever)',
            feedback: 'Correct! Acute onset, fluctuating course, and fever strongly suggest delirium. In elderly with dementia, infection is a common trigger.',
            isCorrect: true,
            next: 1
          },
          {
            text: 'Late-onset psychosis',
            feedback: 'Very unlikely with this presentation. Acute confusion with fever in elderly almost always indicates delirium.',
            next: 0
          }
        ]
      },
      {
        question: 'What is your diagnostic workup?',
        options: [
          {
            text: 'CT head only',
            feedback: 'Insufficient. While brain imaging may be needed, you must also look for systemic causes, especially infection.',
            next: 1
          },
          {
            text: 'Complete workup: CBC, CMP, UA with culture, CXR, consider blood cultures',
            feedback: 'Excellent! This covers the most common causes: UTI, pneumonia, sepsis. Urinalysis is especially important in elderly women.',
            isCorrect: true,
            next: 2
          },
          {
            text: 'Psychiatric evaluation',
            feedback: 'Not appropriate yet. This is a medical emergency requiring medical workup first.',
            next: 1
          }
        ]
      },
      {
        question: 'Urinalysis shows pyuria and bacteria. Diagnosis: UTI with delirium. Patient is trying to pull out IV. What is the best management approach?',
        options: [
          {
            text: 'Haloperidol 5mg IM',
            feedback: 'Dose is too high for elderly patient, and medication should be last resort. Try non-pharmacologic interventions first.',
            next: 2
          },
          {
            text: 'Non-pharmacologic: reorientation, family presence, treat infection',
            feedback: 'Correct! Treating the underlying infection is key. Family presence, gentle reorientation, and minimizing restraints are ideal. Medication only if necessary for safety.',
            isCorrect: true,
            next: -1
          },
          {
            text: 'Lorazepam for agitation',
            feedback: 'Avoid benzodiazepines in delirium (except alcohol/benzo withdrawal) - they can worsen confusion.',
            next: 2
          }
        ]
      }
    ]
  },
  {
    id: 'case-3',
    title: 'Suicidal Ideation',
    category: 'Suicide Risk',
    presentation: 'A 45-year-old man presents to ED stating "I can\'t take it anymore." Recently divorced, lost job, reports feeling hopeless. Endorses passive suicidal ideation. No prior attempts. Denies current plan. Lives alone.',
    steps: [
      {
        question: 'What is your initial approach?',
        options: [
          {
            text: 'Discharge with outpatient referral',
            feedback: 'Too hasty. Need more thorough assessment of risk factors, protective factors, and current intent.',
            next: 0
          },
          {
            text: 'Conduct comprehensive suicide risk assessment',
            feedback: 'Correct! Explore ideation frequency, plan, intent, means access, risk factors, protective factors, and prior attempts.',
            isCorrect: true,
            next: 1
          },
          {
            text: 'Immediate psychiatric admission',
            feedback: 'May not be necessary. Complete full assessment first to determine appropriate level of care.',
            next: 0
          }
        ]
      },
      {
        question: 'Further assessment reveals: daily SI for 2 weeks, no specific plan, has firearm at home, willing to engage in safety planning. What is the most concerning finding?',
        options: [
          {
            text: 'Access to firearm',
            feedback: 'Correct! Access to lethal means is a critical modifiable risk factor. This must be addressed immediately.',
            isCorrect: true,
            next: 2
          },
          {
            text: 'Recent divorce and job loss',
            feedback: 'These are significant stressors and risk factors, but access to lethal means is the most immediately dangerous.',
            next: 1
          },
          {
            text: 'Living alone',
            feedback: 'Concerning for lack of support, but access to firearms is more immediately dangerous.',
            next: 1
          }
        ]
      },
      {
        question: 'What is the most appropriate disposition?',
        options: [
          {
            text: 'Safety plan with firearm removal, outpatient follow-up in 2-3 days, emergency contacts',
            feedback: 'Correct! Patient has no active plan, willing to engage, and accept help. With means restriction and close follow-up, outpatient management is reasonable. Ensure firearm is removed before discharge.',
            isCorrect: true,
            next: -1
          },
          {
            text: 'Psychiatric hospitalization',
            feedback: 'May be overly restrictive if patient is cooperative and protective factors present. Consider least restrictive effective option.',
            next: 2
          },
          {
            text: 'Discharge with crisis hotline number only',
            feedback: 'Insufficient given multiple risk factors. Needs concrete safety plan, means restriction, and definite follow-up.',
            next: 2
          }
        ]
      }
    ]
  }
];

const Cases = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentCase = cases.find(c => c.id === selectedCase);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null || !currentCase) return;

    const nextStep = currentCase.steps[currentStep].options[selectedOption].next;

    if (nextStep === -1) {
      // Case complete
      setCurrentStep(0);
      setSelectedOption(null);
      setSelectedCase(null);
    } else if (nextStep !== undefined) {
      setCurrentStep(nextStep);
      setSelectedOption(null);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedOption(null);
  };

  const handleBackToCases = () => {
    setSelectedCase(null);
    setCurrentStep(0);
    setSelectedOption(null);
  };

  if (!selectedCase) {
    return (
      <ModuleLayout
        title="Interactive Cases"
        description="Practice clinical reasoning with branching case scenarios"
      >
        <div className="space-y-6">
          <div className="card bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
            <h3 className="font-semibold mb-2">How It Works</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              These interactive cases present realistic psychiatric emergencies. You'll make decisions
              and receive immediate feedback. Cases branch based on your choices, simulating real clinical reasoning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cases.map(caseItem => (
              <button
                key={caseItem.id}
                onClick={() => setSelectedCase(caseItem.id)}
                className="card hover:shadow-lg transition-shadow text-left group"
              >
                <div className="flex items-start justify-between mb-3">
                  <FileText className="text-primary-500" size={24} />
                  <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs">
                    {caseItem.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{caseItem.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {caseItem.presentation}
                </p>
                <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 text-sm group-hover:gap-2 transition-all">
                  Start Case <ChevronRight size={16} />
                </div>
              </button>
            ))}
          </div>

          <div className="card bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> These cases are for educational purposes only and should not replace
              clinical judgment or formal training.
            </p>
          </div>
        </div>
      </ModuleLayout>
    );
  }

  if (!currentCase) {
    return null;
  }

  return (
    <ModuleLayout
      title={currentCase.title}
      description={currentCase.category}
    >
      <div className="space-y-6">
        {/* Presentation */}
        {currentStep === 0 && selectedOption === null && (
          <div className="card bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
            <h3 className="font-semibold mb-2">Case Presentation</h3>
            <p className="text-gray-700 dark:text-gray-300">{currentCase.presentation}</p>
          </div>
        )}

        {/* Current Question */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">
              Step {currentStep + 1} of {currentCase.steps.length}
            </h3>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          <p className="text-gray-800 dark:text-gray-200 mb-4 font-medium">
            {currentCase.steps[currentStep].question}
          </p>

          <div className="space-y-3">
            {currentCase.steps[currentStep].options.map((option, index) => (
              <div key={index}>
                <button
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedOption === index
                      ? option.isCorrect
                        ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                        : 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-transparent'
                  }`}
                  disabled={selectedOption !== null}
                >
                  {option.text}
                </button>

                {selectedOption === index && (
                  <div className={`mt-2 p-4 rounded-lg ${
                    option.isCorrect
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'bg-red-50 dark:bg-red-900/20'
                  }`}>
                    <p className={`text-sm ${
                      option.isCorrect
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {option.feedback}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedOption !== null && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleNext}
                className="btn-primary"
              >
                {currentCase.steps[currentStep].options[selectedOption].next === -1
                  ? 'Complete Case'
                  : 'Continue'}
              </button>
              <button
                onClick={handleBackToCases}
                className="btn-secondary"
              >
                Back to Cases
              </button>
            </div>
          )}
        </div>
      </div>
    </ModuleLayout>
  );
};

export default Cases;
