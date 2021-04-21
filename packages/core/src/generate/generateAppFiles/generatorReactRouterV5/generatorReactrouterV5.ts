import { default as generateUseParamsFile } from "./generateUseParamsFileReactRouterV5";
import { default as generateUseRedirectFile } from "./generateUseRedirectReactRouterV5";
import { generateLinkFileReactRouterV5 } from "./generateLinkFileReactRouterV5";
import { default as generateRedirectFile } from "./generateRedirectFileReactRouterV5";

export const generatorReactRouterV5 = {
  generateUseParamsFile,
  generateUseRedirectFile,
  generateLinkFile: generateLinkFileReactRouterV5,
  generateRedirectFile,
};
