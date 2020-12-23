import { PrepareLinkOptionsParamsReactRouterV5, ParsedLinkOptionsReactRouterV5 } from "./types";
import { getOverriddenValue, info } from "../../utils";
import { handleImportCustomLink } from "./handleImportCustomLink";

export const prepareLinkOptionsReactRouterV5 = (params: PrepareLinkOptionsParamsReactRouterV5): ParsedLinkOptionsReactRouterV5 => {
  const { appName, routeLinkOptions, topLevelGenerateOptions } = params;

  const defaultOptions: ParsedLinkOptionsReactRouterV5 = {
    importLink: {
      from: "react-router-dom",
      namedImports: [{ name: "LinkProps" }, { name: "Link" }],
    },
    linkComponent: "Link",
    linkProps: "LinkProps",
    hrefProp: "to",
    generateLinkComponent: topLevelGenerateOptions.generateLinkComponent,
    generateRedirectComponent: topLevelGenerateOptions.generateRedirectComponent,
    generateUseRedirect: topLevelGenerateOptions.generateUseRedirect,
    generateUseParams: topLevelGenerateOptions.generateUseParams,
    mode: "loose",
  };

  if (!routeLinkOptions) {
    info([appName, "reactRouterV5LinkOptions"], "custom options not found... Using default");
    return { ...defaultOptions };
  }

  const result: ParsedLinkOptionsReactRouterV5 = {
    ...defaultOptions,
    generateLinkComponent: getOverriddenValue(defaultOptions.generateLinkComponent, routeLinkOptions.generate?.linkComponent),
    generateRedirectComponent: getOverriddenValue(defaultOptions.generateRedirectComponent, routeLinkOptions.generate?.redirectComponent),
    generateUseParams: getOverriddenValue(defaultOptions.generateUseParams, routeLinkOptions.generate?.useParams),
    generateUseRedirect: getOverriddenValue(defaultOptions.generateUseRedirect, routeLinkOptions.generate?.useRedirect),
    mode: (() => {
      const mode: ParsedLinkOptionsReactRouterV5["mode"] =
        routeLinkOptions.mode === "strict" || routeLinkOptions.mode === "loose" ? routeLinkOptions.mode : defaultOptions.mode;
      return getOverriddenValue(defaultOptions.mode, mode);
    })(),
  };

  if (!routeLinkOptions.importCustomLink) {
    info([appName, "reactRouterV5LinkOptions", "importCustomLink"], "custom options not found... Using default");
    return { ...result };
  }

  info([appName, "reactRouterV5LinkOptions"], "using custom link options");
  const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink({
    appName,
    linkOptionName: "reactRouterV5LinkOptions",
    importCustomLink: routeLinkOptions.importCustomLink,
  });

  return {
    ...result,
    importLink,
    linkComponent,
    hrefProp,
    linkProps,
  };
};
