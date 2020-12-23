import { RoutingType } from "../config";
import { TemplateFile, Import } from "../types";
import { RouteLinkOptions } from "../config";
import generatorCore from "./generatorCore";
import generatorDefault from "./generatorDefault";
import generatorReactRouterV5 from "./generatorReactRouterV5";
import generatorNextJS from "./generatorNextJS";
import { PatternNamedExports } from "./types";

export interface GenerateTemplateFilesParams {
  origin: string;
  routeName: string;
  routePattern: string;
  destinationDir: string;
  routingType: RoutingType;
  routeLinkOptions: RouteLinkOptions;
  importGenerateUrl: Import;
  importRedirectServerSide: Import;
}

const generateTemplateFiles = (params: GenerateTemplateFilesParams): TemplateFile[] => {
  const {
    origin,
    routeName,
    routePattern,
    destinationDir: originalDestinationDir,
    routingType,
    routeLinkOptions,
    importGenerateUrl,
    importRedirectServerSide,
  } = params;

  const destinationDir = `${originalDestinationDir}/${routeName}`;

  const [patternFile, patternNamedExports] = generatorCore.generatePatternFile({
    origin,
    routeName,
    routePattern,
    destinationDir,
    routingType,
    linkOptionModeNextJS: routeLinkOptions.NextJS.mode,
  });

  const genUrlFile = generatorCore.generateUrlFile({
    importGenerateUrl,
    destinationDir,
    routeName,
    patternNamedExports,
  });

  const files = [patternFile, genUrlFile];

  // Handle file generation for each routing type
  switch (routingType) {
    case RoutingType.ReactRouterV5: {
      if (routeLinkOptions.ReactRouterV5.generateLinkComponent) {
        const linkFile = generatorReactRouterV5.generateLinkFile({
          routeName,
          destinationDir,
          routeLinkOption: routeLinkOptions.ReactRouterV5,
          patternNamedExports,
          importGenerateUrl,
        });
        files.push(linkFile);
      }
      if (routeLinkOptions.ReactRouterV5.generateUseParams && !!patternNamedExports.pathParamsInterfaceName) {
        const useParamsFile = generatorReactRouterV5.generateUseParamsFile({
          routeName,
          destinationDir,
          patternName: patternNamedExports.patternName,
          pathParamsFilename: patternNamedExports.filename,
          pathParamsInterfaceName: patternNamedExports.pathParamsInterfaceName,
          mode: routeLinkOptions.ReactRouterV5.mode,
        });
        files.push(useParamsFile);
      }
      if (routeLinkOptions.ReactRouterV5.generateUseRedirect) {
        const useRedirectFile = generatorReactRouterV5.generateUseRedirectFile({
          routeName,
          destinationDir,
          patternNamedExports,
          importGenerateUrl,
        });
        files.push(useRedirectFile);
      }
      if (routeLinkOptions.ReactRouterV5.generateRedirectComponent) {
        const redirectFile = generatorReactRouterV5.generateRedirectFile({
          patternNamedExports,
          destinationDir,
          importGenerateUrl,
          routeName,
        });
        files.push(redirectFile);
      }

      break;
    }
    case RoutingType.NextJS: {
      if (routeLinkOptions.NextJS.generateLinkComponent) {
        const linkFile = generatorNextJS.generateLinkFile({
          routeName,
          destinationDir,
          routeLinkOption: routeLinkOptions.NextJS,
          patternNamedExports,
          importGenerateUrl,
        });
        files.push(linkFile);
      }

      const checkPathParamsInterfaceName = (
        patternNamedExports: PatternNamedExports
      ): { type: "none" } | { type: "normal"; pathParamsInterfaceName: string } | { type: "nextJS"; pathParamsInterfaceName: string } => {
        if (patternNamedExports.pathParamsInterfaceNameNextJS) {
          return { type: "nextJS", pathParamsInterfaceName: patternNamedExports.pathParamsInterfaceNameNextJS };
        }
        if (patternNamedExports.pathParamsInterfaceName) {
          return { type: "normal", pathParamsInterfaceName: patternNamedExports.pathParamsInterfaceName };
        }
        return { type: "none" };
      };

      const pathParamsData = checkPathParamsInterfaceName(patternNamedExports);
      if (routeLinkOptions.NextJS.generateUseParams && pathParamsData.type !== "none") {
        const useParamsFileNextJS = generatorNextJS.generateUseParamsFile({
          routeName,
          routePattern,
          destinationDir,
          pathParamsFilename: patternNamedExports.filename,
          pathParamsInterfaceName: pathParamsData.pathParamsInterfaceName,
          mode: routeLinkOptions.NextJS.mode,
        });
        files.push(useParamsFileNextJS);
      }
      if (routeLinkOptions.NextJS.generateUseRedirect) {
        const useRedirectFileNextJS = generatorNextJS.generateUseRedirectFile({
          routeName,
          destinationDir,
          importGenerateUrl,
          patternNamedExports,
        });
        files.push(useRedirectFileNextJS);
      }
      break;
    }
    case RoutingType.Default: {
      if (routeLinkOptions.Default.generateLinkComponent) {
        const linkFile = generatorDefault.generateLinkFile({
          routeName,
          destinationDir,
          routeLinkOption: routeLinkOptions.Default,
          patternNamedExports,
          importGenerateUrl,
        });
        files.push(linkFile);
      }
      if (routeLinkOptions.Default.generateUseRedirect) {
        const useRedirectDefault = generatorDefault.generateUseRedirectFile({
          routeName,
          importGenerateUrl,
          destinationDir,
          patternNamedExports,
        });
        files.push(useRedirectDefault);
      }
      if (routeLinkOptions.Default.generateRedirectComponent) {
        const redirectFile = generatorDefault.generateRedirectFile({
          routeName,
          destinationDir,
          importGenerateUrl,
          patternNamedExports,
          importRedirectServerSide,
        });
        files.push(redirectFile);
      }
      break;
    }
  }

  return files;
};

export default generateTemplateFiles;
