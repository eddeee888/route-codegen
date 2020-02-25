#!/usr/bin/env node

import yargs from 'yargs';
import generate from './../generate';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

const argv = yargs.options({
  config: { type: 'string', default: 'route-codegen.yml' },
}).argv;

try {
  const { config } = argv;
  const ymlContent = readFileSync(config, 'utf8');

  const configContent = yaml.safeLoad(ymlContent);
  generate(configContent);
} catch (e) {
  console.log(e);
}
