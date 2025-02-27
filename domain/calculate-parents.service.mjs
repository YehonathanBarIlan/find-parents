import getAllMatchedToTarget from './find-matches-of-dependency.service.mjs';
import getDirectParents from './direct-parents-finder.service.mjs';

function calculateParents(mappedDependencies, targetDependency) {
  return getAllMatchedToTarget(mappedDependencies, targetDependency).map((matchedDependency) => {
    return {
      matchedDependency: matchedDependency.dependencyName,
      parents: getDirectParents(mappedDependencies, matchedDependency),
    };
  });
}

export default calculateParents;
