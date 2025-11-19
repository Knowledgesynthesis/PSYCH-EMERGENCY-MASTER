import { Link } from 'react-router-dom';
import {
  Heart,
  Zap,
  Pill,
  Brain,
  TrendingUp,
  Users,
  Thermometer,
  Activity,
  AlertCircle
} from 'lucide-react';

const modules = [
  {
    id: 'suicide-risk',
    title: 'Suicide & Homicide Risk',
    description: 'Risk assessment, safety planning, and emergency evaluation',
    icon: Heart,
    color: 'bg-red-500',
    path: '/suicide-risk'
  },
  {
    id: 'agitation',
    title: 'Acute Agitation',
    description: 'De-escalation, etiology, and emergency management',
    icon: Zap,
    color: 'bg-orange-500',
    path: '/agitation'
  },
  {
    id: 'substances',
    title: 'Substance Emergencies',
    description: 'Intoxication, withdrawal, and overdose management',
    icon: Pill,
    color: 'bg-yellow-500',
    path: '/substances'
  },
  {
    id: 'psychosis',
    title: 'Psychosis & Mania',
    description: 'Danger assessment and acute stabilization',
    icon: Brain,
    color: 'bg-purple-500',
    path: '/psychosis'
  },
  {
    id: 'mania',
    title: 'Severe Mania',
    description: 'Mania with impaired judgment requiring inpatient care',
    icon: TrendingUp,
    color: 'bg-pink-500',
    path: '/mania'
  },
  {
    id: 'catatonia',
    title: 'Catatonia & Depression',
    description: 'Recognition and initial management',
    icon: Users,
    color: 'bg-blue-500',
    path: '/catatonia'
  },
  {
    id: 'serotonin-nms',
    title: 'Serotonin Syndrome vs NMS',
    description: 'Differentiation and emergency response',
    icon: Thermometer,
    color: 'bg-green-500',
    path: '/serotonin-nms'
  },
  {
    id: 'delirium',
    title: 'Delirium vs Psychosis',
    description: 'Medical differentiation and workup',
    icon: Activity,
    color: 'bg-cyan-500',
    path: '/delirium'
  },
  {
    id: 'capacity',
    title: 'Capacity & Disposition',
    description: 'Decision-making assessment and emergency placement',
    icon: AlertCircle,
    color: 'bg-indigo-500',
    path: '/capacity'
  }
];

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-64">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Psych Emergency Master
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Interactive psychiatric emergency education for rapid recognition, safety assessment,
          and evidence-based management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {modules.map((module) => (
          <Link
            key={module.id}
            to={module.path}
            className="card hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-start gap-4">
              <div className={`${module.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                <module.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {module.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/cases" className="card hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-xl mb-2">Interactive Cases</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Practice with realistic clinical scenarios and branching decision paths
          </p>
        </Link>
        <Link to="/assessment" className="card hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-xl mb-2">Assessment</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Test your knowledge with case vignettes and MCQs
          </p>
        </Link>
      </div>

      <div className="mt-8 card bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600">
        <h3 className="font-semibold text-lg mb-2">Key Emergency Framework</h3>
        <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
          <li>Safety first - identify immediate threats</li>
          <li>Determine medical vs psychiatric etiology</li>
          <li>Evaluate for intoxication/withdrawal</li>
          <li>Stabilize agitation</li>
          <li>Assess decision-making capacity</li>
          <li>Determine appropriate disposition</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
