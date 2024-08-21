// src/NodeMap.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const NodeMap = ({ nodes, links }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 600;
        const height = 400;
        
        const simulation = d3.forceSimulation(nodes)
        /*
            .force('link', d3.forceLink(links).id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2));
        */

        svg.selectAll('*').remove();


        //Definition of lines
        const link = svg.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .enter().append('line')
            .attr('stroke-width', 2)
            .attr('stroke', 'black') 
            .attr('marker-end', 'url(#arrow)');

        //defenition of notes
        const node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(nodes)
            .enter().append('circle')
            .attr('r', 10)
            .attr('fill', 'blue')
            .on('click', (event, d) => alert(`Clicked on ${d.id}`));

        //defenition of tracked labels
        const label = svg.append('g')
            .attr('class', 'labels')
            .selectAll('text')
            .data(nodes)
            .enter().append('text')
            .attr('dy', -15)
            .attr('text-anchor', 'middle')
            .text(d => d.id)
            .attr('font-size', '12px')
            .attr('fill', 'black');

        svg.append('defs').append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 15)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', 'black');

        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

            label
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });

    }, [nodes, links]);

    return <svg ref={svgRef} width="1980" height="1080"></svg>;
};

export default NodeMap;
