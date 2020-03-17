import { AppConfig, parseAppConfig } from './../config';
import generateRouteTemplateFile from './generateRouteTemplateFile';
import { TemplateFile } from '../types';

function generateAppFiles(app: AppConfig): TemplateFile[] {
  const {
    routes,
    routingType,
    destinationDir,
    routeLinkOptions,
    generateUrlFunctionPath,
    shouldGenerateLink,
    shouldGenerateReactRouterFunctions,
  } = parseAppConfig(app);

  if (destinationDir) {
    const files: TemplateFile[] = Object.entries(routes).map(([routeName, routePattern]) =>
      generateRouteTemplateFile({
        routeName,
        routeLinkOptions,
        routePattern,
        destinationDir,
        routingType,
        shouldGenerateLink,
        shouldGenerateReactRouterFunctions,
        generateUrlFunctionPath,
      })
    );

    return files;
  }

  return [];
}

export default generateAppFiles;
