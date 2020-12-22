import { TemplateFile } from "../../types";
import { Key } from "path-to-regexp";
import { RoutingType } from "../../config";
import { throwError, keyHelpers, KeyType } from "../../utils";
import { PatternNamedExports } from "../types";
import isOptional from "../../utils/keyHelpers/isOptional";

export interface GenerateRoutePatternFileParams {
  origin: string;
  routeName: string;
  routePattern: string;
  destinationDir: string;
  routingType: RoutingType;
  linkOptionModeNextJS: "strict" | "loose";
}

const generateRoutePatternFile = (params: GenerateRoutePatternFileParams): [TemplateFile, PatternNamedExports] => {
  const { routePattern, routeName, destinationDir, routingType, origin, linkOptionModeNextJS } = params;

  const keys = keyHelpers.getKeysFromRoutePattern(routePattern);

  const patternName = `pattern${routeName}`;
  const originName = `origin${routeName}`;
  const filename = patternName;
  const pathParams = generatePathParamsInterface(keys, routeName);
  const possiblePathParams = generatePossiblePathParams(keys, routeName);
  const urlParts = generateUrlPartsInterface(routeName, pathParams);

  const patternNextJS = routingType === RoutingType.NextJS ? generateNextJSPattern({ keys, routeName, routePattern }) : null;
  const pathParamsNextJS =
    routingType === RoutingType.NextJS && linkOptionModeNextJS === "loose" ? generateNextJSPathParams(keys, routeName) : null;

  const template = `export const ${patternName} = '${routePattern}'
  export const ${originName} = '${origin}'
  ${patternNextJS ? patternNextJS.template : ""}
  ${pathParams ? pathParams.template : ""}
  ${pathParamsNextJS ? pathParamsNextJS.template : ""}
  ${possiblePathParams ? possiblePathParams.template : ""}
  ${urlParts.template}`;

  const result: [TemplateFile, PatternNamedExports] = [
    {
      template,
      filename,
      extension: ".ts",
      destinationDir,
    },
    {
      originName,
      patternName,
      patternNameNextJS: patternNextJS ? patternNextJS.variableName : undefined,
      pathParamsInterfaceName: pathParams ? pathParams.interfaceName : undefined,
      pathParamsInterfaceNameNextJS: pathParamsNextJS ? pathParamsNextJS.interfaceName : undefined,
      possiblePathParamsVariableName: possiblePathParams ? possiblePathParams.variableName : undefined,
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

  // We need to make this alias type because it's a bit more flexible to use
  // Using interface for example, creates `Index signature is missing in type` error when using as generic in expressjs RequestHandler
  // This is because it cannot be used to extend things like `interface A { [key: string]: string; }`
  // https://github.com/microsoft/TypeScript/issues/15300
  let template = `export type ${pathParamsInterfaceName} = {`;
  keys.forEach((key) => {
    const fieldName = `${key.name}${isOptional(key) ? "?" : ""}`;

    const templateMap: Record<KeyType, (t: string) => string> = {
      normal: (t) => (t += `${fieldName}: string;`),
      enum: (t) => {
        // Note: We are using enum here... this may not be safe
        const enumArray = key.pattern.split("|");
        t += `${fieldName}:`;
        enumArray.forEach((enumValue) => (t += `'${enumValue}'|`));
        // Remove last '|'
        t = t.slice(0, -1);
        t += `;`;
        return t;
      },
    };
    template = templateMap[keyHelpers.getType(key)](template);
  });
  template += "}";

  return {
    template,
    interfaceName: pathParamsInterfaceName,
  };
};

interface PossibleParamsResult {
  template: string;
  variableName: string;
}

const generatePossiblePathParams = (keys: Key[], routeName: string): PossibleParamsResult | undefined => {
  if (keys.length === 0) {
    return;
  }

  const variableName = `possilePathParams${routeName}`;
  let template = `export const ${variableName} = [`;
  template = keys.reduce((prevTemplate, { name }) => prevTemplate + `'${name}',`, template);
  template += "]";

  return {
    template,
    variableName,
  };
};

// NextJS only support string params
const generateNextJSPathParams = (keys: Key[], routeName: string): PathParamsInterfaceResult | null => {
  if (keys.length === 0) {
    return null;
  }

  const pathParamsInterfaceName = `PathParamsNextJS${routeName}`;
  let template = `export interface ${pathParamsInterfaceName} {`;
  keys.forEach((key) => {
    // TODO: check if NextJS support optional param?
    const fieldName = `${key.name}${keyHelpers.isOptional(key) ? "?" : ""}`;
    template += `${fieldName}: string | string[];`;
  });
  template += "}";

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
    ${pathParams ? `path: ${pathParams.interfaceName};` : ""}
    query?: Record<string, string | undefined>;
    origin?: string;
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

  const routeParts = routePattern.split("/");
  // NextJS pattern uses [...] and no support for enums. Therefore, we need to turn:
  // - ":id" to "[id]"
  // - ":optional?" to "[optional]"
  // - ":subview(profile|pictires)" to "[subview]"
  // - ":optionalEnum(enumOne|enumTwo)?" to "[optionalEnum]"
  const routePartsNextJS = routeParts.map((routePart) => {
    if (routePart.charAt(0) !== ":") {
      //not a dynamic path, just return
      return routePart;
    }

    const matchedKey = keys.find((key) => {
      switch (keyHelpers.getType(key)) {
        case KeyType.normal: {
          return routePart === `:${key.name}${isOptional(key) ? "?" : ""}`;
        }
        case KeyType.enum: {
          return routePart === `:${key.name}(${key.pattern})${isOptional(key) ? "?" : ""}`;
        }
        default: {
          return false;
        }
      }
    });

    // Cannot find a matchedKey for the routePart.. this shouldn't happen if we handle all the cases in ".find"
    if (!matchedKey) {
      return throwError([], `Cannot find key for ${routePart} in ${routePattern}`);
    }

    return `[${matchedKey.name}]`;
  });

  const routePath = `${routePartsNextJS.join("/")}`;
  const template = `/** Recommended file paths:
   * - "src/pages${routePath}.tsx"
   * - "pages${routePath}.tsx"
   */
  export const ${variableName} = "${routePath}"`;

  return { template, variableName };
};

export default generateRoutePatternFile;
