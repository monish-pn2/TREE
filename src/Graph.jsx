import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import graphData from './graphData.json';

const Graph = () => {
  const svgRef = useRef(null);
  const simulationRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%");

    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(d => d.id).distance(20)) // Decrease the distance between nodes
      .force("charge", d3.forceManyBody().strength(-4500)) // Increase the charge strength
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30)); // Add a collision force to prevent overlapping nodes

    const link = svg.append("g")
      .selectAll("line")
      .data(graphData.links)
      .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("g")
      .data(graphData.nodes)
      .enter().append("g")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", d => d.id === "Technologies" ? 15 : 10) // Increase the radius for the root node
      .attr("fill", d => d.id === "Technologies" ? "red" : "#1f77b4"); // Change the color for the root node

    node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(d => d.id);

    node.append("title")
      .text(d => d.id);

    simulation.nodes(graphData.nodes)
      .on("tick", () => {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

        node
          .attr("transform", d => `translate(${d.x},${d.y})`);
      });

    simulation.force("link").links(graphData.links);

    simulationRef.current = simulation;

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
      svg.selectAll("*").remove(); // Clear the SVG content
    };
  }, []);

  return <svg ref={svgRef} style={{ width: '100vw', height: '100vh' }}></svg>;
};

export default Graph;
