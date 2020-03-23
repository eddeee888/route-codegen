import generateRouteTemplate from './generateRouteTemplate';
import { RoutingType, RouteLinkOptions } from '../config';
import { TemplateFile } from '../types';
import generateRoutePatternFile from './generateRoutePatternFile';

type GenerateRouteTemplateFiles = (params: {
  routeName: string;
  routePattern: string;
  destinationDir: string;
  routingType: RoutingType;
  routeLinkOptions: RouteLinkOptions;
  generateUrlFunctionPath: string;
  shouldGenerateLink: boolean;
}) => TemplateFile[];

const generateRouteTemplateFiles: GenerateRouteTemplateFiles = ({
  routeName,
  routePattern,
  destinationDir,
  routingType,
  routeLinkOptions,
  generateUrlFunctionPath,
  shouldGenerateLink,
}) => {
  const routeNameString = routeName.toString();
  const routeNameCapitalised = routeNameString[0].toUpperCase() + routeNameString.slice(1);
  const displayRouteName = `RouteTo${routeNameCapitalised}`;

  const [patternFile, routePatternNamedExports] = generateRoutePatternFile({
    routeName: routeNameCapitalised,
    routePattern,
    destinationDir,
  });

  const template = generateRouteTemplate({
    displayRouteName,
    routePatternNamedExports,
    routingType,
    routeLinkOptions,
    generateUrlFunctionPath,
    shouldGenerateLink,
  });
  const extension = shouldGenerateLink ? '.tsx' : '.ts'; // If we don't have to generate link, it's not a react app so no .tsx is needed
  const routeFile: TemplateFile = {
    template,
    filename: displayRouteName,
    extension,
    destinationDir,
  };

  return [patternFile, routeFile];
};

export default generateRouteTemplateFiles;
