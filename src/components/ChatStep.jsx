import React, { useState, useRef, useEffect } from 'react';
import { AGENTS, AGENT_RESPONSES } from '../data';

const REPORT_AGENT = { name:'ReportAgent', role:'AI Analyst · Always available', emoji:'R', isReport:true };

function Message({ msg }) {
  const isUser = msg.role === 'user';
  const time = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  return (
    <div className={`flex flex-col max-w-[85%] md:max-w-[76%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
      <div className={`px-4 py-2.5 text-sm leading-relaxed rounded-2xl
        ${isUser ? 'bg-[#00e5ff] text-black font-medium rounded-br-sm' : 'bg-[#161a24] border border-[#1e2535] text-[#e8eaf0] rounded-bl-sm'}`}>
        {msg.text}
      </div>
      <span className="font-mono text-[10px] text-[#6b7494] mt-1">{time}</span>
    </div>
  );
}

export default function ChatStep() {
  const [selected, setSelected]   = useState(REPORT_AGENT);
  const [histories, setHistories] = useState({});
  const [input, setInput]         = useState('');
  const [showList, setShowList]   = useState(false);
  const msgsRef = useRef();

  const getGreeting = (agent) => agent.isReport
    ? "Hello! I'm the ReportAgent. I've analyzed all 40 simulation rounds. What would you like to explore?"
    : `Hi. I'm ${agent.name}. In the simulation I felt ${agent.sentiment} about the topic. What would you like to know?`;

  const getHistory = (agent) => histories[agent.name] || [{ role:'agent', text: getGreeting(agent) }];

  const selectAgent = (agent) => {
    if (!histories[agent.name]) {
      setHistories(h => ({ ...h, [agent.name]: [{ role:'agent', text: getGreeting(agent) }] }));
    }
    setSelected(agent);
    setShowList(false);
  };

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [selected, histories]);

  const sendMsg = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    const existing = getHistory(selected);
    const withUser = [...existing, { role:'user', text }];
    setHistories(h => ({ ...h, [selected.name]: withUser }));
    setTimeout(() => {
      const pool = selected.isReport ? AGENT_RESPONSES.ReportAgent : AGENT_RESPONSES.default;
      const reply = pool[Math.floor(Math.random() * pool.length)];
      setHistories(h => ({ ...h, [selected.name]: [...(h[selected.name] || withUser), { role:'agent', text: reply }] }));
    }, 700 + Math.random() * 600);
  };

  const allAgents = [REPORT_AGENT, ...AGENTS.slice(0, 8)];

  const AgentList = () => (
    <div className="overflow-y-auto">
      {allAgents.map(agent => (
        <div key={agent.name} onClick={() => selectAgent(agent)}
          className={`flex items-center gap-3 px-3.5 py-3 rounded-xl cursor-pointer transition-all mb-1 border
            ${selected.name === agent.name ? 'bg-[#00e5ff]/8 border-[#00e5ff]/20' : 'border-transparent hover:bg-[#0f1117]'}`}>
          <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-extrabold text-sm text-white"
               style={{ background: agent.isReport ? 'linear-gradient(135deg,#00e5ff,#7c3aed)' : 'linear-gradient(135deg,#7c3aed,#00e5ff)' }}>
            {agent.emoji}
          </div>
          <div>
            <div className="text-sm font-semibold text-[#e8eaf0]">{agent.name}</div>
            <div className="text-[11px] text-[#6b7494]">{agent.role || `${agent.tags?.[0]} · ${agent.platform}`}</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10 py-8">

      <div className="mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#00e5ff] mb-3 block">Step 05 — Deep Interaction</span>
        <h2 className="font-extrabold text-2xl md:text-3xl tracking-tight mb-2" style={{fontFamily:'Syne,sans-serif'}}>Interview the Simulation</h2>
        <p className="text-[#6b7494] text-sm">Chat with any simulated agent or ask the ReportAgent follow-up questions.</p>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:grid gap-6" style={{ gridTemplateColumns:'260px 1fr', height:'calc(100vh - 260px)', minHeight:500 }}>
        <AgentList />
        <ChatPanel selected={selected} getHistory={getHistory} msgsRef={msgsRef} input={input} setInput={setInput} sendMsg={sendMsg} />
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col gap-4">

        {/* Agent selector button */}
        <button onClick={() => setShowList(!showList)}
          className="flex items-center gap-3 w-full px-4 py-3 bg-[#0f1117] border border-[#1e2535] rounded-xl">
          <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-extrabold text-xs text-white"
               style={{ background: selected.isReport ? 'linear-gradient(135deg,#00e5ff,#7c3aed)' : 'linear-gradient(135deg,#7c3aed,#00e5ff)' }}>
            {selected.emoji}
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-semibold text-[#e8eaf0]">{selected.name}</div>
            <div className="text-[11px] text-[#6b7494]">Tap to switch agent</div>
          </div>
          <span className="text-[#6b7494]">{showList ? '▲' : '▼'}</span>
        </button>

        {/* Mobile agent list dropdown */}
        {showList && (
          <div className="bg-[#0f1117] border border-[#1e2535] rounded-xl p-2">
            <AgentList />
          </div>
        )}

        {/* Mobile chat */}
        <div style={{ height: '60vh' }}>
          <ChatPanel selected={selected} getHistory={getHistory} msgsRef={msgsRef} input={input} setInput={setInput} sendMsg={sendMsg} />
        </div>
      </div>
    </div>
  );
}

function ChatPanel({ selected, getHistory, msgsRef, input, setInput, sendMsg }) {
  return (
    <div className="flex flex-col bg-[#0f1117] border border-[#1e2535] rounded-2xl overflow-hidden h-full">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1e2535]">
        <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-extrabold text-sm text-white"
             style={{ background: selected.isReport ? 'linear-gradient(135deg,#00e5ff,#7c3aed)' : 'linear-gradient(135deg,#7c3aed,#00e5ff)' }}>
          {selected.emoji}
        </div>
        <div>
          <div className="font-bold text-sm text-[#e8eaf0]">{selected.name}</div>
          <div className="text-[11px] text-[#6b7494]">{selected.role || `${selected.tags?.[0]} · ${selected.platform}`}</div>
        </div>
      </div>

      <div ref={msgsRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {getHistory(selected).map((msg, i) => (
          <div key={i} className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
            <div className={`px-4 py-2.5 text-sm leading-relaxed rounded-2xl
              ${msg.role === 'user' ? 'bg-[#00e5ff] text-black font-medium rounded-br-sm' : 'bg-[#161a24] border border-[#1e2535] text-[#e8eaf0] rounded-bl-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 p-3 border-t border-[#1e2535]">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMsg()}
          placeholder="Ask a question…"
          className="flex-1 bg-[#161a24] border border-[#1e2535] rounded-xl px-4 py-2.5 text-[#e8eaf0] text-sm outline-none focus:border-[#00e5ff] transition-colors"
          style={{ fontFamily:'Syne,sans-serif' }} />
        <button onClick={sendMsg}
          className="px-4 py-2.5 bg-[#00e5ff] text-black font-mono font-bold text-sm rounded-xl hover:brightness-110 transition-all">
          Send
        </button>
      </div>
    </div>
  );
}