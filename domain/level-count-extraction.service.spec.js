import getLevelOfDependency from './level-count-extraction.service.mjs';

describe('getLevelOfDependency', () => {
  test('should return 0 for a line without pipes', () => {
    const line = 'no pipes here';
    const result = getLevelOfDependency(line);
    expect(result).toBe(0);
  });

  test('should return the correct number of pipes for a line with pipes and a spece', () => {
    const line = '| | |   `-- glob@6.0.4';
    const result = getLevelOfDependency(line);
    expect(result).toBe(4);
  });

  test('should return 0 for a line that does not start with a pipe', () => {
    const line = '  | | |   `-- glob@6.0.4';
    const result = getLevelOfDependency(line);
    expect(result).toBe(0);
  });
});
