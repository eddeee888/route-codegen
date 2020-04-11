#!/usr/bin/env node

import yargs from 'yargs';
import generate from './../generate';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

const argv = yargs.options({
  config: { type: 'string', default: 'route-codegen.yml' },
  stacktrace: { type: 'boolean', default: false },
  verbose: { type: 'boolean', default: false },
}).argv;

const { config, stacktrace, verbose } = argv;

try {
  console.log('route-codegen START!');
  const ymlContent = readFileSync(config, 'utf8');

  const configContent = yaml.safeLoad(ymlContent);
  generate(configContent, { verbose });
  console.log('route-codegen END!');
} catch (e) {
  if (stacktrace) {
    console.log(e);
  } else {
    console.log(e.message);
  }
  process.exit(1);
}
