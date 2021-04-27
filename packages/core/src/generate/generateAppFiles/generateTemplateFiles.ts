import { RoutingType, RouteLinkOptions } from "../config";
import { TemplateFile, Import } from "../../utils";
import TypescriptPatternPlugin from "../../plugins/typescript-pattern";
import TypescriptGenerateUrlPlugin from "../../plugins/typescript-generate-url";
import TypescriptAnchorPlugin from "../../plugins/typescript-anchor";
import TypescriptReactRouter5Plugin from "../../plugins/typescript-react-router-5";
import TypescriptNextJSPlugin from "../../plugins/typescript-next-js";

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
      const nextJSFiles = new TypescriptNextJSPlugin({
        routeName,
        destinationDir,
        routeLinkOptions: routeLinkOptions.NextJS,
        patternNamedExports,
        importGenerateUrl,
        routePattern,
      }).generate();

      files.push(...nextJSFiles);

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
