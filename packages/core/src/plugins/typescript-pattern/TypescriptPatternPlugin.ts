import { Key } from "path-to-regexp";
import {
  keyHelpers,
  capitalizeFirstChar,
  KeyType,
  throwError,
  BasePatternPlugin,
  PatternTemplateFile,
  PatternCodegenPlugin,
} from "../../utils";

interface PathParamsInterfaceResult {
  template: string;
  interfaceName: string;
}

interface PossibleParamsResult {
  template: string;
  variableName: string;
}

class TypescriptPatternPlugin extends BasePatternPlugin {
  generate(): PatternTemplateFile {
    const { routePattern, routeName: originalRouteName, routingType, destinationDir, origin, linkOptionModeNextJS } = this.config;

    const keys = keyHelpers.getKeysFromRoutePattern(routePattern);

    const routeName = capitalizeFirstChar(originalRouteName);

    const patternName = `pattern${routeName}`;
    const originName = `origin${routeName}`;
    const filename = patternName;
    const pathParams = this._generatePathParamsInterface(keys, routeName);
    const possiblePathParams = this._generatePossiblePathParams(keys, routeName);
    const urlParams = this._generateUrlParamsInterface(routeName, pathParams);

    // TODO: handle next js pattern
    const patternNextJS = linkOptionModeNextJS !== undefined ? this._generateNextJSPattern({ keys, routeName, routePattern }) : null;
    const pathParamsNextJS = linkOptionModeNextJS === "loose" ? this._generateNextJSPathParams(keys, routeName) : null;

    const template = `export const ${patternName} = '${routePattern}'
    export const ${originName} = '${origin}'
    ${patternNextJS ? patternNextJS.template : ""}
    ${pathParams ? pathParams.template : ""}
    ${pathParamsNextJS ? pathParamsNextJS.template : ""}
    ${possiblePathParams ? possiblePathParams.template : ""}
    ${urlParams.template}`;

    const result: PatternTemplateFile = {
      type: "pattern",
      routingType,
      namedExports: {
        originName,
        patternName,
        patternNameNextJS: patternNextJS ? patternNextJS.variableName : undefined,
        pathParamsInterfaceName: pathParams ? pathParams.interfaceName : undefined,
        pathParamsInterfaceNameNextJS: pathParamsNextJS ? pathParamsNextJS.interfaceName : undefined,
        possiblePathParamsVariableName: possiblePathParams ? possiblePathParams.variableName : undefined,
        urlParamsInterfaceName: urlParams.interfaceName,
        filename,
      },
      template,
      filename,
      extension: ".ts",
      destinationDir,
      routeName: originalRouteName,
      hasDefaultExport: false,
      hasNamedExports: true,
    };

    return result;
  }
  private _generatePathParamsInterface(keys: Key[], routeName: string): PathParamsInterfaceResult | undefined {
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
      const fieldName = `${key.name}${keyHelpers.isOptional(key) ? "?" : ""}`;

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
  }

  _generatePossiblePathParams(keys: Key[], routeName: string): PossibleParamsResult | undefined {
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
  }

  _generateUrlParamsInterface(
    routeName: string,
    pathParams: PathParamsInterfaceResult | undefined
  ): { template: string; interfaceName: string } {
    const interfaceName = `UrlParams${routeName}`;

    const template = `export interface ${interfaceName} {
      ${pathParams ? `path: ${pathParams.interfaceName};` : ""}
      query?: Record<string, string | undefined>;
      origin?: string;
    }`;

    return { template, interfaceName };
  }

  _generateNextJSPattern(params: { keys: Key[]; routePattern: string; routeName: string }): { template: string; variableName: string } {
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
            return routePart === `:${key.name}${keyHelpers.isOptional(key) ? "?" : ""}`;
          }
          case KeyType.enum: {
            return routePart === `:${key.name}(${key.pattern})${keyHelpers.isOptional(key) ? "?" : ""}`;
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
    // We are already adding the last connecting "/" manually so we just remove the last "/" if the routePath ends with it
    // An example is when the routePath is just "/"
    const recommendedRoutePath = routePath.charAt(routePath.length - 1) === "/" ? routePath.slice(0, -1) : routePath;
    const template = `/** Recommended file paths:
     * - "src/pages${recommendedRoutePath}/index.tsx"
     * - "pages${recommendedRoutePath}/index.tsx"
     */
    export const ${variableName} = "${routePath}"`;

    return { template, variableName };
  }

  _generateNextJSPathParams(keys: Key[], routeName: string): PathParamsInterfaceResult | null {
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
  }
}

export const plugin: PatternCodegenPlugin = {
  type: "pattern",
  generate: (config) => {
    return new TypescriptPatternPlugin(config).generate();
  },
};
