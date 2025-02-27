import getAllMatchedToTarget from './find-matches-of-dependency.service.mjs';

describe('getAllMatchedToTarget', () => {
  it('should return an empty array when there are no matches', () => {
    const mappedDependencies = [
      {dependencyName: 'dep1', level: 1, index: 0},
      {dependencyName: 'dep2', level: 2, index: 1},
    ];
    const targetDependency = 'dep3';
    const result = getAllMatchedToTarget(mappedDependencies, targetDependency);

    expect(result).toEqual([]);
  });

  it('should return matched dependencies correctly', () => {
    const mappedDependencies = [
      {dependencyName: 'dep1', level: 1, index: 0},
      {dependencyName: 'dep2', level: 2, index: 1},
      {dependencyName: 'dep3', level: 1, index: 2},
    ];
    const targetDependency = 'dep';
    const result = getAllMatchedToTarget(mappedDependencies, targetDependency);

    expect(result).toEqual([
      {dependencyName: 'dep1', level: 1, index: 0},
      {dependencyName: 'dep2', level: 2, index: 1},
      {dependencyName: 'dep3', level: 1, index: 2},
    ]);
  });

  it(
      'should return only dependencies that start with the target dependency',
      () => {
        const mappedDependencies = [
          {dependencyName: 'dep1', level: 1, index: 0},
          {dependencyName: 'otherDep', level: 2, index: 1},
          {dependencyName: 'dep3', level: 1, index: 2},
        ];
        const targetDependency = 'dep';
        const result = getAllMatchedToTarget(mappedDependencies, targetDependency);

        expect(result).toEqual([
          {dependencyName: 'dep1', level: 1, index: 0},
          {dependencyName: 'dep3', level: 1, index: 2},
        ]);
      });
});
