import { capitalizeFirstChar, Import, PatternNamedExports, printImport, TemplateFile, throwError } from "../../utils";
import BasePlugin from "../../utils/BasePlugin";

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

export interface TypescriptReactRouter5PluginConfig {
  routeName: string;
  destinationDir: string;
  routeLinkOption: ParsedLinkOptionsReactRouter5;
  patternNamedExports: PatternNamedExports;
  importGenerateUrl: Import;
}

class TypescriptReactRouter5Plugin extends BasePlugin<TypescriptReactRouter5PluginConfig, TemplateFile[]> {
  generate(): TemplateFile[] {
    const result: TemplateFile[] = [];

    if (this.config.routeLinkOption.generateLinkComponent) {
      result.push(this._generateLinkFile());
    }

    if (this.config.routeLinkOption.generateUseParams && this.config.patternNamedExports.pathParamsInterfaceName) {
      result.push(this._generateUseParamsFile());
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
      patternNamedExports: { patternName, pathParamsInterfaceName, filename: routePatternFilename, urlParamsInterfaceName },
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
      routeLinkOption,
      hasPathParams,
    });

    const template = `${printImport({ defaultImport: "React", from: "react" })}
    ${printImport(importGenerateUrl)}
    ${importLink ? printImport(importLink) : ""}
    ${printImport({
      namedImports: [{ name: patternName }, { name: urlParamsInterfaceName }],
      from: `./${routePatternFilename}`,
    })}
    ${linkPropsTemplate}
    export const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = ({ urlParams, ...props }) => {
      const to = ${generateUrlFnName}(${patternName}, { path: ${
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
    const { routeName: originalRouteName, destinationDir, importGenerateUrl, patternNamedExports } = this.config;

    const routeName = capitalizeFirstChar(originalRouteName);

    const functionName = `Redirect${routeName}`;
    const hasPathParams = !!patternNamedExports.pathParamsInterfaceName;
    const generateUrlFnName = "generateUrl"; // TODO: find a better way to reference this

    const urlParamsModifier = hasPathParams ? "" : "?";
    const urlParamsTemplate = `urlParams${urlParamsModifier}: ${patternNamedExports.urlParamsInterfaceName}`;

    const template = `${printImport({ defaultImport: "React", from: "react" })}
    ${printImport(importGenerateUrl)}
    ${printImport({ namedImports: [{ name: "Redirect" }], from: "react-router" })}
    ${printImport({
      namedImports: [{ name: patternNamedExports.urlParamsInterfaceName }, { name: patternNamedExports.patternName }],
      from: `./${patternNamedExports.filename}`,
    })}
    export const ${functionName}: React.FunctionComponent<{ fallback?: React.ReactNode, ${urlParamsTemplate} }> = ({ urlParams, ...props }) => {
      const to = ${generateUrlFnName}(${patternNamedExports.patternName}, { path: ${
      hasPathParams ? "urlParams.path" : "{}"
    }, query: urlParams.query, origin: urlParams.origin });
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
      routeLinkOption: { mode },
      patternNamedExports: { patternName, pathParamsInterfaceName, filename: pathParamsFilename },
    } = this.config;

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
    const { routeName: originalRouteName, patternNamedExports, destinationDir, importGenerateUrl } = this.config;

    const routeName = capitalizeFirstChar(originalRouteName);

    const functionName = `useRedirect${routeName}`;
    const pathVariable = patternNamedExports.pathParamsInterfaceName ? "urlParams.path" : "{}";
    const resultTypeInterface = `RedirectFn${routeName}`;
    const generateUrlFnName = "generateUrl"; // TODO: find a better way to reference this

    const template = `${printImport({
      namedImports: [{ name: "useHistory" }],
      from: "react-router",
    })}
    ${printImport({
      namedImports: [{ name: patternNamedExports.urlParamsInterfaceName }, { name: patternNamedExports.patternName }],
      from: `./${patternNamedExports.filename}`,
    })}
    ${printImport(importGenerateUrl)}
    export type ${resultTypeInterface} = (urlParams${!patternNamedExports.pathParamsInterfaceName ? "?" : ""}: ${
      patternNamedExports.urlParamsInterfaceName
    }) => void;
    export const ${functionName} = (): ${resultTypeInterface} => {
      const history = useHistory();
      const redirect: ${resultTypeInterface} = urlParams => {
        const to = ${generateUrlFnName}(${
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
}

export default TypescriptReactRouter5Plugin;
