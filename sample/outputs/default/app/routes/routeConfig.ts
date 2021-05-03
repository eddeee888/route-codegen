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
export const routeConfig = {
  user: {
    pathPattern: patternUser,
    Component: Link,
  },
  account: {
    pathPattern: patternAccount,
    Component: Link,
  },
  login: {
    pathPattern: patternLogin,
    Component: CustomAnchor,
  },
  signup: {
    pathPattern: patternSignup,
    Component: CustomAnchor,
  },
  home: {
    pathPattern: patternHome,
    Component: CustomAnchor,
  },
  about: {
    pathPattern: patternAbout,
    Component: CustomAnchor,
  },
  contact: {
    pathPattern: patternContact,
    Component: CustomAnchor,
  },
  toc: {
    pathPattern: patternToc,
    Component: CustomAnchor,
  },
  legacy: {
    pathPattern: patternLegacy,
    Component: CustomAnchor,
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
