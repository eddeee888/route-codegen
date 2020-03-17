import { pathToRegexp, Key } from 'path-to-regexp';
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
  shouldGenerateReactRouterFunctions: boolean;
}) => TemplateFile[];

const generateRouteTemplateFiles: GenerateRouteTemplateFiles = ({
  routeName,
  routePattern,
  destinationDir,
  routingType,
  routeLinkOptions,
  generateUrlFunctionPath,
  shouldGenerateLink,
  shouldGenerateReactRouterFunctions,
}) => {
  const keys: Key[] = [];
  const routeNameString = routeName.toString();
  const routeNameCapitalised = routeNameString[0].toUpperCase() + routeNameString.slice(1);
  const displayRouteName = `RouteTo${routeNameCapitalised}`;

  pathToRegexp(routePattern, keys);

  const [patternFile, patternInterface] = generateRoutePatternFile({
    routeName: routeNameCapitalised,
    routePattern,
    keys,
    destinationDir,
  });

  const template = generateRouteTemplate({
    routePattern,
    displayRouteName,
    keys,
    routingType,
    routeLinkOptions,
    generateUrlFunctionPath,
    shouldGenerateLink,
    shouldGenerateReactRouterFunctions,
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
