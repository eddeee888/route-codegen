/* This file was automatically generated with route-codegen and should not be edited. */
import Link from "~/common/components/NextLink";

import { UrlParamsHome, patternHome } from "./home/patternHome";
import { UrlParamsAbout, patternAbout } from "./about/patternAbout";
import { UrlParamsUser, patternUser } from "./user/patternUser";
import { UrlParamsAccount, patternAccount } from "./account/patternAccount";
import { UrlParamsLogin, patternLogin } from "./login/patternLogin";
import { UrlParamsSignup, patternSignup } from "./signup/patternSignup";
import { UrlParamsContact, patternContact } from "./contact/patternContact";
import { UrlParamsToc, patternToc } from "./toc/patternToc";
import { UrlParamsLegacy, patternLegacy } from "./legacy/patternLegacy";
export const routeConfig: Record<
  string,
  { pathPattern: string } & ({ type: "external"; component: "a" } | { type: "internal"; component: typeof Link })
> = {
  home: {
    pathPattern: patternHome,
    type: "internal",
    component: Link,
  },
  about: {
    pathPattern: patternAbout,
    type: "internal",
    component: Link,
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
  contact: {
    pathPattern: patternContact,
    type: "external",
    component: "a",
  },
  toc: {
    pathPattern: patternToc,
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
  | { to: "home"; urlParams?: UrlParamsHome }
  | { to: "about"; urlParams: UrlParamsAbout }
  | { to: "user"; urlParams: UrlParamsUser }
  | { to: "account"; urlParams?: UrlParamsAccount }
  | { to: "login"; urlParams?: UrlParamsLogin }
  | { to: "signup"; urlParams?: UrlParamsSignup }
  | { to: "contact"; urlParams: UrlParamsContact }
  | { to: "toc"; urlParams?: UrlParamsToc }
  | { to: "legacy"; urlParams?: UrlParamsLegacy };
