import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { CategoryStats } from '../../types';

interface HorizontalBarChartProps {
  data: CategoryStats[];
  title: string;
  maxItems?: number;
}

const COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
  '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#06b6d4', '#3b82f6', '#2563eb', '#7c3aed', '#c026d3'
];

export default function HorizontalBarChart({ data, title, maxItems = 10 }: HorizontalBarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length || !containerRef.current) return;

    const displayData = data.slice(0, maxItems);
    const containerWidth = containerRef.current.clientWidth;
    const width = containerWidth;
    const barHeight = 40;
    const height = displayData.length * barHeight + 40;
    const margin = { top: 10, right: 80, bottom: 10, left: 280 };
    const innerWidth = width - margin.left - margin.right;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(displayData, d => d.count) || 0])
      .range([0, innerWidth]);

    const y = d3.scaleBand()
      .domain(displayData.map(d => d.category))
      .range([0, displayData.length * barHeight])
      .padding(0.3);

    // Background bars
    g.selectAll('.bg-bar')
      .data(displayData)
      .enter()
      .append('rect')
      .attr('class', 'bg-bar')
      .attr('x', 0)
      .attr('y', d => y(d.category) || 0)
      .attr('width', innerWidth)
      .attr('height', y.bandwidth())
      .attr('fill', 'rgb(30 41 59 / 0.7)')
      .attr('rx', 6);

    // Value bars
    g.selectAll('.value-bar')
      .data(displayData)
      .enter()
      .append('rect')
      .attr('class', 'value-bar')
      .attr('x', 0)
      .attr('y', d => y(d.category) || 0)
      .attr('width', 0)
      .attr('height', y.bandwidth())
      .attr('fill', (_, i) => COLORS[i % COLORS.length])
      .attr('rx', 6)
      .style('cursor', 'pointer')
      .transition()
      .duration(800)
      .delay((_, i) => i * 60)
      .attr('width', d => x(d.count));

    // Labels - positioned to the left of the bars
    g.selectAll('.label')
      .data(displayData)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', -12)
      .attr('y', d => (y(d.category) || 0) + y.bandwidth() / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '13px')
      .attr('font-weight', '500')
      .attr('fill', '#cbd5e1')
      .text(d => d.category);

    // Values - positioned to the right of the bars
    g.selectAll('.value')
      .data(displayData)
      .enter()
      .append('text')
      .attr('class', 'value')
      .attr('x', d => x(d.count) + 12)
      .attr('y', d => (y(d.category) || 0) + y.bandwidth() / 2)
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '15px')
      .attr('font-weight', '600')
      .attr('fill', '#ffffff')
      .attr('opacity', 0)
      .text(d => d.count)
      .transition()
      .duration(400)
      .delay((_, i) => 800 + i * 60)
      .attr('opacity', 1);

  }, [data, maxItems]);

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
    >
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}
