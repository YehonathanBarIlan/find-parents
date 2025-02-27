import mapDependencies from './map-dependencies.service.mjs';
import getMatch from './identify-valid-dependency-line.service.mjs';
import getLevelOfDependency from './level-count-extraction.service.mjs';

jest.mock('./identify-valid-dependency-line.service.mjs');
jest.mock('./level-count-extraction.service.mjs');

describe('mapDependencies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty array when there are no matches', () => {
    getMatch.mockReturnValue(null);

    const input = '| +-- babel-jest@29.5.0\n| +-- bs-logger@0.2.6\n| +-- fast-json-stable-stringify@2.1.0';
    const result = mapDependencies(input);

    expect(result).toEqual([]);
  });

  it('should return an array with 3 matches', () => {
    getMatch
        .mockReturnValueOnce({input: '| +-- babel-jest@29.5.0', 3: 'babel-jest@29.5.0'})
        .mockReturnValueOnce({input: '| +-- bs-logger@0.2.6', 3: 'bs-logger@0.2.6'})
        .mockReturnValueOnce({input: '| +-- fast-json-stable-stringify@2.1.0', 3: 'fast-json-stable-stringify@2.1.0'});

    getLevelOfDependency
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1);

    const input = '| +-- babel-jest@29.5.0\n| +-- bs-logger@0.2.6\n| +-- fast-json-stable-stringify@2.1.0';
    const result = mapDependencies(input);

    expect(result).toEqual([
      {dependencyName: 'babel-jest@29.5.0', level: 1, index: 0},
      {dependencyName: 'bs-logger@0.2.6', level: 1, index: 1},
      {dependencyName: 'fast-json-stable-stringify@2.1.0', level: 1, index: 2},
    ]);
    expect(getMatch).toHaveBeenCalledWith('| +-- babel-jest@29.5.0')
  });
});
