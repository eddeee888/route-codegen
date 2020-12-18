import { PrepareLinkOptionsParamsNextJS, ParsedLinkOptionsNextJS } from "./types";
import { getOverriddenValue, info } from "../../utils";
import { handleImportCustomLink } from "./handleImportCustomLink";

export const prepareLinkOptionsNextJS = (params: PrepareLinkOptionsParamsNextJS): ParsedLinkOptionsNextJS => {
  const { appName, routeLinkOptions, topLevelGenerateOptions } = params;

  const defaultOptions: ParsedLinkOptionsNextJS = {
    importLink: {
      from: "next/link",
      defaultImport: "Link",
      namedImports: [{ name: "LinkProps" }],
    },
    linkComponent: "Link",
    linkProps: "LinkProps",
    hrefProp: "href",
    generateLinkComponent: topLevelGenerateOptions.generateLinkComponent,
    generateUseParams: topLevelGenerateOptions.generateUseParams,
    generateUseRedirect: topLevelGenerateOptions.generateUseRedirect,
  };
  if (!routeLinkOptions) {
    info([appName, "nextJSLinkOptions"], "custom options not found... Using default");
    return { ...defaultOptions };
  }

  const result: ParsedLinkOptionsNextJS = {
    ...defaultOptions,
    generateLinkComponent: getOverriddenValue(defaultOptions.generateLinkComponent, routeLinkOptions.generateLinkComponent),
    generateUseParams: getOverriddenValue(defaultOptions.generateUseParams, routeLinkOptions.generateUseParams),
    generateUseRedirect: getOverriddenValue(defaultOptions.generateUseRedirect, routeLinkOptions.generateUseRedirect),
  };

  if (!routeLinkOptions.importCustomLink) {
    info([appName, "nextJSLinkOptions", "importCustomLink"], "custom options not found... Using default");
    return { ...result };
  }

  info([appName, "nextJSLinkOptions"], "using custom link options");
  const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink({
    appName,
    linkOptionName: "nextJSLinkOptions",
    importCustomLink: routeLinkOptions.importCustomLink,
  });

  return {
    ...result,
    importLink,
    hrefProp,
    linkComponent,
    linkProps,
  };
};
