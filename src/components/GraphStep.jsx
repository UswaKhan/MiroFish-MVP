import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GRAPH_NODES, GRAPH_LINKS } from '../data';

const COLORS = ['#00e5ff', '#7c3aed', '#f59e0b', '#10b981'];

export default function GraphStep({ onNext }) {
  const svgRef = useRef();
  const [counts, setCounts] = useState({ nodes:0, edges:0, events:0, clusters:0 });

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const W = svgRef.current.clientWidth || 800;
    const H = 470;
    const nodes = GRAPH_NODES.map(d => ({ ...d }));
    const links = GRAPH_LINKS.map(d => ({ ...d }));

    const sim = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(85))
      .force('charge', d3.forceManyBody().strength(-220))
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force('collision', d3.forceCollide(42));

    const line = svg.append('g').selectAll('line').data(links).join('line')
      .attr('stroke', '#1e2535').attr('stroke-width', 1.5);

    const nodeG = svg.append('g').selectAll('g').data(nodes).join('g').attr('cursor', 'pointer');
    nodeG.append('circle').attr('r', 22)
      .attr('fill',   d => COLORS[d.group - 1] + '22')
      .attr('stroke', d => COLORS[d.group - 1])
      .attr('stroke-width', 1.5);
    nodeG.append('text').text(d => d.id)
      .attr('text-anchor', 'middle').attr('dy', '0.35em')
      .attr('font-size', d => d.id.length > 8 ? '8px' : '9.5px')
      .attr('fill', '#e8eaf0')
      .attr('font-family', 'Space Mono, monospace')
      .attr('font-weight', '700');

    sim.on('tick', () => {
      line.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y)
          .attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
      nodeG.attr('transform', d =>
        `translate(${Math.max(30,Math.min(W-30,d.x))},${Math.max(30,Math.min(H-30,d.y))})`
      );
    });

    let n = 0;
    const inc = setInterval(() => {
      n++;
      setCounts({ nodes:Math.min(n*2,15), edges:Math.min(n*2,18), events:Math.min(n*2,24), clusters:Math.min(n*2,4) });
      if (n >= 12) clearInterval(inc);
    }, 90);

    return () => { sim.stop(); clearInterval(inc); };
  }, []);

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-10 py-8">
      <div className="mb-6">
        <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#00e5ff] mb-3 block">Step 01 — Knowledge Graph</span>
        <h2 className="font-extrabold text-2xl md:text-3xl tracking-tight mb-2" style={{fontFamily:'Syne,sans-serif'}}>Entity Graph Built</h2>
        <p className="text-[#6b7494] text-sm">Extracted ontology and relationships from your document.</p>
      </div>

      <svg ref={svgRef} className="w-full rounded-2xl border border-[#1e2535] bg-[#0f1117]" style={{ height: 320 }} />

      {/* 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        {[{k:'nodes',l:'Entities'},{k:'edges',l:'Relationships'},{k:'events',l:'Events'},{k:'clusters',l:'Clusters'}].map(s => (
          <div key={s.k} className="bg-[#0f1117] border border-[#1e2535] rounded-xl p-4 text-center">
            <div className="font-mono font-extrabold text-2xl text-[#00e5ff]">{counts[s.k]}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#6b7494] mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <button onClick={onNext} className="w-full md:w-auto px-8 py-3.5 bg-[#00e5ff] text-black font-mono font-bold text-sm rounded-xl hover:brightness-110 transition-all">
          Continue → Agent Setup
        </button>
      </div>
    </div>
  );
}