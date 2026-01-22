import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { ChartData } from '../../types';

interface BarChartProps {
  data: ChartData[];
  title: string;
  width?: number;
  height?: number;
  color?: string;
}

export default function BarChart({ data, title, width = 400, height = 300, color = '#8b5cf6' }: BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 60, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, innerWidth])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .nice()
      .range([innerHeight, 0]);

    // Gradient
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'barGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', color);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', d3.color(color)?.darker(1.5)?.toString() || color);

    const tooltip = d3.select(tooltipRef.current);

    // Bars
    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.name) || 0)
      .attr('y', innerHeight)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', 'url(#barGradient)')
      .attr('rx', 4)
      .style('cursor', 'pointer')
      .on('mouseenter', function (event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('fill', d3.color(color)?.brighter(0.3)?.toString() || color);

        tooltip
          .style('opacity', 1)
          .style('left', `${event.offsetX + 10}px`)
          .style('top', `${event.offsetY - 10}px`)
          .html(`
            <div class="font-semibold">${d.name}</div>
            <div class="text-sm text-gray-300">${d.value} tools</div>
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
          .duration(150)
          .attr('fill', 'url(#barGradient)');

        tooltip.style('opacity', 0);
      })
      .transition()
      .duration(800)
      .delay((_, i) => i * 50)
      .attr('y', d => y(d.value))
      .attr('height', d => innerHeight - y(d.value));

    // X Axis
    g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('class', 'fill-gray-400 text-xs')
      .attr('transform', 'rotate(-35)')
      .attr('text-anchor', 'end')
      .attr('dx', '-0.5em')
      .attr('dy', '0.5em');

    g.selectAll('.domain, .tick line')
      .attr('stroke', 'rgb(71 85 105)');

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .selectAll('text')
      .attr('class', 'fill-gray-400 text-xs');

    g.selectAll('.domain')
      .attr('stroke', 'rgb(71 85 105)');

    g.selectAll('.tick line')
      .attr('stroke', 'rgb(51 65 85)')
      .attr('x2', innerWidth)
      .attr('stroke-dasharray', '2,2');

  }, [data, width, height, color]);

  return (
    <div ref={containerRef} className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="relative overflow-hidden">
        <svg ref={svgRef}></svg>
        <div
          ref={tooltipRef}
          className="absolute bg-slate-800 px-3 py-2 rounded-lg shadow-xl border border-slate-600 opacity-0 pointer-events-none transition-opacity z-10"
        ></div>
      </div>
    </div>
  );
}
