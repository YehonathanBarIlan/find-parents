/**
 * Gets the level of dependency by counting the number of characters before a backtick or a plus,
 * dividing it by 2, and rounding down.
 * @param {string} line - The input line to analyze.
 * @returns {number} The level of dependency.
 */
function getLevelOfDependency(line) {
  const match = line.match(/^\|[^+`]*(?=[+`])/);
  if (!match) {
    return 0;
  }
  const count = match[0].length;
  return Math.floor(count / 2);
}

export default getLevelOfDependency;
