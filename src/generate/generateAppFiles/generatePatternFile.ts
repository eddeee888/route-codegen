import { TemplateFile } from '../types';
import { Key, pathToRegexp } from 'path-to-regexp';
import isNormalPattern from '../utils/isNormalPattern';

export interface PatternNamedExports {
  patternName: string;
  pathParamsInterfaceName?: string;
  urlPartsInterfaceName: string;
  filename: string;
}

type GeneratePatternFile = (params: {
  routeName: string;
  routePattern: string;
  destinationDir: string;
}) => [TemplateFile, PatternNamedExports];

const generateRoutePatternFile: GeneratePatternFile = ({ routePattern, routeName, destinationDir }) => {
  const keys: Key[] = [];
  pathToRegexp(routePattern, keys);

  const patternName = `pattern${routeName}`;
  const filename = patternName;
  const pathParams = generatePathParamsInterface(keys, routeName);
  const urlParts = generateUrlPartsInterface(routeName, pathParams);

  const template = `export const ${patternName} = '${routePattern}';
  ${pathParams ? pathParams.template : ''}
  ${urlParts.template}`;

  const result: [TemplateFile, PatternNamedExports] = [
    {
      template,
      filename,
      extension: '.ts',
      destinationDir,
    },
    {
      patternName,
      pathParamsInterfaceName: pathParams ? pathParams.interfaceName : undefined,
      urlPartsInterfaceName: urlParts.interfaceName,
      filename,
    },
  ];

  return result;
};

interface PathParamsInterfaceResult {
  template: string;
  interfaceName: string;
}

const generatePathParamsInterface = (keys: Key[], routeName: string): PathParamsInterfaceResult | undefined => {
  if (keys.length === 0) {
    return;
  }

  const pathParamsInterfaceName = `PathParams${routeName}`;
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

const generateUrlPartsInterface = (
  routeName: string,
  pathParams: PathParamsInterfaceResult | undefined
): { template: string; interfaceName: string } => {
  const interfaceName = `UrlParts${routeName}`;

  const template = `export interface ${interfaceName} {
    ${pathParams ? `path: ${pathParams.interfaceName};` : ''}
    urlQuery?: Record<string, string>;
  }`;

  return { template, interfaceName };
};

export default generateRoutePatternFile;
