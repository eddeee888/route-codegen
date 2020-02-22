import { pathToRegexp, Key } from 'path-to-regexp';
import { writeFile, mkdirSync } from 'fs';
import generateRouteTemplate from './generateRouteTemplate';

type CreateRouteFile = (params: {
  routeName: string;
  routePattern: string;
  routeCreator: string;
  destinationDir: string;
}) => void;

const createRouteFile: CreateRouteFile = ({ routeName, routePattern, routeCreator, destinationDir }) => {
  const keys: Key[] = [];
  const routeNameString = routeName.toString();
  const displayRouteName = `RouteTo${routeNameString[0].toUpperCase() + routeNameString.slice(1)}`;

  pathToRegexp(routePattern, keys);

  const template = generateRouteTemplate({
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

export default createRouteFile;
