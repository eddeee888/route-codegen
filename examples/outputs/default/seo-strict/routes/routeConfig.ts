/* This file was automatically generated with route-codegen and should not be edited. */

import { UrlParamsContact, patternContact } from "./contact/patternContact";
import { UrlParamsUser, patternUser } from "./user/patternUser";
import { UrlParamsAccount, patternAccount } from "./account/patternAccount";
import { UrlParamsLogin, patternLogin } from "./login/patternLogin";
import { UrlParamsSignup, patternSignup } from "./signup/patternSignup";
import { UrlParamsHome, patternHome } from "./home/patternHome";
import { UrlParamsAbout, patternAbout } from "./about/patternAbout";
import { UrlParamsToc, patternToc } from "./toc/patternToc";
import { UrlParamsLegacy, patternLegacy } from "./legacy/patternLegacy";
export const routeConfig: Record<string, { pathPattern: string } & ({ type: "external" } | { type: "internal" })> = {
  contact: {
    pathPattern: patternContact,
    type: "internal",
  },
  user: {
    pathPattern: patternUser,
    type: "external",
  },
  account: {
    pathPattern: patternAccount,
    type: "external",
  },
  login: {
    pathPattern: patternLogin,
    type: "external",
  },
  signup: {
    pathPattern: patternSignup,
    type: "external",
  },
  home: {
    pathPattern: patternHome,
    type: "external",
  },
  about: {
    pathPattern: patternAbout,
    type: "external",
  },
  toc: {
    pathPattern: patternToc,
    type: "external",
  },
  legacy: {
    pathPattern: patternLegacy,
    type: "external",
  },
};
export type RouteConfigProps =
  | { to: "contact"; urlParams: UrlParamsContact }
  | { to: "user"; urlParams: UrlParamsUser }
  | { to: "account"; urlParams?: UrlParamsAccount }
  | { to: "login"; urlParams?: UrlParamsLogin }
  | { to: "signup"; urlParams?: UrlParamsSignup }
  | { to: "home"; urlParams?: UrlParamsHome }
  | { to: "about"; urlParams: UrlParamsAbout }
  | { to: "toc"; urlParams?: UrlParamsToc }
  | { to: "legacy"; urlParams?: UrlParamsLegacy };
