import { RoutingType, RouteLinkOptions } from '../config';
import { TemplateFile, Import } from '../types';
import generateRoutePatternFile from './generateRoutePatternFile';
import generateUseParamsFile from './generateUseParamsFile';
import generateUseRedirectFile from './generateUseRedirectFile';
import generateUrlFile from './generateUrlFile';
import generateLinkFile from './generateLinkFile';

type GenerateRouteTemplateFiles = (params: {
  routeName: string;
  routePattern: string;
  destinationDir: string;
  routingType: RoutingType;
  routeLinkOptions: RouteLinkOptions;
  importGenerateUrl: Import;
  shouldGenerateLink: boolean;
}) => TemplateFile[];

const generateRouteTemplateFiles: GenerateRouteTemplateFiles = ({
  routeName: originalRouteName,
  routePattern,
  destinationDir: originalDestinationDir,
  routingType,
  routeLinkOptions,
  importGenerateUrl,
  shouldGenerateLink,
}) => {
  const routeNameString = originalRouteName.toString();
  const routeName = routeNameString[0].toUpperCase() + routeNameString.slice(1);
  const destinationDir = `${originalDestinationDir}/${originalRouteName}`;

  const [patternFile, routePatternNamedExports] = generateRoutePatternFile({
    routeName,
    routePattern,
    destinationDir,
  });

  const genUrlFile = generateUrlFile({ importGenerateUrl, destinationDir, routeName, routePatternNamedExports });

  const files = [patternFile, genUrlFile];

  if (routingType === RoutingType.ReactRouterV5) {
    if (routeLinkOptions.ReactRouterV5.useParams && !!routePatternNamedExports.pathParamsInterfaceName) {
      const useParamsFile = generateUseParamsFile({
        routeName,
        destinationDir,
        pathParamsPatternName: routePatternNamedExports.pathPatternName,
        pathParamsFilename: routePatternNamedExports.filename,
        pathParamsInterfaceName: routePatternNamedExports.pathParamsInterfaceName,
      });
      files.push(useParamsFile);
    }
    if (routeLinkOptions.ReactRouterV5.useRedirect) {
      const useRedirectFile = generateUseRedirectFile({
        routeName,
        destinationDir,
        routePatternNamedExports,
        importGenerateUrl,
      });
      files.push(useRedirectFile);
    }
  }

  if (shouldGenerateLink) {
    const linkFile = generateLinkFile({
      routeName,
      destinationDir,
      routeLinkOptions,
      routingType,
      routePatternNamedExports,
      importGenerateUrl,
    });
    files.push(linkFile);
  }

  return files;
};

export default generateRouteTemplateFiles;
