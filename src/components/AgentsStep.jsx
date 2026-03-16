import React from 'react';
import { Twitter, MessageSquare } from 'lucide-react';
import { AGENTS } from '../data';

export default function AgentsStep({ onNext }) {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10 py-8">

      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#00e5ff] mb-3 block">
            Step 02 — Agent Profiles
          </span>
          <h2 className="font-extrabold text-2xl md:text-3xl tracking-tight mb-2"
              style={{ fontFamily:'Syne,sans-serif' }}>
            120 Agents Generated
          </h2>
          <p className="text-[#6b7494] text-sm">Unique agents with independent personalities and behavioral patterns.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full border border-[#00e5ff]/30 text-[#00e5ff] bg-[#00e5ff]/5 font-mono">
            <Twitter size={10} /> Twitter × 60
          </span>
          <span className="flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full border border-purple-500/30 text-purple-400 bg-purple-500/5 font-mono">
            <MessageSquare size={10} /> Reddit × 60
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {AGENTS.map((agent, i) => (
          <div
            key={agent.id}
            className="bg-[#0f1117] border border-[#1e2535] rounded-2xl p-5 opacity-0 hover:border-[#00e5ff]/30 hover:-translate-y-0.5 transition-all duration-200"
            style={{ animation: `fadeIn 0.4s ease ${i * 0.06}s forwards` }}
          >
            {/* Agent header */}
            <div className="flex gap-3 items-start mb-3">
              <div
                className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-base font-extrabold text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #00e5ff)' }}
              >
                {agent.emoji}
              </div>
              <div>
                <div className="font-bold text-sm text-[#e8eaf0]">{agent.name}</div>
                <div className="font-mono text-[11px] text-[#6b7494]">{agent.handle}</div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-[#6b7494] text-[13px] leading-relaxed mb-3">{agent.bio}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {agent.tags.map(t => (
                <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#161a24] border border-[#1e2535] text-[#6b7494] font-mono">
                  {t}
                </span>
              ))}
              {/* Platform tag with icon */}
              <span className={`flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-mono border
                ${agent.platform === 'twitter'
                  ? 'border-[#00e5ff]/30 text-[#00e5ff] bg-[#00e5ff]/5'
                  : 'border-purple-500/30 text-purple-400 bg-purple-500/5'
                }`}>
                {agent.platform === 'twitter'
                  ? <Twitter size={9} />
                  : <MessageSquare size={9} />
                }
                {agent.platform}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onNext}
          className="w-full md:w-auto px-8 py-3.5 bg-[#00e5ff] text-black font-mono font-bold text-sm rounded-xl hover:brightness-110 transition-all">
          Continue → Run Simulation
        </button>
      </div>
    </div>
  );
}