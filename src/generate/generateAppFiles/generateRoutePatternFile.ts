import { TemplateFile } from '../types';
import { Key } from 'path-to-regexp';
import isNormalPattern from '../utils/isNormalPattern';
import printImport from '../utils/printImport';

type GenerateRoutePatternFile = (params: {
  routeName: string;
  routePattern: string;
  keys: Key[];
  destinationDir: string;
}) => [TemplateFile, { interfaceName: string; importLine: string }?];

const generateRoutePatternFile: GenerateRoutePatternFile = ({ routePattern, keys, routeName, destinationDir }) => {
  const filename = `patternTo${routeName}`;
  const pathParams = generatePathParamsInterface(keys, routeName);

  const template = `const pattern = '${routePattern}';
  ${pathParams ? pathParams.template : ''}
  export default pattern;`;

  return [
    {
      template,
      filename,
      extension: '.ts',
      destinationDir,
    },
    pathParams && {
      interfaceName: pathParams.interfaceName,
      importLine: printImport({ namedImports: [{ name: pathParams.interfaceName }], from: `./${filename}` }),
    },
  ];
};

interface PathParamsInterfaceResult {
  template: string;
  interfaceName: string;
}

const generatePathParamsInterface = (keys: Key[], displayRouteName: string): PathParamsInterfaceResult | undefined => {
  if (keys.length === 0) {
    return;
  }

  const pathParamsInterfaceName = `${displayRouteName}PathParams`;
  let template = `export interface ${pathParamsInterfaceName} {`;
  keys.forEach(key => {
    const { pattern, name, modifier } = key;

    const fieldName = `${name}${modifier === '?' ? modifier : ''}`;

    if (isNormalPattern(pattern)) {
      template += `${fieldName}: string;`;
    } else {
      // Note: We are using enum here... this may not be safe
      const enumArray = pattern.split('|');
      if (enumArray.length > 0) {
        template += `${fieldName}:`;
        enumArray.forEach(enumValue => (template += `'${enumValue}'|`));
        // Remove last '|'
        template = template.slice(0, -1);
        template += `;`;
      }
    }
  });
  template += '}\n';

  return {
    template,
    interfaceName: pathParamsInterfaceName,
  };
};

export default generateRoutePatternFile;
