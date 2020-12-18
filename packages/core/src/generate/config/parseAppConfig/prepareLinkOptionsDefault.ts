import { PrepareLinkOptionsParamsDefault, ParsedLinkOptionsDefault } from "./types";
import { getOverriddenValue, info } from "../../utils";
import { handleImportCustomLink } from "./handleImportCustomLink";

export const prepareLinkOptionsDefault = (params: PrepareLinkOptionsParamsDefault): ParsedLinkOptionsDefault => {
  const { appName, routeLinkOptions, topLevelGenerateOptions } = params;

  const defaultOptions: ParsedLinkOptionsDefault = {
    hrefProp: "href",
    linkComponent: "a",
    inlineLinkProps: {
      template: `type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'>`,
      linkProps: "LinkProps",
    },
    generateLinkComponent: topLevelGenerateOptions.generateLinkComponent,
    generateUseRedirect: topLevelGenerateOptions.generateUseRedirect,
    generateRedirectComponent: topLevelGenerateOptions.generateRedirectComponent,
  };

  if (!routeLinkOptions) {
    info([appName, "defaultLinkOptions"], "custom options not found... Using default");
    return { ...defaultOptions };
  }

  const result: ParsedLinkOptionsDefault = {
    ...defaultOptions,
    generateLinkComponent: getOverriddenValue(defaultOptions.generateLinkComponent, routeLinkOptions.generateLinkComponent),
    generateRedirectComponent: getOverriddenValue(defaultOptions.generateRedirectComponent, routeLinkOptions.generateRedirectComponent),
    generateUseRedirect: getOverriddenValue(defaultOptions.generateUseRedirect, routeLinkOptions.generateUseRedirect),
  };

  if (!routeLinkOptions.importCustomLink) {
    info([appName, "defaultLinkOptions", "importCustomLink"], "custom options not found... Using default");
    return { ...result };
  }

  info([appName, "defaultLinkOptions"], "using custom link options");
  const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink({
    appName,
    linkOptionName: "defaultLinkOptions",
    importCustomLink: routeLinkOptions.importCustomLink,
  });

  return {
    ...result,
    inlineLinkProps: undefined, // If we import custom link props, do not use the default inline prop
    importLink,
    hrefProp,
    linkComponent,
    linkProps,
  };
};
