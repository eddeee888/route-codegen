import { TemplateFile, Import } from '../types';
import printImport from '../utils/printImport';
import {
  RoutingType,
  RouteLinkOptions,
  RouteLinkOptionsNoGenerateDefault,
  RouteLinkOptionsGenerateDefault,
  ParsedReactRouterV5LinkOptions,
} from '../config';
import { RoutePatternNamedExports } from './generateRoutePatternFile';

type GenerateLinkFile = (params: {
  routeName: string;
  routingType: RoutingType;
  destinationDir: string;
  routeLinkOptions: RouteLinkOptions;
  routePatternNamedExports: RoutePatternNamedExports;
  importGenerateUrl: Import;
}) => TemplateFile;

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

  const { hrefProp, importLink, linkComponent, LinkPropsInterfaceName, LinkPropsTemplate } = generateLinkInterface({
    routingType,
    routeLinkOptions,
    routeName,
  });

  const template = `${printImport({ defaultImport: 'React', from: 'react' })}
  ${printImport(importGenerateUrl)}
  ${importLink ? printImport(importLink) : ''}
  ${printImport({ namedImports: [{ name: pathPatternName }], from: `./${routePatternFilename}` })}
  ${LinkPropsTemplate}
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
  routeName: string;
}) => {
  importLink?: Import;
  LinkPropsTemplate: string;
  LinkPropsInterfaceName: string;
  linkComponent: string;
  hrefProp: string;
};

const generateLinkInterface: GenerateLinkInterface = ({ routingType, routeLinkOptions, routeName }) => {
  const option = routeLinkOptions[routingType];
  const LinkPropsInterfaceName = 'LinkProps';
  const originalLinkPropsAlias = 'OriginalLinkProps';

  // FIX THIS LOGIC
  function shouldGenerateDefault(
    option: RouteLinkOptionsNoGenerateDefault | RouteLinkOptionsGenerateDefault | ParsedReactRouterV5LinkOptions
  ): option is RouteLinkOptionsGenerateDefault {
    if ('shouldGenerateDefault' in option) {
      return option.shouldGenerateDefault;
    }
    return false;
  }

  if (shouldGenerateDefault(option)) {
    if (routingType === RoutingType.Default) {
      const hrefProp = 'href';
      return {
        LinkPropsTemplate: `type ${LinkPropsInterfaceName} = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, '${hrefProp}'>;`,
        LinkPropsInterfaceName,
        linkComponent: 'a',
        hrefProp,
      };
    } else if (routingType === RoutingType.NextJS) {
      const hrefProp = 'href';
      const importLink: Import = {
        defaultImport: 'Link',
        namedImports: [{ name: 'LinkProps', importAs: originalLinkPropsAlias }],
        from: 'next/link',
      };
      return {
        importLink,
        LinkPropsTemplate: `type ${LinkPropsInterfaceName} = Omit<${originalLinkPropsAlias}, '${hrefProp}'>;`,
        LinkPropsInterfaceName,
        linkComponent: 'Link',
        hrefProp,
      };
    }
  } else {
    const hrefProp = option.hrefProp;
    const importLink: Import = {
      defaultImport: 'Link',
      namedImports: [{ name: option.propsInterfaceName, importAs: originalLinkPropsAlias }],
      from: option.path,
    };
    return {
      importLink,
      LinkPropsTemplate: `type ${LinkPropsInterfaceName} = Omit<${originalLinkPropsAlias}, '${hrefProp}'>;`,
      LinkPropsInterfaceName,
      linkComponent: 'Link',
      hrefProp,
    };
  }

  return {
    LinkPropsTemplate: '',
    LinkPropsInterfaceName: '',
    linkComponent: '',
    hrefProp: '',
  };
};

export default generateLinkFile;
