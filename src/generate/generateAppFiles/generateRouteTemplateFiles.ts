import { RoutingType, RouteLinkOptions } from '../config';
import { TemplateFile, Import } from '../types';
import generatePatternFile from './generatePatternFile';
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

  const [patternFile, patternNamedExports] = generatePatternFile({
    routeName,
    routePattern,
    destinationDir,
  });

  const genUrlFile = generateUrlFile({ importGenerateUrl, destinationDir, routeName, patternNamedExports });

  const files = [patternFile, genUrlFile];

  if (shouldGenerateLink) {
    const linkFile = generateLinkFile({
      routeName,
      destinationDir,
      routeLinkOptions,
      routingType,
      patternNamedExports,
      importGenerateUrl,
    });
    files.push(linkFile);
  }

  if (routingType === RoutingType.ReactRouterV5) {
    if (routeLinkOptions.ReactRouterV5.useParams && !!patternNamedExports.pathParamsInterfaceName) {
      const useParamsFile = generateUseParamsFile({
        routeName,
        destinationDir,
        patternName: patternNamedExports.patternName,
        pathParamsFilename: patternNamedExports.filename,
        pathParamsInterfaceName: patternNamedExports.pathParamsInterfaceName,
      });
      files.push(useParamsFile);
    }
    if (routeLinkOptions.ReactRouterV5.useRedirect) {
      const useRedirectFile = generateUseRedirectFile({
        routeName,
        destinationDir,
        patternNamedExports,
        importGenerateUrl,
      });
      files.push(useRedirectFile);
    }
  }

  return files;
};

export default generateRouteTemplateFiles;
