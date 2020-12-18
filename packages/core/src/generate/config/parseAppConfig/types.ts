import { AppConfig } from "../types";
import { Import } from "../../types";

export interface ParsedLinkOptionsReactRouterV5 {
  importLink: Import;
  linkComponent: string;
  linkProps: string;
  hrefProp: string;
  generateLinkComponent: boolean;
  generateRedirectComponent: boolean;
  generateUseRedirect: boolean;
  generateUseParams: boolean;
  mode: "strict" | "loose";
}

export interface ParsedLinkOptionsNextJS {
  importLink: Import;
  linkComponent: string;
  linkProps: string;
  hrefProp: string;
  generateLinkComponent: boolean;
  generateUseParams: boolean;
  generateUseRedirect: boolean;
  mode: "strict" | "loose";
}

export interface ParsedLinkOptionsDefault {
  importLink?: Import;
  linkProps?: string;
  inlineLinkProps?: {
    // inlineLinkProps is ONLY here when there's no importCustomLink is passed in
    template: string;
    linkProps: string;
  };
  linkComponent: string;
  hrefProp: string;
  generateLinkComponent: boolean;
  generateRedirectComponent: boolean;
  generateUseRedirect: boolean;
}

export type RouteLinkOptions = {
  NextJS: ParsedLinkOptionsNextJS;
  ReactRouterV5: ParsedLinkOptionsReactRouterV5;
  Default: ParsedLinkOptionsDefault;
};

export interface TopLevelGenerateOptions {
  generateLinkComponent: boolean;
  generateRedirectComponent: boolean;
  generateUseParams: boolean;
  generateUseRedirect: boolean;
}

interface PrepareLinkOptionsParams<P> {
  appName: string;
  routeLinkOptions: P;
  topLevelGenerateOptions: TopLevelGenerateOptions;
}

export type PrepareLinkOptionsParamsDefault = PrepareLinkOptionsParams<AppConfig["defaultLinkOptions"]>;

export type PrepareLinkOptionsParamsNextJS = PrepareLinkOptionsParams<AppConfig["nextJSLinkOptions"]>;

export type PrepareLinkOptionsParamsReactRouterV5 = PrepareLinkOptionsParams<AppConfig["reactRouterV5LinkOptions"]>;
