import { AppConfig, parseAppConfig } from './../config';
import generateRouteTemplateFiles from './generateRouteTemplateFiles';
import { TemplateFile } from '../types';

function generateAppFiles(app: AppConfig): TemplateFile[] {
  const {
    routes,
    routingType,
    destinationDir,
    routeLinkOptions,
    generateUrlFunctionPath,
    shouldGenerateLink,
  } = parseAppConfig(app);

  if (destinationDir) {
    const files: TemplateFile[][] = Object.entries(routes).map(([routeName, routePattern]) =>
      generateRouteTemplateFiles({
        routeName,
        routeLinkOptions,
        routePattern,
        destinationDir,
        routingType,
        shouldGenerateLink,
        generateUrlFunctionPath,
      })
    );

    return files.flat();
  }

  return [];
}

export default generateAppFiles;
