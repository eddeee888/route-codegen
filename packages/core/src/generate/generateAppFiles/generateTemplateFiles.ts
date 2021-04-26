import { RoutingType, RouteLinkOptions } from "../config";
import { TemplateFile, Import } from "../types";
import { PatternNamedExports } from "./types";
import { generatorNextJS } from "./generatorNextJS";
import TypescriptPatternPlugin from "../../plugins/typescript-pattern";
import TypescriptGenerateUrlPlugin from "../../plugins/typescript-generate-url";
import TypescriptAnchorPlugin from "../../plugins/typescript-anchor";
import TypescriptReactRouter5Plugin from "../../plugins/typescript-react-router-5";

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

  const [patternFile, patternNamedExports] = new TypescriptPatternPlugin({
    origin,
    routeName,
    routePattern,
    destinationDir,
    routingType,
    linkOptionModeNextJS: routeLinkOptions.NextJS.mode,
  }).generate();

  const genUrlFile = new TypescriptGenerateUrlPlugin({
    importGenerateUrl,
    destinationDir,
    routeName,
    patternNamedExports,
  }).generate();

  const files = [patternFile, genUrlFile];

  // Handle file generation for each routing type
  switch (routingType) {
    case RoutingType.ReactRouterV5: {
      const rr5Files = new TypescriptReactRouter5Plugin({
        routeName,
        destinationDir,
        routeLinkOption: routeLinkOptions.ReactRouterV5,
        patternNamedExports,
        importGenerateUrl,
      }).generate();

      files.push(...rr5Files);

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
      const anchorFiles = new TypescriptAnchorPlugin({
        routeName,
        destinationDir,
        routeLinkOption: routeLinkOptions.Default,
        patternNamedExports,
        importGenerateUrl,
        importRedirectServerSide,
      }).generate();

      files.push(...anchorFiles);

      break;
    }
  }

  return files;
};

export default generateTemplateFiles;
