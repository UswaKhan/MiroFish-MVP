import React, { useState } from 'react';
import { REPORT_SECTIONS } from '../data';

function Section({ s, i }) {
  return (
    <div className="bg-[#0f1117] border border-[#1e2535] rounded-2xl p-5 md:p-7 opacity-0"
         style={{ animation: `fadeIn 0.5s ease ${i * 0.13}s forwards` }}>
      <h3 className="font-extrabold text-base md:text-lg mb-4 pb-3 border-b border-[#1e2535]"
          style={{fontFamily:'Syne,sans-serif'}}>{s.title}</h3>
      {s.paragraphs.map((p, j) => (
        <p key={j} className="text-[#6b7494] text-sm leading-relaxed mb-3">{p}</p>
      ))}
      {s.showSentiment && (
        <div className="my-4">
          <div className="flex h-2.5 rounded-full overflow-hidden mb-3">
            <div className="bg-[#10b981]" style={{width:'48%'}} />
            <div className="bg-amber-400" style={{width:'31%'}} />
            <div className="bg-[#ef4444]" style={{width:'21%'}} />
          </div>
          <div className="flex gap-3 font-mono text-xs text-[#6b7494] flex-wrap">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10b981] inline-block"/>Positive 48%</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"/>Neutral 31%</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#ef4444] inline-block"/>Negative 21%</span>
          </div>
        </div>
      )}
      {s.highlight && (
        <div className="mt-3 bg-[#00e5ff]/5 border border-[#00e5ff]/15 border-l-2 border-l-[#00e5ff] rounded-r-xl p-4 text-sm leading-relaxed text-[#e8eaf0]">
          {s.highlight}
        </div>
      )}
    </div>
  );
}

export default function ReportStep({ onNext }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const downloadReport = () => {
    let text = '# MiroFish Prediction Report\n\nGenerated: ' + new Date().toLocaleDateString() + '\n\n---\n\n';
    REPORT_SECTIONS.forEach(s => {
      text += `## ${s.title}\n\n`;
      s.paragraphs.forEach(p => { text += p + '\n\n'; });
      if (s.highlight) text += `> Key Finding: ${s.highlight}\n\n`;
      text += '---\n\n';
    });
    const blob = new Blob([text], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mirofish-report.md';
    a.click();
  };

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-10 py-8">

      {/* Header */}
      <div className="mb-6">
        <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#00e5ff] mb-3 block">
          Step 04 — Prediction Report
        </span>
        <h2 className="font-extrabold text-2xl md:text-3xl tracking-tight mb-2" style={{fontFamily:'Syne,sans-serif'}}>
          Analysis Complete
        </h2>
        <p className="text-[#6b7494] text-sm mb-4">ReportAgent synthesized all simulation data into a structured prediction.</p>
        <button onClick={downloadReport}
          className="w-full md:w-auto px-5 py-2.5 border border-[#00e5ff]/30 text-[#00e5ff] font-mono text-sm rounded-xl hover:bg-[#00e5ff]/10 transition-all text-center block">
          ⬇ Download Report
        </button>
      </div>

      {/* Desktop layout — TOC + sections side by side */}
      <div className="hidden md:grid gap-7" style={{ gridTemplateColumns: '220px 1fr' }}>
        <div className="sticky top-24 self-start">
          {REPORT_SECTIONS.map((s, i) => (
            <div key={i}
              onClick={() => { setActiveIdx(i); document.querySelectorAll('.report-sec')[i]?.scrollIntoView({behavior:'smooth'}); }}
              className={`px-3.5 py-2.5 rounded-lg cursor-pointer text-sm transition-all mb-1 border
                ${activeIdx === i ? 'bg-[#00e5ff]/8 text-[#00e5ff] border-[#00e5ff]/20' : 'text-[#6b7494] border-transparent hover:text-[#e8eaf0]'}`}>
              {s.title}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {REPORT_SECTIONS.map((s, i) => (
            <div key={i} className="report-sec">
              <Section s={s} i={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile layout — accordion style */}
      <div className="md:hidden flex flex-col gap-3">
        {REPORT_SECTIONS.map((s, i) => (
          <Section key={i} s={s} i={i} />
        ))}
      </div>

      <div className="mt-6">
        <button onClick={onNext}
          className="w-full px-8 py-3.5 bg-[#00e5ff] text-black font-mono font-bold text-sm rounded-xl hover:brightness-110 transition-all">
          Continue → Deep Interaction
        </button>
      </div>
    </div>
  );
}