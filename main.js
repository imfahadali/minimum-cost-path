function findLowestCostPath(airports, departure, arrival) {
    // Step 1: Build the graph (Adjacency List)
    const graph = {};
    airports.forEach(flight => {
        const { start, end, cost } = flight;
        if (!graph[start]) {
            graph[start] = [];
        }
        graph[start].push({ end, cost });
    });

    let queue = [];
    queue.push({ node: departure, cost: 0, path: [departure] });

    const visited = {};

    while (queue.length > 0) {
        queue.sort((a, b) => a.cost - b.cost);
        const current = queue.shift();
        const { node: currentNode, cost: cumulativeCost, path } = current;

        if (currentNode === arrival) {
            return { path, cost: cumulativeCost };
        }

        if (visited[currentNode] !== undefined && visited[currentNode] <= cumulativeCost) {
            continue;
        }

        visited[currentNode] = cumulativeCost;

        const neighbors = graph[currentNode] || [];
        neighbors.forEach(neighbor => {
            const totalCost = cumulativeCost + neighbor.cost;

            if (visited[neighbor.end] === undefined || totalCost < visited[neighbor.end]) {
                queue.push({
                    node: neighbor.end,
                    cost: totalCost,
                    path: [...path, neighbor.end]
                });
            }
        });
    }

    throw new Error("No Flight found for the given source and destination.")
}

module.exports = { findLowestCostPath };
