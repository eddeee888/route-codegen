import {
  BaseRouteGenerator,
  capitalizeFirstChar,
  GeneralCodegenPlugin,
  getOverriddenValue,
  handleImportCustomLink,
  Import,
  ImportCustomLink,
  info,
  printImport,
  TemplateFile,
  GeneralPluginBaseConfig,
  WithExtraConfig,
} from "../../utils";

interface ParsedLinkOptionsAnchor {
  importLink?: Import;
  linkProps?: string;
  inlineLinkProps?: {
    // inlineLinkProps is ONLY here when there's no importCustomLink is passed in
    template: string;
    linkProps: string;
  };
  linkComponent: string;
  hrefProp: string;
  generateLinkComponent: boolean;
  generateRedirectComponent: boolean;
  generateUseRedirect: boolean;
}

interface GenerateLinkInterfaceParams {
  routeLinkOption: ParsedLinkOptionsAnchor;
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
}

export type TypescriptAnchorPluginConfig = WithExtraConfig<GeneralPluginBaseConfig, ExtraConfig>;

class TypescriptAnchorGenerator extends BaseRouteGenerator<ParsedLinkOptionsAnchor, ExtraConfig> {
  generate(): TemplateFile[] {
    const result: TemplateFile[] = [];

    const linkOptions = this._getLinkOptions();

    if (linkOptions.generateLinkComponent) {
      result.push(this._generateLinkFile());
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
      patternNamedExports: { patternName, pathParamsInterfaceName, filename: routePatternFilename, urlParamsInterfaceName, originName },
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
      namedImports: [{ name: patternName }, { name: urlParamsInterfaceName }, { name: originName }],
      from: `./${routePatternFilename}`,
    })}
    ${linkPropsTemplate}
    export const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = ({ urlParams, ...props }) => {
      const to = ${importGenerateUrl.importedName}(${patternName}, { path: ${
      hasPathParams ? "urlParams.path" : "{}"
    }, query: urlParams?.query, origin: urlParams?.origin ?? ${originName} });
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

  private _generateLinkInterface(params: GenerateLinkInterfaceParams): GenerateLinkInterfaceResult {
    const { routeLinkOption, defaultLinkPropsInterfaceName, urlParamsInterfaceName, hasPathParams } = params;
    const { hrefProp, linkProps, importLink, linkComponent } = routeLinkOption;

    const urlParamsModifier = hasPathParams ? "" : "?";
    const urlParamsTemplate = `{ urlParams${urlParamsModifier}: ${urlParamsInterfaceName} }`;

    // if there's inlineLinkPropsTemplate, we don't import anything
    let linkPropsTemplate = `type ${defaultLinkPropsInterfaceName} = Omit<${linkProps}, '${hrefProp}'> & ${urlParamsTemplate}`;
    let linkPropsInterfaceName = defaultLinkPropsInterfaceName;
    if ("inlineLinkProps" in routeLinkOption && routeLinkOption.inlineLinkProps) {
      linkPropsTemplate = `${routeLinkOption.inlineLinkProps.template} & ${urlParamsTemplate}`;
      linkPropsInterfaceName = routeLinkOption.inlineLinkProps.linkProps;
    }

    return {
      importLink,
      linkPropsTemplate,
      linkComponent,
      hrefProp,
      linkPropsInterfaceName,
    };
  }

  private _generateRedirectFile(): TemplateFile {
    const {
      routeName: originalRouteName,
      destinationDir,
      patternNamedExports,
      context: { importGenerateUrl, importRedirectServerSide },
    } = this.config;

    const routeName = capitalizeFirstChar(originalRouteName);

    const functionName = `Redirect${routeName}`;
    const hasPathParams = !!patternNamedExports.pathParamsInterfaceName;

    const urlParamsModifier = hasPathParams ? "" : "?";
    const urlParamsTemplate = `urlParams${urlParamsModifier}: ${patternNamedExports.urlParamsInterfaceName}`;

    const template = `${printImport({ defaultImport: "React", from: "react" })}
  ${printImport(importRedirectServerSide.import)}
  ${printImport(importGenerateUrl.import)}
  ${printImport({
    namedImports: [
      { name: patternNamedExports.urlParamsInterfaceName },
      { name: patternNamedExports.patternName },
      { name: patternNamedExports.originName },
    ],
    from: `./${patternNamedExports.filename}`,
  })}
  export const ${functionName}: React.FunctionComponent<{ fallback?: React.ReactNode, ${urlParamsTemplate} }> = ({ urlParams , ...props }) => {
    const to = ${importGenerateUrl.importedName}(${patternNamedExports.patternName}, { path: ${
      hasPathParams ? "urlParams.path" : "{}"
    }, query: urlParams?.query, origin: urlParams?.origin ?? ${patternNamedExports.originName} });
    return <${importRedirectServerSide.importedName} href={to} fallback={props.fallback} />;
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
  }

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
      namedImports: [
        { name: patternNamedExports.urlParamsInterfaceName },
        { name: patternNamedExports.patternName },
        { name: patternNamedExports.originName },
      ],
      from: `./${patternNamedExports.filename}`,
    })}
  ${printImport(importGenerateUrl.import)}
  export type ${resultTypeInterface} = (urlParams${!patternNamedExports.pathParamsInterfaceName ? "?" : ""}: ${
      patternNamedExports.urlParamsInterfaceName
    }) => void;
  export const ${functionName} = (): ${resultTypeInterface} => {
    const redirect: ${resultTypeInterface} = urlParams => {
      const to = ${importGenerateUrl.importedName}(${
      patternNamedExports.patternName
    }, { path: ${pathVariable}, query: urlParams?.query, origin: urlParams?.origin ?? ${patternNamedExports.originName} });
      if (!!window && !!window.location) {
        window.location.href = to;
      }
      return;
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

    const defaultOptions: ParsedLinkOptionsAnchor = {
      hrefProp: "href",
      linkComponent: "a",
      inlineLinkProps: {
        template: `type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'>`,
        linkProps: "LinkProps",
      },
      generateLinkComponent: topLevelGenerateOptions.generateLinkComponent,
      generateUseRedirect: topLevelGenerateOptions.generateUseRedirect,
      generateRedirectComponent: topLevelGenerateOptions.generateRedirectComponent,
    };

    if (!routeLinkOptions) {
      info([appName, "defaultLinkOptions"], "custom options not found... Using default");
      this.linkOptions = { ...defaultOptions };
      return;
    }

    const result: ParsedLinkOptionsAnchor = {
      ...defaultOptions,
      generateLinkComponent: getOverriddenValue(defaultOptions.generateLinkComponent, routeLinkOptions.generate?.linkComponent),
      generateRedirectComponent: getOverriddenValue(defaultOptions.generateRedirectComponent, routeLinkOptions.generate?.redirectComponent),
      generateUseRedirect: getOverriddenValue(defaultOptions.generateUseRedirect, routeLinkOptions.generate?.useRedirect),
    };

    if (!routeLinkOptions.importCustomLink) {
      info([appName, "defaultLinkOptions", "importCustomLink"], "custom options not found... Using default");
      this.linkOptions = { ...result };
      return;
    }

    info([appName, "defaultLinkOptions"], "using custom link options");
    const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink({
      appName,
      linkOptionName: "defaultLinkOptions",
      importCustomLink: routeLinkOptions.importCustomLink,
    });

    this.linkOptions = {
      ...result,
      inlineLinkProps: undefined, // If we import custom link props, do not use the default inline prop
      importLink,
      hrefProp,
      linkComponent,
      linkProps,
    };
  }
}

/**
 * @typedef  TypescriptAnchorPluginConfig
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
 */

/**
 * typescript-anchor is a plugin for external routes
 * This will be used on routes marked as externals and the default behaviour is server-side routing
 *
 * @name    typescript-anchor plugin
 * @kind    function
 * @param   {TypescriptAnchorPluginConfig}
 * @returns {TemplateFile[]} Array of generated TemplateFile. This can be manipulated by the `generate` config
 */
export const plugin: GeneralCodegenPlugin<ExtraConfig> = {
  type: "route-external",
  generate: (config) => {
    return new TypescriptAnchorGenerator(config).generate();
  },
};
