import ModuleLayout from '../components/ModuleLayout';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Info, Shield } from 'lucide-react';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ModuleLayout
      title="Settings"
      description="App preferences and information"
    >
      <div className="space-y-6">
        {/* Theme Toggle */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
            Appearance
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Choose your preferred color scheme
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                theme === 'light'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <Sun className="mx-auto mb-2" size={32} />
              <p className="font-semibold">Light Mode</p>
            </button>
            <button
              onClick={() => theme === 'light' && toggleTheme()}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                theme === 'dark'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <Moon className="mx-auto mb-2" size={32} />
              <p className="font-semibold">Dark Mode</p>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Info size={24} />
            About Psych Emergency Master
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Psych Emergency Master</strong> is an interactive educational application designed
              to teach rapid recognition, safety assessment, and evidence-based management of psychiatric emergencies.
            </p>

            <div>
              <h3 className="font-semibold mb-2">Target Audience</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Medical students (MS3 and above)</li>
                <li>Psychiatry residents</li>
                <li>Emergency medicine residents</li>
                <li>Internal medicine residents</li>
                <li>Frontline clinicians in emergency and inpatient settings</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Core Topics</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Suicide and homicide risk assessment</li>
                <li>Acute agitation and behavioral emergencies</li>
                <li>Substance-related crises (intoxication and withdrawal)</li>
                <li>Psychosis and mania with danger</li>
                <li>Catatonia and severe depression</li>
                <li>Serotonin syndrome vs neuroleptic malignant syndrome</li>
                <li>Delirium differentiation from primary psychosis</li>
                <li>Capacity assessment and disposition decisions</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Interactive educational modules with clinical frameworks</li>
                <li>Branching case scenarios for clinical reasoning practice</li>
                <li>Assessment tools with immediate feedback</li>
                <li>Comprehensive glossary of essential terminology</li>
                <li>Mobile-first, responsive design</li>
                <li>Dark mode support for comfortable viewing</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Evidence-Based Content:</strong> All content is based on current clinical guidelines
                from organizations including the American Psychiatric Association (APA), American College
                of Emergency Physicians (ACEP), and SAMHSA.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="card bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-900 dark:text-yellow-100">
            <Shield size={24} />
            Important Disclaimers
          </h2>
          <div className="space-y-4 text-yellow-900 dark:text-yellow-100">
            <div>
              <h3 className="font-semibold mb-2">Educational Purpose Only</h3>
              <p className="text-sm">
                This application is designed for educational purposes only and should not be used as a
                substitute for professional medical advice, diagnosis, or treatment. Always seek the advice
                of qualified healthcare providers with any questions regarding medical conditions or treatment.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Not Clinical Guidance</h3>
              <p className="text-sm">
                The interactive tools, calculators, and decision aids presented in this app are educational
                demonstrations and should not be used for clinical decision-making. Clinical decisions must
                be based on individual patient assessment, current evidence, and professional judgment.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Synthetic Scenarios</h3>
              <p className="text-sm">
                All patient cases and scenarios presented in this application are entirely fictional and
                created for educational purposes. Any resemblance to actual patients or situations is
                purely coincidental.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Legal Considerations</h3>
              <p className="text-sm">
                Information about involuntary hospitalization and legal processes is provided as general
                educational overview only. Specific laws and procedures vary significantly by jurisdiction.
                Always consult local laws, institutional policies, and legal counsel for guidance on
                legal matters.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Medication Information</h3>
              <p className="text-sm">
                Medication information is provided for educational purposes and may not be comprehensive.
                Always consult current prescribing information, drug interactions databases, and clinical
                pharmacists before prescribing or administering medications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Emergency Situations</h3>
              <p className="text-sm">
                If you or someone you know is experiencing a psychiatric emergency or crisis, immediately
                contact emergency services (911 in the US), go to the nearest emergency department, or
                contact the National Suicide Prevention Lifeline at 988.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">No Liability</h3>
              <p className="text-sm">
                The creators and contributors of this educational application assume no liability for
                any decisions or outcomes resulting from the use of this application. Users are solely
                responsible for their clinical decisions and actions.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Resources */}
        <div className="card bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600">
          <h2 className="text-xl font-semibold mb-4 text-red-900 dark:text-red-100">
            Emergency Resources
          </h2>
          <div className="space-y-3 text-red-900 dark:text-red-100">
            <div>
              <h3 className="font-semibold">National Suicide Prevention Lifeline</h3>
              <p className="text-2xl font-bold">988</p>
              <p className="text-sm">24/7 crisis support in English and Spanish</p>
            </div>
            <div>
              <h3 className="font-semibold">Crisis Text Line</h3>
              <p className="text-lg font-semibold">Text "HELLO" to 741741</p>
              <p className="text-sm">24/7 support via text message</p>
            </div>
            <div>
              <h3 className="font-semibold">Emergency Services</h3>
              <p className="text-2xl font-bold">911</p>
              <p className="text-sm">For immediate psychiatric or medical emergencies</p>
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="card bg-gray-50 dark:bg-gray-800">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Psych Emergency Master</p>
            <p>Version 1.0.0</p>
            <p className="mt-2">© 2024 - Educational Use Only</p>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
};

export default Settings;
