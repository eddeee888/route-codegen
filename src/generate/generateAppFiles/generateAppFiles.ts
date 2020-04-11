import { AppConfig } from './../config';
import generateTemplateFiles from './generateTemplateFiles';
import { TemplateFile } from '../types';
import parseAppConfig from './parseAppConfig';
import info from '../utils/info';

const generateAppFiles = (appName: string, app: AppConfig): TemplateFile[] => {
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
    const filesToGenerate = files.flat();

    info(
      [appName],
      `Generating files: ${filesToGenerate
        .map(file => `${file.filename}.${file.extension}`)
        .join(', ')
        .slice(0, -2)}`
    );

    return filesToGenerate;
  }

  return [];
};

export default generateAppFiles;
