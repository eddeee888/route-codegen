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
    type: "internal",
    component: Link,
  },
  account: {
    pathPattern: patternAccount,
    type: "internal",
    component: Link,
  },
  login: {
    pathPattern: patternLogin,
    type: "external",
    component: CustomAnchor,
  },
  signup: {
    pathPattern: patternSignup,
    type: "external",
    component: CustomAnchor,
  },
  home: {
    pathPattern: patternHome,
    type: "external",
    component: CustomAnchor,
  },
  about: {
    pathPattern: patternAbout,
    type: "external",
    component: CustomAnchor,
  },
  contact: {
    pathPattern: patternContact,
    type: "external",
    component: CustomAnchor,
  },
  toc: {
    pathPattern: patternToc,
    type: "external",
    component: CustomAnchor,
  },
  legacy: {
    pathPattern: patternLegacy,
    type: "external",
    component: CustomAnchor,
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
