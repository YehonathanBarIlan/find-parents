/**
 * Extracts the match for a given line using a regular expression.
 * @param {string} line - The input line to match.
 * @returns {Array|null} The match result.
 */
function getMatch(line) {
  // Use traditional functions for module exports
  return RegExp(/^( *\| )*\s*(\+--|`--)\s(.+)/).exec(line);
}

export default getMatch;
