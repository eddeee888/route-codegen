/* This file was automatically generated with route-codegen and should not be edited. */
import Link from "~/common/components/NextLink";
import { CustomAnchor as Anchor } from "~/common/components/Anchor";
import { UrlParamsHome, patternHome } from "./home/patternHome";
import { UrlParamsAbout, patternAbout } from "./about/patternAbout";
import { UrlParamsUser, patternUser } from "./user/patternUser";
import { UrlParamsAccount, patternAccount } from "./account/patternAccount";
import { UrlParamsLogin, patternLogin } from "./login/patternLogin";
import { UrlParamsSignup, patternSignup } from "./signup/patternSignup";
import { UrlParamsContact, patternContact } from "./contact/patternContact";
import { UrlParamsToc, patternToc } from "./toc/patternToc";
import { UrlParamsLegacy, patternLegacy } from "./legacy/patternLegacy";
export const routeConfig = {
  home: {
    pattern: patternHome,
    component: Link,
  },
  about: {
    pattern: patternAbout,
    component: Link,
  },
  user: {
    pattern: patternUser,
    component: Anchor,
  },
  account: {
    pattern: patternAccount,
    component: Anchor,
  },
  login: {
    pattern: patternLogin,
    component: Anchor,
  },
  signup: {
    pattern: patternSignup,
    component: Anchor,
  },
  contact: {
    pattern: patternContact,
    component: Anchor,
  },
  toc: {
    pattern: patternToc,
    component: Anchor,
  },
  legacy: {
    pattern: patternLegacy,
    component: Anchor,
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
