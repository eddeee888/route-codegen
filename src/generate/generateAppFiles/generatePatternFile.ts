import { TemplateFile } from '../types';
import { Key, pathToRegexp } from 'path-to-regexp';
import isNormalPattern from '../utils/isNormalPattern';
import { RoutingType } from '../config';
import isEnumKey from '../utils/isEnumKey';
import throwError from '../utils/throwError';

export interface PatternNamedExports {
  patternName: string;
  patternNameNextJS?: string;
  pathParamsInterfaceName?: string;
  urlPartsInterfaceName: string;
  filename: string;
}

type GeneratePatternFile = (params: {
  appName: string;
  routeName: string;
  routePattern: string;
  destinationDir: string;
  routingType: RoutingType;
}) => [TemplateFile, PatternNamedExports];

const generateRoutePatternFile: GeneratePatternFile = ({
  routePattern,
  routeName,
  destinationDir,
  routingType,
  appName,
}) => {
  const keys: Key[] = [];
  pathToRegexp(routePattern, keys);

  const patternName = `pattern${routeName}`;
  const filename = patternName;
  const pathParams = generatePathParamsInterface(keys, routeName);
  const urlParts = generateUrlPartsInterface(routeName, pathParams);

  const patternNextJS =
    routingType === RoutingType.NextJS ? generateNextJSPattern({ appName, keys, routeName, routePattern }) : null;

  const template = `export const ${patternName} = '${routePattern}'
  ${patternNextJS ? patternNextJS.template : ''}
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
      patternNameNextJS: patternNextJS ? patternNextJS.variableName : undefined,
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
  template += '}';

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

const generateNextJSPattern = (params: {
  appName: string;
  keys: Key[];
  routePattern: string;
  routeName: string;
}): { template: string; variableName: string } => {
  const { appName, keys, routeName, routePattern } = params;

  const variableName = `patternNextJS${routeName}`;

  const routeParts = routePattern.split('/');
  // NextJS pattern uses [...] and no support for enums. Therefore, we need to turn:
  // - ":id" to "[id]"
  // - ":subview(profile|pictires)" to "[subview]"
  const routePartsNextJS = routeParts.map(routePart => {
    if (routePart.charAt(0) !== ':') {
      //not a param, just return
      return routePart;
    }

    const matchedKey = keys.find(key => {
      if (isNormalPattern(key.pattern) && routePart === `:${key.name}`) {
        // Normal pattern e.g. ":id"
        return true;
      } else if (isEnumKey(key) && routePart === `:${key.name}(${key.pattern})`) {
        return true;
      }
      return false;
    });

    // Cannot find a matchedKey for the routePart.. this shouldn't happen if we handle all the cases in ".find"
    if (!matchedKey) {
      return throwError([appName], `Cannot find key for ${routePart} in ${routePattern}`);
    }

    return `[${matchedKey.name}]`;
  });

  const template = `export const ${variableName} = '${routePartsNextJS.join('/')}'`;

  return { template, variableName };
};

export default generateRoutePatternFile;
