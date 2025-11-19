import { useState } from 'react';
import ModuleLayout from '../components/ModuleLayout';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  rationale: string;
  category: string;
}

const questions: Question[] = [
  {
    id: 'q1',
    question: 'A 28-year-old man presents with fever, rigidity, confusion, and elevated CK after starting haloperidol 3 days ago. Reflexes are decreased. What is the most likely diagnosis?',
    options: [
      'Serotonin syndrome',
      'Neuroleptic malignant syndrome',
      'Malignant hyperthermia',
      'Catatonia'
    ],
    correctAnswer: 1,
    rationale: 'Neuroleptic malignant syndrome (NMS) is characterized by fever, rigidity, altered mental status, and autonomic instability after antipsychotic exposure. The decreased reflexes and lead-pipe rigidity distinguish it from serotonin syndrome (which has hyperreflexia and clonus). The elevated CK suggests rhabdomyolysis.',
    category: 'Serotonin vs NMS'
  },
  {
    id: 'q2',
    question: 'Which of the following is the KEY differentiating feature between delirium and primary psychosis?',
    options: [
      'Presence of hallucinations',
      'Fluctuating attention and consciousness',
      'Agitation',
      'Bizarre behavior'
    ],
    correctAnswer: 1,
    rationale: 'Fluctuating attention and altered level of consciousness are hallmark features of delirium. While both delirium and psychosis can present with hallucinations, agitation, and bizarre behavior, impaired attention is specific to delirium.',
    category: 'Delirium'
  },
  {
    id: 'q3',
    question: 'A 19-year-old college student presents with paranoia, agitation, dilated pupils, and tachycardia. He admits to using "something at a party." What is the most appropriate initial pharmacologic management?',
    options: [
      'Haloperidol',
      'Lorazepam',
      'Propranolol',
      'Fluoxetine'
    ],
    correctAnswer: 1,
    rationale: 'The presentation is consistent with stimulant intoxication (likely cocaine or methamphetamine). Benzodiazepines (lorazepam) are first-line treatment for stimulant-induced agitation and help manage both psychiatric and cardiovascular symptoms. Antipsychotics can lower seizure threshold, and beta-blockers can cause unopposed alpha-stimulation.',
    category: 'Substances'
  },
  {
    id: 'q4',
    question: 'Which of the following is the MOST modifiable risk factor for suicide?',
    options: [
      'History of previous attempt',
      'Access to lethal means',
      'Psychiatric diagnosis',
      'Male gender'
    ],
    correctAnswer: 1,
    rationale: 'Access to lethal means is the most modifiable risk factor. Removing firearms, medications, or other means from the environment is a concrete intervention that can significantly reduce suicide risk. While other factors are important, they are less immediately changeable.',
    category: 'Suicide Risk'
  },
  {
    id: 'q5',
    question: 'A patient with mania is refusing all medications and wants to leave the hospital to "start my billion-dollar company." He has spent his life savings and maxed out credit cards in the past week. What capacity element is MOST clearly impaired?',
    options: [
      'Understanding',
      'Appreciation',
      'Reasoning',
      'Expressing a choice'
    ],
    correctAnswer: 1,
    rationale: 'Appreciation is impaired - the patient cannot recognize that he is ill or that the grandiose beliefs are symptoms of mania affecting his judgment. He may understand the information provided (Understanding) and express a clear choice, but he cannot appreciate how his illness applies to his situation.',
    category: 'Capacity'
  },
  {
    id: 'q6',
    question: 'A 75-year-old woman with dementia becomes acutely confused and agitated. Urinalysis shows infection. What is the FIRST-LINE management for her agitation?',
    options: [
      'Haloperidol 5mg IM',
      'Lorazepam 2mg IV',
      'Treat infection and use non-pharmacologic interventions',
      'Physical restraints'
    ],
    correctAnswer: 2,
    rationale: 'Non-pharmacologic interventions (reorientation, family presence, minimizing stimulation) plus treating the underlying cause (UTI) are first-line for delirium. Medications should be used sparingly and only when necessary for safety. Benzodiazepines can worsen delirium (except in alcohol/benzo withdrawal).',
    category: 'Delirium'
  },
  {
    id: 'q7',
    question: 'A patient presents 18 hours after last alcohol use with tremor, anxiety, and mild tachycardia. CIWA-Ar score is 12. What is the most appropriate management?',
    options: [
      'Observation only',
      'Benzodiazepines per symptom-triggered protocol',
      'Antipsychotics',
      'Discharge with outpatient follow-up'
    ],
    correctAnswer: 1,
    rationale: 'Benzodiazepines are first-line treatment for alcohol withdrawal. A CIWA-Ar score of 12 indicates moderate withdrawal requiring treatment. Symptom-triggered protocols are effective and minimize total benzodiazepine exposure. The patient is at risk for progression to severe withdrawal or seizures.',
    category: 'Substances'
  },
  {
    id: 'q8',
    question: 'Which feature is most characteristic of catatonia?',
    options: [
      'Visual hallucinations',
      'Waxy flexibility',
      'Flight of ideas',
      'Hyperreflexia'
    ],
    correctAnswer: 1,
    rationale: 'Waxy flexibility (slight resistance to positioning by examiner) is a classic motor sign of catatonia. Visual hallucinations suggest delirium or other conditions, flight of ideas suggests mania, and hyperreflexia suggests serotonin syndrome.',
    category: 'Catatonia'
  },
  {
    id: 'q9',
    question: 'What is the first-line treatment for catatonia?',
    options: [
      'Antipsychotics',
      'Benzodiazepines (lorazepam)',
      'ECT',
      'Supportive care only'
    ],
    correctAnswer: 1,
    rationale: 'Benzodiazepines, particularly lorazepam, are first-line treatment for catatonia. The "lorazepam challenge" (improvement after 1-2mg lorazepam) can help confirm the diagnosis. ECT is the most effective treatment but is typically reserved for severe cases or when benzodiazepines fail.',
    category: 'Catatonia'
  },
  {
    id: 'q10',
    question: 'A patient on fluoxetine is started on tramadol for pain. 6 hours later, develops agitation, tremor, hyperreflexia, and clonus. Temperature is 38.9°C. What is the most likely diagnosis?',
    options: [
      'Neuroleptic malignant syndrome',
      'Serotonin syndrome',
      'Anticholinergic toxicity',
      'Malignant hyperthermia'
    ],
    correctAnswer: 1,
    rationale: 'Serotonin syndrome occurs with combination of serotonergic agents (SSRI + tramadol, which has serotonergic properties). Key features include hyperreflexia, clonus, agitation, and rapid onset (hours). Treatment is stopping offending agents, supportive care, and benzodiazepines. Consider cyproheptadine for severe cases.',
    category: 'Serotonin vs NMS'
  },
  {
    id: 'q11',
    question: 'In verbal de-escalation, what is the most important initial step?',
    options: [
      'Set firm limits on behavior',
      'Ensure safety and maintain adequate distance',
      'Explain consequences of continued agitation',
      'Offer medications'
    ],
    correctAnswer: 1,
    rationale: 'Safety is always the first priority. Before attempting de-escalation, ensure you have adequate distance, a clear exit path, and backup available if needed. Only after safety is established should you proceed with verbal de-escalation techniques.',
    category: 'Agitation'
  },
  {
    id: 'q12',
    question: 'A first-episode psychosis patient requires medical workup. Which test is LEAST likely to be helpful?',
    options: [
      'Urine drug screen',
      'Thyroid function tests',
      'Vitamin B12 level',
      'Genetic testing for schizophrenia'
    ],
    correctAnswer: 3,
    rationale: 'Genetic testing for schizophrenia is not clinically useful - there is no single gene test for schizophrenia. The other tests help rule out medical causes of psychosis: substance-induced (urine drug screen), thyroid disorder, and B12 deficiency.',
    category: 'Psychosis'
  }
];

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(selectedAnswers).forEach(([questionIndex, answerIndex]) => {
      if (questions[parseInt(questionIndex)].correctAnswer === answerIndex) {
        correct++;
      }
    });
    return correct;
  };

  const currentQ = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isAnswered = selectedAnswer !== undefined;

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <ModuleLayout
        title="Assessment Results"
        description="Review your performance"
      >
        <div className="space-y-6">
          <div className="card">
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-4 ${
                percentage >= 80
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : percentage >= 60
                  ? 'bg-yellow-100 dark:bg-yellow-900/30'
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                <span className={`text-4xl font-bold ${
                  percentage >= 80
                    ? 'text-green-700 dark:text-green-300'
                    : percentage >= 60
                    ? 'text-yellow-700 dark:text-yellow-300'
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {percentage}%
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                You scored {score} out of {questions.length}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {percentage >= 80
                  ? 'Excellent work! You have a strong understanding of psychiatric emergencies.'
                  : percentage >= 60
                  ? 'Good effort! Review the missed questions to strengthen your knowledge.'
                  : 'Keep studying! Review the modules and try again.'}
              </p>
            </div>

            <button onClick={handleReset} className="btn-primary w-full">
              Try Again
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Review Questions</h3>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div key={q.id} className="card">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    ) : (
                      <XCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold mb-2">Question {index + 1}</p>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-2 rounded ${
                              optIndex === q.correctAnswer
                                ? 'bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500'
                                : optIndex === userAnswer
                                ? 'bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500'
                                : 'bg-gray-50 dark:bg-gray-700/50'
                            }`}
                          >
                            <span className="text-sm">{option}</span>
                            {optIndex === q.correctAnswer && (
                              <span className="ml-2 text-xs text-green-700 dark:text-green-300 font-semibold">
                                ✓ Correct answer
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Rationale:</strong> {q.rationale}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ModuleLayout>
    );
  }

  return (
    <ModuleLayout
      title="Assessment"
      description="Test your knowledge of psychiatric emergencies"
    >
      <div className="space-y-6">
        <div className="card bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Instructions:</strong> Answer all questions to the best of your ability.
            You'll receive immediate feedback and detailed rationales at the end.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
              {currentQ.category}
            </span>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>

          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  selectedAnswer === index
                    ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                    selectedAnswer === index
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : 'border-gray-400 dark:border-gray-500'
                  }`}>
                    {selectedAnswer === index && '✓'}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {!isAnswered && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-6">
              <HelpCircle className="text-yellow-600" size={20} />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Please select an answer to continue
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>

        <div className="card bg-gray-50 dark:bg-gray-800">
          <h3 className="font-semibold mb-2">Progress</h3>
          <div className="flex gap-2 flex-wrap">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded flex items-center justify-center text-sm ${
                  selectedAnswers[index] !== undefined
                    ? 'bg-primary-500 text-white'
                    : index === currentQuestion
                    ? 'bg-primary-200 dark:bg-primary-800 text-primary-900 dark:text-primary-100'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
};

export default Assessment;
