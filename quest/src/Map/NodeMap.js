import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const GraphMap = ({ nodes, links }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 1920;
        const height = 1080;
        const margin = { top: 20, right: 90, bottom: 30, left: 90 };

        // Initialize a map to store nodes with additional properties
        const nodeMap = new Map();
        nodes.forEach((node, index) => {
            nodeMap.set(node.id, { ...node, depth: 0, index });
        });

        // Calculate the depth for each node
        links.forEach(link => {
            const parentNode = nodeMap.get(link.source);
            const childNode = nodeMap.get(link.target);
            if (childNode && parentNode) {
                childNode.depth = Math.max(childNode.depth, parentNode.depth + 1);
            }
        });

        // Calculate the maximum depth to scale the layout
        const maxDepth = Math.max(...Array.from(nodeMap.values()).map(d => d.depth));

        // Scales to position the nodes
        const xScale = d3.scalePoint()
            .domain(d3.range(maxDepth + 1))
            .range([margin.left, width - margin.right]);

        const yScale = d3.scalePoint()
            .domain(d3.range(nodes.length))
            .range([margin.top, height - margin.bottom]);

        // Assign x and y positions to nodes
        const positionedNodes = Array.from(nodeMap.values()).map((node, i) => {
            return {
                ...node,
                x: xScale(node.depth),
                y: yScale(i),
            };
        });

        // Clear previous contents of the SVG
        svg.selectAll('*').remove();

        // Draw the links
        svg.append('g')
            .selectAll('path')
            .data(links)
            .enter().append('path')
            .attr('d', d => {
                const sourceNode = positionedNodes[nodeMap.get(d.source).index];
                const targetNode = positionedNodes[nodeMap.get(d.target).index];
                return `M${sourceNode.x},${sourceNode.y}L${targetNode.x},${targetNode.y}`;
            })
            .attr('stroke', 'black')
            .attr('fill', 'none');

        // Draw the nodes
        svg.append('g')
            .selectAll('circle')
            .data(positionedNodes)
            .enter().append('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', 10)
            .attr('fill', 'blue');

        // Draw the labels (displaying the id of the node)
        svg.append('g')
            .selectAll('text')
            .data(positionedNodes)
            .enter().append('text')
            .attr('x', d => d.x)
            .attr('y', d => d.y - 15)
            .attr('text-anchor', 'middle')
            .text(d => d.id)  // Use the node's id as the label
            .attr('font-size', '12px')
            .attr('fill', 'black');
    }, [nodes, links]);

    return <svg ref={svgRef} width="1920" height="1080"></svg>;
};

export default GraphMap;
