import { AppConfig, parseAppConfig } from './../config';
import generateRouteFile from './generateRouteFile';

function generateAppRoutes(app: AppConfig): void {
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
    Object.entries(routes).forEach(([routeName, routePattern]) =>
      generateRouteFile({
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
  }
}

export default generateAppRoutes;
