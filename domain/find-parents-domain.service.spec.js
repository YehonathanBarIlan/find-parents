// findParents.spec.js
import findParents from './find-parents-domain.service.mjs';
import mapDependencies from './map-dependencies.service.mjs';
import calculateParents from './calculate-parents.service.mjs';

// Mock the dependencies
jest.mock('./map-dependencies.service.mjs');
jest.mock('./calculate-parents.service.mjs');

describe('findParents', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        jest.clearAllMocks();
    });

    test('should map dependencies and calculate parents correctly', () => {
        const npmLsAllFileContent = { /* some mock file content */ };
        const targetDependency = 'some-dependency';
        const mappedDependencies = { /* some mock mapped dependencies */ };
        const parentDependencies = ['parent1', 'parent2'];

        // Mock the implementations
        mapDependencies.mockReturnValue(mappedDependencies);
        calculateParents.mockReturnValue(parentDependencies);

        // Call the function
        const result = findParents(npmLsAllFileContent, targetDependency);

        // Assert the expected results
        expect(mapDependencies).toHaveBeenCalledWith(npmLsAllFileContent);
        expect(calculateParents).toHaveBeenCalledWith(mappedDependencies, targetDependency);
        expect(result).toEqual(parentDependencies);
    });

    test('should handle empty results correctly', () => {
        const npmLsAllFileContent = { /* some mock file content */ };
        const targetDependency = 'some-dependency';
        const mappedDependencies = { /* some mock mapped dependencies */ };

        // Mock the implementations
        mapDependencies.mockReturnValue(mappedDependencies);
        calculateParents.mockReturnValue([]);

        // Call the function
        const result = findParents(npmLsAllFileContent, targetDependency);

        // Assert the expected results
        expect(mapDependencies).toHaveBeenCalledWith(npmLsAllFileContent);
        expect(calculateParents).toHaveBeenCalledWith(mappedDependencies, targetDependency);
        expect(result).toEqual([]);
    });

    // Additional tests can be added here to cover more scenarios
});