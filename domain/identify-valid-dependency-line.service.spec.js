import getMatch from './identify-valid-dependency-line.service.mjs';

describe('getMatch', () => {
  test(
      'should match a line with multiple pipes and a backtick dependency',
      () => {
        const line = '| | |   `-- glob@6.0.4';
        const match = getMatch(line);
        expect(match).not.toBeNull();
        expect(match[3]).toBe('glob@6.0.4');
      });

  test(
      'should match a line with a plus, space, single pipe and a dependency',
      () => {
        const line = '|   +-- babel-jest@29.5.0';
        const match = getMatch(line);
        expect(match).not.toBeNull();
        expect(match[3]).toBe('babel-jest@29.5.0');
      });

  test(
      'should match a line with a backtick, space single pipe and a dependency',
      () => {
        const line = '| | `-- source-map@0.7.4 deduped';
        const match = getMatch(line);
        expect(match).not.toBeNull();
        expect(match[3]).toBe('source-map@0.7.4 deduped');
      });

  test('should return null for a line without plus or backtick', () => {
    const line = 'babel-jest@29.5.0';
    const match = getMatch(line);
    expect(match).toBeNull();
  });

  test('should match a line with only backtick', () => {
    const line = '`-- babel-jest@29.5.0';
    const match = getMatch(line);
    expect(match[3]).toBe('babel-jest@29.5.0');
  });

  test('should match a line with only plus', () => {
    const line = '+-- baebel-jest@29.5.0';
    const match = getMatch(line);
    expect(match[3]).toBe('baebel-jest@29.5.0');
  });

  test('should return null for a line that does not match the pattern', () => {
    const line = '| | |   glob@6.0.4';
    const match = getMatch(line);
    expect(match).toBeNull();
  });

    test('should return null for a line that starts with illegal var', () => {
        const line = '&+-- baebel-jest@29.5.0';
        const match = getMatch(line);
        expect(match).toBeNull();
    });
});
