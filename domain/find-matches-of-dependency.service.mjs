function getAllMatchedToTarget(mappedDependencies, targetDependency) {
  return mappedDependencies.filter((dep) => dep.dependencyName.startsWith(targetDependency));
}

export default getAllMatchedToTarget;
