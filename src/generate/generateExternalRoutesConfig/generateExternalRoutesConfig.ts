import { AppConfig, RoutingType } from './../config';

function generateExternalRoutesConfig(apps: Record<string, AppConfig>): Record<string, AppConfig> {
  const externalRoutesConfig: Record<string, AppConfig> = {};

  Object.entries(apps).forEach(([appName, defaultAppConfig]) => {
    let currentAppRoutes: Record<string, string> = {};
    // TODO: handle duplicated routes in different apps

    // Remove current app from app list.
    const otherApps = { ...apps };
    delete otherApps[appName];

    // Use otherApps to generate the external route from current app
    Object.entries(otherApps).forEach(([otherAppName, otherAppDefaultConfig]) => {
      currentAppRoutes = { ...currentAppRoutes, ...otherAppDefaultConfig['routes'] };
    });

    externalRoutesConfig[appName] = {
      ...defaultAppConfig,
      routes: currentAppRoutes,
      routingType: RoutingType.Default,
    };
  });

  return externalRoutesConfig;
}

export default generateExternalRoutesConfig;
