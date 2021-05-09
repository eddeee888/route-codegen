import {
  capitalizeFirstChar,
  getOverriddenValue,
  Import,
  info,
  printImport,
  TemplateFile,
  throwError,
  handleImportCustomLink,
  GeneralCodegenPlugin,
  BaseRouteGenerator,
  ImportCustomLink,
  GeneralPluginBaseConfig,
  WithExtraConfig,
} from "../../utils";

interface ParsedLinkOptionsReactRouter5 {
  importLink: Import;
  linkComponent: string;
  linkProps: string;
  hrefProp: string;
  generateLinkComponent: boolean;
  generateRedirectComponent: boolean;
  generateUseRedirect: boolean;
  generateUseParams: boolean;
  mode: "strict" | "loose";
}

interface GenerateLinkInterfaceParams {
  routeLinkOption: ParsedLinkOptionsReactRouter5;
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

export type TypescriptReactRouter5PluginConfig = WithExtraConfig<GeneralPluginBaseConfig, ExtraConfig>;

class TypescriptReactRouter5Generator extends BaseRouteGenerator<ParsedLinkOptionsReactRouter5, ExtraConfig> {
  generate(): TemplateFile[] {
    const result: TemplateFile[] = [];

    const linkOptions = this._getLinkOptions();

    if (linkOptions.generateLinkComponent) {
      result.push(this._generateLinkFile());
    }

    if (linkOptions.generateUseParams && this.config.patternNamedExports.pathParamsInterfaceName) {
      result.push(this._generateUseParamsFile());
    }

    if (linkOptions.generateUseRedirect) {
      result.push(this._generateUseRedirectFile());
    }

    if (linkOptions.generateRedirectComponent) {
      result.push(this._generateRedirectFile());
    }

    return result;
  }

  private _generateLinkFile(): TemplateFile {
    const {
      routeName: originalRouteName,
      destinationDir,
      patternNamedExports: { patternName, pathParamsInterfaceName, filename: routePatternFilename, urlParamsInterfaceName },
      context: { importGenerateUrl },
    } = this.config;

    const routeName = capitalizeFirstChar(originalRouteName);

    const functionName = `Link${routeName}`;
    const defaultLinkPropsInterfaceName = `Link${routeName}Props`;
    const hasPathParams = !!pathParamsInterfaceName;

    const { hrefProp, importLink, linkComponent, linkPropsTemplate, linkPropsInterfaceName } = this._generateLinkInterface({
      defaultLinkPropsInterfaceName,
      urlParamsInterfaceName,
      routeLinkOption: this._getLinkOptions(),
      hasPathParams,
    });

    const template = `${printImport({ defaultImport: "React", from: "react" })}
    ${printImport(importGenerateUrl.import)}
    ${importLink ? printImport(importLink) : ""}
    ${printImport({
      namedImports: [{ name: patternName }, { name: urlParamsInterfaceName }],
      from: `./${routePatternFilename}`,
    })}
    ${linkPropsTemplate}
    export const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = ({ urlParams, ...props }) => {
      const to = ${importGenerateUrl.importedName}(${patternName}, { path: ${
      hasPathParams ? "urlParams.path" : "{}"
    }, query: urlParams?.query, origin: urlParams?.origin });
      return <${linkComponent} {...props} ${hrefProp}={to} />;
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

  private _generateLinkInterface = (params: GenerateLinkInterfaceParams): GenerateLinkInterfaceResult => {
    const { routeLinkOption, defaultLinkPropsInterfaceName, urlParamsInterfaceName, hasPathParams } = params;
    const { hrefProp, linkProps, importLink, linkComponent } = routeLinkOption;

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
  };

  private _generateRedirectFile = (): TemplateFile => {
    const {
      routeName: originalRouteName,
      destinationDir,
      context: { importGenerateUrl },
      patternNamedExports,
    } = this.config;

    const routeName = capitalizeFirstChar(originalRouteName);

    const functionName = `Redirect${routeName}`;
    const hasPathParams = !!patternNamedExports.pathParamsInterfaceName;

    const urlParamsModifier = hasPathParams ? "" : "?";
    const urlParamsTemplate = `urlParams${urlParamsModifier}: ${patternNamedExports.urlParamsInterfaceName}`;

    const template = `${printImport({ defaultImport: "React", from: "react" })}
    ${printImport(importGenerateUrl.import)}
    ${printImport({ namedImports: [{ name: "Redirect" }], from: "react-router" })}
    ${printImport({
      namedImports: [{ name: patternNamedExports.urlParamsInterfaceName }, { name: patternNamedExports.patternName }],
      from: `./${patternNamedExports.filename}`,
    })}
    export const ${functionName}: React.FunctionComponent<{ fallback?: React.ReactNode, ${urlParamsTemplate} }> = ({ urlParams, ...props }) => {
      const to = ${importGenerateUrl.importedName}(${patternNamedExports.patternName}, { path: ${
      hasPathParams ? "urlParams.path" : "{}"
    }, query: urlParams?.query, origin: urlParams?.origin });
      return (
        <>
          <Redirect to={to} />
          {props.fallback}
        </>
      );
    };`;

    return {
      filename: functionName,
      destinationDir,
      extension: ".tsx",
      template,
      routeName: originalRouteName,
      hasDefaultExport: false,
      hasNamedExports: true,
    };
  };

  private _generateUseParamsFile = (): TemplateFile => {
    const {
      routeName: originalRouteName,
      destinationDir,
      patternNamedExports: { patternName, pathParamsInterfaceName, filename: pathParamsFilename },
    } = this.config;

    const { mode } = this._getLinkOptions();

    if (!pathParamsInterfaceName) {
      return throwError([], "Cannot generate useParams file for a pattern without dynamic path params");
    }

    const routeName = capitalizeFirstChar(originalRouteName);

    const functionName = `useParams${routeName}`;

    const modeMap: Record<ParsedLinkOptionsReactRouter5["mode"], { template: string; namedImports: Import["namedImports"] }> = {
      loose: {
        namedImports: [{ name: pathParamsInterfaceName }],
        template: `return useRouteMatch<${pathParamsInterfaceName}>().params;`,
      },
      strict: {
        namedImports: [{ name: pathParamsInterfaceName }, { name: patternName, importAs: "pattern" }],
        template: `const { path, params } = useRouteMatch<${pathParamsInterfaceName}>();
      if (path !== pattern) {
        const error = \`You are trying to use useParams for "${"${pattern}"}" in "${"${path}"}". Make sure you are using the right route link object!\`;
        throw new Error(error);
      }
      return params;`,
      },
    };

    const template = `${printImport({ namedImports: modeMap[mode].namedImports, from: `./${pathParamsFilename}` })}
      ${printImport({ namedImports: [{ name: "useRouteMatch" }], from: "react-router" })}
      export const ${functionName} = (): ${pathParamsInterfaceName} => {
        ${modeMap[mode].template}
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
  };

  private _generateUseRedirectFile(): TemplateFile {
    const {
      routeName: originalRouteName,
      patternNamedExports,
      destinationDir,
      context: { importGenerateUrl },
    } = this.config;

    const routeName = capitalizeFirstChar(originalRouteName);

    const functionName = `useRedirect${routeName}`;
    const pathVariable = patternNamedExports.pathParamsInterfaceName ? "urlParams.path" : "{}";
    const resultTypeInterface = `RedirectFn${routeName}`;

    const template = `${printImport({
      namedImports: [{ name: "useHistory" }],
      from: "react-router",
    })}
    ${printImport({
      namedImports: [{ name: patternNamedExports.urlParamsInterfaceName }, { name: patternNamedExports.patternName }],
      from: `./${patternNamedExports.filename}`,
    })}
    ${printImport(importGenerateUrl.import)}
    export type ${resultTypeInterface} = (urlParams${!patternNamedExports.pathParamsInterfaceName ? "?" : ""}: ${
      patternNamedExports.urlParamsInterfaceName
    }) => void;
    export const ${functionName} = (): ${resultTypeInterface} => {
      const history = useHistory();
      const redirect: ${resultTypeInterface} = urlParams => {
        const to = ${importGenerateUrl.importedName}(${
      patternNamedExports.patternName
    }, { path: ${pathVariable}, query: urlParams?.query, origin: urlParams?.origin });
        history.push(to);
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
    const {
      appName,
      context: { topLevelGenerateOptions },
      extraConfig: routeLinkOptions,
    } = this.config;

    const defaultOptions: ParsedLinkOptionsReactRouter5 = {
      importLink: {
        from: "react-router-dom",
        namedImports: [{ name: "LinkProps" }, { name: "Link" }],
      },
      linkComponent: "Link",
      linkProps: "LinkProps",
      hrefProp: "to",
      generateLinkComponent: topLevelGenerateOptions.generateLinkComponent,
      generateRedirectComponent: topLevelGenerateOptions.generateRedirectComponent,
      generateUseRedirect: topLevelGenerateOptions.generateUseRedirect,
      generateUseParams: topLevelGenerateOptions.generateUseParams,
      mode: "loose",
    };

    if (!routeLinkOptions) {
      info([appName, "reactRouterVLinkOptions"], "custom options not found... Using default");
      this.linkOptions = { ...defaultOptions };
      return;
    }

    const result: ParsedLinkOptionsReactRouter5 = {
      ...defaultOptions,
      generateLinkComponent: getOverriddenValue(defaultOptions.generateLinkComponent, routeLinkOptions.generate?.linkComponent),
      generateRedirectComponent: getOverriddenValue(defaultOptions.generateRedirectComponent, routeLinkOptions.generate?.redirectComponent),
      generateUseParams: getOverriddenValue(defaultOptions.generateUseParams, routeLinkOptions.generate?.useParams),
      generateUseRedirect: getOverriddenValue(defaultOptions.generateUseRedirect, routeLinkOptions.generate?.useRedirect),
      mode: (() => {
        const mode: ParsedLinkOptionsReactRouter5["mode"] =
          routeLinkOptions.mode === "strict" || routeLinkOptions.mode === "loose" ? routeLinkOptions.mode : defaultOptions.mode;
        return getOverriddenValue(defaultOptions.mode, mode);
      })(),
    };

    if (!routeLinkOptions.importCustomLink) {
      info([appName, "reactRouterV5LinkOptions", "importCustomLink"], "custom options not found... Using default");
      this.linkOptions = { ...result };
      return;
    }

    info([appName, "reactRouterV5LinkOptions"], "using custom link options");
    const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink({
      appName,
      linkOptionName: "reactRouterV5LinkOptions",
      importCustomLink: routeLinkOptions.importCustomLink,
    });

    const finalResult: ParsedLinkOptionsReactRouter5 = {
      ...result,
      importLink,
      linkComponent,
      hrefProp,
      linkProps,
    };

    this.linkOptions = finalResult;
  }
}

/**
 * @typedef  TypescriptReactRouter5PluginConfig
 * @type     {object}
 * @property {object}   importCustomLink
 * @property {string}   importCustomLink.from - Where the custom link can be imported from
 * @property {boolean}  [importCustomLink.componentDefaultImport] - Whether the custom link is a default export. Default is `false`
 * @property {boolean}  [importCustomLink.componentNamedImport] - Whether the custom link is a named export. Default is `false`
 * @property {string}   importCustomLink.hrefProp - What the custom href prop of the link component is to map href value to ( e.g. href, to, etc. )
 * @property {string}   importCustomLink.propsNamedImport - What the custom link prop import is. This is used to provide type safety
 *
 * @property {object}   generate
 * @property {boolean}  [generate.linkComponent] - Whether a link component should be generated. Default is `false`
 * @property {boolean}  [generate.redirectComponent] - Whether a redirect component should be generated. Requires @route-codegen/react. Default is `false`
 * @property {boolean}  [generate.useRedirect] - Whether a useRedirect react hook should be generated. Default is `false`
 * @property {boolean}  [generate.useParams] - Whether a useParams react hook should be generated. Default is `false`
 *
 * @property {enum}     mode - "strict" or "loose". Default is "loose"
 */

/**
 * typescript-react-router-5 is a plugin for internal routes
 * This will be used on routes marked as internals i.e. handled by react-router
 * and the default behaviour is client-side routing
 *
 * @name    typescript-react-router-5 plugin
 * @kind    function
 * @param   {TypescriptRouteConfigPluginConfig}
 * @returns {TemplateFile[]} Array of generated TemplateFile. This can be manipulated by the `generate` config
 */
export const plugin: GeneralCodegenPlugin<ExtraConfig> = {
  type: "route-internal",
  generate: (config) => {
    return new TypescriptReactRouter5Generator(config).generate();
  },
};
