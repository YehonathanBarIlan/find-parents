#!/usr/bin/env node
import { exec } from 'child_process';
import { program } from 'commander';
import findParents from './domain/find-parents-domain.service.mjs';
import { writeStringToAFile } from '@yehonathan-bar-ilan/file-ops';

program
  .version('1.0.0')
  .requiredOption('-d, --dependency <dependecy>', 'Name of the dependency to find parents for')
  .parse(process.argv);

const options = program.opts();
const targetDependency = options.dependency;
console.log(`start processing find-parents, please wait...`);
/**
 * This occurs on the target folder that links find-parents.
 */
exec('npm ls --all --loglevel verbose', async (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing npm ls: ${stderr}`);
    process.exit(1);
  }
  const output = findParents(stdout, targetDependency);
  const outputFileName = `direct-parents-of-${targetDependency}.json`;
  await writeStringToAFile(outputFileName, JSON.stringify(output, null, 2));
  console.log(`find-parents is done, direct parents file is at ${outputFileName}`);
});
