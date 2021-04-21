import { default as generateUseRedirectFile } from "./generateUseRedirectFileDefault";
import { generateLinkFileDefault } from "./generateLinkFileDefault";
import { generateRedirectFileDefault } from "./generateRedirectFileDefault";

export const generatorDefault = {
  generateUseRedirectFile,
  generateLinkFile: generateLinkFileDefault,
  generateRedirectFile: generateRedirectFileDefault,
};
