import { Key } from "path-to-regexp";
import { keyHelpers, capitalizeFirstChar, KeyType, BasePatternGenerator, PatternTemplateFile, PatternCodegenPlugin } from "../../utils";

interface PathParamsInterfaceResult {
  template: string;
  interfaceName: string;
}

class TypescriptPatternGenerator extends BasePatternGenerator {
  generate(): PatternTemplateFile {
    const { routePattern, routeName: originalRouteName, routingType, destinationDir, origin } = this.config;

    const keys = keyHelpers.getKeysFromRoutePattern(routePattern);

    const routeName = capitalizeFirstChar(originalRouteName);

    const patternName = `pattern${routeName}`;
    const originName = `origin${routeName}`;
    const filename = patternName;
    const pathParams = this._generatePathParamsInterface(keys, routeName);
    const urlParams = this._generateUrlParamsInterface(routeName, pathParams);

    const template = `export const ${patternName} = '${routePattern}'
    export const ${originName} = '${origin}'
    ${pathParams ? pathParams.template : ""}
    ${urlParams.template}`;

    const result: PatternTemplateFile = {
      type: "pattern",
      routingType,
      namedExports: {
        originName,
        patternName,
        pathParamsInterfaceName: pathParams ? pathParams.interfaceName : undefined,
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
}

export const plugin: PatternCodegenPlugin = {
  type: "pattern",
  generate: (config) => {
    return new TypescriptPatternGenerator(config).generate();
  },
};
