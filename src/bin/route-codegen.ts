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

export { verbose };

try {
  console.log('route-codegen start!');
  const ymlContent = readFileSync(config, 'utf8');

  const configContent = yaml.safeLoad(ymlContent);
  generate(configContent);
  console.log('route-codegen done!');
} catch (e) {
  if (stacktrace) {
    console.log(e);
  } else {
    console.log(e.message);
  }
  process.exit(1);
}
