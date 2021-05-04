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
    component: Link,
    type: "internal",
  },
  about: {
    pathPattern: patternAbout,
    component: Link,
    type: "internal",
  },
  user: {
    pathPattern: patternUser,
    component: "a",
    type: "external",
  },
  account: {
    pathPattern: patternAccount,
    component: "a",
    type: "external",
  },
  login: {
    pathPattern: patternLogin,
    component: "a",
    type: "external",
  },
  signup: {
    pathPattern: patternSignup,
    component: "a",
    type: "external",
  },
  contact: {
    pathPattern: patternContact,
    component: "a",
    type: "external",
  },
  toc: {
    pathPattern: patternToc,
    component: "a",
    type: "external",
  },
  legacy: {
    pathPattern: patternLegacy,
    component: "a",
    type: "external",
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
