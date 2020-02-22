import { AppConfig, parseAppConfig } from './../config';
import generateRouteFile from './generateRouteFile';
import generateRouteCreatorFile from './generateRouteCreatorFile';

function generateAppRoutes(app: AppConfig): void {
  const {
    routes,
    routingType,
    destinationDir,
    reactRouterLinkCreator,
    nextJSLinkCreator,
    defaultLinkCreator,
  } = parseAppConfig(app);

  if (destinationDir) {
    const routeCreator = `./utils/create${routingType}Route`;

    Object.entries(routes).forEach(([routeName, routePattern]) =>
      generateRouteFile({ routeName, routePattern, routeCreator, destinationDir })
    );

    generateRouteCreatorFile({
      routingType,
      destinationDir,
      reactRouterLinkCreator,
      nextJSLinkCreator,
      defaultLinkCreator,
    });
  }
}

export default generateAppRoutes;
