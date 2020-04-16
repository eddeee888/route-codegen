import { TemplateFile, Import } from '../../types';
import printImport from '../../utils/printImport';
import { PatternNamedExports } from '../generatePatternFile';
import { RouteLinkOptions } from '../parseAppConfig';
import throwError from '../../utils/throwError';

export interface GenerateLinkFileNextJSParams {
  routeName: string;
  destinationDir: string;
  routeLinkOption: RouteLinkOptions['NextJS'];
  patternNamedExports: PatternNamedExports;
  importGenerateUrl: Import;
}

const generateLinkFileNextJS = (params: GenerateLinkFileNextJSParams): TemplateFile => {
  const {
    routeName,
    routeLinkOption,
    destinationDir,
    patternNamedExports: {
      patternName,
      pathParamsInterfaceName,
      filename: routePatternFilename,
      urlPartsInterfaceName,
      patternNameNextJS,
    },
    importGenerateUrl,
  } = params;

  const functionName = `Link${routeName}`;
  const defaultLinkPropsInterfaceName = `Link${routeName}Props`;
  const hasPathParams = !!pathParamsInterfaceName;

  const { hrefProp, importLink, linkComponent, linkPropsTemplate, linkPropsInterfaceName } = generateLinkInterface({
    defaultLinkPropsInterfaceName,
    urlPartsInterfaceName,
    routeLinkOption,
  });

  if (!patternNameNextJS) {
    return throwError([], 'Missing "patternNameNextJS". This is most likely a problem with route-codegen.');
  }

  const namedImportsFromPatternFile = [
    { name: patternName },
    { name: urlPartsInterfaceName },
    { name: patternNameNextJS },
  ];

  // NextJS has slightly different way to handle its link component: "href" prop is actually the pattern. and "as" is the generated url
  const linkTemplate = `<${linkComponent} {...props} ${hrefProp}={${patternNameNextJS}} as={to} />;`;

  const template = `${printImport({ defaultImport: 'React', from: 'react' })}
  ${printImport(importGenerateUrl)}
  ${importLink ? printImport(importLink) : ''}
  ${printImport({
    namedImports: namedImportsFromPatternFile,
    from: `./${routePatternFilename}`,
  })}
  ${linkPropsTemplate}
  const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = ({ ${
    hasPathParams ? 'path,' : ''
  } urlQuery, ...props }) => {
    const to = generateUrl(${patternName}, ${hasPathParams ? 'path' : '{}'}, urlQuery);
    return ${linkTemplate}
  }
  export default ${functionName};
  `;

  const templateFile: TemplateFile = {
    template,
    filename: functionName,
    extension: '.tsx',
    destinationDir,
  };

  return templateFile;
};

interface GenerateLinkInterfaceParams {
  routeLinkOption: RouteLinkOptions['NextJS'];
  defaultLinkPropsInterfaceName: string;
  urlPartsInterfaceName: string;
}

interface GenerateLinkInterfaceResult {
  importLink?: Import;
  linkPropsTemplate: string;
  linkComponent: string;
  linkProps?: string;
  hrefProp: string;
  linkPropsInterfaceName: string;
}

const generateLinkInterface = (params: GenerateLinkInterfaceParams): GenerateLinkInterfaceResult => {
  const { routeLinkOption, defaultLinkPropsInterfaceName, urlPartsInterfaceName } = params;

  const { hrefProp, linkProps, importLink, linkComponent } = routeLinkOption;

  const linkPropsTemplate = `type ${defaultLinkPropsInterfaceName} = Omit<${linkProps}, '${hrefProp}'> & ${urlPartsInterfaceName}`;
  const linkPropsInterfaceName = defaultLinkPropsInterfaceName;

  return {
    importLink,
    linkPropsTemplate,
    linkComponent,
    hrefProp,
    linkPropsInterfaceName,
  };
};

export default generateLinkFileNextJS;
