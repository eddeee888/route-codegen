import { capitalizeFirstChar, Import, PatternNamedExports, printImport, TemplateFile } from "../../utils";
import BasePlugin from "../../utils/BasePlugin";

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

export interface TypescriptAnchorPluginConfig {
  routeName: string;
  patternNamedExports: PatternNamedExports;
  destinationDir: string;
  routeLinkOption: ParsedLinkOptionsAnchor;
  importGenerateUrl: Import;
  importRedirectServerSide: Import;
}

class TypescriptAnchorPlugin extends BasePlugin<TypescriptAnchorPluginConfig, TemplateFile[]> {
  generate(): TemplateFile[] {
    const result: TemplateFile[] = [];

    if (this.config.routeLinkOption.generateLinkComponent) {
      result.push(this._generateLinkFile());
    }

    if (this.config.routeLinkOption.generateUseRedirect) {
      result.push(this._generateUseRedirectFile());
    }

    if (this.config.routeLinkOption.generateRedirectComponent) {
      result.push(this._generateRedirectFile());
    }

    return result;
  }

  private _generateLinkFile(): TemplateFile {
    const {
      routeName: originalRouteName,
      routeLinkOption,
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
      routeLinkOption,
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
    }, query: urlParams.query, origin: urlParams.origin ?? ${patternNamedExports.originName} });
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
}

export default TypescriptAnchorPlugin;
