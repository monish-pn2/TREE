export function generateGraphData(nodes) {
    const links = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
            if (i !== j) {
                links.push({ "source": nodes[i].id, "target": nodes[j].id });
            }
        }
    }
    return { nodes, links };
}
