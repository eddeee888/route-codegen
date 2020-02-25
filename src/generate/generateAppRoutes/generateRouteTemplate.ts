import { Key } from 'path-to-regexp';
import isNormalPattern from './../utils/isNormalPattern';

interface Options {
  routePattern: string;
  displayRouteName: string;
  keys: Key[];
  routeCreator: string;
}

const generateRouteTemplate = ({ routePattern, displayRouteName, keys, routeCreator }: Options): string => {
  let interfaceName = '{}';

  let template = '/* This file was automatically generated and should not be edited. */\n';

  // imports
  template += `import createRoute from '${routeCreator}';\n`;

  // Generate route interface
  if (keys.length > 0) {
    interfaceName = `${displayRouteName}Params`;
    template += `export interface ${interfaceName} {\n`;
    keys.forEach(key => {
      const { pattern, name, modifier } = key;

      const fieldName = `${name}${modifier === '?' ? modifier : ''}`;

      if (isNormalPattern(pattern)) {
        template += `  ${fieldName}: string;\n`;
      } else {
        // Note: We are using enum here... this may not be safe
        const enumArray = pattern.split('|');
        if (enumArray.length > 0) {
          template += `  ${fieldName}:`;
          enumArray.forEach(enumValue => (template += `'${enumValue}'|`));
          // Remove last '|'
          template = template.slice(0, -1);
          template += `;\n`;
        }
      }
    });
    template += '}\n';
  }

  // Generate route object
  template += `const ${displayRouteName} = createRoute<${interfaceName}>('${routePattern}');\n`;
  template += `export default ${displayRouteName};\n`;

  return template;
};

export default generateRouteTemplate;
