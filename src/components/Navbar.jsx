import React from 'react';

const STEPS = ['Upload', 'Graph', 'Agents', 'Simulate', 'Report', 'Chat'];

export default function Navbar({ currentStep, onStepClick }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-10 py-4 border-b border-[#1e2535]"
         style={{ background: 'rgba(8,9,12,0.88)', backdropFilter: 'blur(20px)' }}>

      {/* Logo */}
      <div className="flex items-center gap-2 font-mono font-bold text-[#00e5ff] text-lg">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
             style={{ background: 'linear-gradient(135deg, #00e5ff, #7c3aed)' }}>
          🐟
        </div>
        MiroFish
      </div>

      {/* Step tabs */}
      <div className="flex gap-1">
        {STEPS.map((label, i) => {
          const isDone    = i < currentStep;
          const isActive  = i === currentStep;
          const isLocked  = i > currentStep;
          const isClickable = isDone || isActive;

          return (
            <button
              key={i}
              onClick={() => isClickable && onStepClick(i)}
              disabled={isLocked}
              className={`
                px-3 py-1.5 rounded-md text-xs font-mono border transition-all duration-200
                ${isActive  ? 'bg-[#00e5ff]/10 border-[#00e5ff] text-[#00e5ff]' : ''}
                ${isDone    ? 'border-[#10b981]/30 text-[#10b981] cursor-pointer hover:bg-[#10b981]/5' : ''}
                ${isLocked  ? 'border-transparent text-[#6b7494] opacity-30 cursor-not-allowed' : ''}
              `}
            >
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-current text-[9px] mr-1">
                {isDone ? '✓' : i}
              </span>
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}