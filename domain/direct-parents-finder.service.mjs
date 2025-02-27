function getDirectParents(mappedDependencies, matchedDependency) {
  const directParents = [];
  let trackedLevel = matchedDependency.level;
  for (let i = matchedDependency.index - 1; i >= 0; i--) {
    if (trackedLevel===0){
      break;
    }
    if (mappedDependencies[i].level < trackedLevel) {
      directParents.push(mappedDependencies[i]);
      trackedLevel = mappedDependencies[i].level;
    }
  }
  return directParents;
}

export default getDirectParents;
