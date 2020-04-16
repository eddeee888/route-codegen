import { TemplateFile, Import } from '../../types';
import printImport from '../../utils/printImport';
import { RoutingType } from '../../config';
import { PatternNamedExports } from '../generatePatternFile';
import { RouteLinkOptions } from '../parseAppConfig';
import throwError from '../../utils/throwError';

export interface GenerateLinkFileNextJSParams {
  routeName: string;
  routingType: RoutingType;
  destinationDir: string;
  routeLinkOptions: RouteLinkOptions;
  patternNamedExports: PatternNamedExports;
  importGenerateUrl: Import;
}

const generateLinkFileNextJS = (params: GenerateLinkFileNextJSParams): TemplateFile => {
  const {
    routeName,
    routingType,
    routeLinkOptions,
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
    routingType,
    routeLinkOptions,
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
  routingType: RoutingType;
  routeLinkOptions: RouteLinkOptions;
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
  const { routingType, routeLinkOptions, defaultLinkPropsInterfaceName, urlPartsInterfaceName } = params;
  const option = routeLinkOptions[routingType];

  const { hrefProp, linkProps, importLink } = option;

  const linkPropsTemplate = `type ${defaultLinkPropsInterfaceName} = Omit<${linkProps}, '${hrefProp}'> & ${urlPartsInterfaceName}`;
  const linkPropsInterfaceName = defaultLinkPropsInterfaceName;

  return {
    importLink,
    linkPropsTemplate,
    linkComponent: option.linkComponent,
    hrefProp,
    linkPropsInterfaceName,
  };
};

export default generateLinkFileNextJS;
