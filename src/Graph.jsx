import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { generateGraphData } from './dataGenerator';

const Graph = () => {
    const svgRef = useRef(null);

    useEffect(() => {
        const nodes = [
            {"id": "MAIN"},
            {"id": "Anti-Ragging Helpline"},
            {"id": "Information Under MSR Clause B.1.11 (NMC)"},
            {"id": "Notification"},
            {"id": "Results"},
            {"id": "Admission 2022"},
            {"id": "About Us"},
            {"id": "Chairman"},
            {"id": "Executive Director"},
            {"id": "Principal & Dean"},
            {"id": "Medical Superintendent"},
            {"id": "Undergraduate"},
            {"id": "Postgraduate"},
            {"id": "Super Speciality"},
            {"id": "GOVT APPROVAL"},
            {"id": "CAMPUS LIFE"},
            {"id": "DEPARTMENT"},
            {"id": "ALUMNI"},
            {"id": "Publications"},
            {"id": "Academic Activities / CME / Workshops"},
            {"id": "SIMS Drug Formulary"},
            {"id": "CONTACT"},
            {"id": "READ MORE"},
            {"id": "Home"}
        ];

        const { nodes: graphNodes, links } = generateGraphData(nodes);

        const svg = d3.select(svgRef.current)
            .attr("width", 600)
            .attr("height", 400)
            .style("overflow", "auto");

        const simulation = d3.forceSimulation(graphNodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(0))
            .force("charge", d3.forceManyBody().strength(-2000))
            .force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
            .force("collision", d3.forceCollide().radius(30));

        const link = svg.append("g")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 2);

        const node = svg.append("g")
            .selectAll("g")
            .data(graphNodes)
            .enter().append("g")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append("circle")
            .attr("r", d => d.id === "MAIN" ? 15 : 10)
            .attr("fill", d => d.id === "MAIN" ? "red" : "#1f77b4");

        node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(d => d.id);

        node.append("title")
            .text(d => d.id);

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node
                .attr("transform", d => `translate(${d.x},${d.y})`);
        });

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
            simulation.stop();
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <svg ref={svgRef} style={{ position: 'absolute', width: '100%', height: '100%' }}>
                {/* SVG elements will be rendered here */}
            </svg>
        </div>
    );
};

export default Graph;



