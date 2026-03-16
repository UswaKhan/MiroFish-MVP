import React, { useState, useEffect, useRef } from 'react';
import { TWITTER_POSTS, REDDIT_POSTS } from '../data';

function Post({ post }) {
  const colors = { positive:'text-[#10b981]', negative:'text-[#ef4444]', neutral:'text-amber-400' };
  const time = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  return (
    <div className="bg-[#161a24] border border-[#1e2535] rounded-xl p-3.5 animate-slideIn text-sm">
      <div className={`font-bold text-xs mb-1.5 flex justify-between ${colors[post.sentiment]}`}>
        <span>{post.author}</span>
        <span className="text-[#6b7494] font-mono text-[10px]">{time}</span>
      </div>
      <p className="text-[#6b7494] leading-relaxed">{post.text}</p>
    </div>
  );
}

export default function SimulationStep({ onNext }) {
  const [round, setRound]               = useState(0);
  const [posts, setPosts]               = useState(0);
  const [interactions, setInteractions] = useState(0);
  const [sentiment, setSentiment]       = useState('—');
  const [twitterFeed, setTwitterFeed]   = useState([]);
  const [redditFeed, setRedditFeed]     = useState([]);
  const [done, setDone]                 = useState(false);
  const [finishing, setFinishing]       = useState(false);

  const tRef  = useRef();
  const rRef  = useRef();
  const tiRef = useRef(0);
  const riRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRound(r => {
        const next = Math.min(r + 1, 40);

        // add next twitter post if available
        if (tiRef.current < TWITTER_POSTS.length) {
          const post = TWITTER_POSTS[tiRef.current];
          if (post) setTwitterFeed(f => [...f, post]);
          tiRef.current++;
        }

        // add next reddit post if available
        if (riRef.current < REDDIT_POSTS.length) {
          const post = REDDIT_POSTS[riRef.current];
          if (post) setRedditFeed(f => [...f, post]);
          riRef.current++;
        }

        setPosts(p => p + Math.floor(Math.random() * 4) + 2);
        setInteractions(i => i + Math.floor(Math.random() * 8) + 3);
        setSentiment(next < 15 ? 'Positive' : next < 30 ? 'Mixed' : 'Stabilizing');

        if (next >= 40) {
          clearInterval(interval);
          setDone(true);
        }

        return next;
      });
    }, 420);

    return () => clearInterval(interval);
  }, []);

  // auto scroll feeds to bottom
  useEffect(() => {
    if (tRef.current) tRef.current.scrollTop = tRef.current.scrollHeight;
  }, [twitterFeed]);

  useEffect(() => {
    if (rRef.current) rRef.current.scrollTop = rRef.current.scrollHeight;
  }, [redditFeed]);

  const handleFinish = () => {
    setFinishing(true);
    setTimeout(onNext, 1400);
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-10 py-10">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#00e5ff] mb-3 block">
            Step 03 — Simulation Running
          </span>
          <h2 className="font-extrabold text-3xl tracking-tight mb-2" style={{ fontFamily:'Syne,sans-serif' }}>
            Live Simulation Feed
          </h2>
          <p className="text-[#6b7494] text-sm">
            120 agents interacting across Twitter and Reddit in parallel.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-sm">
          {done ? (
            <span className="text-[#10b981]">✓ Complete — 40/40 rounds</span>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse2" />
              <span className="text-[#10b981]">Running — Round {round}/40</span>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon:'💬', val: posts,        label:'Total Posts'    },
          { icon:'🔁', val: interactions, label:'Interactions'   },
          { icon:'📈', val: sentiment,    label:'Avg Sentiment'  },
        ].map(s => (
          <div key={s.label} className="bg-[#0f1117] border border-[#1e2535] rounded-xl p-4 flex items-center gap-4">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <div className="font-mono font-extrabold text-2xl text-[#e8eaf0]">{s.val}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#6b7494]">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Feeds */}
      <div className="grid grid-cols-2 gap-6">

        {/* Twitter */}
        <div className="bg-[#0f1117] border border-[#1e2535] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e2535] font-mono text-xs">
            <span>🐦 Twitter Feed</span>
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse2" />
          </div>
          <div ref={tRef} className="h-80 overflow-y-auto p-3.5 flex flex-col gap-2.5">
            {twitterFeed
              .filter(p => p && p.sentiment)
              .map((p, i) => <Post key={i} post={p} />)
            }
          </div>
        </div>

        {/* Reddit */}
        <div className="bg-[#0f1117] border border-[#1e2535] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e2535] font-mono text-xs">
            <span>💬 Reddit Feed</span>
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse2" />
          </div>
          <div ref={rRef} className="h-80 overflow-y-auto p-3.5 flex flex-col gap-2.5">
            {redditFeed
              .filter(p => p && p.sentiment)
              .map((p, i) => <Post key={i} post={p} />)
            }
          </div>
        </div>

      </div>

      {/* Button */}
      <div className="mt-7 text-right">
        <button
          onClick={handleFinish}
          disabled={!done || finishing}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00e5ff] text-black font-mono font-bold text-sm rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 hover:-translate-y-0.5"
        >
          {finishing && (
            <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin2 inline-block" />
          )}
          {finishing ? 'Generating…' : 'Generate Report →'}
        </button>
      </div>

    </div>
  );
}