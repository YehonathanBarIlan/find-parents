import getDirectParents from './direct-parents-finder.service.mjs';

describe('getDirectParents', () => {
  it('should return an empty array when there are no parents', () => {
    const mappedDependencies = [
      {dependencyName: 'root', level: 0, index: 0},
      {dependencyName: 'dep1', level: 1, index: 1},
    ];
    const matchedDependency = {dependencyName: 'root', level: 1, index: 1};
    const result = getDirectParents(mappedDependencies, matchedDependency);

    expect(result).toEqual([
      {dependencyName: 'root', level: 0, index: 0},
    ]);
  });

  it('should return direct parents correctly', () => {
    const mappedDependencies = [
      {dependencyName: 'root', level: 0, index: 0},
      {dependencyName: 'dep1', level: 1, index: 1},
      {dependencyName: 'dep2', level: 2, index: 2},
    ];
    const matchedDependency = {dependencyName: 'dep2', level: 2, index: 2};
    const result = getDirectParents(mappedDependencies, matchedDependency);

    expect(result).toEqual([
      {dependencyName: 'dep1', level: 1, index: 1},
      {dependencyName: 'root', level: 0, index: 0},
    ]);
  });

  it('should stop at level 0', () => {
    const mappedDependencies = [
      {dependencyName: 'root', level: 0, index: 0},
      {dependencyName: 'dep1', level: 1, index: 1},
      {dependencyName: 'dep2', level: 2, index: 2},
      {dependencyName: 'dep3', level: 1, index: 3},
    ];
    const matchedDependency = {dependencyName: 'dep3', level: 1, index: 3};
    const result = getDirectParents(mappedDependencies, matchedDependency);

    expect(result).toEqual([
      {dependencyName: 'root', level: 0, index: 0},
    ]);
  });


  it('tracked level is 0, should be no parents', () => {
    const mappedDependencies = [
      {dependencyName: 'root', level: 0, index: 0},
      {dependencyName: 'dep1', level: 1, index: 1},
      {dependencyName: 'dep2', level: 2, index: 2},
      {dependencyName: 'dep3', level: 1, index: 3},
      {dependencyName: 'r2', level: 0, index: 4},
    ];
    const matchedDependency = {dependencyName: 'r2', level: 0, index: 4};
    const result = getDirectParents(mappedDependencies, matchedDependency);

    expect(result).toEqual([]);
  });
});
