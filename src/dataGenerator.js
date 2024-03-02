export function MESH(nodes) {
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


export function dirct(nodes) {
    const links = [];
    for (let i = 1; i < nodes.length; i++) {

        links.push({ "source": nodes[0].id, "target": nodes[i].id });
        
    }
    return { nodes, links };
}


