# find-parents
A tool to find the direct parents of a specific npm dependency.
This tool outputs a file called "direct-parents-of-${targetDependency}.json" in your project folder which includes all matches of the dependecy and their direct parents, direct grandparents and so on.
So you can know exactly what is the root parent for your target dependency.

## installation:
```
npm i @yehonathan-bar-ilan/find-parents --save-dev
```

## usage:
after the -d put your target dependency, without the version number
```
npx find-parents -d inflight
```