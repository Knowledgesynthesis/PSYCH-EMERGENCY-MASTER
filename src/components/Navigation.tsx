import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Settings, BookOpen, ClipboardList, Stethoscope } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/cases', label: 'Cases', icon: Stethoscope },
    { path: '/assessment', label: 'Assessment', icon: ClipboardList },
    { path: '/glossary', label: 'Glossary', icon: BookOpen },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50 lg:hidden">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
            Psych Emergency
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-white dark:bg-gray-800 z-40 lg:hidden overflow-y-auto">
          <nav className="p-4 space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isActive(path)
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            Psych Emergency
          </Link>
        </div>
        <nav className="px-4 space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                isActive(path)
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Spacer for mobile */}
      <div className="h-16 lg:hidden" />

      {/* Spacer for desktop */}
      <div className="hidden lg:block w-64" />
    </>
  );
};

export default Navigation;
