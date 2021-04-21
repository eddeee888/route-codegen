import { default as generateUseRedirectFile } from "./generateUseRedirectFileDefault";
import { generateLinkFileDefault } from "./generateLinkFileDefault";
import { default as generateRedirectFile } from "./generateRedirectFileDefault";

export const generatorDefault = {
  generateUseRedirectFile,
  generateLinkFile: generateLinkFileDefault,
  generateRedirectFile,
};
