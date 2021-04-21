import { generateUseParamsFileNextJS } from "./generateUseParamsFileNextJS";
import { generateLinkFileNextJS } from "./generateLinkFileNextJS";
import { default as generateUseRedirectFile } from "./generateUseRedirectFileNextJS";

export const generatorNextJS = {
  generateUseParamsFile: generateUseParamsFileNextJS,
  generateLinkFile: generateLinkFileNextJS,
  generateUseRedirectFile,
};
