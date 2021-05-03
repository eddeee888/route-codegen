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
    pathPattern: patternHome,
    Component: Link,
  },
  about: {
    pathPattern: patternAbout,
    Component: Link,
  },
  user: {
    pathPattern: patternUser,
    Component: Anchor,
  },
  account: {
    pathPattern: patternAccount,
    Component: Anchor,
  },
  login: {
    pathPattern: patternLogin,
    Component: Anchor,
  },
  signup: {
    pathPattern: patternSignup,
    Component: Anchor,
  },
  contact: {
    pathPattern: patternContact,
    Component: Anchor,
  },
  toc: {
    pathPattern: patternToc,
    Component: Anchor,
  },
  legacy: {
    pathPattern: patternLegacy,
    Component: Anchor,
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
