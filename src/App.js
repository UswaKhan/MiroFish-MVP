import React, { useState } from 'react';
import Navbar         from './components/Navbar';
import UploadStep     from './components/UploadStep';
import GraphStep      from './components/GraphStep';
import AgentsStep     from './components/AgentsStep';
import SimulationStep from './components/SimulationStep';
import ReportStep     from './components/ReportStep';
import ChatStep       from './components/ChatStep';

const VIEWS = [UploadStep, GraphStep, AgentsStep, SimulationStep, ReportStep, ChatStep];

export default function App() {
  const [step, setStep]         = useState(0);
  const [fileName, setFileName] = useState('');
  const [completed, setCompleted] = useState(false);

  const goTo = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const CurrentView = VIEWS[step];

  return (
    <div>
      <Navbar currentStep={step} onStepClick={goTo} />
      <div key={step} className="animate-fadeIn">
        <CurrentView
          onComplete={() => goTo(1)}
          onNext={() => goTo(step + 1)}
          fileName={fileName}
          setFileName={setFileName}
          completed={completed}
          setCompleted={setCompleted}
        />
      </div>
    </div>
  );
}