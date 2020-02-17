import generate from './../generate';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

try {
  let fileContents = readFileSync('./src/tests/routegen.yml', 'utf8');
  let config = yaml.safeLoad(fileContents);
  generate(config);
} catch (e) {
  console.log(e);
}
