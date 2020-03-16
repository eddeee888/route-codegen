import { pathToRegexp, Key } from 'path-to-regexp';
import generateRouteTemplate from './generateRouteTemplate';
import { RoutingType, RouteLinkOptions } from '../config';
import { TemplateFile } from '../types';

type GenerateRouteTemplatateFile = (params: {
  routeName: string;
  routePattern: string;
  destinationDir: string;
  routingType: RoutingType;
  routeLinkOptions: RouteLinkOptions;
  generateUrlFunctionPath: string;
  shouldGenerateLink: boolean;
  shouldGenerateReactRouterFunctions: boolean;
}) => TemplateFile;

const generateRouteTemplateFile: GenerateRouteTemplatateFile = ({
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
  const displayRouteName = `RouteTo${routeNameString[0].toUpperCase() + routeNameString.slice(1)}`;

  pathToRegexp(routePattern, keys);

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

  return {
    template,
    filename: displayRouteName,
    extension,
    destinationDir,
  };
};

export default generateRouteTemplateFile;
