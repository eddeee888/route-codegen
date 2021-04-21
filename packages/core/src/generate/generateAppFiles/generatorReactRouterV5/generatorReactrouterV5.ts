import { generateUseParamsFileReactRouterV5 } from "./generateUseParamsFileReactRouterV5";
import { default as generateUseRedirectFile } from "./generateUseRedirectReactRouterV5";
import { generateLinkFileReactRouterV5 } from "./generateLinkFileReactRouterV5";
import { generateRedirectFileReactRouterV5 } from "./generateRedirectFileReactRouterV5";

export const generatorReactRouterV5 = {
  generateUseParamsFile: generateUseParamsFileReactRouterV5,
  generateUseRedirectFile,
  generateLinkFile: generateLinkFileReactRouterV5,
  generateRedirectFile: generateRedirectFileReactRouterV5,
};
