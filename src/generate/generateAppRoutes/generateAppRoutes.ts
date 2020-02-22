import { AppConfig, parseAppConfig } from './../config';
import generateRouteFile from './generateRouteFile';
import generateRouteCreatorFile from './generateRouteCreatorFile';
import generateUrlDefaultFile from './generateUrlDefaultFile';

function generateAppRoutes(app: AppConfig): void {
  const {
    routes,
    routingType,
    destinationDir,
    reactRouterLinkCreatorPath,
    nextJSLinkCreatorPath,
    defaultLinkCreatorPath,
    generateUrlFunctionPath,
  } = parseAppConfig(app);

  if (destinationDir) {
    const routeCreator = `./utils/create${routingType}Route`;
    const utilsFolder = destinationDir.concat('/', '/utils');

    Object.entries(routes).forEach(([routeName, routePattern]) =>
      generateRouteFile({ routeName, routePattern, routeCreator, destinationDir })
    );

    generateUrlDefaultFile(utilsFolder);

    generateRouteCreatorFile({
      routingType,
      utilsFolder,
      reactRouterLinkCreatorPath,
      nextJSLinkCreatorPath,
      defaultLinkCreatorPath,
      generateUrlFunctionPath,
    });
  }
}

export default generateAppRoutes;
