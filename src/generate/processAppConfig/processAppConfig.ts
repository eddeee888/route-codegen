import { pathToRegexp, Key } from 'path-to-regexp';
import { writeFile, mkdirSync } from 'fs';
import generateRouteFile from './../generateRouteFile';
import { AppConfig, parseAppConfig, RoutingType } from './../config';

type ProcessRouteEntry = (params: {
  routeName: string;
  routePattern: string;
  routeCreator: string;
  destinationDir: string;
}) => void;

const processRouteEntry: ProcessRouteEntry = ({ routeName, routePattern, routeCreator, destinationDir }) => {
  const keys: Key[] = [];
  const routeNameString = routeName.toString();
  const displayRouteName = `RouteTo${routeNameString[0].toUpperCase() + routeNameString.slice(1)}`;

  pathToRegexp(routePattern, keys);

  const template = generateRouteFile({
    routePattern,
    displayRouteName,
    keys,
    routeCreator,
  });

  mkdirSync(destinationDir, { recursive: true });

  writeFile(destinationDir.concat('/', displayRouteName, '.ts'), template, err => {
    if (err) {
      throw err;
    }
  });
};

function processAppConfig(app: AppConfig): void {
  const {
    destinationDir,
    routes,
    reactRouterRouteCreator,
    nextJsRouteCreator,
    externalRouteCreator,
    routingType,
  } = parseAppConfig(app);

  let routeCreator = externalRouteCreator;
  if (routingType === RoutingType.NextJS) {
    routeCreator = nextJsRouteCreator;
  } else if (routingType === RoutingType.ReactRouter) {
    routeCreator = reactRouterRouteCreator;
  }

  Object.entries(routes).forEach(([routeName, routePattern]) =>
    processRouteEntry({ routeName, routePattern, routeCreator, destinationDir })
  );
}

export default processAppConfig;
