import React, { useState, useRef, useEffect } from 'react';
import { Zap, FileText, Paperclip } from 'lucide-react';

const LOGS = [
  "📥 Document received — beginning analysis…",
  "🔍 Extracting named entities and relationships…",
  "🧠 Building ontology schema via LLM…",
  "🕸  Constructing knowledge graph in Zep Cloud…",
  "📊 Indexing 15 entities, 18 relationships, 24 events…",
  "✅ Graph complete — preparing agent environment…",
];

export default function UploadStep({ onComplete, fileName, setFileName, completed, setCompleted }) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs]         = useState([]);
  const [status, setStatus]     = useState('');
  const fileRef = useRef();

  const canStart = fileName.trim().length > 0;

  const handleFile = (file) => {
    if (!file) return;
    setFileName(file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const startProcessing = () => {
    if (completed) { onComplete(); return; }
    setLoading(true);
    setLogs([]);
    setProgress(0);
    let i = 0;
    const tick = () => {
      const pct = Math.round(((i + 1) / LOGS.length) * 100);
      setProgress(pct);
      setStatus(LOGS[i]);
      setLogs(prev => [...prev, LOGS[i]]);
      i++;
      if (i < LOGS.length) setTimeout(tick, 750);
      else { setCompleted(true); setTimeout(onComplete, 700); }
    };
    setTimeout(tick, 300);
  };

  return (
    <div className="relative z-10 min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-6 py-16 text-center">

      {/* Eyebrow */}
      <div className="flex items-center gap-2 font-mono text-[11px] tracking-[3px] uppercase text-[#00e5ff] border border-[#00e5ff]/20 bg-[#00e5ff]/5 px-4 py-1.5 rounded-full mb-6">
        <Zap size={12} />
        Swarm Intelligence Engine
      </div>

      {/* Headline */}
      <h1 className="gradient-text font-extrabold leading-none mb-5"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', letterSpacing: '-2px', fontFamily: 'Syne, sans-serif' }}>
        Predict<br/>Anything
      </h1>

      <p className="text-[#6b7494] text-base leading-relaxed max-w-lg mb-12">
        Upload a seed document — news, policy drafts, financial signals, or a novel —
        and MiroFish simulates thousands of AI agents to predict the future.
      </p>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current.click()}
        className={`relative w-full max-w-xl border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all duration-300
          ${dragging
            ? 'border-[#00e5ff] bg-[#00e5ff]/5 glow-accent'
            : 'border-[#1e2535] bg-[#0f1117] hover:border-[#00e5ff]/50'}`}
      >
        <input ref={fileRef} type="file" accept=".txt,.pdf,.md,.docx" className="hidden"
               onChange={(e) => handleFile(e.target.files[0])} />
        <div className="flex justify-center mb-4">
          <FileText size={40} color="#6b7494" />
        </div>
        <p className="text-base font-semibold text-[#e8eaf0] mb-1">Drop your document here</p>
        <p className="text-sm text-[#6b7494]">or click to browse</p>
        <p className="text-xs text-[#6b7494] mt-2">Supports .txt · .pdf · .md · .docx</p>
      </div>

      {/* Chosen file */}
      {fileName && (
        <div className="flex items-center gap-2 w-full max-w-xl mt-4 bg-[#00e5ff]/10 border border-[#00e5ff]/20 rounded-xl px-5 py-3 font-mono text-sm text-[#00e5ff]">
          <Paperclip size={14} />
          <span>{fileName}</span>
        </div>
      )}

      {/* Query box */}
      <div className="w-full max-w-xl mt-4">
        <label className="block font-mono text-[11px] uppercase tracking-widest text-[#6b7494] mb-2 text-left">
          Prediction Goal (natural language)
        </label>
        <textarea
          defaultValue="How will public opinion evolve over the next 30 days regarding this topic?"
          className="w-full bg-[#0f1117] border border-[#1e2535] rounded-xl px-4 py-3 text-[#e8eaf0] text-sm resize-none h-20 outline-none focus:border-[#00e5ff] transition-colors"
          style={{ fontFamily: 'Syne, sans-serif' }}
        />
      </div>

      {/* Start button */}
      <button
        onClick={startProcessing}
        disabled={!canStart || loading}
        className="mt-6 flex items-center gap-2 px-8 py-3.5 bg-[#00e5ff] text-black font-mono font-bold text-sm rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 hover:-translate-y-0.5"
      >
        {loading
          ? <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin2 inline-block" />
          : <Zap size={14} />
        }
        {loading ? 'Processing…' : completed ? 'Continue Simulation' : 'Start Simulation'}
      </button>

      {/* Progress */}
      {loading && (
        <div className="w-full max-w-xl mt-7 bg-[#0f1117] border border-[#1e2535] rounded-xl p-5 animate-fadeIn">
          <div className="flex justify-between font-mono text-xs text-[#6b7494] mb-2.5">
            <span>{status}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-[#161a24] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
                 style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #00e5ff, #7c3aed)' }} />
          </div>
          <div className="mt-3 space-y-0.5">
            {logs.map((l, i) => (
              <p key={i} className={`font-mono text-[11px] leading-loose ${i === logs.length - 1 ? 'text-[#00e5ff]' : 'text-[#6b7494]'}`}>
                {l}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Already completed note */}
      {completed && !loading && (
        <p className="mt-4 font-mono text-xs text-[#10b981]">
          ✓ Document already processed — click Continue to go back to your simulation
        </p>
      )}
    </div>
  );
}