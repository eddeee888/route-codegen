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
  };

  if (!routeLinkOptions) {
    info([appName, "reactRouterV5LinkOptions"], "custom options not found... Using default");
    return { ...defaultOptions };
  }

  const result: ParsedLinkOptionsReactRouterV5 = {
    ...defaultOptions,
    generateLinkComponent: getOverriddenValue(defaultOptions.generateLinkComponent, routeLinkOptions.generateLinkComponent),
    generateRedirectComponent: getOverriddenValue(defaultOptions.generateRedirectComponent, routeLinkOptions.generateRedirectComponent),
    generateUseParams: getOverriddenValue(defaultOptions.generateUseParams, routeLinkOptions.generateUseParams),
    generateUseRedirect: getOverriddenValue(defaultOptions.generateUseRedirect, routeLinkOptions.generateUseRedirect),
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
