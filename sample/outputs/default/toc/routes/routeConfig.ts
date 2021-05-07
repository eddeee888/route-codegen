/* This file was automatically generated with route-codegen and should not be edited. */

import { UrlParamsToc, patternToc } from "./toc/patternToc";
import { UrlParamsUser, patternUser } from "./user/patternUser";
import { UrlParamsAccount, patternAccount } from "./account/patternAccount";
import { UrlParamsLogin, patternLogin } from "./login/patternLogin";
import { UrlParamsSignup, patternSignup } from "./signup/patternSignup";
import { UrlParamsHome, patternHome } from "./home/patternHome";
import { UrlParamsAbout, patternAbout } from "./about/patternAbout";
import { UrlParamsContact, patternContact } from "./contact/patternContact";
import { UrlParamsLegacy, patternLegacy } from "./legacy/patternLegacy";
export const routeConfig: Record<string, { pathPattern: string } & ({ type: "external"; component: "a" } | { type: "internal" })> = {
  toc: {
    pathPattern: patternToc,
    type: "internal",
  },
  user: {
    pathPattern: patternUser,
    type: "external",
    component: "a",
  },
  account: {
    pathPattern: patternAccount,
    type: "external",
    component: "a",
  },
  login: {
    pathPattern: patternLogin,
    type: "external",
    component: "a",
  },
  signup: {
    pathPattern: patternSignup,
    type: "external",
    component: "a",
  },
  home: {
    pathPattern: patternHome,
    type: "external",
    component: "a",
  },
  about: {
    pathPattern: patternAbout,
    type: "external",
    component: "a",
  },
  contact: {
    pathPattern: patternContact,
    type: "external",
    component: "a",
  },
  legacy: {
    pathPattern: patternLegacy,
    type: "external",
    component: "a",
  },
};
export type RouteConfigProps =
  | { to: "toc"; urlParams?: UrlParamsToc }
  | { to: "user"; urlParams: UrlParamsUser }
  | { to: "account"; urlParams?: UrlParamsAccount }
  | { to: "login"; urlParams?: UrlParamsLogin }
  | { to: "signup"; urlParams?: UrlParamsSignup }
  | { to: "home"; urlParams?: UrlParamsHome }
  | { to: "about"; urlParams: UrlParamsAbout }
  | { to: "contact"; urlParams: UrlParamsContact }
  | { to: "legacy"; urlParams?: UrlParamsLegacy };
