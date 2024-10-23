// pathFinder.test.js

const { findLowestCostPath } = require('./main');

describe('findLowestCostPath', () => {
    test('Test Case 1', () => {
        const airports = [
            { start: 'A', end: 'B', cost: 100 }
        ];
        const result = findLowestCostPath(airports, 'A', 'B');
        expect(result.path).toEqual(['A', 'B']);
        expect(result.cost).toBe(100);
    });

    test('Test Case 2', () => {
        const airports = [
            { start: 'A', end: 'B', cost: 200 },
            { start: 'A', end: 'C', cost: 500 },
            { start: 'B', end: 'C', cost: 100 },
            { start: 'B', end: 'D', cost: 300 },
            { start: 'C', end: 'D', cost: 100 }
        ];
        const result = findLowestCostPath(airports, 'A', 'D');
        expect(result.path).toEqual(['A', 'B', 'C', 'D']);
        expect(result.cost).toBe(400);
    });

    test('Test Case 3', () => {
        const airports = [
            { start: 'A', end: 'B', cost: 150 },
            { start: 'C', end: 'D', cost: 200 }
        ];
        expect(() => {
            findLowestCostPath(airports, 'A', 'D');
        }).toThrow("No Flight found for the given source and destination.");
    });

    test('Test Case 4', () => {
        const airports = [
            { start: 'A', end: 'B', cost: 100 },
            { start: 'B', end: 'C', cost: 100 },
            { start: 'C', end: 'A', cost: 100 }, // Cycle A → B → C → A
            { start: 'C', end: 'D', cost: 100 },
            { start: 'B', end: 'D', cost: 500 }
        ];
        const result = findLowestCostPath(airports, 'A', 'D');
        expect(result.path).toEqual(['A', 'B', 'C', 'D']);
        expect(result.cost).toBe(300);
    });

    test('Test Case 5', () => {
        const airports = [
            { start: 'A', end: 'B', cost: 100 },
            { start: 'A', end: 'C', cost: 100 },
            { start: 'B', end: 'D', cost: 100 },
            { start: 'C', end: 'D', cost: 100 }
        ];
        const result = findLowestCostPath(airports, 'A', 'D');
        const possiblePaths = [['A', 'B', 'D'], ['A', 'C', 'D']];
        expect(possiblePaths).toContainEqual(result.path);
        expect(result.cost).toBe(200);
    });

    test('Test Case 6', () => {
        const airports = [
            { start: 'A', end: 'B', cost: 50 },
            { start: 'B', end: 'C', cost: 100 },
            { start: 'C', end: 'D', cost: 30 },
            { start: 'A', end: 'D', cost: 180 },
        ];
        const result = findLowestCostPath(airports, 'A', 'D');
        expect(result.path).toEqual(['A', 'D']);
        expect(result.cost).toBe(180);
    });

    test('Test Case 7', () => {
        const airports = [
            { start: 'A', end: 'B', cost: 100 },
            { start: 'B', end: 'C', cost: 100 },
            { start: 'D', end: 'E', cost: 100 }
        ];
        expect(() => {
            findLowestCostPath(airports, 'A', 'E');
        }).toThrow("No Flight found for the given source and destination.");
    });

    test('Test Case 8', () => {
        const airports = [
            { start: 'A', end: 'A', cost: 0 }, // Self-loop
            { start: 'A', end: 'B', cost: 100 },
            { start: 'B', end: 'C', cost: 100 },
            { start: 'C', end: 'D', cost: 100 }
        ];
        const result = findLowestCostPath(airports, 'A', 'D');
        expect(result.path).toEqual(['A', 'B', 'C', 'D']);
        expect(result.cost).toBe(300);
    });

    test('Test Case 9', () => {
        const airports = [
            { start: 'A', end: 'B', cost: 50 },
            { start: 'A', end: 'C', cost: 60 },
            { start: 'A', end: 'D', cost: 70 },
            { start: 'B', end: 'C', cost: 40 },
            { start: 'B', end: 'D', cost: 80 },
            { start: 'C', end: 'D', cost: 30 }
        ];
        const result = findLowestCostPath(airports, 'A', 'D');
        expect(result.path).toEqual(['A', 'D']); // Direct path is the cheapest
        expect(result.cost).toBe(70);
    });

    test('Test Case 10', () => {
        const airports = [
            { start: 'A', end: 'B', cost: 100 },
            { start: 'A', end: 'C', cost: 100 },
            { start: 'B', end: 'D', cost: 100 },
            { start: 'C', end: 'D', cost: 100 },
            { start: 'B', end: 'C', cost: 50 }
        ];
        const result = findLowestCostPath(airports, 'A', 'D');
        const possiblePaths = [['A', 'B', 'D'], ['A', 'C', 'D']];
        expect(possiblePaths).toContainEqual(result.path);
        expect(result.cost).toBe(200);
    });

    test('Test Case 11', () => {
        const airports = [
            { start: 'ISB', end: 'LHR', cost: 1000 },
            { start: 'LHR', end: 'NYC', cost: 750 },
            { start: 'CBS', end: 'NYC', cost: 775 },
            { start: 'ISB', end: 'CBS', cost: 575 },
            { start: 'CBS', end: 'GRC', cost: 731 },
            { start: 'NYC', end: 'GRC', cost: 459 }
        ];
        const result = findLowestCostPath(airports, 'ISB', 'NYC');
        expect(result.path).toEqual(['ISB', 'CBS', 'NYC']);
        expect(result.cost).toBe(1350);
    });

    test('Test Case 12', () => {
        const airports = ""
        expect(() => {
            findLowestCostPath(airports, 'A', 'E');
        }).toThrow("Invalid Input.");
    })

    test('Test Case 13', () => {
        const airports = []
        expect(() => {
            findLowestCostPath(airports, 'A', 'E');
        }).toThrow("No Flight found for the given source and destination.");
    })

    test('Test Case 14', () => {
        const airports = []
        expect(() => {
            findLowestCostPath(airports, '', '');
        }).toThrow("Invalid Input.");
    })
});
