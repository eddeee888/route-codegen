import generateRouteTemplate from './generateRouteTemplate';
import { RoutingType, RouteLinkOptions } from '../config';
import { TemplateFile, Import } from '../types';
import generateRoutePatternFile from './generateRoutePatternFile';
import generateUseParamsFile from './generateUseParamsFile';
import generateUseRedirectFile from './generateUseRedirectFile';
import generateUrlFile from './generateUrlFile';

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
  destinationDir,
  routingType,
  routeLinkOptions,
  importGenerateUrl,
  shouldGenerateLink,
}) => {
  const routeNameString = originalRouteName.toString();
  const routeName = routeNameString[0].toUpperCase() + routeNameString.slice(1);
  const displayRouteName = `RouteTo${routeName}`;

  const [patternFile, routePatternNamedExports] = generateRoutePatternFile({
    routeName,
    routePattern,
    destinationDir,
  });

  const template = generateRouteTemplate({
    displayRouteName,
    routePatternNamedExports,
    routingType,
    routeLinkOptions,
    importGenerateUrl,
    shouldGenerateLink,
  });
  const extension = shouldGenerateLink ? '.tsx' : '.ts'; // If we don't have to generate link, it's not a react app so no .tsx is needed
  const routeFile: TemplateFile = {
    template,
    filename: displayRouteName,
    extension,
    destinationDir,
  };

  const genUrlFile = generateUrlFile({ importGenerateUrl, destinationDir, routeName, routePatternNamedExports });

  const files = [patternFile, genUrlFile, routeFile];

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

  return files;
};

export default generateRouteTemplateFiles;
