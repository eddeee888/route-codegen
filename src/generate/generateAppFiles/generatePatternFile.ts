import { TemplateFile } from '../types';
import { Key } from 'path-to-regexp';
import { RoutingType } from '../config';
import throwError from '../utils/throwError';
import getKeyType from '../utils/getKeyType';
import { KeyType } from '../utils/getKeyType/getKeyType';
import getKeysFromRoutePattern from '../utils/getKeysFromRoutePattern';

export interface PatternNamedExports {
  patternName: string;
  patternNameNextJS?: string;
  pathParamsInterfaceName?: string;
  pathParamsInterfaceNameNextJS?: string;
  urlPartsInterfaceName: string;
  filename: string;
}

export interface GenerateRoutePatternFileParams {
  routeName: string;
  routePattern: string;
  destinationDir: string;
  routingType: RoutingType;
}

const generateRoutePatternFile = (params: GenerateRoutePatternFileParams): [TemplateFile, PatternNamedExports] => {
  const { routePattern, routeName, destinationDir, routingType } = params;

  const keys = getKeysFromRoutePattern(routePattern);

  const patternName = `pattern${routeName}`;
  const filename = patternName;
  const pathParams = generatePathParamsInterface(keys, routeName);
  const urlParts = generateUrlPartsInterface(routeName, pathParams);

  const patternNextJS =
    routingType === RoutingType.NextJS ? generateNextJSPattern({ keys, routeName, routePattern }) : null;
  const pathParamsNextJS = routingType === RoutingType.NextJS ? generateNextJSPathParams(keys, routeName) : null;

  const template = `export const ${patternName} = '${routePattern}'
  ${patternNextJS ? patternNextJS.template : ''}
  ${pathParams ? pathParams.template : ''}
  ${pathParamsNextJS ? pathParamsNextJS.template : ''}
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
      pathParamsInterfaceNameNextJS: pathParamsNextJS ? pathParamsNextJS.interfaceName : undefined,
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

    switch (getKeyType(key)) {
      case KeyType.normal:
        template += `${fieldName}: string;`;
        break;
      case KeyType.enum:
        // Note: We are using enum here... this may not be safe
        const enumArray = pattern.split('|');
        if (enumArray.length > 0) {
          template += `${fieldName}:`;
          enumArray.forEach(enumValue => (template += `'${enumValue}'|`));
          // Remove last '|'
          template = template.slice(0, -1);
          template += `;`;
        }
        break;
    }
  });
  template += '}';

  return {
    template,
    interfaceName: pathParamsInterfaceName,
  };
};

// NextJS only support string params
const generateNextJSPathParams = (keys: Key[], routeName: string): PathParamsInterfaceResult | null => {
  if (keys.length === 0) {
    return null;
  }

  const pathParamsInterfaceName = `PathParamsNextJS${routeName}`;
  let template = `export interface ${pathParamsInterfaceName} {`;
  keys.forEach(key => {
    // TODO: check if NextJS support optional param?
    const { name, modifier } = key;
    const fieldName = `${name}${modifier === '?' ? modifier : ''}`;
    template += `${fieldName}: string;`;
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
  keys: Key[];
  routePattern: string;
  routeName: string;
}): { template: string; variableName: string } => {
  const { keys, routeName, routePattern } = params;

  const variableName = `patternNextJS${routeName}`;

  const routeParts = routePattern.split('/');
  // NextJS pattern uses [...] and no support for enums. Therefore, we need to turn:
  // - ":id" to "[id]"
  // - ":optional?" to "[optional]"
  // - ":subview(profile|pictires)" to "[subview]"
  // - ":optionalEnum(enumOne|enumTwo)?" to "[optionalEnum]"
  const routePartsNextJS = routeParts.map(routePart => {
    if (routePart.charAt(0) !== ':') {
      //not a dynamic path, just return
      return routePart;
    }

    const matchedKey = keys.find(key => {
      switch (getKeyType(key)) {
        case KeyType.normal:
          return routePart === `:${key.name}${key.modifier}`;
        case KeyType.enum:
          return routePart === `:${key.name}(${key.pattern})${key.modifier}`;
        default:
          return false;
      }
    });

    // Cannot find a matchedKey for the routePart.. this shouldn't happen if we handle all the cases in ".find"
    if (!matchedKey) {
      return throwError([], `Cannot find key for ${routePart} in ${routePattern}`);
    }

    return `[${matchedKey.name}]`;
  });

  const template = `export const ${variableName} = '${routePartsNextJS.join('/')}'`;

  return { template, variableName };
};

export default generateRoutePatternFile;
