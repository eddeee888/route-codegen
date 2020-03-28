#!/usr/bin/env node

import yargs from 'yargs';
import generate from './../generate';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

const argv = yargs.options({
  config: { type: 'string', default: 'route-codegen.yml' },
  stacktrace: { type: 'boolean', default: false },
}).argv;

const { config, stacktrace } = argv;

try {
  const ymlContent = readFileSync(config, 'utf8');

  const configContent = yaml.safeLoad(ymlContent);
  generate(configContent);
} catch (e) {
  if (stacktrace) {
    console.log(e);
  } else {
    console.log(`ERROR: ${e.message}`);
  }
}
