import mapDependencies from './map-dependencies.service.mjs';
import calculateParents from './calculate-parents.service.mjs';

function findParents(npmLsAllFileContent, targetDependency) {
  const mappedDependencies = mapDependencies(npmLsAllFileContent);
  return calculateParents(mappedDependencies, targetDependency);
}
export default findParents;