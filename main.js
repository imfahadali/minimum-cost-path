function findLowestCostPath(airports, departure, arrival) {
    if (isValid(airports, departure, arrival) !== true) {
        throw new Error("Invalid Input.")
    }

    if (airports.length == 0) {

    }

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

function isValid(airports, departure, arrival) {
    return departure !== '' && arrival !== '' && Array.isArray(airports);
}

module.exports = { findLowestCostPath };
