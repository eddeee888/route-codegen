import { default as generateUseParamsFile } from "./generateUseParamsFileNextJS";
import { generateLinkFileNextJS } from "./generateLinkFileNextJS";
import { default as generateUseRedirectFile } from "./generateUseRedirectFileNextJS";

export const generatorNextJS = {
  generateUseParamsFile,
  generateLinkFile: generateLinkFileNextJS,
  generateUseRedirectFile,
};
