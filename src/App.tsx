import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { MODULES } from './content/modules';
import { ProgressProvider } from './lib/progress';
import { ThemeProvider } from './lib/theme';

const ModulePage = lazy(() => import('./pages/ModulePage'));
const Cases = lazy(() => import('./pages/Cases'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Flashcards = lazy(() => import('./pages/Flashcards'));
const Tools = lazy(() => import('./pages/Tools'));
const Glossary = lazy(() => import('./pages/Glossary'));
const Search = lazy(() => import('./pages/Search'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                {MODULES.map((m) => (
                  <Route key={m.id} path={m.path} element={<ModulePage module={m} />} />
                ))}
                <Route path="/cases" element={<Cases />} />
                <Route path="/cases/:caseId" element={<Cases />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/tools/:toolId" element={<Tools />} />
                <Route path="/glossary" element={<Glossary />} />
                <Route path="/search" element={<Search />} />
                <Route path="/about" element={<About />} />
                {/* v1 URLs */}
                <Route path="/assessment" element={<Navigate to="/quiz" replace />} />
                <Route path="/settings" element={<Navigate to="/about" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </ProgressProvider>
    </ThemeProvider>
  );
}
