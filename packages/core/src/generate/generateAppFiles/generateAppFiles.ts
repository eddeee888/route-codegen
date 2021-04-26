import { AppConfig, parseAppConfig } from "./../config";
import generateTemplateFiles from "./generateTemplateFiles";
import { info, TemplateFile } from "../../utils";
import TypescriptRootIndexPlugin from "../../plugins/typescript-root-index";

const generateAppFiles = (appName: string, app: AppConfig): TemplateFile[] => {
  const {
    routes,
    routingType,
    destinationDir,
    routeLinkOptions,
    importGenerateUrl,
    importRedirectServerSide,
    generateRootIndex,
  } = parseAppConfig(appName, app);

  if (destinationDir) {
    const files: TemplateFile[][] = Object.entries(routes).map(([routeName, routePattern]) =>
      generateTemplateFiles({
        origin: routePattern.origin,
        routePattern: routePattern.path,
        routeName,
        routeLinkOptions,
        destinationDir,
        routingType,
        importGenerateUrl,
        importRedirectServerSide,
      })
    );
    const filesToGenerate = files.flat();

    if (filesToGenerate.length > 0) {
      info(
        [appName],
        `*** Generating files ***\n${filesToGenerate.map((file) => `${file.destinationDir}${file.filename}${file.extension}`).join("\n")}\n`
      );
    } else {
      info([appName], `*** No files to generate ***\n`);
    }

    if (generateRootIndex) {
      const rootIndexFile = new TypescriptRootIndexPlugin({ destinationDir, files: filesToGenerate }).generate();
      if (rootIndexFile) {
        return [...filesToGenerate, rootIndexFile];
      }
      return [...filesToGenerate];
    }

    return filesToGenerate;
  }

  info([appName], `*** No destinationDir. Not generating files ***\n`);

  return [];
};

export default generateAppFiles;
