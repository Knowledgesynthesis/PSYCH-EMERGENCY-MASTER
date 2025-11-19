import { useState } from 'react';
import ModuleLayout from '../components/ModuleLayout';
import { Search } from 'lucide-react';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Akathisia',
    definition: 'A movement disorder characterized by a feeling of inner restlessness and inability to stay still. Common side effect of antipsychotic medications.',
    category: 'Medications'
  },
  {
    term: 'Capacity',
    definition: 'Clinical assessment of a patient\'s ability to make a specific medical decision. Decision-specific and can fluctuate.',
    category: 'Legal/Ethics'
  },
  {
    term: 'Catatonia',
    definition: 'A neuropsychiatric syndrome characterized by motor, behavioral, and autonomic abnormalities. Can be hypokinetic (stupor) or hyperkinetic (excited).',
    category: 'Syndromes'
  },
  {
    term: 'CIWA-Ar',
    definition: 'Clinical Institute Withdrawal Assessment for Alcohol - Revised. A scoring system used to assess severity of alcohol withdrawal and guide benzodiazepine dosing.',
    category: 'Assessment Tools'
  },
  {
    term: 'Clonus',
    definition: 'Rhythmic, involuntary muscle contractions induced by sudden passive stretch. Key feature of serotonin syndrome.',
    category: 'Physical Exam'
  },
  {
    term: 'Command Hallucinations',
    definition: 'Auditory hallucinations that order or command the person to perform specific acts, especially concerning when violent.',
    category: 'Symptoms'
  },
  {
    term: 'Competency',
    definition: 'Legal determination by a court of a person\'s global ability to make decisions. Distinct from capacity (clinical assessment).',
    category: 'Legal/Ethics'
  },
  {
    term: 'Delirium',
    definition: 'Acute, fluctuating disturbance in attention and awareness, typically caused by an underlying medical condition. Medical emergency.',
    category: 'Diagnoses'
  },
  {
    term: 'Delirium Tremens (DTs)',
    definition: 'Severe form of alcohol withdrawal characterized by confusion, autonomic hyperactivity, hallucinations, and altered mental status. Life-threatening.',
    category: 'Syndromes'
  },
  {
    term: 'Dystonia',
    definition: 'Sustained muscle contractions causing twisting and repetitive movements or abnormal postures. Acute dystonia is an extrapyramidal side effect of antipsychotics.',
    category: 'Medications'
  },
  {
    term: 'Echolalia',
    definition: 'Repetition of another person\'s spoken words. Can be seen in catatonia and autism spectrum disorders.',
    category: 'Symptoms'
  },
  {
    term: 'Echopraxia',
    definition: 'Automatic imitation or repetition of another person\'s actions. Associated with catatonia.',
    category: 'Symptoms'
  },
  {
    term: 'Extrapyramidal Symptoms (EPS)',
    definition: 'Movement disorders caused by antipsychotic medications, including dystonia, akathisia, parkinsonism, and tardive dyskinesia.',
    category: 'Medications'
  },
  {
    term: 'Flight of Ideas',
    definition: 'Rapid shifting from one idea to another with loose associations. Common in mania.',
    category: 'Symptoms'
  },
  {
    term: 'Grave Disability',
    definition: 'Inability to provide for basic needs (food, clothing, shelter) due to mental illness. One criterion for involuntary hospitalization.',
    category: 'Legal/Ethics'
  },
  {
    term: 'Hyperreflexia',
    definition: 'Overactive or overresponsive reflexes. Key distinguishing feature of serotonin syndrome.',
    category: 'Physical Exam'
  },
  {
    term: 'Involuntary Hold',
    definition: 'Legal process allowing psychiatric hospitalization without patient consent when specific criteria are met (danger to self/others, grave disability).',
    category: 'Legal/Ethics'
  },
  {
    term: 'Lead-Pipe Rigidity',
    definition: 'Uniform, constant resistance to passive movement of a limb. Characteristic of neuroleptic malignant syndrome and parkinsonism.',
    category: 'Physical Exam'
  },
  {
    term: 'Malignant Catatonia',
    definition: 'Life-threatening form of catatonia with fever, autonomic instability, and elevated CK. Medical emergency requiring ICU care.',
    category: 'Syndromes'
  },
  {
    term: 'Neuroleptic Malignant Syndrome (NMS)',
    definition: 'Life-threatening reaction to antipsychotic medications characterized by fever, rigidity, altered mental status, and autonomic instability.',
    category: 'Syndromes'
  },
  {
    term: 'Pressured Speech',
    definition: 'Rapid, urgent speech that is difficult to interrupt. Common in mania.',
    category: 'Symptoms'
  },
  {
    term: 'Psychomotor Agitation',
    definition: 'Excessive motor activity associated with mental tension, such as pacing, hand-wringing, or inability to sit still.',
    category: 'Symptoms'
  },
  {
    term: 'Psychomotor Retardation',
    definition: 'Slowing of thought processes and physical movements. Common in severe depression.',
    category: 'Symptoms'
  },
  {
    term: 'Rapid Tranquilization',
    definition: 'Use of medications to quickly calm an agitated or violent patient in emergency settings.',
    category: 'Treatment'
  },
  {
    term: 'Rhabdomyolysis',
    definition: 'Breakdown of muscle tissue releasing myoglobin into bloodstream. Can cause kidney damage. Associated with NMS and malignant catatonia.',
    category: 'Medical Complications'
  },
  {
    term: 'Safety Planning',
    definition: 'Collaborative process to identify warning signs, coping strategies, and resources for patients at risk of suicide.',
    category: 'Treatment'
  },
  {
    term: 'Serotonin Syndrome',
    definition: 'Potentially life-threatening condition caused by excessive serotonergic activity. Features include hyperreflexia, clonus, agitation, and hyperthermia.',
    category: 'Syndromes'
  },
  {
    term: 'Stupor',
    definition: 'Near-complete absence of psychomotor activity and responsiveness to stimuli. Seen in severe depression, catatonia, and medical conditions.',
    category: 'Symptoms'
  },
  {
    term: 'Tardive Dyskinesia',
    definition: 'Late-onset movement disorder caused by long-term antipsychotic use, characterized by repetitive, involuntary movements (often of face and tongue).',
    category: 'Medications'
  },
  {
    term: 'Vegetative Symptoms',
    definition: 'Physical symptoms of depression including sleep disturbance, appetite changes, low energy, and psychomotor changes.',
    category: 'Symptoms'
  },
  {
    term: 'Waxy Flexibility',
    definition: 'Slight, even resistance to positioning by examiner, with limb maintaining position. Classic sign of catatonia.',
    category: 'Physical Exam'
  }
];

const categories = Array.from(new Set(glossaryTerms.map(t => t.category))).sort();

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTerms = glossaryTerms
    .filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <ModuleLayout
      title="Glossary"
      description="Essential psychiatric emergency terminology"
    >
      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="card">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search terms or definitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All ({glossaryTerms.length})
              </button>
              {categories.map(category => {
                const count = glossaryTerms.filter(t => t.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredTerms.length} of {glossaryTerms.length} terms
        </div>

        {/* Terms List */}
        {filteredTerms.length > 0 ? (
          <div className="space-y-4">
            {filteredTerms.map((item, index) => (
              <div key={index} className="card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                      {item.term}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {item.definition}
                    </p>
                    <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No terms found matching your search.
            </p>
          </div>
        )}
      </div>
    </ModuleLayout>
  );
};

export default Glossary;
