import {
  capitalizeFirstChar,
  Import,
  keyHelpers,
  printImport,
  TemplateFile,
  KeyType,
  throwError,
  info,
  getOverriddenValue,
  handleImportCustomLink,
  GeneralCodegenPlugin,
  BaseRouteGenerator,
} from "../../utils";

interface ParsedLinkOptionsNextJS {
  importLink: Import;
  linkComponent: string;
  linkProps: string;
  hrefProp: string;
  generateLinkComponent: boolean;
  generateUseParams: boolean;
  generateUseRedirect: boolean;
  mode: "strict" | "loose";
}

interface GenerateLinkInterfaceParams {
  routeLinkOptions: ParsedLinkOptionsNextJS;
  defaultLinkPropsInterfaceName: string;
  urlParamsInterfaceName: string;
  hasPathParams: boolean;
}

interface GenerateLinkInterfaceResult {
  importLink?: Import;
  linkPropsTemplate: string;
  linkComponent: string;
  linkProps?: string;
  hrefProp: string;
  linkPropsInterfaceName: string;
}

class TypescriptNextJSPlugin extends BaseRouteGenerator<ParsedLinkOptionsNextJS> {
  generate(): TemplateFile[] {
    const result: TemplateFile[] = [];

    const linkOptions = this._getLinkOptions();

    if (linkOptions.generateLinkComponent) {
      result.push(this._generateLinkFile());
    }

    const pathParamsData = this._checkPathParamsInterfaceName();
    if (linkOptions.generateUseParams && pathParamsData.type !== "none") {
      result.push(this._generateUseParamsFile());
    }

    if (linkOptions.generateUseRedirect) {
      result.push(this._generateUseRedirectFile());
    }

    return result;
  }

  private _generateLinkFile(): TemplateFile {
    const {
      routeName: originalRouteName,
      destinationDir,
      patternNamedExports: {
        filename: routePatternFilename,
        pathParamsInterfaceName,
        urlParamsInterfaceName,
        patternNameNextJS,
        possiblePathParamsVariableName,
      },
    } = this.config;

    const routeName = capitalizeFirstChar(originalRouteName);

    const functionName = `Link${routeName}`;
    const defaultLinkPropsInterfaceName = `Link${routeName}Props`;
    const hasPathParams = !!pathParamsInterfaceName;

    const { hrefProp, importLink, linkComponent, linkPropsTemplate, linkPropsInterfaceName } = this._generateLinkInterface({
      defaultLinkPropsInterfaceName,
      urlParamsInterfaceName,
      routeLinkOptions: this._getLinkOptions(),
      hasPathParams,
    });

    if (!patternNameNextJS) {
      return throwError([], 'Missing "patternNameNextJS". This is most likely a problem with route-codegen.');
    }

    const namedImportsFromPatternFile = [{ name: urlParamsInterfaceName }, { name: patternNameNextJS }];
    let pathnameTemplate = `const pathname = ${patternNameNextJS};`;
    if (possiblePathParamsVariableName) {
      namedImportsFromPatternFile.push({ name: possiblePathParamsVariableName });
      pathnameTemplate = `const pathname = ${possiblePathParamsVariableName}.filter((key) => !(key in path)).reduce((prevPattern, suppliedParam) => prevPattern.replace(\`/[${"${suppliedParam"}}]\`, ""), ${patternNameNextJS});`;
    }

    const template = `${printImport({ defaultImport: "React", from: "react" })}
    ${importLink ? printImport(importLink) : ""}
    ${printImport({ namedImports: namedImportsFromPatternFile, from: `./${routePatternFilename}` })}
    ${linkPropsTemplate}
    export const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = ({ urlParams, ...props}) => {
      const query = urlParams?.query || {};
      const path = ${hasPathParams ? "urlParams.path" : "{}"};
      ${pathnameTemplate}
      const nextHref = {
        pathname: pathname,
        query: {
          ...path,
          ...query,
        },
      }
      return <${linkComponent} {...props} ${hrefProp}={nextHref} />;
    }`;

    const templateFile: TemplateFile = {
      template,
      filename: functionName,
      extension: ".tsx",
      destinationDir,
      routeName: originalRouteName,
      hasDefaultExport: false,
      hasNamedExports: true,
    };

    return templateFile;
  }

  private _generateLinkInterface(params: GenerateLinkInterfaceParams): GenerateLinkInterfaceResult {
    const { routeLinkOptions, defaultLinkPropsInterfaceName, urlParamsInterfaceName, hasPathParams } = params;
    const { hrefProp, linkProps, importLink, linkComponent } = routeLinkOptions;

    const urlParamsModifier = hasPathParams ? "" : "?";
    const urlParamsTemplate = `{ urlParams${urlParamsModifier}: ${urlParamsInterfaceName} }`;

    const linkPropsTemplate = `type ${defaultLinkPropsInterfaceName} = Omit<${linkProps}, '${hrefProp}'> & ${urlParamsTemplate}`;
    const linkPropsInterfaceName = defaultLinkPropsInterfaceName;

    return {
      importLink,
      linkPropsTemplate,
      linkComponent,
      hrefProp,
      linkPropsInterfaceName,
    };
  }

  private _generateUseParamsFile(): TemplateFile {
    const {
      routeName: originalRouteName,
      destinationDir,
      patternNamedExports: { filename: pathParamsFilename },
      routePattern,
    } = this.config;

    const { mode } = this._getLinkOptions();

    const pathParamsData = this._checkPathParamsInterfaceName();
    if (pathParamsData.type === "none") {
      return throwError([], "Cannot generate useParams file for a pattern without dynamic path params");
    }

    const { pathParamsInterfaceName } = pathParamsData;
    const routeName = capitalizeFirstChar(originalRouteName);
    const functionName = `useParams${routeName}`;
    const keys = keyHelpers.getKeysFromRoutePattern(routePattern);

    const printFieldType = (keyName: string | number): string => `${pathParamsInterfaceName}["${keyName}"]`;

    const templateMap: Record<ParsedLinkOptionsNextJS["mode"], () => string> = {
      strict: function createStrictTemplate() {
        const templates = keys.map((key) => {
          const templateMap: Record<KeyType, () => string> = {
            normal: () => {
              if (keyHelpers.isOptional(key)) {
                return `${key.name}: query.${key.name} ? (query.${key.name} as ${printFieldType(key.name)}) : undefined,`;
              }
              return `${key.name}: query.${key.name} as ${printFieldType(key.name)},`;
            },
            enum: () => {
              const enumOptions = key.pattern.split("|");
              const options = keyHelpers.isOptional(key) ? [...enumOptions, undefined] : [...enumOptions];
              const possibleValuesVarName = `${key.name}PossibleValues`;
              let optonsTemplate = options.reduce((prev, option) => {
                if (option === undefined) {
                  return `${prev}undefined,`;
                }
                return `${prev}"${option}",`;
              }, `const ${possibleValuesVarName} = [`);
              optonsTemplate += "]";

              const validatorTemplate = `if(${possibleValuesVarName}.findIndex((v) => v === query.${key.name}) === -1){ throw new Error("Unable to match '${key.name}' with expected enums"); }`;

              return `${key.name}: (() => {
                ${optonsTemplate}
                ${validatorTemplate}
                return query.${key.name} as ${printFieldType(key.name)}
              })(),`;
            },
          };
          return templateMap[keyHelpers.getType(key)]();
        });
        return templates.join("\n");
      },
      loose: function createLooseTemplate() {
        return `${keys.reduce((prev, key) => {
          if (keyHelpers.isOptional(key)) {
            return `${prev}${key.name}: query.${key.name} ? query.${key.name} : undefined,`;
          }
          return `${prev}${key.name}: query.${key.name} ?? '',`;
        }, "")}`;
      },
    };

    const template = `${printImport({ namedImports: [{ name: pathParamsInterfaceName }], from: `./${pathParamsFilename}` })}
      ${printImport({ namedImports: [{ name: "useRouter" }], from: "next/router" })}
      export const ${functionName} = (): ${pathParamsInterfaceName} => {
        const query = useRouter().query;
        return {${templateMap[mode]()}};
      }`;

    return {
      template,
      extension: ".ts",
      filename: functionName,
      destinationDir,
      routeName: originalRouteName,
      hasDefaultExport: false,
      hasNamedExports: true,
    };
  }

  private _checkPathParamsInterfaceName():
    | { type: "none" }
    | { type: "normal"; pathParamsInterfaceName: string }
    | { type: "nextJS"; pathParamsInterfaceName: string } {
    const { patternNamedExports } = this.config;

    if (patternNamedExports.pathParamsInterfaceNameNextJS) {
      return { type: "nextJS", pathParamsInterfaceName: patternNamedExports.pathParamsInterfaceNameNextJS };
    }
    if (patternNamedExports.pathParamsInterfaceName) {
      return { type: "normal", pathParamsInterfaceName: patternNamedExports.pathParamsInterfaceName };
    }
    return { type: "none" };
  }

  private _generateUseRedirectFile(): TemplateFile {
    const {
      routeName: originalRouteName,
      patternNamedExports: {
        pathParamsInterfaceName,
        filename: routePatternFilename,
        urlParamsInterfaceName,
        patternNameNextJS,
        possiblePathParamsVariableName,
      },
      destinationDir,
    } = this.config;

    if (!patternNameNextJS) {
      return throwError([], 'Missing "patternNameNextJS". This is most likely a problem with route-codegen.');
    }

    const routeName = capitalizeFirstChar(originalRouteName);

    const functionName = `useRedirect${routeName}`;
    const pathVariable = pathParamsInterfaceName ? "urlParams.path" : "{}";
    const urlParamsModifier = pathParamsInterfaceName ? "" : "?";
    const resultTypeInterface = `RedirectFn${routeName}`;

    const namedImportsFromPatternFile = [{ name: urlParamsInterfaceName }, { name: patternNameNextJS }];
    let pathnameTemplate = `const pathname = ${patternNameNextJS};`;
    if (possiblePathParamsVariableName) {
      namedImportsFromPatternFile.push({ name: possiblePathParamsVariableName });
      pathnameTemplate = `const pathname = ${possiblePathParamsVariableName}.filter((key) => !(key in urlParams.path)).reduce((prevPattern, suppliedParam) => prevPattern.replace(\`/[${"${suppliedParam"}}]\`, ""), ${patternNameNextJS});`;
    }

    const template = `${printImport({ namedImports: [{ name: "useRouter" }], from: "next/router" })}
    ${printImport({ namedImports: namedImportsFromPatternFile, from: `./${routePatternFilename}` })}
    export type ${resultTypeInterface} = (urlParams${urlParamsModifier}: ${urlParamsInterfaceName}) => void;
    export const ${functionName} = (): ${resultTypeInterface} => {
      const router = useRouter();
      const redirect: ${resultTypeInterface} = urlParams => {
        const query = urlParams?.query ?? {};
        const path = ${pathVariable};
        ${pathnameTemplate}
        router.push({
          pathname: pathname,
          query: {
            ...path,
            ...query,
          },
        })
      }
      return redirect;
    }`;

    const templateFile: TemplateFile = {
      template,
      filename: functionName,
      extension: ".ts",
      destinationDir,
      routeName: originalRouteName,
      hasDefaultExport: false,
      hasNamedExports: true,
    };

    return templateFile;
  }

  protected _parseLinkOptions(): void {
    const { appName, routeLinkOptions, topLevelGenerateOptions } = this.config;

    const defaultOptions: ParsedLinkOptionsNextJS = {
      importLink: {
        from: "next/link",
        defaultImport: "Link",
        namedImports: [{ name: "LinkProps" }],
      },
      linkComponent: "Link",
      linkProps: "LinkProps",
      hrefProp: "href",
      generateLinkComponent: topLevelGenerateOptions.generateLinkComponent,
      generateUseParams: topLevelGenerateOptions.generateUseParams,
      generateUseRedirect: topLevelGenerateOptions.generateUseRedirect,
      mode: "loose",
    };
    if (!routeLinkOptions) {
      info([appName, "nextJSLinkOptions"], "custom options not found... Using default");
      this.linkOptions = { ...defaultOptions };
      return;
    }

    const result: ParsedLinkOptionsNextJS = {
      ...defaultOptions,
      generateLinkComponent: getOverriddenValue(defaultOptions.generateLinkComponent, routeLinkOptions.generate?.linkComponent),
      generateUseParams: getOverriddenValue(defaultOptions.generateUseParams, routeLinkOptions.generate?.useParams),
      generateUseRedirect: getOverriddenValue(defaultOptions.generateUseRedirect, routeLinkOptions.generate?.useRedirect),
      mode: (() => {
        const mode: ParsedLinkOptionsNextJS["mode"] =
          routeLinkOptions.mode === "strict" || routeLinkOptions.mode === "loose" ? routeLinkOptions.mode : defaultOptions.mode;
        return getOverriddenValue(defaultOptions.mode, mode);
      })(),
    };

    if (!routeLinkOptions.importCustomLink) {
      info([appName, "nextJSLinkOptions", "importCustomLink"], "custom options not found... Using default");
      this.linkOptions = { ...result };
      return;
    }

    info([appName, "nextJSLinkOptions"], "using custom link options");
    const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink({
      appName,
      linkOptionName: "nextJSLinkOptions",
      importCustomLink: routeLinkOptions.importCustomLink,
    });

    this.linkOptions = {
      ...result,
      importLink,
      hrefProp,
      linkComponent,
      linkProps,
    };
  }
}

export const plugin: GeneralCodegenPlugin = {
  type: "route-internal",
  isNextJS: true,
  generate: (config) => {
    return new TypescriptNextJSPlugin(config).generate();
  },
};
