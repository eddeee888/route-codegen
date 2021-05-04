/* This file was automatically generated with route-codegen and should not be edited. */
import Link from "~/common/components/Link";
import { CustomAnchor } from "~/common/components/Anchor";
import { UrlParamsUser, patternUser } from "./user/patternUser";
import { UrlParamsAccount, patternAccount } from "./account/patternAccount";
import { UrlParamsLogin, patternLogin } from "./login/patternLogin";
import { UrlParamsSignup, patternSignup } from "./signup/patternSignup";
import { UrlParamsHome, patternHome } from "./home/patternHome";
import { UrlParamsAbout, patternAbout } from "./about/patternAbout";
import { UrlParamsContact, patternContact } from "./contact/patternContact";
import { UrlParamsToc, patternToc } from "./toc/patternToc";
import { UrlParamsLegacy, patternLegacy } from "./legacy/patternLegacy";
export const routeConfig: Record<
  string,
  { pathPattern: string } & ({ type: "external"; component: typeof CustomAnchor } | { type: "internal"; component: typeof Link })
> = {
  user: {
    pathPattern: patternUser,
    component: Link,
    type: "internal",
  },
  account: {
    pathPattern: patternAccount,
    component: Link,
    type: "internal",
  },
  login: {
    pathPattern: patternLogin,
    component: CustomAnchor,
    type: "external",
  },
  signup: {
    pathPattern: patternSignup,
    component: CustomAnchor,
    type: "external",
  },
  home: {
    pathPattern: patternHome,
    component: CustomAnchor,
    type: "external",
  },
  about: {
    pathPattern: patternAbout,
    component: CustomAnchor,
    type: "external",
  },
  contact: {
    pathPattern: patternContact,
    component: CustomAnchor,
    type: "external",
  },
  toc: {
    pathPattern: patternToc,
    component: CustomAnchor,
    type: "external",
  },
  legacy: {
    pathPattern: patternLegacy,
    component: CustomAnchor,
    type: "external",
  },
};
export type RouteConfigProps =
  | { to: "user"; urlParams: UrlParamsUser }
  | { to: "account"; urlParams?: UrlParamsAccount }
  | { to: "login"; urlParams?: UrlParamsLogin }
  | { to: "signup"; urlParams?: UrlParamsSignup }
  | { to: "home"; urlParams?: UrlParamsHome }
  | { to: "about"; urlParams: UrlParamsAbout }
  | { to: "contact"; urlParams: UrlParamsContact }
  | { to: "toc"; urlParams?: UrlParamsToc }
  | { to: "legacy"; urlParams?: UrlParamsLegacy };
