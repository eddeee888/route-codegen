import { TemplateFile, Import } from '../types';
import printImport from '../utils/printImport';
import { RoutingType } from '../config';
import { PatternNamedExports } from './generatePatternFile';
import { RouteLinkOptions } from './parseAppConfig';
import throwError from '../utils/throwError';

export interface GenerateLinkFileParams {
  routeName: string;
  routingType: RoutingType;
  destinationDir: string;
  routeLinkOptions: RouteLinkOptions;
  patternNamedExports: PatternNamedExports;
  importGenerateUrl: Import;
}

const generateLinkFile = (params: GenerateLinkFileParams): TemplateFile => {
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

  let linkTemplate = `<${linkComponent} {...props} ${hrefProp}={to} />;`;
  const namedImportsFromPatternFile = [{ name: patternName }, { name: urlPartsInterfaceName }];
  if (routingType === RoutingType.NextJS) {
    if (!patternNameNextJS) {
      return throwError([], 'Missing "patternNameNextJS". This is most likely a problem with route-codegen.');
    }
    // NextJS has its own pattern. We need it to handle client-side routing
    namedImportsFromPatternFile.push({ name: patternNameNextJS });
    // NextJS has slightly different way to handle its link component: "href" prop is actually the pattern. and "as" is the generated url
    linkTemplate = `<${linkComponent} {...props} ${hrefProp}={${patternNameNextJS}} as={to} />;`;
  }

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

type GenerateLinkInterface = (params: {
  routingType: RoutingType;
  routeLinkOptions: RouteLinkOptions;
  defaultLinkPropsInterfaceName: string;
  urlPartsInterfaceName: string;
}) => {
  importLink?: Import;
  linkPropsTemplate: string;
  linkComponent: string;
  linkProps?: string;
  hrefProp: string;
  linkPropsInterfaceName: string;
};

const generateLinkInterface: GenerateLinkInterface = ({
  routingType,
  routeLinkOptions,
  defaultLinkPropsInterfaceName,
  urlPartsInterfaceName,
}) => {
  const option = routeLinkOptions[routingType];

  const { hrefProp, linkProps, importLink } = option;

  // if there's inlineLinkPropsTemplate, we don't import anything
  let linkPropsTemplate = `type ${defaultLinkPropsInterfaceName} = Omit<${linkProps}, '${hrefProp}'> & ${urlPartsInterfaceName}`;
  let linkPropsInterfaceName = defaultLinkPropsInterfaceName;
  if ('inlineLinkProps' in option && option.inlineLinkProps) {
    linkPropsTemplate = `${option.inlineLinkProps.template} & ${urlPartsInterfaceName}`;
    linkPropsInterfaceName = option.inlineLinkProps.linkProps;
  }

  return {
    importLink,
    linkPropsTemplate,
    linkComponent: option.linkComponent,
    hrefProp,
    linkPropsInterfaceName,
  };
};

export default generateLinkFile;
