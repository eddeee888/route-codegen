import { RoutingType } from '../config';
import { TemplateFile, Import } from '../types';
import generatePatternFile from './generatePatternFile';
import generateUseParamsFile from './generateUseParamsFile';
import generateUseRedirectFile from './generateUseRedirectFile';
import generateUrlFile from './generateUrlFile';
import generateLinkFile from './generateLinkFile';
import { RouteLinkOptions } from './parseAppConfig';
import generateUseParamsFileNextJS from './generateUseParamsFileNextJS';
import { Key, pathToRegexp } from 'path-to-regexp';

export interface GenerateTemplateFilesParams {
  routeName: string;
  routePattern: string;
  destinationDir: string;
  routingType: RoutingType;
  routeLinkOptions: RouteLinkOptions;
  importGenerateUrl: Import;
  shouldGenerateLink: boolean;
}

type GenerateTemplateFiles = (params: GenerateTemplateFilesParams) => TemplateFile[];

const generateTemplateFiles: GenerateTemplateFiles = ({
  routeName: originalRouteName,
  routePattern,
  destinationDir: originalDestinationDir,
  routingType,
  routeLinkOptions,
  importGenerateUrl,
  shouldGenerateLink,
}) => {
  const routeNameString = originalRouteName.toString();
  const routeName = routeNameString[0].toUpperCase() + routeNameString.slice(1);
  const destinationDir = `${originalDestinationDir}/${originalRouteName}`;

  const keys: Key[] = [];
  pathToRegexp(routePattern, keys);

  const [patternFile, patternNamedExports] = generatePatternFile({
    keys,
    routeName,
    routePattern,
    destinationDir,
    routingType,
  });

  const genUrlFile = generateUrlFile({ importGenerateUrl, destinationDir, routeName, patternNamedExports });

  const files = [patternFile, genUrlFile];

  if (shouldGenerateLink) {
    const linkFile = generateLinkFile({
      routeName,
      destinationDir,
      routeLinkOptions,
      routingType,
      patternNamedExports,
      importGenerateUrl,
    });
    files.push(linkFile);
  }

  // Handle extra files for each routing types
  if (routingType === RoutingType.ReactRouterV5) {
    if (routeLinkOptions.ReactRouterV5.useParams && !!patternNamedExports.pathParamsInterfaceName) {
      const useParamsFile = generateUseParamsFile({
        routeName,
        destinationDir,
        patternName: patternNamedExports.patternName,
        pathParamsFilename: patternNamedExports.filename,
        pathParamsInterfaceName: patternNamedExports.pathParamsInterfaceName,
      });
      files.push(useParamsFile);
    }
    if (routeLinkOptions.ReactRouterV5.useRedirect) {
      const useRedirectFile = generateUseRedirectFile({
        routeName,
        destinationDir,
        patternNamedExports,
        importGenerateUrl,
      });
      files.push(useRedirectFile);
    }
  } else if (routingType === RoutingType.NextJS) {
    if (routeLinkOptions.NextJS.useParams && !!patternNamedExports.pathParamsInterfaceNameNextJS) {
      const useParamsFileNextJS = generateUseParamsFileNextJS({
        keys,
        routeName,
        destinationDir,
        pathParamsFilename: patternNamedExports.filename,
        pathParamsInterfaceName: patternNamedExports.pathParamsInterfaceNameNextJS,
      });
      files.push(useParamsFileNextJS);
    }
  }

  return files;
};

export default generateTemplateFiles;
