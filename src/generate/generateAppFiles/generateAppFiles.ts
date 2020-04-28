import { AppConfig } from "./../config";
import generateTemplateFiles from "./generateTemplateFiles";
import { TemplateFile } from "../types";
import parseAppConfig from "./parseAppConfig";
import info from "../utils/info";

const generateAppFiles = (appName: string, app: AppConfig): TemplateFile[] => {
  const { routes, routingType, destinationDir, routeLinkOptions, importGenerateUrl, importRedirectServerSide } = parseAppConfig(
    appName,
    app
  );

  if (destinationDir) {
    const files: TemplateFile[][] = Object.entries(routes).map(([routeName, routePattern]) =>
      generateTemplateFiles({
        routeName,
        routeLinkOptions,
        routePattern,
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

    return filesToGenerate;
  }

  info([appName], `*** No destinationDir. Not generating files ***\n`);

  return [];
};

export default generateAppFiles;
