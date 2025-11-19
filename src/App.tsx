import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import SuicideRisk from './pages/SuicideRisk';
import Agitation from './pages/Agitation';
import Substances from './pages/Substances';
import Psychosis from './pages/Psychosis';
import Mania from './pages/Mania';
import Catatonia from './pages/Catatonia';
import SerotoninNMS from './pages/SerotoninNMS';
import Delirium from './pages/Delirium';
import Capacity from './pages/Capacity';
import Cases from './pages/Cases';
import Assessment from './pages/Assessment';
import Glossary from './pages/Glossary';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Navigation />
          <main className="pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/suicide-risk" element={<SuicideRisk />} />
              <Route path="/agitation" element={<Agitation />} />
              <Route path="/substances" element={<Substances />} />
              <Route path="/psychosis" element={<Psychosis />} />
              <Route path="/mania" element={<Mania />} />
              <Route path="/catatonia" element={<Catatonia />} />
              <Route path="/serotonin-nms" element={<SerotoninNMS />} />
              <Route path="/delirium" element={<Delirium />} />
              <Route path="/capacity" element={<Capacity />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
