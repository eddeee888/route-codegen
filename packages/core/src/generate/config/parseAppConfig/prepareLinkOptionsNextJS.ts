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
    mode: "loose",
  };
  if (!routeLinkOptions) {
    info([appName, "nextJSLinkOptions"], "custom options not found... Using default");
    return { ...defaultOptions };
  }

  const result: ParsedLinkOptionsNextJS = {
    ...defaultOptions,
    generateLinkComponent: getOverriddenValue(defaultOptions.generateLinkComponent, routeLinkOptions.generate?.linkComponent),
    generateUseParams: getOverriddenValue(defaultOptions.generateUseParams, routeLinkOptions.generate?.useParams),
    generateUseRedirect: getOverriddenValue(defaultOptions.generateUseRedirect, routeLinkOptions.generate?.useRedirect),
    mode: (() => {
      const mode: ParsedLinkOptionsNextJS["mode"] =
        routeLinkOptions.mode === "strict" || routeLinkOptions.mode === "loose" ? routeLinkOptions.mode : defaultOptions.mode;
      return getOverriddenValue(defaultOptions.mode, mode);
    })(),
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
