import { AppConfig } from './../config';
import generateTemplateFiles from './generateTemplateFiles';
import { TemplateFile } from '../types';
import parseAppConfig from './parseAppConfig';

function generateAppFiles(appName: string, app: AppConfig): TemplateFile[] {
  const {
    routes,
    routingType,
    destinationDir,
    routeLinkOptions,
    importGenerateUrl,
    shouldGenerateLink,
  } = parseAppConfig(appName, app);

  if (destinationDir) {
    const files: TemplateFile[][] = Object.entries(routes).map(([routeName, routePattern]) =>
      generateTemplateFiles({
        routeName,
        routeLinkOptions,
        routePattern,
        destinationDir,
        routingType,
        shouldGenerateLink,
        importGenerateUrl,
      })
    );

    return files.flat();
  }

  return [];
}

export default generateAppFiles;
