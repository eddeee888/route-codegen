import { TemplateFile, Import } from '../types';
import printImport from '../utils/printImport';
import { RoutingType, RouteLinkOptions } from '../config';
import { RoutePatternNamedExports } from './generateRoutePatternFile';

export interface GenerateLinkFileParams {
  routeName: string;
  routingType: RoutingType;
  destinationDir: string;
  routeLinkOptions: RouteLinkOptions;
  routePatternNamedExports: RoutePatternNamedExports;
  importGenerateUrl: Import;
}

type GenerateLinkFile = (params: GenerateLinkFileParams) => TemplateFile;

const generateLinkFile: GenerateLinkFile = ({
  routeName,
  routingType,
  routeLinkOptions,
  destinationDir,
  routePatternNamedExports: { pathPatternName, pathParamsInterfaceName, filename: routePatternFilename },
  importGenerateUrl,
}) => {
  const functionName = `Link${routeName}`;
  const hasPathParams = !!pathParamsInterfaceName;

  const { hrefProp, importLink, linkComponent, LinkPropsInterfaceName, linkPropsTemplate } = generateLinkInterface({
    routingType,
    routeLinkOptions,
  });

  const template = `${printImport({ defaultImport: 'React', from: 'react' })}
  ${printImport(importGenerateUrl)}
  ${importLink ? printImport(importLink) : ''}
  ${printImport({ namedImports: [{ name: pathPatternName }], from: `./${routePatternFilename}` })}
  ${linkPropsTemplate}
  const ${functionName}: ${LinkPropsInterfaceName} = ({ ${hasPathParams ? 'path,' : ''} urlQuery, ...props }) => {
    const to = generateUrl(${pathPatternName}, ${hasPathParams ? 'path' : '{}'}, urlQuery);
    return <${linkComponent} {...props} ${hrefProp}={to} />;
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
}) => {
  importLink?: Import;
  linkPropsTemplate: string;
  LinkPropsInterfaceName: string;
  linkComponent: string;
  hrefProp: string;
};

const generateLinkInterface: GenerateLinkInterface = ({ routingType, routeLinkOptions }) => {
  const option = routeLinkOptions[routingType];
  const LinkPropsInterfaceName = 'LinkProps';
  const originalLinkPropsAlias = 'OriginalLinkProps';

  const hrefProp = option.hrefProp;

  let importLink: Import | undefined = {
    defaultImport: option.linkComponent,
    namedImports: [{ name: option.propsInterfaceName, importAs: originalLinkPropsAlias }],
    from: option.path,
  };
  let linkPropsTemplate = `type ${LinkPropsInterfaceName} = Omit<${originalLinkPropsAlias}, '${hrefProp}'>;`;

  // if there's inlineLinkPropsTemplate, we don't import anything
  if ('inlineLinkPropsTemplate' in option && option.inlineLinkPropsTemplate) {
    linkPropsTemplate = option.inlineLinkPropsTemplate;
    importLink = undefined;
  }

  return {
    importLink,
    linkPropsTemplate,
    LinkPropsInterfaceName,
    linkComponent: option.linkComponent,
    hrefProp,
  };
};

export default generateLinkFile;
