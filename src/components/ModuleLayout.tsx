import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ModuleLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const ModuleLayout: React.FC<ModuleLayoutProps> = ({ title, description, children }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-64">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline mb-6"
      >
        <ArrowLeft size={20} />
        Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">{description}</p>
      </div>

      {children}
    </div>
  );
};

export default ModuleLayout;
