import {
  BasePlugin,
  BasePluginConfig,
  capitalizeFirstChar,
  CodegenPlugin,
  getOverriddenValue,
  handleImportCustomLink,
  Import,
  info,
  printImport,
  TemplateFile,
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

export type TypescriptAnchorPluginConfig = BasePluginConfig;

class TypescriptAnchorPlugin extends BasePlugin<ParsedLinkOptionsAnchor> {
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
      importGenerateUrl,
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
    ${printImport(importGenerateUrl)}
    ${importLink ? printImport(importLink) : ""}
    ${printImport({
      namedImports: [{ name: patternName }, { name: urlParamsInterfaceName }, { name: originName }],
      from: `./${routePatternFilename}`,
    })}
    ${linkPropsTemplate}
    export const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = ({ urlParams, ...props }) => {
      const to = generateUrl(${patternName}, { path: ${
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
    const { routeName: originalRouteName, destinationDir, importGenerateUrl, patternNamedExports, importRedirectServerSide } = this.config;

    const routeName = capitalizeFirstChar(originalRouteName);

    const functionName = `Redirect${routeName}`;
    const hasPathParams = !!patternNamedExports.pathParamsInterfaceName;
    const generateUrlFnName = "generateUrl"; // TODO: find a better way to reference this
    const redirectCompName = "RedirectServerSide"; // TODO: find a better way to reference this

    const urlParamsModifier = hasPathParams ? "" : "?";
    const urlParamsTemplate = `urlParams${urlParamsModifier}: ${patternNamedExports.urlParamsInterfaceName}`;

    const template = `${printImport({ defaultImport: "React", from: "react" })}
  ${printImport(importRedirectServerSide)}
  ${printImport(importGenerateUrl)}
  ${printImport({
    namedImports: [
      { name: patternNamedExports.urlParamsInterfaceName },
      { name: patternNamedExports.patternName },
      { name: patternNamedExports.originName },
    ],
    from: `./${patternNamedExports.filename}`,
  })}
  export const ${functionName}: React.FunctionComponent<{ fallback?: React.ReactNode, ${urlParamsTemplate} }> = ({ urlParams , ...props }) => {
    const to = ${generateUrlFnName}(${patternNamedExports.patternName}, { path: ${
      hasPathParams ? "urlParams.path" : "{}"
    }, query: urlParams?.query, origin: urlParams?.origin ?? ${patternNamedExports.originName} });
    return <${redirectCompName} href={to} fallback={props.fallback} />;
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
    const { routeName: originalRouteName, patternNamedExports, destinationDir, importGenerateUrl } = this.config;

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
  ${printImport(importGenerateUrl)}
  export type ${resultTypeInterface} = (urlParams${!patternNamedExports.pathParamsInterfaceName ? "?" : ""}: ${
      patternNamedExports.urlParamsInterfaceName
    }) => void;
  export const ${functionName} = (): ${resultTypeInterface} => {
    const redirect: ${resultTypeInterface} = urlParams => {
      const to = generateUrl(${
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
    const { appName, routeLinkOptions, topLevelGenerateOptions } = this.config;

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

export const plugin: CodegenPlugin<TypescriptAnchorPluginConfig, TemplateFile[]> = {
  type: "route-external",
  generate: (config) => {
    return new TypescriptAnchorPlugin(config).generate();
  },
};
