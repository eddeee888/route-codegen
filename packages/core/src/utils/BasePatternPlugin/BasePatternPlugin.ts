import { throwError } from "../throwError";
import { PatternPluginBaseConfig, PatternTemplateFile } from "../types";

export class BasePatternPlugin<C = Record<string, never>> {
  config: PatternPluginBaseConfig & C;

  constructor(config: PatternPluginBaseConfig & C) {
    this.config = config;
  }

  generate(): PatternTemplateFile {
    return throwError([], "Implement generate function");
  }
}
