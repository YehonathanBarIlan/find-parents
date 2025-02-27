import getLevelOfDependency from './level-count-extraction.service.mjs';
import getMatch from './identify-valid-dependency-line.service.mjs';

/**
 * Maps dependencies from the input string to an array of objects.
 * @param {string} input - The input string containing dependencies.
 * @returns {Array<Object>} The mapped dependencies.
 */
function mapDependencies(input) {
  const lines = input.split('\n');
  const result = [];
  let index = 0;
  lines.forEach((line) => {
    const match = getMatch(line);
    if (match) {
      result.push(mapDependency(match, index++));
    }
  });
  return result;
}

function mapDependency(match, index) {
  return { 'dependencyName': match[3].split(' ')[0], 'level': getLevelOfDependency(match.input), 'index': index };
}

export default mapDependencies;
