import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { ChartData } from '../../types';

interface DonutChartProps {
  data: ChartData[];
  title: string;
  width?: number;
  height?: number;
}

const COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
  '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#06b6d4', '#3b82f6', '#2563eb', '#7c3aed', '#c026d3'
];

export default function DonutChart({ data, title, width = 300, height = 300 }: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const radius = Math.min(width, height) / 2 - 20;
    const innerRadius = radius * 0.6;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<ChartData>()
      .value(d => d.value)
      .sort(null)
      .padAngle(0.02);

    const arc = d3.arc<d3.PieArcDatum<ChartData>>()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .cornerRadius(4);

    const hoverArc = d3.arc<d3.PieArcDatum<ChartData>>()
      .innerRadius(innerRadius)
      .outerRadius(radius + 8)
      .cornerRadius(4);

    const tooltip = d3.select(tooltipRef.current);

    const arcs = g.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (_, i) => COLORS[i % COLORS.length])
      .attr('stroke', 'rgba(15, 23, 42, 0.8)')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .style('transition', 'all 0.2s ease');

    arcs
      .on('mouseenter', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', hoverArc as unknown as string);

        tooltip
          .style('opacity', 1)
          .style('left', `${event.offsetX + 10}px`)
          .style('top', `${event.offsetY - 10}px`)
          .html(`
            <div class="font-semibold">${d.data.name}</div>
            <div class="text-sm text-gray-300">${d.data.value} tools (${((d.data.value / d3.sum(data, d => d.value)) * 100).toFixed(1)}%)</div>
          `);
      })
      .on('mousemove', function (event) {
        tooltip
          .style('left', `${event.offsetX + 10}px`)
          .style('top', `${event.offsetY - 10}px`);
      })
      .on('mouseleave', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arc as unknown as string);

        tooltip.style('opacity', 0);
      });

    // Center text
    const total = d3.sum(data, d => d.value);
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .attr('class', 'fill-white text-3xl font-bold')
      .text(total);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5em')
      .attr('class', 'fill-gray-400 text-sm')
      .text('Total');

  }, [data, width, height]);

  return (
    <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="relative flex justify-center">
        <svg ref={svgRef}></svg>
        <div
          ref={tooltipRef}
          className="absolute bg-slate-800 px-3 py-2 rounded-lg shadow-xl border border-slate-600 opacity-0 pointer-events-none transition-opacity z-10"
        ></div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {data.slice(0, 6).map((item, i) => (
          <div key={item.name} className="flex items-center gap-1.5 text-xs">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            ></div>
            <span className="text-gray-300 truncate max-w-20">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
