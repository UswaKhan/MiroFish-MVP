import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AGENTS, AGENT_RESPONSES } from '../data';

const REPORT_AGENT = { name:'ReportAgent', role:'AI Analyst · Always available', emoji:'R', isReport:true };
const ALL_AGENTS = [REPORT_AGENT, ...AGENTS.slice(0, 8)];

function getGreeting(agent) {
  return agent.isReport
    ? "Hello! I'm the ReportAgent. I've analyzed all 40 simulation rounds. What would you like to explore?"
    : `Hi. I'm ${agent.name}. In the simulation I felt ${agent.sentiment} about the topic. What would you like to know?`;
}

function Avatar({ agent, size = 'md' }) {
  const s = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-9 h-9 text-sm';
  return (
    <div
      className={`${s} rounded-full flex-shrink-0 flex items-center justify-center font-extrabold text-white`}
      style={{ background: agent.isReport ? 'linear-gradient(135deg,#00e5ff,#7c3aed)' : 'linear-gradient(135deg,#7c3aed,#00e5ff)' }}
    >
      {agent.emoji}
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex flex-col max-w-[88%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
      <div className={`px-3 py-2 text-sm leading-relaxed rounded-2xl
        ${isUser
          ? 'bg-[#00e5ff] text-black font-medium rounded-br-sm'
          : 'bg-[#161a24] border border-[#1e2535] text-[#e8eaf0] rounded-bl-sm'
        }`}>
        {msg.text}
      </div>
    </div>
  );
}

function AgentList({ selected, onSelect }) {
  return (
    <div>
      {ALL_AGENTS.map(agent => (
        <div
          key={agent.name}
          onClick={() => onSelect(agent)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all mb-1 border
            ${selected.name === agent.name
              ? 'bg-[#00e5ff]/10 border-[#00e5ff]/20'
              : 'border-transparent hover:bg-[#161a24]'
            }`}
        >
          <Avatar agent={agent} size="sm" />
          <div>
            <div className="text-sm font-semibold text-[#e8eaf0]">{agent.name}</div>
            <div className="text-[11px] text-[#6b7494]">
              {agent.role || `${agent.tags?.[0]} · ${agent.platform}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ChatStep() {
  const [selected, setSelected]     = useState(REPORT_AGENT);
  const [histories, setHistories]   = useState({
    ReportAgent: [{ role:'agent', text: getGreeting(REPORT_AGENT) }]
  });
  const [input, setInput]           = useState('');
  const [showAgents, setShowAgents] = useState(false);
  const [isMobile, setIsMobile]     = useState(window.innerWidth < 768);
  const msgsRef = useRef();
  const inputRef = useRef();

  // track screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentHistory = histories[selected.name] || [{ role:'agent', text: getGreeting(selected) }];

  // scroll to bottom when messages change
  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [currentHistory]);

  const selectAgent = useCallback((agent) => {
    setHistories(h => {
      if (!h[agent.name]) {
        return { ...h, [agent.name]: [{ role:'agent', text: getGreeting(agent) }] };
      }
      return h;
    });
    setSelected(agent);
    setShowAgents(false);
    // refocus input after selecting agent
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const sendMsg = useCallback(() => {
    setInput(prev => {
      const text = prev.trim();
      if (!text) return prev;

      setHistories(h => {
        const existing = h[selected.name] || [{ role:'agent', text: getGreeting(selected) }];
        const withUser = [...existing, { role:'user', text }];

        setTimeout(() => {
          const pool = selected.isReport ? AGENT_RESPONSES.ReportAgent : AGENT_RESPONSES.default;
          const reply = pool[Math.floor(Math.random() * pool.length)];
          setHistories(h2 => ({
            ...h2,
            [selected.name]: [...(h2[selected.name] || withUser), { role:'agent', text: reply }]
          }));
        }, 700 + Math.random() * 600);

        return { ...h, [selected.name]: withUser };
      });

      return '';
    });

    // keep focus on input after sending
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [selected]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') sendMsg();
  }, [sendMsg]);

  // shared chat header
  const ChatHeader = () => (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e2535]">
      <Avatar agent={selected} />
      <div>
        <div className="font-bold text-sm text-[#e8eaf0]">{selected.name}</div>
        <div className="text-[11px] text-[#6b7494]">
          {selected.role || `${selected.tags?.[0]} · ${selected.platform}`}
        </div>
      </div>
    </div>
  );

  // shared messages area
  const MessagesArea = () => (
    <div ref={msgsRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0">
      {currentHistory.map((msg, i) => <Message key={i} msg={msg} />)}
    </div>
  );

  // ONE single input shared across both layouts
  const InputArea = () => (
    <div className="flex gap-2 p-3 border-t border-[#1e2535]">
      <input
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question…"
        autoFocus
        className="flex-1 bg-[#161a24] border border-[#1e2535] rounded-xl px-3 py-2.5 text-[#e8eaf0] text-sm outline-none focus:border-[#00e5ff] transition-colors min-w-0"
        style={{ fontFamily:'Syne,sans-serif' }}
      />
      <button
        onClick={sendMsg}
        className="px-4 py-2.5 bg-[#00e5ff] text-black font-mono font-bold text-xs rounded-xl hover:brightness-110 transition-all flex-shrink-0">
        Send
      </button>
    </div>
  );

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10 py-8">

      {/* Header */}
      <div className="mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#00e5ff] mb-3 block">
          Step 05 — Deep Interaction
        </span>
        <h2 className="font-extrabold text-2xl md:text-3xl tracking-tight mb-2"
            style={{ fontFamily:'Syne,sans-serif' }}>
          Interview the Simulation
        </h2>
        <p className="text-[#6b7494] text-sm">
          Chat with any simulated agent or ask the ReportAgent follow-up questions.
        </p>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      {isMobile && (
        <div className="flex flex-col gap-3">

          {/* Agent picker */}
          <button
            onClick={() => setShowAgents(v => !v)}
            className="flex items-center gap-3 w-full px-4 py-3 bg-[#0f1117] border border-[#1e2535] rounded-xl"
          >
            <Avatar agent={selected} size="sm" />
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold text-[#e8eaf0]">{selected.name}</div>
              <div className="text-[11px] text-[#6b7494]">Tap to switch agent</div>
            </div>
            <span className="text-[#6b7494] text-xs">{showAgents ? '▲' : '▼'}</span>
          </button>

          {/* Dropdown */}
          {showAgents && (
            <div className="bg-[#0f1117] border border-[#1e2535] rounded-xl p-2">
              <AgentList selected={selected} onSelect={selectAgent} />
            </div>
          )}

          {/* Chat box */}
          <div className="flex flex-col bg-[#0f1117] border border-[#1e2535] rounded-2xl overflow-hidden"
               style={{ height:'65vh' }}>
            <ChatHeader />
            <MessagesArea />
            <InputArea />
          </div>
        </div>
      )}

      {/* ── DESKTOP LAYOUT ── */}
      {!isMobile && (
        <div className="grid gap-5"
             style={{ gridTemplateColumns:'240px 1fr', height:'calc(100vh - 280px)', minHeight:500 }}>

          {/* Agent list */}
          <div className="overflow-y-auto bg-[#0f1117] border border-[#1e2535] rounded-2xl p-2">
            <AgentList selected={selected} onSelect={selectAgent} />
          </div>

          {/* Chat panel */}
          <div className="flex flex-col bg-[#0f1117] border border-[#1e2535] rounded-2xl overflow-hidden">
            <ChatHeader />
            <MessagesArea />
            <InputArea />
          </div>
        </div>
      )}

    </div>
  );
}