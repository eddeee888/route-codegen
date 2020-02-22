import { AppConfig, parseAppConfig, RoutingType } from './../config';
import createRouteFile from './createRouteFile';

function generateAppRoutes(app: AppConfig): void {
  const {
    routes,
    reactRouterRouteCreator,
    nextJsRouteCreator,
    externalRouteCreator,
    routingType,
    destinationDir,
  } = parseAppConfig(app);

  if (destinationDir) {
    let routeCreator = externalRouteCreator;
    if (routingType === RoutingType.NextJS) {
      routeCreator = nextJsRouteCreator;
    } else if (routingType === RoutingType.ReactRouter) {
      routeCreator = reactRouterRouteCreator;
    }

    Object.entries(routes).forEach(([routeName, routePattern]) =>
      createRouteFile({ routeName, routePattern, routeCreator, destinationDir })
    );
  }
}

export default generateAppRoutes;
