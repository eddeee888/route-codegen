import { Key } from "path-to-regexp";
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
  GeneralPluginBaseConfig,
  ImportCustomLink,
  WithExtraConfig,
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

interface ExtraConfig {
  importCustomLink?: ImportCustomLink;
  generate?: {
    linkComponent?: boolean;
    redirectComponent?: boolean;
    useRedirect?: boolean;
    useParams?: boolean;
  };
  mode?: string;
}

export type TypescriptNextJSPluginConfig = WithExtraConfig<GeneralPluginBaseConfig, ExtraConfig>;

class TypescriptNextJSGenerator extends BaseRouteGenerator<ParsedLinkOptionsNextJS, ExtraConfig> {
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
      patternNamedExports: { patternName, filename: routePatternFilename, pathParamsInterfaceName, urlParamsInterfaceName },
      importGenerateUrl,
    } = this.config;

    const routeName = capitalizeFirstChar(originalRouteName);

    const functionName = `Link${routeName}`;
    const defaultLinkPropsInterfaceName = `Link${routeName}Props`;
    const hasPathParams = !!pathParamsInterfaceName;
    const generateUrlFnName = "generateUrl"; // TODO: find a better way to reference this

    const { hrefProp, importLink, linkComponent, linkPropsTemplate, linkPropsInterfaceName } = this._generateLinkInterface({
      defaultLinkPropsInterfaceName,
      urlParamsInterfaceName,
      routeLinkOptions: this._getLinkOptions(),
      hasPathParams,
    });

    const template = `${printImport({ defaultImport: "React", from: "react" })}
    ${importLink ? printImport(importLink) : ""}
    ${printImport(importGenerateUrl)}
    ${printImport({ namedImports: [{ name: urlParamsInterfaceName }, { name: patternName }], from: `./${routePatternFilename}` })}
    ${linkPropsTemplate}
    export const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = ({ urlParams, ...props}) => {
      const href = ${generateUrlFnName}(${patternName}, { path: ${
      hasPathParams ? "urlParams.path" : "{}"
    }, query: urlParams?.query, origin: urlParams?.origin });
      return <${linkComponent} {...props} ${hrefProp}={href} />;
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

    const routeName = capitalizeFirstChar(originalRouteName);
    const functionName = `useParams${routeName}`;
    const keys = keyHelpers.getKeysFromRoutePattern(routePattern);

    const templateMap: Record<
      ParsedLinkOptionsNextJS["mode"],
      () => {
        pathParamsImport: Import | undefined;
        localPathParamsTemplate: string;
        pathParamsInterfaceName: string;
        template: string;
      }
    > = {
      strict: () => {
        const printFieldType = (keyName: string | number): string => `${pathParamsData.pathParamsInterfaceName}["${keyName}"]`;
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
        return {
          pathParamsImport: { namedImports: [{ name: pathParamsData.pathParamsInterfaceName }], from: `./${pathParamsFilename}` },
          localPathParamsTemplate: "",
          pathParamsInterfaceName: pathParamsData.pathParamsInterfaceName,
          template: templates.join("\n"),
        };
      },
      loose: () => {
        const nextJSPathParams = this._generateNextJSPathParams(keys, routeName);

        return {
          pathParamsImport: undefined,
          localPathParamsTemplate: nextJSPathParams.template,
          pathParamsInterfaceName: nextJSPathParams.interfaceName,
          template: `${keys.reduce((prev, key) => {
            if (keyHelpers.isOptional(key)) {
              return `${prev}${key.name}: query.${key.name} ? query.${key.name} : undefined,`;
            }
            return `${prev}${key.name}: query.${key.name} ?? '',`;
          }, "")}`,
        };
      },
    };

    const templateInfo = templateMap[mode]();

    const template = `${printImport({ namedImports: [{ name: "useRouter" }], from: "next/router" })}
      ${templateInfo.pathParamsImport ? printImport(templateInfo.pathParamsImport) : ""}
      ${templateInfo.localPathParamsTemplate}
      export const ${functionName} = (): ${templateInfo.pathParamsInterfaceName} => {
        const query = useRouter().query;
        return {${templateInfo.template}};
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
  private _generateNextJSPathParams(
    keys: Key[],
    routeName: string
  ): {
    template: string;
    interfaceName: string;
  } {
    if (keys.length === 0) {
      return throwError(
        [routeName, "_generateNextJSPathParams"],
        "Cannot generate useParams file for a pattern without dynamic path params"
      );
    }

    const pathParamsInterfaceName = `PathParamsNextJS${routeName}`;
    let template = `interface ${pathParamsInterfaceName} {`;
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

  private _checkPathParamsInterfaceName(): { type: "none" } | { type: "normal"; pathParamsInterfaceName: string } {
    const { patternNamedExports } = this.config;

    if (patternNamedExports.pathParamsInterfaceName) {
      return { type: "normal", pathParamsInterfaceName: patternNamedExports.pathParamsInterfaceName };
    }

    return { type: "none" };
  }

  private _generateUseRedirectFile(): TemplateFile {
    const {
      routeName: originalRouteName,
      patternNamedExports: { patternName, pathParamsInterfaceName, filename: routePatternFilename, urlParamsInterfaceName },
      destinationDir,
      importGenerateUrl,
    } = this.config;

    const routeName = capitalizeFirstChar(originalRouteName);

    const functionName = `useRedirect${routeName}`;
    const urlParamsModifier = pathParamsInterfaceName ? "" : "?";
    const resultTypeInterface = `RedirectFn${routeName}`;
    const hasPathParams = !!pathParamsInterfaceName;
    const generateUrlFnName = "generateUrl"; // TODO: find a better way to reference this

    const template = `${printImport({ namedImports: [{ name: "useRouter" }], from: "next/router" })}
    ${printImport(importGenerateUrl)}
    ${printImport({ namedImports: [{ name: urlParamsInterfaceName }, { name: patternName }], from: `./${routePatternFilename}` })}
    export type ${resultTypeInterface} = (urlParams${urlParamsModifier}: ${urlParamsInterfaceName}) => void;
    export const ${functionName} = (): ${resultTypeInterface} => {
      const router = useRouter();
      const redirect: ${resultTypeInterface} = (urlParams) => {
        const href = ${generateUrlFnName}(${patternName}, { path: ${
      hasPathParams ? "urlParams.path" : "{}"
    }, query: urlParams?.query, origin: urlParams?.origin });
        router.push(href);
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
    const { appName, topLevelGenerateOptions, extraConfig: routeLinkOptions } = this.config;

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

export const plugin: GeneralCodegenPlugin<ExtraConfig> = {
  type: "route-internal",
  generate: (config) => {
    return new TypescriptNextJSGenerator(config).generate();
  },
};
