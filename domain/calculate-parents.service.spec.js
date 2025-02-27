import calculateParents from './calculate-parents.service.mjs';
import getAllMatchedToTarget from './find-matches-of-dependency.service.mjs';
import getDirectParents from './direct-parents-finder.service.mjs';

jest.mock('./find-matches-of-dependency.service.mjs');
jest.mock('./direct-parents-finder.service.mjs');

describe('calculateParents', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty array when there are no matched dependencies',
      () => {
        getAllMatchedToTarget.mockReturnValue([]);

        const mappedDependencies = [
          {dependencyName: 'dep1', level: 1, index: 0},
          {dependencyName: 'dep2', level: 2, index: 1},
        ];
        const targetDependency = 'dep3';
        const result = calculateParents(mappedDependencies, targetDependency);

        expect(result).toEqual([]);
      });

  it('should return matched dependencies with their direct parents', () => {
    const matchedDependencies = [
      {dependencyName: 'dep1', level: 1, index: 0},
      {dependencyName: 'dep2', level: 2, index: 1},
    ];
    getAllMatchedToTarget.mockReturnValue(matchedDependencies);
    getDirectParents
        .mockReturnValueOnce([{dependencyName: 'root', level: 0, index: -1}])
        .mockReturnValueOnce([{dependencyName: 'dep1', level: 1, index: 0}]);

    const mappedDependencies = [
      {dependencyName: 'root', level: 0, index: -1},
      {dependencyName: 'dep1', level: 1, index: 0},
      {dependencyName: 'dep2', level: 2, index: 1},
    ];
    const targetDependency = 'dep';
    const result = calculateParents(mappedDependencies, targetDependency);

    expect(result).toEqual([
      {
        matchedDependency: 'dep1',
        parents: [{dependencyName: 'root', level: 0, index: -1}],
      },
      {
        matchedDependency: 'dep2',
        parents: [{dependencyName: 'dep1', level: 1, index: 0}],
      },
    ]);
  });
});
